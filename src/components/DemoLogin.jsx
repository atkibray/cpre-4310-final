import React, { useEffect, useRef, useState } from "react";
import URLBarMock from "./URLBarMock.jsx";

const Logo = () => (
  <div className="flex items-center gap-2">
    {/* Why: generic square logo to avoid brand use */}
    <div className="grid grid-cols-2 gap-1">
      <div className="h-4 w-4 bg-sky-500" />
      <div className="h-4 w-4 bg-lime-500" />
      <div className="h-4 w-4 bg-orange-500" />
      <div className="h-4 w-4 bg-red-500" />
    </div>
    <span className="text-lg font-semibold text-neutral-700">DemoSoft</span>
  </div>
);

export default function DemoLogin() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const validate = () => {
    const e = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Enter a valid email address.";
    if (!pwd) e.pwd = "Enter your password.";
    if (!/^\d{6}$/.test(code)) e.code = "Enter the 6-digit code.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onNext = async () => {
    if (!validate()) return;
    setLoading(true);
    // Simulate exfiltration risk and delay
    await new Promise((r) => setTimeout(r, 2500));
    setLoading(false);
    redirectToExternal("https://myapps.microsoft.com");
  };

  const onBack = () => {
    setEmail("");
    setPwd("");
    setCode("");
    setErrors({});
    emailRef.current?.focus();
  };

  const redirectToExternal = (url) => {
    window.location.href = url;
  }

  const disabled = loading;

  return (
    <div className="flex min-h-screen flex-col items-center">
      <URLBarMock />
      <div className="mx-auto mt-10 w-[720px] max-w-[92vw]">
        <div className="mx-auto rounded-xl border border-neutral-300 bg-white shadow-md">
          <div className="p-8">
            <Logo />
            <h1 className="mt-6 text-2xl font-semibold text-neutral-800">Sign in</h1>

            <label className="mt-6 block text-sm text-neutral-700">
              Email, phone, or Skype
              <input
                ref={emailRef}
                type="email"
                className={`mt-2 w-full rounded-md border px-3 py-2 outline-none placeholder:text-neutral-400 ${
                  errors.email ? "border-red-400 ring-1 ring-red-200" : "border-neutral-300 focus:ring-2 focus:ring-sky-200"
                }`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={disabled}
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </label>

            <label className="mt-4 block text-sm text-neutral-700">
              Password
              <input
                type="password"
                className={`mt-2 w-full rounded-md border px-3 py-2 outline-none placeholder:text-neutral-400 ${
                  errors.pwd ? "border-red-400 ring-1 ring-red-200" : "border-neutral-300 focus:ring-2 focus:ring-sky-200"
                }`}
                placeholder="Password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                disabled={disabled}
              />
              {errors.pwd && <p className="mt-1 text-xs text-red-600">{errors.pwd}</p>}
            </label>

            <label className="mt-4 block text-sm text-neutral-700">
              Authenticator code
              <input
                inputMode="numeric"
                pattern="\d*"
                maxLength={6}
                className={`mt-2 w-full rounded-md border px-3 py-2 outline-none tracking-widest placeholder:text-neutral-400 ${
                  errors.code ? "border-red-400 ring-1 ring-red-200" : "border-neutral-300 focus:ring-2 focus:ring-sky-200"
                }`}
                placeholder="••••••"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                disabled={disabled}
              />
              {errors.code && <p className="mt-1 text-xs text-red-600">{errors.code}</p>}
            </label>

            <div className="mt-4 flex items-center gap-2 text-sm">
              <button
                type="button"
                className="text-sky-700 hover:underline disabled:opacity-60"
                disabled={disabled}
                onClick={() => alert("Account creation is disabled in this demo.")}
              >
                No account? Create one!
              </button>
              <span className="text-neutral-400">•</span>
              <button
                type="button"
                className="text-sky-700 hover:underline disabled:opacity-60"
                disabled={disabled}
                onClick={() => alert("Recovery is disabled in this demo.")}
              >
                Can’t access your account?
              </button>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="min-w-[88px] rounded-md bg-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-300 disabled:opacity-60"
                onClick={onBack}
                disabled={disabled}
              >
                Back
              </button>
              <button
                type="button"
                className={`relative min-w-[88px] rounded-md bg-sky-600 px-6 py-2 text-sm font-medium text-white hover:bg-sky-700 disabled:opacity-60 ${loading ? "btn-ripple" : ""}`}
                onClick={onNext}
                disabled={disabled}
                aria-busy={loading}
              >
                {loading ? "Signing in…" : "Next"}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="flex w-full items-center gap-3 border-t border-neutral-200 px-6 py-4 text-left text-sm text-neutral-700 hover:bg-neutral-50"
            onClick={() => alert("Sign-in options are disabled in this demo.")}
            disabled={disabled}
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-5 w-5 text-neutral-500"
            >
              <path
                fill="currentColor"
                d="M10 17l5-5-5-5v10zM4 5h2v14H4V5zm14 0h2v14h-2V5z"
              />
            </svg>
            <span>Sign-in options</span>
          </button>
        </div>

        {/* Teaching hint ribbon */}
        <div className="mx-auto mt-4 w-[720px] max-w-[92vw]">
          <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Educational demo: Always verify the URL **in the browser**, not only what a QR code displays.
          </div>
        </div>
      </div>
    </div>
  );
}
