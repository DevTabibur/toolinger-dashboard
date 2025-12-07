/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useRef, useState } from 'react';
import { DashboardBreadcrumb, Input, Select, Button } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiUploadCloud, FiLock, FiX } from 'react-icons/fi';
import Image from 'next/image';

const CompanySettingsPage = () => {
  const { t } = useLanguage();

  // UseRefs for file inputs
  const iconInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const darkLogoInputRef = useRef<HTMLInputElement>(null);

  // State for image previews
  const [images, setImages] = useState<{ [key: string]: string | null }>({
    icon: null,
    favicon: null,
    logo: null,
    darkLogo: null
  });

  // Placeholder data for dropdowns
  const countries = [
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "UK" },
    { label: "Canada", value: "CA" },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImages(prev => ({ ...prev, [key]: url }));
    }
  };

  const removeImage = (key: string) => {
    setImages(prev => ({ ...prev, [key]: null }));
  };

  // Helper component for Image Upload Row
  const ImageUploadRow = ({
    label,
    description,
    inputRef,
    imageKey
  }: {
    label: string;
    description: string;
    inputRef: React.RefObject<HTMLInputElement>;
    imageKey: string;
  }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0">
      <div className="flex-1">
        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{t(label)}</h4>
        <p className="text-xs text-zinc-500 mt-1">{t(description)}</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-start gap-1">
          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] text-xs px-3 py-2 h-auto"
          >
            <FiUploadCloud className="w-3.5 h-3.5 mr-2" />
            {t("Upload Image")}
          </Button>
          <span className="text-[10px] text-zinc-400 text-right">{t("Recommended size is 450px x 450px. Max size 5mb.")}</span>
        </div>

        {/* Preview Area */}
        <div className="relative h-12 w-12  border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
          {images[imageKey] ? (
            <>
              <div
                onClick={() => removeImage(imageKey)}
                className="absolute top-0 right-0 p-0.5 bg-red-500 rounded-bl-md z-10 cursor-pointer hover:bg-red-600 transition-colors"
              >
                <FiX className="w-2 h-2 text-white" />
              </div>
              <img src={images[imageKey]!} alt="Preview" className="w-full h-full object-cover" />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FiLock className="w-4 h-4 text-zinc-400" />
              <div className="w-3 h-3 bg-zinc-200 dark:bg-zinc-700 rounded-full mt-1"></div>
            </div>
          )}
        </div>

        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => handleFileChange(e, imageKey)}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("Website") }, { label: t("Company") }]} />

      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50  overflow-hidden">
        <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("Company Settings")}</h3>
        </div>

        <div className="p-6 space-y-8">
          {/* Company Information */}
          <section className="space-y-4">
            <h4 className="text-sm font-semibold text-[var(--primary)] flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--primary)] rounded-full"></span>
              {t("Company Information")}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label={t("Company Name")} required placeholder="Multi-Dashboard" />
              <Input label={t("Company Email Address")} required placeholder="info@example.com" />
              <Input label={t("Phone Number")} required placeholder="+880123456789" />
              <Input label={t("Fax")} required placeholder="+1234567890" />
              <Input label={t("Website")} required placeholder="https://example.com" />
            </div>
          </section>

          {/* Company Images */}
          <section className="space-y-4">
            <h4 className="text-sm font-semibold text-[var(--primary)] flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--primary)] rounded-full"></span>
              {t("Company Images")}
            </h4>
            <div className="bg-zinc-50 dark:bg-zinc-900/30  p-4 border border-zinc-100 dark:border-zinc-800">
              <ImageUploadRow
                label="Company Icon"
                description="Upload Icon of your Company"
                inputRef={iconInputRef as any}
                imageKey="icon"
              />
              <ImageUploadRow
                label="Favicon"
                description="Upload Favicon of your Company"
                inputRef={faviconInputRef as any}
                imageKey="favicon"
              />
              <ImageUploadRow
                label="Company Logo"
                description="Upload Logo of your Company"
                inputRef={logoInputRef as any}
                imageKey="logo"
              />
              <ImageUploadRow
                label="Company Dark Logo"
                description="Upload Logo of your Company"
                inputRef={darkLogoInputRef as any}
                imageKey="darkLogo"
              />
            </div>
          </section>

          {/* Address Information */}
          <section className="space-y-4">
            <h4 className="text-sm font-semibold text-[var(--primary)] flex items-center gap-2">
              <span className="w-1 h-4 bg-[var(--primary)] rounded-full"></span>
              {t("Address Information")}
            </h4>
            <div className="space-y-6">
              <Input label={t("Address")} required placeholder="123 Street Name, City, Country" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select label={t("Country")} required options={countries} />
                <Select label={t("State")} required options={[{ label: "New York", value: "NY" }]} />
                <Select label={t("City")} required options={[{ label: "New York City", value: "NYC" }]} />
                <Input label={t("Postal Code")} required placeholder="10001" />
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

export default CompanySettingsPage;