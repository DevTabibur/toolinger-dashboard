/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal, Switch, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiUpload, FiX } from 'react-icons/fi';

// Dummy users data
const DUMMY_USERS = [
  {
    id: 1,
    name: 'Henry Bryant',
    avatar: '/avatars/avatar1.jpg',
    phone: '+12498345785',
    email: 'henry@example.com',
    role: 'Admin',
    status: true
  },
  {
    id: 2,
    name: 'Jenny Ellis',
    avatar: '/avatars/avatar2.jpg',
    phone: '+13178964592',
    email: 'jenny@example.com',
    role: 'Manager',
    status: true
  },
  {
    id: 3,
    name: 'Leon Baxter',
    avatar: '/avatars/avatar3.jpg',
    phone: '+12798183487',
    email: 'leon@example.com',
    role: 'Salesman',
    status: true
  },
  {
    id: 4,
    name: 'Karen Flores',
    avatar: '/avatars/avatar4.jpg',
    phone: '+17538647943',
    email: 'karen@example.com',
    role: 'Supervisor',
    status: true
  },
  {
    id: 5,
    name: 'Michael Dawson',
    avatar: '/avatars/avatar5.jpg',
    phone: '+13798132475',
    email: 'michael@example.com',
    role: 'Store Keeper',
    status: true
  },
  {
    id: 6,
    name: 'Karen Galvan',
    avatar: '/avatars/avatar6.jpg',
    phone: '+17586341894',
    email: 'karen@example.com',
    role: 'Purchase',
    status: true
  },
  {
    id: 7,
    name: 'Thomas Ward',
    avatar: '/avatars/avatar7.jpg',
    phone: '+12073548678',
    email: 'thomas@example.com',
    role: 'Delivery Biker',
    status: true
  },
  {
    id: 8,
    name: 'Aliza Duncan',
    avatar: '/avatars/avatar8.jpg',
    phone: '+13147850357',
    email: 'aliza@example.com',
    role: 'Maintenance',
    status: true
  },
  {
    id: 9,
    name: 'James Higham',
    avatar: '/avatars/avatar9.jpg',
    phone: '+11978348626',
    email: 'james@example.com',
    role: 'Quality Analyst',
    status: true
  },
  {
    id: 10,
    name: 'Jada Robinson',
    avatar: '/avatars/avatar10.jpg',
    phone: '+12678934581',
    email: 'robinson@example.com',
    role: 'Accountant',
    status: true
  },
];

const UsersPage = () => {
  const { t } = useLanguage();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [userToView, setUserToView] = useState<any>(null);
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editConfirmPassword, setEditConfirmPassword] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = [...DUMMY_USERS];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(user => user.status === isActive);
    }

    return filtered;
  }, [searchQuery, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedUsers.length / rowsPerPage);
  const paginatedUsers = filteredAndSortedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, rowsPerPage]);

  // Handle view
  const handleViewClick = (user: any) => {
    setUserToView(user);
    setIsViewModalOpen(true);
  };

  // Handle delete
  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log('Deleting user:', userToDelete);
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handle edit
  const handleEditClick = (user: any) => {
    setUserToEdit(user);
    setEditName(user.name);
    setEditRole(user.role);
    setEditEmail(user.email);
    setEditPhone(user.phone);
    setEditPassword('');
    setEditConfirmPassword('');
    setEditStatus(user.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving user:', {
      ...userToEdit,
      name: editName,
      role: editRole,
      email: editEmail,
      phone: editPhone,
      status: editStatus
    });
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };

  return (
    <div className="space-y-6">
      <DashboardBreadcrumb items={[{ label: t("User Management") }, { label: t("Users") }]} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Users")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your users")}</p>
        </div>
        <Button className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none">
          <FiPlus className="w-4 h-4 mr-2" />
          {t("Add User")}
        </Button>
      </div>

      {/* Filters */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
            <Input
              placeholder={t("Search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Status Filter */}
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { label: t("Status"), value: "all" },
              { label: t("Active"), value: "active" },
              { label: t("Inactive"), value: "inactive" },
            ]}
            className="w-full sm:w-40"
          />
        </div>
      </div>

      {/* Table */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">{t("User Name")}</TableHead>
                <TableHead className="min-w-[140px]">{t("Phone")}</TableHead>
                <TableHead className="min-w-[200px]">{t("Email")}</TableHead>
                <TableHead className="min-w-[120px]">{t("Role")}</TableHead>
                <TableHead className="min-w-[100px]">{t("Status")}</TableHead>
                <TableHead className="text-right min-w-[120px]">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">{user.phone}</TableCell>
                  <TableCell className="text-[var(--primary)]">{user.email}</TableCell>
                  <TableCell className="text-zinc-600 dark:text-zinc-400">{user.role}</TableCell>
                  <TableCell>
                    <span className={`px-3 py-1 text-xs font-medium ${user.status ? 'bg-green-500 text-white' : 'bg-zinc-500 text-white'}`}>
                      {user.status ? t("Active") : t("Inactive")}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewClick(user)}
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title={t("View")}
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title={t("Edit")}
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(user)}
                        className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                        title={t("Delete")}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* No Results */}
        {paginatedUsers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500">{t("No users found")}</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-zinc-500">{t("Row Per Page")}:</span>
          <Select
            value={rowsPerPage.toString()}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            options={[
              { label: "10", value: "10" },
              { label: "20", value: "20" },
              { label: "50", value: "50" },
            ]}
            className="w-20"
          />
          <span className="text-sm text-zinc-500 ml-4">{t("Entries")}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("Previous")}
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 text-sm border transition-colors ${currentPage === pageNum
                      ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
                      : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("Next")}
          </button>
        </div>
      </div>

      {/* View User Modal */}
      <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
        {userToView && (
          <div>
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
              {t("User Details")}
            </h3>

            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-3xl font-semibold">
                  {userToView.name.charAt(0)}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">{t("User Name")}</label>
                  <p className="text-zinc-900 dark:text-zinc-100">{userToView.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Role")}</label>
                  <p className="text-zinc-900 dark:text-zinc-100">{userToView.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Email")}</label>
                  <p className="text-[var(--primary)]">{userToView.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Phone")}</label>
                  <p className="text-zinc-900 dark:text-zinc-100">{userToView.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Status")}</label>
                  <span className={`inline-block px-3 py-1 text-xs font-medium ${userToView.status ? 'bg-green-500 text-white' : 'bg-zinc-500 text-white'}`}>
                    {userToView.status ? t("Active") : t("Inactive")}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
              >
                {t("Close")}
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 bg-red-100 dark:bg-red-900/20 mb-4">
            <FiTrash2 className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
            {t("Delete User")}
          </h3>
          <p className="text-sm text-zinc-500 mb-6">
            {t("Are you sure you want to delete user?")}
          </p>
          <div className="flex gap-3 justify-center">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleConfirmDelete}
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6"
            >
              {t("Yes, Delete")}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            {t("Edit User")}
          </h3>

          <div className="space-y-4">
            {/* Image Upload */}
            <div>
              <div className="flex items-center justify-center w-full relative">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-3xl font-semibold">
                    {editName.charAt(0) || 'U'}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2 cursor-pointer transition-colors">
                    <FiUpload className="w-4 h-4" />
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
              </div>
              <p className="text-xs text-zinc-500 text-center mt-2">JPEG, PNG up to 2 MB</p>
            </div>

            {/* User Name */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("User")} <span className="text-red-500">*</span>
              </label>
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder={t("User Name")}
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Role")} <span className="text-red-500">*</span>
              </label>
              <Select
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                options={[
                  { label: t("Admin"), value: "Admin" },
                  { label: t("Manager"), value: "Manager" },
                  { label: t("Salesman"), value: "Salesman" },
                  { label: t("Supervisor"), value: "Supervisor" },
                  { label: t("Store Keeper"), value: "Store Keeper" },
                  { label: "Purchase", value: "Purchase" },
                  { label: t("Delivery Biker"), value: "Delivery Biker" },
                  { label: "Maintenance", value: "Maintenance" },
                  { label: "Quality Analyst", value: "Quality Analyst" },
                  { label: t("Accountant"), value: "Accountant" },
                ]}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Email")} <span className="text-red-500">*</span>
              </label>
              <Input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder={t("Email")}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Phone")} <span className="text-red-500">*</span>
              </label>
              <Input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                placeholder={t("Phone")}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Password")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={editPassword}
                  onChange={(e) => setEditPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Confirm Password")} <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={editConfirmPassword}
                  onChange={(e) => setEditConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                {t("Status")}
              </label>
              <Switch
                checked={editStatus}
                onChange={setEditStatus}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end mt-6">
            <Button
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
              className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
            >
              {t("Cancel")}
            </Button>
            <Button
              onClick={handleSaveEdit}
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6"
            >
              {t("Save Changes")}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UsersPage;