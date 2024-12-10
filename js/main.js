//!signup logic
const signupName = document.getElementById("signupName");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");
const signupBtn = document.getElementById("signupBtn");
const alreadyExists = document.getElementById("alreadyExists");
const success = document.getElementById("success");
const requiredInput = document.getElementById("requiredInput");
const invalidInput = document.getElementById("invalidInput");
const inputs = Array.from(document.querySelectorAll(".signup"));
let Users = [];

if (localStorage.getItem("Users") !== null) {
  Users = JSON.parse(localStorage.getItem("Users"));
}

for (const ele of inputs) {
  ele.addEventListener("input", function () {
    validate(ele);
  });
}

signupBtn.addEventListener("click", function () {
  if (
    signupName.value !== "" ||
    signupEmail.value !== "" ||
    signupPassword.value !== ""
  ) {
    addUser();
  } else {
    requiredInput.classList.replace("d-none", "d-flex");
    success.classList.replace("d-flex", "d-none");
    alreadyExists.classList.replace("d-flex", "d-none");
    invalidInput.classList.replace("d-flex", "d-none");
  }
});

function addUser() {
  let user = {
    userName: signupName.value,
    Email: signupEmail.value,
    Password: signupPassword.value,
  };
  if (
    signupName.classList.contains("is-valid") &&
    signupEmail.classList.contains("is-valid") &&
    signupPassword.classList.contains("is-valid")
  ) {
    if (notExist(user)) {
      Users.push(user);
      localStorage.setItem("Users", JSON.stringify(Users));
      success.classList.replace("d-none", "d-flex");
      alreadyExists.classList.replace("d-flex", "d-none");
      invalidInput.classList.replace("d-flex", "d-none");
      requiredInput.classList.replace("d-flex", "d-none");
      clearInputs();

      setTimeout(function () {
        window.location.href = "index.html";
      }, 1000);
    } else {
      alreadyExists.classList.replace("d-none", "d-flex");
      success.classList.replace("d-flex", "d-none");
      invalidInput.classList.replace("d-flex", "d-none");
      requiredInput.classList.replace("d-flex", "d-none");
    }
  } else {
    invalidInput.classList.replace("d-none", "d-flex");
    success.classList.replace("d-flex", "d-none");
    alreadyExists.classList.replace("d-flex", "d-none");
    requiredInput.classList.replace("d-flex", "d-none");
  }
}

function validate(ele) {
  let regex = {
    signupName: /^[a-zA-Z0-9_-\s]{3,30}$/,
    signupEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    signupPassword:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
  };

  let match = regex[ele.id].test(ele.value);
  if (match) {
    ele.classList.remove("is-invalid");
    ele.classList.add("is-valid");
  } else {
    ele.classList.add("is-invalid");
    ele.classList.remove("is-valid");
  }
}

function clearInputs() {
  signupName.value = "";
  signupName.classList.remove("is-valid", "is-invalid");
  signupEmail.value = "";
  signupEmail.classList.remove("is-valid", "is-invalid");
  signupPassword.value = "";
  signupPassword.classList.remove("is-valid", "is-invalid");
}

function notExist(usr) {
  let res = Users.find(
    (user) => user.Email.toLowerCase() === usr.Email.toLowerCase()
  );
  if (res) {
    return false;
  } else {
    return true;
  }
}
