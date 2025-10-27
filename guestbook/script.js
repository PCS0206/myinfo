// ✅ 설정: 아래에 본인 GitHub 정보만 바꿔주면 끝
const OWNER = "YOUR_GITHUB_USERNAME";     // 예: "chaesungpark"
const REPO  = "guestbook";                // 예: "guestbook"

const guestbookContainer = document.getElementById("guestbook");
const newIssueBtn = document.getElementById("new-issue");
newIssueBtn.href = `https://github.com/${OWNER}/${REPO}/issues/new?title=${encodeURIComponent("방명록 글")}`;

// 🔹 GitHub Issues API로 데이터 불러오기
async function loadIssues() {
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues?state=open&sort=created&direction=desc`);
    if (!res.ok) throw new Error("GitHub API 오류");
    const issues = await res.json();

    guestbookContainer.innerHTML = "";

    if (issues.length === 0) {
      guestbookContainer.innerHTML = "<p style='text-align:center;color:#64748b;'>아직 방명록이 없습니다 🕊️</p>";
      return;
    }

    issues.forEach(issue => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <div class="card-header">
          <span>${issue.user.login}</span>
          <span>${new Date(issue.created_at).toLocaleString()}</span>
        </div>
        <div class="card-message">${escapeHTML(issue.body || "")}</div>
      `;

      guestbookContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    guestbookContainer.innerHTML = "<p style='text-align:center;color:red;'>❌ 데이터를 불러올 수 없습니다.</p>";
  }
}

// XSS 방지용 escape 함수
function escapeHTML(str) {
  return str.replace(/[&<>'\"]/g, (tag) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    "\"": "&quot;"
  }[tag]));
}

// 실행
loadIssues();
