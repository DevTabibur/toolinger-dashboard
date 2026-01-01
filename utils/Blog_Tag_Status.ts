export const TAG_STATUS_UI: Record<
  string,
  { label: string; className: string }
> = {
  active: {
    label: "Active",
    className: "bg-[var(--primary)] dark:bg-[var(--primary-dark)] text-white",
  },
  inactive: {
    label: "Inactive",
    className: "bg-zinc-500 dark:bg-zinc-600 text-white",
  },
  pending: {
    label: "Pending",
    className: "bg-yellow-500 dark:bg-yellow-600 text-black",
  },
  blocked: {
    label: "Blocked",
    className: "bg-red-600 dark:bg-red-700 text-white",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-700 dark:bg-rose-800 text-white",
  },
  banned: {
    label: "Banned",
    className: "bg-rose-700 dark:bg-rose-800 text-white",
  },
};
