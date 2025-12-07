"use client";

import { useState } from "react";
import { DashboardBreadcrumb, Switch } from "@/components/ui";
import { useLanguage } from "@/context/LanguageContext";

const NotificationPage = () => {
  const { t } = useLanguage();

  // Global Toggles State
  const [globalSettings, setGlobalSettings] = useState({
    mobilePush: true,
    desktop: true,
    email: true,
    msms: true,
  });

  // Notification Matrix State
  const [notificationSettings, setNotificationSettings] = useState([
    { id: "payment", label: "Payment", push: true, sms: true, email: true },
    {
      id: "transaction",
      label: "Transaction",
      push: true,
      sms: true,
      email: true,
    },
    {
      id: "emailVerification",
      label: "Email Verification",
      push: true,
      sms: true,
      email: true,
    },
    { id: "otp", label: "OTP", push: true, sms: true, email: true },
    { id: "activity", label: "Activity", push: true, sms: true, email: true },
    { id: "account", label: "Account", push: true, sms: true, email: true },
  ]);

  const handleGlobalToggle = (key: keyof typeof globalSettings) => {
    setGlobalSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleMatrixToggle = (id: string, key: "push" | "sms" | "email") => {
    setNotificationSettings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [key]: !item[key] } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb
        items={[
          { label: t("Settings") },
          { label: t("General") },
          { label: t("Notification") },
        ]}
      />

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50  overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {t("Notification")}
          </h3>
        </div>

        <div className="p-6 space-y-6">
          {/* Global Toggles */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t("Mobile Push Notifications")}
              </span>
              <Switch
                checked={globalSettings.mobilePush}
                onChange={() => handleGlobalToggle("mobilePush")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t("Desktop Notifications")}
              </span>
              <Switch
                checked={globalSettings.desktop}
                onChange={() => handleGlobalToggle("desktop")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t("Email Notifications")}
              </span>
              <Switch
                checked={globalSettings.email}
                onChange={() => handleGlobalToggle("email")}
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {t("MSMS Notifications")}
              </span>
              <Switch
                checked={globalSettings.msms}
                onChange={() => handleGlobalToggle("msms")}
              />
            </div>
          </div>

          {/* Notification Matrix Table */}
          <div className="border border-zinc-200 dark:border-zinc-800  overflow-hidden mt-8">
            <div className="grid grid-cols-4 bg-zinc-50 dark:bg-zinc-800/50 p-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="font-medium text-zinc-900 dark:text-zinc-100">
                {t("General Notification")}
              </div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100 text-center">
                {t("Push")}
              </div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100 text-center">
                {t("SMS")}
              </div>
              <div className="font-medium text-zinc-900 dark:text-zinc-100 text-center">
                {t("Email")}
              </div>
            </div>
            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {notificationSettings.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 p-4 items-center hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                    {t(item.label)}
                  </div>
                  <div className="flex justify-center">
                    <Switch
                      checked={item.push}
                      onChange={() => handleMatrixToggle(item.id, "push")}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Switch
                      checked={item.sms}
                      onChange={() => handleMatrixToggle(item.id, "sms")}
                    />
                  </div>
                  <div className="flex justify-center">
                    <Switch
                      checked={item.email}
                      onChange={() => handleMatrixToggle(item.id, "email")}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;
