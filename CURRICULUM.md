# Build a React Native Photo App from the Ground Up

This curriculum turns one product into a structured path through React Native, mobile architecture, image processing, backend systems, and production delivery.

Each module has three obligations:

1. Learn a focused set of concepts.
2. Ship a visible product outcome.
3. Preserve the checkpoint with documentation and a GitHub release.

## Curriculum map

| # | Module | Learning opportunity | Product outcome | Status | Checkpoint |
| --- | --- | --- | --- | --- | --- |
| 01 | Tooling and setup | Node LTS, npm, Expo, Metro, project structure, Git, and terminal debugging | A verified React Native app running locally and on a device | Complete | [Journal](./docs/modules/01-tooling-and-setup.md) · [Release](https://github.com/mazenabid/react-native-vsco/releases/tag/module-01-foundation) |
| 02 | React Native fundamentals | Components, JSX, props, state, hooks, TypeScript, and native primitives | A custom Studio screen replacing the Expo demo | Complete | [Journal](./docs/modules/02-react-native-fundamentals.md) · [PR #2](https://github.com/mazenabid/react-native-vsco/pull/2) · [Release](https://github.com/mazenabid/react-native-vsco/releases/tag/module-02-react-native-fundamentals) |
| 03 | Design system | Color, typography, spacing, themes, composition, and reusable UI APIs | A cohesive visual system shared across the app | Complete | [Journal](./docs/modules/03-design-system.md) · [PR #4](https://github.com/mazenabid/react-native-vsco/pull/4) · [Release](https://github.com/mazenabid/react-native-vsco/releases/tag/module-03-design-system) |
| 04 | Navigation and app shell | Expo Router, tabs, stacks, modals, route parameters, and safe areas | A real route-backed shell for the app's six primary destinations | In progress | [Journal](./docs/modules/04-navigation-and-app-shell.md) · [Issue #5](https://github.com/mazenabid/react-native-vsco/issues/5) |
| 05 | Photo permissions and gallery | Device permissions, Media Library APIs, asynchronous work, and performant lists | A responsive grid of photos from the user's device | Planned | — |
| 06 | State and app architecture | Domain modeling, local and shared state, data flow, boundaries, and folder organization | A maintainable architecture ready for editing features | Planned | — |
| 07 | Gestures and animation | Touch input, pan, pinch, swipe, transitions, and UI-thread performance | An immersive, fluid photo viewer | Planned | — |
| 08 | Image-processing pipeline | Pixels, files, memory, CPU/GPU tradeoffs, native APIs, and preview rendering | An original image transformed into an edited result | Planned | — |
| 09 | Editing controls and color | Exposure, contrast, saturation, temperature, tone, and practical color theory | A live adjustment panel with meaningful controls | Planned | — |
| 10 | Presets and edit history | Parameter recipes, serialization, thumbnails, undo/redo, and non-destructive editing | Built-in presets, custom presets, reset, and history | Planned | — |
| 11 | Persistence and export | Local databases, files, caching, metadata, image quality, saving, and sharing | Projects survive restarts and edits export to the device | Planned | — |
| 12 | Accounts and cloud backend | Authentication, database design, object storage, APIs, security rules, and failures | Accounts with cloud-backed media and synchronized data | Planned | — |
| 13 | Publishing and community | Feeds, profiles, posts, follows, likes, search, pagination, and optimistic updates | A working social and discovery experience | Planned | — |
| 14 | Production and release | Testing, accessibility, profiling, security, analytics, builds, and store delivery | A tested beta ready for external distribution | Planned | — |

## Learning phases

### Phase 1 — Foundation

Modules 01–06 establish the mental model and structure of a production React Native application. By the end of this phase, the app will have an original interface, navigation, access to device photos, and an architecture capable of supporting a serious editor.

### Phase 2 — Editing

Modules 07–10 cover the technically demanding heart of the product: gestures, image-processing constraints, color adjustments, non-destructive state, presets, and editing history.

### Phase 3 — Product

Modules 11–13 turn the editor into a connected product through persistent projects, export, accounts, cloud storage, publishing, and discovery.

### Phase 4 — Production

Module 14 treats testing, accessibility, performance, security, observability, and store delivery as core product work rather than a final afterthought.

## Definition of done for a module

A module is complete only when:

- Its stated product outcome works on the supported targets.
- Linting and TypeScript checks pass.
- Important behavior has proportionate automated or manual test evidence.
- The module journal records decisions, challenges, and lessons.
- A screenshot or short demo shows the visible result when applicable.
- The implementation is merged into `main` through a pull request.
- A tagged GitHub release preserves the checkpoint.
- This curriculum links to the journal, pull request, release, and demo.

## Release naming

Learning checkpoints use descriptive tags instead of product semantic versions:

```text
module-01-foundation
module-02-react-native-fundamentals
module-03-design-system
```

Product versioning begins when the app reaches distributable alpha and beta milestones.
