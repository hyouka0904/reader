// ==========================================================
// common.js — 三個頁面共用的小工具
// 用 GitHub Contents API 直接讀取 repo 裡 files/ 底下的內容，
// 不需要另外產生任何 manifest 檔案。
// ==========================================================

/**
 * 從目前網址推斷 GitHub 帳號與 repo 名稱。
 * 標準的 GitHub Pages 專案網址長這樣：
 *   https://<owner>.github.io/<repo>/...
 */
function getOwnerRepo() {
  const owner = location.hostname.split(".")[0];
  const firstSegment = location.pathname.split("/").filter(Boolean)[0];
  const repo = firstSegment || owner + ".github.io";
  return { owner, repo };
}

function apiContentsUrl(path) {
  const { owner, repo } = getOwnerRepo();
  return `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
}

/** 呼叫 GitHub API，取得某個路徑底下的項目清單（資料夾＋檔案）。 */
async function fetchDirListing(path) {
  const res = await fetch(apiContentsUrl(path), {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) {
    if (res.status === 403) {
      throw new Error("GitHub API 請求次數暫時用完了，等一下再試一次。");
    }
    if (res.status === 404) {
      throw new Error(`找不到路徑：${path}`);
    }
    throw new Error(`讀取失敗（HTTP ${res.status}）`);
  }
  return res.json();
}

/** 抓檔名開頭的數字，例如 "001_第1话xxx.txt" → 1，沒有編號回傳 null。 */
function leadingNumber(name) {
  const m = name.match(/^0*(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

/** 排序：有編號的依數字排序在前，沒編號的依檔名排在後。 */
function sortChapterFiles(items) {
  const files = items.filter(
    (it) => it.type === "file" && it.name.toLowerCase().endsWith(".txt")
  );
  files.sort((a, b) => {
    const na = leadingNumber(a.name);
    const nb = leadingNumber(b.name);
    if (na !== null && nb !== null) return na - nb;
    if (na !== null) return -1;
    if (nb !== null) return 1;
    return a.name.localeCompare(b.name);
  });
  return files.map((f) => ({
    name: f.name,
    download_url: f.download_url,
    title: titleFromFilename(f.name),
  }));
}

/** 把檔名去掉副檔名跟開頭的編號前綴，當作顯示用標題。 */
function titleFromFilename(filename) {
  let name = filename.replace(/\.txt$/i, "");
  name = name.replace(/^0*\d+[_\-.\s]*/, "");
  return name.trim() || filename;
}

function getQueryParam(name) {
  return new URLSearchParams(location.search).get(name);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/**
 * 把某個資料夾排序好的章節清單存進 sessionStorage，
 * 讓 reader.html 可以直接拿來用，不用再打一次 API。
 */
function cacheChapterList(folder, chapters) {
  try {
    sessionStorage.setItem(`chapters:${folder}`, JSON.stringify(chapters));
  } catch (e) {
    // sessionStorage 不可用就算了，不影響主要功能
  }
}

function getCachedChapterList(folder) {
  try {
    const raw = sessionStorage.getItem(`chapters:${folder}`);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}
