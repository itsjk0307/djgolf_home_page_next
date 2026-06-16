import { SubPageLayout } from "@/components/layout/SubPageLayout";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Mypage" });
  return { title: t("title") };
}

const STATUS_LABELS = {
  PENDING: "statusPending",
  PAID: "statusPaid",
  PREPARING: "statusPreparing",
  SHIPPED: "statusShipped",
  DELIVERED: "statusDelivered",
  CANCELLED: "statusCancelled",
  REFUNDED: "statusRefunded",
} as const;

type OrderStatusKey = keyof typeof STATUS_LABELS;

export default async function MypagePage() {
  const session = await auth();
  const locale = await getLocale();

  if (!session?.user) {
    redirect(`/${locale}/login`);
  }

  const userId = (session.user as { id?: string })?.id;
  const t = await getTranslations("Mypage");

  const [user, pointLogs, orders] = await Promise.all([
    db.user.findUnique({
      where: { id: userId },
      select: {
        userId: true,
        name: true,
        email: true,
        phone: true,
        birth: true,
        gender: true,
        address: true,
        addressExt: true,
        point: true,
      },
    }),
    db.pointLog.findMany({
      where: { userId: userId ?? "" },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    db.order.findMany({
      where: { userId: userId ?? "" },
      orderBy: { createdAt: "desc" },
      take: 10,
      include: { items: true },
    }),
  ]);

  if (!user) {
    redirect(`/${locale}/login`);
  }

  const profileFields = [
    { labelKey: "userId", value: user.userId },
    { labelKey: "name", value: user.name },
    { labelKey: "email", value: user.email ?? "-" },
    { labelKey: "phone", value: user.phone ?? "-" },
    { labelKey: "birth", value: user.birth ?? "-" },
    { labelKey: "gender", value: user.gender ?? "-" },
    { labelKey: "address", value: [user.address, user.addressExt].filter(Boolean).join(" ") || "-" },
  ] as const;

  return (
    <SubPageLayout
      title={t("title")}
      breadcrumbs={[{ label: t("breadcrumb") }]}
    >
      {/* Profile */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("profileTitle")}
        </h2>
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <tbody>
              {profileFields.map(({ labelKey, value }) => (
                <tr key={labelKey} className="border-b last:border-0">
                  <th className="text-left py-3 px-5 font-semibold text-gray-600 w-32 bg-gray-100">
                    {t(labelKey)}
                  </th>
                  <td className="py-3 px-5 text-gray-800">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Points */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 flex-1">
            {t("pointTitle")}
          </h2>
        </div>
        <div className="bg-golf-green text-white rounded-xl p-6 mb-6 inline-flex items-baseline gap-2">
          <span className="text-4xl font-bold">{user.point.toLocaleString()}</span>
          <span className="text-xl">{t("pointUnit")}</span>
        </div>

        <h3 className="font-bold text-gray-800 mb-4">{t("pointHistory")}</h3>
        {pointLogs.length === 0 ? (
          <p className="text-gray-500 text-sm">{t("noPoints")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("pointDate")}</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("pointMemo")}</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("pointType")}</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-600">{t("pointAmount")}</th>
                </tr>
              </thead>
              <tbody>
                {pointLogs.map((log) => {
                  const typeKey = log.type === "EARN" ? "pointEarn" : log.type === "USE" ? "pointUse" : "pointAdmin";
                  return (
                    <tr key={log.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4 text-gray-600">
                        {log.createdAt.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-gray-800">{log.memo ?? "-"}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${log.type === "EARN" ? "bg-green-100 text-green-700" : log.type === "USE" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700"}`}>
                          {t(typeKey)}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-right font-semibold ${log.amount > 0 ? "text-golf-green" : "text-red-500"}`}>
                        {log.amount > 0 ? "+" : ""}{log.amount.toLocaleString()}{t("pointUnit")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Orders */}
      <section>
        <h2 className="text-xl font-bold text-golf-green border-b-2 border-golf-green pb-2 mb-6">
          {t("orderHistory")}
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">{t("noOrders")}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border rounded-xl overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("orderNo")}</th>
                  <th className="py-3 px-4 text-left font-semibold text-gray-600">{t("orderDate")}</th>
                  <th className="py-3 px-4 text-right font-semibold text-gray-600">{t("orderAmount")}</th>
                  <th className="py-3 px-4 text-center font-semibold text-gray-600">{t("orderStatus")}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const labelKey = STATUS_LABELS[order.status as OrderStatusKey] ?? "statusPending";
                  return (
                    <tr key={order.id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-gray-700">{order.orderNo}</td>
                      <td className="py-3 px-4 text-gray-600">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right font-semibold text-gray-800">
                        ₩{order.payAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-golf-green/10 text-golf-green">
                          {t(labelKey)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </SubPageLayout>
  );
}
