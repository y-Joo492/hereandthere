document.addEventListener("DOMContentLoaded", () => {
 
    const backBtn = document.getElementById("back-btn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "second.html"; 
        });
    }
});

function updatePeriod() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    console.log(`여행 기간: ${startDate} ~ ${endDate}`);
}

function setTravelType(type) {
    console.log(`type received: ${type}`);

    let selectedText = '';
    if (type === "domestic") {
        selectedText = "국내";
    } else if (type === "international") {
        selectedText = "해외";
    } else {
        selectedText = "여행 유형 선택 오류";
    }

    updateLocationOptions(type);
}

function updateLocationOptions(type) {
    const locationSelect = document.getElementById("locationSelect");

    // 선택지 초기화
    locationSelect.innerHTML = "";

    if (type === "domestic") {
        // 국내 선택지
        const domesticOptions = ['경기도', '충청남도', '충청북도', '전라남도', '경상남도', '경상북도'];
        domesticOptions.forEach(location => {
            let option = document.createElement("option");
            option.value = location;
            option.text = location;
            locationSelect.add(option);
        });
    } else if (type === "international") {
        // 해외 선택지
        const internationalOptions = ['아시아', '아프리카', '북아메리카', '남아메리카', '오세아니아'];
        internationalOptions.forEach(location => {
            let option = document.createElement("option");
            option.value = location;
            option.text = location;
            locationSelect.add(option);
        });
    } else {
        // 여행 유형 선택 전 기본 안내 메시지
        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "여행 유형을 먼저 선택하세요";
        locationSelect.add(defaultOption);
    }
}

function addCompanionInput() {
    const companionList = document.getElementById("companionList");

    // 새로운 입력 필드 생성
    const newInput = document.createElement("input");
    newInput.type = "text";
    newInput.name = "companion[]";
    newInput.placeholder = "이름 입력";

    // 입력 필드 추가
    companionList.appendChild(newInput);
}

function saveRecord() {
    // 여행 유형 선택 값
    const travelType = document.querySelector('input[name="travelType"]:checked')?.value || "미선택";

    // 여행 기간 값
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // 여행지 선택 값
    const location = document.getElementById("locationSelect").value || "미선택";

    // 동반자 이름 목록
    const companions = Array.from(document.querySelectorAll('input[name="companion[]"]')).map(input => input.value).filter(name => name);

    // 한 줄 후기 값
    const review = document.getElementById("reviewInput").value;

    // 로컬스토리지에 저장할 객체 생성
    const travelRecord = {
        travelType,
        startDate,
        endDate,
        location,
        companions,
        review
    };

    // 로컬스토리지에 저장 (키를 'travelRecord'로 지정)
    localStorage.setItem('travelRecord', JSON.stringify(travelRecord));
    alert("여행 기록이 저장되었습니다!");
    window.location.href = "second.html";  // second.html로 이동
}