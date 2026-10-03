import React from "react";
import {
  StyleSheet,
  View,
} from "react-native";

export type WordyMood =
  | "idle"
  | "happy"
  | "curious"
  | "sleepy"
  | "sleeping"
  | "surprised"
  | "focused";

export type WordyPose =
  | "stand"
  | "walk"
  | "sit"
  | "air";

type Props = {
  size?: number;

  mood?: WordyMood;
  pose?: WordyPose;

  lookX?: number;
  lookY?: number;

  gait?: number;

  speed?: number;

  crouch?: number;
  landing?: number;

  bodyLean?: number;

  sitSwing?: number;

  blink?: number;

  facing?: 1 | -1;
};

const C = {
  orange: "#FF7817",
  orangeLight: "#FF9347",
  orangeDark: "#E85D08",

  face: "#25211F",
  eyeWhite: "#FFF9F3",
  white: "#FFFFFF",

  cheek: "#E95E48",
};

const clamp = (
  value: number,
  min: number,
  max: number
) => Math.max(min, Math.min(max, value));

function Arm({
  side,
  upperAngle,
  lowerAngle,
  size,
}: {
  side: "left" | "right";
  upperAngle: number;
  lowerAngle: number;
  size: number;
}) {
  const upperLength = size * 0.24;
  const lowerLength = size * 0.19;

  const thickness = size * 0.105;

  const leftSide = side === "left";

  return (
    <View
      style={[
        styles.armJoint,
        {
          top: size * 0.34,
          [leftSide ? "left" : "right"]:
            -size * 0.008,

          transform: [
            {
              rotate: `${upperAngle}deg`,
            },
          ],
        },
      ]}
    >
      <View
        style={[
          styles.limbSegment,
          {
            width: thickness,
            height: upperLength,
            left: -thickness / 2,
            backgroundColor: C.orange,

            borderRadius: thickness,
          },
        ]}
      >
        <View
          style={[
            styles.elbowJoint,
            {
              top:
                upperLength -
                thickness * 0.45,
              left: thickness / 2,

              transform: [
                {
                  rotate: `${lowerAngle}deg`,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.limbSegment,
              {
                width: thickness * 0.92,
                height: lowerLength,

                left:
                  -(thickness * 0.92) /
                  2,

                backgroundColor: C.orange,

                borderRadius: thickness,
              },
            ]}
          >
            <View
              style={[
                styles.hand,
                {
                  width: thickness * 1.35,
                  height: thickness * 1.15,

                  left:
                    -(thickness * 1.35) /
                      2 +
                    (thickness * 0.92) /
                      2,

                  bottom:
                    -thickness * 0.45,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

function Leg({
  side,
  hipAngle,
  kneeAngle,
  size,
  seated,
}: {
  side: "left" | "right";
  hipAngle: number;
  kneeAngle: number;
  size: number;
  seated: boolean;
}) {
  const thighLength = seated
    ? size * 0.23
    : size * 0.25;

  const shinLength = seated
    ? size * 0.23
    : size * 0.24;

  const thickness = size * 0.13;

  const leftSide = side === "left";

  return (
    <View
      style={[
        styles.hipJoint,
        {
          bottom: seated
            ? size * 0.02
            : size * 0.015,

          [leftSide ? "left" : "right"]:
            size * 0.25,

          transform: [
            {
              rotate: `${hipAngle}deg`,
            },
          ],
        },
      ]}
    >
      <View
        style={[
          styles.limbSegment,
          {
            width: thickness,
            height: thighLength,

            left: -thickness / 2,

            borderRadius: thickness,

            backgroundColor: C.orange,
          },
        ]}
      >
        <View
          style={[
            styles.kneeJoint,
            {
              top:
                thighLength -
                thickness * 0.38,

              left: thickness / 2,

              transform: [
                {
                  rotate: `${kneeAngle}deg`,
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.limbSegment,
              {
                width: thickness * 0.92,
                height: shinLength,

                left:
                  -(thickness * 0.92) /
                  2,

                borderRadius: thickness,

                backgroundColor: C.orange,
              },
            ]}
          >
            <View
              style={[
                styles.foot,
                {
                  width: size * 0.22,
                  height: size * 0.11,

                  left: leftSide
                    ? -size * 0.09
                    : -size * 0.02,

                  bottom:
                    -size * 0.045,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default function WordyMascot({
  size = 90,

  mood = "idle",
  pose = "stand",

  lookX = 0,
  lookY = 0,

  gait = 0,

  speed = 0,

  crouch = 0,
  landing = 0,

  bodyLean = 0,

  sitSwing = 0,

  blink = 1,

  facing = 1,
}: Props) {
  const seated = pose === "sit";
  const airborne = pose === "air";

  const walkAmount = clamp(
    Math.abs(speed) / 130,
    0,
    1
  );

  const step = Math.sin(gait);

  const oppositeStep = Math.sin(
    gait + Math.PI
  );

  let leftHip = 4;
  let rightHip = -4;

  let leftKnee = 0;
  let rightKnee = 0;

  let leftShoulder = 18;
  let rightShoulder = -18;

  let leftElbow = 5;
  let rightElbow = -5;

  if (pose === "walk") {
    leftHip =
      step * 26 * walkAmount;

    rightHip =
      oppositeStep *
      26 *
      walkAmount;

    leftKnee =
      Math.max(0, -step) *
      42 *
      walkAmount;

    rightKnee =
      Math.max(
        0,
        -oppositeStep
      ) *
      42 *
      walkAmount;

    leftShoulder =
      oppositeStep *
      18 *
      walkAmount +
      7;

    rightShoulder =
      step *
      18 *
      walkAmount -
      7;

    leftElbow = 12;
    rightElbow = -12;
  }

  if (airborne) {
    leftHip = -20;
    rightHip = 22;

    leftKnee = 38;
    rightKnee = 34;

    leftShoulder = 42;
    rightShoulder = -42;

    leftElbow = 20;
    rightElbow = -20;
  }

  if (seated) {
    leftHip =
      13 +
      Math.sin(sitSwing) * 10;

    rightHip =
      -13 +
      Math.sin(
        sitSwing + Math.PI
      ) *
        10;

    leftKnee =
      72 +
      Math.sin(
        sitSwing + 0.3
      ) *
        13;

    rightKnee =
      -72 -
      Math.sin(
        sitSwing +
          Math.PI +
          0.3
      ) *
        13;

    leftShoulder = 20;
    rightShoulder = -20;

    leftElbow = 12;
    rightElbow = -12;
  }

  if (mood === "sleeping") {
    leftShoulder = 26;
    rightShoulder = -26;

    leftElbow = 20;
    rightElbow = -20;
  }

  const walkBob =
    pose === "walk"
      ? Math.abs(
          Math.sin(gait * 2)
        ) *
        -size *
        0.018 *
        walkAmount
      : 0;

  const breathe =
    pose === "sit" ||
    pose === "stand"
      ? Math.sin(
          Date.now() / 650
        ) * 0.008
      : 0;

  const squashY =
    1 -
    crouch * 0.13 -
    landing * 0.11;

  const squashX =
    1 +
    crouch * 0.08 +
    landing * 0.07;

  const pupilX =
    clamp(lookX, -1, 1) *
    size *
    0.018;

  const pupilY =
    clamp(lookY, -1, 1) *
    size *
    0.018;

  const eyeScaleY =
    mood === "sleeping"
      ? 0
      : clamp(blink, 0.05, 1);

  return (
    <View
      pointerEvents="none"
      style={[
        styles.stage,
        {
          width: size * 1.35,
          height: seated
            ? size * 1.28
            : size * 1.4,
        },
      ]}
    >
      <View
        style={[
          styles.character,
          {
            width: size,
            height: size * 0.92,

            transform: [
              {
                translateY:
                  walkBob +
                  crouch *
                    size *
                    0.06,
              },
              {
                rotate: `${bodyLean}deg`,
              },
              {
                scaleX:
                  squashX * facing,
              },
              {
                scaleY:
                  squashY *
                  (1 + breathe),
              },
            ],
          },
        ]}
      >
        <Arm
          side="left"
          upperAngle={leftShoulder}
          lowerAngle={leftElbow}
          size={size}
        />

        <Arm
          side="right"
          upperAngle={rightShoulder}
          lowerAngle={rightElbow}
          size={size}
        />

        <Leg
          side="left"
          hipAngle={leftHip}
          kneeAngle={leftKnee}
          size={size}
          seated={seated}
        />

        <Leg
          side="right"
          hipAngle={rightHip}
          kneeAngle={rightKnee}
          size={size}
          seated={seated}
        />

        <View style={styles.body}>
          <View style={styles.bodyLight} />

          <View style={styles.bodyShade} />

          {mood === "sleeping" ? (
            <>
              <View
                style={[
                  styles.sleepEye,
                  styles.sleepEyeLeft,
                ]}
              />

              <View
                style={[
                  styles.sleepEye,
                  styles.sleepEyeRight,
                ]}
              />
            </>
          ) : (
            <>
              <View
                style={[
                  styles.eyeSocket,
                  styles.eyeLeft,
                  {
                    transform: [
                      {
                        scaleY:
                          eyeScaleY,
                      },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.pupil,
                    {
                      transform: [
                        {
                          translateX:
                            pupilX *
                            facing,
                        },
                        {
                          translateY:
                            pupilY,
                        },
                      ],
                    },
                  ]}
                >
                  <View
                    style={
                      styles.eyeShine
                    }
                  />

                  <View
                    style={
                      styles.eyeShineSmall
                    }
                  />
                </View>
              </View>

              <View
                style={[
                  styles.eyeSocket,
                  styles.eyeRight,
                  {
                    transform: [
                      {
                        scaleY:
                          eyeScaleY,
                      },
                    ],
                  },
                ]}
              >
                <View
                  style={[
                    styles.pupil,
                    {
                      transform: [
                        {
                          translateX:
                            pupilX *
                            facing,
                        },
                        {
                          translateY:
                            pupilY,
                        },
                      ],
                    },
                  ]}
                >
                  <View
                    style={
                      styles.eyeShine
                    }
                  />

                  <View
                    style={
                      styles.eyeShineSmall
                    }
                  />
                </View>
              </View>
            </>
          )}

          {(mood === "happy" ||
            mood ===
              "surprised") && (
            <>
              <View
                style={[
                  styles.cheek,
                  styles.cheekLeft,
                ]}
              />

              <View
                style={[
                  styles.cheek,
                  styles.cheekRight,
                ]}
              />
            </>
          )}

          {mood === "sleeping" ? (
            <View
              style={
                styles.sleepMouth
              }
            />
          ) : mood === "surprised" ? (
            <View
              style={
                styles.surprisedMouth
              }
            />
          ) : mood === "happy" ? (
            <View
              style={
                styles.happyMouth
              }
            >
              <View
                style={styles.tongue}
              />
            </View>
          ) : mood === "sleepy" ? (
            <View
              style={
                styles.sleepyMouth
              }
            />
          ) : (
            <View
              style={styles.smile}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignItems: "center",
    justifyContent: "flex-start",

    overflow: "visible",
  },

  character: {
    position: "relative",
  },

  body: {
    position: "absolute",

    width: "100%",
    height: "100%",

    borderTopLeftRadius: 42,
    borderTopRightRadius: 47,

    borderBottomLeftRadius: 39,
    borderBottomRightRadius: 44,

    backgroundColor: C.orange,

    overflow: "hidden",

    shadowColor: "#B54900",

    shadowOpacity: 0.15,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 5,
  },

  bodyLight: {
    position: "absolute",

    width: "55%",
    height: "70%",

    left: "-18%",
    top: "-20%",

    borderRadius: 999,

    backgroundColor:
      C.orangeLight,

    opacity: 0.2,

    transform: [
      {
        rotate: "25deg",
      },
    ],
  },

  bodyShade: {
    position: "absolute",

    width: "105%",
    height: "72%",

    right: "-53%",
    bottom: "-30%",

    borderRadius: 999,

    backgroundColor:
      C.orangeDark,

    opacity: 0.13,

    transform: [
      {
        rotate: "-26deg",
      },
    ],
  },

  armJoint: {
    position: "absolute",

    width: 1,
    height: 1,

    zIndex: -2,
  },

  elbowJoint: {
    position: "absolute",

    width: 1,
    height: 1,
  },

  hipJoint: {
    position: "absolute",

    width: 1,
    height: 1,

    zIndex: -3,
  },

  kneeJoint: {
    position: "absolute",

    width: 1,
    height: 1,
  },

  limbSegment: {
    position: "absolute",
  },

  hand: {
    position: "absolute",

    borderRadius: 999,

    backgroundColor: C.orange,
  },

  foot: {
    position: "absolute",

    borderRadius: 999,

    backgroundColor: C.orange,
  },

  eyeSocket: {
    position: "absolute",

    top: "25%",

    width: "19%",
    height: "32%",

    borderRadius: 999,

    backgroundColor:
      C.eyeWhite,

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

    width: "79%",
    height: "86%",

    left: "10.5%",
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
  },

  sleepEyeRight: {
    right: "23%",
  },

  cheek: {
    position: "absolute",

    top: "58%",

    width: "11%",
    height: "6%",

    borderRadius: 999,

    backgroundColor:
      C.cheek,

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

    borderBottomColor:
      C.face,

    borderRadius: 999,

    transform: [
      {
        rotate: "-4deg",
      },
    ],
  },

  happyMouth: {
    position: "absolute",

    width: "24%",
    height: "15%",

    left: "38%",
    top: "62%",

    borderBottomLeftRadius:
      999,

    borderBottomRightRadius:
      999,

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

    backgroundColor:
      "#F48B7A",
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
});