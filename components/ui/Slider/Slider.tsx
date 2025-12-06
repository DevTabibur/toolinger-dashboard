"use client";
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

type SliderProps = {
    value?: number;
    min?: number;
    max?: number;
    step?: number;
    onChange?: (value: number) => void;
    className?: string;
};

const Slider = ({ value = 0, min = 0, max = 100, step = 1, onChange, className }: SliderProps) => {
    const [localValue, setLocalValue] = useState(value);
    const sliderRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleInteract = (clientX: number) => {
        if (!sliderRef.current) return;
        const rect = sliderRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.min(100, Math.max(0, (x / rect.width) * 100));
        const rawValue = min + (percentage / 100) * (max - min);
        // Snap to step
        const steppedValue = Math.round(rawValue / step) * step;
        const clampedValue = Math.min(max, Math.max(min, steppedValue));

        setLocalValue(clampedValue);
        onChange?.(clampedValue);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        isDragging.current = true;
        handleInteract(e.clientX);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging.current) {
                handleInteract(e.clientX);
            }
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const percentage = ((localValue - min) / (max - min)) * 100;

    return (
        <div
            ref={sliderRef}
            className={clsx("relative w-full h-6 flex items-center cursor-pointer select-none", className)}
            onMouseDown={handleMouseDown}
        >
            <div className="absolute w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                <div className="h-full bg-[var(--primary)]" style={{ width: `${percentage}%` }} />
            </div>
            <div
                className="absolute w-5 h-5 bg-white border-2 border-[var(--primary)] rounded-full shadow-md transition-transform active:scale-110"
                style={{ left: `calc(${percentage}% - 10px)` }}
            />
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Slider } from "@/components/ui";
 * 
 * <Slider value={50} onChange={(val) => console.log(val)} />
 */

export default Slider;
