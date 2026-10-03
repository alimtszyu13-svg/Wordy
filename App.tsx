import React from "react";

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
} from "react-native";

import WordyCompanion from "./src/components/WordyCompanion";

export default function App() {
  return (
    <SafeAreaView style={styles.app}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.background}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.page}
      >
        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>
              Доброе утро!
            </Text>

            <Text style={styles.userName}>
              Начнём день с английского?
            </Text>
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.avatar,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.avatarText}>
              A
            </Text>
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* WORDY HERO */}
        {/* ================================================= */}

        <View style={styles.hero}>

          <View style={styles.wordyMessage}>
            <Text style={styles.wordyName}>
              Wordy
            </Text>

            <Text style={styles.wordyMessageText}>
              У тебя сегодня 5 новых слов.
              Я буду рядом ✨
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* DAILY PLAN */}
        {/* ================================================= */}

        <View style={styles.dailyCard}>
          <View style={styles.dailyTop}>
            <View style={styles.dailyTitleArea}>
              <View style={styles.todayPill}>
                <Text style={styles.todayText}>
                  СЕГОДНЯ
                </Text>
              </View>

              <Text style={styles.dailyTitle}>
                5 новых слов
              </Text>

              <Text style={styles.dailySubtitle}>
                Примерно 5 минут обучения
              </Text>
            </View>

            <View style={styles.streak}>
              <Text style={styles.streakFlame}>
                🔥
              </Text>

              <View>
                <Text style={styles.streakNumber}>
                  1
                </Text>

                <Text style={styles.streakLabel}>
                  день
                </Text>
              </View>
            </View>
          </View>

          {/* PROGRESS */}

          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>
              Дневная цель
            </Text>

            <Text style={styles.progressValue}>
              0 / 5
            </Text>
          </View>

          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          {/* BUTTON */}

          <Pressable
            style={({ pressed }) => [
              styles.learnButton,
              pressed && styles.learnButtonPressed,
            ]}
          >
            <Text style={styles.learnButtonText}>
              Начать урок
            </Text>

            <View style={styles.buttonArrowCircle}>
              <Text style={styles.buttonArrow}>
                →
              </Text>
            </View>
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* REVIEW */}
        {/* ================================================= */}

        <Pressable
          style={({ pressed }) => [
            styles.reviewCard,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.reviewIcon}>
            <Text style={styles.reviewIconText}>
              ↻
            </Text>
          </View>

          <View style={styles.reviewContent}>
            <Text style={styles.reviewTitle}>
              Повторение
            </Text>

            <Text style={styles.reviewSubtitle}>
              На сегодня всё повторено
            </Text>
          </View>

          <Text style={styles.chevron}>
            ›
          </Text>
        </Pressable>

        {/* ================================================= */}
        {/* PROGRESS TITLE */}
        {/* ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Твой прогресс
          </Text>

          <Pressable>
            <Text style={styles.sectionAction}>
              Подробнее
            </Text>
          </Pressable>
        </View>

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <View style={styles.stats}>
          <View style={styles.statCard}>
            <View
              style={[
                styles.statIcon,
                styles.wordsIcon,
              ]}
            >
              <Text style={styles.statIconText}>
                Aa
              </Text>
            </View>

            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              выучено слов
            </Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[
                styles.statIcon,
                styles.daysIcon,
              ]}
            >
              <Text style={styles.statIconText}>
                🔥
              </Text>
            </View>

            <Text style={styles.statNumber}>
              1
            </Text>

            <Text style={styles.statLabel}>
              день подряд
            </Text>
          </View>

          <View style={styles.statCard}>
            <View
              style={[
                styles.statIcon,
                styles.xpIcon,
              ]}
            >
              <Text style={styles.statIconText}>
                ★
              </Text>
            </View>

            <Text style={styles.statNumber}>
              0
            </Text>

            <Text style={styles.statLabel}>
              опыта
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* WORD OF DAY */}
        {/* ================================================= */}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Слово дня
            </Text>

            <Text style={styles.sectionSubtitle}>
              Одно слово — уже прогресс
            </Text>
          </View>
        </View>

        <View style={styles.wordCard}>
          <View style={styles.wordTop}>
            <View style={styles.wordInformation}>
              <Text style={styles.word}>
                achieve
              </Text>

              <Text style={styles.transcription}>
                /əˈtʃiːv/
              </Text>
            </View>

            <Pressable
              style={({ pressed }) => [
                styles.audioButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.audioIcon}>
                ♪
              </Text>
            </Pressable>
          </View>

          <View style={styles.wordDivider} />

          <Text style={styles.translation}>
            достигать
          </Text>

          <Text style={styles.secondaryTranslation}>
            добиваться • достигать цели
          </Text>

          <View style={styles.exampleBox}>
            <Text style={styles.example}>
              You can achieve your goals.
            </Text>

            <Text style={styles.exampleTranslation}>
              Ты можешь достичь своих целей.
            </Text>
          </View>
        </View>

        {/* ================================================= */}
        {/* SMALL MOTIVATION */}
        {/* ================================================= */}

        <View style={styles.motivation}>
          <View style={styles.motivationSparkle}>
            <Text style={styles.sparkle}>
              ✦
            </Text>
          </View>

          <View style={styles.motivationContent}>
            <Text style={styles.motivationTitle}>
              Пять слов — отличный старт
            </Text>

            <Text style={styles.motivationText}>
              В таком темпе за год ты познакомишься
              более чем с 1 800 словами.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ================================================= */}
      {/* NAVIGATION */}
      {/* ================================================= */}

      <View style={styles.navigation}>
        <Pressable style={styles.navItem}>
          <View style={styles.activeNavIcon}>
            <Text style={styles.activeNavSymbol}>
              ●
            </Text>
          </View>

          <Text style={styles.activeNavText}>
            Главная
          </Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navSymbol}>
              Aa
            </Text>
          </View>

          <Text style={styles.navText}>
            Учить
          </Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navSymbol}>
              ◫
            </Text>
          </View>

          <Text style={styles.navText}>
            Прогресс
          </Text>
        </Pressable>

        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <Text style={styles.navSymbol}>
              ⚙
            </Text>
          </View>

          <Text style={styles.navText}>
            Настройки
          </Text>
        </Pressable>
      </View>
      <WordyCompanion />
    </SafeAreaView>
  );
}

// ============================================================
// COLORS
// ============================================================

const COLORS = {
  background: "#FFF9F2",

  surface: "#FFFFFF",

  text: "#2B2926",

  secondary: "#79736C",

  muted: "#AAA39A",

  border: "#EEE7DE",

  orange: "#FF7A1A",

  orangePressed: "#EA6910",

  orangeSoft: "#FFF0E3",

  orangeSoft2: "#FFE5CF",

  greenSoft: "#EAF6E9",

  purpleSoft: "#F2EDFF",

  track: "#F0EBE5",
};

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  app: {
    flex: 1,

    backgroundColor: COLORS.background,
  },

  page: {
    width: "100%",

    maxWidth: 760,

    alignSelf: "center",

    paddingHorizontal: 24,

    paddingTop: 34,

    paddingBottom: 135,
  },

  pressed: {
    opacity: 0.72,
  },

  // ============================================================
  // HEADER
  // ============================================================

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",
  },

  greeting: {
    color: COLORS.text,

    fontSize: 27,

    fontWeight: "800",

    letterSpacing: -0.6,
  },

  userName: {
    marginTop: 5,

    color: COLORS.secondary,

    fontSize: 14,

    fontWeight: "500",
  },

  avatar: {
    width: 46,

    height: 46,

    borderRadius: 23,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: COLORS.orangeSoft,
  },

  avatarText: {
    color: COLORS.orange,

    fontSize: 17,

    fontWeight: "800",
  },

  // ============================================================
  // HERO
  // ============================================================

  hero: {
    marginTop: 23,

    alignItems: "center",
  },

  wordyMessage: {
    maxWidth: 390,

    marginTop: 3,

    alignItems: "center",
  },

  wordyName: {
    color: COLORS.orange,

    fontSize: 13,

    fontWeight: "800",

    letterSpacing: 0.5,
  },

  wordyMessageText: {
    marginTop: 5,

    color: COLORS.secondary,

    fontSize: 14,

    fontWeight: "500",

    lineHeight: 20,

    textAlign: "center",
  },

  // ============================================================
  // DAILY
  // ============================================================

  dailyCard: {
    marginTop: 25,

    padding: 24,

    backgroundColor: COLORS.surface,

    borderRadius: 28,

    borderWidth: 1,

    borderColor: COLORS.border,

    shadowColor: "#8B735C",

    shadowOpacity: 0.06,

    shadowRadius: 18,

    shadowOffset: {
      width: 0,

      height: 8,
    },

    elevation: 2,
  },

  dailyTop: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-start",
  },

  dailyTitleArea: {
    flex: 1,

    paddingRight: 15,
  },

  todayPill: {
    alignSelf: "flex-start",

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 999,

    backgroundColor: COLORS.orangeSoft,
  },

  todayText: {
    color: COLORS.orange,

    fontSize: 10,

    fontWeight: "900",

    letterSpacing: 1,
  },

  dailyTitle: {
    marginTop: 13,

    color: COLORS.text,

    fontSize: 24,

    fontWeight: "800",

    letterSpacing: -0.5,
  },

  dailySubtitle: {
    marginTop: 5,

    color: COLORS.secondary,

    fontSize: 13,

    fontWeight: "500",
  },

  streak: {
    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 12,

    paddingVertical: 9,

    borderRadius: 17,

    backgroundColor: COLORS.orangeSoft,
  },

  streakFlame: {
    marginRight: 7,

    fontSize: 19,
  },

  streakNumber: {
    color: COLORS.text,

    fontSize: 15,

    fontWeight: "800",

    lineHeight: 16,
  },

  streakLabel: {
    color: COLORS.secondary,

    fontSize: 9,

    fontWeight: "600",
  },

  progressHeader: {
    marginTop: 25,

    marginBottom: 9,

    flexDirection: "row",

    justifyContent: "space-between",
  },

  progressLabel: {
    color: COLORS.secondary,

    fontSize: 12,

    fontWeight: "600",
  },

  progressValue: {
    color: COLORS.orange,

    fontSize: 12,

    fontWeight: "800",
  },

  progressTrack: {
    height: 9,

    borderRadius: 999,

    overflow: "hidden",

    backgroundColor: COLORS.track,
  },

  progressFill: {
    width: "3%",

    height: "100%",

    borderRadius: 999,

    backgroundColor: COLORS.orange,
  },

  learnButton: {
    height: 58,

    marginTop: 22,

    paddingHorizontal: 20,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "center",

    borderRadius: 18,

    backgroundColor: COLORS.orange,

    shadowColor: COLORS.orange,

    shadowOpacity: 0.17,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,

      height: 6,
    },

    elevation: 3,
  },

  learnButtonPressed: {
    backgroundColor: COLORS.orangePressed,

    transform: [
      {
        scale: 0.99,
      },
    ],
  },

  learnButtonText: {
    color: "#FFFFFF",

    fontSize: 15,

    fontWeight: "800",
  },

  buttonArrowCircle: {
    width: 28,

    height: 28,

    marginLeft: 12,

    borderRadius: 14,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "rgba(255,255,255,0.18)",
  },

  buttonArrow: {
    marginTop: -2,

    color: "#FFFFFF",

    fontSize: 17,

    fontWeight: "700",
  },

  // ============================================================
  // REVIEW
  // ============================================================

  reviewCard: {
    minHeight: 76,

    marginTop: 13,

    paddingHorizontal: 16,

    flexDirection: "row",

    alignItems: "center",

    borderRadius: 22,

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.surface,
  },

  reviewIcon: {
    width: 44,

    height: 44,

    borderRadius: 15,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: COLORS.greenSoft,
  },

  reviewIconText: {
    color: "#5C9B61",

    fontSize: 25,

    fontWeight: "500",
  },

  reviewContent: {
    flex: 1,

    marginLeft: 14,
  },

  reviewTitle: {
    color: COLORS.text,

    fontSize: 14,

    fontWeight: "700",
  },

  reviewSubtitle: {
    marginTop: 3,

    color: COLORS.secondary,

    fontSize: 12,

    fontWeight: "500",
  },

  chevron: {
    color: COLORS.muted,

    fontSize: 28,

    fontWeight: "300",
  },

  // ============================================================
  // SECTION
  // ============================================================

  sectionHeader: {
    marginTop: 31,

    marginBottom: 13,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "flex-end",
  },

  sectionTitle: {
    color: COLORS.text,

    fontSize: 20,

    fontWeight: "800",

    letterSpacing: -0.3,
  },

  sectionSubtitle: {
    marginTop: 4,

    color: COLORS.secondary,

    fontSize: 12,

    fontWeight: "500",
  },

  sectionAction: {
    color: COLORS.orange,

    fontSize: 12,

    fontWeight: "700",
  },

  // ============================================================
  // STATS
  // ============================================================

  stats: {
    flexDirection: "row",

    gap: 11,
  },

  statCard: {
    flex: 1,

    minHeight: 139,

    paddingVertical: 17,

    paddingHorizontal: 8,

    alignItems: "center",

    borderRadius: 22,

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.surface,
  },

  statIcon: {
    width: 40,

    height: 40,

    borderRadius: 14,

    alignItems: "center",

    justifyContent: "center",
  },

  wordsIcon: {
    backgroundColor: COLORS.orangeSoft,
  },

  daysIcon: {
    backgroundColor: "#FFF2DE",
  },

  xpIcon: {
    backgroundColor: COLORS.purpleSoft,
  },

  statIconText: {
    color: COLORS.orange,

    fontSize: 16,

    fontWeight: "900",
  },

  statNumber: {
    marginTop: 9,

    color: COLORS.text,

    fontSize: 22,

    fontWeight: "800",
  },

  statLabel: {
    marginTop: 3,

    color: COLORS.secondary,

    fontSize: 11,

    fontWeight: "500",

    textAlign: "center",
  },

  // ============================================================
  // WORD CARD
  // ============================================================

  wordCard: {
    padding: 22,

    borderRadius: 25,

    borderWidth: 1,

    borderColor: COLORS.border,

    backgroundColor: COLORS.surface,
  },

  wordTop: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  wordInformation: {
    flex: 1,
  },

  word: {
    color: COLORS.text,

    fontSize: 29,

    fontWeight: "800",

    letterSpacing: -0.6,
  },

  transcription: {
    marginTop: 3,

    color: COLORS.orange,

    fontSize: 14,

    fontWeight: "600",
  },

  audioButton: {
    width: 48,

    height: 48,

    alignItems: "center",

    justifyContent: "center",

    borderRadius: 16,

    backgroundColor: COLORS.orangeSoft,
  },

  audioIcon: {
    color: COLORS.orange,

    fontSize: 21,

    fontWeight: "900",
  },

  wordDivider: {
    height: 1,

    marginVertical: 17,

    backgroundColor: COLORS.border,
  },

  translation: {
    color: COLORS.text,

    fontSize: 17,

    fontWeight: "700",
  },

  secondaryTranslation: {
    marginTop: 4,

    color: COLORS.secondary,

    fontSize: 12,

    fontWeight: "500",
  },

  exampleBox: {
    marginTop: 17,

    padding: 15,

    borderRadius: 17,

    backgroundColor: "#FAF7F3",
  },

  example: {
    color: COLORS.text,

    fontSize: 13,

    fontWeight: "600",

    lineHeight: 19,
  },

  exampleTranslation: {
    marginTop: 4,

    color: COLORS.secondary,

    fontSize: 12,

    fontWeight: "500",

    lineHeight: 18,
  },

  // ============================================================
  // MOTIVATION
  // ============================================================

  motivation: {
    marginTop: 17,

    padding: 17,

    flexDirection: "row",

    alignItems: "center",

    borderRadius: 21,

    backgroundColor: COLORS.orangeSoft,
  },

  motivationSparkle: {
    width: 42,

    height: 42,

    borderRadius: 14,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#FFFFFF",
  },

  sparkle: {
    color: COLORS.orange,

    fontSize: 20,
  },

  motivationContent: {
    flex: 1,

    marginLeft: 13,
  },

  motivationTitle: {
    color: COLORS.text,

    fontSize: 13,

    fontWeight: "800",
  },

  motivationText: {
    marginTop: 3,

    color: COLORS.secondary,

    fontSize: 11,

    fontWeight: "500",

    lineHeight: 17,
  },

  // ============================================================
  // NAVIGATION
  // ============================================================

  navigation: {
    position: "absolute",

    left: 0,

    right: 0,

    bottom: 0,

    height: 84,

    paddingTop: 9,

    flexDirection: "row",

    justifyContent: "space-around",

    alignItems: "flex-start",

    backgroundColor: "rgba(255,255,255,0.97)",

    borderTopWidth: 1,

    borderTopColor: COLORS.border,

    shadowColor: "#8B735C",

    shadowOpacity: 0.06,

    shadowRadius: 15,

    shadowOffset: {
      width: 0,

      height: -5,
    },
  },

  navItem: {
    minWidth: 72,

    alignItems: "center",
  },

  navIcon: {
    width: 44,

    height: 34,

    alignItems: "center",

    justifyContent: "center",
  },

  activeNavIcon: {
    width: 50,

    height: 34,

    alignItems: "center",

    justifyContent: "center",

    borderRadius: 14,

    backgroundColor: COLORS.orangeSoft,
  },

  navSymbol: {
    color: COLORS.secondary,

    fontSize: 16,

    fontWeight: "800",
  },

  activeNavSymbol: {
    color: COLORS.orange,

    fontSize: 16,

    fontWeight: "900",
  },

  navText: {
    marginTop: 3,

    color: COLORS.secondary,

    fontSize: 10,

    fontWeight: "600",
  },

  activeNavText: {
    marginTop: 3,

    color: COLORS.orange,

    fontSize: 10,

    fontWeight: "800",
  },
});