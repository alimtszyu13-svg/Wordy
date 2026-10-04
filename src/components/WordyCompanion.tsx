import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import WordyMascot, {
  WordyFoot,
  WordyMood,
  WordyPose,
} from "./WordyMascot";
import WordySpeechBubble from "./WordySpeechBubble";

type Mode =
  | "welcome"
  | "walking"
  | "sitDown"
  | "sitting"
  | "standUp"
  | "pauseAway"
  | "hopPrep"
  | "hopAir"
  | "landing"
  | "sleeping";

type WalkReason = "home" | "dodge" | "stroll" | "return";
type PendingAction = "walk" | "hop" | null;
type FootName = "left" | "right";

type FootPhysics = {
  x: number;
  lift: number;
  startX: number;
  targetX: number;
  progress: number;
  moving: boolean;
};

type Physics = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;

  facing: 1 | -1;

  walkPhase: number;
  sitSwing: number;
  sitProgress: number;

  crouch: number;
  landing: number;
  stretch: number;

  bodyLean: number;
  bodyLeanVelocity: number;
  bodyShiftX: number;
  bodyShiftVelocity: number;
  bodyBob: number;
  bodyBobVelocity: number;

  breathePhase: number;

  gazeX: number;
  gazeY: number;

  blink: number;
  blinkStartedAt: number;
  nextBlinkAt: number;

  wave: number;
  wavePhase: number;
  waveUntil: number;

  leftFoot: FootPhysics;
  rightFoot: FootPhysics;
  activeFoot: FootName | null;
  lastStepFoot: FootName;
  lastStepAt: number;
};

const NAV_HEIGHT = 84;
const CHARACTER_SIZE = 88;

const GRAVITY = 1450;
const WALK_SPEED = 92;
const WALK_ACCEL = 430;
const WALK_BRAKE = 610;

const STANCE = 8;
const STEP_TRIGGER = 12;
const STEP_FORWARD = 21;
const STEP_HEIGHT = 10;

const SLEEPY_AFTER = 24000;
const SLEEP_AFTER = 52000;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const smoothstep = (t: number) => {
  const x = clamp(t, 0, 1);
  return x * x * (3 - 2 * x);
};

const easeInOutCubic = (t: number) => {
  const x = clamp(t, 0, 1);
  return x < 0.5
    ? 4 * x * x * x
    : 1 - Math.pow(-2 * x + 2, 3) / 2;
};

const approach = (current: number, target: number, maxDelta: number) => {
  if (current < target) return Math.min(current + maxDelta, target);
  return Math.max(current - maxDelta, target);
};

function springScalar(
  value: number,
  velocity: number,
  target: number,
  stiffness: number,
  damping: number,
  dt: number
) {
  const force = (target - value) * stiffness;
  const drag = -velocity * damping;
  const acceleration = force + drag;

  const nextVelocity = velocity + acceleration * dt;
  const nextValue = value + nextVelocity * dt;

  return [nextValue, nextVelocity] as const;
}

const INTERACTION_LINES = [
  "Хи-хи! 😄",
  "Щекотно!",
  "Я всё вижу 👀",
  "Ты меня поймал!",
  "Ну что, учимся?",
  "Я рядом ✨",
];

const WAKE_LINES = [
  "О! Ты вернулся 👀",
  "Я не спал!",
  "Уже продолжаем? 😄",
];

export default function WordyCompanion() {
  const { width, height } = useWindowDimensions();

  const [, forceRender] = useState(0);
  const [mode, setMode] = useState<Mode>("welcome");
  const [mood, setMood] = useState<WordyMood>("happy");
  const [speech, setSpeech] = useState("Привет! Я Wordy 👋");

  const modeRef = useRef<Mode>("welcome");
  const moodRef = useRef<WordyMood>("happy");

  const actionStartedAt = useRef(Date.now());
  const lastFrameAt = useRef<number | null>(null);
  const lastActivityAt = useRef(Date.now());
  const nextIdleActionAt = useRef(Date.now() + 8500);
  const idleLookResetAt = useRef(0);
  const avoidCooldownUntil = useRef(0);
  const welcomeSecondLineShown = useRef(false);

  const walkTarget = useRef(0);
  const walkReason = useRef<WalkReason>("home");
  const pendingAction = useRef<PendingAction>(null);
  const pendingWalkTarget = useRef(0);
  const pendingWalkReason = useRef<WalkReason>("home");
  const pauseUntil = useRef(0);

  const speechTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mouse = useRef({
    x: width / 2,
    y: height / 2,
    movedAt: 0,
  });

  const idleLook = useRef({ x: 0, y: 0 });

  const surfaceY = height - NAV_HEIGHT;
  const homeX = clamp(width * 0.875, 62, width - 52);
  const welcomeX = clamp(
    homeX - Math.min(175, Math.max(82, width * 0.28)),
    62,
    homeX - 58
  );

  const physics = useRef<Physics>({
    x: welcomeX,
    y: surfaceY,
    vx: 0,
    vy: 0,
    ax: 0,

    facing: 1,

    walkPhase: 0,
    sitSwing: 0,
    sitProgress: 0,

    crouch: 0,
    landing: 0,
    stretch: 0,

    bodyLean: 0,
    bodyLeanVelocity: 0,
    bodyShiftX: 0,
    bodyShiftVelocity: 0,
    bodyBob: 0,
    bodyBobVelocity: 0,

    breathePhase: 0,

    gazeX: 0,
    gazeY: 0,

    blink: 1,
    blinkStartedAt: -1,
    nextBlinkAt: Date.now() + 1800 + Math.random() * 1600,

    wave: 1,
    wavePhase: 0,
    waveUntil: Date.now() + 2200,

    leftFoot: {
      x: welcomeX - STANCE,
      lift: 0,
      startX: welcomeX - STANCE,
      targetX: welcomeX - STANCE,
      progress: 1,
      moving: false,
    },

    rightFoot: {
      x: welcomeX + STANCE,
      lift: 0,
      startX: welcomeX + STANCE,
      targetX: welcomeX + STANCE,
      progress: 1,
      moving: false,
    },

    activeFoot: null,
    lastStepFoot: "right",
    lastStepAt: 0,
  });

  const setModeSafe = (next: Mode) => {
    if (modeRef.current === next) return;
    modeRef.current = next;
    setMode(next);
    actionStartedAt.current = Date.now();
  };

  const setMoodSafe = (next: WordyMood) => {
    if (moodRef.current === next) return;
    moodRef.current = next;
    setMood(next);
  };

  const say = (text: string, duration = 1500) => {
    if (speechTimer.current) {
      clearTimeout(speechTimer.current);
      speechTimer.current = null;
    }

    setSpeech(text);

    if (duration > 0) {
      speechTimer.current = setTimeout(() => {
        setSpeech("");
        speechTimer.current = null;
      }, duration);
    }
  };

  const resetFeet = (centerX: number) => {
    const p = physics.current;

    p.leftFoot.x = centerX - STANCE;
    p.leftFoot.lift = 0;
    p.leftFoot.startX = centerX - STANCE;
    p.leftFoot.targetX = centerX - STANCE;
    p.leftFoot.progress = 1;
    p.leftFoot.moving = false;

    p.rightFoot.x = centerX + STANCE;
    p.rightFoot.lift = 0;
    p.rightFoot.startX = centerX + STANCE;
    p.rightFoot.targetX = centerX + STANCE;
    p.rightFoot.progress = 1;
    p.rightFoot.moving = false;

    p.activeFoot = null;
    p.lastStepFoot = "right";
  };

  const beginWalk = (target: number, reason: WalkReason) => {
    const p = physics.current;

    walkTarget.current = clamp(target, 46, width - 46);
    walkReason.current = reason;

    const dx = walkTarget.current - p.x;
    if (Math.abs(dx) > 1) {
      p.facing = dx >= 0 ? 1 : -1;
    }

    p.sitProgress = 0;
    p.crouch = 0;
    p.landing = 0;
    p.stretch = 0;

    setMoodSafe(reason === "dodge" ? "curious" : "idle");
    setModeSafe("walking");
  };

  const requestWalkFromSit = (target: number, reason: WalkReason) => {
    pendingAction.current = "walk";
    pendingWalkTarget.current = target;
    pendingWalkReason.current = reason;
    setModeSafe("standUp");
  };

  const requestHopFromSit = () => {
    pendingAction.current = "hop";
    setModeSafe("standUp");
  };

  const finishWalk = () => {
    const reason = walkReason.current;
    const p = physics.current;

    p.vx = 0;
    p.ax = 0;
    p.bodyLeanVelocity = 0;

    if (reason === "home" || reason === "return") {
      p.x = homeX;
      setMoodSafe("happy");
      setModeSafe("sitDown");
      return;
    }

    pauseUntil.current =
      Date.now() + (reason === "dodge" ? 1150 : 1450);
    setMoodSafe("curious");
    setModeSafe("pauseAway");
  };

  const startFootStep = (side: FootName, direction: 1 | -1) => {
    const p = physics.current;
    const foot = side === "left" ? p.leftFoot : p.rightFoot;
    const sideOffset = side === "left" ? -STANCE : STANCE;
    const speedFactor = clamp(Math.abs(p.vx) / WALK_SPEED, 0.25, 1);

    foot.startX = foot.x;
    foot.targetX =
      p.x +
      p.vx * 0.13 +
      sideOffset +
      direction * STEP_FORWARD * (0.72 + speedFactor * 0.28);
    foot.progress = 0;
    foot.lift = 0;
    foot.moving = true;

    p.activeFoot = side;
    p.lastStepAt = Date.now();
  };

  const updateFeetWhileWalking = (dt: number, direction: 1 | -1) => {
    const p = physics.current;
    const speed = Math.abs(p.vx);

    if (p.activeFoot) {
      const side = p.activeFoot;
      const foot = side === "left" ? p.leftFoot : p.rightFoot;
      const duration = clamp(0.39 - speed * 0.0015, 0.235, 0.37);

      foot.progress = clamp(foot.progress + dt / duration, 0, 1);

      const smooth = smoothstep(foot.progress);
      foot.x = lerp(foot.startX, foot.targetX, smooth);
      foot.lift =
        Math.sin(Math.PI * foot.progress) *
        STEP_HEIGHT *
        (0.72 + clamp(speed / WALK_SPEED, 0, 1) * 0.28);

      if (foot.progress >= 1) {
        foot.x = foot.targetX;
        foot.lift = 0;
        foot.moving = false;
        p.lastStepFoot = side;
        p.activeFoot = null;
      }

      return;
    }

    if (speed < 13) return;

    const leftLocal = p.leftFoot.x - p.x;
    const rightLocal = p.rightFoot.x - p.x;

    const trailingFoot: FootName =
      direction > 0
        ? leftLocal < rightLocal
          ? "left"
          : "right"
        : leftLocal > rightLocal
          ? "left"
          : "right";

    const trailingLocal = trailingFoot === "left" ? leftLocal : rightLocal;
    const stretched =
      direction > 0
        ? trailingLocal < -STEP_TRIGGER
        : trailingLocal > STEP_TRIGGER;

    const cadenceReady = Date.now() - p.lastStepAt > 145;

    if (stretched && cadenceReady) {
      let next: FootName = p.lastStepFoot === "left" ? "right" : "left";

      if (speed < 32) {
        next = trailingFoot;
      }

      startFootStep(next, direction);
    }
  };

  const updateWalking = (dt: number) => {
    const p = physics.current;
    const dx = walkTarget.current - p.x;
    const distance = Math.abs(dx);
    const direction: 1 | -1 = dx >= 0 ? 1 : -1;

    p.facing = direction;

    const maxSpeedForStop = Math.sqrt(Math.max(0, 2 * WALK_BRAKE * distance));
    const desiredSpeed =
      direction * Math.min(WALK_SPEED, maxSpeedForStop);

    const previousVx = p.vx;
    const accelerationLimit =
      Math.abs(desiredSpeed) < Math.abs(p.vx) ? WALK_BRAKE : WALK_ACCEL;

    p.vx = approach(p.vx, desiredSpeed, accelerationLimit * dt);
    p.ax = (p.vx - previousVx) / Math.max(dt, 0.001);

    p.x += p.vx * dt;

    updateFeetWhileWalking(dt, direction);

    const speedFactor = clamp(Math.abs(p.vx) / WALK_SPEED, 0, 1);
    p.walkPhase += Math.abs(p.vx) * dt * 0.087;

    const supportFoot =
      p.activeFoot === "left"
        ? p.rightFoot
        : p.activeFoot === "right"
          ? p.leftFoot
          : Math.abs(p.leftFoot.x - p.x) < Math.abs(p.rightFoot.x - p.x)
            ? p.leftFoot
            : p.rightFoot;

    const targetShift = clamp((supportFoot.x - p.x) * 0.12, -2.4, 2.4);
    const shiftSpring = springScalar(
      p.bodyShiftX,
      p.bodyShiftVelocity,
      targetShift,
      95,
      16,
      dt
    );
    p.bodyShiftX = shiftSpring[0];
    p.bodyShiftVelocity = shiftSpring[1];

    const targetBob =
      -Math.abs(Math.sin(p.walkPhase)) * 1.75 * speedFactor;
    const bobSpring = springScalar(
      p.bodyBob,
      p.bodyBobVelocity,
      targetBob,
      120,
      18,
      dt
    );
    p.bodyBob = bobSpring[0];
    p.bodyBobVelocity = bobSpring[1];

    const targetLean = clamp(p.vx / 25 + p.ax / 130, -7.2, 7.2);
    const leanSpring = springScalar(
      p.bodyLean,
      p.bodyLeanVelocity,
      targetLean,
      72,
      13,
      dt
    );
    p.bodyLean = leanSpring[0];
    p.bodyLeanVelocity = leanSpring[1];

    const arrived = distance < 2.5 && Math.abs(p.vx) < 8;

    if (arrived && !p.activeFoot) {
      p.x = walkTarget.current;
      finishWalk();
    }
  };

  const wakeWordy = () => {
    if (modeRef.current !== "sleeping") return;

    const line = WAKE_LINES[Math.floor(Math.random() * WAKE_LINES.length)];
    const p = physics.current;
    p.blink = 1;
    p.blinkStartedAt = -1;
    p.nextBlinkAt = Date.now() + 1800 + Math.random() * 1700;

    setMoodSafe("surprised");
    say(line, 1350);
    setModeSafe("sitting");
    nextIdleActionAt.current = Date.now() + 7000;
  };

  useEffect(() => {
    const p = physics.current;

    if (modeRef.current === "welcome") {
      p.x = welcomeX;
      p.y = surfaceY;
      resetFeet(welcomeX);
    } else if (
      modeRef.current === "sitting" ||
      modeRef.current === "sleeping" ||
      modeRef.current === "sitDown"
    ) {
      p.x = homeX;
      p.y = surfaceY;
    } else {
      p.y = Math.min(p.y, surfaceY);
      p.x = clamp(p.x, 46, width - 46);
    }
  }, [width, height, homeX, welcomeX, surfaceY]);

  useEffect(() => {
    if (Platform.OS !== "web") return;

    const browserWindow = (globalThis as any).window;
    if (!browserWindow?.addEventListener) return;

    const onMouseMove = (event: any) => {
      const now = Date.now();
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
      mouse.current.movedAt = now;
      lastActivityAt.current = now;

      wakeWordy();

      const p = physics.current;
      if (modeRef.current !== "sitting") return;
      if (now < avoidCooldownUntil.current) return;

      const sitAnchor = CHARACTER_SIZE * 0.87;
      const bodyCenterY = p.y - sitAnchor + CHARACTER_SIZE * 0.43;
      const dx = event.clientX - p.x;
      const dy = event.clientY - bodyCenterY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 76) {
        avoidCooldownUntil.current = now + 3200;

        const away: 1 | -1 = dx >= 0 ? -1 : 1;
        let target = p.x + away * 48;

        target = clamp(target, homeX - 100, homeX + 24);
        target = clamp(target, 52, width - 52);

        if (Math.abs(target - p.x) < 18) {
          target = clamp(p.x - 42, 52, width - 52);
        }

        setMoodSafe("surprised");
        say("Ой! 👀", 800);
        requestWalkFromSit(target, "dodge");
      }
    };

    const onActivity = () => {
      lastActivityAt.current = Date.now();
      wakeWordy();
    };

    browserWindow.addEventListener("mousemove", onMouseMove);
    browserWindow.addEventListener("mousedown", onActivity);
    browserWindow.addEventListener("keydown", onActivity);

    return () => {
      browserWindow.removeEventListener("mousemove", onMouseMove);
      browserWindow.removeEventListener("mousedown", onActivity);
      browserWindow.removeEventListener("keydown", onActivity);
    };
  }, [homeX, width]);

  useEffect(() => {
    let frameId = 0;

    const loop = (timestamp: number) => {
      if (lastFrameAt.current === null) {
        lastFrameAt.current = timestamp;
      }

      const rawDt = (timestamp - lastFrameAt.current) / 1000;
      const dt = clamp(rawDt, 0, 0.033);
      lastFrameAt.current = timestamp;

      const now = Date.now();
      const p = physics.current;
      const currentMode = modeRef.current;

      p.breathePhase += dt * (currentMode === "sleeping" ? 1.15 : 2.15);
      p.wavePhase += dt * 11;
      p.sitSwing += dt * (currentMode === "sleeping" ? 0.72 : 2.6);

      const waveTarget = now < p.waveUntil ? 1 : 0;
      p.wave = approach(p.wave, waveTarget, dt * 4.2);

      if (now >= p.nextBlinkAt && p.blinkStartedAt < 0) {
        p.blinkStartedAt = now;
      }

      if (p.blinkStartedAt >= 0) {
        const blinkDuration = moodRef.current === "sleepy" ? 260 : 170;
        const t = (now - p.blinkStartedAt) / blinkDuration;

        if (t >= 1) {
          p.blink = 1;
          p.blinkStartedAt = -1;
          p.nextBlinkAt =
            now +
            (moodRef.current === "sleepy"
              ? 1500 + Math.random() * 1800
              : 2400 + Math.random() * 3300);
        } else if (t < 0.5) {
          p.blink = lerp(1, 0.05, smoothstep(t * 2));
        } else {
          p.blink = lerp(0.05, 1, smoothstep((t - 0.5) * 2));
        }
      }

      const standAnchor = CHARACTER_SIZE * 1.3;
      const sitAnchor = CHARACTER_SIZE * 0.87;
      const currentAnchor = lerp(standAnchor, sitAnchor, p.sitProgress);
      const bodyCenterY = p.y - currentAnchor + CHARACTER_SIZE * 0.43;

      if (idleLookResetAt.current > 0 && now > idleLookResetAt.current) {
        idleLook.current = { x: 0, y: 0 };
        idleLookResetAt.current = 0;
      }

      const mouseRecentlyMoved = now - mouse.current.movedAt < 2600;
      const targetLookX = mouseRecentlyMoved
        ? clamp((mouse.current.x - p.x) / 165, -1, 1)
        : idleLook.current.x;
      const targetLookY = mouseRecentlyMoved
        ? clamp((mouse.current.y - bodyCenterY) / 135, -1, 1)
        : idleLook.current.y;

      p.gazeX += (targetLookX - p.gazeX) * Math.min(1, dt * 8.5);
      p.gazeY += (targetLookY - p.gazeY) * Math.min(1, dt * 8.5);

      if (currentMode === "welcome") {
        p.y = surfaceY;
        p.vx = 0;
        p.vy = 0;
        p.bodyBob = Math.sin(now / 430) * 0.55;
        p.bodyLean = Math.sin(now / 720) * 1.1;

        const elapsed = now - actionStartedAt.current;

        if (elapsed > 950 && !welcomeSecondLineShown.current) {
          welcomeSecondLineShown.current = true;
          say("Я буду рядом ✨", 1250);
        }

        if (elapsed > 2350) {
          p.waveUntil = 0;
          beginWalk(homeX, "home");
        }
      }

      if (currentMode === "walking") {
        p.y = surfaceY;
        p.crouch = approach(p.crouch, 0, dt * 5);
        p.landing = approach(p.landing, 0, dt * 4);
        p.stretch = approach(p.stretch, 0, dt * 5);
        updateWalking(dt);
      }

      if (currentMode === "sitDown") {
        const t = clamp((now - actionStartedAt.current) / 520, 0, 1);
        const eased = easeInOutCubic(t);

        p.sitProgress = eased;
        p.vx = 0;
        p.ax = 0;
        p.bodyLean = approach(p.bodyLean, 0, dt * 14);
        p.bodyShiftX = approach(p.bodyShiftX, 0, dt * 12);
        p.bodyBob = approach(p.bodyBob, 0, dt * 10);
        p.crouch = Math.sin(Math.PI * t) * 0.22;

        if (t >= 1) {
          p.sitProgress = 1;
          p.crouch = 0;
          setMoodSafe("idle");
          setModeSafe("sitting");
          nextIdleActionAt.current = now + 6500 + Math.random() * 4500;
        }
      }

      if (currentMode === "sitting") {
        p.y = surfaceY;
        p.vx = 0;
        p.vy = 0;
        p.ax = 0;
        p.sitProgress = 1;
        p.crouch = 0;
        p.landing = approach(p.landing, 0, dt * 4);
        p.stretch = 0;

        const leanSpring = springScalar(
          p.bodyLean,
          p.bodyLeanVelocity,
          0,
          52,
          11,
          dt
        );
        p.bodyLean = leanSpring[0];
        p.bodyLeanVelocity = leanSpring[1];

        p.bodyBob = Math.sin(p.breathePhase * 0.55) * 0.22;
        p.bodyShiftX = Math.sin(p.sitSwing * 0.35) * 0.35;

        const inactiveFor = now - lastActivityAt.current;

        if (inactiveFor > SLEEP_AFTER) {
          setMoodSafe("sleeping");
          setSpeech("zzz...");
          setModeSafe("sleeping");
        } else if (inactiveFor > SLEEPY_AFTER) {
          setMoodSafe("sleepy");
        } else if (inactiveFor > 12000) {
          setMoodSafe("curious");
        } else if (moodRef.current !== "happy") {
          setMoodSafe("idle");
        }

        if (now > nextIdleActionAt.current && inactiveFor < 12000) {
          const random = Math.random();

          if (random < 0.38) {
            idleLook.current = {
              x: Math.random() > 0.5 ? 0.75 : -0.75,
              y: -0.25 + Math.random() * 0.45,
            };
            idleLookResetAt.current = now + 1500;
            setMoodSafe("curious");
            nextIdleActionAt.current = now + 4500 + Math.random() * 4000;
          } else if (random < 0.61) {
            p.waveUntil = now + 1200;
            setMoodSafe("happy");
            nextIdleActionAt.current = now + 7000 + Math.random() * 5000;
          } else {
            const strollDistance = 46 + Math.random() * 48;
            const target = clamp(homeX - strollDistance, 52, homeX - 28);
            requestWalkFromSit(target, "stroll");
            nextIdleActionAt.current = now + 11000 + Math.random() * 7000;
          }
        }
      }

      if (currentMode === "standUp") {
        const t = clamp((now - actionStartedAt.current) / 430, 0, 1);
        const eased = easeInOutCubic(t);

        p.sitProgress = 1 - eased;
        p.crouch = Math.sin(Math.PI * t) * 0.18;
        p.bodyLean = lerp(0, -2.2 * p.facing, Math.sin(Math.PI * t));

        if (t >= 1) {
          p.sitProgress = 0;
          p.crouch = 0;
          p.bodyLean = 0;
          resetFeet(p.x);

          if (pendingAction.current === "hop") {
            pendingAction.current = null;
            setMoodSafe("happy");
            setModeSafe("hopPrep");
          } else {
            const target = pendingWalkTarget.current;
            const reason = pendingWalkReason.current;
            pendingAction.current = null;
            beginWalk(target, reason);
          }
        }
      }

      if (currentMode === "pauseAway") {
        p.y = surfaceY;
        p.vx = 0;
        p.ax = 0;
        p.sitProgress = 0;
        p.bodyBob = Math.sin(p.breathePhase * 0.7) * 0.3;

        const dxToMouse = mouse.current.x - p.x;
        if (Math.abs(dxToMouse) > 2) {
          p.gazeX = clamp(dxToMouse / 160, -1, 1);
        }

        if (now >= pauseUntil.current) {
          beginWalk(homeX, "return");
        }
      }

      if (currentMode === "hopPrep") {
        const t = clamp((now - actionStartedAt.current) / 245, 0, 1);
        const eased = smoothstep(t);

        p.crouch = eased;
        p.bodyBob = eased * 2.2;
        p.bodyLean = p.facing * 1.8 * eased;

        if (t >= 1) {
          p.crouch = 0;
          p.stretch = 0.32;
          p.vy = -385;
          p.vx = p.facing * 16;
          setMoodSafe("happy");
          setModeSafe("hopAir");
        }
      }

      if (currentMode === "hopAir") {
        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        p.vx = approach(p.vx, 0, 34 * dt);
        p.stretch = clamp(-p.vy / 600, 0, 0.34);

        const targetLean = clamp(p.vx / 17, -4, 4);
        const leanSpring = springScalar(
          p.bodyLean,
          p.bodyLeanVelocity,
          targetLean,
          55,
          10,
          dt
        );
        p.bodyLean = leanSpring[0];
        p.bodyLeanVelocity = leanSpring[1];

        if (p.y >= surfaceY) {
          const impactSpeed = Math.abs(p.vy);
          p.y = surfaceY;
          p.vy = 0;
          p.vx *= 0.35;
          p.stretch = 0;
          p.landing = clamp(impactSpeed / 560, 0.48, 1);
          p.crouch = 0.32;
          setMoodSafe("surprised");
          setModeSafe("landing");
        }
      }

      if (currentMode === "landing") {
        const elapsed = now - actionStartedAt.current;

        p.vx = approach(p.vx, 0, 180 * dt);
        p.landing = approach(p.landing, 0, dt * 3.8);
        p.crouch = approach(p.crouch, 0, dt * 2.8);

        const leanSpring = springScalar(
          p.bodyLean,
          p.bodyLeanVelocity,
          0,
          72,
          13,
          dt
        );
        p.bodyLean = leanSpring[0];
        p.bodyLeanVelocity = leanSpring[1];

        if (elapsed > 430) {
          p.landing = 0;
          p.crouch = 0;
          p.x = clamp(p.x, 52, width - 52);

          if (Math.abs(p.x - homeX) > 8) {
            beginWalk(homeX, "return");
          } else {
            p.x = homeX;
            resetFeet(homeX);
            setMoodSafe("happy");
            setModeSafe("sitDown");
          }
        }
      }

      if (currentMode === "sleeping") {
        p.y = surfaceY;
        p.vx = 0;
        p.vy = 0;
        p.sitProgress = 1;
        p.bodyLean = Math.sin(now / 1200) * 1.1;
        p.bodyBob = Math.sin(now / 950) * 0.55;
        p.wave = approach(p.wave, 0, dt * 4);
        p.blink = 0;
      }

      forceRender((value) => (value + 1) % 1000000);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      lastFrameAt.current = null;
    };
  }, [width, height, homeX, surfaceY]);

  useEffect(() => {
    return () => {
      if (speechTimer.current) {
        clearTimeout(speechTimer.current);
      }
    };
  }, []);

  const interact = () => {
    const now = Date.now();
    lastActivityAt.current = now;

    if (modeRef.current === "sleeping") {
      wakeWordy();
      return;
    }

    if (
      modeRef.current === "walking" ||
      modeRef.current === "standUp" ||
      modeRef.current === "hopPrep" ||
      modeRef.current === "hopAir" ||
      modeRef.current === "landing"
    ) {
      return;
    }

    const phrase =
      INTERACTION_LINES[Math.floor(Math.random() * INTERACTION_LINES.length)];

    say(phrase, 1350);
    setMoodSafe("happy");

    const p = physics.current;
    p.waveUntil = now + 850;

    if (modeRef.current === "sitting") {
      requestHopFromSit();
    }
  };

  const p = physics.current;

  let pose: WordyPose = "stand";
  if (mode === "walking") pose = "walk";
  if (mode === "sitting" || mode === "sitDown" || mode === "sleeping") {
    pose = "sit";
  }
  if (mode === "hopAir") pose = "air";

  const standAnchor = CHARACTER_SIZE * 1.3;
  const sitAnchor = CHARACTER_SIZE * 0.87;
  const anchor = lerp(standAnchor, sitAnchor, p.sitProgress);

  const stageWidth = CHARACTER_SIZE * 1.56;
  const left = p.x - stageWidth / 2;
  const top = p.y - anchor;

  const leftFoot: WordyFoot = {
    x: p.leftFoot.x - p.x,
    lift: p.leftFoot.lift,
  };

  const rightFoot: WordyFoot = {
    x: p.rightFoot.x - p.x,
    lift: p.rightFoot.lift,
  };

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
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
          <View pointerEvents="none" style={styles.speech}>
            <WordySpeechBubble text={speech} compact />
          </View>
        )}

        <Pressable onPress={interact} hitSlop={12} style={styles.pressArea}>
          <WordyMascot
            size={CHARACTER_SIZE}
            mood={mood}
            pose={pose}
            lookX={p.gazeX}
            lookY={p.gazeY}
            blink={p.blink}
            facing={p.facing}
            walkPhase={p.walkPhase}
            speed={p.vx}
            verticalVelocity={p.vy}
            leftFoot={leftFoot}
            rightFoot={rightFoot}
            sitProgress={p.sitProgress}
            sitSwing={p.sitSwing}
            crouch={p.crouch}
            landing={p.landing}
            stretch={p.stretch}
            bodyLean={p.bodyLean}
            bodyShiftX={p.bodyShiftX}
            bodyBob={p.bodyBob}
            breathe={Math.sin(p.breathePhase)}
            wave={p.wave}
            wavePhase={p.wavePhase}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  characterLayer: {
    position: "absolute",
    zIndex: 5000,
    alignItems: "center",
    overflow: "visible",
  },

  pressArea: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "visible",
  },

  speech: {
    position: "absolute",
    bottom: "93%",
    right: "28%",
    zIndex: 5100,
  },
});
