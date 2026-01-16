'use client';
import { DashboardBreadcrumb, Button, Select } from '@/components/ui';
import Loader from '@/components/ui/Loader';
import { useLanguage } from '@/context/LanguageContext';
import { useGetOTPSettingsQuery, useUpdateOTPSettingsMutation } from '@/redux/api/OTPSettings.api';
import { Formik, Form } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { OTPSettingsFormValues, otpSettingsSchema } from '@/schemas/otpSchema';
import toast from 'react-hot-toast';

const OTPPage = () => {
  const { t } = useLanguage();

  const { data: otpSettings, isLoading } = useGetOTPSettingsQuery();
  const [updateOTPSettings, { isLoading: updateLoading }] =
    useUpdateOTPSettingsMutation();
  // console.log("otpSettings", otpSettings)

  if (isLoading || updateLoading) {
    return <Loader />
  }

  const initialValues: OTPSettingsFormValues = {
    otpType: 'sms',
    otpDigitLimit: '4',
    otpExpireTime: '5',
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
            {t("OTP Settings")}
          </h1>
          <p className="text-sm text-zinc-500 mt-1">
            {t("Manage your OTP settings")}
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <DashboardBreadcrumb
        items={[
          { label: t("Settings") },
          { label: t("System") },
          { label: t("OTP") },
        ]}
      />

      <Formik
        enableReinitialize
        initialValues={{
          otpType:
            otpSettings?.data?.otpType?.toLowerCase() ?? 'sms',
          otpDigitLimit:
            String(otpSettings?.data?.otpDigitLimit ?? '4'),
          otpExpireTime:
            String(otpSettings?.data?.otpExpireTime ?? '5'),
        }}
        validationSchema={toFormikValidationSchema(otpSettingsSchema)}
        onSubmit={async (values) => {
          try {
            // Convert form values to API payload format
            const payload = {
              otpType: values.otpType.toUpperCase() as "SMS" | "EMAIL",
              otpDigitLimit: Number(values.otpDigitLimit),
              otpExpireTime: Number(values.otpExpireTime),
            };

            const res = await updateOTPSettings(payload).unwrap();

            if (res?.success) {
              toast.success(res?.message || t("Settings updated successfully"));
            }
          } catch (error: any) {
            console.error("Update failed:", error);
            toast.error(error?.data?.message || t("Failed to update settings"));
          }
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
              <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
                  {t("OTP")}
                </h3>
              </div>

              <div className="p-6 space-y-6">
                {/* OTP Type */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <div className="md:w-1/3">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {t("OTP Type")}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {t("Your can configure the type")}
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-md">
                    <Select
                      value={values.otpType}
                      onChange={(e) =>
                        setFieldValue('otpType', e.target.value)
                      }
                      options={[
                        // { label: t("SMS"), value: "sms" },
                        { label: t("Email"), value: "email" },
                      ]}
                    />
                  </div>
                </div>

                {/* OTP Digit Limit */}
                <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                  <div className="md:w-1/3">
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {t("OTP Digit Limit")}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {t("Select size of the format")}
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-md">
                    <Select
                      value={values.otpDigitLimit}
                      onChange={(e) =>
                        setFieldValue('otpDigitLimit', e.target.value)
                      }
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
                    <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                      {t("OTP Expire Time")}
                    </h4>
                    <p className="text-xs text-zinc-500 mt-1">
                      {t("Select expire time of OTP")}
                    </p>
                  </div>
                  <div className="flex-1 w-full max-w-md">
                    <Select
                      value={values.otpExpireTime}
                      onChange={(e) =>
                        setFieldValue('otpExpireTime', e.target.value)
                      }
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
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-zinc-900 text-white hover:bg-zinc-800 border-none"
                  >
                    {t("Cancel")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={updateLoading}
                    className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none"
                  >
                    {t("Save Changes")}
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default OTPPage;
