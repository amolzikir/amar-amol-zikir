const fs = require("node:fs");
const path = require("node:path");
const { before, after, beforeEach, test } = require("node:test");
const {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds
} = require("@firebase/rules-unit-testing");
const { doc, getDoc, setDoc } = require("firebase/firestore");

const PROJECT_ID = "amar-amol-zikir-rules-test";
let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: fs.readFileSync(path.join(__dirname, "..", "firestore.rules"), "utf8")
    }
  });
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

after(async () => {
  if (testEnv) await testEnv.cleanup();
});

test("signed-out users cannot read a user's items", async () => {
  const db = testEnv.unauthenticatedContext().firestore();
  await assertFails(getDoc(doc(db, "users/user-a/items/note-1")));
});

test("a signed-in user can create and read their own item", async () => {
  const db = testEnv.authenticatedContext("user-a").firestore();
  const ref = doc(db, "users/user-a/items/note-1");
  await assertSucceeds(setDoc(ref, { title: "নিজের নোট", updatedAt: 1 }));
  const result = await assertSucceeds(getDoc(ref));
  if (!result.exists() || result.data().title !== "নিজের নোট") {
    throw new Error("The user's own note was not readable after creation");
  }
});

test("a signed-in user cannot read another user's item", async () => {
  const db = testEnv.authenticatedContext("user-a").firestore();
  await assertFails(getDoc(doc(db, "users/user-b/items/note-1")));
});

test("a signed-in user cannot write into another user's path", async () => {
  const db = testEnv.authenticatedContext("user-a").firestore();
  await assertFails(setDoc(doc(db, "users/user-b/items/note-1"), {
    title: "অননুমোদিত", updatedAt: 1
  }));
});

test("a signed-in user cannot write outside the permitted items path", async () => {
  const db = testEnv.authenticatedContext("user-a").firestore();
  await assertFails(setDoc(doc(db, "private/user-a"), { value: 1 }));
});
