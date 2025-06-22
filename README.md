# 🎥 Random Tubes

A small web application built with **Vue.js** that allows users to fetch random YouTube videos using the **YouTube Data API**. A filter can be applied to influence the randomness.

The app is fully containerized using **Docker**, making it easy to run in any environment.

---

## ✨ Features

- 🎲 Fetch random YouTube videos
- 🔍 Optional keyword-based filtering
- 🖥️ Built with Vue.js for a lightweight and reactive UI
- 🐳 Docker support for easy deployment

---

## 🔐 API Key Requirement

> ⚠️ **Important:** This app requires a personal **YouTube Data API v3** key. Each user must create and use their own API key — the app does not include a shared or public key.

---

### Configure the Environment

Create a `.env` file in the root of the project:

```env
VUE_APP_TOKEN_API=your_api_key_here
```

## 📲 Run the application

Use the command in a terminal :

With Docker :

```
docker compose up --build -d
```

Without Docker :

```
npm install
npm run serve
```

Access the application with the url :

```
http://localhost:8080/
```

