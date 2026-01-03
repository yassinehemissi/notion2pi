'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../../molecules/theme-toggle';
import { SearchInput } from '../../molecules/search-input';

interface AppHeaderProps {
    showBack?: boolean;
}

export function AppHeader({ showBack = true }: AppHeaderProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    const handleSearch = (value: string) => {
        setSearchQuery(value);
        // You could add debounced search here or just let the molecule handle keyboard shortcut
    };

    const onSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/browse?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            router.push('/browse');
        }
    };

    return (
        <header className="w-full max-w-6xl mx-auto p-6 z-20 flex justify-between items-center">
            {showBack ? (
                <Link
                    href="/"
                    className="group flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white rounded-lg px-2 py-1"
                >
                    <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium tracking-wide uppercase">
                        Back
                    </span>
                </Link>
            ) : (
                <div className="flex items-center gap-2">
                    <Link href="/" className="text-xl font-display font-semibold tracking-tight">
                        Notion2Pi
                    </Link>
                </div>
            )}

            <form onSubmit={onSearchSubmit} className="hidden sm:block w-96">
                <SearchInput
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search formulas..."
                />
            </form>

            <ThemeToggle />
        </header>
    );
}
