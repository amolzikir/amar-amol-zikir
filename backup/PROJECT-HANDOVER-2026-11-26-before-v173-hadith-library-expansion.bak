# আমার আমল ও জিকির — প্রকল্প হস্তান্তর নথি

**সর্বশেষ হালনাগাদ:** ২৫ নভেম্বর ২০২৬  
**উদ্দেশ্য:** ChatGPT-এর পুরোনো চ্যাট হারালেও অন্য ফোন বা অন্য ChatGPT অ্যাকাউন্ট থেকে প্রকল্পের কাজ নিরাপদে চালিয়ে যাওয়া।

## ১. প্রকল্প পরিচিতি
- অ্যাপ: আমার আমল ও জিকির
- ধরন: বিনামূল্যের Android-friendly Progressive Web App (PWA)
- লাইভ ঠিকানা: https://amolzikir.github.io/amar-amol-zikir/
- GitHub repository: https://github.com/amolzikir/amar-amol-zikir
- প্রধান ফাইল: `index.html`
- Service worker: `sw.js`
- Firebase project ID: `amar-amol-zikir`
- Firebase ব্যবহার: Google Authentication ও Cloud Firestore
- Firestore ডেটা-পথ: `users/{uid}/items/{id}`
- লোকাল ডেটা: IndexedDB store `items`, keyPath `id`
- ফোল্ডার parent field: `parentId`
- ব্যবহারকারীর প্রধান ডিভাইস: Android ফোন; তাই সব নির্দেশনা মোবাইল-বান্ধব ও সহজ রাখতে হবে।

## ২. কাজ চালিয়ে যাওয়ার নিয়ম — অবশ্যই মানতে হবে
1. ব্যবহারকারী কোড নিজে সম্পাদনা করতে স্বচ্ছন্দ নন; সম্ভব হলে GitHub সংযোগ/উপলভ্য টুল দিয়ে সহকারীই কাজ করবে।
2. কোনো পরিবর্তনের আগে সর্বশেষ `index.html` ও `sw.js` GitHub থেকে আনতে হবে।
3. গুরুত্বপূর্ণ পরিবর্তনের আগে দুই ফাইলের ব্যাকআপ নিতে হবে; ব্যাকআপ তৈরি হয়েছে কি না fetch করে যাচাই করতে হবে।
4. GitHub update-এ সংশ্লিষ্ট ফাইলের একেবারে নতুন blob SHA ব্যবহার করতে হবে।
5. JavaScript syntax যাচাই করতে হবে; তারপর GitHub থেকে আবার fetch করে পরিবর্তন ও service-worker cache version যাচাই করতে হবে।
6. প্রতিটি release-এ `sw.js`-এর cache version বাড়াতে হবে।
7. বিদ্যমান কোনো ফিচার/ডেটা ব্যবহারকারীর অনুমতি ছাড়া বাদ দেওয়া, ভাঙা বা মুছে ফেলা যাবে না।
8. ফোনে বাস্তবে কাজ করছে—ব্যবহারকারী নিশ্চিত না করা পর্যন্ত এমন দাবি করা যাবে না।
9. ব্যবহারকারী সংক্ষিপ্ত কথা ও দ্রুত বাস্তব কাজ পছন্দ করেন। “চলুক”, “পরের কাজ”, “কাজ চালিয়ে যান” মানে পরবর্তী বাস্তব কাজ শুরু করা।
10. কম্পন/ভাইব্রেশন সমস্যা নিয়ে আর কাজ বা পরীক্ষা প্রস্তাব করা যাবে না; ব্যবহারকারী বিষয়টি বাদ দিতে বলেছেন।

## ৩. ইতিমধ্যে তৈরি/কাজ করা ফিচারসমূহ
- Google sign-in; Firestore-এ অনলাইন নোট সংরক্ষণ ও sync।
- অফলাইনে নোট তৈরি; ইন্টারনেট ফিরলে sync।
- ফোল্ডার তৈরি, nested folder, rename, move, pin, color/size, reorder ও delete।
- Home, Favorites, Pinned pages, Bookmarks, Recent, All collection, Settings, About।
- Dark mode; বাংলা, আরবি, ইংরেজি ও উর্দু ভাষা; আরবি/উর্দু RTL।
- নোট viewer/editor, fullscreen, search, favorite, bookmark, pin, reminder, copy, share, edit, delete।
- Android Back navigation ও refresh-এর পর Daily Amal/Tasbih screen ধরে রাখার সংশোধন।
- ক্যালেন্ডার ও Daily Amal: অগ্রগতি, নির্বাচিত তারিখ, streak/দিনভিত্তিক তথ্য।
- Personal Home Dashboard।
- Dua & Dhikr library: আরবি, বাংলা উচ্চারণ, অর্থ, বিভাগ, search, favorite, copy, note হিসেবে save, offline।
- Tasbih counter: বাক্য নির্বাচন, custom phrase, লক্ষ্য, অগ্রগতি, round/milestone, sound।
- Backup & Restore: JSON backup; restore merge করে, পুরোনো ডেটা মুছে দেয় না।
- Quran tracker: তারিখ, সূরা, আয়াত, পৃষ্ঠা, সময়, পরিসংখ্যান; local ও cloud sync।
- Daily Amal reminder: app চলার সময়/খোলার পর due check; notification permission প্রয়োজন হতে পারে।
- Daily Hadith card; উৎস-সহ হাদিস ও বাংলা শিক্ষা।
- Dua/Dhikr-এর আরবি text-to-speech; এটি ফোনের TTS, কোনো ক্বারির রেকর্ডিং নয়।
- Personal Zikr Routine: নিজস্ব জিকির, লক্ষ্য, দৈনিক গণনা ও অগ্রগতি।
- Hijri date display; স্থানীয় চাঁদ দেখার কারণে একদিন পার্থক্য হতে পারে।
- App Lock & Privacy: PIN lock, ১০ মিনিট inactivity auto-lock, WebAuthn biometric option এবং PIN দিয়ে lock সম্পূর্ণ বন্ধ/পুনরায় চালুর ব্যবস্থা প্রকাশিত; Android ফোনে বাস্তব আচরণ ব্যবহারকারীর নিশ্চিতকরণসাপেক্ষ।

## ৪. গুরুত্বপূর্ণ সাম্প্রতিক সংস্করণ ও অবস্থা
- সর্বশেষ সফল app release: **v170**; CI run `45665115279` এবং GitHub Pages run `45665115733` সফল। নতুন v171 candidate-এ প্রতিদিনের হাদিস ৩ দিনের ঘূর্ণায়মান তালিকায় বাড়ানো হয়েছে; সর্বশেষ CI run `45667421683` ও Pages run `45667421858` এখনও in progress, তাই v171-কে প্রকাশিত/সম্পূর্ণ বলা যাবে না। Candidate service-worker cache marker `amol-zikir-v171`। Android ফোনে নতুন সংস্করণ নোটিশ/আপডেট, হিজরি display ও GPS handoff বাস্তব যাচাই বাকি। v163 Firestore emulator test CI-তে pass করেছে, তবে Firebase Console-এর live Rules publish status এখনও অযাচাইকৃত।
- v136-এ Backup v2 export-এ account-scoped Dua favorites যুক্ত; restore v1/v2 গ্রহণ করে, records ও favorites merge করে এবং local write read-back যাচাই করে।
- v136-এ চারটি সূত্র-উল্লেখসহ দোয়া যোগ হয়েছে: ঘর থেকে বের হওয়া, সকাল-সন্ধ্যার আফিয়াত, মসজিদে প্রবেশ ও মসজিদ থেকে বের হওয়া।
- সর্বশেষ যাচাইকৃত GitHub fetch (২৪-১১-২০২৬): `index.html` blob SHA `65a44f0240a2110d3fec1b5f019dfc614f1a84ba`; `sw.js` blob SHA `316a388da4e09b71303df9ff978c9128657110d4`।
- v136-এর GitHub Actions Firestore/security workflow এবং GitHub Pages build/deploy—দুটিই success (workflow run IDs `45258727072`, `45258729967`)।
- SHA-গুলো কেবল এই নথি হালনাগাদের সময়ের রেফারেন্স; প্রতিটি update-এর আগে নতুন করে fetch করতে হবে।
- Automated tests pass করলেও Android ফোনে backup download/restore, account switch, offline sync, app lock/biometric-এর বাস্তব পরীক্ষা এখনও ব্যবহারকারীর নিশ্চিতকরণের অপেক্ষায়।

## ৫. পরবর্তী কাজের অগ্রাধিকার (v164-এর পর)
1. **Android বাস্তব পরীক্ষা:** নিরাপদ test note দিয়ে backup download/restore, offline-to-online sync, account isolation এবং App Lock/biometric আচরণ যাচাই; আসল ডেটায় destructive test নয়।
2. **Firebase Rules live verification:** GitHub emulator test pass করলেই Firebase Console-এ live rules deploy নিশ্চিত হয় না; আলাদা যাচাই প্রয়োজন।
3. **ধর্মীয় কনটেন্ট যাচাই:** দোয়ার আরবি, উচ্চারণ, অর্থ এবং হাদিসের সূত্র নির্ভরযোগ্য মূল উৎসে যাচাই; Hijri month-start ঘোষণার পাশাপাশি sunset rollover v164-এ সংশোধন করা হয়েছে।
4. **অবশিষ্ট regression audit:** Calendar, Daily Amal, Tasbih, Quran tracker, search ও navigation—শুধু নতুন প্রমাণিত ঘাটতি থাকলে পরিবর্তন; পুনরাবৃত্ত পরীক্ষা/কোড নয়.

**নিরাপদ পরীক্ষার নিয়ম:** ব্যবহারকারীর ফোনে বাস্তব পরীক্ষা না হলে সেটিকে pending বলতে হবে; আসল ডেটা মুছে/ওভাররাইট করার মতো পরীক্ষা করা যাবে না।

## ৬. Backup ও নিরাপত্তা
- ব্যবহারকারী নিয়মিত অ্যাপের Settings থেকে JSON backup নামিয়ে ফোনের বাইরে নিরাপদ জায়গায় (যেমন Google Drive) রাখতে পারেন।
- Backup ফাইলে ব্যক্তিগত নোট/ডেটা থাকতে পারে; কাউকে প্রকাশ্যে শেয়ার করা যাবে না।
- GitHub repository-তে Firebase client config থাকলেও কোনো private key, service account key, password বা ব্যক্তিগত token কখনো commit করা যাবে না।
- GitHub Pages ও Firebase-এর বিনামূল্যের quota/নীতিমালা ভবিষ্যতে পরিবর্তিত হতে পারে; বিনামূল্যে চিরকাল চলবে—এমন নিশ্চয়তা দেওয়া যাবে না। ব্যবহারকারী নিজে billing plan না বদলালে স্বয়ংক্রিয়ভাবে paid plan ধরে নেওয়া যাবে না।

## ৭. নতুন ChatGPT-তে কাজ শুরু করার জন্য কপি-পেস্ট নির্দেশনা
“আমি ‘আমার আমল ও জিকির’ নামে একটি Android-friendly PWA তৈরি করছি। এই প্রকল্পের হস্তান্তর নথি পড়ুন: https://github.com/amolzikir/amar-amol-zikir/blob/main/PROJECT-HANDOVER.md । Repository-এর সর্বশেষ index.html ও sw.js নিজে fetch করে বর্তমান অবস্থা যাচাই করুন। নথির কাজের নিয়মগুলো কঠোরভাবে মানুন: আগে backup, সর্বশেষ SHA, JavaScript syntax check, service-worker cache version bump, শেষে GitHub থেকে verify। বিদ্যমান ফিচার বা ডেটা নষ্ট করবেন না। আমাকে দীর্ঘ নির্দেশনা না দিয়ে সংক্ষেপে বাস্তব কাজ এগিয়ে নিন। আমার ফোন Android; আমি নিজে কোড edit করতে পারি না।”

## ৮. গুরুত্বপূর্ণ সীমাবদ্ধতা
এই নথি প্রকল্পের অবস্থা ও কাজের নিয়ম ধরে রাখে; এটি ChatGPT-এর পুরোনো চ্যাটের হুবহু বিকল্প নয়। নতুন সহকারীকে প্রতিবার repository-এর live code দেখে যাচাই করতে হবে। Firebase console-এর private account settings বা ব্যবহারকারীর ব্যক্তিগত credentials এই নথিতে নেই এবং থাকা উচিতও নয়।


## ৯. v112 — App Lock & Privacy (২৩ নভেম্বর ২০২৬)
- Settings-এ ৪–৮ সংখ্যার PIN তৈরি/পরিবর্তন/বন্ধ করার UI যোগ করা হয়েছে।
- PIN hash PBKDF2-SHA-256 (180,000 iterations) ও random 16-byte salt দিয়ে তৈরি; plaintext PIN সংরক্ষণ করা হয় না।
- PIN hash ও salt কেবল এই ব্রাউজারের localStorage-এ থাকে; Firebase-এ sync হয় না এবং JSON backup-এ অন্তর্ভুক্ত নয়।
- PIN চালু থাকলে প্রতিবার অ্যাপ reload/নতুন করে খোলার সময় লক স্ক্রিন দেখায়; Settings থেকে “এখনই লক করুন” দিয়ে তাৎক্ষণিক লক করা যায়।
- PIN পরিবর্তন/বন্ধ করতে বর্তমান PIN জানা আবশ্যক। PIN ভুলে গেলে অ্যাপের মধ্যে recovery নেই।
- **গুরুত্বপূর্ণ সীমাবদ্ধতা:** এটি UI/app-screen lock; IndexedDB বা ব্রাউজারের ডেটা এনক্রিপ্ট করে না। ফোন/ব্রাউজারের নিজস্ব নিরাপত্তা ও ডেটা ব্যাকআপ বজায় রাখতে হবে।
- v112 কোড GitHub-এ প্রকাশিত; JS syntax check ও পুনরায় fetch verification পাস করেছে। Cache: `amol-zikir-v112`।
- ব্যবহারকারীর ফোনে PIN সেট করা, লক হওয়া ও আনলক পরীক্ষা এখনও বাকি; ব্যবহারকারী নিশ্চিত না করা পর্যন্ত on-device success বলা যাবে না।


## ১০. v113 — PIN নিষ্ক্রিয়তা টাইমআউট (২৩ নভেম্বর ২০২৬)
- ব্যবহারকারীর অনুরোধে PIN auto-lock সময় ১০ মিনিট নিষ্ক্রিয়তা নির্ধারণ করা হয়েছে।
- রিফ্রেশ করলে সঙ্গে সঙ্গে PIN চাইবে না; সর্বশেষ activity timestamp localStorage-এ রেখে reload-এর পর অবশিষ্ট idle সময় গণনা করে।
- Pointer/touch/keyboard/scroll/click activity idle timer নতুন করে শুরু করে।
- ১০ মিনিট নিষ্ক্রিয় হলে, অথবা app background থেকে foreground-এ ফিরলে সময়সীমা পার হয়ে থাকলে, PIN lock দেখায়।
- Settings-এর “এখনই লক করুন” আগের মতো তাৎক্ষণিক কাজ করে।
- Cache: `amol-zikir-v113`; JavaScript syntax check ও GitHub refetch verification পাস।
- ব্যবহারকারীর ফোনে রিফ্রেশ/১০ মিনিট idle/আনলক আচরণ পরীক্ষা এখনও বাকি।

## ১১. v114 — বায়োমেট্রিক আনলক ও PIN টাইমআউট সংশোধন (২৩ নভেম্বর ২০২৬)
- Settings-এ “ফিঙ্গারপ্রিন্ট চালু করুন” ও “বায়োমেট্রিক বন্ধ” বোতাম যোগ হয়েছে; লক স্ক্রিনে বায়োমেট্রিক আনলকের বোতাম দেখা যাবে যখন সেটআপ সম্পন্ন।
- WebAuthn platform authenticator ব্যবহার করা হয়েছে। Android/Chrome/ডিভাইস সমর্থন করলে fingerprint বা device screen-lock verification চাইবে; কেবল fingerprint বাধ্যতামূলক করা যায় না। PIN সবসময় fallback হিসেবে থাকবে।
- Credential ID কেবল এই browser-এর localStorage-এ থাকে; ফোন/ব্রাউজার বদলালে পুনরায় সেটআপ লাগতে পারে।
- PIN idle bug-এর কারণ: PIN তৈরি করার সময় যদি অ্যাপ শুরুতে PIN না থাকায় activity listeners যোগ না হয়ে থাকে, পরে PIN চালু করলেও activity reset হতো না। v114-এ listeners একবার সর্বদা যুক্ত হয় এবং PIN তৈরি করার পরও session শুরু হয়।
- Backup তৈরি ও পুনরায় fetch করে exact content মিলিয়ে যাচাই করা হয়েছে: `backup/index-2026-11-23-before-biometric-v114.html`, `backup/sw-2026-11-23-before-biometric-v114.js`।
- JavaScript syntax check পাস; GitHub থেকে index/sw পুনরায় fetch করে v114 markers ও cache version যাচাই করা হয়েছে। Cache: `amol-zikir-v114`।
- ব্যবহারকারীর Android ফোনে ১০ মিনিট idle আচরণ ও fingerprint setup/verification পরীক্ষা এখনও বাকি; ফোনে পরীক্ষা না হওয়া পর্যন্ত কাজ সফল হয়েছে বলে দাবি করা যাবে না।

## ১২. v115 — PIN Lock ঐচ্ছিক/সম্পূর্ণ বন্ধ (২৩ নভেম্বর ২০২৬)
- ব্যবহারকারী চাইলে Settings থেকে বর্তমান PIN যাচাই করে “PIN বন্ধ করুন” চাপলে PIN hash/salt, idle timestamp এবং biometric credential ID মুছে যায়; idle timer বাতিল হয়।
- বায়োমেট্রিক নিবন্ধনও PIN-এর সঙ্গে বন্ধ হয়, যাতে পরে নতুন PIN চালু করলে পুরোনো biometric registration অপ্রত্যাশিতভাবে থেকে না যায়।
- Settings-এর ব্যাখ্যা স্পষ্ট করা হয়েছে: lock বন্ধ থাকলে PIN/biometric ছাড়াই অ্যাপ ব্যবহার করা যাবে; পরে নতুন PIN দিয়ে আবার চালু করা যাবে।
- v115-এ JS syntax check ও GitHub refetch verification পাস। Cache: `amol-zikir-v115`।
- Backup: `backup/index-2026-11-23-before-pin-disable-v115.html`, `backup/sw-2026-11-23-before-pin-disable-v115.js`; দুই backup exact content দিয়ে যাচাই করা হয়েছে।
- ব্যবহারকারীর ফোনে on-device confirmation এখনও বাকি।


## v116 — 2026-11-23
- Note options menu bottom actions reordered for usability: **মুছুন → সম্পাদনা → বন্ধ করুন** (left to right). Existing action IDs and handlers are unchanged; only visual order changed.
- Service worker cache: `amol-zikir-v116`.
- Backup files: `backup/index-2026-11-23-before-note-menu-order-v116.html` and `backup/sw-2026-11-23-before-note-menu-order-v116.js` (verified exact).
- JavaScript syntax validation passed; GitHub files refetched and release markers verified.


## v117 — 2026-11-23
- Folder options modal bottom actions reordered for usability: **সরান** on the left and **বন্ধ** on the right. Existing IDs and behavior unchanged; visual order only.
- Service worker cache: `amol-zikir-v117`.
- Backups: `backup/index-2026-11-23-before-folder-menu-order-v117.html` and `backup/sw-2026-11-23-before-folder-menu-order-v117.js`, both exact-content verified.
- JavaScript syntax validation passed; GitHub release files refetched and verified.


## v118 — 2026-11-23
- Backup restore validation hardened: JSON envelope/version, record count, ID/type/title/tab/parent/timestamps, nested object depth/size and unsafe property names validated before writes.
- Allowed record types are `note`, `folder`, `daily-amal`, `counter`, and `quran-tracker`; optional legacy type remains accepted.
- Duplicate IDs inside an incoming backup are deduplicated, keeping the record with the newest `updatedAt`; local records are replaced only when incoming `updatedAt` is newer.
- IndexedDB restore writes are batched in one read-write transaction, reducing risk of partial record imports if a write fails.
- Zikr routine records receive stricter validation and merge remains additive by ID.
- Backups: `backup/index-2026-11-23-before-safe-restore-v118.html` and `backup/sw-2026-11-23-before-safe-restore-v118.js`, exact-content verified.
- JavaScript syntax check passed; GitHub files were refetched and v118/cache markers verified. Cache: `amol-zikir-v118`.
- Important: actual Android-device restore and quota/failure behavior still require safe test data and user confirmation; no live user data was used for testing.


## v119 — 2026-11-23
- Cloud sync fix: Firestore deletion tombstones are now retained instead of immediately deleted. This prevents an offline device's stale local copy from being uploaded again and resurrecting a deleted note/folder.
- Sync reconciles the union of local and remote IDs using updatedAt/deletedAt timestamps; newer changes win and deletion wins timestamp ties. Tombstone cloud documents retain only metadata (id/type/tab/parentId/title/deletedAt/updatedAt), not note body content.
- Backup files: `backup/index-2026-11-23-before-cloud-tombstone-v119.html` and `backup/sw-2026-11-23-before-cloud-tombstone-v119.js`, exact-content verified.
- JavaScript syntax passed; files refetched and verified; cache `amol-zikir-v119`.
- On-device and multi-device concurrent-edit testing still required. Existing user data was not modified or tested.


## v120 — 2026-11-23
- Cloud sync conflict handling now uses Firestore `runTransaction` per record, re-reading the latest cloud document inside the transaction before comparing `updatedAt`/`deletedAt` and deciding whether to pull or write. This reduces stale-snapshot overwrite races between devices.
- v119 tombstone retention and deletion-wins-on-timestamp-tie semantics preserved.
- Backups: `backup/index-2026-11-23-before-transactional-sync-v120.html` and `backup/sw-2026-11-23-before-transactional-sync-v120.js`, exact-content verified.
- JavaScript syntax passed; GitHub files refetched and v120 cache verified.
- Firestore transaction behavior still needs real multi-device testing using safe test records; no claim of device-level verification.

## v121 — 2026-11-23
- Cloud sync now re-reads each record from IndexedDB immediately before its Firestore transaction, instead of relying only on the initial local snapshot. This reduces the chance that an edit made during a long sync is uploaded using an older in-memory copy.
- Existing offline-first storage, reconnect-triggered sync, visibility-triggered sync, retry backoff, v120 Firestore transactions, and v119 deletion tombstones are preserved.
- Backups: `backup/index-2026-11-23-before-local-fresh-sync-v121.html` and `backup/sw-2026-11-23-before-local-fresh-sync-v121.js`, exact-content verified.
- JavaScript syntax and GitHub refetch verification passed. Cache: `amol-zikir-v121`.
- Real concurrent editing across devices and offline/reconnect behavior still require on-device testing; no claim of device-level verification.


## v122 — 2026-11-23
- Added a final IndexedDB freshness guard before applying a Cloud-pulled record locally. If the local record was edited during the Firestore transaction and its timestamp is newer than the incoming Cloud record, the older incoming copy is skipped and another reconciliation pass is queued.
- Existing v121 fresh-local-read behavior, v120 Firestore transactions, v119 deletion tombstones, retry/backoff, and reconnect/visibility sync remain intact.
- Backups: `backup/index-2026-11-23-before-sync-apply-guard-v122.html` and `backup/sw-2026-11-23-before-sync-apply-guard-v122.js`, exact-content verified.
- JavaScript syntax and GitHub refetch verification passed. Cache: `amol-zikir-v122`.
- Multi-device and offline/reconnect device tests remain pending.


## v123 — Sync diagnostics ও নিরাপদ পরীক্ষার পরিকল্পনা (2026-11-23)
- Header-এ live Sync status যোগ: signed-out/offline/syncing/success/retry/error।
- Firebase error code অনুযায়ী ব্যবহারকারী-বোধ্য বাংলা বার্তা; console diagnostic-এ code/message।
- Existing transaction conflict resolution, local freshness guard, retry/backoff অক্ষত।
- `tests/sync-safety-checklist.md`-এ production data না ছুঁয়ে আলাদা test Firebase project-এ synthetic record দিয়ে পরীক্ষা করার কেস ও ধাপ যোগ।
- যাচাই: JS syntax ও GitHub content refetch আবশ্যক; বাস্তব device/Firebase test এখনো আলাদা করে করতে হবে।


## v124 — Sync race-condition guard ও status polish (২৩ নভেম্বর ২০২৬)
- Transaction চলাকালে Local record বদলে গেলে পুরোনো snapshot দিয়ে Cloud-এ লেখা/Cloud থেকে Local overwrite করার পরপরই reconciliation পুনরায় চালু হবে।
- Pull/markDeleted এবং keepLocal—দুই ফলাফলের পর IndexedDB-র বর্তমান record-কে transaction snapshot-এর সঙ্গে তুলনা করা হয়; সমসাময়িক পরিবর্তন শনাক্ত হলে syncAgain দিয়ে নতুন snapshot-এ আবার মিল করা হয়।
- Offline error বার্তায় অনিচ্ছাকৃত Urdu শব্দ সংশোধন করে বাংলা করা হয়েছে; sign-out হলে Sync status-ও signed-out দেখায়।
- Cache version v124। v123-এর transaction conflict policy অপরিবর্তিত।
- v124-এ extracted production conflict-resolution branch-এর ১৪টি isolated verification check pass করেছে—৬টি production conflict-branch case, ২টি race-guard check, ৪টি error mapping, বাংলা offline message এবং পূর্ণ inline JavaScript syntax। এটি real Firebase integration test নয়।


## v125 — Offline/online status test support (২৩ নভেম্বর ২০২৬)
- Browser offline event listener যোগ করা হয়েছে: নেটওয়ার্ক বিচ্ছিন্ন হলে Sync status তাৎক্ষণিকভাবে offline দেখাবে এবং লোকাল-সেভিং বার্তা দেখাবে।
- Online event আগের মতো syncCloud চালায়; offline event নিজে কোনো Cloud write করে না।
- Cache version v125। পরিবর্তনের আগে index.html ও sw.js backup নিয়ে হুবহু যাচাই করা হয়েছে।
- পরবর্তী বাস্তব পরীক্ষা: ফোনে test note offline অবস্থায় তৈরি করে অনলাইনে ফিরে Cloud sync নিশ্চিত করা; assistant ফোনের network toggle বা Firebase account সরাসরি নিয়ন্ত্রণ করে না।


## v126 — Manual Sync recovery control (23 November 2026)
- Added a compact **“↻ এখনই Sync করুন”** control beneath the Sync status for signed-in users.
- The control calls the existing guarded `syncCloud()` flow; it does not bypass conflict resolution, local race checks, or retry handling.
- If a sync is already running, the existing `syncBusy/syncAgain` guard queues another pass instead of starting a parallel sync.
- The control remains hidden until both a signed-in user and Firebase Cloud connection are available.
- Service-worker cache version: `amol-zikir-v126`.
- Scope: this is a manual recovery/diagnostic affordance, not encryption, a new backup system, or proof of Firebase rules security. Real multi-account isolation and Firestore integration tests remain separate follow-up work.


## v127 — Local Cloud account binding guard (23 November 2026)
- Added a browser-origin local owner marker (`amol-local-cloud-owner-uid`) when the first Google account signs in on that browser profile.
- Cloud sync now refuses to upload/download when a different Google UID is detected in the same browser profile. This prevents an account switch from silently pushing the existing shared IndexedDB dataset into another account's Firestore path.
- The guard is checked both in the auth-state callback and inside `syncCloud()`, so manual sync and other save-triggered sync calls cannot bypass it.
- Recovery: return to the original Google account in that browser profile, or use a separate browser/profile for a separate account. Local data is preserved; the guard does not delete or migrate anything.
- Firestore rules reviewed: `users/{userId}/items/{itemId}` permits read/write only when authenticated UID equals `userId`. This rule file is in the repo, but whether it has been published in Firebase Console cannot be verified from GitHub.
- Limitation: this is a cloud-upload isolation guard, not full multi-account local database partitioning. If the wrong account is active, local-only edits can still enter that browser's shared IndexedDB; avoid editing until the original account is restored. Full account-specific local stores require a separate migration project.
- Service-worker cache: `amol-zikir-v127`. JavaScript syntax and static guard checks passed; real Firebase Rules Emulator tests and console publication remain pending.


## v128 — Firestore Security Rules Emulator Test Setup (২৩ নভেম্বর ২০২৬)
- বিদ্যমান `firestore.rules`-এর per-user UID access policy অপরিবর্তিত রাখা হয়েছে; কোনো live Firebase Rules deploy করা হয়নি।
- Local Firebase Emulator Suite test configuration যোগ: `firebase.json` (Firestore emulator port 8080; emulator UI বন্ধ)।
- `package.json`-এ isolated test dependencies ও `npm run test:rules` command যোগ।
- `tests/firestore.rules.test.js`-এ পাঁচটি automated case: signed-out read deny, own-user read/write allow, অন্য user-এর read/write deny, অনুমোদিত path-এর বাইরে write deny।
- Tests emulator-এ `firestore.rules` লোড করে; এটি live Firebase project-এ rules publish বা পরীক্ষা করে না। চালাতে repository-তে `npm install`-এর পর `npm run test:rules` চালাতে হবে।
- এই release-এ app runtime (`index.html`) ও service worker বদলানো হয়নি; তাই PWA cache version v127-ই আছে।
- নিরাপত্তার জন্য স্থানীয় IndexedDB এখনো একটিই shared store। Account-specific database migration এখনো করা হয়নি; migration-এর আগে offline edits, startup flow, system records, backup/restore ও account-switch আচরণ আলাদাভাবে পরীক্ষা করা আবশ্যক।
- Verified backups: `backup/firestore-rules-2026-11-23-before-firestore-emulator-tests-v128.rules` এবং `backup/PROJECT-HANDOVER-2026-11-23-before-firestore-emulator-tests-v128.md`।
- Emulator tests এই পরিবেশে চালানো হয়নি; setup ও test source যোগ করা হয়েছে, passing result দাবি করা হচ্ছে না।
- GitHub Actions workflow `.github/workflows/firestore-rules.yml` যোগ করা হয়েছে; সংশ্লিষ্ট rules/config/test ফাইল বদলালে GitHub Actions-এ স্বয়ংক্রিয়ভাবে emulator test চালানোর চেষ্টা করবে। Workflow run-এর ফলাফল আলাদাভাবে যাচাই করতে হবে।

## v129 — অ্যাকাউন্টভিত্তিক লোকাল ডেটাবেসের প্রথম ধাপ (২৩ নভেম্বর ২০২৬)
- `AmolZikirLocalAccount_<uid>` নামে পৃথক IndexedDB store ব্যবহার করা হয়েছে; signed-out অবস্থায় `AmolZikirLocalGuest` ব্যবহৃত হয়।
- প্রথম Google অ্যাকাউন্টে প্রবেশের সময় পুরোনো `AmolZikirLocal` ডেটা নতুন account DB-তে কপি ও read-back যাচাই করা হয়; পুরোনো DB মুছে ফেলা হয় না।
- পূর্বে নির্ধারিত owner UID-র সঙ্গে মিলে গেলে migration করা হয়; অন্য UID-র জন্য পুরোনো shared ডেটা কপি করা হয় না। অন্য অ্যাকাউন্ট নিজের পৃথক DB ও নিজস্ব Firestore path ব্যবহার করে।
- Migration-এ একই ID থাকলে `updatedAt/deletedAt`-এর সর্বশেষ রেকর্ড রাখা হয়; target DB-র নতুন রেকর্ড অক্ষত থাকে।
- Account switch চলাকালে UI pointer input সাময়িক বন্ধ; sync চলাকালে account context বদলালে পুরোনো sync নতুন DB-তে লিখতে পারে না।
- Offline/Firebase unavailable fallback-এ পূর্বের owner DB (migration সম্পন্ন থাকলে) বা পুরোনো DB খোলা হয়; signed-out কিন্তু Firebase auth state জানা থাকলে Guest DB ব্যবহৃত হয়।
- এই ধাপ IndexedDB items (নোট, ফোল্ডার, দৈনিক আমল, তাসবিহ কাউন্টার, কুরআন ট্র্যাকার) আলাদা করে। localStorage-এ থাকা app preferences, Dua favorites ও Zikr routines এখনো browser-profile shared; এগুলো account-partition করা এই release-এর অংশ নয়।
- Verified backups: `backup/index-2026-11-23-before-local-account-partition-v129.html`, `backup/sw-2026-11-23-before-local-account-partition-v129.js`, `backup/PROJECT-HANDOVER-2026-11-23-before-local-account-partition-v129.md`।
- Static/synthetic checks ছাড়া বাস্তব Android IndexedDB account-switch পরীক্ষা করা হয়নি; user confirmation আবশ্যক। কোনো পুরোনো DB বা record মুছে ফেলা হয়নি।

- v129 test coverage: `tests/local-account-partition.test.js`-এ চারটি automated test যোগ; GitHub Actions-এ local partition tests ও Firestore Emulator tests দুটোই চালানো হবে। বাস্তব Android IndexedDB account-switch পরীক্ষা এখনো user confirmation-এর অপেক্ষায়।


## v130 — personal localStorage isolation (2026-11-23)
- Dua favorites and personal Zikr Routines now use account-specific localStorage keys, aligned with the active IndexedDB account.
- Existing legacy favorites/routines migrate only to the account whose UID matches `amol-local-cloud-owner-uid`; guest storage does not inherit an existing owner's personal data.
- For a profile with no prior owner, legacy values migrate into guest-scoped keys.
- Language, theme, editor size, and sound preferences remain browser-wide settings.
- Existing legacy keys are preserved; this change does not delete any stored values.
- Added automated tests for original-owner migration and guest/account separation.
- Service worker cache: `amol-zikir-v130`.
- Pre-change verified backups: `backup/index.html-2026-11-23-v129-before-personal-storage-isolation.bak`, `backup/sw.js-2026-11-23-v129-before-personal-storage-isolation.bak`, `backup/PROJECT-HANDOVER.md-2026-11-23-v129-before-personal-storage-isolation.bak`, `backup/tests-local-account-partition.test.js-2026-11-23-v129-before-personal-storage-isolation.bak`.
\n\n## v131 — DOM attribute injection hardening (2026-11-24)\n- Fixed unsafe HTML attribute interpolation for item IDs in breadcrumb navigation, item cards, and note/folder menu buttons. All three now pass through the existing `esc()` HTML-attribute escaping helper. This prevents crafted IDs imported from a backup or received from cloud data from breaking out of quoted attributes and injecting markup/event handlers.\n- Added `tests/dom-security.test.js` to check hostile ID escaping and guard the three rendering sites against regression. Added `npm run test:security` and included it in the GitHub Actions security workflow.\n- Bumped service-worker cache to `amol-zikir-v131`.\n- Backups created and exact-content verified before edits: `backup/index.html-2026-11-24-v131-before-dom-id-escaping.bak`, `backup/sw.js-2026-11-24-v131-before-dom-id-escaping.bak`, `backup/PROJECT-HANDOVER.md-2026-11-24-v131-before-dom-id-escaping.bak`, `backup/package.json-2026-11-24-v131-before-dom-id-escaping.bak`, `backup/.github-workflows-firestore-rules.yml-2026-11-24-v131-before-dom-id-escaping.bak`, `backup/tests-local-account-partition.test.js-2026-11-24-v131-before-dom-id-escaping.bak`.\n- Scope: this hardens these identified HTML attribute insertion points; it is not a claim that every possible browser-side injection path has been formally audited.\n


## v132 — HTML injection audit: Dua library links (2026-11-24)
- Audited all 17 identified HTML insertion sites in `index.html`. Note viewer body/Arabic/pronunciation/meaning and most user-derived text fields already use `esc()`; folder option values, daily Amal IDs/names, Quran entry IDs, and Zikr routine IDs/text are also escaped. Numeric progress values and generated date keys are used in their respective attributes/styles.
- Fixed two remaining unsafe interpolations in the Dua library renderer: `data-dua-id` now uses `esc(d.id)`; source link href now passes through `safeHttpsUrl()`, which accepts HTTPS URLs only and returns a harmless `#` for javascript:, data:, HTTP, malformed, or other schemes. The existing curated Shamela HTTPS links remain valid.
- Added automated regression tests for unsafe URL schemes and the Dua card attribute/link rendering.
- Bumped service-worker cache to `amol-zikir-v132`.
- Pre-change backups created and exact-content verified: `backup/index.html-2026-11-24-v132-before-xss-audit-hardening.bak`, `backup/sw.js-2026-11-24-v132-before-xss-audit-hardening.bak`, `backup/PROJECT-HANDOVER.md-2026-11-24-v132-before-xss-audit-hardening.bak`, `backup/package.json-2026-11-24-v132-before-xss-audit-hardening.bak`, `backup/.github-workflows-firestore-rules.yml-2026-11-24-v132-before-xss-audit-hardening.bak`, `backup/tests-dom-security.test.js-2026-11-24-v132-before-xss-audit-hardening.bak`.
- Scope limitation: this is a targeted source review and regression coverage, not a formal proof that all runtime HTML injection risks are eliminated. Existing app behavior/data paths were not intentionally changed.


## v133 — Daily Amal recovery safeguard (2026-11-24)
- Added a recovery action shown when the Daily Amal list is empty. It reads the legacy `AmolZikirLocal` database read-only and, when online and signed in, also checks the current user's Firestore Daily Amal document.
- Recovery only considers non-deleted records that contain at least one saved item. If multiple candidates exist, it selects the newest by `updatedAt`; it does not union records or resurrect individually deleted items.
- Before restoring, it checks that the current local list is still empty and asks the user to confirm, showing the recovered item names. It then restores the selected record to the active account database and attempts to save it to that account's cloud document.
- The legacy database is only read; it is never deleted or modified. If no candidate is found, no data is changed.
- Bumped service-worker cache to `amol-zikir-v133`.
- Pre-change backups created and exact-content verified: `backup/index.html-2026-11-24-before-daily-amal-recovery.bak`, `backup/sw.js-2026-11-24-before-daily-amal-recovery.bak`, `backup/PROJECT-HANDOVER.md-2026-11-24-before-daily-amal-recovery.bak`, `backup/package.json-2026-11-24-before-daily-amal-recovery.bak`, `backup/.github-workflows-firestore-rules.yml-2026-11-24-before-daily-amal-recovery.bak`.
- Scope: recovery depends on the old browser IndexedDB database or current user's Firestore record still containing a non-deleted Daily Amal record; if neither contains it, an older user-created export/backup may be needed.


## v134 — বিস্তৃত Daily Amal পুনরুদ্ধার অনুসন্ধান
- v133-এর recovery button যদি নির্দিষ্ট `system-daily-amal` রেকর্ড না পায়, এখন legacy IndexedDB-র সব রেকর্ড, সক্রিয় account IndexedDB-র সব রেকর্ড এবং বর্তমান ব্যবহারকারীর Firestore `items` collection-এর সব document পরীক্ষা করে।
- কেবল স্পষ্টভাবে Daily Amal হিসেবে চিহ্নিত, non-deleted এবং non-empty `items`-সহ রেকর্ড বিবেচনা করে; অন্য নোট/ফোল্ডারকে আমল হিসেবে ধরে না।
- একাধিক প্রার্থী থাকলে সর্বশেষ `updatedAt`-এর রেকর্ডটি বেছে নেয়; restore-এর আগে ব্যবহারকারীর সামনে নাম দেখিয়ে confirmation চায়।
- অন্য Google account-এর database বা Guest database অনুসন্ধান/মিশ্রণ করা হয় না; legacy database read-only থাকে।
- v134-এর JS syntax, Daily Amal selector tests, deployment ও CI ফলাফল আলাদাভাবে যাচাই করতে হবে; ফোনে ব্যবহারকারী নিশ্চিত না করা পর্যন্ত পুনরুদ্ধার সফল বলা যাবে না।


## v135 (guest database Daily Amal recovery)
- v134 recovery scan covered legacy DB, current active account DB, and the signed-in user's Firestore items, but did not inspect the guest IndexedDB database.
- v135 adds a read-only scan of `AmolZikirLocalGuest` (the guest DB) and labels any recovered candidate as originating from the signed-out-use database. The user must still confirm the item names before anything is restored.
- The guest database is only read and closed; no records are changed or deleted by the scan.
- Existing candidate selection remains newest non-deleted Daily Amal record only; no blind union or cross-account account-DB scanning.
- Cache version: `amol-zikir-v135`.
- Pre-change backups are in `backup/*-2026-11-24-v135-before-guest-db-recovery.bak`.


## v136 — নিরাপত্তা, ব্যাকআপ ও দোয়া লাইব্রেরি উন্নয়ন (2026-11-24)
- Security review: existing per-account IndexedDB, UID-bound Firestore rules, HTML escaping and HTTPS-only Dua links retained; PIN warning continues to clarify that app lock is not data encryption. No live Firestore rules deployment or security claim beyond these controls.
- Backup v2 remains backward compatible with v1 and v2 files. New exports also include account-scoped Dua favorites alongside Zikr routines; restore validates optional favorite IDs and itemCount, merges favorites without removing current choices, and reads back written records/preferences for verification. Cloud sync errors are isolated from local restore success messaging.
- Added five source-checked Dua entries: leaving home (Sunan Abi Dawud 5095), morning/evening request for pardon and well-being (Sunan Abi Dawud 5074), entering and leaving the mosque (Sahih Muslim 713). Original source links point to the verified Shamela pages.
- Added automated backup/restore helper and library-reference regression tests; included them in the existing GitHub Actions security workflow.
- Service worker cache: amol-zikir-v136.
- Pre-change backups created and exact-content verified for index.html, sw.js, PROJECT-HANDOVER.md, package.json, local-account, DOM-security, Firestore rules tests, and workflow under `backup/*-2026-11-24-before-three-track-upgrade.bak`.
- Verification: JavaScript syntax and automated CI results must be checked after commit. Android-device restore and account-switch tests remain user-side checks. The Dua additions are not a substitute for scholarly review of translation/pronunciation.


## v137 — প্রকল্পের অবস্থা ও পরবর্তী অগ্রাধিকার হালনাগাদ (2026-11-24)
- v136-এর release, cache version, সর্বশেষ file SHAs এবং GitHub Actions success run IDs নথিতে হালনাগাদ করা হয়েছে।
- পুরোনো v120 status ও v118-কেন্দ্রিক next-step তালিকা সরিয়ে বাস্তব pending কাজগুলো সাজানো হয়েছে: Android backup/restore, account isolation, offline/online sync, app lock, live Firestore rules confirmation, Hijri/দোয়া যাচাই এবং feature regression.
- এটি documentation-only maintenance; app runtime code বা service-worker cache পরিবর্তন করা হয়নি।
- Pre-change exact backup: `backup/PROJECT-HANDOVER.md-2026-11-24-before-v137-project-status-refresh.bak`.


## v138 — Guest database restore persistence fix (2026-11-24)
- Root cause addressed: when Firebase auth initialization timed out, offline fallback could write into the legacy AmolZikirLocal database; when auth later resolved to signed-out, the app switched to AmolZikirLocalGuest without carrying over those unowned legacy records. This could make a just-restored backup appear briefly and then disappear after refresh.
- When signed-out auth state is confirmed and no original account owner UID is recorded, selectLocalDatabase(null) now merges legacy records into the Guest DB using the existing timestamp/deletion-aware merge, then reads back and verifies the complete merged result. The legacy DB is left intact. If an original account owner UID exists, no legacy-to-guest copy occurs, preserving account separation.
- Added regression tests for delayed auth/fallback restore migration and for preventing an identified account owner's legacy records from entering Guest DB.
- GitHub Actions workflow now runs the regression suite when index.html or sw.js changes.
- Service worker cache: amol-zikir-v138.
- Pre-change exact backups: backup/index.html-2026-11-24-before-v137-guest-migration-fix.bak, backup/sw.js-2026-11-24-before-v137-guest-migration-fix.bak, backup/tests-local-account-partition-2026-11-24-before-v137-guest-migration-fix.bak, backup/PROJECT-HANDOVER-2026-11-24-before-v137-guest-migration-fix.bak, backup/firestore-rules-2026-11-24-before-v137-guest-migration-fix.bak.
- Verification status at edit time: CI, deployment, JS syntax, and live Android restore must be checked after commit; do not claim phone-side success until the user retests.


## v139 — read-only local storage diagnostics (2026-11-24)
- Added a Settings button: “নিরাপদ ডেটা পরীক্ষা”.
- The diagnostic reads the existing IndexedDB database list and counts records in the legacy, guest, and recorded-owner account databases. It reports active database name, whether a local cloud-owner marker exists, and signed-in state.
- It does not import, export, write, delete, migrate, or switch databases. It uses IndexedDB database enumeration before opening existing databases and reads records through readonly transactions. If database enumeration is unavailable, it reports that limitation without opening/creating databases.
- This is a diagnostic aid, not a repair or restore operation. Deleted/tombstoned records may be included in counts.
- User should only run it in the Incognito session used for the backup test; do not run Restore again. Report the complete displayed result before any further change.
- Pre-change backups (exact source content verified): `backup/index.html-2026-11-24-before-readonly-storage-diagnostics.bak`, `backup/sw.js-2026-11-24-before-readonly-storage-diagnostics.bak`, `backup/PROJECT-HANDOVER.md-2026-11-24-before-readonly-storage-diagnostics.bak`.
- Runtime cache bumped to `amol-zikir-v139`.


## v140 — read-only Guest record listing (2026-11-24)
- Added a Settings action to list Guest IndexedDB record types and titles only, without showing note bodies.
- The action uses the existing database enumeration/read-only `getAll()` path; it performs no writes, deletes, migrations, restore, or database switching. Deleted/tombstoned records may appear and are labelled when `deletedAt` is present.
- Service worker cache marker bumped to `amol-zikir-v140`.
- Backups created before this change: `backup/index.html-2026-11-24-before-guest-record-list.bak`, `backup/sw.js-2026-11-24-before-guest-record-list.bak`, `backup/PROJECT-HANDOVER.md-2026-11-24-before-guest-record-list.bak`.

 
## v141 — সব লোকাল ডেটাবেসের read-only recovery export (2026-11-24)
- Settings-এ নতুন “সব পুরোনো ডেটাবেসের নিরাপদ কপি” action যোগ হয়েছে।
- এটি একই browser profile-এর বিদ্যমান `AmolZikirLocal`, `AmolZikirLocalGuest`, এবং `AmolZikirLocalAccount_*` IndexedDB database enumerate করে; প্রতিটির `items` store read-only `getAll()` দিয়ে পড়ে।
- Export JSON-এ সব রেকর্ডের সম্পূর্ণ content (নোটের body-সহ), deleted markers, database name ও count থাকে; এটি কেবল ডাউনলোড হয়, কোনো network upload করে না। ব্যবহারকারী নিজে শেয়ার না করলে নোটের লেখা ChatGPT-তে যায় না।
- Export path-এ কোনো IndexedDB write/delete/migration/restore/database switching নেই। এটি মূলত normal Chrome profile থেকে legacy/original records উদ্ধার করার জন্য; Incognito profile-এ চালালে শুধু Incognito-র database-ই পাওয়া যাবে।
- v141 cache: `amol-zikir-v141`.
- Pre-change exact backups: `backup/index.html-2026-11-24-before-all-local-db-recovery-export-v141.bak`, `backup/sw.js-2026-11-24-before-all-local-db-recovery-export-v141.bak`, `backup/PROJECT-HANDOVER.md-2026-11-24-before-all-local-db-recovery-export-v141.bak`.
- Phone-side export/download and actual note recovery are pending user confirmation; no claim of recovered notes yet.

### v142 — শুধু-পড়া Firestore recovery export (২৫ নভেম্বর ২০২৬)
- Settings → ব্যাকআপ ও পুনরুদ্ধারে `☁️ Firestore ক্লাউডের নিরাপদ কপি` যোগ করা হয়েছে।
- কেবল লগইন করা ব্যবহারকারীর `users/{uid}/items` সংগ্রহে `.get()` চালায়; কোনো Firestore write/delete, local write, Sync বা Restore করে না।
- অ্যাকাউন্ট বদল ধরা পড়লে export বাতিল করে; offline বা sign-out অবস্থায় কাজ করে না।
- JSON-এ সব Firestore item record থাকে; ব্যক্তিগত নোট থাকতে পারে, তাই ফাইল গোপন রাখতে হবে।
- v141-এর `index.html` ও `sw.js` ব্যাকআপ `backups/`-এ সংরক্ষিত।
- ফোনে বাস্তব export ও ফাইল যাচাই ব্যবহারকারীর নিশ্চিতকরণের অপেক্ষায়।


## v143 — ব্যাকআপ পুনরুদ্ধারে মুছে-ফেলার সময়ের সুরক্ষা (২৫ নভেম্বর ২০২৬)
- Backup import merge এখন updatedAt ও deletedAt—দুটির সর্বোচ্চ timestamp তুলনা করে।
- একই timestamp হলে deleted tombstone-কে active record-এর ওপর অগ্রাধিকার দেয়; পুরোনো active backup দিয়ে deleted note পুনরুজ্জীবিত হওয়ার ঝুঁকি কমায়।
- Backup regression tests-এ timestamp ordering ও tombstone tie-break কভার করা হয়েছে; pull request workflow-তেও backup tests যুক্ত।
- Service worker cache: amol-zikir-v143.
- পরিবর্তনের আগে index.html, sw.js, tests/backup-restore.test.js, workflow এবং এই handover-এর exact backup `backup/*-2026-11-25-before-v143-backup-merge-safety.bak` নামে রাখা হয়েছে।
- কোনো ব্যবহারকারীর local বা Firestore data পড়া/লেখা/মোছা হয়নি। ফোনে live regression এখনো চালানো হয়নি।


## v154 — IndexedDB write-commit confirmation (২৫ নভেম্বর ২০২৬)
- Root cause: the single-record `putItem` and `delLocal` helpers resolved when an individual IndexedDB request succeeded, before the enclosing read-write transaction had necessarily committed. Callers could therefore report a local save/delete as successful before transaction completion.
- Both helpers now resolve only on transaction `complete` and reject on transaction error/abort (or synchronous setup failure). This aligns their success signal with transaction completion; batch and migration helpers already used transaction completion.
- Added focused regression tests proving the promise remains pending until transaction completion and rejects on abort.
- Service worker cache: `amol-zikir-v154`.
- Exact pre-change backups: `backup/index.html-2026-11-25-before-v154-indexeddb-commit-safety.bak`, `backup/sw.js-2026-11-25-before-v154-indexeddb-commit-safety.bak`, `backup/PROJECT-HANDOVER.md-2026-11-25-before-v154-indexeddb-commit-safety.bak`, `backup/package.json-2026-11-25-before-v154-indexeddb-commit-safety.bak`, and `backup/.github-workflows-firestore-rules.yml-2026-11-25-before-v154-indexeddb-commit-safety.bak`.
- This improves local transaction success reporting; it does not by itself prove offline-to-cloud sync or phone-side behavior. CI and Pages must pass before calling the release complete.


## v155 — Daily Amal ও তাসবিহ Cloud retry safety (২৫ নভেম্বর ২০২৬)
- Direct Firestore write ব্যর্থ হলে Daily Amal ও তাসবিহের local IndexedDB record অক্ষত থাকে; এখন shared exponential-backoff scheduler দিয়ে full conflict-safe `syncCloud()` retry queue করা হয়।
- একই সময়ে একাধিক failure হলে duplicate timer তৈরি হয় না; offline/sign-out অবস্থায় timer নয়—বিদ্যমান online event reconnect হলে Sync চালায়।
- Existing `syncCloud()` error retry-ও একই scheduler ব্যবহার করে; backoff সর্বোচ্চ পাঁচ মিনিট, successful sync-এ আগের মতো reset।
- Added `tests/cloud-sync-retry.test.js` for retry scheduling, timer de-duplication, offline/sign-out behavior and backoff cap. Existing Daily Amal/Tasbih tests now stub the scheduler.
- Service worker cache: `amol-zikir-v155`.
- Exact pre-change backups: `backup/index-html-2026-11-25-before-v155-cloud-retry.bak`, `backup/sw-js-2026-11-25-before-v155-cloud-retry.bak`, `backup/package-json-2026-11-25-before-v155-cloud-retry.bak`, `backup/workflow-2026-11-25-before-v155-cloud-retry.bak`, `backup/PROJECT-HANDOVER-2026-11-25-before-v155-cloud-retry.bak`, `backup/tests-daily-amal-save-2026-11-25-before-v155-cloud-retry.bak`, and `backup/tests-tasbih-save-2026-11-25-before-v155-cloud-retry.bak`.
- CI and Pages verification required before release completion. This change does not perform any user-data restore, deletion, or migration.


## v156 — Daily Amal ও তাসবিহ লোড/Cloud seed নিরাপত্তা (২৫ নভেম্বর ২০২৬)
- Daily Amal loader এখন নতুন Cloud record-কে active করার আগে IndexedDB-তে সফলভাবে লিখে; write ব্যর্থ হলে পুরোনো local record-ই active থাকে এবং shared Cloud retry schedule হয়।
- Daily Amal বা তাসবিহের Cloud read ব্যর্থ এবং local record অনুপস্থিত থাকলে আর নতুন খালি/শূন্য record তৈরি হয় না; এতে অজানা remote data overwrite হওয়ার ঝুঁকি কমে।
- Daily Amal ও তাসবিহের initial Cloud seed এবং local-only record-এর Cloud seed ব্যর্থ হলে shared exponential-backoff retry schedule হয়।
- Loader failure হলে সংশ্লিষ্ট panel খোলা হয় না; Daily Amal add/reminder flow-তেও record অনুপস্থিত থাকলে নিরাপদে থামে।
- Added `tests/system-tracker-load-safety.test.js` for remote-to-local write failure, Cloud read failure, and Cloud seed retry behavior.
- Service worker cache: `amol-zikir-v156`.
- Exact pre-change backups: `backup/index-html-2026-11-25-before-v156-tracker-load-safety.bak`, `backup/sw-js-2026-11-25-before-v156-tracker-load-safety.bak`, `backup/package-json-2026-11-25-before-v156-tracker-load-safety.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v156-tracker-load-safety.bak`, `backup/tests-daily-amal-save-safety-test-js-2026-11-25-before-v156-tracker-load-safety.bak`, `backup/tests-tasbih-save-safety-test-js-2026-11-25-before-v156-tracker-load-safety.bak`, and `backup/PROJECT-HANDOVER-md-2026-11-25-before-v156-tracker-load-safety.bak`.
- CI and Pages verification required before release completion; Android phone-side behavior remains unverified until the user tests it.



## v157 — কিবোর্ড ফোকাস দৃশ্যমানতা (২৫ নভেম্বর ২০২৬)
- অ্যাপের সব সাধারণ interactive control—button, link, input, select, textarea ও tabindex element—কিবোর্ডে focus হলে স্পষ্ট ৩px gold outline এবং ৩px offset দেখায়।
- বিদ্যমান component-specific focus styles অক্ষত; touch interaction বা data behavior পরিবর্তন করা হয়নি।
- Added `tests/keyboard-focus-accessibility.test.js` and `npm run test:keyboard-focus`; GitHub Actions workflow now runs this regression test.
- Service worker cache: `amol-zikir-v157`.
- Exact pre-change backups: `backup/index-html-2026-11-25-before-v157-keyboard-focus.bak`, `backup/sw-js-2026-11-25-before-v157-keyboard-focus.bak`, `backup/package-json-2026-11-25-before-v157-keyboard-focus.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v157-keyboard-focus.bak`, and `backup/PROJECT-HANDOVER-md-2026-11-25-before-v157-keyboard-focus.bak`.
- CI, Pages, JavaScript syntax and live Android behavior must be verified before calling this release complete.



## v158 — মোবাইল টাচ-বাটনের ব্যবহারযোগ্যতা (২৫ নভেম্বর ২০২৬)
- দৈনিক আমলের তারিখ নেভিগেশন, সংখ্যা বাড়ানো, সাজানো, সম্পাদনা ও বাদ দেওয়ার বোতামগুলোর touch target কমপক্ষে 44×44px করা হয়েছে; ছোট স্ক্রিনের আগের সংকীর্ণ override-ও অতিক্রম করে।
- তাসবিহের phrase tools এবং কুরআন ট্র্যাকারের entry action বোতামের touch height কমপক্ষে 44px করা হয়েছে।
- পরিবর্তনটি কেবল CSS presentation; কোনো record, sync, backup বা restore logic পরিবর্তন করা হয়নি।
- Added `tests/mobile-touch-targets.test.js` and `npm run test:touch-targets`; GitHub Actions runs the regression test.
- Service worker cache: `amol-zikir-v158`.
- Exact pre-change backups: `backup/index-html-2026-11-25-before-v158-mobile-touch-targets.bak`, `backup/sw-js-2026-11-25-before-v158-mobile-touch-targets.bak`, `backup/package-json-2026-11-25-before-v158-mobile-touch-targets.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v158-mobile-touch-targets.bak`, and `backup/PROJECT-HANDOVER-md-2026-11-25-before-v158-mobile-touch-targets.bak`.
- CI, Pages, and phone-side visual behavior must be verified before calling this release complete.


## v159 — মোবাইল safe-area সুরক্ষা (২৫ নভেম্বর ২০২৬)
- ভাসমান নতুন নোট বাটন ডিভাইসের নিচের ও ডান পাশের safe-area inset মেনে চলে; নেভিগেশন/জেসচার এলাকার ওপর পড়ার ঝুঁকি কমায়।
- Toast বার্তা এবং মূল কনটেন্টের নিচের ফাঁকা জায়গাও bottom safe-area অনুযায়ী সমন্বিত।
- Added safe-area regression assertions to `tests/mobile-touch-targets.test.js` and `npm run test:safe-area`; GitHub Actions runs this check.
- Service worker cache: `amol-zikir-v159`.
- Exact pre-change backups: `backup/index-html-2026-11-25-before-v159-safe-area.bak`, `backup/sw-js-2026-11-25-before-v159-safe-area.bak`, `backup/tests-mobile-touch-targets-test-js-2026-11-25-before-v159-safe-area.bak`, `backup/package-json-2026-11-25-before-v159-safe-area.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v159-safe-area.bak`, and `backup/PROJECT-HANDOVER-md-2026-11-25-before-v159-safe-area.bak`.
- CI, Pages, and physical Android behavior must be verified before calling this release complete.


## v160 — নোট রিমাইন্ডার সংরক্ষণ নিরাপত্তা (২৫ নভেম্বর ২০২৬)
- নোটের রিমাইন্ডার সংরক্ষণ ও সরানোর সময় এখন আগে candidate record IndexedDB-তে commit হয়; সফল হলে তবেই viewer state বদলায় এবং panel বন্ধ হয়।
- IndexedDB write ব্যর্থ হলে আগের reminder ও viewer state অক্ষত থাকে, panel খোলা থাকে এবং পুনরায় চেষ্টা করার বাংলা বার্তা দেখায়।
- দ্রুত একাধিক tap থেকে duplicate write ঠেকাতে save/clear guard যোগ করা হয়েছে।
- Added `tests/note-reminder-safety.test.js`, `npm run test:note-reminders`, and GitHub Actions coverage.
- Service worker cache: `amol-zikir-v160`.
- Exact pre-change backups (verified): `backup/index-html-2026-11-25-before-v160-note-reminder-safety.bak`, `backup/sw-js-2026-11-25-before-v160-note-reminder-safety.bak`, `backup/package-json-2026-11-25-before-v160-note-reminder-safety.bak`, `backup/workflow-2026-11-25-before-v160-note-reminder-safety.bak`, and `backup/PROJECT-HANDOVER-2026-11-25-before-v160-note-reminder-safety.bak`.
- CI, Pages, JavaScript syntax and Android phone-side behavior must be verified before release completion. No user records were modified by this code change.


## v161 — ফোল্ডার পরিবর্তনের write-failure সুরক্ষা (২৫ নভেম্বর ২০২৬)
- ফোল্ডারের রং/আকার/পিন metadata save-এ duplicate-write guard, candidate-first IndexedDB commit এবং failure message যোগ করা হয়েছে; failure হলে আগের metadata ও selector value থাকে।
- ফোল্ডার reorder batch write ব্যর্থ হলে আগের ক্রম অপরিবর্তিত থাকে; duplicate reorder guard ও retryable message যোগ করা হয়েছে।
- ফোল্ডার move-এ write guard ও failure handling যোগ হয়েছে; commit সফল না হলে menu বন্ধ হয় না, render বা cloud sync হয় না।
- Move করার সময় destination আবার যাচাই হয়: গন্তব্যটি একই tab-এর জীবিত folder হতে হবে এবং নিজের descendant হতে পারবে না; এতে stale menu/invalid target থেকেও cycle প্রতিরোধ হয়।
- Existing folder delete/reorder batch behavior and its tests retained; no duplicate folder deletion implementation was added.
- Extended existing `tests/folder-operations.test.js`; existing `npm run test:folders` and GitHub Actions step cover these regressions. No extra workflow step or duplicate test command was added.
- Service worker cache: `amol-zikir-v161`.
- Exact pre-change backups (verified): `backup/index-html-2026-11-25-before-v161-folder-write-safety.bak`, `backup/sw-js-2026-11-25-before-v161-folder-write-safety.bak`, `backup/tests-folder-operations-2026-11-25-before-v161-folder-write-safety.bak`, `backup/package-json-2026-11-25-before-v161-folder-write-safety.bak`, `backup/workflow-2026-11-25-before-v161-folder-write-safety.bak`, and `backup/PROJECT-HANDOVER-2026-11-25-before-v161-folder-write-safety.bak`.
- CI and Pages must pass before release completion; Android phone-side behavior remains unverified until tested.


## v162 — নোট রিমাইন্ডার সম্পন্ন হওয়ার নিরাপত্তা (২৫ নভেম্বর ২০২৬)
- Due reminder-এর completion flag এখন আগে IndexedDB-তে commit হয়; write ব্যর্থ হলে notification দেখানো হয় না এবং পরবর্তী reminder processing বন্ধ না করে পরের record-এ যায়।
- একাধিক interval/startup call overlap করে একই reminder notification একাধিকবার দেখানো ঠেকাতে `checkReminders`-এ single-run guard যোগ হয়েছে।
- এক বা একাধিক reminder সফলভাবে local commit হলে batch শেষে `syncCloud()` একবার চলে; ফলে `reminderDone` অবস্থা account cloud data-তেও পৌঁছায়।
- Existing `tests/note-reminder-safety.test.js`-এ overlap guard, failed-write isolation এবং post-commit Cloud sync assertions যোগ হয়েছে; বিদ্যমান npm script ও CI step-ই ব্যবহার করা হয়েছে, duplicate workflow step যোগ হয়নি।
- Service worker cache: `amol-zikir-v162`.
- Exact pre-change backups (verified): `backup/index-html-2026-11-25-before-v162-reminder-completion-safety.bak`, `backup/sw-js-2026-11-25-before-v162-reminder-completion-safety.bak`, `backup/tests-note-reminder-safety-2026-11-25-before-v162-reminder-completion-safety.bak`, `backup/PROJECT-HANDOVER-2026-11-25-before-v162-reminder-completion-safety.bak`.
- CI, Pages, JavaScript syntax and Android reminder notification behavior must pass/be checked before declaring full completion.


## v163 — Firestore Rules anonymous-write regression coverage (২৫ নভেম্বর ২০২৬)
- Security review-এ checklist-এর signed-out write DENY শর্তটি বিদ্যমান emulator test-এ সরাসরি পরীক্ষা হচ্ছিল না; একই `firestore.rules` ও existing test harness রেখে একটি focused `assertFails(setDoc(...))` test যোগ করা হয়েছে।
- Existing tests already cover signed-out read denial, own-account create/read, cross-account read/write denial, and unrelated collection denial; এগুলো পুনরায় লেখা হয়নি।
- `firestore.rules`, Firebase config, app code এবং service-worker cache অপরিবর্তিত; এটি test-only change।
- Exact pre-change backups (fetched and SHA-verified): `backup/tests-firestore-rules-2026-11-25-before-v163-firestore-anonymous-write-test.bak` and `backup/PROJECT-HANDOVER-2026-11-25-before-v163-firestore-anonymous-write-test.bak`.
- GitHub CI and Pages verification pending. This emulator test does not prove the rules currently deployed in Firebase Console; live deployment status remains unverified.


## v163 — Firestore anonymous-write test coverage (২৫ নভেম্বর ২০২৬)
- `tests/firestore.rules.test.js`-এ signed-out user-এর write denial test যোগ করা হয়েছে; আগের read denial, own-account allow এবং cross-account denial tests বহাল।
- Existing workflow-তেই Emulator test চলেছে; CI run `45644601904` success। App code বদলায়নি; Pages deploy দরকার হয়নি।
- Live Firebase Console rules publish status এখনও আলাদা করে যাচাই করা বাকি।

## v164 — Bangladesh Hijri sunset rollover (২৫ নভেম্বর ২০২৬)
- Hijri day number এখন Dhaka local estimated sunset-এর পরের civil date ধরে গণনা করে; sunset-এর আগে আগের দিনই থাকে। ফলে ১১ নভেম্বর সূর্যাস্তের পর ঘোষিত ১ জমাদিউস সানি শুরু এবং ২৫ নভেম্বর সূর্যাস্তের পর ১৫ তারিখ দেখানোর নিয়ম।
- Sunset estimate: Dhaka (23.8103°N, 90.4125°E); অন্যান্য বাংলাদেশি এলাকার Maghrib time-এ কয়েক মিনিট পার্থক্য হতে পারে। UI note-এ এই সীমা জানানো হয়েছে।
- Source date: Bangladesh National Moon Sighting Committee announcement reported by BSS: ১২ নভেম্বর ২০২৬ থেকে জমাদিউস সানি ১৪৪৮ শুরু।
- Added `tests/hijri-calendar-sunset.test.js` with pre-/post-sunset, month-eve rollover and leap-day checks; npm script `test:hijri-calendar` and CI step added.
- Service worker cache: `amol-zikir-v164`.
- Pre-change exact backups: `backup/index-html-2026-11-25-before-hijri-sunset-fix.bak`, `backup/sw-js-2026-11-25-before-hijri-sunset-fix.bak`, `backup/package-json-2026-11-25-before-hijri-sunset-fix.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-hijri-sunset-fix.bak`, `backup/PROJECT-HANDOVER-md-2026-11-25-before-hijri-sunset-fix.bak`.
- CI, Pages এবং Android বাস্তব আচরণ যাচাই pending।


## v165 — Sylhet-local Maghrib/Hijri rollover adjustment (২৫ নভেম্বর ২০২৬)
- ব্যবহারকারীর স্পষ্ট চাহিদা: সূর্যাস্ত/মাগরিবের পর Hijri date এক দিন এগোবে (যেমন দিনের ১৪ তারিখ মাগরিবের পর ১৫)।
- v164-এর sunset-based rollover রাখা হয়েছে; বর্তমান estimated location Sylhet হওয়ায় coordinates Sylhet (24.8949°N, 91.8687°E) করা হয়েছে। sunset-এর আগে civil date, sunset থেকে পরের Hijri date।
- UI note-এ ঢাকার বদলে সিলেটের আনুমানিক সূর্যাস্ত উল্লেখ করা হয়েছে। coordinates approximate; ব্যবহারকারীর নির্দিষ্ট এলাকার Maghrib-এর সঙ্গে কয়েক মিনিট পার্থক্য হতে পারে।
- Updated `tests/hijri-calendar-sunset.test.js` thresholds for Sylhet (Nov 11 approx 17:07, Nov 25 approx 17:04 local).
- Service worker cache marker: `amol-zikir-v165`.
- Exact pre-v165 backups: `backup/index-html-2026-11-25-before-sylhet-sunset-adjustment.bak`, `backup/sw-js-2026-11-25-before-sylhet-sunset-adjustment.bak`, `backup/tests-hijri-calendar-sunset-test-js-2026-11-25-before-sylhet-sunset-adjustment.bak`, `backup/package-json-2026-11-25-before-sylhet-sunset-adjustment.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-sylhet-sunset-adjustment.bak`, `backup/PROJECT-HANDOVER-md-2026-11-25-before-sylhet-sunset-adjustment.bak`.
- CI run `45647574125` and Pages run `45647617317` succeeded on v165; Android live display verification remains pending.


## v166 — লোকেশন-ভিত্তিক যাতায়াতের রুট (২৫ নভেম্বর ২০২৬)
- প্রধান মেনুতে “যাতায়াতের রুট” যোগ হয়েছে; ব্যবহারকারী শুরুর স্থান ও গন্তব্য লিখে রুট চাইতে পারবেন।
- Browser Geolocation API দিয়ে বোতাম চাপলে বর্তমান GPS coordinates নেওয়া হয়; অনুমতি না দিলে/লোকেশন না পেলে ম্যানুয়াল শুরুর স্থান ব্যবহার করা যায়। GPS অনুমতি স্বয়ংক্রিয়ভাবে চাওয়া হয় না।
- গাড়ি (driving), হাঁটা (walking), গণপরিবহন (transit) নির্বাচন করে Google Maps Directions URL খোলে; কোনো Google Maps API key বা paid API দরকার হয় না।
- লোকেশন বা যাত্রার তথ্য অ্যাপ/Firestore-এ সংরক্ষণ করা হয় না; শুধু ব্যবহারকারীর click-এ Google Maps-এ পাঠানো হয়। GPS accuracy ডিভাইস ও পরিবেশভেদে বদলায়।
- Added `tests/directions-navigation.test.js`, `npm run test:directions`, and one GitHub Actions test step/path filter.
- Service worker cache marker: `amol-zikir-v166`.
- Process note: v166 source changes were committed without verified pre-change backups; the earlier backup claim was inaccurate and is corrected here. No app user data was changed by that source-edit process. Do not treat current files as pre-v166 backups.
- CI run `45648987518` succeeded and Pages run `45658937133` succeeded on the subsequent handover commit containing v166. Android phone-side GPS/Google Maps handoff remains unverified.

## v167 — ঘুমানোর দোয়ার হাদিস-সূত্র সংশোধন (২৫ নভেম্বর ২০২৬)
- দোয়া লাইব্রেরির ঘুমানোর দোয়ার সূত্রে ভুল হাদিস নম্বর (৫৯৫৫) এবং ভুল Shamela page URL (9552) ছিল।
- সহিহ বুখারি, তাহকিক আল-বুগা, খণ্ড ৫, পৃষ্ঠা ২৩৩০-এর মূল পৃষ্ঠা পড়ে সঠিক নম্বর ৫৯৬৫ এবং page URL 9569 নিশ্চিত করা হয়েছে: https://shamela.ws/book/735/9569 । একই পৃষ্ঠায় ঘুমানোর ও জাগার দোয়া উভয়ই রয়েছে।
- `index.html`-এ শুধু ওই দোয়ার source ও URL সংশোধন করা হয়েছে; আরবি, উচ্চারণ, অর্থ এবং অন্য দোয়া অপরিবর্তিত।
- Exact pre-change snapshots created and fetched back byte-for-byte before editing: `backup/index-html-2026-11-25-before-v167-dua-source-correction.bak` and `backup/PROJECT-HANDOVER-2026-11-25-before-v167-dua-source-correction.bak`.
- Source commit: `5995e1ddfa392fa41b7b0e1a9c5e42142fd39821`.
- CI run `45658863413` and Pages run `45658937133` succeeded; v167 source and v166 route planner are included in the successful Pages deployment. Android live behavior remains unverified.


## v168 — PWA install icon ও ইনস্টলযোগ্যতার উন্নতি (২৫ নভেম্বর ২০২৬)
- Manifest-এ scalable standard SVG icon ও maskable SVG icon যুক্ত হয়েছে; Android home-screen/app launcher-এ অ্যাপের নিজস্ব পরিচিতি দেখানোর জন্য।
- `index.html`-এ SVG favicon link যুক্ত হয়েছে; manifest-এর description-ও হালনাগাদ।
- Service worker cache version `amol-zikir-v168`; দুই icon app-shell precache-এ যোগ হয়েছে, ফলে offline shell-এর সঙ্গে icon-ও cache হয়।
- Added `tests/pwa-installability.test.js` and `npm run test:pwa-installability`; GitHub Actions push/PR path filters and test step updated.
- Exact pre-change backups fetched back and verified byte-for-byte: `backup/manifest-webmanifest-2026-11-25-before-v168-pwa-icons.bak`, `backup/index-html-2026-11-25-before-v168-pwa-icons.bak`, `backup/sw-js-2026-11-25-before-v168-pwa-icons.bak`, `backup/package-json-2026-11-25-before-v168-pwa-icons.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v168-pwa-icons.bak`, and `backup/PROJECT-HANDOVER-md-2026-11-25-before-v168-pwa-icons.bak`.
- No app user data, Firestore records, or authentication settings were changed. CI/Pages and Android installation behavior must be verified before calling this release complete.


## v169 — ব্যবহারকারী-নিয়ন্ত্রিত PWA আপডেট নোটিশ (২৫ নভেম্বর ২০২৬)
- নতুন Service Worker সংস্করণ পাওয়া গেলে অ্যাপের নিচে অ্যাক্সেসিবল আপডেট নোটিশ ও “এখনই আপডেট” বোতাম দেখায়; ব্যবহারকারীর click ছাড়া নতুন worker activate বা পৃষ্ঠা reload হয় না।
- Service worker-এর install-এ স্বয়ংক্রিয় `skipWaiting()` সরানো হয়েছে; `SKIP_WAITING` message পেলে তবেই waiting worker activate হয়। Activation-এর পর `controllerchange` একবার পৃষ্ঠা reload করে, যাতে নতুন app shell লোড হয়।
- একাধিক registration call-কে একটি shared promise দিয়ে deduplicate করা হয়েছে; browser focus হলে update check হয়।
- Cache marker: `amol-zikir-v169`। Added `tests/pwa-update-notice.test.js`, `npm run test:pwa-updates`, এবং GitHub Actions test step।
- Exact pre-change backups fetched back and verified byte-for-byte: `backup/index-html-2026-11-25-before-v169-update-notice.bak`, `backup/sw-js-2026-11-25-before-v169-update-notice.bak`, `backup/package-json-2026-11-25-before-v169-update-notice.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v169-update-notice.bak`, and `backup/PROJECT-HANDOVER-md-2026-11-25-before-v169-update-notice.bak`.
- Initial CI run `45663299238` failed only because the existing PWA installability test still expected cache `v168`; that assertion was updated to `v169` after an exact backup (`backup/tests-pwa-installability-test-js-2026-11-25-before-v169-cache-assertion.bak`). Final CI run `45663722433` and Pages run `45663722250` both succeeded on commit `f5ef833021dd4bd14a6be3e3dbf577bd717ba423`. Android update-notice behavior remains unverified.


## v170 — দোয়ার মূল সূত্রের পৃষ্ঠা-লিংক সংশোধন (২৫ নভেম্বর ২০২৬)
- Shamela মূল পাঠে আটটি অ্যাপ-দোয়ার রেফারেন্স/আরবি মিলিয়ে দেখা হয়েছে; আগেই যাচাইকৃত ছয়টির পুনরাবৃত্তি পরিবর্তন করা হয়নি। দুটি পৃষ্ঠা-লিংক ভুল ছিল, হাদিস নম্বর ঠিক ছিল:
  - বাড়ি থেকে বের হওয়ার দোয়া: সুনান আবি দাউদ ৫০৯৫ — সঠিক পৃষ্ঠা `https://shamela.ws/book/1726/6957` (আগের লিংক 6958 ছিল পরের অধ্যায়ের পৃষ্ঠা)।
  - সকাল-সন্ধ্যার আফিয়াহ দোয়া: সুনান আবি দাউদ ৫০৭৪ — সঠিক পৃষ্ঠা `https://shamela.ws/book/1726/6934` (আগের লিংক 6935 ছিল হাদিস ৫০৭৫)।
- সংশোধিত লিংক দুটির জন্য `tests/dua-source-links.test.js` ও `npm run test:dua-sources` যোগ করা হয়েছে; workflow push/PR path ও test step যুক্ত। বিদ্যমান `tests/backup-restore.test.js`-এ পুরোনো ভুল URL assertion-ও সঠিক পৃষ্ঠায় আপডেট করা হয়েছে।
- Exact pre-change backups verified byte-for-byte: `backup/index-html-2026-11-25-before-v170-dua-source-links.bak`, `backup/package-json-2026-11-25-before-v170-dua-source-links.bak`, `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v170-dua-source-links.bak`, `backup/PROJECT-HANDOVER-md-2026-11-25-before-v170-dua-source-links.bak`, `backup/tests-backup-restore-test-js-2026-11-25-before-v170-dua-source-assertion.bak`.
- Pages deploy run `45665115733` succeeded and final CI run `45665115279` completed successfully on commit `685cc0a826d1535edf05aa26d4b08000b0de5`. Focused link assertions passed. v170 code, CI and Pages publication are complete. Android phone-side display/links remain unverified. No user data or Firebase data changed.

 
## v171 — প্রতিদিনের হাদিসের ৩ দিনের ঘূর্ণায়মান সংগ্রহ (২৫ নভেম্বর ২০২৬)
- আগের একটিমাত্র স্থির হাদিস বাদ না দিয়ে সেটিসহ মোট তিনটি হাদিস স্থানীয় তারিখ অনুযায়ী দৈনিক ঘুরে দেখানোর ব্যবস্থা যোগ করা হয়েছে; একই দিনে একই হাদিস স্থির থাকে, পরের দিনে পরবর্তীটি আসে।
- মূল পাঠ ও নম্বর মূল পৃষ্ঠায় যাচাই করা হয়েছে:
  - সহিহ বুখারি ৪৭৩৯ — https://shamela.ws/book/735/7589
  - সহিহ বুখারি ১৩ — https://shamela.ws/book/735/33
  - সহিহ বুখারি ১০ — https://shamela.ws/book/735/27
- প্রতিটির বাংলা অর্থ, সংক্ষিপ্ত শিক্ষা ও মূল Shamela পৃষ্ঠা-লিংক যোগ হয়েছে; ব্যবহারকারী ডেটা/Firestore পরিবর্তিত হয়নি।
- Added `tests/daily-hadith.test.js`, `npm run test:daily-hadith`, and CI push/PR coverage. Existing PWA install/update assertions updated to cache marker `amol-zikir-v171`.
- Exact pre-change backups verified by matching Git blob SHA with the original source:
  - `backup/index-html-2026-11-25-before-v171-daily-hadith-rotation.bak` — `42e09e11a2ba3e39d2e0e436e8254e865907a951`
  - `backup/sw-js-2026-11-25-before-v171-daily-hadith-rotation.bak` — `59aff24547973169bfaa34cf25b58e5ec38593f6`
  - `backup/package-json-2026-11-25-before-v171-daily-hadith-rotation.bak` — `2899cf1d9d81237edcefe76a9300c6cb6edca91d`
  - `backup/workflow-2026-11-25-before-v171-daily-hadith-rotation.bak` — `c55ec0499eaff715c57054d03edb4e20796bdcbb`
  - `backup/tests-pwa-update-notice-2026-11-25-before-v171-daily-hadith-rotation.bak` — `f24ebb899dd0fb289f2bb9ed02846c7bca0faca4`
  - `backup/tests-pwa-installability-2026-11-25-before-v171-daily-hadith-rotation.bak` — `37d2436228ccac7c95a505bca89d9d9584d4c2fe`
  - `backup/PROJECT-HANDOVER-2026-11-25-before-v171-daily-hadith-rotation.bak` — `05f44954f7598e11c3aae9f444bfbf220ca9f2b3`
- Final candidate commit: `cfee5d505ed716fbabf63219066aa52a49ce2640`. CI run `45667421683` and Pages run `45667421858` were still running at this handover update; do not call v171 complete until both succeed. Earlier in-flight runs from sequential commits were cancelled/superseded. Android display remains unverified.


## v171 — প্রথম দৈনিক হাদিস-ঘূর্ণন (২৫ নভেম্বর ২০২৬) — প্রকাশিত
- তিনটি যাচাইকৃত হাদিস স্থানীয় তারিখ অনুযায়ী দৈনিক ঘুরিয়ে দেখানোর প্রথম সংস্করণ। প্রতিদিনের সূচি স্থির ছিল, তবে সংগ্রহটি মাত্র তিনটি হওয়ায় দীর্ঘমেয়াদি পুনরাবৃত্তিহীন ব্যবস্থা ছিল না।
- CI run `45667421683` এবং Pages run `45667421858` উভয়ই সফল; পরবর্তী Pages run `45667535081`-ও সফল। v171 প্রকাশিত, Android-এ সরাসরি প্রদর্শন এখনো ব্যবহারকারী পরীক্ষা করেননি।

## v172 — বড় দৈনিক হাদিস সংগ্রহ ও পুনরাবৃত্তিহীন অগ্রগতি (২৫ নভেম্বর ২০২৬) — CI/Pages যাচাই বাকি
- দৈনিক সংগ্রহ ৩ থেকে ৯টি করা হয়েছে। ছয়টি নতুন হাদিসের মূল আরবি পাঠ ও নম্বর Dalail-এ সহিহ বুখারি/মুসলিমের নির্দিষ্ট পৃষ্ঠা খুলে যাচাই করা হয়েছে:
  - সহিহ মুসলিম ৫৫ — `https://shamela.ws/book/711/206`
  - সহিহ বুখারি ৫৬৫১ — `https://shamela.ws/book/735/9073`
  - সহিহ মুসলিম ৪৬ — `https://shamela.ws/book/711/178`
  - সহিহ মুসলিম ২৫৮০ — `https://shamela.ws/book/711/7858`
  - সহিহ মুসলিম ৭৮৩ — `https://shamela.ws/book/711/2142`
  - সহিহ বুখারি ৬৯ — `https://shamela.ws/book/735/136`
- বাংলা লেখা সহজ ভাবার্থ; কোনো অনিশ্চিত তৃতীয়-পক্ষ বাংলা অনুবাদ কপি করা হয়নি। UI-তে এই বিষয়টি স্পষ্ট করে “বাংলা অর্থ (সহজ ভাবার্থ)” লেখা হয়েছে।
- দৈনিক সূচি এখন localStorage-এ তারিখ, দেখা হাদিসের সূচি ও পরবর্তী অবস্থান রাখে। একই দিনে একই হাদিস থাকে; সংগ্রহের ৯টি শেষ না হওয়া পর্যন্ত নতুন দিনে পুরোনো হাদিস পুনরায় আসে না; সব শেষ হলে নতুন চক্র শুরু হয়। ইতিহাসটি এই ডিভাইসের ব্রাউজার-স্টোরেজে থাকে; ব্রাউজারের সাইট ডেটা মুছে ফেললে সেই ইতিহাসও মুছে যাবে।
- Service Worker cache marker `amol-zikir-v172`; daily hadith test-এ ৯টি entry, distinct text/source links, same-day stability, no-repeat cycle এবং reset যাচাই যুক্ত হয়েছে। PWA cache assertions-ও v172-তে উন্নীত।
- Exact pre-v172 backups fetched back and SHA-verified:
  - `backup/index-html-2026-11-25-before-v172-daily-hadith-library.bak` — `510b35573942a7770d245c32987fa964f1e871b9`
  - `backup/sw-js-2026-11-25-before-v172-daily-hadith-library.bak` — `3146be2546a4ea4c715f87287b310fad8d32658b`
  - `backup/package-json-2026-11-25-before-v172-daily-hadith-library.bak` — `f426540d967cc2ad9fda4fdc0e5c78a4320e1d9c`
  - `backup/-github-workflows-firestore-rules-yml-2026-11-25-before-v172-daily-hadith-library.bak` — `ab24574132491a108b8312b8f9a3546658a659fa`
  - `backup/tests-daily-hadith-test-js-2026-11-25-before-v172-daily-hadith-library.bak` — `0ce317c93f1d89a4d5c83168649a6258ae548d04`
  - `backup/tests-pwa-installability-test-js-2026-11-25-before-v172-daily-hadith-library.bak` — `6ecfe7eb31f7777d5467ded62eb194a1c828aa88`
  - `backup/tests-pwa-update-notice-test-js-2026-11-25-before-v172-daily-hadith-library.bak` — `1acff8ab800099f7ea187a205def6c891875a187`
  - `backup/PROJECT-HANDOVER-2026-11-25-before-v172-daily-hadith-library.bak` — `9598549a38d4bf69b81cc34ad785e0fa9170a02b`
- No user notes, IndexedDB records, Firestore records, or existing hadith-related user data were changed. Pages deployment run `45669143340` succeeded on handover commit `8c3337136b95376128150f71cc39d1da2817b61c`; the v172 code is now published. CI run `45669078162` is still in progress at dependency installation, so automated tests are not yet confirmed. Android runtime remains unverified.
