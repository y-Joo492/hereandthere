document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector("#banner");
    const username = localStorage.getItem("username");

    if (username) {
        banner.innerText = `${username}님의 여기저기`;
    } else {
        banner.innerText = "사용자 이름을 찾을 수 없습니다.";
    }

    // 버튼 클릭 시 third.html로 이동하는 코드
    const addHereBtn = document.getElementById("add-here-btn");
    addHereBtn.addEventListener("click", () => {
        window.location.href = "third.html"; // third.html로 이동
    });
});

