"use client";
import React from "react";
import clsx from "clsx";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    noPadding?: boolean;
};

const Card = ({ children, className, noPadding = false, ...rest }: CardProps) => {
    return (
        <div
            className={clsx(
                "bg-white dark:bg-[var(--card)] border border-zinc-200 dark:border-zinc-800  shadow-sm overflow-hidden",
                !noPadding && "p-6",
                className
            )}
            {...rest}
        >
            {children}
        </div>
    );
};

const CardHeader = ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx("px-6 py-4 border-b border-zinc-100 dark:border-zinc-800", className)} {...rest}>
        {children}
    </div>
);

const CardBody = ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx("p-6", className)} {...rest}>
        {children}
    </div>
);

const CardFooter = ({ children, className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className={clsx("px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800", className)} {...rest}>
        {children}
    </div>
);

/*
 * How to use:
 * 
 * import { Card, CardHeader, CardBody, CardFooter } from "@/components/ui";
 * 
 * <Card noPadding>
 *   <CardHeader>
 *     <h3 className="font-semibold">Card Title</h3>
 *   </CardHeader>
 *   <CardBody>
 *     <p>Card content goes here.</p>
 *   </CardBody>
 *   <CardFooter>
 *     <Button>Action</Button>
 *   </CardFooter>
 * </Card>
 */

export { Card, CardHeader, CardBody, CardFooter };
export default Card;
