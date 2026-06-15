"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

export default function LoginPage() {
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Auth");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      userId: form.get("userId"),
      password: form.get("password"),
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError(t("loginError"));
    } else {
      router.push(`/${locale}`);
      router.refresh();
    }
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-golf-green rounded-xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            DJ
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{t("loginTitle")}</h1>
          <p className="text-gray-500 text-sm mt-1">{t("loginSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-8 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded border border-red-200">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("userId")}</label>
            <input
              name="userId"
              type="text"
              required
              autoFocus
              className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-golf-green"
              placeholder={t("userIdPlaceholder")}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("password")}</label>
            <input
              name="password"
              type="password"
              required
              className="w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-golf-green"
              placeholder={t("passwordPlaceholder")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-golf-green text-white py-2.5 rounded-lg font-semibold hover:bg-golf-green-light transition-colors disabled:opacity-60"
          >
            {loading ? t("loggingIn") : t("loginBtn")}
          </button>

          <div className="flex justify-between text-sm text-gray-500 pt-2">
            <Link href="/find" className="hover:text-golf-green">{t("findAccount")}</Link>
            <Link href="/register" className="hover:text-golf-green font-medium">{t("registerLink")}</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
