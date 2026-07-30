import supabase from "../lib/supabase.js";

const form = document.getElementById("login-form");
const message = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    message.textContent = error.message;
    return;
  }

  message.textContent = "Sikeres bejelentkezés!";
});