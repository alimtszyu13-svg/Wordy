# Wordy в Google Play: что вставлять в Play Console

## Основное
- **Название приложения:** Wordy — английский с Ворди
- **Пакет (package name):** `com.alimtszyu.wordy`. Его нельзя будет поменять никогда.
- **Категория:** Образование (Education)
- **Политика конфиденциальности:** https://wordy-b5142.web.app/privacy.html
- **Email для связи:** твой email
- **Цена:** бесплатно, без рекламы, без покупок

## Краткое описание (до 80 символов)
**RU:** Слова с умным повторением, грамматика A1–C1, пробные IELTS и SAT
**EN:** Smart-review vocabulary, A1–C1 grammar, IELTS and SAT practice tests

## Полное описание (RU)
Wordy — бесплатное приложение, чтобы выучить английский с нуля до уровня C1. С тобой учится Ворди — оранжевый друг, который радуется твоим успехам, подбадривает после ошибок и напоминает о повторении.

СЛОВА, КОТОРЫЕ НЕ ЗАБЫВАЮТСЯ
• Больше 5000 слов основного курса по уровням A1–C1 и по темам: люди и семья, еда, работа, общество, наука и другие
• Умное повторение: Ворди показывает слово как раз тогда, когда ты начинаешь его забывать
• Задания становятся сложнее, когда слово закрепляется: выбор ответа, ввод с клавиатуры, на слух, в предложении
• Транскрипция, перевод, определение и пример к каждому слову
• Отдельные наборы для IELTS, SAT и идиом

ГРАММАТИКА A1–C1
• 107 уроков: подробная теория на русском, примеры, типичные ошибки
• Упражнения с проверкой и звёздами за каждый урок
• Выдели непонятное место — и Ворди объяснит правило

ЧТЕНИЕ И АУДИРОВАНИЕ
• 140 текстов по уровням: истории, наука, классика
• Нажми на слово — увидишь перевод, выдели предложение — Ворди переведёт и разберёт грамматику
• Диктанты на слух

ПРОБНЫЕ IELTS И SAT
• 10 полных пробных IELTS Academic: Listening, Reading, Writing, Speaking
• Speaking с экзаменатором: вопросы голосом, запись ответа, оценка беглости, словаря, грамматики и произношения с помощью ИИ
• Проверка эссе Writing с примерным баллом и исправлениями
• Пробный SAT

ДЛЯ УЧИТЕЛЕЙ
• Группы учеников, домашние задания, проверка и комментарии
• Живые викторины на уроке

ИГРЫ И НАГРАДЫ
• Игры со словами, монеты, достижения, серии дней и одежда для Ворди

Функции с ИИ доступны с 13 лет. Оценка ИИ ориентировочная и не заменяет официальный экзамен.

## Full description (EN)
Wordy is a free app for learning English from zero to C1, with Wordy — a cheerful orange companion who celebrates your progress, cheers you up after mistakes and reminds you to review.

WORDS THAT STICK
• 5,000+ core words from A1 to C1, organised by topic
• Smart spaced repetition: each word comes back just as you start to forget it
• Tasks get harder as a word settles: multiple choice, typing, listening, using it in a sentence
• IPA, Russian translation, definition and example for every word
• Extra sets for IELTS, SAT and idioms

GRAMMAR A1–C1
• 107 lessons with clear theory, examples and common mistakes
• Exercises with instant checking and stars
• Select anything confusing and Wordy explains it

READING AND LISTENING
• 140 graded texts: stories, science, classics
• Tap a word to translate it, select a sentence to get an explanation

IELTS AND SAT PRACTICE
• 10 full IELTS Academic practice tests
• Speaking with a virtual examiner: AI feedback on fluency, vocabulary, grammar and pronunciation
• Writing feedback with an estimated band and corrections
• SAT practice test

FOR TEACHERS
• Student groups, homework, feedback and live classroom quizzes

AI features are available from age 13. AI scores are estimates and do not replace an official exam.

## Графика
- Иконка 512×512: `icon-512.png`
- Баннер 1024×500: `feature-graphic.png`
- Скриншоты телефона (1080×1920, 7 штук): папка `screenshots`

## Целевая аудитория и контент
- **Возраст:** отметить группы «до 13» и старше. Приложение попадёт под правила Families.
- **Реклама:** нет.
- **Приложение с ИИ:** да. Генерирует тексты-объяснения и оценки. В каждом ответе ИИ есть «Пожаловаться на ответ ИИ».
- **Вход в аккаунт:** необязателен, учиться можно без него. Если Google попросит данные для проверки, создай тестовый аккаунт сам и отдай им его.

## Безопасность данных (Data safety). Черновик, сверь перед отправкой
Собираются:
- **Личные данные:** имя и email — только при регистрации (необязательно). Нужны для аккаунта.
- **Действия в приложении:** прогресс обучения, ответы в заданиях. Нужны для работы приложения и синхронизации между устройствами.
- **Контент пользователя:** эссе, ответы, домашние задания (Firestore) — для работы приложения.
- **Аудио:** запись голоса при ответе голосом. Отправляется в Google Gemini для расшифровки и оценки и не хранится в Wordy. Для детей до 13 лет не отправляется.
- **Идентификаторы устройства:** случайный номер устройства для анонимной статистики.

Передача третьим лицам: тексты и записи голоса для ИИ-проверки уходят в Google Gemini. Google на бесплатном тарифе может использовать их для улучшения сервисов. Поэтому честнее отметить «передаются» (shared) для аудио и пользовательского контента.

Ещё отметить:
- данные шифруются при передаче — да;
- пользователь может удалить данные — да (удаление аккаунта в профиле).

## Пакет для Play (PWABuilder)
1. Открой https://www.pwabuilder.com → введи `https://wordy-b5142.web.app/app.html` → Start.
2. **Package for stores → Android → Generate package** (Google Play).
3. Настройки:
   - Package ID `com.alimtszyu.wordy`, App name `Wordy`, Launcher name `Wordy`.
   - Version 1.0.0, version code 1.
   - Signing key: **Create new**. Заполни имя и пароли и **сохрани их**.
4. Скачай zip. В нём:
   - `.aab` — загружается в Play;
   - `signing.keystore` и `signing-key-info.txt` — храни в надёжном месте **вне** папки сайта и вне Git: без них не выпустить обновление;
   - `assetlinks.json` — пришли мне.
5. После первой загрузки в Play Console: **Test and release → App integrity → App signing**, скопируй **SHA-256 certificate fingerprint**. Его тоже пришли мне, я добавлю его в `assetlinks.json`. Без этого приложение покажет адресную строку браузера сверху.
