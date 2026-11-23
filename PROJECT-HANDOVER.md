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
- App Lock & Privacy ফিচারটি ব্যবহারকারীর নির্বাচিত তালিকায় ছিল; পূর্ণ PIN lock বাস্তবায়ন/যাচাই পরবর্তী কাজের তালিকায় আছে।

## ৪. গুরুত্বপূর্ণ সাম্প্রতিক সংস্করণ ও অবস্থা
- পরিচিত release: v111; service worker cache string: `amol-zikir-v111` (পরবর্তী release-এ বাড়াতে হবে)।
- Backup v2-তে `zikrRoutines` যুক্ত হয়েছে; restore v1/v2 গ্রহণ করে এবং routine merge করে।
- সর্বশেষ যাচাইকৃত GitHub fetch (২৩-১১-২০২৬):
  - `index.html` blob SHA: `88283d77241bc0655bb5daeb1e41beddc4962368`
  - `sw.js` blob SHA: `e198898f6298cce29e121203f406c304ae8b7cf4`
- SHA-গুলো ভবিষ্যতে বদলাবে; এগুলো কেবল এই নথি তৈরির সময়ের রেফারেন্স। প্রতিবার update-এর আগে নতুন করে fetch করতে হবে।
- Backup/restore-এর কোড যাচাই হয়েছে, কিন্তু ব্যবহারকারীর ফোনে backup download ও restore test এখনও ব্যবহারকারী নিশ্চিত করেননি।

## ৫. পরবর্তী কাজের অগ্রাধিকার
1. ব্যবহারকারীকে অ্যাপ থেকে JSON backup download করতে বলুন; ফাইলটি ফোনে আছে কি না নিশ্চিত করুন।
2. নিরাপদভাবে restore test-এর পরিকল্পনা করুন; আসল ডেটা ঝুঁকিতে ফেলা যাবে না। Restore merge করে, তবুও আগে backup থাকা আবশ্যক।
3. Firebase sync, edit/delete ও offline-to-online sync ব্যবহারকারীর সঙ্গে যাচাই করুন।
4. App Lock & Privacy-এর PIN lock বাস্তবায়ন/পরীক্ষা করুন; PIN নিরাপদভাবে সংরক্ষণ ও ভুলে গেলে recovery আচরণ স্পষ্ট করুন।
5. পূর্ণ feature audit: Calendar, Daily Amal, Tasbih, Dua/Dhikr, Quran tracker, Zikr routines।
6. Hijri date-এর হার্ডকোড করা মাস-শুরুর তারিখ ভবিষ্যতে যাচাই করা দরকার; স্থানীয় চাঁদ দেখার পার্থক্য স্পষ্টভাবে দেখাতে হবে। নিশ্চিত সূত্র ছাড়া নির্দিষ্ট হিজরি তারিখকে চূড়ান্ত বলবেন না।

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
