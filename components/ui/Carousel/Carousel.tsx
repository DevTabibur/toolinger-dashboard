"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";

type CarouselProps = {
    children: React.ReactNode;
    width?: string;
    height?: string;
    showControls?: boolean;
    showIndicators?: boolean;
    autoPlay?: boolean;
    interval?: number;
    className?: string;
};

const Carousel = ({
    children,
    width = "w-full",
    height = "h-64",
    showControls = true,
    showIndicators = true,
    autoPlay = false,
    interval = 5000,
    className,
}: CarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const count = React.Children.count(children);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % count);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + count) % count);
    };

    useEffect(() => {
        if (autoPlay) {
            timeoutRef.current = setTimeout(next, interval);
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [currentIndex, autoPlay, interval]);

    return (
        <div className={clsx("relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800", width, height, className)}>
            <div
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {React.Children.map(children, (child) => (
                    <div className="w-full h-full shrink-0 flex items-center justify-center">
                        {child}
                    </div>
                ))}
            </div>

            {showControls && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-zinc-800 dark:text-zinc-200 shadow-sm transition-colors"
                    >
                        <FiChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-zinc-800 dark:text-zinc-200 shadow-sm transition-colors"
                    >
                        <FiChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {showIndicators && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: count }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={clsx(
                                "w-2.5 h-2.5 rounded-full transition-colors",
                                index === currentIndex ? "bg-white" : "bg-white/50 hover:bg-white/75"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { Carousel } from "@/components/ui";
 * 
 * <Carousel>
 *   <img src="..." className="w-full h-full object-cover" />
 *   <div className="w-full h-full bg-blue-500 text-white flex items-center justify-center">Slide 2</div>
 * </Carousel>
 */

export default Carousel;
