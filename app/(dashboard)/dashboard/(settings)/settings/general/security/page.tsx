'use client';

import React, { useState } from 'react';
import { DashboardBreadcrumb, Button, Switch, Modal, Input, Select, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiEye, FiEyeOff, FiSmartphone, FiMail, FiCpu, FiActivity, FiSlash, FiTrash2, FiShield, FiChrome } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const SecurityPage = () => {
    const { t } = useLanguage();

    // State for toggles
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [googleAuthEnabled, setGoogleAuthEnabled] = useState(true);

    // Modal States
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
    const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

    // Form States (simplified for demo)
    const [deleteReason, setDeleteReason] = useState("");

    // Dummy Data for Tables
    const devices = [
        { id: 1, device: "Chrome - Windows", date: "15 May 2025, 10:30 AM", location: "Newyork / USA", ip: "232.222.12.72" },
        { id: 2, device: "Safari Macos", date: "10 Apr 2025, 05:15 PM", location: "Newyork / USA", ip: "224.111.12.75" },
        { id: 3, device: "Firefox Windows", date: "15 Mar 2025, 02:40 PM", location: "Newyork / USA", ip: "111.222.13.28" },
        { id: 4, device: "Safari Macos", date: "15 Jan 2025, 08:00 AM", location: "Newyork / USA", ip: "333.555.10.54" },
    ];

    const activities = [
        { id: 1, device: "Chrome - Windows", date: "15 May 2025, 10:30 AM", location: "Newyork / USA", ip: "232.222.12.72" },
        { id: 2, device: "Safari Macos", date: "10 Apr 2025, 05:15 PM", location: "Newyork / USA", ip: "224.111.12.75" },
        { id: 3, device: "Firefox Windows", date: "15 Mar 2025, 02:40 PM", location: "Newyork / USA", ip: "111.222.13.28" },
        { id: 4, device: "Safari Macos", date: "15 Jan 2025, 08:00 AM", location: "Newyork / USA", ip: "333.555.10.54" },
    ];

    const deleteReasons = [
        { id: "reason1", label: "No longer using the service", desc: "I no longer need this service and won’t be using it in the future." },
        { id: "reason2", label: "Privacy concerns", desc: "I am concerned about how my data is handled and want to remove my information." },
        { id: "reason3", label: "Too many notifications/emails", desc: "I’m overwhelmed by the volume of notifications or emails and would like to reduce them." },
        { id: "reason4", label: "Poor user experience", desc: "I’ve had difficulty using the platform, and it didn’t meet my expectations." },
        { id: "reason5", label: "Other (Please specify)", desc: "" },
    ];

    return (
        <div className="space-y-6">
            <DashboardBreadcrumb items={[{ label: t("Settings") }, { label: t("General") }, { label: t("Security") }]} />

            <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="border-b border-zinc-200 px-6 py-4 dark:border-zinc-800">
                    <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">{t("Security")}</h3>
                </div>

                <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
                    {/* Password Section */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiShield className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Password")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Last Changed")} 22 Dec 2024, 10:30 AM</p>
                            </div>
                        </div>
                        <Button onClick={() => setIsPasswordModalOpen(true)} className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("Change Password")}
                        </Button>
                    </div>

                    {/* Two Factor Authentication */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiShield className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Two Factor Authentication")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Receive codes via SMS or email every time you login")}</p>
                            </div>
                        </div>
                        <Switch checked={twoFactorEnabled} onChange={setTwoFactorEnabled} />
                    </div>

                    {/* Google Authentication */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FcGoogle className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Google Authentication")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Connect to Google")}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="px-2 py-1 text-xs font-medium text-green-600 bg-green-50 border border-green-200 rounded">{t("Connected")}</div>
                            <Switch checked={googleAuthEnabled} onChange={setGoogleAuthEnabled} />
                        </div>
                    </div>

                    {/* Phone Number Verification */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiSmartphone className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Phone Number Verification")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Verified Mobile Number")} : +81699799974</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <Button onClick={() => setIsPhoneModalOpen(true)} className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                                {t("Change")}
                            </Button>
                            <Button variant="outline" className="text-[var(--primary-foreground)] bg-[var(--primary-dark)] border-none hover:bg-[var(--primary)] text-white">
                                {t("Remove")}
                            </Button>
                        </div>
                    </div>

                    {/* Email Verification */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiMail className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Email Verification")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Verified Email")} : info@example.com</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                                <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L3.5 6.5L1 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <Button onClick={() => setIsEmailModalOpen(true)} className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                                {t("Change")}
                            </Button>
                            <Button variant="outline" className="bg-[var(--primary-dark)] border-none hover:bg-[var(--primary)] text-white">
                                {t("Remove")}
                            </Button>
                        </div>
                    </div>

                    {/* Device Management */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiCpu className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Device Management")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Manage devices associated with the account")}</p>
                            </div>
                        </div>
                        <Button onClick={() => setIsDeviceModalOpen(true)} className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("Manage")}
                        </Button>
                    </div>

                    {/* Account Activity */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiActivity className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Account Activity")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Manage activities associated with the account")}</p>
                            </div>
                        </div>
                        <Button onClick={() => setIsActivityModalOpen(true)} className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("View")}
                        </Button>
                    </div>

                    {/* Deactivate Account */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiSlash className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Deactivate Account")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("This will shutdown your account. Your account will be reactive when you sign in again")}</p>
                            </div>
                        </div>
                        <Button onClick={() => setIsDeactivateModalOpen(true)} className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("Deactivate")}
                        </Button>
                    </div>

                    {/* Delete Account */}
                    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                                <FiTrash2 className="h-5 w-5" />
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-900 dark:text-zinc-100">{t("Delete Account")}</h4>
                                <p className="text-sm text-zinc-500 mt-1">{t("Your account will be permanently deleted")}</p>
                            </div>
                        </div>
                        <Button onClick={() => setIsDeleteModalOpen(true)} className="bg-red-500 hover:bg-red-600 text-white border-none">
                            {t("Delete")}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Change Password Modal */}
            <Modal isOpen={isPasswordModalOpen} onClose={() => setIsPasswordModalOpen(false)} title={t("Change Password")} size="md">
                <div className="space-y-4">
                    <Input label={t("Current Password")} type="password" required />
                    <Input label={t("New Password")} type="password" required />
                    <Input label={t("Confirm Password")} type="password" required />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button onClick={() => setIsPasswordModalOpen(false)} variant="outline">
                            {t("Cancel")}
                        </Button>
                        <Button className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("Save Changes")}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Change Phone Modal */}
            <Modal isOpen={isPhoneModalOpen} onClose={() => setIsPhoneModalOpen(false)} title={t("Change Phone Number")} size="md">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            {t("Current Phone Number")} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="w-1/3">
                                <Select options={[{ label: "🇺🇸 +1", value: "+1" }]} />
                            </div>
                            <Input placeholder="(201) 555-0123" className="flex-1" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                            {t("New Phone Number")} <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            <div className="w-1/3">
                                <Select options={[{ label: "🇺🇸 +1", value: "+1" }]} />
                            </div>
                            <Input placeholder="(201) 555-0123" className="flex-1" />
                        </div>
                    </div>
                    <p className="text-sm text-zinc-500">{t("New phone number only updated once you verified")}</p>
                    <Input label={t("Confirm Password")} type="password" required />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button onClick={() => setIsPhoneModalOpen(false)} variant="outline">
                            {t("Cancel")}
                        </Button>
                        <Button className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("Save Changes")}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Change Email Modal */}
            <Modal isOpen={isEmailModalOpen} onClose={() => setIsEmailModalOpen(false)} title={t("Change Email")} size="md">
                <div className="space-y-4">
                    <Input label={t("Current Email")} type="email" required />
                    <Input label={t("New Email")} type="email" required />
                    <p className="text-sm text-zinc-500">{t("New email address only updated once you verified")}</p>
                    <Input label={t("Current Password")} type="password" required />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button onClick={() => setIsEmailModalOpen(false)} variant="outline">
                            {t("Cancel")}
                        </Button>
                        <Button className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("Save Changes")}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Device Management Modal */}
            <Modal isOpen={isDeviceModalOpen} onClose={() => setIsDeviceModalOpen(false)} title={t("Device Management")} size="xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("Device")}</TableHead>
                            <TableHead>{t("Date")}</TableHead>
                            <TableHead>{t("Location")}</TableHead>
                            <TableHead>{t("IP Address")}</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {devices.map((device) => (
                            <TableRow key={device.id}>
                                <TableCell>{t(device.device) || device.device}</TableCell>
                                <TableCell>{device.date}</TableCell>
                                <TableCell>{device.location}</TableCell>
                                <TableCell>{device.ip}</TableCell>
                                <TableCell>
                                    <button className="text-zinc-400 hover:text-red-500 transition-colors">
                                        <FiTrash2 className="h-4 w-4" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Modal>

            {/* Account Activity Modal */}
            <Modal isOpen={isActivityModalOpen} onClose={() => setIsActivityModalOpen(false)} title={t("Account Activity")} size="xl">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t("Date")}</TableHead>
                            <TableHead>{t("Device")}</TableHead>
                            <TableHead>{t("Location")}</TableHead>
                            <TableHead>{t("IP Address")}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {activities.map((activity) => (
                            <TableRow key={activity.id}>
                                <TableCell>{activity.date}</TableCell>
                                <TableCell>{t(activity.device) || activity.device}</TableCell>
                                <TableCell>{activity.location}</TableCell>
                                <TableCell>{activity.ip}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Modal>

            {/* Delete Account Modal (Reason) */}
            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} title={t("Delete Account")} size="lg">
                <div className="space-y-4">
                    <div>
                        <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">{t("Why Are You Deleting Your Account?")}</h4>
                        <p className="text-sm text-zinc-500 mb-6">{t("We're sorry to see you go! To help us improve, please let us know your reason for deleting your account")}</p>

                        <div className="space-y-4">
                            {deleteReasons.map((reason) => (
                                <label key={reason.id} className="flex items-start gap-3 cursor-pointer group">
                                    <div className="relative flex h-5 w-5 items-center justify-center mt-0.5">
                                        <input
                                            type="radio"
                                            name="deleteReason"
                                            value={reason.id}
                                            checked={deleteReason === reason.id}
                                            onChange={(e) => setDeleteReason(e.target.value)}
                                            className="peer h-4 w-4 border-zinc-300 text-[var(--primary)] focus:ring-[var(--primary)]"
                                        />
                                    </div>
                                    <div>
                                        <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-[var(--primary)] transition-colors">
                                            {t(reason.label)}
                                        </span>
                                        {reason.desc && (
                                            <span className="block text-sm text-zinc-500 mt-0.5">
                                                {t(reason.desc)}
                                            </span>
                                        )}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-6 border-t border-zinc-100 dark:border-zinc-800 mt-6">
                        <Button onClick={() => setIsDeleteModalOpen(false)} className="bg-zinc-800 text-white hover:bg-zinc-700">
                            {t("Cancel")}
                        </Button>
                        <Button className="bg-red-500 hover:bg-red-600 text-white border-none">
                            {t("Delete")}
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Deactivate Account Modal (Confirmation) - Simple generic confirm */}
            <Modal isOpen={isDeactivateModalOpen} onClose={() => setIsDeactivateModalOpen(false)} title={t("Deactivate Account")} size="sm">
                <div className="space-y-4">
                    <p className="text-zinc-600 dark:text-zinc-400">{t("This will shutdown your account. Your account will be reactive when you sign in again")}</p>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button onClick={() => setIsDeactivateModalOpen(false)} variant="outline">
                            {t("Cancel")}
                        </Button>
                        <Button className="bg-[var(--destructive)] hover:bg-[var(--destructive)]/90 text-white border-none">
                            {t("Deactivate")}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default SecurityPage;