"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import clsx from "clsx";

type DatePickerProps = {
    value?: Date;
    onChange?: (date: Date) => void;
    label?: string;
    placeholder?: string;
    className?: string;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DatePicker = ({ value, onChange, label, placeholder = "Select date", className }: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (value) {
            setSelectedDate(value);
            setCurrentMonth(value.getMonth());
            setCurrentYear(value.getFullYear());
        }
    }, [value]);

    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentYear, currentMonth, day);
        setSelectedDate(newDate);
        onChange?.(newDate);
        setIsOpen(false);
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div className={clsx("w-full relative", className)} ref={containerRef}>
            {label && (
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:border-zinc-300 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] transition-all"
            >
                <span className={!selectedDate ? "text-zinc-400" : ""}>
                    {selectedDate ? formatDate(selectedDate) : placeholder}
                </span>
                <FiCalendar className="w-4 h-4 text-zinc-500" />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 w-64">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={prevMonth} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full">
                            <FiChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold">
                            {MONTHS[currentMonth]} {currentYear}
                        </span>
                        <button onClick={nextMonth} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full">
                            <FiChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {DAYS.map((day) => (
                            <div key={day} className="text-xs text-center text-zinc-500 font-medium py-1">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                        {Array.from({ length: firstDay }).map((_, i) => (
                            <div key={`empty-${i}`} />
                        ))}
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                            const day = i + 1;
                            const isSelected =
                                selectedDate?.getDate() === day &&
                                selectedDate?.getMonth() === currentMonth &&
                                selectedDate?.getFullYear() === currentYear;
                            const isToday =
                                new Date().getDate() === day &&
                                new Date().getMonth() === currentMonth &&
                                new Date().getFullYear() === currentYear;

                            return (
                                <button
                                    key={day}
                                    onClick={() => handleDateClick(day)}
                                    className={clsx(
                                        "h-8 w-8 text-sm rounded-full flex items-center justify-center transition-colors",
                                        isSelected
                                            ? "bg-[var(--primary)] text-white"
                                            : isToday
                                                ? "bg-zinc-100 dark:bg-zinc-700 text-[var(--primary)] font-semibold"
                                                : "hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                                    )}
                                >
                                    {day}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

/*
 * How to use:
 * 
 * import { DatePicker } from "@/components/ui";
 * 
 * <DatePicker 
 *   label="Start Date" 
 *   onChange={(date) => console.log(date)} 
 * />
 */

export default DatePicker;
