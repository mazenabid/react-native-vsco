# Module 03 — Design System

**Status:** In progress

**Product outcome:** The Studio's visual language is defined once and consumed through typed tokens and focused UI primitives.

## Goal

Turn the successful Studio direction into a small system that keeps future screens visually coherent without creating a general-purpose component library before the product needs one.

## Concepts learned

- A **design token** gives a reusable decision a semantic name, such as `canvas` or `contentMuted`.
- A **component style** remains local when it describes composition unique to that component.
- **Typography variants** express text roles instead of repeating font measurements at each call site.
- A typed component API limits invalid combinations and makes intended usage discoverable.
- **Composition** lets a focused primitive own behavior while callers supply product-specific visuals.
- React Navigation's theme and product components can consume the same color source without becoming coupled to each other.

## Acceptance criteria

- [x] Color, spacing, typography, sizing, border, opacity, and motion tokens are defined centrally.
- [x] Navigation theme colors derive from the shared tokens.
- [x] Studio components contain no raw color literals.
- [x] `AppText` and `IconButton` replace repeated text and pressable behavior.
- [x] Existing photo semantics remain accurate and non-interactive.
- [x] Studio layout and grid-density behavior are visually verified as unchanged.
- [ ] The screen is verified on the primary physical-device target.
- [x] `npm run lint` passes without warnings.
- [x] `npm run typecheck` passes.
- [x] A production web export passes.
- [ ] The pull request records visual and architectural evidence.

## What was built

### Semantic tokens

`theme/tokens.ts` contains the dark palette, spacing scale, component sizes, border widths, opacity, motion timing, and typography roles. Components import names that communicate purpose instead of repeating hexadecimal values or font measurements.

### Navigation theme

`theme/navigation-theme.ts` adapts React Navigation's `DarkTheme` using the same semantic colors as the product UI. The root layout now only installs that theme and configures the light status-bar content.

### AppText

`AppText` exposes only the text roles and tones the app currently uses. `screenTitle` and `navigationLabel` are meaningful variants; `primary` and `muted` are semantic tones. New variants should be added when a real product role appears.

### IconButton

`IconButton` owns the 44-point target, hit slop, pressed feedback, button role, and required accessibility label. The Studio supplies its custom view-control glyph as children. This is composition: the primitive owns interaction quality while the product owns its visual meaning.

## Decisions

### Name tokens by purpose

Names such as `black`, `white`, or `gray700` describe appearance. Names such as `canvas`, `navigation`, and `contentMuted` describe responsibility. Semantic names let the implementation change later without forcing every consumer to understand the palette.

### Support one deliberate theme

The current product direction is dark. A speculative light theme would double decisions without a product requirement or a screen on which to evaluate them. The app configuration is now explicitly dark, and a second theme will be added only when it has a real use case.

### Keep primitives focused

A single configurable component capable of rendering every future text or button style would hide more than it helps. Two narrow primitives capture behavior already repeated today. Product-specific layout remains in Studio components.

### Accept the static configuration boundary

`app.json` cannot import TypeScript tokens, so the black root and web theme colors are repeated there intentionally. Runtime React Native and navigation code still share one typed source of truth.

## Problems encountered

### Abstraction can erase meaning

Moving every measurement into a generic token file would technically reduce literals but make the styles harder to read. The system centralizes reusable visual decisions while leaving one-off composition close to the component that owns it.

**Lesson:** Duplication is evidence to evaluate, not an automatic command to abstract.

## Validation evidence

| Check | Result |
| --- | --- |
| Lint | Passed without warnings |
| TypeScript | Passed |
| Raw-color audit | Passed; runtime colors exist only in `theme/tokens.ts` |
| Production web bundle | Passed; four static routes exported |
| Browser visual review | Passed at 390 × 844; navigation remained 96 points tall |
| Physical-device review | Pending |

## Demo

The design-system refactor should look intentionally uneventful: the visible Studio should remain the same while its implementation becomes easier to extend consistently.

## Reflection

The first benefit of a design system is not visual novelty. It is the ability to explain why a value exists, change it once, and make invalid UI combinations harder to create.

## Next step

Module 04 will use these tokens and primitives to build real route-backed navigation instead of the current visual-only bottom bar.

## References

- [Expo SDK 54 reference](https://docs.expo.dev/versions/v54.0.0/)
- [Expo Router and React Navigation themes](https://docs.expo.dev/router/migrate/from-react-navigation/)
- [Expo app configuration](https://docs.expo.dev/versions/v54.0.0/config/app/)
