// LOGINS "ANIMATION" - SMOOTH TRANSITION THROUGH POPUPS
const signupBtn = document.querySelector("#signup-btn");
const loginBtn = document.querySelector("#login-btn");
const alreadySignedUp = document.querySelector(".login");
const noAccountYet = document.querySelector(".signup");
const closeBtnLogin = document.querySelector(".close-signin");
const closeBtnSignup = document.querySelector(".close-signup");

signupBtn.addEventListener("click", () => {
  const signupForm = document.querySelector("#signup-form");
  signupForm.classList.toggle("active");
});
loginBtn.addEventListener("click", () => {
  const loginForm = document.querySelector("#login-form");
  loginForm.classList.toggle("active");
});
alreadySignedUp.addEventListener("click", () => {
  const loginForm = document.querySelector("#login-form");
  const signupForm = document.querySelector("#signup-form");
  loginForm.classList.toggle("active");
  signupForm.classList.remove("active");
});
noAccountYet.addEventListener("click", () => {
  const signupForm = document.querySelector("#signup-form");
  const loginForm = document.querySelector("#login-form");
  signupForm.classList.toggle("active");
  loginForm.classList.remove("active");
});
closeBtnLogin.addEventListener("click", () => {
  const loginForm = document.querySelector("#login-form");
  loginForm.classList.remove("active");
});
closeBtnSignup.addEventListener("click", () => {
  const signupForm = document.querySelector("#signup-form");
  signupForm.classList.remove("active");
});
