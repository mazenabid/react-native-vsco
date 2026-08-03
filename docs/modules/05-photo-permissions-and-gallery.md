# Module 05 — Photo Permissions and Gallery

**Status:** In progress

**Product outcome:** Studio replaces remote demo studies with a permission-aware, paginated grid of photos from the user's device.

## Goal

Cross the boundary from a self-contained interface into native device data without treating permission as a single boolean or hiding failure states.

## Concepts learned

- Native permissions are persistent operating-system state, not a modal controlled by React.
- A granted media permission can expose the full library or only user-selected assets.
- Permission copy belongs in native configuration because the operating system renders it.
- Cursor pagination loads a bounded page and passes the previous `endCursor` as the next `after` value.
- `FlatList` virtualizes rows instead of mounting an entire camera roll at once.
- Recycled image views need stable asset keys so an old thumbnail is not briefly shown for a new item.
- App lifecycle and media-library events can invalidate data that was correct moments earlier.

## Acceptance criteria

- [x] The app requests only photo-library access, after an intentional user action.
- [x] Granted access queries newest device photos first.
- [x] Limited access is explained and can open the system selection manager.
- [x] Permanently denied access offers a route to system settings.
- [x] Loading, empty, error, retry, pagination, and unsupported-web states are explicit.
- [x] The grid supports two and three columns without selecting or editing photos prematurely.
- [x] Remote demo photos and their obsolete rendering components are removed.
- [x] Media-library and app-state changes refresh permission and gallery data.
- [x] `npm run lint` passes without warnings.
- [x] `npm run typecheck` passes.
- [x] Expo configuration resolves with photo-only Android permissions.
- [x] The unsupported web state is visually verified at 390 × 844.
- [x] A native iOS simulator renders real library photos without Metro errors.
- [x] A production web export passes.
- [ ] Permission transitions and pagination are reviewed on a physical device.
- [x] The draft pull request records implementation and validation evidence.

## What was built

### Native permission configuration

The Expo MediaLibrary config plugin now provides purposeful iOS permission copy, limits Android's granular manifest permissions to photos, and disables the automatic limited-access reminder so Studio can own a clear Manage action.

### useDevicePhotos

The domain hook coordinates MediaLibrary availability, permission, assets, cursor state, initial loading, refresh, pagination, action progress, and recoverable errors. It also listens for app activation and media-library changes so returning from Settings or changing selected photos does not leave stale UI behind.

### Permission-aware Studio states

Studio does not ask on mount. An undetermined user sees why access is useful and chooses whether to continue. Retry, Settings, limited selection management, empty library, loading, and error paths all state what is actually happening.

### Virtualized device gallery

`PhotoGrid` uses a multi-column `FlatList` and Expo Image. Each thumbnail is square, has a stable asset ID, uses that ID as its recycling key, and loads additional pages near the end of the list. Images are intentionally not buttons yet because Module 05 does not ship an editor route.

## Decisions

### Use MediaLibrary instead of a one-off picker

An image picker is excellent when a user chooses one asset for a single task. Studio's product outcome is a browsable library with pagination, refresh, and limited-access management, so direct media-library access teaches and supports the actual requirement.

### Ask for photos only

The app does not yet edit video or audio. Requesting those permissions would violate least privilege and make the native prompt harder to justify. Both runtime permission options and the config plugin therefore use the `photo` granular permission.

### Keep the request user-initiated

Requesting access on launch would interrupt the user before the interface explains why. Studio first shows a clear outcome and only opens the operating-system prompt after the user presses Allow Photo Access.

### Treat limited access as success with constraints

Limited access still returns usable assets. Studio renders those photos, labels the constraint, and provides Manage rather than treating the user as if they denied access.

### Resolve full Android asset information

Expo documents that Android image orientation can be wrong when `getAssetsAsync` omits `resolveWithFullInfo`. The query enables it only on Android so thumbnails respect their EXIF orientation.

### Make web honest

Expo MediaLibrary is a native API. The static web route stays valid and explains that device photos are available in Expo Go on iOS or Android instead of substituting remote images that imply native behavior.

## Problems encountered

### Permission state survives rebuilds

The booted iOS simulator had already granted Expo Go photo access, so the first native smoke test correctly skipped the request screen and rendered six library photos.

**Lesson:** Re-rendering or restarting JavaScript does not reset an operating-system permission. Every state must be testable, but normal launches begin from the device's current truth.

### Async state has more than loading and loaded

Initial loading, pull-to-refresh, pagination, permission actions, errors with no content, and errors after some content are different experiences. A single `isLoading` flag cannot represent them accurately.

**Lesson:** State names should describe what the user is waiting for, not only whether a Promise exists.

## Validation evidence

| Check | Result |
| --- | --- |
| Installed native module | `expo-media-library@18.2.1`, the SDK 54 recommended version |
| Expo public config | Passed; Android output includes image and selected-image permissions, not video or audio |
| Lint | Passed without warnings |
| TypeScript | Passed |
| 390 × 844 web fallback | Passed; explicit native-platform explanation and navigation preserved |
| iOS simulator | Passed; six real library photos rendered in the three-column grid |
| Metro runtime | No errors during the simulator smoke test |
| Production web bundle | Passed; 14 static routes exported |
| Pull request | [Draft PR #8](https://github.com/mazenabid/react-native-vsco/pull/8) |
| Physical-device permission review | Pending |

## Demo

The native proof is no longer a curated set of remote URLs: Studio renders whatever photos the operating system currently allows this app to read.

## Reflection

Native permissions are a relationship with the user, not a technical obstacle to dismiss. The strongest flow requests the minimum scope, explains its value before interruption, and remains useful when the user grants only part of what was requested.

## Next step

Module 06 will give these assets a durable domain model and establish state boundaries for selection, projects, and the future editor.

## References

- [Expo SDK 54 MediaLibrary](https://docs.expo.dev/versions/v54.0.0/sdk/media-library/)
- [Expo SDK 54 Image](https://docs.expo.dev/versions/v54.0.0/sdk/image/)
