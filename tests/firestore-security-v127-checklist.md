# Firestore security and account-isolation checklist — v127

## Reviewed Firestore rule

```rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId}/items/{itemId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Expected outcomes (must be verified in Firebase Console Rules Playground or Emulator):
1. Signed out read of any `users/{uid}/items/{id}`: DENY.
2. Signed out write: DENY.
3. User A reads/writes `users/A/items/id`: ALLOW.
4. User A reads/writes `users/B/items/id`: DENY.
5. User B reads/writes `users/A/items/id`: DENY.
6. Parent path or other collection access: DENY unless separately allowed by another rule.

## Browser account-binding guard
- First Google UID in a browser profile is stored in localStorage key `amol-local-cloud-owner-uid`.
- Same UID: sync allowed.
- Different UID: cloud sync blocked; local data is not deleted.
- Missing localStorage or storage exception: sync blocked (fail closed).
- Return to original account to resume. Use another browser profile for a distinct account.

## Important limits
- Presence of `firestore.rules` in GitHub does NOT prove it is published in Firebase Console.
- Static review is not a substitute for Firebase Emulator/Rules Playground tests.
- Local IndexedDB is still shared by the app origin; wrong-account local edits can remain in that shared store even while cloud sync is blocked. Do not edit while the mismatch warning is visible.
