import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore, collection, addDoc, onSnapshot, query, orderBy } 
  from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";

// ✅ 네가 제공한 Firebase 설정값
const firebaseConfig = {
  apiKey: "AIzaSyCeErCihQQJwXVjLJB41c4qynlNtHO4X4o",
  authDomain: "guestbook-project-9bee6.firebaseapp.com",
  projectId: "guestbook-project-9bee6",
  storageBucket: "guestbook-project-9bee6.firebasestorage.app",
  messagingSenderId: "806562533823",
  appId: "1:806562533823:web:ecdb19ed560adc7c6f510a",
  measurementId: "G-D7BNYML9XT"
};

// 🔧 Firebase 초기화
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const db = getFirestore(app);

// HTML 요소들
const nameInput = document.getElementById("name");
const messageInput = document.getElementById("message");
const submitBtn = document.getElementById("submit");
const listContainer = document.getElementById("guestbook-list");

// 글 작성 버튼 클릭
submitBtn.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    alert("이름과 메시지를 모두 입력해주세요!");
    return;
  }

  try {
    await addDoc(collection(db, "guestbook"), {
      name,
      message,
      date: new Date().toISOString()
    });
    nameInput.value = "";
    messageInput.value = "";
  } catch (err) {
    console.error("Error adding document: ", err);
  }
});

// Firestore 실시간 구독
const q = query(collection(db, "guestbook"), orderBy("date", "desc"));
onSnapshot(q, (snapshot) => {
  listContainer.innerHTML = "";

  if (snapshot.empty) {
    listContainer.innerHTML = "<p style='text-align:center;color:#64748b;'>아직 방명록이 없습니다 🕊️</p>";
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();
    const card = document.createElement("div");
    card.className = "card";
    const date = new Date(data.date).toLocaleString();

    card.innerHTML = `
      <div class="card-header">
        <span>${escapeHTML(data.name)}</span>
        <span>${date}</span>
      </div>
      <div class="card-message">${escapeHTML(data.message)}</div>
    `;
    listContainer.appendChild(card);
  });
});

// 간단한 XSS 방지용
function escapeHTML(str) {
  return str.replace(/[&<>'\"]/g, (tag) => ({
    "&": "&amp;",
    "<": "

