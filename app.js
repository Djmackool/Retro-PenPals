const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

function setStatus(msg) {
  statusEl.textContent = msg;
}

function normalizeList(text) {
  return text.split(",").map(x => x.trim()).filter(Boolean);
}

function getProfile() {
  return {
    name: document.getElementById("name").value.trim(),
    state: document.getElementById("state").value.trim(),
    city: document.getElementById("city").value.trim(),
    mail_type: document.getElementById("mailType").value,
    frequency: document.getElementById("frequency").value,
    interests: normalizeList(document.getElementById("interests").value),
    dislikes: normalizeList(document.getElementById("dislikes").value),
    bio: document.getElementById("bio").value.trim()
  };
}

function loadSample() {
  const sample = {
    name: "Amanda",
    state: "Georgia",
    city: "McDonough area",
    mailType: "Mix of both",
    frequency: "Twice a month",
    interests: "tattoos, horror movies, journaling, spooky stationery",
    dislikes: "sports, politics, rude humor",
    bio: "I like genuine friendships, handwritten mail, and creative envelopes with personality."
  };
  Object.entries(sample).forEach(([k, v]) => {
    const el = document.getElementById(k);
    if (el) el.value = v;
  });
}

function escapeHtml(text) {
  return String(text || "").replace(/[&<>"]/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;"
  }[c]));
}

function renderResults(matches) {
  if (!matches.length) {
    resultsEl.innerHTML = '<div class="empty">No live profiles match that search yet.</div>';
    return
