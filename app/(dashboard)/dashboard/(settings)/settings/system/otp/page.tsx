'use client';

import React, { useState } from 'react';
import { DashboardBreadcrumb, Button, Select } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';

const OTPPage = () => {
  const { t } = useLanguage();

  // State
  const [otpType, setOtpType] = useState('sms');
  const [otpDigitLimit, setOtpDigitLimit] = useState('4');
  const [otpExpireTime, setOtpExpireTime] = useState('5');

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("System") }, { label: t("OTP") }]} />

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("OTP")}</h3>
        </div>

        <div className="p-6 space-y-6">
          {/* OTP Type */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("OTP Type")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Your can configure the type")}</p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <Select
                value={otpType}
                onChange={(e) => setOtpType(e.target.value)}
                options={[
                  { label: t("SMS"), value: "sms" },
                  { label: t("Email"), value: "email" },
                ]}
              />
            </div>
          </div>

          {/* OTP Digit Limit */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("OTP Digit Limit")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Select size of the format")}</p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <Select
                value={otpDigitLimit}
                onChange={(e) => setOtpDigitLimit(e.target.value)}
                options={[
                  { label: "4", value: "4" },
                  { label: "6", value: "6" },
                  { label: "8", value: "8" },
                ]}
              />
            </div>
          </div>

          {/* OTP Expire Time */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="md:w-1/3">
              <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t("OTP Expire Time")}</h4>
              <p className="text-xs text-zinc-500 mt-1">{t("Select expire time of OTP")}</p>
            </div>
            <div className="flex-1 w-full max-w-md">
              <Select
                value={otpExpireTime}
                onChange={(e) => setOtpExpireTime(e.target.value)}
                options={[
                  { label: t("5 Mins"), value: "5" },
                  { label: t("10 Mins"), value: "10" },
                  { label: t("15 Mins"), value: "15" },
                  { label: t("30 Mins"), value: "30" },
                ]}
              />
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

export default OTPPage;