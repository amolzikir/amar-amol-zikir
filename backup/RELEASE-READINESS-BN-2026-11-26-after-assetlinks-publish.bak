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
- [x] Free root-level hosting repository and GitHub Pages deployment (run `45799381952`)
- [ ] `/.well-known/assetlinks.json` publish after signed-build fingerprint; then verify TWA fullscreen
- [x] Release signing key created (run `45804627552`); user kept private Drive backup; signed-build workflow hardened
- [ ] Signed Release APK/AAB build and APK/AAB signature verification (workflow updated; run pending)
- [ ] Android ফোনে বাস্তব install/login/offline/data-preservation test
- [ ] Firebase Console live rules ও auth domain verification
- [ ] Religious content source review
- [ ] Final release audit

## কাজের বাধ্যতামূলক ক্রম

1. **Root hosting:** Free user Pages repository `amolzikir/amolzikir.github.io` is deployed. Publish `/.well-known/assetlinks.json` there after release fingerprint verification.
2. **TWA assets/config:** PNG icon, app name, package ID `com.zikra.app`, start URL, scope, theme color and fallback are configured; verify in signed build.
3. **Release signing:** Keystore created and user has privately backed up ZIP and raw key in Drive; password is stored as GitHub Actions secret. Never commit it to repository.
4. **Asset Links:** Build workflow derives SHA-256 fingerprint and creates JSON; publish to root Pages and verify Chrome Digital Asset Links.
5. **Release build:** signed APK/AAB build; package ID and signatures checked by CI. Keep versionCode/version stable for first release.
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
