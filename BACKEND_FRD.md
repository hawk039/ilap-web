# Backend FRD

## 1. Document Purpose

This document defines the functional requirements for the main ILAP platform backend.

This backend is responsible for authentication, user accounts, conversation ownership, chat persistence, public support flows, legal metadata, and operational controls.

The AI legal answer engine is explicitly out of scope for this backend. It will run as a separate standalone microservice. The platform backend will integrate with it.

## 2. Product Context

The current frontend is a Next.js web application with:

- public authentication-related screens
- an authenticated dashboard showing legal categories
- a conversational legal chat flow
- public informational routes
- support and contact entry points

The frontend already supports this behavior:

- a user selects a legal category such as Criminal Law or Cyber Law
- that category becomes the `lawType`
- a chat conversation begins
- each message belongs to a session and carries conversational context through the latest turn id

For production, these responsibilities must move from temporary frontend state into a real backend system.

## 3. In Scope

- user registration
- login and logout
- session handling
- forgot password and reset password
- email verification readiness
- profile retrieval and update
- legal category retrieval
- conversation creation and storage
- chat message persistence
- orchestration with the external AI microservice
- retrieval of historical conversations
- support/contact/early access submissions
- auditability and operational metadata
- basic admin visibility requirements

## 4. Out of Scope

- AI answer generation
- legal reasoning engine implementation
- citation ranking implementation
- vector search or retrieval internals
- document OCR or ingestion pipelines
- payment and subscription billing
- real-time websocket collaboration

## 5. Backend Role in Final Architecture

The backend will act as the system of record for:

- users
- authentication state
- legal categories metadata
- chat conversations
- message history
- mapping between frontend conversations and AI microservice sessions
- support/contact requests

The AI microservice will act only as the legal answer engine.

Recommended architecture:

- `web frontend`
- `platform backend`
- `ai law microservice`
- `database`
- `object storage` if files are added later
- `email provider`

## 6. Core Business Goals

1. Users must be able to sign up and sign in securely.
2. Each authenticated user must only access their own conversations.
3. Category selection must persist into the chat conversation as `lawType`.
4. The backend must preserve AI conversational continuity using `sessionId` and latest `contextTurnId`.
5. Users must be able to revisit historical conversations.
6. Public support and contact flows must persist requests for internal follow-up.
7. The platform must be auditable and operationally safe.

## 7. User Roles

### 7.1 Guest

Can:

- view public pages
- register
- sign in
- request password reset
- submit contact/support/early access forms

Cannot:

- access authenticated chat or dashboard data

### 7.2 Authenticated User

Can:

- access legal categories
- start a new conversation
- continue an existing conversation
- view own chat history
- update own profile
- sign out

Cannot:

- access another user's data
- access admin operations

### 7.3 Admin or Internal Operator

Can:

- view users
- view support submissions
- inspect conversations for moderation/support purposes if authorized
- view operational dashboards and audit metadata

## 8. Functional Requirements

### 8.1 Authentication

The backend must provide:

- user registration
- credential login
- logout
- session validation
- refresh or renewal strategy
- forgot password initiation
- reset password completion
- email verification support

Functional details:

- registration must validate unique email
- login must validate credentials securely
- sessions must be revocable
- reset tokens must expire
- email verification tokens must expire

### 8.2 User Profile

The backend must provide:

- current user profile retrieval
- profile update
- optional preference storage

Minimum profile fields:

- user id
- full name
- email
- role
- created at
- updated at

Optional future fields:

- avatar url
- organization
- jurisdiction
- preferred practice areas
- notification preferences

### 8.3 Legal Categories

The backend must provide a canonical legal category list.

This list should not remain permanently hardcoded in the frontend.

Minimum fields:

- category id
- display name
- machine law type value
- description
- icon key
- active flag
- sort order

### 8.4 Conversations

The backend must own conversation records.

Each conversation must:

- belong to one authenticated user
- be tied to one selected `lawType`
- maintain a stable platform conversation id
- maintain the active AI `sessionId`
- maintain the latest known AI `contextTurnId`

Minimum conversation fields:

- id
- userId
- title
- lawType
- aiSessionId
- latestContextTurnId
- status
- createdAt
- updatedAt
- lastMessageAt

Status examples:

- active
- archived
- deleted

### 8.5 Messages

Each message exchange must be stored.

The backend must persist:

- user question
- AI answer
- raw AI response payload
- normalized UI-safe response payload
- turn ids used and returned
- timestamps

Minimum message fields:

- id
- conversationId
- role
- userQuery
- assistantAnswer
- rawAiPayload
- normalizedAnswerPayload
- requestLawType
- contextTurnIdUsed
- returnedTurnId
- createdAt

### 8.6 AI Orchestration

The backend must call the external AI microservice on behalf of the frontend.

The frontend should not permanently own AI continuity logic.

Required backend behavior:

- accept a user message for a given conversation
- resolve the correct `lawType`
- resolve the correct AI `sessionId`
- attach the latest `contextTurnId` if available
- call the AI microservice
- persist the returned answer
- update the conversation's latest turn id
- return a normalized response to the frontend

If the AI service returns a new `sessionId`, the backend must reconcile and persist it.

If the AI service returns a new turn id, the backend must persist it as the latest context turn id.

### 8.7 Chat History

The backend must allow a user to:

- view list of conversations
- open one conversation
- fetch its message history
- archive or rename a conversation

Recommended list fields:

- conversation id
- title
- law type
- last message preview
- last message at
- status

### 8.8 Support and Contact

The backend must persist public requests from:

- contact page
- support page
- early access page

Minimum support/contact fields:

- id
- name
- email
- subject
- message
- source page
- status
- createdAt

Status examples:

- open
- in_review
- resolved

### 8.9 Admin Visibility

The backend should provide admin-safe access to:

- users list
- support tickets
- contact submissions
- conversation summaries
- audit logs

This does not require a full admin frontend immediately, but the APIs and data model should support it.

## 9. API Requirements

## 9.1 Auth APIs

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/logout`
- `GET /auth/session`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/verify-email`

### `POST /auth/register`

Request:

```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string"
  },
  "session": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

### `POST /auth/login`

Request:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

```json
{
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string"
  },
  "session": {
    "accessToken": "string",
    "refreshToken": "string"
  }
}
```

### `GET /auth/session`

Response:

```json
{
  "authenticated": true,
  "user": {
    "id": "string",
    "fullName": "string",
    "email": "string"
  }
}
```

## 9.2 User APIs

- `GET /me`
- `PATCH /me`
- `PATCH /me/preferences`

## 9.3 Legal Category APIs

- `GET /legal-categories`
- `GET /legal-categories/:categoryId`

Recommended response:

```json
[
  {
    "id": "criminal-law",
    "name": "Criminal Law",
    "lawType": "Criminal Law",
    "description": "string",
    "icon": "gavel",
    "isActive": true,
    "sortOrder": 1
  }
]
```

## 9.4 Conversation APIs

- `POST /conversations`
- `GET /conversations`
- `GET /conversations/:conversationId`
- `PATCH /conversations/:conversationId`
- `DELETE /conversations/:conversationId`
- `GET /conversations/:conversationId/messages`
- `POST /conversations/:conversationId/messages`
- `POST /conversations/:conversationId/ask`

### `POST /conversations`

Creates a new conversation before the first question if desired.

Request:

```json
{
  "lawType": "Criminal Law"
}
```

Response:

```json
{
  "id": "string",
  "lawType": "Criminal Law",
  "title": "Criminal Law conversation",
  "aiSessionId": "string",
  "latestContextTurnId": null,
  "status": "active",
  "createdAt": "string"
}
```

### `POST /conversations/:conversationId/ask`

This is the most important platform endpoint.

Request:

```json
{
  "query": "string"
}
```

Platform backend behavior:

- loads the conversation
- confirms ownership
- reads stored `lawType`
- reads stored `aiSessionId`
- reads stored `latestContextTurnId`
- calls AI microservice
- stores the request and response
- updates latest context turn id
- returns normalized response

Response:

```json
{
  "conversationId": "string",
  "messageId": "string",
  "answer": "string",
  "disclaimer": "string",
  "categoryNote": "string",
  "returnedTurnId": "string",
  "createdAt": "string"
}
```

### `GET /conversations`

Response:

```json
[
  {
    "id": "string",
    "title": "string",
    "lawType": "string",
    "lastMessagePreview": "string",
    "lastMessageAt": "string",
    "status": "active"
  }
]
```

### `GET /conversations/:conversationId/messages`

Response:

```json
[
  {
    "id": "string",
    "role": "user",
    "text": "string",
    "createdAt": "string"
  },
  {
    "id": "string",
    "role": "assistant",
    "text": "string",
    "disclaimer": "string",
    "createdAt": "string"
  }
]
```

## 9.5 Support and Contact APIs

- `POST /contact-requests`
- `POST /support-tickets`
- `POST /early-access-requests`

## 9.6 Admin APIs

- `GET /admin/users`
- `GET /admin/conversations`
- `GET /admin/support-tickets`
- `GET /admin/contact-requests`
- `GET /admin/audit-logs`

## 10. AI Microservice Integration Contract

The platform backend will integrate with the external AI service.

Expected AI request shape:

```json
{
  "query": "string",
  "lawType": "string",
  "sessionId": "string",
  "contextTurnId": "string"
}
```

Expected AI response shape:

```json
{
  "answer": "string",
  "citations": [
    {
      "act": "string",
      "section": "string",
      "effective_from": "string"
    }
  ],
  "confidence": 0,
  "disclaimer": "This response is informational and not legal advice.",
  "sessionId": "string",
  "turnId": "string",
  "category_note": "string",
  "proof": {
    "sources": [
      {
        "act": "string",
        "section": "string",
        "text_snippet": "string",
        "relevance_score": 0
      }
    ],
    "reasoning": "string"
  }
}
```

Backend integration requirements:

- the platform backend must validate outbound payloads
- the platform backend must tolerate missing optional fields
- the platform backend must log failed AI requests
- the platform backend must store enough raw payload data for debugging
- the platform backend must normalize response fields for frontend consumption

## 11. Data Model Requirements

## 11.1 Users

Fields:

- id
- fullName
- email
- passwordHash
- role
- emailVerifiedAt
- createdAt
- updatedAt

## 11.2 User Sessions

Fields:

- id
- userId
- refreshTokenHash or sessionTokenHash
- userAgent
- ipAddress
- expiresAt
- createdAt
- revokedAt

## 11.3 Password Reset Tokens

Fields:

- id
- userId
- tokenHash
- expiresAt
- usedAt
- createdAt

## 11.4 Legal Categories

Fields:

- id
- name
- lawType
- description
- iconKey
- sortOrder
- isActive
- createdAt
- updatedAt

## 11.5 Conversations

Fields:

- id
- userId
- lawType
- title
- aiSessionId
- latestContextTurnId
- status
- createdAt
- updatedAt
- lastMessageAt

## 11.6 Messages

Fields:

- id
- conversationId
- role
- userQuery
- assistantAnswer
- normalizedAnswerPayload
- rawAiPayload
- requestLawType
- contextTurnIdUsed
- returnedTurnId
- createdAt

## 11.7 Support and Contact

Fields:

- id
- type
- name
- email
- subject
- message
- source
- status
- createdAt
- updatedAt

## 11.8 Audit Logs

Fields:

- id
- actorType
- actorId
- action
- entityType
- entityId
- metadata
- createdAt

## 12. Validation Requirements

The backend must validate:

- email format
- password strength
- required fields
- legal category validity
- conversation ownership
- message size limits
- duplicate or malformed tokens

Recommended limits:

- query max length
- support form message max length
- profile field max lengths

## 13. Security Requirements

- passwords must be hashed using a modern algorithm such as Argon2 or bcrypt
- all authenticated endpoints must enforce authorization
- session tokens must be securely stored and revocable
- reset tokens must be one-time use
- rate limiting must exist on login, register, forgot-password, and AI chat endpoints
- sensitive backend logs must not expose raw password values
- CORS must be configured intentionally
- secrets must be managed through environment variables

## 14. Non-Functional Requirements

### 14.1 Reliability

- failed AI requests must not corrupt conversation state
- duplicate client retries should not create inconsistent history
- important writes should be transactional where needed

### 14.2 Observability

- structured logs
- request ids
- tracing across platform backend and AI service if possible
- metrics for auth, chat, and upstream AI latency/failures

### 14.3 Performance

- conversation list endpoints must paginate
- message history endpoints should support pagination or cursor loading
- public metadata endpoints should be cacheable where appropriate

### 14.4 Compliance and Privacy Readiness

- retain terms/privacy acceptance metadata if needed later
- support account deletion design
- support export of user conversation history if required later

## 15. Recommended Implementation Boundaries

The backend should likely be organized into modules:

- auth
- users
- legal-categories
- conversations
- messages
- ai-gateway
- support
- admin
- audit

The `ai-gateway` module should be the only module that speaks directly to the AI microservice.

## 16. Backend Handoff Summary

The backend thread should build:

1. auth and session module
2. user profile module
3. legal category module
4. conversation and message persistence module
5. AI orchestration gateway module
6. support/contact submission module
7. admin and audit foundation

The most important product endpoint is:

- `POST /conversations/:conversationId/ask`

That endpoint is the stable contract between the product backend and the AI microservice.

## 17. Suggested Next Step for Backend Thread

The backend thread should convert this FRD into:

- database schema
- backend folder structure
- API contract spec
- auth/session strategy
- conversation lifecycle design
- AI gateway service design
- production-ready error model
