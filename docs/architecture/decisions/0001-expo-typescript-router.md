# ADR 0001 — Expo, TypeScript, and Expo Router

**Status:** Accepted  
**Date:** 2026-08-02

## Context

The project needs a beginner-friendly development loop without sacrificing a path to native photo APIs, development builds, and app-store distribution. It also needs an architecture that can grow from a small gallery into an editor and social product.

## Decision

Build the application with:

- Expo SDK 54 as the React Native framework and native toolchain
- TypeScript for application code and domain models
- Expo Router for file-based navigation
- Expo's managed workflow until a native requirement justifies generating platform projects

## Consequences

### Benefits

- Fast device testing through Expo Go during the early curriculum
- A consistent toolchain across iOS, Android, and web
- Access to Expo modules for media, files, image manipulation, and builds
- Navigation structure that is visible in the filesystem
- A supported path to native projects and development builds later

### Tradeoffs

- Expo SDK versions constrain compatible React Native and package versions.
- Some advanced image-processing libraries may require a development build or native configuration.
- File-based routing introduces conventions that the team must apply consistently.
- SDK upgrades must be planned and validated rather than applied as isolated package updates.

## Revisit when

- The image-processing pipeline requires native code not supported by the managed workflow.
- Expo Go can no longer exercise a required feature.
- A newer stable Expo SDK becomes the appropriate target for physical-device testing and store requirements.
