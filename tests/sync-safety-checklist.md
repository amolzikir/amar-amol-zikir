# নিরাপদ Sync পরীক্ষা (v123)

এই পরীক্ষাগুলো কেবল কৃত্রিম রেকর্ড/দ্বিতীয় পরীক্ষামূলক Firebase project-এ চালাতে হবে। আসল ব্যবহারকারীর নোট, Firestore collection বা production account-এ ইচ্ছাকৃত সংঘর্ষ/মুছে ফেলার পরীক্ষা করা যাবে না।

## পরীক্ষার কেস
1. শুধু Local record: Cloud-এ অনুপস্থিত হলে Local record Cloud-এ উঠবে।
2. শুধু Cloud record: Local-এ অনুপস্থিত হলে Cloud record Local-এ নামবে।
3. নতুন Local edit বনাম পুরোনো Cloud copy: Local edit অক্ষত থাকবে।
4. নতুন Cloud edit বনাম পুরোনো Local copy: Cloud edit নামবে।
5. একই timestamp-এ deletion বনাম live record: deletion জিতবে।
6. Sync চলাকালে Local record আরও নতুন হলে: পুরোনো Cloud copy Local-এ বসবে না; আরেকবার reconciliation হবে।
7. Offline: Cloud request হবে না; Local save স্বাভাবিক থাকবে; UI-তে offline অবস্থা দেখা যাবে।
8. Permission/auth/quota/network error: UI-তে কারণের ধরন দেখাবে; retry exponential backoff-এ সর্বোচ্চ ৫ মিনিট পর্যন্ত বাড়বে।

## নিরাপদে যাচাই
- প্রথমে আলাদা test Firebase project ও আলাদা Google account ব্যবহার করুন।
- synthetic ID যেমন `sync-test-a` ব্যবহার করুন; production user path নয়।
- প্রতিটি কেসের আগে/পরে Local ও Cloud timestamp এবং deletedAt তুলনা করুন।
- পরীক্ষার শেষে শুধু test project-এর test records মুছুন।
- ফোনে বাস্তব ব্যবহার পরীক্ষা আলাদা ধাপ; GitHub deploy বা syntax pass একে প্রমাণ করে না।

## v123 পরিবর্তন
- অ্যাপের header-এ Sync status দেখা যাবে: signed-out, offline, syncing, success বা retry/error।
- পরিচিত Firebase error code অনুযায়ী বাংলা নির্দেশনা দেখাবে; console-এ শুধু code/message diagnostic থাকবে।
- মূল conflict-resolution ও local-first data flow অপরিবর্তিত রাখা হয়েছে।
