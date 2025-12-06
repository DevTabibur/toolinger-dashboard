"use client";
import React from "react";
import clsx from "clsx";

type TableProps = React.TableHTMLAttributes<HTMLTableElement> & {
    children: React.ReactNode;
};

const Table = ({ children, className, ...rest }: TableProps) => {
    return (
        <div className="w-full overflow-x-auto">
            <table className={clsx("w-full text-left border-collapse", className)} {...rest}>
                {children}
            </table>
        </div>
    );
};

const TableHeader = ({ children, className, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={clsx("bg-zinc-50 dark:bg-zinc-800/50 border-b border-zinc-200 dark:border-zinc-700", className)} {...rest}>
        {children}
    </thead>
);

const TableBody = ({ children, className, ...rest }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={clsx("divide-y divide-zinc-200 dark:divide-zinc-700", className)} {...rest}>
        {children}
    </tbody>
);

const TableRow = ({ children, className, ...rest }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={clsx("hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors", className)} {...rest}>
        {children}
    </tr>
);

const TableHead = ({ children, className, ...rest }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
    <th className={clsx("px-6 py-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider", className)} {...rest}>
        {children}
    </th>
);

const TableCell = ({ children, className, ...rest }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
    <td className={clsx("px-6 py-4 text-sm text-zinc-700 dark:text-zinc-300", className)} {...rest}>
        {children}
    </td>
);

/*
 * How to use:
 * 
 * import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui";
 * 
 * <Table>
 *   <TableHeader>
 *     <TableRow>
 *       <TableHead>Name</TableHead>
 *       <TableHead>Role</TableHead>
 *     </TableRow>
 *   </TableHeader>
 *   <TableBody>
 *     <TableRow>
 *       <TableCell>John Doe</TableCell>
 *       <TableCell>Admin</TableCell>
 *     </TableRow>
 *   </TableBody>
 * </Table>
 */

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
export default Table;
