# Wordy — сайт

## Что где лежит
- `index.html` — стартовая страница: что такое Wordy, кнопки «Начать учиться» и «Я учитель».
- `app.html` — само приложение Wordy (с настройками Firebase).
- `privacy.html`, `terms.html` — конфиденциальность и условия использования.
- `404.html` — страница «не найдено», `offline.html` — когда нет интернета.
- `manifest.webmanifest`, `sw.js`, `icons/`, `favicon.ico` — установка на телефон и работа без интернета.
- `og.png` — картинка для превью ссылки в WhatsApp и Telegram.
- `audio/` — озвучка Listening и Speaking.
- `firebase.json`, `.firebaserc` — настройки хостинга Firebase (проект wordy-b5142).
- `firestore.rules` — правила доступа к базе. Выкладываются вместе с сайтом.
- `storage.rules` — правила для файлов к домашкам (понадобятся после подключения тарифа Blaze).

## Проверить у себя
VS Code → правой кнопкой по `index.html` → **Open with Live Server**.
Приложение открывается кнопкой «Начать учиться» или сразу по адресу `http://127.0.0.1:5500/app.html`.

## Выложить в интернет (один раз настроить, потом — одна команда)
Нужен Node.js (проверка: в терминале VS Code `node -v`).
1. В VS Code: Terminal → New Terminal (терминал откроется в папке Wordy).
2. Войти в Firebase (откроется браузер, выбери свой Google-аккаунт):
   ```
   npx firebase-tools login
   ```
3. Выложить сайт и правила базы:
   ```
   npx firebase-tools deploy
   ```
Готово: сайт будет по адресу **https://wordy-b5142.web.app**.
Каждый раз после изменений достаточно снова запустить `npx firebase-tools deploy`.

## Где читать отзывы
Сообщения из «Настройки → Обратная связь» лежат в консоли Firebase:
Firestore Database → коллекция `feedback`.
