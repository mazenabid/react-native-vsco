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
- **Callbacks** let a child report user interaction back to its parent without owning the parent's state.
- `map` transforms project data into repeated UI while stable `key` values preserve identity.
- Derived values, such as filtered projects and counts, should come from existing state instead of being duplicated as new state.
- `StyleSheet` describes native layout and appearance; React Native uses Flexbox by default.
- Accessibility roles, labels, and selected states make custom controls understandable beyond their visual design.

## Acceptance criteria

- [x] The generated Expo routes and visible starter content are removed.
- [x] The Studio screen has an original, intentionally minimal layout.
- [x] Typed, reusable filter and project-tile components are introduced.
- [x] Filtering and project selection demonstrate local state.
- [x] Demo content is clearly distinguished from future device photos.
- [ ] The screen is visually verified on the primary physical-device target.
- [x] `npm run lint` passes without warnings.
- [x] `npm run typecheck` passes.
- [x] A production-style web bundle completes.
- [ ] Visual evidence is added to the pull request.

## What was built

### Studio screen

The screen combines a restrained editorial header, progress summary, filter control, responsive grid, and selection feedback. It is intentionally useful as a learning surface without implementing device media permissions before their dedicated module.

### Controlled filter component

`StudioFilterTabs` receives its current value and an `onChange` callback. The parent owns the state; the child owns only the presentation and user interaction. This makes the component predictable and reusable.

### Typed project tile

`ProjectTile` receives a `StudioProject`, its calculated size, selection state, and a callback. The abstract artwork is produced entirely with native views so the module can focus on components and layout without introducing remote images or image-processing libraries.

### Data-driven rendering

Six demo studies are stored as typed data. The screen maps that data into project tiles and derives the edited subset from the selected filter.

## Decisions

### Use explicit demo studies instead of requesting photos early

Photo permission and Media Library behavior deserve a focused lesson in Module 05. Using clearly labeled demo studies prevents permission handling from obscuring React fundamentals or creating a misleading fake import flow.

### Keep visual values local until Module 03

The first screen needs an intentional visual direction, but formal color, typography, spacing, and component tokens belong to the design-system module. Values remain local during this experiment so Module 03 can extract a system from something tangible.

### Keep state at the closest shared parent

The Studio screen owns the filter and selected project because multiple child components depend on those values. Child components receive the minimum props needed to render and notify the parent of interactions.

## Problems encountered

### An array type violated the repository lint convention

The initial filter options used `ReadonlyArray<T>`. ESLint requested the equivalent `readonly T[]` form. The code was changed rather than ignoring the warning.

**Lesson:** Automated checks express project conventions. Read the warning, understand the equivalent type, and fix the source instead of weakening the rule.

## Validation evidence

| Check | Result |
| --- | --- |
| Lint | Passed without warnings |
| TypeScript | Passed |
| Production web bundle | Passed; four static routes exported |
| Browser visual review | Pending |
| Physical-device review | Pending |

## Demo

A screenshot will be added after the final browser and physical-device review.

## Reflection

This module demonstrates React's central loop: data and state flow down into components, user events flow back up through callbacks, and React renders the next interface. The screen is visually richer than the underlying concepts, but the implementation remains deliberately small.

## Next step

Module 03 will extract the successful visual decisions into named design tokens and reusable primitives rather than allowing raw values to spread through the application.
