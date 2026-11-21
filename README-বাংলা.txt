আমার আমল ও জিকির — PWA প্যাকেজ

ফাইল:
- index.html: অ্যাপ
- manifest.webmanifest: ফোনে অ্যাপের মতো ইনস্টল
- sw.js: অ্যাপ শেল ও Firebase SDK ক্যাশ করে অফলাইন চালু রাখে
- firestore.rules: ব্যক্তিগত ডেটা সুরক্ষার নিয়ম

গুরুত্বপূর্ণ:
1) Firebase Console > Firestore Database > Rules-এ firestore.rules-এর নিয়ম বসিয়ে Publish করুন।
2) Firebase Authentication-এ Google provider Enabled থাকতে হবে।
3) Firebase Hosting-এ এই তিনটি ফাইল (index.html, manifest.webmanifest, sw.js) ডিপ্লয় করতে হবে।
4) Firebase Authentication > Settings > Authorized domains-এ Hosting domain থাকতে হবে।
5) প্রথমবার অ্যাপ খুলে অনলাইনে Google দিয়ে লগইন করুন। তারপর অ্যাপটি ফোনের Home Screen-এ Add করুন।
6) পরে নেট না থাকলেও আগে থেকে খোলা/ক্যাশ হওয়া অ্যাপের লোকাল নোট-ফোল্ডার ব্যবহার করা যাবে। নেট এলে সিঙ্ক হবে।

ফ্রি ব্যবহারের সতর্কতা:
- Firebase Spark (no-cost) প্ল্যানেই থাকুন; Billing/Blaze-এ আপগ্রেড করবেন না।
- ফ্রি কোটার সীমা আছে; সীমা পেরোলে কিছু ক্লাউড সুবিধা সাময়িক বন্ধ হতে পারে।
- অফলাইনে তৈরি তথ্য প্রথমে এই ফোনেই থাকে; ফোন হারালে/অ্যাপ ডেটা মুছলে সিঙ্ক না হওয়া তথ্য হারাতে পারে।
- Google login প্রথমবার ও ক্লাউড সিঙ্কের জন্য ইন্টারনেট লাগবে।

এই প্যাকেজ একটি প্রাথমিক কার্যকর সংস্করণ। ব্যবহারের আগে নিরাপত্তা নিয়ম ও Hosting সেটআপ সম্পন্ন করুন।
