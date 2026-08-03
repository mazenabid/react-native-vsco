# Module 02 — React Native Fundamentals

**Status:** In progress  
**Product outcome:** An original, interactive Studio screen built from typed React Native components.

## Goal

Replace Expo's generated example with a small but intentional product surface while learning how React turns data and state into a native interface.

## Concepts learned

- A **component** is a function that returns a description of UI.
- **JSX** lets component structure be written alongside JavaScript expressions.
- **Props** are typed inputs passed from a parent component to a child.
- **State** is data owned by a component that can change over time and trigger a render.
- `map` transforms project data into repeated UI while stable `key` values preserve identity.
- `StyleSheet` describes native layout and appearance; React Native uses Flexbox by default.
- Accessibility roles and labels make custom controls and media understandable beyond their visual design.

## Acceptance criteria

- [x] The generated Expo routes and visible starter content are removed.
- [x] The Studio screen has an original, intentionally minimal layout.
- [x] Typed, reusable project-tile and bottom-navigation components are introduced.
- [x] Grid-density switching demonstrates local state without implying unfinished product actions.
- [x] Demo content is clearly distinguished from future device photos.
- [ ] The screen is visually verified on the primary physical-device target.
- [x] `npm run lint` passes without warnings.
- [x] `npm run typecheck` passes.
- [x] A production-style web bundle completes.
- [ ] Visual evidence is added to the pull request.

## What was built

### Studio screen

The revised screen follows the functional hierarchy of the current mobile reference: black interface chrome, a compact Studio title, a dense edge-to-edge photo grid, a functional grid-density control, and a tall six-destination bottom navigation. The interface intentionally yields attention to photography instead of decorating the workspace with marketing copy.

### Typed project tile

`ProjectTile` receives only a `StudioProject` and its calculated size. Demo photographs are rendered with `expo-image` and exposed to assistive technology as labeled images, not buttons, because tapping them does not perform an action yet.

### Data-driven rendering

Fifteen demo studies are stored as typed data. The screen maps that data into project tiles while a single state value switches the layout between two and three columns without changing or duplicating project data.

## Decisions

### Use explicit demo studies instead of requesting photos early

Photo permission and Media Library behavior deserve a focused lesson in Module 05. Using clearly labeled demo studies prevents permission handling from obscuring React fundamentals or creating a misleading fake import flow.

### Let photography carry the visual identity

The first direction used a large editorial headline, warm decorative surfaces, counters, captions, and abstract generated-looking cards. Although internally consistent, it competed with the media and read like a generic concept mockup.

Current VSCO references show a much stricter hierarchy: black interface chrome, direct screen naming, compact controls, and dense photography. The revision adopts those principles without copying VSCO branding or proprietary icons.

### Make the bottom bar own the bottom safe area

The initial navigation component ended above the iPhone home-indicator inset because the screen-level `SafeAreaView` owned the bottom edge. That made the painted bar only 76 points tall and visually detached the safe-area region below it.

The current reference devotes roughly 100 logical points to the complete navigation platform. `StudioBottomBar` now reads the bottom inset itself, paints through it, and combines it with the icon-and-label area. This produces a bar around 102 points tall on a modern iPhone and preserves a useful fallback on devices without an inset.

**Lesson:** Safe areas are not always empty margins around the whole screen. Fixed chrome should often own and paint through its adjacent inset so it feels anchored to the device edge.

### Keep visual values local until Module 03

The first screen needs an intentional visual direction, but formal color, typography, spacing, and component tokens belong to the design-system module. Values remain local during this experiment so Module 03 can extract a system from something tangible.

### Do not imply product state that does not exist

An early iteration hard-coded edited flags, displayed filter badges, and changed the navigation after a photo was selected. Those interactions demonstrated React state, but the app had no editor, saved edit metadata, or working batch actions. The UI therefore implied a product model that did not exist.

The false edited and selection behavior was removed. Grid density remains because it performs a complete, understandable action today. Real edited state will arrive with saved edits, and tapping a photo will become meaningful when the editor exists.

**Lesson:** A teaching demo still needs truthful semantics. Do not make something look interactive merely to demonstrate a framework concept.

## Problems encountered

### The first visual direction looked designed by a template rather than a photographer

The initial implementation tried to manufacture personality through copy and decorative composition. That was the wrong source of identity for a photo product. The user's direct feedback exposed the mismatch before it hardened into the design system.

**Lesson:** A coherent interface can still be contextually wrong. Reference the actual product category, identify what receives visual priority, render the work, and be willing to discard a polished direction when its hierarchy is incorrect.

### Edited badges and selection confused the product story

The user reasonably asked what was being edited and selected. The answer was only demo state, which meant the interface required an explanation that the product itself could not support.

**Lesson:** Confusion is often evidence of an inaccurate model, not a user failing to understand the interface. Remove premature controls and reintroduce them when their underlying behavior is real.

### An array type violated the repository lint convention

The initial filter options used `ReadonlyArray<T>`. ESLint requested the equivalent `readonly T[]` form. The code was changed rather than ignoring the warning.

**Lesson:** Automated checks express project conventions. Read the warning, understand the equivalent type, and fix the source instead of weakening the rule.

## Validation evidence

| Check | Result |
| --- | --- |
| Lint | Passed without warnings |
| TypeScript | Passed |
| Production web bundle | Passed; four static routes exported |
| Browser visual review | Passed at a 390 × 844 mobile viewport; bottom bar measured 96 points tall |
| Interaction review | 2/3-column layout passed; no inactive media controls remain |
| Supplied current-app reference review | Dark chrome, six navigation destinations, and bottom-bar proportions captured |
| Physical-device review | Pending |

## Demo

A screenshot will be added after the final browser and physical-device review.

## Reflection

This module demonstrates React's central loop: typed data flows into components, a user event changes grid-density state, and React renders the next layout. It also captures a more important product lesson: visual restraint is not the absence of design. In a photography workspace, restraint is what lets the work become the interface.

## Next step

Module 03 will extract the successful visual decisions into named design tokens and reusable primitives rather than allowing raw values to spread through the application.

## References

- [Current VSCO Studio behavior](https://support.vsco.co/en/articles/12698393-how-to-use-vsco)
- [Current VSCO Studio sorting, filters, and grid options](https://support.vsco.co/en/articles/12698511-studio-sorting-and-filter-feature-ios-only)
- [Current VSCO navigation and editing walkthrough](https://www.vsco.co/learn/getting-started-vsco)
- [Unsplash demo photography](https://unsplash.com/)
