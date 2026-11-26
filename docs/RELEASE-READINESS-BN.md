# যিকরা — চূড়ান্ত প্রকাশ প্রস্তুতি তালিকা

সর্বশেষ হালনাগাদ: ২৬ নভেম্বর ২০২৬  
প্যাকেজ ID: `com.zikra.app`  
ওয়েব অ্যাপ: https://amolzikir.github.io/amar-amol-zikir/

## অগ্রগতির সারাংশ

- [x] অনুমোদিত সবুজ-সোনালি কুফিক artwork PWA icon-এ যুক্ত
- [x] GitHub Pages deployment সফল (run `45781113113`)
- [x] Android Bubblewrap project generation সফল
- [x] Android Debug APK build সফল (run `45781113240`, artifact `15098470990`)
- [x] PWA ও Firestore/security automated workflow সফল (run `45781113163`)
- [ ] Free root-level Digital Asset Links hosting
- [ ] TWA verified fullscreen configuration
- [ ] Release keystore ও নিরাপদ signing secrets
- [ ] Signed Release APK/AAB ও signature verification
- [ ] Android ফোনে বাস্তব install/login/offline/data-preservation test
- [ ] Firebase Console live rules ও auth domain verification
- [ ] Religious content source review
- [ ] Final release audit

## কাজের বাধ্যতামূলক ক্রম

1. **Root hosting:** বিনামূল্যে `https://amolzikir.github.io/.well-known/assetlinks.json` serve করার ব্যবস্থা। বর্তমান project site শুধু `/amar-amol-zikir/` path-এ; `amolzikir.github.io` user Pages repo এখনও নেই।
2. **TWA assets/config:** PNG ও adaptive icon/splash, app name, package ID, start URL, scope, theme color এবং fallback যাচাই।
3. **Release signing:** keystore তৈরি; ব্যবহারকারী নিরাপদে offline backup রাখবেন; GitHub Actions Secrets-এ প্রয়োজনীয় encoded keystore/password রাখা হবে। কখনো repository-তে নয়।
4. **Asset Links:** release certificate-এর SHA-256 fingerprint দিয়ে root `/.well-known/assetlinks.json` প্রকাশ এবং Chrome verification।
5. **Release build:** versionCode/version bump, signed APK/AAB build, package ID ও signature পরীক্ষা।
6. **Device QA:** Android-এ install/update, Google sign-in, Firestore, offline notes, notes preservation, navigation, app lock, reminders ও notifications। Browser/site data clear নয়।
7. **Firebase live config:** Console-এর published Firestore rules, Authentication providers ও authorized domains পরীক্ষা।
8. **Content review:** আয়াত, হাদিস, দোয়া—আরবি, বাংলা উচ্চারণ, অর্থ ও source reference যাচাই।
9. **Final release:** সব check pass, backup, release artifact archive এবং ব্যবহারকারীকে install নির্দেশনা।

## নিরাপত্তা/ডেটা নীতি

- User notes বা IndexedDB মুছবেন না।
- Release signing key/password repository-তে commit করবেন না।
- User device-এ পরীক্ষা না হলে pass দাবি করবেন না।
- Debug APK-কে release APK বলবেন না।
- Free hosting-এর availability/quota পরিবর্তন হতে পারে; paid plan স্বয়ংক্রিয়ভাবে চালু করবেন না।
