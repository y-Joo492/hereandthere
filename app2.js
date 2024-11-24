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
        // 각 여행 기록에서 반드시 하나의 랜덤 사진 선택
        const selectedPhotos = storedRecords.map((record) => {
            if (record.photos && record.photos.length > 0) {
                // 랜덤으로 하나의 사진 선택
                const randomIndex = Math.floor(Math.random() * record.photos.length);
                return record.photos[randomIndex];
            }
            return null; // 사진이 없는 경우 null 반환
        }).filter(photo => photo !== null); // null 값 제거

        // 이미지 섹션 초기화
        imageSection.innerHTML = "";

        // 각 여행 기록에 대해 하나의 사진 추가
        selectedPhotos.forEach((photo, index) => {
            const container = document.createElement("div");
            container.className = "photo-container";
            container.style.display = "inline-block";
            container.style.margin = "10px";
            container.style.textAlign = "center";

            const img = document.createElement("img");
            img.src = photo;
            img.alt = `Travel photo ${index + 1}`;
            img.style.width = "150px";
            img.style.height = "150px";
            img.style.objectFit = "cover";
            img.style.borderRadius = "8px";
            img.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

            const label = document.createElement("p");
            label.innerText = `여행 기록 ${index + 1}`;
            label.style.marginTop = "5px";
            label.style.fontSize = "14px";
            label.style.color = "#555";

            container.appendChild(img);
            container.appendChild(label);
            imageSection.appendChild(container);
        });
    } else {
        // 여행 기록이 없는 경우 기본 메시지 표시
        imageSection.innerHTML = `<p>여행 기록이 없습니다!</p>`;
    }
    
});

