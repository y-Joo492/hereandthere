const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");

function onLoginSubmit(event) {
    event.preventDefault();
    const username = loginInput.value;
    localStorage.setItem("username", username);
    window.location.href = "second.html";
    console.log(username);
}

loginForm.addEventListener("submit", onLoginSubmit);
