const calHeader = document.querySelector(".calendar h3");
const calDates = document.querySelector(".dates");
const calNavs = document.querySelectorAll("#prev, #next");

const calMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let calDate = new Date();
let calMonth = calDate.getMonth();
let calYear = calDate.getFullYear();

function renderCalendar() {
  const calStart = new Date(calYear, calMonth, 1).getDay();
  const calEndDate = new Date(calYear, calMonth + 1, 0).getDate();
  const calEnd = new Date(calYear, calMonth, calEndDate).getDay();
  const calEndDatePrev = new Date(calYear, calMonth, 0).getDate();

  let calDatesHtml = "";

  for (let i = calStart; i > 0; i--) {
    calDatesHtml += `<li class="inactive">${calEndDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= calEndDate; i++) {
    let className =
      i === calDate.getDate() &&
      calMonth === new Date().getMonth() &&
      calYear === new Date().getFullYear()
        ? ' class="selected"'
        : "";
    calDatesHtml += `<li${className} data-date="${i}">${i}</li>`;
  }

  for (i = calEnd; i < 6; i++) {
    calDatesHtml += `<li class="inactive">${i - calEnd + 1}</li>`;
  }

  calDates.innerHTML = calDatesHtml;
  calHeader.textContent = `${calMonths[calMonth]} ${calYear}`;

  // 1.1. 날짜 클릭 이벤트 핸들러 추가
  document.querySelectorAll(".dates li").forEach(function (dateItem) {
    dateItem.addEventListener("click", function () {
      const selectedDate = this.dataset.date.padStart(2, "0"); // 날짜를 두 자리로 맞춤
      const currentMonth = String(calMonth + 1).padStart(2, "0"); // 월을 두 자리로 맞춤
      const currentYear = calYear;

      // 이전 선택된 날짜의 동그라미 제거
      document.querySelectorAll(".dates li.selected").forEach(function (item) {
        item.classList.remove("selected");
      });

      // 현재 선택된 날짜에 동그라미 표시
      this.classList.add("selected");

      // 아이템 필터링
      const filteredItems = Array.from(
        document.querySelectorAll(".addedtdl-container")
      ).filter(function (item) {
        const itemDate = item.querySelector(".addeddate").value;
        return itemDate === `${currentYear}-${currentMonth}-${selectedDate}`;
      });

      const daystdlInner = document.querySelector(".datstdl-Inner");
      if (filteredItems.length > 0) {
        // 기존 이미지 숨김
        daystdlInner.innerHTML = "";

        filteredItems.forEach(function (item) {
          // 각 아이템을 감싸는 listContainer 생성
          const listContainer = document.createElement("div");
          listContainer.classList.add("listContainer");

          // 카테고리를 표시하는 categoryContainer 생성
          const categoryContainer = document.createElement("div");
          const category = item.querySelector(".addedctg").textContent;
          categoryContainer.textContent = category;
          categoryContainer.classList.add("categoryContainer");

          // 아이템 내용을 표시하는 subjectContainer 생성
          const subjectContainer = document.createElement("div");
          const subject = item.querySelector(".subject").textContent;
          subjectContainer.textContent = subject;
          subjectContainer.classList.add("subjectContainer");

          // 완료된 항목에 대한 스타일 추가
          if (item.querySelector(".addedtdl").classList.contains("completed")) {
            listContainer.classList.add("addcom");
            subjectContainer.classList.add("addcoms");
          }

          // listContainer에 categoryContainer와 subjectContainer를 추가
          listContainer.appendChild(categoryContainer);
          listContainer.appendChild(subjectContainer);

          // daystdlInner에 listContainer 추가
          daystdlInner.appendChild(listContainer);
        });
      } else {
        // 이미지 보임
        daystdlInner.innerHTML =
          '<img class="blankimage" src="./images/todolistwhite.png" alt="날짜를 선택하지 않았을 때의 TODO LIST 이미지" />';
      }
    });
  });
}

// 2. 오른쪽 검색 버튼 클릭 시 동작 구현
document.querySelector(".search-btn").addEventListener("click", function () {
  const searchText = document
    .querySelector(".sbn-text")
    .value.trim()
    .toLowerCase();

  const items = document.querySelectorAll(".addedtdl-container");

  items.forEach(function (item) {
    const subjectText = item
      .querySelector(".subject")
      .textContent.trim()
      .toLowerCase();
    if (subjectText.includes(searchText)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
});

calNavs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && calMonth === 0) {
      calYear--;
      calMonth = 11;
    } else if (btnId === "next" && calMonth === 11) {
      calYear++;
      calMonth = 0;
    } else {
      calMonth = btnId === "next" ? calMonth + 1 : calMonth - 1;
    }

    calDate = new Date(calYear, calMonth, new Date().getDate());
    calYear = calDate.getFullYear();
    calMonth = calDate.getMonth();

    renderCalendar();
  });
});

renderCalendar();
