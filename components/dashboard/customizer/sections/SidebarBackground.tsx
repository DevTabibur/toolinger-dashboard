'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSidebarBackground } from '@/redux/slices/ui.slice';
import { FiCheck } from 'react-icons/fi';
import Image from 'next/image';

// Using placeholder images for now, or we can use colors/gradients if images aren't available
// Ideally these would be actual image paths
const backgrounds = [
    { id: '1', color: '#1f2937' }, // Placeholder for image 1
    { id: '2', color: '#111827' }, // Placeholder for image 2
    { id: '3', color: '#374151' }, // Placeholder for image 3
    { id: '4', color: '#4b5563' }, // Placeholder for image 4
    { id: '5', color: '#6b7280' }, // Placeholder for image 5
    { id: '6', color: '#9ca3af' }, // Placeholder for image 6
];

const SidebarBackground = () => {
    const dispatch = useDispatch();
    const currentBg = useSelector((state: RootState) => state.ui.sidebarBackground);

    return (
        <div className="grid grid-cols-3 gap-2 pt-4">
            {backgrounds.map((bg) => (
                <button
                    key={bg.id}
                    onClick={() => dispatch(setSidebarBackground(bg.id))}
                    className="relative w-full h-16 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 group"
                    style={{ backgroundColor: bg.color }}
                >
                    {/* In a real app, this would be an <Image /> component */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                        {currentBg === bg.id && (
                            <div className="bg-white rounded-full p-1">
                                <FiCheck className="w-3 h-3 text-blue-600" />
                            </div>
                        )}
                    </div>
                </button>
            ))}
        </div>
    );
};

export default SidebarBackground;
