document.addEventListener("DOMContentLoaded", () => {
    const banner = document.querySelector("#banner");
    const username = localStorage.getItem("username");
    const imageSection = document.getElementById("image-section");

    console.log(JSON.parse(localStorage.getItem("travelRecord")));

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

    // 로컬스토리지에서 사진 가져오기
    const storedRecords = JSON.parse(localStorage.getItem("travelRecord")) || [];

    if (storedRecords.length > 0) {
        // 각 여행 기록에서 랜덤 사진 고유하게 선택
        const selectedPhotos = storedRecords.reduce((uniquePhotos, record) => {
            if (record.photos && record.photos.length > 0) {
                const randomIndex = Math.floor(Math.random() * record.photos.length);
                const selectedPhoto = record.photos[randomIndex];
                if (!uniquePhotos.includes(selectedPhoto)) {
                    uniquePhotos.push(selectedPhoto);
                }
            }
            return uniquePhotos;
        }, []); // 고유 사진 배열 생성

        // 이미지 섹션 초기화
        imageSection.innerHTML = "";

        if (selectedPhotos.length > 0) {
            // 선택된 사진들을 화면에 추가
            selectedPhotos.forEach((photo) => {
                const img = document.createElement("img");
                img.src = photo;
                img.alt = "Selected travel photo";
                img.className = "travel-photo";
                img.style.width = "200px";
                img.style.height = "200px";
                img.style.margin = "10px";

                imageSection.appendChild(img); // 이미지 섹션에 추가
            });
        } else {
            // 사진이 없을 경우 기본 메시지 표시
            imageSection.innerHTML = `<p>여행 사진을 추가하세요!</p>`;
        }
    } else {
        // 여행 기록이 없을 경우 기본 안내 메시지
        imageSection.innerHTML = `<p>여행 기록이 없습니다!</p>`;
    }
    
});

