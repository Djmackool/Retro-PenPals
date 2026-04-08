const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

let supabaseClient = null;

if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY) {
  supabaseClient = window.supabase.createClient(
    window.SUPABASE_URL,
    window.SUPABASE_ANON_KEY
  );
  setStatus("Connected to live app");
} else {
  setStatus("Supabase not connected");
}

function setStatus(msg) {
  statusEl.textContent = msg;
}

function getProfile() {
  return {
    name: document.getElementById("name").value,
    state: document.getElementById("state").value,
    city: document.getElementById("city").value,
    interests: document.getElementById("interests").value.split(","),
    dislikes: document.getElementById("dislikes").value.split(","),
    bio: document.getElementById("bio").value
  };
}

async function signUpUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signUp({ email, password });

  if (error) {
    alert(error.message);
  } else {
    setStatus("Signed up!");
  }
}

async function logInUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
  } else {
    setStatus("Logged in!");
  }
}

async function saveLiveProfile() {
  const profile = getProfile();

  const { error } = await supabaseClient
    .from("profiles")
    .insert([profile]);

  if (error) {
    alert(error.message);
  } else {
    setStatus("Profile saved!");
  }
}

async function runSearch() {
  const { data } = await supabaseClient
    .from("profiles")
    .select("*");

  resultsEl.innerHTML = data.map(p => `
    <div class="match">
      <h3>${p.name}</h3>
      <p>${p.city}, ${p.state}</p>
      <p>${p.bio}</p>
    </div>
  `).join("");
}

document.getElementById("saveBtn").onclick = saveLiveProfile;
document.getElementById("searchBtn").onclick = runSearch;

document.getElementById("signupBtn").onclick = signUpUser;
document.getElementById("loginBtn").onclick = logInUser;
document.getElementById("signupBtnTop").onclick = signUpUser;
document.getElementById("loginBtnTop").onclick = logInUser;
