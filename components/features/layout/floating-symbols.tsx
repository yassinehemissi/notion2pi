'use client';

import * as React from 'react';

const floatingSymbols = [
    { symbol: '∫', size: 'text-6xl', position: 'top-10 left-10', delay: '' },
    { symbol: 'e=mc²', size: 'text-4xl', position: 'bottom-20 right-20', delay: '5s' },
    { symbol: '∑', size: 'text-5xl', position: 'top-1/4 right-1/4', delay: '' },
    { symbol: '√x', size: 'text-3xl', position: 'bottom-1/3 left-1/4', delay: '5s' },
    { symbol: 'π', size: 'text-7xl', position: 'top-1/2 left-10', delay: '' },
    { symbol: 'Δ', size: 'text-5xl', position: 'top-1/3 left-1/3', delay: '3s' },
    { symbol: '∞', size: 'text-6xl', position: 'bottom-1/4 right-1/3', delay: '' },
    { symbol: 'α', size: 'text-4xl', position: 'top-2/3 right-1/4', delay: '5s' },
];

export function FloatingSymbols() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
            {floatingSymbols.map((item, index) => (
                <div
                    key={index}
                    className={`absolute ${item.size} ${item.position} text-gray-200 dark:text-gray-800 opacity-20 font-display ${item.delay ? 'animate-float-delayed' : 'animate-float'
                        }`}
                    style={{ animationDelay: item.delay || '0s' }}
                >
                    {item.symbol}
                </div>
            ))}
        </div>
    );
}
