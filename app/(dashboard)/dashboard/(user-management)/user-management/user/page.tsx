// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { DashboardBreadcrumb, Button, Input, Select, Modal, Switch, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
// import { useLanguage } from '@/context/LanguageContext';
// import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiUpload, FiX } from 'react-icons/fi';
// import Link from 'next/link';
// import { SortableTableHead } from '@/components/ui/Table/Table';
// import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateProfileMutation } from '@/redux/api/user.api';
// import { useDebounce } from '@/hooks/useDebounce';
// import Loader from '@/components/ui/Loader';
// import toast from 'react-hot-toast';
// import { TAG_STATUS_UI } from '@/utils/Blog_Tag_Status';
// import { IoIosEyeOff } from 'react-icons/io';
// import { FaRegEye } from 'react-icons/fa';
// import { Field } from 'formik';



// const UsersPage = () => {
//   const { t } = useLanguage();

//   // State
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortBy, setSortBy] = useState<string | null>(null);
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
//   const [statusFilter, setStatusFilter] = useState<string | null>(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<any>(null);
//   const [userToEdit, setUserToEdit] = useState<any>(null);
//   const [userToView, setUserToView] = useState<any>(null);
//   const [editFirstName, setEditFirstName] = useState('');
//   const [editLastName, setEditLastName] = useState('');
//   const [editRole, setEditRole] = useState('');
//   const [editEmail, setEditEmail] = useState('');
//   const [editPhone, setEditPhone] = useState('');
//   const [editPassword, setEditPassword] = useState('');
//   const [editConfirmPassword, setEditConfirmPassword] = useState('');
//   const [editStatus, setEditStatus] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const debouncedSearch = useDebounce(searchQuery, 500);
//   const { data: users, isLoading } = useGetAllUsersQuery({
//     page: currentPage,
//     limit: rowsPerPage,
//     searchTerm: debouncedSearch || undefined,
//     sortBy,
//     sortOrder,
//     status: statusFilter || undefined,
//   })
//   const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
//   const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation()

//   console.log("users", users?.data?.data)
//   console.log("meta", users?.data?.meta)



//   // Pagination
//   const totalPages = Math.ceil(
//     (users?.data?.meta?.total || 0) / rowsPerPage
//   );
//   // Reset to page 1 when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [searchQuery, statusFilter, rowsPerPage]);

//   // Handle view
//   const handleViewClick = (user: any) => {
//     setUserToView(user);
//     setIsViewModalOpen(true);
//   };

//   // Handle delete
//   const handleDeleteClick = (user: any) => {
//     setUserToDelete(user);
//     setIsDeleteModalOpen(true);
//   };

//   const handleConfirmDelete = async () => {
//     // console.log('Deleting user:', userToDelete);
//     const res = await deleteUser(userToDelete?._id)
//     // console.log("delete", res)
//     if (res?.data?.statusCode == 200) {
//       toast.success("User deleted successfully")
//     } else {
//       toast.error("User deleted failed")
//     }
//     setIsDeleteModalOpen(false);
//     setUserToDelete(null);
//   };

//   // Handle edit
//   const handleEditClick = (user: any) => {
//     setUserToEdit(user);
//     setEditFirstName(user.firstName);
//     setEditLastName(user.lastName);
//     setEditRole(user.role);
//     setEditEmail(user.email);
//     setEditPhone(user.phoneNo);
//     setEditPassword('');
//     setEditConfirmPassword('');
//     setEditStatus(user.status);
//     setIsEditModalOpen(true);
//   };

//   const handleSaveEdit = () => {
//     console.log('Saving user:', {
//       ...userToEdit,
//       name: editFirstName,
//       role: editRole,
//       email: editEmail,
//       phone: editPhone,
//       status: editStatus
//     });
//     setIsEditModalOpen(false);
//     setUserToEdit(null);
//   };

//   const handleSort = (column: string) => {
//     if (sortBy === column) {
//       setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
//     } else {
//       setSortBy(column);
//       setSortOrder('asc');
//     }
//   };


//   if (isLoading || isDeleting || isUpdating) {
//     return <Loader />
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Users")}</h1>
//           <p className="text-sm text-zinc-500 mt-1">{t("Manage your users")}</p>
//         </div>

//         <Link
//           href="/dashboard/user-management/user/create"
//           className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
//         >
//           <Button className="flex items-center cursor-pointer" icon={<FiPlus className="w-4 h-4 mr-2" />}>

//             {t("Add User")}
//           </Button>
//         </Link>
//       </div>

//       <DashboardBreadcrumb items={[{ label: t("User Management") }, { label: t("Users") }]} />



//       {/* Filters */}
//       <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50  p-4 pl-0">
//         <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">

//           {/* LEFT: Search */}
//           <div className="relative flex-1 max-w-md">
//             {/* <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" /> */}
//             <Input
//               placeholder={t("Search by name, phone, email or role")}
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-6 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
//             />
//           </div>

//           {/* RIGHT: Filters */}
//           <div className="flex items-center gap-3 flex-wrap">

//             {/* Sort by */}
//             {/* <Select
//               value={sortBy || ''}
//               onChange={(e) => setSortBy(e.target.value)}
//               options={[
//                 { label: t("Sort By") + ": " + t("Name"), value: "name" },
//                 { label: t("Sort By") + ": " + t("Created Date"), value: "createdAt" },
//               ]}
//               className="w-44"
//             /> */}

//             {/* Status filter (optional but recommended) */}
//             <Select
//               value={statusFilter as any}
//               onChange={(e) => setStatusFilter(e.target.value)}
//               options={[
//                 { label: t("All Status"), value: "" },
//                 { label: t("Active"), value: "active" },
//                 { label: t("Inactive"), value: "inactive" },
//                 { label: t("Banned"), value: "banned" },
//                 { label: t("Blocked"), value: "blocked" },
//                 // { label: t("Rejected"), value: "rejected" },
//               ]}
//               className="w-36"
//             />

//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
//         <div className="overflow-x-auto">
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <SortableTableHead
//                   label={t("sl")}
//                   column="sl"
//                   activeColumn={sortBy}
//                   order={sortOrder}
//                   onSort={handleSort}
//                 />
//                 <SortableTableHead
//                   label={t("User")}
//                   column="user"
//                   activeColumn={sortBy}
//                   order={sortOrder}
//                   onSort={handleSort}
//                 />
//                 <SortableTableHead
//                   label={t("Phone")}
//                   column="phone"
//                   activeColumn={sortBy}
//                   order={sortOrder}
//                   onSort={handleSort}
//                 />
//                 {/* <SortableTableHead
//                   label={t("Email")}
//                   column="email"
//                   activeColumn={sortBy}
//                   order={sortOrder}
//                   onSort={handleSort}
//                 /> */}
//                 <SortableTableHead
//                   label={t("Role")}
//                   column="role"
//                   activeColumn={sortBy}
//                   order={sortOrder}
//                   onSort={handleSort}
//                 />
//                 <SortableTableHead
//                   label={t("Status")}
//                   column="status"
//                   activeColumn={sortBy}
//                   order={sortOrder}
//                   onSort={handleSort}
//                 />
//                 <TableHead className="text-right min-w-[120px]">{t("Actions")}</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {users?.data?.data?.map((user: any, index: any) => (
//                 <TableRow key={user.id}>
//                   {/* <TableCell>
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-semibold">
//                         {user?.firstName.charAt(0)}
//                       </div>
//                       <span className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</span>
//                     </div>
//                   </TableCell> */}
//                   <TableCell className="font-medium text-[var(--primary)]">{index + 1}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-3">
//                       {/* Avatar */}
//                       {user?.avatar ? (
//                         <img
//                           src={user.avatar}
//                           alt={user.firstName}
//                           className="w-10 h-10 rounded-full object-cover"
//                         />
//                       ) : (
//                         <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-semibold uppercase">
//                           {user?.firstName?.charAt(0)}
//                         </div>
//                       )}

//                       {/* Name & Email */}
//                       <div className="flex flex-col leading-tight">
//                         <span className="font-medium text-zinc-900 dark:text-zinc-100">
//                           {user?.firstName}
//                           {user?.lastName ? ` ${user.lastName}` : ""}
//                         </span>
//                         <span className="text-xs text-zinc-500 dark:text-zinc-400">
//                           {user?.email}
//                         </span>
//                       </div>
//                     </div>
//                   </TableCell>



//                   <TableCell className="text-zinc-600 dark:text-zinc-400">{user?.phoneNo ? user?.phoneNo : "—"}</TableCell>
//                   <TableCell className="text-[var(--primary)]">{user?.role}</TableCell>
//                   <TableCell>
//                     {(() => {
//                       const normalizedStatus = user?.status.toLowerCase();

//                       const statusConfig =
//                         TAG_STATUS_UI[normalizedStatus] || TAG_STATUS_UI.inactive;

//                       return (
//                         <span
//                           className={`px-3 py-1 text-xs font-medium rounded-lg ${statusConfig.className}`}
//                         >
//                           {t(statusConfig.label)}
//                         </span>
//                       );
//                     })()}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center justify-end gap-2">
//                       {/* <button
//                         onClick={() => handleViewClick(user)}
//                         className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
//                         title={t("View")}
//                       >
//                         <FiEye className="w-4 h-4" />
//                       </button> */}
//                       <button
//                         onClick={() => handleEditClick(user)}
//                         className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
//                         title={t("Edit")}
//                       >
//                         <FiEdit2 className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(user)}
//                         className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
//                         title={t("Delete")}
//                       >
//                         <FiTrash2 className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </div>

//         {/* No Results */}
//         {users?.data?.meta?.total === 0 && (
//           <div className="p-12 text-center">
//             <p className="text-zinc-500">{t("No users found")}</p>
//           </div>
//         )}

//       </div>

//       {/* Pagination */}
//       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">

//         {/* LEFT: Row per page */}
//         <div className="flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap">
//           <span className="whitespace-nowrap">
//             {t("Row Per Page")}:
//           </span>

//           <Select
//             value={rowsPerPage.toString()}
//             onChange={(e) => setRowsPerPage(Number(e.target.value))}
//             options={[
//               { label: "10", value: "10" },
//               { label: "20", value: "20" },
//               { label: "50", value: "50" },
//             ]}
//             className="w-16 shrink-0"
//           />

//           <span className="whitespace-nowrap">
//             {t("Entries")}
//           </span>
//         </div>


//         {/* RIGHT: Pagination */}
//         <div className="flex items-center gap-2">
//           {/* previous / pages / next (unchanged) */}
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {t("Previous")}
//             </button>

//             <div className="flex items-center gap-1">
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (currentPage <= 3) {
//                   pageNum = i + 1;
//                 } else if (currentPage >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = currentPage - 2 + i;
//                 }

//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => setCurrentPage(pageNum)}
//                     className={`w-8 h-8 text-sm border transition-colors ${currentPage === pageNum
//                       ? 'bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)]'
//                       : 'border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
//                       }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}
//             </div>

//             <button
//               onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-1.5 text-sm border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               {t("Next")}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* View User Modal */}
//       <Modal isOpen={isViewModalOpen} onClose={() => setIsViewModalOpen(false)}>
//         {userToView && (
//           <div>
//             <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
//               {t("User Details")}
//             </h3>

//             <div className="space-y-4">
//               {/* Avatar */}
//               <div className="flex justify-center">
//                 <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-3xl font-semibold">
//                   {userToView.name.charAt(0)}
//                 </div>
//               </div>

//               {/* Details */}
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-zinc-500 mb-1">{t("User Name")}</label>
//                   <p className="text-zinc-900 dark:text-zinc-100">{userToView.name}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Role")}</label>
//                   <p className="text-zinc-900 dark:text-zinc-100">{userToView.role}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Email")}</label>
//                   <p className="text-[var(--primary)]">{userToView.email}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Phone")}</label>
//                   <p className="text-zinc-900 dark:text-zinc-100">{userToView.phone}</p>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-zinc-500 mb-1">{t("Status")}</label>
//                   <span className={`inline-block px-3 py-1 text-xs font-medium ${userToView.status ? 'bg-green-500 text-white' : 'bg-zinc-500 text-white'}`}>
//                     {userToView.status ? t("Active") : t("Inactive")}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-end mt-6">
//               <Button
//                 variant="outline"
//                 onClick={() => setIsViewModalOpen(false)}
//                 className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
//               >
//                 {t("Close")}
//               </Button>
//             </div>
//           </div>
//         )}
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
//         <div className="text-center">
//           <div className="mx-auto flex items-center justify-center h-16 w-16 bg-red-100 dark:bg-red-900/20 mb-4">
//             <FiTrash2 className="h-8 w-8 text-red-600" />
//           </div>
//           <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
//             {t("Delete User")}
//           </h3>
//           <p className="text-sm text-zinc-500 mb-6">
//             {t("Are you sure you want to delete user?")}
//           </p>
//           <div className="flex gap-3 justify-center">
//             <Button
//               variant="outline"
//               onClick={() => setIsDeleteModalOpen(false)}
//               className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
//             >
//               {t("Cancel")}
//             </Button>
//             <Button
//               onClick={handleConfirmDelete}
//               className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6"
//             >
//               {t("Yes, Delete")}
//             </Button>
//           </div>
//         </div>
//       </Modal>

//       {/* Edit User Modal */}
//       <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} size='xl'>
//         <div>
//           <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
//             {t("Edit User")}
//           </h3>

//           <div className="space-y-4">
//             {/* Image Upload */}
//             <div>
//               <div className="flex items-center justify-center w-full relative">
//                 <div className="relative">
//                   <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-3xl font-semibold">
//                     {editFirstName.charAt(0) || 'U'}
//                   </div>
//                   <label className="absolute bottom-0 right-0 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2 cursor-pointer transition-colors">
//                     <FiUpload className="w-4 h-4" />
//                     <input type="file" className="hidden" accept="image/*" />
//                   </label>
//                 </div>
//               </div>
//               <p className="text-xs text-zinc-500 text-center mt-2">JPEG, PNG up to 2 MB</p>
//             </div>

//             {/* User Name */}
//             <div className='grid md:grid-cols-2 gap-2'>
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("First Name")} <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   value={editFirstName}
//                   onChange={(e) => setEditFirstName(e.target.value)}
//                   placeholder={t("User First Name")}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Last Name")}
//                 </label>
//                 <Input
//                   value={editLastName}
//                   onChange={(e) => setEditLastName(e.target.value)}
//                   placeholder={t("User last Name")}
//                 />
//               </div>
//             </div>




//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                 {t("Email")} <span className="text-red-500">*</span>
//               </label>
//               <Input
//                 type="email"
//                 value={editEmail}
//                 onChange={(e) => setEditEmail(e.target.value)}
//                 placeholder={t("Email")}
//               />
//             </div>

//             <div className='grid md:grid-cols-2 gap-2'>
//               {/* Role */}
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Role")} <span className="text-red-500">*</span>
//                 </label>
//                 <Select
//                   value={editRole}
//                   onChange={(e) => setEditRole(e.target.value)}
//                   options={[
//                     { label: t("Admin"), value: "Admin" },
//                     { label: t("Manager"), value: "Manager" },
//                     { label: t("Salesman"), value: "Salesman" },
//                     { label: t("Supervisor"), value: "Supervisor" },
//                     { label: t("Store Keeper"), value: "Store Keeper" },
//                     { label: "Purchase", value: "Purchase" },
//                     { label: t("Delivery Biker"), value: "Delivery Biker" },
//                     { label: "Maintenance", value: "Maintenance" },
//                     { label: "Quality Analyst", value: "Quality Analyst" },
//                     { label: t("Accountant"), value: "Accountant" },
//                   ]}
//                 />
//               </div>
//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Phone")} <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   type="tel"
//                   value={editPhone}
//                   onChange={(e) => setEditPhone(e.target.value)}
//                   placeholder={t("Phone")}
//                 />
//               </div>
//             </div>

//             <div className='grid md:grid-cols-2  gap-2'>
//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Password")} <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     value={editPassword}
//                     onChange={(e) => setEditPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
//                   >
//                     {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <Field
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border ${errors.confirmPassword && touched.confirmPassword
//                     ? 'border-red-500 focus:ring-red-500'
//                     : 'border-zinc-200 dark:border-zinc-700 focus:ring-[var(--brand-start)]'
//                     } text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-200 pr-10`}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
//                 >
//                   {showConfirmPassword ? (
//                     <IoIosEyeOff className="w-5 h-5" />
//                   ) : (
//                     <FaRegEye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>


//             {/* Status */}
//             <div>
//               <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                 {t("Status")}
//               </label>
              
//               <Select
//                 label="Status"
//                 options={[
//                   { label: 'Active', value: 'active' },
//                   { label: 'Inactive', value: 'inactive' },
//                   { label: 'Pending', value: 'pending' },
//                 ]}
//                 value={editStatus}
//                 onChange={(e) =>
//                   setEditStatus(e.target.value)
//                 }
//               />
//             </div>

//           </div>

//           <div className="flex gap-3 justify-end mt-6">
//             <Button
//               variant="outline"
//               onClick={() => setIsEditModalOpen(false)}
//               className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
//             >
//               {t("Cancel")}
//             </Button>
//             <Button
//               onClick={handleSaveEdit}
//               className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6"
//             >
//               {t("Save Changes")}
//             </Button>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default UsersPage;






































//====================================================NEW CODE












































/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { DashboardBreadcrumb, Button, Input, Select, Modal, Switch, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui';
import { useLanguage } from '@/context/LanguageContext';
import { FiSearch, FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff, FiUpload, FiX } from 'react-icons/fi';
import Link from 'next/link';
import { SortableTableHead } from '@/components/ui/Table/Table';
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateProfileMutation } from '@/redux/api/user.api';
import { useDebounce } from '@/hooks/useDebounce';
import Loader from '@/components/ui/Loader';
import toast from 'react-hot-toast';
import { TAG_STATUS_UI } from '@/utils/Blog_Tag_Status';
import { IoIosEyeOff } from 'react-icons/io';
import { FaRegEye } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
import { editUserSchema } from '@/schemas/updateUser.schema';
import { toFormikValidationSchema } from 'zod-formik-adapter';


const UsersPage = () => {
  const { t } = useLanguage();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const [userToEdit, setUserToEdit] = useState<any>(null);
  const [userToView, setUserToView] = useState<any>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editRole, setEditRole] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editPassword, setEditPassword] = useState('');
  const [editConfirmPassword, setEditConfirmPassword] = useState('');
  const [editStatus, setEditStatus] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { data: users, isLoading } = useGetAllUsersQuery({
    page: currentPage,
    limit: rowsPerPage,
    searchTerm: debouncedSearch || undefined,
    sortBy,
    sortOrder,
    status: statusFilter || undefined,
  })
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation()
  const [updateUser, { isLoading: isUpdating }] = useUpdateProfileMutation()

  console.log("users", users?.data?.data)
  console.log("meta", users?.data?.meta)



  // Pagination
  const totalPages = Math.ceil(
    (users?.data?.meta?.total || 0) / rowsPerPage
  );
  // Reset to page 1 when filters change
  useEffect(() => {
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

  const handleConfirmDelete = async () => {
    // console.log('Deleting user:', userToDelete);
    const res = await deleteUser(userToDelete?._id)
    // console.log("delete", res)
    if (res?.data?.statusCode == 200) {
      toast.success("User deleted successfully")
    } else {
      toast.error("User deleted failed")
    }
    setIsDeleteModalOpen(false);
    setUserToDelete(null);
  };

  // Handle edit
  const handleEditClick = (user: any) => {
    setUserToEdit(user);
    setEditFirstName(user.firstName);
    setEditLastName(user.lastName);
    setEditRole(user.role);
    setEditEmail(user.email);
    setEditPhone(user.phoneNo);
    setEditPassword('');
    setEditConfirmPassword('');
    setEditStatus(user.status);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = () => {
    console.log('Saving user:', {
      ...userToEdit,
      name: editFirstName,
      role: editRole,
      email: editEmail,
      phone: editPhone,
      status: editStatus
    });
    setIsEditModalOpen(false);
    setUserToEdit(null);
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };


  if (isLoading || isDeleting || isUpdating) {
    return <Loader />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">{t("Users")}</h1>
          <p className="text-sm text-zinc-500 mt-1">{t("Manage your users")}</p>
        </div>

        <Link
          href="/dashboard/user-management/user/create"
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none cursor-pointer"
        >
          <Button className="flex items-center cursor-pointer" icon={<FiPlus className="w-4 h-4 mr-2" />}>

            {t("Add User")}
          </Button>
        </Link>
      </div>

      <DashboardBreadcrumb items={[{ label: t("User Management") }, { label: t("Users") }]} />



      {/* Filters */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50  p-4 pl-0">
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">

          {/* LEFT: Search */}
          <div className="relative flex-1 max-w-md">
            {/* <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" /> */}
            <Input
              placeholder={t("Search by name, phone, email or role")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-6 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
            />
          </div>

          {/* RIGHT: Filters */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Sort by */}
            {/* <Select
              value={sortBy || ''}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { label: t("Sort By") + ": " + t("Name"), value: "name" },
                { label: t("Sort By") + ": " + t("Created Date"), value: "createdAt" },
              ]}
              className="w-44"
            /> */}

            {/* Status filter (optional but recommended) */}
            <Select
              value={statusFilter as any}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { label: t("All Status"), value: "" },
                { label: t("Active"), value: "active" },
                { label: t("Inactive"), value: "inactive" },
                { label: t("Banned"), value: "banned" },
                { label: t("Blocked"), value: "blocked" },
                // { label: t("Rejected"), value: "rejected" },
              ]}
              className="w-36"
            />

          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableTableHead
                  label={t("sl")}
                  column="sl"
                  activeColumn={sortBy}
                  order={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label={t("User")}
                  column="user"
                  activeColumn={sortBy}
                  order={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label={t("Phone")}
                  column="phone"
                  activeColumn={sortBy}
                  order={sortOrder}
                  onSort={handleSort}
                />
                {/* <SortableTableHead
                  label={t("Email")}
                  column="email"
                  activeColumn={sortBy}
                  order={sortOrder}
                  onSort={handleSort}
                /> */}
                <SortableTableHead
                  label={t("Role")}
                  column="role"
                  activeColumn={sortBy}
                  order={sortOrder}
                  onSort={handleSort}
                />
                <SortableTableHead
                  label={t("Status")}
                  column="status"
                  activeColumn={sortBy}
                  order={sortOrder}
                  onSort={handleSort}
                />
                <TableHead className="text-right min-w-[120px]">{t("Actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.data?.data?.map((user: any, index: any) => (
                <TableRow key={user.id}>
                  {/* <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-semibold">
                        {user?.firstName.charAt(0)}
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">{user.name}</span>
                    </div>
                  </TableCell> */}
                  <TableCell className="font-medium text-[var(--primary)]">{index + 1}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.firstName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white font-semibold uppercase">
                          {user?.firstName?.charAt(0)}
                        </div>
                      )}

                      {/* Name & Email */}
                      <div className="flex flex-col leading-tight">
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">
                          {user?.firstName}
                          {user?.lastName ? ` ${user.lastName}` : ""}
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {user?.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>



                  <TableCell className="text-zinc-600 dark:text-zinc-400">{user?.phoneNo ? user?.phoneNo : "—"}</TableCell>
                  <TableCell className="text-[var(--primary)]">{user?.role}</TableCell>
                  <TableCell>
                    {(() => {
                      const normalizedStatus = user?.status.toLowerCase();

                      const statusConfig =
                        TAG_STATUS_UI[normalizedStatus] || TAG_STATUS_UI.inactive;

                      return (
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-lg ${statusConfig.className}`}
                        >
                          {t(statusConfig.label)}
                        </span>
                      );
                    })()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {/* <button
                        onClick={() => handleViewClick(user)}
                        className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-[var(--primary)] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title={t("View")}
                      >
                        <FiEye className="w-4 h-4" />
                      </button> */}
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
        {users?.data?.meta?.total === 0 && (
          <div className="p-12 text-center">
            <p className="text-zinc-500">{t("No users found")}</p>
          </div>
        )}

      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800 pt-4">

        {/* LEFT: Row per page */}
        <div className="flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap">
          <span className="whitespace-nowrap">
            {t("Row Per Page")}:
          </span>

          <Select
            value={rowsPerPage.toString()}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            options={[
              { label: "10", value: "10" },
              { label: "20", value: "20" },
              { label: "50", value: "50" },
            ]}
            className="w-16 shrink-0"
          />

          <span className="whitespace-nowrap">
            {t("Entries")}
          </span>
        </div>


        {/* RIGHT: Pagination */}
        <div className="flex items-center gap-2">
          {/* previous / pages / next (unchanged) */}
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

      {/* Edit User Modal */}
<Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} size="xl">
  {userToEdit && (
    <Formik
      enableReinitialize
      initialValues={{
        firstName: userToEdit.firstName || "",
        lastName: userToEdit.lastName || "",
        email: userToEdit.email || "",
        role: userToEdit.role || "",
        phone: userToEdit.phoneNo || "",
        password: "",
        confirmPassword: "",
        status: userToEdit.status || "active",
      }}
      validationSchema={toFormikValidationSchema(editUserSchema)}
      onSubmit={(values) => {
        console.log("EDIT SUBMIT DATA =>", values);

        /*
          এখানে তুমি API call দিবা
          updateUser({ id: userToEdit._id, body: values })
        */

        setIsEditModalOpen(false);
        setUserToEdit(null);
      }}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            {t("Edit User")}
          </h3>

          <div className="space-y-4">

            {/* Avatar */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-3xl font-semibold">
                  {values.firstName.charAt(0) || "U"}
                </div>
                <label className="absolute bottom-0 right-0 bg-[var(--primary)] text-white p-2 cursor-pointer">
                  <FiUpload className="w-4 h-4" />
                  <input type="file" className="hidden" />
                </label>
              </div>
            </div>

            {/* First / Last name */}
            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <label className="label">First Name *</label>
                <Field as={Input} name="firstName" />
                <ErrorMessage name="firstName" component="p" className="text-xs text-red-500" />
              </div>

              <div>
                <label className="label">Last Name</label>
                <Field as={Input} name="lastName" />
              </div>
            </div>

            {/* Email */}
            {/* <div>
              <label className="label">Email *</label>
              <Field as={Input} type="email" name="email" />
              <ErrorMessage disabled={true} name="email" component="p" className="text-xs text-red-500" />
            </div> */}
            <div>
  <label className="label">Email *</label>

  <Input
    type="email"
    value={values.email}
    disabled
    className="cursor-not-allowed opacity-70"
  />

  <p className="text-xs text-zinc-500">
    Email cannot be changed
  </p>
</div>


            {/* Role / Phone */}
            <div className="grid md:grid-cols-2 gap-2">
              <div>
                <label className="label">Role *</label>
                <Field
                  as={Select}
                  name="role"
                  options={[
                    { label: "Admin", value: "Admin" },
                    { label: "Manager", value: "Manager" },
                    { label: "Accountant", value: "Accountant" },
                  ]}
                />
              </div>

              <div>
                <label className="label">Phone *</label>
                <Field as={Input} name="phone" />
              </div>
            </div>

            {/* Password */}
            {/* <div className="grid md:grid-cols-2 gap-2">
              <div className="relative">
                <label className="label">Password</label>
                <Field
                  as={Input}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-zinc-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>

              <div className="relative">
                <label className="label">Confirm Password</label>
                <Field
                  as={Input}
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-9 text-zinc-400"
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
                <ErrorMessage name="confirmPassword" component="p" className="text-xs text-red-500" />
              </div>
            </div> */}

            {/* Status */}
            <div>
              <label className="label">Status</label>
              <Field
                as={Select}
                name="status"
                options={[
                  { label: "Active", value: "active" },
                  { label: "Inactive", value: "inactive" },
                  { label: "Pending", value: "pending" },
                ]}
              />
            </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )}
</Modal>
     
    </div>
  );
};

export default UsersPage;















//  <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} size='xl'>
//         <div>
//           <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
//             {t("Edit User")}
//           </h3>

//           <div className="space-y-4">
//             {/* Image Upload */}
//             <div>
//               <div className="flex items-center justify-center w-full relative">
//                 <div className="relative">
//                   <div className="w-24 h-24 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white text-3xl font-semibold">
//                     {editFirstName.charAt(0) || 'U'}
//                   </div>
//                   <label className="absolute bottom-0 right-0 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white p-2 cursor-pointer transition-colors">
//                     <FiUpload className="w-4 h-4" />
//                     <input type="file" className="hidden" accept="image/*" />
//                   </label>
//                 </div>
//               </div>
//               <p className="text-xs text-zinc-500 text-center mt-2">JPEG, PNG up to 2 MB</p>
//             </div>

//             {/* User Name */}
//             <div className='grid md:grid-cols-2 gap-2'>
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("First Name")} <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   value={editFirstName}
//                   onChange={(e) => setEditFirstName(e.target.value)}
//                   placeholder={t("User First Name")}
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Last Name")}
//                 </label>
//                 <Input
//                   value={editLastName}
//                   onChange={(e) => setEditLastName(e.target.value)}
//                   placeholder={t("User last Name")}
//                 />
//               </div>
//             </div>




//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                 {t("Email")} <span className="text-red-500">*</span>
//               </label>
//               <Input
//                 type="email"
//                 value={editEmail}
//                 onChange={(e) => setEditEmail(e.target.value)}
//                 placeholder={t("Email")}
//               />
//             </div>

//             <div className='grid md:grid-cols-2 gap-2'>
//               {/* Role */}
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Role")} <span className="text-red-500">*</span>
//                 </label>
//                 <Select
//                   value={editRole}
//                   onChange={(e) => setEditRole(e.target.value)}
//                   options={[
//                     { label: t("Admin"), value: "Admin" },
//                     { label: t("Manager"), value: "Manager" },
//                     { label: t("Salesman"), value: "Salesman" },
//                     { label: t("Supervisor"), value: "Supervisor" },
//                     { label: t("Store Keeper"), value: "Store Keeper" },
//                     { label: "Purchase", value: "Purchase" },
//                     { label: t("Delivery Biker"), value: "Delivery Biker" },
//                     { label: "Maintenance", value: "Maintenance" },
//                     { label: "Quality Analyst", value: "Quality Analyst" },
//                     { label: t("Accountant"), value: "Accountant" },
//                   ]}
//                 />
//               </div>
//               {/* Phone */}
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Phone")} <span className="text-red-500">*</span>
//                 </label>
//                 <Input
//                   type="tel"
//                   value={editPhone}
//                   onChange={(e) => setEditPhone(e.target.value)}
//                   placeholder={t("Phone")}
//                 />
//               </div>
//             </div>

//             <div className='grid md:grid-cols-2  gap-2'>
//               {/* Password */}
//               <div>
//                 <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                   {t("Password")} <span className="text-red-500">*</span>
//                 </label>
//                 <div className="relative">
//                   <Input
//                     type={showPassword ? "text" : "password"}
//                     value={editPassword}
//                     onChange={(e) => setEditPassword(e.target.value)}
//                     placeholder="••••••••"
//                     className="pr-10"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
//                   >
//                     {showPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="relative">
//                 <Field
//                   id="confirmPassword"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? 'text' : 'password'}
//                   placeholder="••••••••"
//                   className={`w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border ${errors.confirmPassword && touched.confirmPassword
//                     ? 'border-red-500 focus:ring-red-500'
//                     : 'border-zinc-200 dark:border-zinc-700 focus:ring-[var(--brand-start)]'
//                     } text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 transition-all duration-200 pr-10`}
//                 />

//                 <button
//                   type="button"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
//                 >
//                   {showConfirmPassword ? (
//                     <IoIosEyeOff className="w-5 h-5" />
//                   ) : (
//                     <FaRegEye className="w-5 h-5" />
//                   )}
//                 </button>
//               </div>
//             </div>


//             {/* Status */}
//             <div>
//               <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
//                 {t("Status")}
//               </label>
              
//               <Select
//                 label="Status"
//                 options={[
//                   { label: 'Active', value: 'active' },
//                   { label: 'Inactive', value: 'inactive' },
//                   { label: 'Pending', value: 'pending' },
//                 ]}
//                 value={editStatus}
//                 onChange={(e) =>
//                   setEditStatus(e.target.value)
//                 }
//               />
//             </div>

//           </div>

//           <div className="flex gap-3 justify-end mt-6">
//             <Button
//               variant="outline"
//               onClick={() => setIsEditModalOpen(false)}
//               className="bg-zinc-900 text-white hover:bg-zinc-800 border-none px-6"
//             >
//               {t("Cancel")}
//             </Button>
//             <Button
//               onClick={handleSaveEdit}
//               className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-[var(--primary-foreground)] border-none px-6"
//             >
//               {t("Save Changes")}
//             </Button>
//           </div>
//         </div>
//       </Modal>