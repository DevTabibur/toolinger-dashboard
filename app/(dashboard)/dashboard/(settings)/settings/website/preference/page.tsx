'use client';

import React, { useState } from 'react';
import { DashboardBreadcrumb, Switch, Button } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';

const PreferencePage = () => {
  const { t } = useLanguage();

  // State for Preferences
  const [preferences, setPreferences] = useState({
    maintenanceMode: false,
    coupon: true,
    offers: true,
    multiLanguage: true,
    multicurrency: true,
    sms: true,
    stores: true,
    warehouses: true,
    barcode: true,
    qrCode: true,
    hrms: true,
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const preferenceItems = [
    { label: "Maintenance Mode", key: "maintenanceMode" },
    { label: "Coupon", key: "coupon" },
    { label: "Offers", key: "offers" },
    { label: "MultiLanguage", key: "multiLanguage" },
    { label: "Multicurrency", key: "multicurrency" },
    { label: "SMS", key: "sms" },
    { label: "Stores", key: "stores" },
    { label: "Warehouses", key: "warehouses" },
    { label: "Barcode", key: "barcode" },
    { label: "QR Code", key: "qrCode" },
    { label: "HRMS", key: "hrms" },
  ];

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("Website") }, { label: t("Preference") }]} />

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50  overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("Preference")}</h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {preferenceItems.map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 border border-zinc-200 dark:border-zinc-800  bg-white dark:bg-zinc-800/50"
              >
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t(item.label)}</span>
                <Switch
                  checked={preferences[item.key as keyof typeof preferences]}
                  onChange={() => handleToggle(item.key as keyof typeof preferences)}
                />
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-zinc-200 dark:border-zinc-800">
            <Button variant="outline" className="bg-zinc-900 text-white hover:bg-zinc-800 border-none">
              {t("Cancel")}
            </Button>
            <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none">
              {t("Save Changes")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencePage;