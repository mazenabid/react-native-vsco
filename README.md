# React Native VSCO

[![Quality](https://github.com/mazenabid/react-native-vsco/actions/workflows/quality.yml/badge.svg)](https://github.com/mazenabid/react-native-vsco/actions/workflows/quality.yml)

A learning-first, VSCO-inspired photo editor and creative community built from the ground up with React Native, Expo, and TypeScript.

> [!NOTE]
> This is an independent educational project. It is not affiliated with, endorsed by, or connected to VSCO.

## Project status

| Current module | Status | Next outcome |
| --- | --- | --- |
| 02 — React Native fundamentals | Complete | Extract the Studio's visual language into a reusable design system |

The Expo demo has been replaced with a typed, photography-first Studio experience. Module 03 will turn its successful visual decisions into reusable tokens and components.

## Why this project exists

This repository has two goals:

1. Build a polished mobile photo-editing and creative-sharing product.
2. Document the engineering journey clearly enough that another learner can follow the decisions, mistakes, and progress.

The finished app matters, but so does the path to it. Each curriculum module ends with a tested deliverable, a learning journal, and a tagged GitHub release.

## What we are building

- A device photo library and responsive gallery
- An immersive photo viewer with native gestures
- Non-destructive photo adjustments and presets
- Saved editing projects with export and sharing
- Accounts, cloud storage, profiles, and publishing
- A social feed and discovery experience
- A production-quality release for iOS and Android

## Learning in public

- [View the complete 14-module curriculum](./CURRICULUM.md)
- [Follow Module 02: React Native fundamentals](./docs/modules/02-react-native-fundamentals.md)
- [Read Module 01: Tooling and setup](./docs/modules/01-tooling-and-setup.md)
- [Review our architecture decisions](./docs/architecture/decisions/0001-expo-typescript-router.md)
- [Use the module journal template](./docs/modules/module-template.md)

Every completed module will link to its pull request, release, and visual demo from the curriculum.

## Technical foundation

| Technology | Purpose |
| --- | --- |
| React Native 0.81 | Cross-platform native application development |
| Expo SDK 54 | Native tooling, development workflow, and platform APIs |
| React 19 | Component and state model |
| TypeScript 5.9 | Type safety and clearer application contracts |
| Expo Router 6 | File-based navigation across mobile and web |
| GitHub Actions | Automated lint and type-check quality gates |

## Run it locally

### Prerequisites

- Node.js 24 LTS
- npm 11+
- Expo Go on a physical device, or an iOS/Android simulator

### Start the app

```bash
git clone https://github.com/mazenabid/react-native-vsco.git
cd react-native-vsco
npm install
npx expo start
```

Scan the QR code with Expo Go, or press `i`, `a`, or `w` to launch a supported simulator or web browser.

### Run quality checks

```bash
npm run lint
npm run typecheck
```

## How progress is published

Each module follows the same traceable workflow:

```text
Module issue → short-lived branch → pull request → quality checks
→ merge to main → tagged release → curriculum update
```

`main` always represents the newest stable learning checkpoint. Module branches are temporary; Git tags and Releases preserve the permanent snapshots.

## Roadmap

The project progresses through four phases:

1. **Foundation** — React Native, design system, navigation, gallery, and architecture
2. **Editing** — gestures, image processing, adjustments, presets, and history
3. **Product** — persistence, export, accounts, cloud storage, and community
4. **Production** — testing, accessibility, performance, security, and release

See [CURRICULUM.md](./CURRICULUM.md) for individual module outcomes and progress.

## Feedback

Thoughtful questions and suggestions are welcome through GitHub Issues. Each issue should focus on a reproducible bug, a curriculum improvement, or a clearly scoped product idea.

## Acknowledgements

VSCO is referenced only as product inspiration for learning about restrained visual design, photo-editing workflows, and creative communities. All implementation, branding, copy, and product decisions in this repository are original to this project.
