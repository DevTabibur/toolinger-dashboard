"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiCalendar, FiChevronLeft, FiChevronRight, FiClock, FiCheck } from "react-icons/fi";
import clsx from "clsx";

type DatePickerProps = {
    value?: Date;
    onChange?: (date: Date) => void;
    label?: string;
    placeholder?: string;
    className?: string;
    showTime?: boolean;
};

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DatePicker = ({ value, onChange, label, placeholder = "Select date", className, showTime = false }: DatePickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    // Time state
    const [selectedHour, setSelectedHour] = useState(value ? value.getHours() : 12);
    const [selectedMinute, setSelectedMinute] = useState(value ? value.getMinutes() : 0);

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
            setSelectedHour(value.getHours());
            setSelectedMinute(value.getMinutes());
        }
    }, [value]);

    const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (month: number, year: number) => new Date(year, month, 1).getDay();

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentYear, currentMonth, day, selectedHour, selectedMinute);
        setSelectedDate(newDate);
        onChange?.(newDate);
        if (!showTime) {
            setIsOpen(false);
        }
    };

    const handleTimeChange = (type: 'hour' | 'minute', val: number) => {
        let newHour = selectedHour;
        let newMinute = selectedMinute;

        if (type === 'hour') {
            newHour = Math.max(0, Math.min(23, val));
            setSelectedHour(newHour);
        } else {
            newMinute = Math.max(0, Math.min(59, val));
            setSelectedMinute(newMinute);
        }

        if (selectedDate) {
            const newDate = new Date(selectedDate);
            newDate.setHours(newHour);
            newDate.setMinutes(newMinute);
            setSelectedDate(newDate);
            onChange?.(newDate);
        }
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
        const dateStr = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        if (showTime) {
            const timeStr = date.toLocaleTimeString("en-US", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            return `${dateStr} at ${timeStr}`;
        }

        return dateStr;
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
                <div className="absolute z-50 mt-2 p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 w-72 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={prevMonth} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors">
                            <FiChevronLeft className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold">
                            {MONTHS[currentMonth]} {currentYear}
                        </span>
                        <button onClick={nextMonth} className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded-full transition-colors">
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
                                    type="button"
                                    onClick={() => handleDateClick(day)}
                                    className={clsx(
                                        "h-8 w-8 text-sm rounded-full flex items-center justify-center transition-all",
                                        isSelected
                                            ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
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

                    {showTime && (
                        <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700">
                            <div className="flex items-center gap-2 mb-3">
                                <FiClock className="w-3.5 h-3.5 text-zinc-500" />
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Time</span>
                            </div>
                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 flex-1">
                                    <input
                                        type="number"
                                        min="0"
                                        max="23"
                                        value={selectedHour.toString().padStart(2, '0')}
                                        onChange={(e) => handleTimeChange('hour', parseInt(e.target.value) || 0)}
                                        className="w-full p-2 text-center text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none"
                                    />
                                    <span className="text-zinc-400 font-bold">:</span>
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={selectedMinute.toString().padStart(2, '0')}
                                        onChange={(e) => handleTimeChange('minute', parseInt(e.target.value) || 0)}
                                        className="w-full p-2 text-center text-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md focus:ring-2 focus:ring-[var(--primary)]/20 focus:border-[var(--primary)] outline-none"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-3 py-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white rounded-md text-xs font-medium transition-colors"
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    )}
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
 *   showTime={true} // Optional: Enable time selection
 * />
 */

export default DatePicker;
