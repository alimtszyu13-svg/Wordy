import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import WordyMascot, {
  WordyMood,
  WordyPose,
} from "./WordyMascot";

import WordySpeechBubble from "./WordySpeechBubble";

type Mode =
  | "welcome"
  | "prepareJump"
  | "air"
  | "walkingHome"
  | "sitting"
  | "standingUp"
  | "strolling"
  | "returning"
  | "jumpInPlace"
  | "landing"
  | "sleeping";

type Physics = {
  x: number;
  y: number;

  vx: number;
  vy: number;

  grounded: boolean;

  gait: number;

  crouch: number;
  landing: number;

  bodyLean: number;

  sitSwing: number;

  facing: 1 | -1;
};

const GRAVITY = 1550;

const WALK_SPEED = 88;
const WALK_ACCEL = 520;

const NAV_HEIGHT = 84;

const CHARACTER_SIZE = 82;

const clamp = (
  value: number,
  min: number,
  max: number
) => Math.max(min, Math.min(max, value));

const approach = (
  current: number,
  target: number,
  amount: number
) => {
  if (current < target) {
    return Math.min(
      current + amount,
      target
    );
  }

  return Math.max(
    current - amount,
    target
  );
};

const INTERACTION_LINES = [
  "Хи-хи!",
  "Щекотно!",
  "Я всё вижу 👀",
  "Мы сегодня учимся?",
  "Привет ещё раз!",
  "Ты меня поймал 😄",
];

export default function WordyCompanion() {
  const { width, height } =
    useWindowDimensions();

  const [, forceRender] =
    useState(0);

  const [mode, setMode] =
    useState<Mode>("welcome");

  const modeRef =
    useRef<Mode>("welcome");

  const [mood, setMood] =
    useState<WordyMood>("happy");

  const [speech, setSpeech] =
    useState(
      "Привет! Я Wordy 👋"
    );

  const [lookX, setLookX] =
    useState(0);

  const [lookY, setLookY] =
    useState(0);

  const [blink, setBlink] =
    useState(1);

  const lastActivity =
    useRef(Date.now());

  const lastMouse =
    useRef({
      x: width / 2,
      y: height / 2,
    });

  const lastFrame =
    useRef<number | null>(
      null
    );

  const welcomeStarted =
    useRef(Date.now());

  const actionStarted =
    useRef(Date.now());

  const idleActionAt =
    useRef(
      Date.now() +
        9000 +
        Math.random() * 5000
    );

  const mouseAvoidCooldown =
    useRef(0);

  const speechTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | undefined
    >(undefined);

  const blinkTimer =
    useRef<
      ReturnType<
        typeof setTimeout
      > | undefined
    >(undefined);

  const physics =
    useRef<Physics>({
      x: width / 2,

      y:
        height -
        NAV_HEIGHT -
        220,

      vx: 0,
      vy: 0,

      grounded: false,

      gait: 0,

      crouch: 0,
      landing: 0,

      bodyLean: 0,

      sitSwing: 0,

      facing: 1,
    });

  const groundY =
    height - NAV_HEIGHT;

  const homeX = clamp(
    width - 72,
    72,
    width - 65
  );

  const setModeSafe = (
    next: Mode
  ) => {
    modeRef.current = next;
    setMode(next);

    actionStarted.current =
      Date.now();
  };

  const say = (
    text: string,
    duration = 1600
  ) => {
    if (speechTimer.current) {
      clearTimeout(
        speechTimer.current
      );
    }

    setSpeech(text);

    speechTimer.current =
      setTimeout(() => {
        setSpeech("");
      }, duration);
  };

  const scheduleBlink = () => {
    if (blinkTimer.current) {
      clearTimeout(
        blinkTimer.current
      );
    }

    const wait =
      2200 +
      Math.random() * 3200;

    blinkTimer.current =
      setTimeout(() => {
        if (
          mood !== "sleeping"
        ) {
          setBlink(0.07);

          setTimeout(() => {
            setBlink(1);
          }, 95);
        }

        scheduleBlink();
      }, wait);
  };

  useEffect(() => {
    scheduleBlink();

    return () => {
      if (blinkTimer.current) {
        clearTimeout(
          blinkTimer.current
        );
      }

      if (speechTimer.current) {
        clearTimeout(
          speechTimer.current
        );
      }
    };
  }, []);

  // ------------------------------------------------------------
  // WINDOW CHANGES
  // ------------------------------------------------------------

  useEffect(() => {
    if (
      modeRef.current ===
        "sitting" ||
      modeRef.current ===
        "sleeping"
    ) {
      physics.current.x =
        homeX;

      physics.current.y =
        groundY;

      physics.current.vx = 0;
      physics.current.vy = 0;
    }
  }, [
    width,
    height,
    homeX,
    groundY,
  ]);

  // ------------------------------------------------------------
  // POINTER TRACKING
  // ------------------------------------------------------------

  useEffect(() => {
    if (Platform.OS !== "web") {
      return;
    }

    const handleMouseMove = (
      event: any
    ) => {
      lastActivity.current =
        Date.now();

      lastMouse.current = {
        x: event.clientX,
        y: event.clientY,
      };

      const p =
        physics.current;

      const dx =
        event.clientX - p.x;

      const dy =
        event.clientY -
        (p.y -
          CHARACTER_SIZE *
            0.5);

      setLookX(
        clamp(dx / 180, -1, 1)
      );

      setLookY(
        clamp(dy / 150, -1, 1)
      );

      if (
        modeRef.current ===
        "sleeping"
      ) {
        setMood("surprised");

        say(
          "О! Ты вернулся 👀",
          1300
        );

        setModeSafe("sitting");

        idleActionAt.current =
          Date.now() +
          7000;
      }

      const distance =
        Math.sqrt(
          dx * dx + dy * dy
        );

      const now = Date.now();

      if (
        distance < 90 &&
        now >
          mouseAvoidCooldown.current &&
        modeRef.current ===
          "sitting"
      ) {
        mouseAvoidCooldown.current =
          now + 2800;

        const awayDirection =
          dx > 0 ? -1 : 1;

        physics.current.facing =
          awayDirection === 1
            ? 1
            : -1;

        physics.current.vx = 0;

        setMood("surprised");

        say("Ой!", 850);

        physics.current.x =
          clamp(
            physics.current.x,
            homeX - 42,
            homeX + 15
          );

        setModeSafe(
          "standingUp"
        );

        actionStarted.current =
          Date.now();

        const target =
          clamp(
            homeX +
              awayDirection *
                34,
            width - 150,
            width - 45
          );

        avoidanceTarget.current =
          target;
      }
    };

    const handleActivity = () => {
      lastActivity.current =
        Date.now();
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    window.addEventListener(
      "mousedown",
      handleActivity
    );

    window.addEventListener(
      "keydown",
      handleActivity
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mousedown",
        handleActivity
      );

      window.removeEventListener(
        "keydown",
        handleActivity
      );
    };
  }, [
    homeX,
    width,
  ]);

  const avoidanceTarget =
    useRef(homeX);

  const strollTarget =
    useRef(homeX);

  // ------------------------------------------------------------
  // MAIN PHYSICS LOOP
  // ------------------------------------------------------------

  useEffect(() => {
    let frameId = 0;

    const loop = (
      timestamp: number
    ) => {
      if (
        lastFrame.current ===
        null
      ) {
        lastFrame.current =
          timestamp;
      }

      const rawDt =
        (timestamp -
          lastFrame.current) /
        1000;

      const dt = Math.min(
        rawDt,
        0.033
      );

      lastFrame.current =
        timestamp;

      const now = Date.now();

      const p = physics.current;

      const currentMode =
        modeRef.current;

      // --------------------------------------------------------
      // WELCOME
      // --------------------------------------------------------

      if (
        currentMode ===
        "welcome"
      ) {
        p.vx = 0;
        p.vy = 0;

        p.bodyLean =
          Math.sin(now / 600) *
          1.5;

        const elapsed =
          now -
          welcomeStarted.current;

        if (elapsed > 1200) {
          setMood("happy");
        }

        if (elapsed > 2600) {
          say(
            "Пойдём учиться ✨",
            1200
          );

          setModeSafe(
            "prepareJump"
          );
        }
      }

      // --------------------------------------------------------
      // PREPARE JUMP
      // --------------------------------------------------------

      if (
        currentMode ===
        "prepareJump"
      ) {
        const t = clamp(
          (now -
            actionStarted.current) /
            420,
          0,
          1
        );

        p.crouch = t;

        p.bodyLean =
          4 * p.facing;

        if (t >= 1) {
          p.crouch = 0;

          const targetX =
            clamp(
              homeX - 115,
              80,
              width - 120
            );

          const dx =
            targetX - p.x;

          p.facing =
            dx >= 0 ? 1 : -1;

          p.vx =
            clamp(
              dx * 1.35,
              -310,
              310
            );

          p.vy = -180;

          p.grounded = false;

          setMood("curious");

          setModeSafe("air");
        }
      }

      // --------------------------------------------------------
      // AIR PHYSICS
      // --------------------------------------------------------

      if (
        currentMode === "air" ||
        currentMode ===
          "jumpInPlace"
      ) {
        p.vy += GRAVITY * dt;

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        p.bodyLean =
          clamp(
            p.vx / 45,
            -8,
            8
          );

        if (p.y >= groundY) {
          p.y = groundY;

          const impact =
            clamp(
              Math.abs(p.vy) /
                700,
              0.35,
              1
            );

          p.vy = 0;
          p.grounded = true;

          p.landing = impact;

          p.bodyLean =
            -p.bodyLean * 0.35;

          setMood("surprised");

          setModeSafe(
            "landing"
          );
        }
      }

      // --------------------------------------------------------
      // LANDING
      // --------------------------------------------------------

      if (
        currentMode ===
        "landing"
      ) {
        p.vx = approach(
          p.vx,
          0,
          580 * dt
        );

        p.landing = approach(
          p.landing,
          0,
          3.3 * dt
        );

        p.bodyLean = approach(
          p.bodyLean,
          0,
          28 * dt
        );

        if (
          now -
            actionStarted.current >
          300
        ) {
          p.landing = 0;

          if (
            Math.abs(
              p.x - homeX
            ) > 20
          ) {
            setMood("idle");

            setModeSafe(
              "walkingHome"
            );
          } else {
            p.x = homeX;
            p.vx = 0;

            setMood("happy");

            setModeSafe(
              "sitting"
            );

            say(
              "Вот моё место 😄",
              1200
            );
          }
        }
      }

      // --------------------------------------------------------
      // WALK HOME
      // --------------------------------------------------------

      if (
        currentMode ===
        "walkingHome"
      ) {
        const dx =
          homeX - p.x;

        const direction =
          Math.sign(dx) || 1;

        p.facing =
          direction >= 0 ? 1 : -1;

        const desiredSpeed =
          Math.abs(dx) < 45
            ? direction * 45
            : direction *
              WALK_SPEED;

        p.vx = approach(
          p.vx,
          desiredSpeed,
          WALK_ACCEL * dt
        );

        p.x += p.vx * dt;

        p.gait +=
          Math.abs(p.vx) *
          dt *
          0.085;

        p.bodyLean =
          clamp(
            p.vx / 24,
            -6,
            6
          );

        if (
          Math.abs(dx) < 6
        ) {
          p.x = homeX;
          p.vx = 0;

          p.bodyLean = 0;

          setMood("happy");

          setModeSafe(
            "sitting"
          );

          idleActionAt.current =
            now +
            7000 +
            Math.random() *
              5000;
        }
      }

      // --------------------------------------------------------
      // SITTING
      // --------------------------------------------------------

      if (
        currentMode ===
        "sitting"
      ) {
        p.vx = 0;
        p.vy = 0;

        p.y = groundY;

        p.bodyLean = approach(
          p.bodyLean,
          0,
          10 * dt
        );

        p.sitSwing +=
          dt * 3.1;

        const inactive =
          now -
          lastActivity.current;

        if (
          inactive > 52000
        ) {
          setMood("sleeping");

          setModeSafe(
            "sleeping"
          );

          setSpeech("zzz...");
        } else if (
          inactive > 28000
        ) {
          setMood("sleepy");
        } else if (
          inactive > 14000
        ) {
          setMood("curious");
        } else if (
          mood !== "happy"
        ) {
          setMood("idle");
        }

        if (
          now >
            idleActionAt.current &&
          inactive < 14000
        ) {
          const random =
            Math.random();

          if (random < 0.52) {
            // stay seated,
            // just become curious
            setMood("curious");

            const oldX =
              lookX;

            setLookX(
              Math.random() >
                0.5
                ? 0.8
                : -0.8
            );

            setTimeout(() => {
              setLookX(oldX);
              setMood("idle");
            }, 1200);
          } else {
            // stand and walk
            const distance =
              36 +
              Math.random() *
                44;

            strollTarget.current =
              clamp(
                homeX -
                  distance,
                width - 180,
                homeX - 25
              );

            setMood("curious");

            setModeSafe(
              "standingUp"
            );
          }

          idleActionAt.current =
            now +
            10000 +
            Math.random() *
              9000;
        }
      }

      // --------------------------------------------------------
      // STANDING UP
      // --------------------------------------------------------

      if (
        currentMode ===
        "standingUp"
      ) {
        const elapsed =
          now -
          actionStarted.current;

        const t = clamp(
          elapsed / 300,
          0,
          1
        );

        p.crouch =
          0.4 * (1 - t);

        p.bodyLean =
          -3 * p.facing *
          (1 - t);

        if (t >= 1) {
          p.crouch = 0;

          const avoidTarget =
            avoidanceTarget.current;

          const shouldAvoid =
            Math.abs(
              avoidTarget - homeX
            ) > 5 &&
            Math.abs(
              p.x -
                avoidTarget
            ) > 5;

          if (shouldAvoid) {
            strollTarget.current =
              avoidTarget;

            avoidanceTarget.current =
              homeX;
          }

          setModeSafe(
            "strolling"
          );
        }
      }

      // --------------------------------------------------------
      // STROLLING
      // --------------------------------------------------------

      if (
        currentMode ===
        "strolling"
      ) {
        const target =
          strollTarget.current;

        const dx =
          target - p.x;

        const direction =
          Math.sign(dx) || 1;

        p.facing =
          direction >= 0
            ? 1
            : -1;

        const desired =
          direction *
          Math.min(
            70,
            Math.max(
              32,
              Math.abs(dx) *
                2
            )
          );

        p.vx = approach(
          p.vx,
          desired,
          430 * dt
        );

        p.x += p.vx * dt;

        p.gait +=
          Math.abs(p.vx) *
          dt *
          0.09;

        p.bodyLean =
          clamp(
            p.vx / 28,
            -5,
            5
          );

        if (
          Math.abs(dx) < 5
        ) {
          p.x = target;

          p.vx = 0;

          p.bodyLean = 0;

          setMood("idle");

          setModeSafe(
            "sitting"
          );

          setTimeout(() => {
            if (
              modeRef.current ===
              "sitting"
            ) {
              setModeSafe(
                "standingUp"
              );

              strollTarget.current =
                homeX;
            }
          }, 1800);
        }
      }

      // --------------------------------------------------------
      // SLEEP
      // --------------------------------------------------------

      if (
        currentMode ===
        "sleeping"
      ) {
        p.vx = 0;
        p.vy = 0;

        p.sitSwing +=
          dt * 0.65;

        p.bodyLean =
          Math.sin(now / 900) *
          1.2;
      }

      forceRender(
        (value) =>
          (value + 1) % 100000
      );

      frameId =
        requestAnimationFrame(
          loop
        );
    };

    frameId =
      requestAnimationFrame(
        loop
      );

    return () => {
      cancelAnimationFrame(
        frameId
      );

      lastFrame.current = null;
    };
  }, [
    width,
    height,
    homeX,
    groundY,
    mood,
    lookX,
  ]);

  // ------------------------------------------------------------
  // CLICK WORDY
  // ------------------------------------------------------------

  const interact = () => {
    lastActivity.current =
      Date.now();

    if (
      modeRef.current ===
      "air" ||
      modeRef.current ===
      "walkingHome"
    ) {
      return;
    }

    if (
      modeRef.current ===
      "sleeping"
    ) {
      setMood("surprised");

      say(
        "Я не спал! 👀",
        1300
      );

      setModeSafe("sitting");

      return;
    }

    const phrase =
      INTERACTION_LINES[
        Math.floor(
          Math.random() *
            INTERACTION_LINES.length
        )
      ];

    say(phrase);

    setMood("happy");

    if (
      modeRef.current ===
      "sitting"
    ) {
      physics.current.vy =
        -355;

      physics.current.vx =
        physics.current.facing *
        12;

      physics.current.grounded =
        false;

      setModeSafe(
        "jumpInPlace"
      );
    }
  };

  // ------------------------------------------------------------
  // VISUAL POSE
  // ------------------------------------------------------------

  const p = physics.current;

  let pose: WordyPose =
    "stand";

  if (
    mode === "sitting" ||
    mode === "sleeping"
  ) {
    pose = "sit";
  }

  if (
    mode === "walkingHome" ||
    mode === "strolling"
  ) {
    pose = "walk";
  }

  if (
    mode === "air" ||
    mode === "jumpInPlace"
  ) {
    pose = "air";
  }

  const visualWidth =
    CHARACTER_SIZE * 1.35;

  const left =
    p.x -
    visualWidth / 2;

  let top: number;

  if (pose === "sit") {
    top =
      p.y -
      CHARACTER_SIZE *
        0.92;
  } else {
    top =
      p.y -
      CHARACTER_SIZE *
        1.18;
  }

  return (
    <View
      pointerEvents="box-none"
      style={StyleSheet.absoluteFill}
    >
      <View
        style={[
          styles.characterLayer,
          {
            left,
            top,
          },
        ]}
      >
        {!!speech && (
          <View
            pointerEvents="none"
            style={styles.speech}
          >
            <WordySpeechBubble
              text={speech}
              compact
            />
          </View>
        )}

        <Pressable
          onPress={interact}
          hitSlop={10}
          style={
            styles.pressArea
          }
        >
          <WordyMascot
            size={CHARACTER_SIZE}
            mood={mood}
            pose={pose}
            lookX={lookX}
            lookY={lookY}
            gait={p.gait}
            speed={p.vx}
            crouch={p.crouch}
            landing={
              p.landing
            }
            bodyLean={
              p.bodyLean
            }
            sitSwing={
              p.sitSwing
            }
            blink={blink}
            facing={p.facing}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    characterLayer: {
      position: "absolute",

      zIndex: 5000,

      alignItems: "center",

      overflow: "visible",
    },

    pressArea: {
      alignItems: "center",

      justifyContent:
        "center",

      overflow: "visible",
    },

    speech: {
      position: "absolute",

      bottom: "94%",

      right: "32%",

      zIndex: 5100,
    },
  });