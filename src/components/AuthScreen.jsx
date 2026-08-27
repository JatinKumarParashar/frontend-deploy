import { useState } from "react";
import { LogIn, Plus, Sparkles } from "lucide-react";
import { api } from "../services/api";
import { Field, Logo, PrimaryButton } from "./ui";

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    user_id: "",
    role: "Normal User",
    secret_key: "",
  });
  const [signup, setSignup] = useState({
    full_name: "",
    user_id: "",
    email: "",
    phone: "",
    otp: "",
  });
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const update = (setter, key) => (event) =>
    setter((current) => ({ ...current, [key]: event.target.value }));
  async function login(event) {
    event.preventDefault();
    try {
      onLogin(
        await api("/auth/login", {
          method: "POST",
          body: JSON.stringify(form),
        }),
      );
    } catch (error) {
      setMessage(error.message);
    }
  }
  async function sendOtp() {
    const identifier = signup.phone || signup.email;
    if (!identifier) return setMessage("Enter email or phone first.");
    try {
      setVerificationCode(
        (
          await api("/auth/send-otp", {
            method: "POST",
            body: JSON.stringify({ phone_or_email: identifier }),
          })
        ).verification_code,
      );
    } catch (error) {
      setMessage(error.message);
    }
  }
  async function register(event) {
    event.preventDefault();
    try {
      await api("/auth/register", {
        method: "POST",
        body: JSON.stringify(signup),
      });
      setMode("login");
      setMessage("Profile created. You can now sign in.");
    } catch (error) {
      setMessage(error.message);
    }
  }
  return (
    <main className="grid min-h-screen place-items-center bg-[#121212] px-5 py-10">
      <section className="w-full max-w-[480px] rounded-2xl border border-[#282828] bg-[#181818] p-7 shadow-2xl shadow-black/30">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Logo compact />
          </div>
          <h1 className="text-2xl font-bold">Spotify AI Memory Studio</h1>
          <p className="mt-2 text-sm text-[#b3b3b3]">
            Next-Gen Context-Aware Audio Engine
          </p>
        </div>
        <div className="mb-6 grid grid-cols-2 rounded-xl border border-[#282828] bg-[#121212] p-1">
          {["login", "signup"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`rounded-lg px-3 py-3 text-sm font-semibold ${mode === item ? "bg-[#1db954] text-black" : "text-[#b3b3b3]"}`}
            >
              {item === "login" ? "Sign In" : "New User Sign Up"}
            </button>
          ))}
        </div>
        {mode === "login" ? (
          <form onSubmit={login} className="space-y-4">
            <Field
              label="User ID"
              value={form.user_id}
              onChange={update(setForm, "user_id")}
            />
            <label className="block text-sm font-medium">
              <span className="mb-2 block">Operating Role</span>
              <select
                value={form.role}
                onChange={update(setForm, "role")}
                className="input"
              >
                <option>Normal User</option>
                <option>Admin / Developer</option>
              </select>
            </label>
            {form.role.includes("Admin") && (
              <Field
                label="Admin Secret Key"
                type="password"
                value={form.secret_key}
                onChange={update(setForm, "secret_key")}
              />
            )}
            <PrimaryButton icon={LogIn}>Sign In to Studio</PrimaryButton>
          </form>
        ) : (
          <form onSubmit={register} className="space-y-3">
            {[
              ["Full Name", "full_name"],
              ["Choose User ID", "user_id"],
              ["Email Address", "email"],
              ["Mobile Number", "phone"],
            ].map(([label, key]) => (
              <Field
                key={key}
                label={label}
                value={signup[key]}
                onChange={update(setSignup, key)}
              />
            ))}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={sendOtp}
                className="secondary-button whitespace-nowrap"
              >
                <Plus size={16} /> Send OTP
              </button>
              <div className="flex flex-1 items-center rounded-lg border border-[#282828] px-3 text-xs text-[#1db954]">
                {verificationCode || "Verification code required"}
              </div>
            </div>
            <Field
              label="Enter OTP Code"
              value={signup.otp}
              onChange={update(setSignup, "otp")}
            />
            <PrimaryButton icon={Sparkles}>
              Verify & Create Profile
            </PrimaryButton>
          </form>
        )}
        {message && (
          <p className="mt-4 rounded-lg border border-[#754040] bg-[#2b1111] px-3 py-2 text-sm text-[#ff7777]">
            {message}
          </p>
        )}
      </section>
    </main>
  );
}
