import React from "react";
import { StyleSheet, View } from "react-native";

export type WordyMood =
  | "idle"
  | "happy"
  | "curious"
  | "sleepy"
  | "sleeping"
  | "surprised"
  | "focused"
  | "proud";

export type WordyPose = "stand" | "walk" | "sit" | "air";

export type WordyFoot = {
  x: number;
  lift: number;
};

type Props = {
  size?: number;
  mood?: WordyMood;
  pose?: WordyPose;
  lookX?: number;
  lookY?: number;
  blink?: number;
  facing?: 1 | -1;

  walkPhase?: number;
  speed?: number;
  verticalVelocity?: number;

  leftFoot?: WordyFoot;
  rightFoot?: WordyFoot;

  sitProgress?: number;
  sitSwing?: number;

  crouch?: number;
  landing?: number;
  stretch?: number;

  bodyLean?: number;
  bodyShiftX?: number;
  bodyBob?: number;
  breathe?: number;

  wave?: number;
  wavePhase?: number;
};

const C = {
  orange: "#FF7817",
  orangeLight: "#FF9347",
  orangeDark: "#E85D08",
  orangeDeep: "#D95404",
  face: "#25211F",
  eyeWhite: "#FFF9F3",
  white: "#FFFFFF",
  cheek: "#E95E48",
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const radToDeg = (radians: number) => (radians * 180) / Math.PI;

function angleFromDown(dx: number, dy: number) {
  return -radToDeg(Math.atan2(dx, dy));
}

type IkSolution = {
  upper: number;
  lower: number;
};

function solveTwoBoneIK(
  targetX: number,
  targetY: number,
  upperLength: number,
  lowerLength: number,
  bendSign: 1 | -1
): IkSolution {
  const rawDistance = Math.sqrt(targetX * targetX + targetY * targetY);
  const minDistance = Math.abs(upperLength - lowerLength) + 0.001;
  const maxDistance = upperLength + lowerLength - 0.001;
  const distance = clamp(rawDistance, minDistance, maxDistance);

  const ux = targetX / (rawDistance || 1);
  const uy = targetY / (rawDistance || 1);

  const along =
    (distance * distance +
      upperLength * upperLength -
      lowerLength * lowerLength) /
    (2 * distance);

  const height = Math.sqrt(
    Math.max(0, upperLength * upperLength - along * along)
  );

  const baseX = ux * along;
  const baseY = uy * along;

  const perpendicularX = -uy;
  const perpendicularY = ux;

  const kneeX = baseX + perpendicularX * height * bendSign;
  const kneeY = baseY + perpendicularY * height * bendSign;

  const upperAngle = angleFromDown(kneeX, kneeY);
  const lowerAbsolute = angleFromDown(targetX - kneeX, targetY - kneeY);

  return {
    upper: upperAngle,
    lower: lowerAbsolute - upperAngle,
  };
}

function LimbSegment({
  length,
  thickness,
  angle,
  children,
}: {
  length: number;
  thickness: number;
  angle: number;
  children?: React.ReactNode;
}) {
  return (
    <View
      style={{
        position: "absolute",
        width: thickness,
        height: length,
        left: -thickness / 2,
        top: 0,
        borderRadius: thickness,
        backgroundColor: C.orange,
        transform: [{ rotate: `${angle}deg` }],
      }}
    >
      {children}
    </View>
  );
}

function Arm({
  size,
  side,
  upperAngle,
  lowerAngle,
}: {
  size: number;
  side: "left" | "right";
  upperAngle: number;
  lowerAngle: number;
}) {
  const leftSide = side === "left";
  const upperLength = size * 0.22;
  const lowerLength = size * 0.18;
  const thickness = size * 0.105;

  return (
    <View
      style={[
        styles.shoulder,
        {
          top: size * 0.32,
          [leftSide ? "left" : "right"]: size * 0.02,
        },
      ]}
    >
      <LimbSegment
        length={upperLength}
        thickness={thickness}
        angle={upperAngle}
      >
        <View
          style={{
            position: "absolute",
            left: thickness / 2,
            top: upperLength - thickness * 0.34,
            width: 1,
            height: 1,
            transform: [{ rotate: `${lowerAngle}deg` }],
          }}
        >
          <View
            style={{
              position: "absolute",
              width: thickness * 0.92,
              height: lowerLength,
              left: -(thickness * 0.92) / 2,
              top: 0,
              borderRadius: thickness,
              backgroundColor: C.orange,
            }}
          >
            <View
              style={{
                position: "absolute",
                width: thickness * 1.32,
                height: thickness * 1.12,
                left: -(thickness * 1.32 - thickness * 0.92) / 2,
                bottom: -thickness * 0.45,
                borderRadius: 999,
                backgroundColor: C.orange,
              }}
            />
          </View>
        </View>
      </LimbSegment>
    </View>
  );
}

function Leg({
  size,
  side,
  footX,
  footY,
  footRotation,
}: {
  size: number;
  side: "left" | "right";
  footX: number;
  footY: number;
  footRotation: number;
}) {
  const leftSide = side === "left";
  const upperLength = size * 0.28;
  const lowerLength = size * 0.265;
  const thickness = size * 0.125;
  const hipX = leftSide ? -size * 0.185 : size * 0.185;
  const hipY = size * 0.71;

  const dx = footX - hipX;
  const dy = footY - hipY;

  const ik = solveTwoBoneIK(
    dx,
    dy,
    upperLength,
    lowerLength,
    leftSide ? 1 : -1
  );

  return (
    <View
      style={[
        styles.hip,
        {
          left: size / 2 + hipX,
          top: hipY,
        },
      ]}
    >
      <LimbSegment
        length={upperLength}
        thickness={thickness}
        angle={ik.upper}
      >
        <View
          style={{
            position: "absolute",
            left: thickness / 2,
            top: upperLength - thickness * 0.32,
            width: 1,
            height: 1,
            transform: [{ rotate: `${ik.lower}deg` }],
          }}
        >
          <View
            style={{
              position: "absolute",
              width: thickness * 0.92,
              height: lowerLength,
              left: -(thickness * 0.92) / 2,
              top: 0,
              borderRadius: thickness,
              backgroundColor: C.orange,
            }}
          >
            <View
              style={{
                position: "absolute",
                width: size * 0.235,
                height: size * 0.105,
                left: leftSide ? -size * 0.09 : -size * 0.02,
                bottom: -size * 0.04,
                borderRadius: 999,
                backgroundColor: C.orange,
                transform: [{ rotate: `${footRotation}deg` }],
              }}
            >
              <View style={styles.footShade} />
            </View>
          </View>
        </View>
      </LimbSegment>
    </View>
  );
}

export default function WordyMascot({
  size = 88,
  mood = "idle",
  pose = "stand",
  lookX = 0,
  lookY = 0,
  blink = 1,
  facing = 1,
  walkPhase = 0,
  speed = 0,
  verticalVelocity = 0,
  leftFoot,
  rightFoot,
  sitProgress = pose === "sit" ? 1 : 0,
  sitSwing = 0,
  crouch = 0,
  landing = 0,
  stretch = 0,
  bodyLean = 0,
  bodyShiftX = 0,
  bodyBob = 0,
  breathe = 0,
  wave = 0,
  wavePhase = 0,
}: Props) {
  const stageWidth = size * 1.56;
  const stageHeight = size * 1.55;
  const bodyHeight = size * 0.84;
  const bodyLeft = (stageWidth - size) / 2;
  const bodyTop = size * 0.035;

  const walkAmount = clamp(Math.abs(speed) / 95, 0, 1);
  const airAmount = pose === "air" ? 1 : 0;
  const sit = clamp(sitProgress, 0, 1);

  const defaultLeftFootX = -size * 0.17;
  const defaultRightFootX = size * 0.17;

  const leftWorldX = clamp(
    leftFoot?.x ?? defaultLeftFootX,
    -size * 0.45,
    size * 0.45
  );
  const rightWorldX = clamp(
    rightFoot?.x ?? defaultRightFootX,
    -size * 0.45,
    size * 0.45
  );

  const leftLift = clamp(leftFoot?.lift ?? 0, 0, size * 0.3);
  const rightLift = clamp(rightFoot?.lift ?? 0, 0, size * 0.3);

  const leftSitX =
    -size * 0.17 + Math.sin(sitSwing) * size * 0.035;
  const rightSitX =
    size * 0.17 + Math.sin(sitSwing + Math.PI) * size * 0.035;

  const leftSitY =
    size * 1.12 + Math.sin(sitSwing + 0.2) * size * 0.04;
  const rightSitY =
    size * 1.12 + Math.sin(sitSwing + Math.PI + 0.2) * size * 0.04;

  const airborneTuck = clamp(
    0.72 + Math.abs(verticalVelocity) / 900,
    0.72,
    1
  );

  const leftAirX = -size * 0.105 - facing * size * 0.035;
  const rightAirX = size * 0.105 + facing * size * 0.035;
  const leftAirY = size * (0.98 - 0.11 * airborneTuck);
  const rightAirY = size * (0.96 - 0.09 * airborneTuck);

  const standingFootY = size * 1.27;

  let leftTargetX = lerp(leftWorldX, leftSitX, sit);
  let rightTargetX = lerp(rightWorldX, rightSitX, sit);
  let leftTargetY = lerp(standingFootY - leftLift, leftSitY, sit);
  let rightTargetY = lerp(standingFootY - rightLift, rightSitY, sit);

  if (airAmount > 0) {
    leftTargetX = leftAirX;
    rightTargetX = rightAirX;
    leftTargetY = leftAirY;
    rightTargetY = rightAirY;
  }

  const phaseSin = Math.sin(walkPhase);
  const oppositePhase = Math.sin(walkPhase + Math.PI);

  const idleLeftArm = 18;
  const idleRightArm = -18;

  let leftShoulder =
    idleLeftArm + oppositePhase * 17 * walkAmount * (1 - sit);
  let rightShoulder =
    idleRightArm + phaseSin * 17 * walkAmount * (1 - sit);

  let leftElbow = 8 + Math.abs(phaseSin) * 8 * walkAmount;
  let rightElbow = -8 - Math.abs(oppositePhase) * 8 * walkAmount;

  if (pose === "air") {
    leftShoulder = 38 - facing * 7;
    rightShoulder = -38 - facing * 7;
    leftElbow = 22;
    rightElbow = -22;
  }

  if (sit > 0.01) {
    leftShoulder = lerp(leftShoulder, 23, sit);
    rightShoulder = lerp(rightShoulder, -23, sit);
    leftElbow = lerp(leftElbow, 14, sit);
    rightElbow = lerp(rightElbow, -14, sit);
  }

  if (mood === "sleeping") {
    leftShoulder = 28;
    rightShoulder = -28;
    leftElbow = 21;
    rightElbow = -21;
  }

  if (wave > 0.001) {
    const waveWrist = Math.sin(wavePhase) * 24;
    rightShoulder = lerp(rightShoulder, -132, wave);
    rightElbow = lerp(rightElbow, 24 + waveWrist, wave);
  }

  const impactSquash = clamp(landing, 0, 1);
  const crouchAmount = clamp(crouch, 0, 1);
  const stretchAmount = clamp(stretch, 0, 1);

  const scaleY =
    1 - crouchAmount * 0.105 - impactSquash * 0.12 + stretchAmount * 0.075;
  const scaleX =
    1 + crouchAmount * 0.07 + impactSquash * 0.085 - stretchAmount * 0.04;

  const pupilX = clamp(lookX, -1, 1) * size * 0.019;
  const pupilY = clamp(lookY, -1, 1) * size * 0.018;

  let eyeOpen = clamp(blink, 0.04, 1);
  if (mood === "sleepy") eyeOpen *= 0.58;
  if (mood === "sleeping") eyeOpen = 0;

  const subtleFacingLean = facing * walkAmount * 0.7;

  return (
    <View
      pointerEvents="none"
      style={{
        width: stageWidth,
        height: stageHeight,
        overflow: "visible",
      }}
    >
      <View
        style={[
          styles.rig,
          {
            width: size,
            height: bodyHeight,
            left: bodyLeft,
            top: bodyTop,
            transform: [
              { translateX: bodyShiftX },
              { translateY: bodyBob + crouchAmount * size * 0.035 },
              { rotate: `${bodyLean + subtleFacingLean}deg` },
              { scaleX },
              { scaleY: scaleY * (1 + breathe * 0.012) },
            ],
          },
        ]}
      >
        <Arm
          size={size}
          side="left"
          upperAngle={leftShoulder}
          lowerAngle={leftElbow}
        />
        <Arm
          size={size}
          side="right"
          upperAngle={rightShoulder}
          lowerAngle={rightElbow}
        />

        <Leg
          size={size}
          side="left"
          footX={leftTargetX}
          footY={leftTargetY - bodyTop}
          footRotation={
            pose === "air"
              ? -8 * facing
              : Math.sin(walkPhase) * 3 * walkAmount
          }
        />
        <Leg
          size={size}
          side="right"
          footX={rightTargetX}
          footY={rightTargetY - bodyTop}
          footRotation={
            pose === "air"
              ? 8 * facing
              : Math.sin(walkPhase + Math.PI) * 3 * walkAmount
          }
        />

        <View
          style={[
            styles.body,
            {
              width: size,
              height: bodyHeight,
            },
          ]}
        >
          <View style={styles.bodyLight} />
          <View style={styles.bodyShade} />
          <View style={styles.lowerGlow} />

          {mood === "sleeping" ? (
            <>
              <View style={[styles.sleepEye, styles.sleepEyeLeft]} />
              <View style={[styles.sleepEye, styles.sleepEyeRight]} />
            </>
          ) : (
            <>
              <View
                style={[
                  styles.eyeSocket,
                  styles.eyeLeft,
                  { transform: [{ scaleY: eyeOpen }] },
                ]}
              >
                <View
                  style={[
                    styles.pupil,
                    {
                      transform: [
                        { translateX: pupilX },
                        { translateY: pupilY },
                      ],
                    },
                  ]}
                >
                  <View style={styles.eyeShine} />
                  <View style={styles.eyeShineSmall} />
                </View>
              </View>

              <View
                style={[
                  styles.eyeSocket,
                  styles.eyeRight,
                  { transform: [{ scaleY: eyeOpen }] },
                ]}
              >
                <View
                  style={[
                    styles.pupil,
                    {
                      transform: [
                        { translateX: pupilX },
                        { translateY: pupilY },
                      ],
                    },
                  ]}
                >
                  <View style={styles.eyeShine} />
                  <View style={styles.eyeShineSmall} />
                </View>
              </View>
            </>
          )}

          {mood === "curious" && (
            <View style={styles.curiousBrow} />
          )}

          {mood === "focused" && (
            <>
              <View style={[styles.focusBrow, styles.focusBrowLeft]} />
              <View style={[styles.focusBrow, styles.focusBrowRight]} />
            </>
          )}

          {(mood === "happy" ||
            mood === "proud" ||
            mood === "surprised") && (
            <>
              <View style={[styles.cheek, styles.cheekLeft]} />
              <View style={[styles.cheek, styles.cheekRight]} />
            </>
          )}

          {mood === "sleeping" ? (
            <View style={styles.sleepMouth} />
          ) : mood === "surprised" ? (
            <View style={styles.surprisedMouth} />
          ) : mood === "happy" || mood === "proud" ? (
            <View style={styles.happyMouth}>
              <View style={styles.tongue} />
            </View>
          ) : mood === "sleepy" ? (
            <View style={styles.sleepyMouth} />
          ) : mood === "focused" ? (
            <View style={styles.focusedMouth} />
          ) : (
            <View style={styles.smile} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rig: {
    position: "absolute",
    overflow: "visible",
  },

  body: {
    position: "absolute",
    left: 0,
    top: 0,
    backgroundColor: C.orange,
    borderTopLeftRadius: 46,
    borderTopRightRadius: 51,
    borderBottomLeftRadius: 42,
    borderBottomRightRadius: 47,
    overflow: "hidden",
    shadowColor: "#B54900",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  bodyLight: {
    position: "absolute",
    width: "58%",
    height: "75%",
    left: "-18%",
    top: "-22%",
    borderRadius: 999,
    backgroundColor: C.orangeLight,
    opacity: 0.22,
    transform: [{ rotate: "27deg" }],
  },

  bodyShade: {
    position: "absolute",
    width: "110%",
    height: "78%",
    right: "-55%",
    bottom: "-33%",
    borderRadius: 999,
    backgroundColor: C.orangeDark,
    opacity: 0.14,
    transform: [{ rotate: "-24deg" }],
  },

  lowerGlow: {
    position: "absolute",
    width: "70%",
    height: "18%",
    left: "15%",
    bottom: "-9%",
    borderRadius: 999,
    backgroundColor: C.orangeDeep,
    opacity: 0.07,
  },

  shoulder: {
    position: "absolute",
    width: 1,
    height: 1,
    zIndex: -2,
  },

  hip: {
    position: "absolute",
    width: 1,
    height: 1,
    zIndex: -3,
  },

  footShade: {
    position: "absolute",
    left: "15%",
    right: "15%",
    bottom: 1,
    height: "22%",
    borderRadius: 999,
    backgroundColor: C.orangeDark,
    opacity: 0.08,
  },

  eyeSocket: {
    position: "absolute",
    top: "25%",
    width: "19%",
    height: "33%",
    borderRadius: 999,
    backgroundColor: C.eyeWhite,
    overflow: "hidden",
  },

  eyeLeft: {
    left: "23%",
  },

  eyeRight: {
    right: "23%",
  },

  pupil: {
    position: "absolute",
    width: "80%",
    height: "86%",
    left: "10%",
    top: "7%",
    borderRadius: 999,
    backgroundColor: C.face,
  },

  eyeShine: {
    position: "absolute",
    width: "38%",
    height: "32%",
    right: "11%",
    top: "9%",
    borderRadius: 999,
    backgroundColor: C.white,
  },

  eyeShineSmall: {
    position: "absolute",
    width: "13%",
    height: "11%",
    right: "21%",
    top: "49%",
    borderRadius: 999,
    backgroundColor: C.white,
    opacity: 0.7,
  },

  sleepEye: {
    position: "absolute",
    top: "41%",
    width: "18%",
    height: 3,
    borderRadius: 999,
    backgroundColor: C.face,
  },

  sleepEyeLeft: {
    left: "23%",
    transform: [{ rotate: "5deg" }],
  },

  sleepEyeRight: {
    right: "23%",
    transform: [{ rotate: "-5deg" }],
  },

  curiousBrow: {
    position: "absolute",
    width: "17%",
    height: 3,
    right: "21%",
    top: "17%",
    borderRadius: 999,
    backgroundColor: C.face,
    transform: [{ rotate: "-10deg" }],
  },

  focusBrow: {
    position: "absolute",
    width: "16%",
    height: 3,
    top: "19%",
    borderRadius: 999,
    backgroundColor: C.face,
  },

  focusBrowLeft: {
    left: "23%",
    transform: [{ rotate: "8deg" }],
  },

  focusBrowRight: {
    right: "23%",
    transform: [{ rotate: "-8deg" }],
  },

  cheek: {
    position: "absolute",
    top: "58%",
    width: "11%",
    height: "6%",
    borderRadius: 999,
    backgroundColor: C.cheek,
    opacity: 0.23,
  },

  cheekLeft: {
    left: "17%",
  },

  cheekRight: {
    right: "17%",
  },

  smile: {
    position: "absolute",
    width: "19%",
    height: "10%",
    left: "40.5%",
    top: "64%",
    borderBottomWidth: 3.5,
    borderBottomColor: C.face,
    borderRadius: 999,
    transform: [{ rotate: "-4deg" }],
  },

  happyMouth: {
    position: "absolute",
    width: "24%",
    height: "15%",
    left: "38%",
    top: "62%",
    borderBottomLeftRadius: 999,
    borderBottomRightRadius: 999,
    backgroundColor: C.face,
    overflow: "hidden",
  },

  tongue: {
    position: "absolute",
    width: "65%",
    height: "35%",
    left: "17.5%",
    bottom: -1,
    borderRadius: 999,
    backgroundColor: "#F48B7A",
  },

  surprisedMouth: {
    position: "absolute",
    width: "10%",
    height: "12%",
    left: "45%",
    top: "63%",
    borderRadius: 999,
    backgroundColor: C.face,
  },

  sleepyMouth: {
    position: "absolute",
    width: "13%",
    height: 3,
    left: "43.5%",
    top: "68%",
    borderRadius: 999,
    backgroundColor: C.face,
  },

  sleepMouth: {
    position: "absolute",
    width: "9%",
    height: "7%",
    left: "45.5%",
    top: "67%",
    borderRadius: 999,
    backgroundColor: C.face,
  },

  focusedMouth: {
    position: "absolute",
    width: "15%",
    height: 3,
    left: "42.5%",
    top: "69%",
    borderRadius: 999,
    backgroundColor: C.face,
  },
});
