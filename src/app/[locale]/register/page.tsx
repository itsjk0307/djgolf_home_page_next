"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    if (form.get("password") !== form.get("passwordConfirm")) {
      setError(t("passwordMismatch"));
      return;
    }

    setLoading(true);
    setError("");

    const res = await fetch("/api/members/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: form.get("userId"),
        password: form.get("password"),
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error === "userId_taken" ? t("userIdTaken") : t("registerFailed"));
    } else {
      router.push(`/${locale}/login?registered=1`);
    }
  }

  const fields = [
    { name: "userId", labelKey: "fieldUserId", placeholderKey: "fieldUserIdPlaceholder", type: "text", required: true },
    { name: "name", labelKey: "fieldName", placeholderKey: "fieldNamePlaceholder", type: "text", required: true },
    { name: "email", labelKey: "fieldEmail", placeholderKey: "fieldEmailPlaceholder", type: "email", required: false },
    { name: "phone", labelKey: "fieldPhone", placeholderKey: "fieldPhonePlaceholder", type: "tel", required: false },
    { name: "password", labelKey: "fieldPassword", placeholderKey: "fieldPasswordPlaceholder", type: "password", required: true },
    { name: "passwordConfirm", labelKey: "fieldPasswordConfirm", placeholderKey: "fieldPasswordConfirmPlaceholder", type: "password", required: true },
  ] as const;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">{t("registerTitle")}</h1>
          <p className="text-gray-500 text-sm mt-1">{t("registerSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-8 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded border border-red-200">
              {error}
            </div>
          )}

          {fields.map(({ name, labelKey, placeholderKey, type, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t(labelKey)} {required && <span className="text-red-500">*</span>}
              </label>
              <input
                name={name}
                type={type}
                required={required}
                className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-golf-green"
                placeholder={t(placeholderKey)}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-golf-green text-white py-2.5 rounded-lg font-semibold hover:bg-golf-green-light transition-colors disabled:opacity-60 mt-2"
          >
            {loading ? t("registering") : t("registerBtn")}
          </button>

          <p className="text-center text-sm text-gray-500">
            {t("alreadyMember")}{" "}
            <Link href="/login" className="text-golf-green font-medium hover:underline">
              {t("loginLink")}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
