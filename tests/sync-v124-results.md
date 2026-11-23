# Sync v124 — বিচ্ছিন্ন পরীক্ষার ফলাফল

তারিখ: ২৩ নভেম্বর ২০২৬

## ফলাফল
**১৪/১৪ PASS**

| পরীক্ষা | ফল |
|---|---|
| Local নতুন, Cloud পুরোনো | PASS |
| Cloud নতুন, Local পুরোনো | PASS |
| একই timestamp-এ deletion বনাম live record | PASS — deletion জেতে |
| Local deletion বনাম পুরোনো Cloud live record | PASS |
| একই timestamp-এর live record | PASS — অযথা overwrite নয় |
| Cloud deletion বনাম পুরোনো Local live record | PASS |
| Transaction চলাকালে Local edit হলে race guard শনাক্ত করে | PASS |
| keepLocal ফলাফলে Local snapshot বদলালে পুনরায় sync চায় | PASS |
| permission-denied error mapping | PASS |
| unauthenticated error mapping | PASS |
| resource-exhausted error mapping | PASS |
| deadline-exceeded error mapping | PASS |
| Offline বার্তার বাংলা সংশোধন | PASS |
| সম্পূর্ণ inline JavaScript syntax | PASS |

## পরীক্ষার সীমা
- Conflict-resolution branch সরাসরি বর্তমান index.html থেকে extract করে synthetic Local/Cloud record দিয়ে চালানো হয়েছে; অর্থাৎ শুধু আলাদা করে লেখা অনুকরণী logic নয়।
- Error label ও race-guard condition-ও বর্তমান production source থেকে যাচাই করা হয়েছে।
- কোনো Firebase production project, বাস্তব Google account, ব্যবহারকারীর নোট বা ফোনের IndexedDB-তে write/delete করা হয়নি।
- তাই এই ফলাফল code-level isolated verification; real Firebase transaction, multi-device race, offline-to-online sync এবং Android ফোনে UI/device test এখনো বাকি।
