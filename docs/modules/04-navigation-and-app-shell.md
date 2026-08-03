# Module 04 — Navigation and App Shell

**Status:** In progress

**Product outcome:** The six bottom destinations are real Expo Router routes controlled by a custom, safe-area-aware tab bar.

## Goal

Replace the visual-only Studio navigation with an app shell whose URL, mounted screen, selected tab, history, and accessibility state all describe the same route.

## Concepts learned

- **File-based routing** turns files inside `app` into addressable screens.
- A layout route owns navigation shared by its child routes without becoming a visible destination itself.
- The tab navigator owns route history and focus; the tab bar renders that state instead of duplicating it.
- `tabPress` and `tabLongPress` events preserve React Navigation behavior and allow listeners to intervene.
- A navigation control needs a tab role, label, and selected state in addition to visual active styling.
- Screen safe areas and bottom-bar safe areas have different owners.

## Acceptance criteria

- [x] Feed, Discover, Studio, AI Lab, Profile, and Spaces map to real route files.
- [x] The custom bar derives focus from router state instead of hard-coded flags.
- [x] Tab buttons expose labels, tab roles, and selected state.
- [x] The bottom inset remains inside the navigation platform.
- [x] Non-Studio routes use a restrained shared header without fake product actions.
- [x] Each tab press renders the correct screen and active treatment.
- [x] Studio's grid-density state survives switching away and back while mounted.
- [x] Direct web routes render successfully.
- [ ] The bar is visually verified at the primary mobile viewport and physical device. (Web viewport passed; physical device pending.)
- [x] `npm run lint` passes without warnings.
- [x] `npm run typecheck` passes.
- [x] A production web export passes.
- [ ] The draft pull request records route and interaction evidence.

## What was built

### File-backed destinations

The `(tabs)` directory now contains Feed, Discover, Studio, AI Lab, Profile, and Spaces screens. Studio remains the initial route. The other destinations intentionally render only their title and shared shell until their product modules provide real content.

### AppTabBar

`AppTabBar` receives React Navigation's bottom-tab state, descriptors, and navigation object. It maps each route to a label and icon, derives focus from `state.index`, emits the standard tab events, and asks the navigator to change routes only when the press was not prevented.

### ScreenHeader and honest placeholders

`ScreenHeader` extracts the repeated current-app header composition. `RoutePlaceholder` supplies the black canvas and top safe area for unfinished destinations. No placeholder claims to contain a feed, AI feature, profile, or publishing capability.

## Decisions

### Use stable JavaScript tabs

Expo SDK 54 offers JavaScript, custom headless, and alpha native tab approaches. The app already depends on React Navigation bottom tabs and needs a deliberately custom visual platform. Stable JavaScript tabs provide mature routing behavior while allowing the entire bar to be replaced.

### Derive active state

The Module 02 bar hard-coded Studio as active because it was only a visual scaffold. Module 04 removes that flag. The active color and accessibility state now derive from the navigator's selected route index, so visual and behavioral truth cannot drift apart.

### Keep future products empty

Populating new routes with decorative mock content would make the shell look busier but repeat the earlier mistake of implying capabilities that do not exist. Empty routes make the navigation outcome clear and leave later modules responsible for their actual products.

## Problems encountered

### Navigation is more than changing a local variable

A hand-built `activeTab` state could switch rendered components, but it would omit URLs, history, deep links, screen lifecycle, standard events, and route-level accessibility semantics.

**Lesson:** Use navigation infrastructure for navigation. Local state is not a substitute for a router.

## Validation evidence

| Check | Result |
| --- | --- |
| Lint | Passed without warnings |
| TypeScript | Passed |
| Six route files | Present |
| Tab interaction review | Passed: all six tabs updated the screen, selected treatment, and URL |
| Mounted-state review | Passed: Studio grid density survived a round trip through Discover |
| Direct route review | Passed: `/ai-lab` loaded directly with AI Lab selected |
| 390 × 844 web viewport | Passed |
| Production web bundle | Passed: 14 static routes exported, including all six public destinations |
| Physical-device review | Pending |

## Demo

The visible proof for this module is movement: every bottom destination should update both the displayed title and selected tab while preserving the approved bar proportions.

## Reflection

Navigation state is application structure, not decoration. Once the router owns it, links, history, accessibility, and rendering all gain a common source of truth.

## Next step

Module 05 will replace remote demo studies with permission-aware photos from the device media library.

## References

- [Expo Router JavaScript tabs](https://docs.expo.dev/router/advanced/tabs/)
- [Expo SDK 54 Router reference](https://docs.expo.dev/versions/v54.0.0/sdk/router/)
- [Expo SDK 54 Router UI reference](https://docs.expo.dev/versions/v54.0.0/sdk/router-ui/)
