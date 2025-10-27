script.js// LocalStorage 키 이름
const STORAGE_KEY = "guestbook_entries";

// HTML 요소 선택
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submit");
const listContainer = document.getElementById("guestbook-list");

// 초기화: 저장된 항목 불러오기
let entries = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// 새 글 추가 이벤트
submitBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("이름과 메시지를 모두 입력해주세요!");
    return;
  }

  const entry = {
    id: Date.now(),
    name,
    message,
    date: new Date().toLocaleString()
  };

  entries.unshift(entry); // 최신 글이 위로
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

  renderEntries();
  nameInput.value = "";
  messageInput.value = "";
});

// 목록 렌더링
function renderEntries() {
  listContainer.innerHTML = "";

  if (entries.length === 0) {
    listContainer.innerHTML = "<p style='text-align:center;color:#64748b;'>아직 방명록이 없습니다 🕊️</p>";
    return;
  }

  entries.forEach(entry => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="card-header">
        <span>${entry.name}</span>
        <span>${entry.date}</span>
      </div>
      <div class="card-message">${escapeHTML(entry.message)}</div>
    `;

    listContainer.appendChild(card);
  });
}

// XSS 방지용 텍스트 escape 함수
function escapeHTML(str) {
  return str.replace(/[&<>'\"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  }[tag]));
}

// 페이지 로드 시 렌더
renderEntries();
