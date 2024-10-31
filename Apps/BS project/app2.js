document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector("#banner");
    const username = localStorage.getItem("username");

    if (username) {
        banner.innerText = `${username}님의 여기저기`;
    } else {
        banner.innerText = "사용자 이름을 찾을 수 없습니다.";
    }

    const addHereBtn = document.getElementById("add-here-btn");
    addHereBtn.addEventListener("click", () => {
        window.location.href = "third.html"; // third.html로 이동
    });

    const domHereBtn = document.getElementById("dom-here-btn");
    domHereBtn.addEventListener("click", () => {
        window.location.href = "forth.html"; // forth.html로 이동
    });
    
});

