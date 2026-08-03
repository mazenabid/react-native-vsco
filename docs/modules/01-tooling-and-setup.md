# Module 01 — Tooling and Setup

**Status:** Complete  
**Product outcome:** A verified Expo and React Native application that runs on a device and the web.

## Goal

Create a supported, reproducible development environment and understand the tools involved before changing application code.

## Concepts learned

- Node.js executes the JavaScript-based development tools outside the app.
- npm installs dependencies declared in `package.json` and locks exact versions in `package-lock.json`.
- React Native renders native platform interfaces from React components.
- Expo provides a framework and native tooling around React Native.
- Metro transforms and bundles application modules during development.
- Expo Router maps files in `app/` to navigation routes.
- The terminal's working directory determines which project and local tools a command uses.

## What was built

- Node.js 24 LTS development environment
- Expo SDK 54 project generated with `create-expo-app`
- React Native 0.81 and React 19 foundation
- TypeScript and Expo Router configuration
- npm lockfile for repeatable dependency installation
- Local Git repository on the `main` branch

## Decisions

### Use Expo's managed workflow

Expo provides a fast learning loop while retaining access to native capabilities through Expo modules and development builds. Native iOS and Android projects can be generated later when a feature requires deeper platform configuration.

### Use TypeScript from the beginning

Types make component contracts and application data explicit. This adds a small amount of early syntax while preventing ambiguity as the editor and backend models become more complex.

### Use Expo Router

File-based routes keep navigation visible in the repository structure and support mobile and web without maintaining separate route registries.

## Problems encountered

### Commands were run from the wrong folder

Running `npx expo start` from an empty directory caused `npx` to find an obsolete global Expo CLI. Running `npm install` there also failed because the directory had no `package.json`.

**Lesson:** Before diagnosing a JavaScript toolchain problem, check `pwd` and confirm that the project manifest exists.

### The active Node.js version was unsupported

The machine initially used an end-of-life Node.js 25 release. Node.js 24 LTS was installed and activated so the development and CI environments use the same supported major version.

**Lesson:** Prefer an LTS runtime and pin the expected version in the repository.

### Project names cannot contain spaces

`create-expo-app` rejected the original directory name because it becomes a URL-safe project identifier. The project folder was changed to `react-native-vsco`; the user-facing product name remains independent.

## Validation evidence

| Check | Result |
| --- | --- |
| ESLint | Passed |
| TypeScript | Passed |
| Expo Doctor | 18/18 checks passed |
| Metro web bundle | Completed successfully |
| Local development server | Responded with HTTP 200 |
| Git working tree | Clean after initial scaffold |

## Known limitations

- The UI is still Expo's generated example.
- No product name or original visual identity has been selected.
- Automated behavior tests have not been introduced yet.
- Expo SDK 54's toolchain reports transitive npm advisories that require a future SDK upgrade rather than a forced dependency override.

## Outcome

The development foundation is healthy. Module 02 can focus on React Native components, state, TypeScript, and styling without mixing those lessons with environment setup.

## References

- [Expo SDK 54 documentation](https://docs.expo.dev/versions/v54.0.0/)
- [Create an Expo project](https://docs.expo.dev/get-started/create-a-project/)
- [Start developing with Expo](https://docs.expo.dev/get-started/start-developing/)
- [Node.js release schedule](https://nodejs.org/en/about/previous-releases)
