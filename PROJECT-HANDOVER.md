# আমার আমল ও জিকির — প্রকল্প হস্তান্তর নথি

**সর্বশেষ হালনাগাদ:** ২৩ নভেম্বর ২০২৬  
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
- সর্বশেষ প্রকাশিত release: **v119**; service worker cache string: `amol-zikir-v119`।
- Backup v2-তে `zikrRoutines` যুক্ত হয়েছে; restore v1/v2 গ্রহণ করে এবং routine merge করে।
- সর্বশেষ যাচাইকৃত GitHub fetch (২৩-১১-২০২৬, v118-এর পর):
  - `index.html` blob SHA: `02e65a680308416c40800788b52f144431481d4a` (v118; v119 SHA release log-এ)
  - `sw.js` blob SHA: `ddffd7c7e731db06377b7d4e4ae24017e9ca5d19` (v118; v119 SHA release log-এ)
- SHA-গুলো কেবল এই নথি হালনাগাদের সময়ের রেফারেন্স; প্রতিটি update-এর আগে নতুন করে fetch করতে হবে।
- Backup/restore-এর কোডে JSON export, v1/v2 import, record merge ও zikr routine merge আছে; ব্যবহারকারীর ফোনে download/restore test এখনও নিশ্চিত নয়।

## ৫. পরবর্তী কাজের অগ্রাধিকার
1. **ডেটা-সুরক্ষা অগ্রাধিকার:** v118-এ malformed JSON, record schema, nested unsafe keys, duplicate ID এবং timestamp merge validation শক্ত করা হয়েছে; IndexedDB record writes এক read-write transaction-এ batch করা হয়েছে। পরবর্তী ধাপে backup/restore regression audit ও নিরাপদ test data দিয়ে পরীক্ষা।
2. ব্যবহারকারীর সুবিধামতো JSON backup download হয়েছে কি না নিশ্চিত করা; restore পরীক্ষা কেবল আলাদা/নিরাপদ test data দিয়ে।
3. Firebase sync, edit/delete ও offline-to-online sync-এর conflict ও tombstone আচরণ অডিট; on-device test ছাড়া সফল দাবি নয়।
4. PIN/biometric/১০ মিনিট idle lock এবং lock বন্ধ/পুনরায় চালুর on-device আচরণ ব্যবহারকারীর কাছ থেকে নিশ্চিত করা; UI lock-কে data encryption বলা যাবে না।
5. Calendar, Daily Amal, Tasbih, Dua/Dhikr, Quran tracker ও Zikr routines-এর ধাপে ধাপে regression audit।
6. Hijri date-এর হার্ডকোড করা মাস-শুরুর তারিখ নির্ভরযোগ্য বাংলাদেশি সূত্রে পুনরায় যাচাই; নিশ্চিত সূত্র ছাড়া নির্দিষ্ট তারিখকে চূড়ান্ত বলা যাবে না।

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
