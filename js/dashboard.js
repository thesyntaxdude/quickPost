import {
  getAuth,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

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

// SIGN OUT PROCESS
const signOutBtn = document.querySelector("#sign-out");
signOutBtn.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      showMsg("Sign Out successful!", ".msgbox");
      window.location.href = "../index.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      showMsg(`Sign Out failed: ${errorMessage}`, ".msgbox");
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