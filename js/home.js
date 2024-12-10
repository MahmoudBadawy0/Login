const welcome = document.getElementById("welcome");

window.addEventListener("load", function () {
  welcomeName();
});

function welcomeName() {
  if (JSON.parse(localStorage.getItem("userName")) != null) {
    welcome.innerHTML = `welcome ${JSON.parse(
      localStorage.getItem("userName")
    )} `;
  } else {
    welcome.innerHTML = `welcome`;
  }
}
