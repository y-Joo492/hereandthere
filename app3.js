let uploadedPhotos = [];

document.addEventListener("DOMContentLoaded", () => {
 
    const backBtn = document.getElementById("back-btn");

    //뒤로가기 버튼
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "second.html"; 
        });
    }

        // 사진 업로드 초기화
        const photoUpload = document.getElementById("photoUpload");
        if (photoUpload) {
            photoUpload.addEventListener("change", handlePhotoUpload);
        }

        // 저장 버튼 클릭 이벤트
        const saveBtn = document.getElementById("save-btn");
        if (saveBtn) {
            saveBtn.addEventListener("click", saveRecord);
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

function handlePhotoUpload(event) {
    const files = Array.from(event.target.files); // 선택한 파일 목록
    const previewContainer = document.getElementById("previewContainer"); // 미리보기 영역

    // 로컬스토리지에서 기존 사진 불러오기
    const storedRecords = JSON.parse(localStorage.getItem("travelRecord")) || [];
    uploadedPhotos = storedRecords.flatMap(record => record.photos || []); // 모든 기록에서 사진 모으기

    files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const photoData = e.target.result; // Base64 데이터
            uploadedPhotos.push(photoData); // 전역 배열에 추가

            // 미리보기 추가
            const photoWrapper = document.createElement("div");
            photoWrapper.style.display = "inline-block";
            photoWrapper.style.position = "relative";
            photoWrapper.style.margin = "5px";

            const img = document.createElement("img");
            img.src = photoData;
            img.alt = "Uploaded photo";
            img.style.width = "100px";
            img.style.height = "100px";

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "X";
            deleteBtn.style.position = "absolute";
            deleteBtn.style.top = "0";
            deleteBtn.style.right = "0";
            deleteBtn.style.backgroundColor = "red";
            deleteBtn.style.color = "white";
            deleteBtn.style.border = "none";
            deleteBtn.style.borderRadius = "50%";
            deleteBtn.style.cursor = "pointer";

            deleteBtn.addEventListener("click", () => {
                uploadedPhotos = uploadedPhotos.filter((photo) => photo !== photoData);
                previewContainer.removeChild(photoWrapper);
            });

            photoWrapper.appendChild(img);
            photoWrapper.appendChild(deleteBtn);
            previewContainer.appendChild(photoWrapper);
        };

        reader.readAsDataURL(file); // 파일을 Base64로 변환
    });
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

    // 로컬스토리지에서 기존 기록 불러오기
    const storedData = localStorage.getItem("travelRecord");
    const travelRecords = storedData ? JSON.parse(storedData) : [];


    // 새 여행 기록 생성
    const newRecord = {
        travelType,
        startDate,
        endDate,
        location,
        companions,
        review,
        photos:uploadedPhotos
    };

    // 기존 기록 배열에 새 기록 추가
    travelRecords.push(newRecord);

    // 로컬스토리지에 저장 (키를 'travelRecords'로 지정)
    localStorage.setItem('travelRecord', JSON.stringify(travelRecords));
    alert("여행 기록이 저장되었습니다!");
    window.location.href = "second.html";  // second.html로 이동
}