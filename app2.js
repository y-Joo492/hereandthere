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

    const intHereBtn = document.getElementById("wor-here-btn");
    intHereBtn.addEventListener("click", () => {
        window.location.href = "fifth.html"; // fifth.html로 이동
    });

    const imageSection = document.getElementById("image-section");

    // 로컬스토리지에서 사진 가져오기
    const storedPhotos = JSON.parse(localStorage.getItem("uploadedPhotos")) || [];

    if (storedPhotos.length > 0) {
        // 랜덤 사진 선택
        const randomIndex = Math.floor(Math.random() * storedPhotos.length);
        const randomPhoto = storedPhotos[randomIndex];

        // 기존 이미지 태그를 제거하고 새로 추가
        imageSection.innerHTML = ""; // 기존 이미지 제거
        const img = document.createElement("img");
        img.src = randomPhoto; // 랜덤 사진 설정
        img.alt = "랜덤 여행 사진";
        img.className = "clickable-image";
        imageSection.appendChild(img); // 이미지 섹션에 추가
    } else {
        // 사진이 없을 경우 기본 이미지 표시
        imageSection.innerHTML = `<p>여행 사진을 추가하세요!</p>`;
    }
    
});

