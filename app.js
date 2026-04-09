document.addEventListener("DOMContentLoaded", () => {
  const statusEl = document.getElementById("status");
  const resultsEl = document.getElementById("results");

  function setStatus(msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function showError(prefix, err) {
    const msg = err?.message || String(err) || "Unknown error";
    alert(prefix + ": " + msg);
    console.log(prefix, err);
    setStatus(prefix + ": " + msg);
  }

  let supabaseClient = null;

  try {
    if (window.SUPABASE_URL && window.SUPABASE_ANON_KEY && window.supabase) {
      supabaseClient = window.supabase.createClient(
        window.SUPABASE_URL,
        window.SUPABASE_ANON_KEY
      );
      setStatus("Connected to live app");
    } else {
      setStatus("Supabase not connected");
    }
  } catch (err) {
    showError("Supabase setup failed", err);
  }

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function splitList(text) {
    return text
      .split(",")
      .map(x => x.trim())
      .filter(Boolean);
  }

  function getProfile() {
    return {
      name: getValue("name"),
      state: getValue("state"),
      city: getValue("city"),
      interests: splitList(getValue("interests")),
      dislikes: splitList(getValue("dislikes")),
      bio: getValue("bio")
    };
  }

  async function signUpUser() {
    try {
      if (!supabaseClient) {
        alert("Supabase is not connected.");
        return;
      }

      const email = getValue("email");
      const password = getValue("password");

      if (!email || !password) {
        alert("Enter email and password first.");
        return;
      }

      const { error } = await supabaseClient.auth.signUp({ email, password });

      if (error) {
        showError("Signup error", error);
        return;
      }

      alert("Sign up worked. Check your email if confirmation is enabled.");
      setStatus("Signed up");
    } catch (err) {
      showError("Signup crash", err);
    }
  }

  async function logInUser() {
    try {
      if (!supabaseClient) {
        alert("Supabase is not connected.");
        return;
      }

      const email = getValue("email");
      const password = getValue("password");

      if (!email || !password) {
        alert("Enter email and password first.");
        return;
      }

      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        showError("Login error", error);
        return;
      }

      alert("Logged in.");
      setStatus("Logged in");
    } catch (err) {
      showError("Login crash", err);
    }
  }

  async function saveLiveProfile() {
    try {
      if (!supabaseClient) {
        alert("Supabase is not connected.");
        return;
      }

      const profile = getProfile();

      if (!profile.name || !profile.state) {
        alert("Please enter at least a display name and state.");
        return;
      }

      const { error } = await supabaseClient
        .from("profiles")
        .insert([profile]);

      if (error) {
        showError("Save error", error);
        return;
      }

      alert("Profile saved.");
      setStatus("Profile saved");
      await runSearch();
    } catch (err) {
      showError("Save crash", err);
    }
  }

  async function runSearch() {
    try {
      if (!supabaseClient) {
        alert("Supabase is not connected.");
        return;
      }

      const interestSearch = getValue("interestSearch").toLowerCase();
      const stateSearch = getValue("stateSearch").toLowerCase();

      const { data, error } = await supabaseClient
        .from("profiles")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        showError("Load error", error);
        return;
      }

      const filtered = (data || []).filter(p => {
        const state = (p.state || "").toLowerCase();
        const interests = Array.isArray(p.interests)
          ? p.interests.join(" ").toLowerCase()
          : "";

        const stateOk = !stateSearch || state.includes(stateSearch);
        const interestOk = !interestSearch || interests.includes(interestSearch);
        return stateOk && interestOk;
      });

      if (!resultsEl) return;

      if (!filtered.length) {
        resultsEl.innerHTML = "<p>No profiles found.</p>";
        return;
      }

      resultsEl.innerHTML = filtered.map(p => `
        <div class="match">
          <h3>${p.name || ""}</h3>
          <p>${p.city || ""}${p.city && p.state ? ", " : ""}${p.state || ""}</p>
          <p>${p.bio || ""}</p>
        </div>
      `).join("");
    } catch (err) {
      showError("Load crash", err);
    }
  }

  const saveBtn = document.getElementById("saveBtn");
  const searchBtn = document.getElementById("searchBtn");
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtnTop = document.getElementById("signupBtnTop");
  const loginBtnTop = document.getElementById("loginBtnTop");

  if (saveBtn) saveBtn.addEventListener("click", saveLiveProfile);
  if (searchBtn) searchBtn.addEventListener("click", runSearch);
  if (signupBtn) signupBtn.addEventListener("click", signUpUser);
  if (loginBtn) loginBtn.addEventListener("click", logInUser);
  if (signupBtnTop) signupBtnTop.addEventListener("click", signUpUser);
  if (loginBtnTop) loginBtnTop.addEventListener("click", logInUser);
});