"use client";
import React from "react";
import clsx from "clsx";

type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
};

const ButtonGroup = ({ children, className, ...rest }: ButtonGroupProps) => {
    return (
        <div className={clsx("inline-flex rounded-md shadow-sm", className)} role="group" {...rest}>
            {React.Children.map(children, (child, index) => {
                if (React.isValidElement<{ className?: string }>(child)) {
                    return React.cloneElement(child, {
                        className: clsx(
                            child.props.className,
                            "rounded-none focus:z-10",
                            index === 0 && "rounded-l-md",
                            index === React.Children.count(children) - 1 && "rounded-r-md",
                            index !== 0 && "-ml-px" // Overlap borders
                        ),
                    });
                }
                return child;
            })}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { ButtonGroup, Button } from "@/components/ui";
 * 
 * <ButtonGroup>
 *   <Button variant="outline">Left</Button>
 *   <Button variant="outline">Middle</Button>
 *   <Button variant="outline">Right</Button>
 * </ButtonGroup>
 */

export default ButtonGroup;
