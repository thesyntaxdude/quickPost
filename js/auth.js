import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDUyjYhW2AMyTUaJFWB0tqbCurbRPk8dEI",

  authDomain: "quickpost-f868e.firebaseapp.com",

  projectId: "quickpost-f868e",

  storageBucket: "quickpost-f868e.firebasestorage.app",

  messagingSenderId: "178074905842",

  appId: "1:178074905842:web:9c3d97951dc66e2025b46b",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signupSubmitBtn = document.querySelector("#popup-signup-btn");
const loginSubmitBtn = document.querySelector("#popup-login-btn");
// SIGN UP PROCESS
signupSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  // input fields
  const username = document.querySelector("#username").value;
  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;

  createUserWithEmailAndPassword(auth, email, password, username).then(
    (userCredential) => {
      const user = userCredential.user;
      sendEmailVerification(user);
      setDoc(doc(db, "users", user.uid), {
        email: user.email,
        uid: user.uid,
        displayName: username,
      })
        .then(() => {
          showMsg(
            "Account created. Please Verify your email before logging in.",
            ".msgbox"
          );
          const loginForm = document.querySelector("#login-form");
          const signupForm = document.querySelector("#signup-form");
          loginForm.classList.toggle("active");
          signupForm.classList.remove("active");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          showMsg(`Sign Up failed: ${errorMessage}`, ".msgbox");
        });
    }
  );
});

// LOGIN PROCESS

loginSubmitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      if (!user.emailVerified) {
        showMsg("Please verify your email before logging in.", ".msgbox");
        return;
      }

      showMsg("Login successful!", ".msgbox");
      window.location.href = "../pages/dashboard.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      showMsg(`Login failed: ${errorMessage}`, ".msgbox");
    });
});

function showMsg(message, msgbox) {
  const destination = document.querySelector(msgbox);
  destination.innerHTML = `<span style="color: red;">ALERT</span>: ${message}`;
  destination.style.display = "block";
  destination.style.opacity = "1";

  setTimeout(() => {
    destination.style.opacity = "0";

    setTimeout(() => {
      destination.style.display = "none";
    }, 3500);
  }, 5000);
}
