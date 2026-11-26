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
- Root-level Digital Asset Links hosting এখন প্রস্তুত: `https://amolzikir.github.io/` user Pages site live এবং deployment সফল (run `45799381952`)। তবে `/.well-known/assetlinks.json` এখনো প্রকাশ করা হয়নি; release signing certificate-এর SHA-256 fingerprint পাওয়ার পরই প্রকাশ করতে হবে। তার আগে Custom Tabs fallback-ই প্রত্যাশিত।
- অনুমোদিত সবুজ-সোনালি কুফিক artwork PWA manifest-এর PNG icon ও SVG compatibility wrapper-এ যুক্ত; Android TWA manifest icon URL-ও PNG। Android launcher-এ ব্যবহারকারীর ফোনে বাস্তব রূপ যাচাই বাকি।
- Google Sign-in, Firestore, offline behavior ও notifications বাস্তব Android ফোনে পরীক্ষা না হওয়া পর্যন্ত verified বলা যাবে না।

## সর্বশেষ যাচাইকৃত অবস্থা — ২৬-১১-২০২৬

- অনুমোদিত সবুজ-সোনালি কুফিক artwork PWA manifest-এ PNG icon এবং SVG compatibility wrapper হিসেবে যুক্ত; GitHub Pages deployment সফল (run `45781113113`)।
- Android Bubblewrap project generation ও Debug APK build সফল (run `45781113240`, artifact ID `15098470990`)। এটি debug build, release-signed নয়।
- PWA ও Firestore/security automated workflow সফল (run `45781113163`)।
- আগের অনুচ্ছেদের পুরোনো আইকন-সংক্রান্ত নোটটি superseded; নতুন artwork repository-তে যুক্ত হয়েছে।
- Root-level Digital Asset Links hosting, release keystore, signed release build এবং বাস্তব Android ফোনে পরীক্ষা এখনো বাকি।


## Root hosting status — ২৬-১১-২০২৬
- User Pages repository `amolzikir/amolzikir.github.io` তৈরি, Pages source `main/(root)` সেট এবং deployment run `45799381952` সফল।
- Root origin: `https://amolzikir.github.io/`; `index.html` ও `.nojekyll` তৈরি এবং fetch করে যাচাই।
- Root hosting প্রস্তুত হলেও assetlinks.json ইচ্ছাকৃতভাবে এখনো তৈরি হয়নি; release keystore থেকে SHA-256 fingerprint পাওয়ার পরই তৈরি হবে।
- Release keystore, signed release APK/AAB এবং real-device QA এখনও বাকি।


## Release signing workflow — ২৬ নভেম্বর ২০২৬
- One-time key-generation workflow run `45804627552`-এ PKCS12 release keystore তৈরি করেছে; artifact ID `15108887761`। নিরাপত্তার জন্য সফল key তৈরির পর runnable workflow সরিয়ে exact backup `backup/android-release-key-yml-2026-11-26-after-key-created.bak`-এ রাখা হয়েছে; এটিকে পুনরায় চালিয়ে নতুন key তৈরি করা যাবে না।
- ব্যবহারকারী ZIP ও `android.keystore` আলাদা করে Google Drive-এ ব্যক্তিগত backup রেখেছেন। Repository-তে private key/password নেই।
- GitHub Actions secret `ZIKRA_KEYSTORE_PASSWORD` সেট করা হয়েছে; secret value কখনো প্রকাশ/লগ করা হয় না।
- `.github/workflows/android-release.yml`-এ signing fingerprint, assetlinks JSON, APK package identity এবং APK/AAB signature verification যুক্ত করা হয়েছে। Workflow update commit `98aa4ece5b5efe42c365710a7431f5f32fcc82a7`।
- পরবর্তী কাজ: Actions → Build Zikra signed Android release চালিয়ে key-creation run ID `45804627552` ইনপুট দিতে হবে। সফল হলে artifact `zikra-signed-release` থেকে APK/AAB ও generated `assetlinks.json` পাওয়া যাবে।
- Fingerprint যাচাই করে root Pages repository `amolzikir/amolzikir.github.io`-এ `.well-known/assetlinks.json` প্রকাশ করতে হবে। তারপর live URL `https://amolzikir.github.io/.well-known/assetlinks.json` HTTP 200 ও সঠিক JSON দিয়ে পরীক্ষা করতে হবে।
- Signed release APK/AAB এখনও তৈরি হয়নি।
