document.addEventListener("DOMContentLoaded", function () {
  alert("JS loaded");

  const saveBtn = document.getElementById("saveBtn");
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const searchBtn = document.getElementById("searchBtn");
  const signupBtnTop = document.getElementById("signupBtnTop");
  const loginBtnTop = document.getElementById("loginBtnTop");

  function clicked(name) {
    alert(name + " button works");
  }

  if (saveBtn) saveBtn.addEventListener("click", function () { clicked("Save"); });
  if (signupBtn) signupBtn.addEventListener("click", function () { clicked("Sign up"); });
  if (loginBtn) loginBtn.addEventListener("click", function () { clicked("Log in"); });
  if (searchBtn) searchBtn.addEventListener("click", function () { clicked("Search"); });
  if (signupBtnTop) signupBtnTop.addEventListener("click", function () { clicked("Top Sign up"); });
  if (loginBtnTop) loginBtnTop.addEventListener("click", function () { clicked("Top Log in"); });
});