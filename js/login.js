//!login logic
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginRequired = document.getElementById("loginRequired");
const incorrectEOP = document.getElementById("incorrectEOP");
const loginBtn = document.getElementById("loginBtn");

let Users = [];

if (localStorage.getItem("Users") !== null) {
  Users = JSON.parse(localStorage.getItem("Users"));
}

loginBtn.addEventListener("click", function () {
  login();
});

function login() {
  let user = {
    loginEmail: loginEmail.value,
    loginPassword: loginPassword.value,
  };
  if (loginEmail.value != "" || loginPassword.value != "") {
    if (check(user)) {
      incorrectEOP.classList.replace("d-flex", "d-none");
      loginRequired.classList.replace("d-flex", "d-none");
      setTimeout(function () {
        window.location.href = "home.html";
      }, 1000);
    } else {
      incorrectEOP.classList.replace("d-none", "d-flex");
      loginRequired.classList.replace("d-flex", "d-none");
    }
  } else {
    loginRequired.classList.replace("d-none", "d-flex");
    incorrectEOP.classList.replace("d-flex", "d-none");
  }
}

function check(usr) {
  for (const ele of Users) {
    if (
      usr.loginEmail.toLowerCase() == ele.Email.toLowerCase() &&
      usr.loginPassword == ele.Password
    ) {
      localStorage.setItem("userName", JSON.stringify(ele.userName));
      return true;
    }
  }
}
