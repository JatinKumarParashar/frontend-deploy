# Spotify AI Memory Studio

Spotify AI Memory Studio is a React frontend for a governed, context-aware music and podcast experience. Users can describe what they want to listen to in natural language, review the memory used to personalize results, manage privacy controls, and open Spotify search results from the interface.

The frontend connects to the Spotify Governed AI Memory Engine FastAPI service over HTTP.

## Contributors
1. Mansi Srivastava - [Project Explanation video] (https://drive.google.com/file/d/1thJDxjCs0g_0Hz5AvGjSiTIuO3J28Iii/view?usp=sharing)
2. Jatin Kumar - video link (https://drive.google.com/file/d/15YEH5WhAvn12GBxsF0RBuHJqFBnsfMA3/view?usp=sharing)
3. B. Harsha Sai - colab link (https://colab.research.google.com/drive/1mnm4CNY3ERfQZMAiWi4aJQDASfRpa4j5?usp=drive_link)
4. Deep Sarkar - video link ( https://drive.google.com/file/d/1m7F3PM1c5zjYKuOzsi8CUPLUYXwAmvSZ/view?usp=sharing )
5. Shivam Mishra - Video_Link (  https://drive.google.com/file/d/13DTm2OXPr8f1jckPutfqJjzDMbFau6cM/view?usp=sharing  )
6. Aryan Gupta - video link ( https://drive.google.com/file/d/1WMWmS4PLZvuNvTpDqpoEj5uT5Lt_urmF/view?usp=sharing )
7. Anju khedar - video link (https://drive.google.com/file/d/1VmffWvHyzas4RHhxLgiaoIENIq4QHzZ6/view?usp=sharing)


## Features

- OTP-based demo registration and sign-in
- Normal User and Admin / Developer roles
- Protected application routes with persistent local session state
- Natural-language AI assistant for music and podcast requests
- Context-aware responses based on mood, activity, artist, podcast topic, and exclusions
- Editable user memories for artists, moods, activities, podcast interests, and excluded genres
- Active temporal graph facts with confidence and provenance information
- Recommendation views for songs, playlists, and podcast shows
- Pause-memory and personalization controls
- Downloadable JSON data export
- Permanent memory purge action
- Developer dashboard with the latest bounded context package
- Responsive dark interface built with Tailwind CSS and Lucide icons

## User Workflow

```text
Open the app
    |
    v
Sign in or create an account with OTP
    |
    v
Protected Studio workspace
    |
    +--> Home: review active context and quick recommendations
    |
    +--> AI Assistant: submit a natural-language listening request
    |       |
    |       v
    |   FastAPI resolves intent, memory, and recommendations
    |       |
    |       v
    |   Show the AI response and bounded context package
    |
    +--> My Memories: edit or remove saved preference fields
    |
    +--> Recommendations: open curated Spotify search results
    |
    +--> Memory Controls: pause, personalize, export, or purge data
    |
    `--> Developer Dashboard: inspect context and runtime metrics
```

## Application Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/login` | Public | Sign in, register, request an OTP, or verify a new profile |
| `/` | Authenticated | View active listening context and quick recommendations |
| `/chat` | Authenticated | Ask the AI assistant for personalized music or podcasts |
| `/memories` | Authenticated | View, update, and delete stored preference fields and graph facts |
| `/recommendations` | Authenticated | Browse song, playlist, and podcast recommendation groups |
| `/controls` | Authenticated | Manage memory, personalization, export, and purge controls |
| `/developer` | Admin / Developer | Inspect the active bounded context package and dashboard metrics |

Unknown routes redirect to the appropriate home or login screen. Authenticated session data is stored in the browser under `spotify-user`.

## Frontend Architecture

```text
Browser
  |
  v
React + React Router
  |
  +--> AuthScreen
  |
  +--> AppLayout and protected routes
  |      |
  |      +--> HomePage
  |      +--> ChatPage
  |      +--> MemoriesPage
  |      +--> RecommendationsPage
  |      +--> ControlsPage
  |      `--> DeveloperPage
  |
  `--> services/api.js
          |
          v
      FastAPI backend configured by VITE_BACKEND_URL
```

`AppLayout` owns shared user, memory, chat, and context state and exposes it to pages through React Router outlet context. `services/api.js` provides the common JSON HTTP client. Reusable controls such as panels, fields, badges, recommendations, and buttons live in `src/components/ui.jsx`.

## Project Structure

```text
frontend/
|-- index.html                  Vite HTML entry point
|-- package.json                Scripts and frontend dependencies
|-- vite.config.js              Vite, React, Tailwind, and dev-server config
|-- README.md                   Frontend documentation
|-- docs/                       Supporting project documentation
|-- scripts/
|   `-- generate-deck.cjs       Presentation-generation utility
`-- src/
    |-- main.jsx                React entry point and StrictMode setup
    |-- App.jsx                 Router, authentication state, and route guards
    |-- index.css               Tailwind import and shared component styles
    |-- components/
    |   |-- AuthScreen.jsx      Login, registration, and OTP flow
    |   `-- ui.jsx              Shared UI components and Spotify links
    |-- layouts/
    |   `-- AppLayout.jsx       Authenticated shell, navigation, and shared state
    |-- pages/
    |   |-- HomePage.jsx
    |   |-- ChatPage.jsx
    |   |-- MemoriesPage.jsx
    |   |-- RecommendationsPage.jsx
    |   |-- ControlsPage.jsx
    |   `-- DeveloperPage.jsx
    `-- services/
        `-- api.js             Fetch wrapper for the backend API
```

## Requirements

- Node.js 18 or newer
- npm
- A running instance of the FastAPI backend

## Local Development

From this directory:

```powershell
npm install
```

Create a `.env.local` file in `frontend/`:

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

Start the Vite development server:

```powershell
npm run dev
```

Open the URL printed by Vite. The configured default is `http://127.0.0.1:5173`.

The Vite dev server is configured to bind to `127.0.0.1` on port `5173`. Restart the dev server after changing environment variables because Vite injects them at build time.

## Available Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Serve the production build locally |

Before deployment, run:

```powershell
npm run build
```

## Backend Contract

The frontend expects `VITE_BACKEND_URL` to point to a FastAPI service that provides these routes:

| Method | Endpoint | Used by |
| --- | --- | --- |
| `POST` | `/auth/send-otp` | Registration flow |
| `POST` | `/auth/register` | Registration flow |
| `POST` | `/auth/login` | Sign-in flow |
| `GET` | `/memory/{user_id}` | Shared layout, home, controls, memories |
| `GET` | `/memory/graph/{user_id}` | Memories page |
| `POST` | `/memory/update-field` | Memories page |
| `POST` | `/memory/toggle-control` | Memory controls |
| `GET` | `/memory/export/{user_id}` | Data export |
| `POST` | `/memory/purge/{user_id}` | Memory deletion |
| `POST` | `/ai/personalized-chat` | AI assistant |

The AI assistant sends this request shape:

```json
{
  "user_id": "user_42",
  "message": "Create a focus playlist for studying without metal"
}
```

The response should include `ai_dj_response` and `context_package`. Memory responses should expose fields such as `preference_artist`, `episode_mood`, `episode_activity`, `podcast_topic`, `exclusion`, `memory_paused`, and `personalization_enabled`.

## Deployment

1. Install dependencies with `npm install`.
2. Set `VITE_BACKEND_URL` to the deployed FastAPI URL in the hosting provider's build environment.
3. Build with `npm run build`.
4. Publish the generated `dist/` directory using a static hosting provider.
5. Configure SPA fallback/rewrite behavior so routes such as `/chat` and `/controls` resolve to `index.html` on direct navigation.
6. Ensure the backend allows the deployed frontend origin through CORS.

Do not put backend secrets, admin keys, or Spotify credentials in frontend environment variables. Any `VITE_*` value is exposed to the browser bundle.

## Related Backend

The backend repository contains the FastAPI application, SQLite memory store, Spotify integration, and OpenAPI documentation. For local integration, start it on port `8000` and set:

```env
VITE_BACKEND_URL=http://127.0.0.1:8000
```

The frontend currently expects the backend to handle authentication and authorization. The browser stores the returned user object for the demo session; production authentication should use a hardened server-side or token-based session design.
