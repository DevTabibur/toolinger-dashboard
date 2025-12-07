'use client';

import React, { useState } from 'react';
import { DashboardBreadcrumb, Input, Select, Button, Switch } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiX } from 'react-icons/fi';

const LocalizationPage = () => {
  const { t } = useLanguage();

  // State for Allowed Files Tags
  const [allowedFiles, setAllowedFiles] = useState(['JPG', 'GIF', 'PNG']);
  const [fileInput, setFileInput] = useState('');

  const handleFileAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && fileInput.trim()) {
      e.preventDefault();
      if (!allowedFiles.includes(fileInput.trim().toUpperCase())) {
        setAllowedFiles([...allowedFiles, fileInput.trim().toUpperCase()]);
      }
      setFileInput('');
    }
  };

  const removeFile = (file: string) => {
    setAllowedFiles(allowedFiles.filter(f => f !== file));
  };

  // Placeholder Data
  const languages = [{ label: "English", value: "en" }, { label: "Spanish", value: "es" }, { label: "Bengali", value: "bn" }];
  const timezones = [{ label: "UTC 5:30", value: "utc+5:30" }, { label: "UTC 0:00", value: "utc+0" }];
  const dateFormats = [{ label: "01 Jan 2025", value: "dd MMM yyyy" }];
  const timeFormats = [{ label: "12 Hours", value: "12h" }, { label: "24 Hours", value: "24h" }];
  const financialYears = [{ label: "2025", value: "2025" }];
  const months = [{ label: "January", value: "jan" }];
  const currencies = [{ label: "USA", value: "usd" }];
  const symbols = [{ label: "$", value: "$" }];
  const positions = [{ label: "$100", value: "prefix" }];
  const separators = [{ label: ".", value: "." }, { label: ",", value: "," }];
  const countries = [{ label: t("Allow All Countries"), value: "all" }];

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("Website") }, { label: t("Localization") }]} />

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("Localization")}</h3>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Information */}
          <section className="space-y-4">
            <h4 className="text-sm font-semibold text-[var(--primary)] flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--primary)] rounded-ful"></span>
              {t("Basic Information")}
            </h4>

            <div className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Select label={t("Language")} required options={languages} className="flex-1" />
                <div className="flex-1 flex flex-col justify-end">
                  <div className="flex items-center justify-between h-[42px] px-1">
                    <div>
                      <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{t("Language Switcher")}</p>
                      <p className="text-xs text-zinc-500">{t("To display in all the pages")}</p>
                    </div>
                    <Switch checked={true} onChange={() => { }} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label={t("Timezone")} helperText={t("Select Time zone in website")} options={timezones} />
                <Select label={t("Date format")} helperText={t("Select date format to display in website")} options={dateFormats} />
                <Select label={t("Time Format")} helperText={t("Select time format to display in website")} options={timeFormats} />
                <Select label={t("Financial Year")} helperText={t("Select year for finance")} options={financialYears} />
                <Select label={t("Starting Month")} helperText={t("Select starting month to display")} options={months} />
              </div>
            </div>
          </section>

          {/* Currency Settings */}
          <section className="space-y-4">
            <h4 className="text-sm font-semibold text-[var(--primary)] flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--primary)] rounded-full"></span>
              {t("Currency Settings")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label={t("Currency")} helperText={t("Select Time zone in website")} options={currencies} />
              <Select label={t("Currency Symbol")} helperText={t("Select date format to display in website")} options={symbols} />
              <Select label={t("Currency Position")} helperText={t("Select time format to display in website")} options={positions} />
              <Select label={t("Decimal Separator")} helperText={t("Select year for finance")} options={separators} />
              <Select label={t("Thousand Separator")} helperText={t("Select starting month to display")} options={separators} />
            </div>
          </section>

          {/* Country Settings */}
          <section className="space-y-4">
            <h4 className="text-sm font-semibold text-[var(--primary)] flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--primary)] rounded-full"></span>
              {t("Country Settings")}
            </h4>
            <div>
              <Select label={t("Countries Restriction")} helperText={t("Select countries restriction")} options={countries} />
            </div>
          </section>

          {/* File Settings */}
          <section className="space-y-4">
            <h4 className="text-sm font-semibold text-[var(--primary)] flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--primary)] rounded-full"></span>
              {t("File Settings")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="w-full">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">{t("Allowed Files")}</label>
                <div className="border border-zinc-200 dark:border-zinc-700 p-2 flex flex-wrap gap-2 focus-within:ring-2 focus-within:ring-[var(--primary)]/20 focus-within:border-[var(--primary)] bg-white dark:bg-zinc-800 transition-all">
                  {allowedFiles.map(file => (
                    <span key={file} className="bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-2 py-1  text-xs flex items-center gap-1">
                      {file}
                      <button onClick={() => removeFile(file)} className="hover:text-red-500"><FiX className="w-3 h-3" /></button>
                    </span>
                  ))}
                  <input
                    type="text"
                    className="outline-none bg-transparent text-sm flex-1 min-w-[60px]"
                    placeholder="Add..."
                    value={fileInput}
                    onChange={(e) => setFileInput(e.target.value)}
                    onKeyDown={handleFileAdd}
                  />
                </div>
                <p className="mt-1 text-xs text-zinc-500">{t("Select files")}</p>
              </div>

              <div className="relative">
                <Input label={t("Max File Size")} helperText={t("File size")} placeholder="5000" />
                <div className="absolute right-3 top-[34px] pointer-events-none text-sm text-zinc-500">MB</div>
              </div>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
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

export default LocalizationPage;