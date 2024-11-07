document.addEventListener("DOMContentLoaded", () => {
 
    const backBtn = document.getElementById("back-btn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "second.html"; 
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const recordsContainer = document.getElementById("internationalRecords");

    // 로컬스토리지에서 데이터 가져오기
    const storedData = localStorage.getItem("travelRecord");
    const travelRecords = storedData ? JSON.parse(storedData) : [];

    // travelRecords가 객체라면 배열로 감싸기
    const recordsArray = Array.isArray(travelRecords) ? travelRecords : [travelRecords];

    // "해외" 여행 기록만 필터링
    const internationalRecords = recordsArray.filter(record => record.travelType === "international" || record.travelType === "해외");

    // 필터링한 해외 여행 기록을 화면에 표시
    if (internationalRecords.length > 0) {
        internationalRecords.forEach(record => {
            const recordElement = document.createElement("div");
            recordElement.classList.add("record");

            recordElement.innerHTML = `
                <h2>${record.location}</h2>
                <p>여행 기간: ${record.startDate} ~ ${record.endDate}</p>
                <p>같이 간 사람: ${record.companions.join(", ")}</p>
                <p>한 줄 후기: ${record.review}</p>
            `;

            recordsContainer.appendChild(recordElement);
        });
    } else {
        recordsContainer.innerHTML = "<p>저장된 해외 여행 기록이 없습니다.</p>";
    }
});