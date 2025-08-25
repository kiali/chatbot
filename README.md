# @kiali/chatbot

An AI-powered chatbot component for Kiali. The UI is built with PatternFly 6, while Kiali currently uses PatternFly 5. This repository contains:

- The reusable PF6 chatbot library (root `src/`, built with Rollup)
- A PF5 demo app under `dev/` to validate embedding the PF6 chatbot inside a PF5 application

Published on npm: [@kiali/chatbot](https://www.npmjs.com/package/@kiali/chatbot)

### Why PF6 inside a PF5 app?
Kiali uses PF5 today, but the chatbot leverages PF6 components. To embed the chatbot in Kiali, we isolate and wrap the PF6 UI so it can run inside a PF5 application without conflicts. The `dev/` app demonstrates the exact integration approach you can mirror in Kiali.

### Develop and test locally
- **Start the dev app** (PF5 mock-up running this library):
```bash
cd dev
yarn install
yarn start
```
- **When you change the library**, rebuild it so the dev app picks up changes:
```bash
# from the repository root
yarn build
```
The dev app links the library via `@kiali/chatbot: link:../`, so rerun `yarn build` at the root after edits to see updates reflected in the running dev app.

- See more details in [dev/README.md](dev/README.md).

### Integration files and data flow
- **`src/components/KialiChatBot/KialiChatBot.tsx`**
  - Wraps PatternFly Chatbot primitives to render the toggle, header, conversation drawer, message list, and footer.
  - Manages display modes (overlay, docked, fullscreen), branding, and model selection.
  - Coordinates conversation history and renders messages from the hook.
- **`src/useChatbot/useChatbot.ts`**
  - React hook that communicates with the AI agent endpoint.
  - Manages message state, sending queries, handling responses, timeouts (including 429), and conversation IDs.

In the PF5 demo (`dev/`), the files `src/Chatbot.tsx` and `src/ChatbotWindow.tsx` show how to embed the PF6 chatbot component in a PF5 application. In Kiali, keep analogous integration components so PF6 (chatbot) and PF5 (app) coexist cleanly.

### CI/CD and support policy
- A GitHub Action publishes a new version to npm after merges to `main` when `src/**` or `package.json` change and the version is bumped.
- This library is intended for Kiali use. While published to npm for convenience, it is not a general-purpose chatbot solution. **Support is focused on Kiali integration only.**

### Build the library
```bash
yarn build
```
Outputs `dist/` with bundles and type declarations per `rollup.config.js` and `tsconfig.json`.

### Screenshots

Graph:

![Graph](https://github.com/kiali/chatbot/blob/main/dev/images/graph.png?raw=true)

Graph (dark mode):

![Graph – dark mode](https://github.com/kiali/chatbot/blob/main/dev/images/graph_dark_mode.png?raw=true)

### License
Apache-2.0
