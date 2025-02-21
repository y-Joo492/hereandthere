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
    locationSelect.innerHTML = "<option value=''>도/대륙을 선택하세요</option>";

    // 기존 subLocationSelect 삭제 (새로운 값이 업데이트되도록)
    let existingSubSelect = document.getElementById("subLocationSelect");
    if (existingSubSelect) {
        existingSubSelect.remove();
    }

    // 새로운 select 태그 (시/국가 선택용) 생성
    let subLocationSelect = document.createElement("select");
    subLocationSelect.id = "subLocationSelect"; // ID 설정
    subLocationSelect.style.display = "block"; // 항상 보이도록 설정

    if (type === "domestic") {
        // 국내 선택지
        const domesticOptions = ['서울', '인천', '경기도', '충청남도', '충청북도', '전라남도', '경상남도', '경상북도', '제주도'];
        domesticOptions.forEach(location => {
            let option = document.createElement("option");
            option.value = location;
            option.text = location;
            locationSelect.add(option);
        });

        // 첫 번째 도의 시/군/구 리스트를 자동으로 표시
        updateSubLocationOptions(domesticOptions[0], "domestic", subLocationSelect);

    } else if (type === "international") {
        // 해외 선택지
        const internationalOptions = ['아시아', '유럽', '아프리카', '북아메리카', '남아메리카', '오세아니아'];
        internationalOptions.forEach(location => {
            let option = document.createElement("option");
            option.value = location;
            option.text = location;
            locationSelect.add(option);
        });

        // 첫 번째 대륙의 국가 리스트를 자동으로 표시
        updateSubLocationOptions(internationalOptions[0], "international", subLocationSelect);

    } 

    // `travel-location` div 안에 subLocationSelect 추가
    document.querySelector(".travel-location").appendChild(subLocationSelect);
}

function updateSubLocationOptions(selectedValue, type, subLocationSelect) {
    // 선택지 초기화
    subLocationSelect.innerHTML = "<option value=''>지역을 선택하세요</option>";

    // 국내: 도 → 시 리스트
    const citiesByProvince = {
        "서울": ["강남", "강동", "강북", "강서", "관악", "광진", "구로", "금천", "노원", "도봉", "동대문", "동작", "마포", "서대문", "서초", "성동", "성북", "송파", "양천", "영등포", "용산", "은평", "종로", "중구", "중랑"],
        "인천": ["강화", "계양", "남동", "동구", "미추홀", "부평", "서구", "연수", "옹진", "중구"],
        "경기도": ["가평", "고양", "과천", "광명", "광주", "구리", "군포", "김포", "남양주", "동두천", "부천", "수원", "성남", "시흥", "안산", "안성", "안양", "양주", "양평", "여주", "연천", "오산", "용인", "의왕", "의정부", "이천", "파주", "평택", "포천", "하남", "화성"],
        "충청남도": ["계룡", "공주", "금산", "논산", "당진", "보령", "부여", "서산", "서천", "아산", "예산", "청양", "천안", "태안", "홍성"],
        "충청북도": ["괴산", "단양", "보은", "영동", "옥천", "음성", "제천", "증평", "진천", "청주", "충주"],
        "전라남도": ["강진", "고흥", "곡성", "광양", "구례", "나주", "담양", "목포", "무안", "보성", "순천", "신암", "여수", "영광", "영암", "완도", "장성", "장흥", "진도", "함평", "해남", "화순"],
        "경상남도": ["거제", "거창", "고성", "김해", "남해", "밀양", "사천", "산청", "양산", "의령", "진주", "창녕", "창원", "통영", "하동", "함안", "함양", "합천"],
        "경상북도": ["경산", "경주", "고령", "구미", "김천", "문경", "봉화", "상주", "성주", "안동", "영덕", "영양", "영주", "영천", "예천", "울릉", "울진", "의성", "청도", "청송", "칠곡", "포항"],
        "제주": ["서귀포", "제주"]
    };

    // 해외: 대륙 → 국가 리스트
    const countriesByContinent = {
        "아시아": ["네팔", "대만", "대한민국", "동티모르", "라오스", "레바논", "말레이시아", "몽골", "몰디브", "미얀마", "방글라데시", "베트남", "부탄", "브루나이", "사우디아라비아", "사이프러스", "싱가포르", "스리랑카", "시리아", "아랍에미리트", "아프가니스탄", "예멘", "오만", "요르단", "우즈베키스탄", "이라크", "이란", "이스라엘", "인도", "인도네시아", "일본", "중국", "카자흐스탄", "카타르", "캄보디아", "쿠웨이트", "키르기스스탄", "타지키스탄", "태국", "투르크메니스탄", "팔레스타인", "파키스탄", "필리핀"],
        "유럽": ["그리스", "네덜란드", "노르웨이", "덴마크", "독일", "라트비아", "러시아", "루마니아", "룩셈부르크", "리투아니아", "리히텐슈타인", "모나코", "몬테네그로", "몰도바", "몰타", "바티칸 시국", "벨기에", "벨라루스", "보스니아 헤르체고비나", "북마케도니아", "불가리아", "산마리노", "세르비아", "스웨덴", "스위스", "스페인", "슬로바키아", "슬로베니아", "아르메니아", "아이슬란드", "아일랜드", "아제르바이잔", "안도라", "알바니아", "에스토니아", "영국", "오스트리아", "우크라이나", "이탈리아", "조지아", "체코", "코소보", "크로아티아", "키프로스", "튀르키예", "포르투갈", "폴란드", "프랑스", "핀란드", "헝가리"],
        "아프리카": ["가나", "가봉", "감비아", "기니", "기니비사우", "나미비아", "나이지리아", "남수단", "남아프리카 공화국", "니제르", "라이베리아", "레소토", "르완다", "리비아", "마다가스카르", "말라위", "말리", "모로코", "모리셔스", "모리타니", "모잠비크", "보츠나와", "부룬디", "부르키나파소", "세네갈", "세이셸", "소말리아", "수단", "상투메 프린시페", "사하라 아랍 민주 공화국", "앙골라", "에리트레아", "에스와티니", "에티오피아", "우간다", "이집트", "잠비아", "적도 기니", "중앙아프리카 공화국", "지부티", "짐바브웨", "차드", "카메룬", "카보베르데", "코모로", "코트디부아르", "콩고 공화국", "콩고 민주 공화국", "탄자니아", "토고", "튀니지"],
        "북아메리카": ["과테말라", "그레나다", "그린란드", "니카라과", "도미니카 공화국", "도미니카 연방", "라바도스", "멕시코", "미국", "바베이도스", "바하마", "벨리즈", "세인트루시아", "세인트빈센트 그레나딘", "세인트키츠 네비스", "아이티", "앤티가 바부다", "엘살바도르", "온두라스", "자메이카", "캐나다", "코스타리카", "쿠바", "트리니다드 토바고", "파나마"],
        "남아메리카": ["가이아나", "기아나", "베네수엘라", "볼리비아", "브라질", "수리남", "아르헨티나", "에콰도르", "우루과이", "칠레", "콜롬비아", "파라과이", "페루", "포클랜드 제도"],
        "오세아니아": ["나우루", "뉴질랜드", "마셜 제도", "미크로네시아 연방", "바누아투", "사모아", "솔로몬 제도", "키리바시", "통가", "투발루", "파푸아뉴기니", "팔라우", "피지", "호주"]
    };

    let optionsList = [];

    if (type === "domestic" && citiesByProvince[selectedValue]) {
        optionsList = citiesByProvince[selectedValue]; // 선택한 도에 해당하는 시 리스트
    } else if (type === "international" && countriesByContinent[selectedValue]) {
        optionsList = countriesByContinent[selectedValue]; // 선택한 대륙에 해당하는 국가 리스트
    }

    optionsList.forEach(location => {
        let option = document.createElement("option");
        option.value = location;
        option.text = location;
        subLocationSelect.add(option);
    });

    // 시/국가 select를 보이도록 설정
    subLocationSelect.style.display = "block";
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

    // 시/국가 선택 값 (subLocationSelect가 존재하는 경우)
    const subLocationSelect = document.getElementById("subLocationSelect");
    const subLocation = subLocationSelect ? subLocationSelect.value : "미선택";

    // 동반자 이름 목록
    const companions = Array.from(document.querySelectorAll('input[name="companion[]"]'))
    .map(input => input.value)
    .filter(name => name);

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
        subLocation,
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