const now = new Date();
const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
const seasons = document.querySelector(".left");
switch (month) {
  case 3:
  case 4:
  case 5:
    seasons.classList.add("spring");
    break;
  case 6:
  case 7:
  case 8:
    seasons.classList.add("summer");
    break;
  case 9:
  case 10:
  case 11:
    seasons.classList.add("fall");
    break;
  default:
    seasons.classList.add("winter");
    break;
}

const toggleBtn = document.querySelector(".menuImage");
const menu = document.querySelector(".menu");

toggleBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
});

document.getElementById("category").addEventListener("change", function () {
  const select = this;
  const selectedValue = select.value;

  function addCategory() {
    // 'Add' 옵션을 선택했는지 확인
    if (selectedValue === "add") {
      // 카테고리 이름을 입력받는 프롬프트 표시
      const newCategory = prompt("추가할 카테고리 이름을 입력하세요.", "");

      // 사용자가 값을 입력했는지 확인
      if (newCategory && newCategory.trim() !== "") {
        // 새 옵션을 생성하고 'Add' 옵션 바로 위에 추가
        const newOption = document.createElement("option");
        newOption.textContent = newCategory;

        // 'Add' 옵션 바로 위에 새 옵션을 추가
        select.insertBefore(newOption, select.querySelector(".addCategory"));

        // 새로 추가된 카테고리를 선택된 상태로 만듦
        select.value = newCategory;
      } else if (newCategory === null) {
        // 취소 버튼을 눌렀을 때 카테고리 값이 Select Category로 돌아가게 만듦
        select.value = "";
      } else {
        // 사용자가 아무 입력도 하지 않았을 경우 경고창을 띄우고 프롬프트로 돌아감
        alert("추가할 카테고리 이름을 입력하지 않았습니다.");
        addCategory();
      }
    }
  }
  addCategory();
});

// 선택된 날짜를 추적하는 변수 추가
let selectedDate = new Date(); // 현재 날짜로 초기화

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".add-button");
  const categorySelect = document.getElementById("category");
  const addedtdlWrap = document.querySelector(".addedtdl-wrap");

  let completedCount = 0;
  let pendingCount = 0;
  let selectedDate = new Date(); // 선택된 날짜

  function updateTaskCount() {
    document.querySelector(".comtcount").textContent = String(
      completedCount
    ).padStart(2, "0");
    document.querySelector(".pendtcount").textContent = String(
      pendingCount
    ).padStart(2, "0");
  }

  // 날짜에 따른 필터링 함수 추가
  function filterItemsBySelectedDate() {
    const currentMonth = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const currentYear = selectedDate.getFullYear();
    const currentDay = String(selectedDate.getDate()).padStart(2, "0");

    const filteredItems = Array.from(
      document.querySelectorAll(".addedtdl-container")
    ).filter(function (item) {
      const itemDate = item.querySelector(".addeddate").value;
      return itemDate === `${currentYear}-${currentMonth}-${currentDay}`;
    });

    const daystdlInner = document.querySelector(".datstdl-Inner");
    if (filteredItems.length > 0) {
      daystdlInner.innerHTML = "";
      filteredItems.forEach(function (item) {
        const listContainer = document.createElement("div");
        listContainer.classList.add("listContainer");

        const categoryContainer = document.createElement("div");
        const category = item.querySelector(".addedctg").textContent;
        categoryContainer.textContent = category;
        categoryContainer.classList.add("categoryContainer");

        const subjectContainer = document.createElement("div");
        const subject = item.querySelector(".subject").textContent;
        subjectContainer.textContent = subject;
        subjectContainer.classList.add("subjectContainer");

        if (item.querySelector(".addedtdl").classList.contains("completed")) {
          listContainer.classList.add("addcom");
          subjectContainer.classList.add("addcoms");
        }

        listContainer.appendChild(categoryContainer);
        listContainer.appendChild(subjectContainer);
        daystdlInner.appendChild(listContainer);
      });
    } else {
      daystdlInner.innerHTML =
        '<img class="blankimage" src="./images/todolistwhite.png" alt="날짜를 선택하지 않았을 때의 TODO LIST 이미지" />';
    }
  }

  addButton.addEventListener("click", function () {
    const itemInput = document.querySelector(".item");
    const itemValue = itemInput.value.trim();

    // 내용을 입력하지 않고 추가 버튼을 누르거나, 카테고리를 선택하지 않고 추가 버튼을 누를 경우
    if (itemValue === "") {
      alert("내용이 입력되지 않았습니다.");
      return;
    } else if (categorySelect.value === "") {
      alert("카테고리를 선택하고 추가해주세요.");
      return;
    }

    // 현재 날짜와 월 가져오기
    const now = new Date();
    const month = now.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1
    const date = now.getDate();
    const year = now.getFullYear();

    // 현재 선택된 카테고리 값 가져오기
    const selectedCategory = categorySelect.value;

    // 새로운 항목 생성
    const newItem = document.createElement("div");
    newItem.classList.add("addedtdl-container");

    newItem.innerHTML = `
    <div class="addedtdl">
      <div class="adtleft">
        <div class="ctganddate">
          <div class="addedctg">${selectedCategory}</div>
          <div class="addeddate-container">
               <input type="text" class="addeddate" value="${year}-${month}-${date}" />
          </div>
        </div>
        <div class="subject">${itemValue}</div>
      </div>
      <div class="adtright">
        <div class="btns">
          <input type="button" class="tdl-checkbox" />
          <input type="button" class="tdl-modify" />
          <input type="button" class="tdl-remove" />
        </div>
      </div>
    </div>
  `;

    addedtdlWrap.appendChild(newItem);

    // 항목 추가 후 입력 필드 비우기
    itemInput.value = "";
    renderCalendar();

    // 항목이 추가되었기 때문에 pendingCount에 하나 추가되고, 이후 updateTaskCount 함수를 불러와서 현황을 업데이트 함
    pendingCount++;
    updateTaskCount();

    // 완료 버튼 클릭 시 어두운 색상으로 변경하고 취소선, 반대로 완료 버튼을 해제할 시 원래 상태로 되돌림
    newItem
      .querySelector(".tdl-checkbox")
      .addEventListener("click", function () {
        const addedtdl = newItem.querySelector(".addedtdl");
        const addedctg = newItem.querySelector(".addedctg");
        const addeddate = newItem.querySelector(".addeddate");
        const subject = newItem.querySelector(".subject");
        if (!addedtdl.classList.contains("completed")) {
          addedtdl.classList.add("completed");
          addedctg.classList.add("completed");
          addeddate.classList.add("completed");
          subject.classList.add("completed");

          completedCount++;
          pendingCount--;
        } else {
          addedtdl.classList.remove("completed");
          addedctg.classList.remove("completed");
          addeddate.classList.remove("completed");
          subject.classList.remove("completed");
          completedCount--;
          pendingCount++;
        }
        updateTaskCount();
        renderCalendar();
        filterItemsBySelectedDate(); // 아이템 상태 변경 후 필터링 함수 호출
      });

    // 수정 버튼 클릭 시 div.subject 수정
    newItem.querySelector(".tdl-modify").addEventListener("click", function () {
      const newSubject = prompt(
        "수정할 내용을 입력하세요.",
        newItem.querySelector(".subject").textContent
      );
      if (newSubject !== null) {
        newItem.querySelector(".subject").textContent = newSubject;
      }
      renderCalendar();
      filterItemsBySelectedDate(); // 아이템 수정 후 필터링 함수 호출
    });

    // 삭제 버튼 클릭 시 삭제 확인
    newItem.querySelector(".tdl-remove").addEventListener("click", function () {
      if (confirm("정말 삭제하겠습니까?")) {
        addedtdlWrap.removeChild(newItem);
        if (
          newItem.querySelector(".addedtdl").classList.contains("completed")
        ) {
          completedCount--;
        } else {
          pendingCount--;
        }
        updateTaskCount();
      }
      renderCalendar();
      filterItemsBySelectedDate(); // 아이템 삭제 후 필터링 함수 호출
    });

    // daterangepicker 초기화 및 날짜 변경 시 실시간 업데이트
    $(newItem.querySelector(".addeddate")).daterangepicker({
      singleDatePicker: true,
      autoApply: true,
      opens: "center",
      locale: {
        format: "YYYY-MM-DD",
      },
    });

    // 날짜 변경 시 filterItemsBySelectedDate 함수 호출
    $(newItem.querySelector(".addeddate")).on(
      "apply.daterangepicker",
      function (ev, picker) {
        // 선택된 날짜를 새로운 값으로 업데이트
        newItem.querySelector(".addeddate").value =
          picker.startDate.format("YYYY-MM-DD");
        filterItemsBySelectedDate(); // 날짜 변경 후 필터링 함수 호출
      }
    );

    // 아이템 추가 후 필터링 함수 호출
    filterItemsBySelectedDate();
  });
});
