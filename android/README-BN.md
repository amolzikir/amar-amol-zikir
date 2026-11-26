# যিকরা Android APK — প্রস্তুতি

- অ্যাপের নাম: যিকরা (ذِكْرَى)
- Android package ID: `com.zikra.app` (ব্যবহারকারী অনুমোদিত, ২৬-১১-২০২৬)
- PWA origin: `https://amolzikir.github.io`
- PWA path: `/amar-amol-zikir/`
- Build পদ্ধতি: Bubblewrap / Trusted Web Activity (TWA)
- বর্তমান লক্ষ্য: GitHub Actions থেকে installable debug APK তৈরি; এখনো Play Store/release build নয়।

## Build

GitHub Actions-এর **Build Zikra Android debug APK** workflow চালু হলে:
1. Java 17, Node.js 20 ও Android SDK প্রস্তুত হবে।
2. Bubblewrap `android/twa-manifest.json` থেকে Android project তৈরি করবে।
3. Gradle `assembleDebug` চালাবে।
4. `zikra-debug-apk` নামে APK artifact আপলোড হবে।

## গুরুত্বপূর্ণ নিরাপত্তা ও সীমাবদ্ধতা

- Debug APK production release key দিয়ে signed নয়; Gradle-এর ephemeral debug key দিয়ে local testing-এর জন্য তৈরি।
- কোনো keystore/password GitHub repository-তে রাখা হবে না।
- Fullscreen verified TWA চালাতে Digital Asset Links প্রয়োজন। সেটি host root-এ থাকতে হবে: `https://amolzikir.github.io/.well-known/assetlinks.json`। বর্তমান GitHub Pages project site কেবল `/amar-amol-zikir/` path প্রকাশ করে; root-level hosting সমাধান না হওয়া পর্যন্ত Custom Tabs fallback-ই প্রত্যাশিত।
- বর্তমান app icon SVG এখনও পুরোনো artwork; release-এর আগে Zikra-branded PNG/adaptive icons তৈরি করতে হবে।
- Google Sign-in, Firestore, offline behavior ও notifications বাস্তব Android ফোনে পরীক্ষা না হওয়া পর্যন্ত verified বলা যাবে না।
