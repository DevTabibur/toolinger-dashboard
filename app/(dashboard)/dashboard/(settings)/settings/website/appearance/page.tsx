'use client';

import React, { useState } from 'react';
import { DashboardBreadcrumb, Switch, Button, Select } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiCheck } from 'react-icons/fi';
import clsx from 'clsx';

const AppearancePage = () => {
  const { t } = useLanguage();

  // State
  const [theme, setTheme] = useState('light'); // light, dark, automatic
  const [accentColor, setAccentColor] = useState('orange'); // orange, purple, blue, brown
  const [expandSidebar, setExpandSidebar] = useState(true);

  // Handlers
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (newTheme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Automatic: Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleAccentColorChange = (colorName: string, colorValue: string) => {
    setAccentColor(colorName);
    document.documentElement.style.setProperty('--primary', colorValue);
  };

  // Theme Options (Mocking the visual cards)
  const ThemeOption = ({ value, label, color }: { value: string, label: string, color: string }) => (
    <div
      onClick={() => handleThemeChange(value)}
      className={clsx(
        "cursor-pointer rounded-[var(--radius)] border-2 p-1 transition-all",
        theme === value ? "border-[var(--primary)]" : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-700"
      )}
    >
      <div className={clsx("h-32 rounded-[var(--radius)] bg-zinc-100 dark:bg-zinc-800 mb-3 border border-zinc-200 dark:border-zinc-700 overflow-hidden relative")}>
        {/* Mock UI for Theme Preview */}
        <div className="absolute top-0 left-0 bottom-0 w-1/4 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-700 p-1 flex flex-col gap-1">
          <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
          <div className="w-3/4 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-sm"></div>
        </div>
        <div className="absolute top-0 right-0 bottom-0 left-1/4 p-2 flex flex-col gap-2">
          <div className="w-full h-4 bg-white dark:bg-zinc-900 rounded-sm shadow-sm border border-zinc-200 dark:border-zinc-700"></div>
          <div className="flex gap-2">
            <div className="flex-1 h-12 bg-white dark:bg-zinc-900 rounded-sm shadow-sm border border-zinc-200 dark:border-zinc-700"></div>
            <div className="flex-1 h-12 bg-white dark:bg-zinc-900 rounded-sm shadow-sm border border-zinc-200 dark:border-zinc-700"></div>
          </div>
        </div>
        {/* Color Tint for Preview */}
        {value === 'dark' && <div className="absolute inset-0 bg-black/80 pointer-events-none"></div>}
      </div>
      <p className={clsx("text-center text-sm font-medium", theme === value ? "text-[var(--primary)]" : "text-zinc-600 dark:text-zinc-400")}>
        {t(label)}
      </p>
    </div>
  );

  // Color Options
  const colors = [
    { name: 'orange', value: '#fb923c' },
    { name: 'purple', value: '#8b5cf6' },
    { name: 'blue', value: '#3b82f6' },
    { name: 'brown', value: '#d97706' },
  ];

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("Website") }, { label: t("Appearance") }]} />

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 rounded-[var(--radius)] overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("Appearance")}</h3>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Selection */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("Select Theme")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Choose accent colour of website")}</p>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <ThemeOption value="light" label="Light" color="white" />
              <ThemeOption value="dark" label="Dark" color="zinc-900" />
              <ThemeOption value="automatic" label="Automatic" color="zinc-100" />
            </div>
          </div>

          {/* Accent Color */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("Accent Color")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Choose accent colour of website")}</p>
            </div>
            <div className="flex-1 flex gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleAccentColorChange(color.name, color.value)}
                  className={clsx(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-zinc-900",
                    accentColor === color.name ? "ring-2 ring-offset-2 ring-zinc-400 dark:ring-zinc-500" : ""
                  )}
                  style={{ backgroundColor: color.value }}
                >
                  {accentColor === color.name && <FiCheck className="text-white w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Expand Sidebar */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start md:items-center">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("Expand Sidebar")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Expand or collapse the sidebar menu")}</p>
            </div>
            <div className="flex-1">
              <Switch checked={expandSidebar} onChange={() => setExpandSidebar(!expandSidebar)} />
            </div>
          </div>

          {/* Sidebar Size */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("Sidebar Size")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Select size of the sidebar to display")}</p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <Select options={[{ label: t("Small - 85px"), value: "small" }]} />
            </div>
          </div>

          {/* Font Family */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("Font Family")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Select font family of website")}</p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <Select options={[{ label: t("Nunito"), value: "nunito" }]} />
            </div>
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

export default AppearancePage;