'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useRef, useEffect } from 'react';

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    showShortcut?: boolean;
}

export function SearchInput({
    value,
    onChange,
    placeholder = "Search formulas...",
    className = "",
    showShortcut = true
}: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className={`relative group ${className}`}>
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 dark:text-gray-500 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
            </div>
            <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-10 pr-16 bg-gray-100 dark:bg-white/5 border-transparent focus:bg-white dark:focus:bg-black/40 focus:ring-2 focus:ring-black dark:focus:ring-white rounded-xl glass-panel"
            />
            {showShortcut && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-xs text-gray-400 dark:text-gray-600 border border-gray-300 dark:border-gray-700 rounded px-1.5 py-0.5">
                        ⌘K
                    </span>
                </div>
            )}
        </div>
    );
}
