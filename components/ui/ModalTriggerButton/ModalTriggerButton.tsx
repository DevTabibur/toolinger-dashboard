"use client";
import React from "react";
import Button from "../Button/Button";

type ModalTriggerButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    onOpen: () => void;
    children: React.ReactNode;
    icon?: React.ReactNode;
};

const ModalTriggerButton = ({ onOpen, children, icon, ...rest }: ModalTriggerButtonProps) => {
    return (
        <Button onClick={onOpen} icon={icon} {...rest}>
            {children}
        </Button>
    );
};

/*
 * How to use:
 * 
 * import { ModalTriggerButton } from "@/components/ui";
 * 
 * <ModalTriggerButton onOpen={() => setIsOpen(true)}>
 *   Open Settings
 * </ModalTriggerButton>
 */

export default ModalTriggerButton;
