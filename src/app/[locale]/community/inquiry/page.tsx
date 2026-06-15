"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SubPageLayout } from "@/components/layout/SubPageLayout";

export default function InquiryPage() {
  const t = useTranslations("Inquiry");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        authorName: form.get("authorName"),
        email: form.get("email"),
        phone: form.get("phone"),
        subject: form.get("subject"),
        contents: form.get("contents"),
      }),
    });

    setLoading(false);
    if (res.ok) {
      setSuccess(true);
    } else {
      setError(t("submitError"));
    }
  }

  if (success) {
    return (
      <SubPageLayout
        title={t("title")}
        breadcrumbs={[{ label: t("breadcrumb1") }, { label: t("title") }]}
      >
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-golf-green rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-3xl">✓</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">{t("successTitle")}</h2>
          <p className="text-gray-500">{t("successDesc")}</p>
        </div>
      </SubPageLayout>
    );
  }

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb1") }, { label: t("title") }]}
    >
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded border border-red-200">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("name")} <span className="text-red-500">*</span>
            </label>
            <input
              name="authorName"
              required
              className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-golf-green focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("email")} <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              required
              className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-golf-green focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
          <input
            name="phone"
            type="tel"
            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-golf-green focus:outline-none"
            placeholder={t("phonePlaceholder")}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("subject")} <span className="text-red-500">*</span>
          </label>
          <input
            name="subject"
            required
            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-golf-green focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("contents")} <span className="text-red-500">*</span>
          </label>
          <textarea
            name="contents"
            required
            rows={8}
            className="w-full border rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-golf-green focus:outline-none resize-none"
            placeholder={t("contentsPlaceholder")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-golf-green text-white py-3 rounded-lg font-semibold hover:bg-golf-green-light transition-colors disabled:opacity-60"
        >
          {loading ? t("submitting") : t("submitBtn")}
        </button>
      </form>
    </SubPageLayout>
  );
}
