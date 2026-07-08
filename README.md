# Frontend Take Home – Annotation Activity Console

A frontend take-home assessment built using **Next.js**, **React**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS**.

The application displays annotation tasks from a mock backend, supports real-time updates through WebSockets, streams AI-generated summaries, and caches data locally using IndexedDB.

---

## Tech Stack

- Next.js (App Router)
- React 18
- TypeScript (Strict Mode)
- Redux Toolkit
- Tailwind CSS
- React Markdown
- rehype-sanitize
- localForage (IndexedDB)
- Jest
- React Testing Library

---

## Features

### Task Management

- Display paginated task list
- Search tasks
- Filter by status
- Filter by type
- Sort tasks
- View task details

### Data Normalization

- Normalize inconsistent backend responses
- Handle unknown task types
- Normalize task statuses
- Convert timestamps
- Convert numeric strings

### Real-time Updates

- WebSocket integration
- Automatic task updates
- Assignment updates
- Annotation count updates
- Auto reconnect

### AI Summary Streaming

- Incremental markdown rendering
- Safe markdown rendering
- HTML sanitization
- Cancel previous stream on task switch

### Offline Cache

- IndexedDB caching
- Instant reload from cache
- Background revalidation
- Stale data indication

### Testing

- Normalizer tests
- Redux selector tests
- React component interaction tests

---

## Project Structure

```text
annotation-console
│
├── app
├── components
├── features
│   └── tasks
├── hooks
├── services
├── store
├── lib
├── tests
├── public
└── mock-server
```

---

## Getting Started

### Clone Repository

```bash
git clone <repository-url>
cd annotation-console
```

---

### Install Dependencies

```bash
npm install
```

---

## Running the Mock Server

Navigate to the mock server.

```bash
cd mock-server
```

Install dependencies.

```bash
npm install
```

Start the server.

```bash
npm run mock
```

The server will run on:

```
http://localhost:4000
```

WebSocket endpoint:

```
ws://localhost:4000/ws
```

---

## Running the Frontend

Return to the project root.

```bash
cd ..
```

Start the Next.js application.

```bash
npm run dev
```

Application URL:

```
http://localhost:3000
```

---

## Running Tests

```bash
npm test
```

---

## Folder Overview

### app/

Application routing and layout.

### components/

Reusable UI components.

### features/tasks/

Redux slices, selectors, normalization, types and business logic.

### hooks/

Custom React hooks.

### services/

REST API, WebSocket and streaming services.

### store/

Redux store configuration.

### lib/

Utility helpers, markdown configuration and IndexedDB.

### tests/

Unit and component tests.

---

## Data Flow

```
REST API

↓

Normalize Response

↓

Redux Store

↓

Selectors

↓

React Components

↓

User Interface
```

---

## WebSocket Flow

```
WebSocket

↓

Receive Event

↓

Normalize

↓

Redux Store

↓

UI Updates
```

---

## Summary Streaming Flow

```
Select Task

↓

Start Stream

↓

Receive Markdown Chunks

↓

Append Content

↓

Sanitize

↓

Render
```

---

## Cache Flow

```
Load Cached Tasks

↓

Display Cached Data

↓

Fetch Latest Tasks

↓

Update Store

↓

Update Cache
```

---

## Security

The streamed markdown contains untrusted HTML.

The application sanitizes markdown using:

- react-markdown
- rehype-sanitize

Unsafe HTML and scripts are never executed.

---

## Future Improvements

- Virtualized task list
- Optimistic task assignment
- Persist Redux UI state
- Task analytics dashboard
- Cached streamed summaries
- Dark mode

---

## Author

Frontend Take Home Assessment

Developed using Next.js, React and Redux Toolkit.
