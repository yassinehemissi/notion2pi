interface AppFooterProps {
    className?: string;
}

export function AppFooter({ className = "" }: AppFooterProps) {
    return (
        <footer className={`w-full text-center py-6 z-10 ${className}`}>
            <a target="_blank" href="https://myh-bice.vercel.app/" className="cursor-pointer text-xs text-gray-400 dark:text-gray-600 font-medium tracking-wider uppercase opacity-60 hover:opacity-100 transition-opacity cursor-default">
                Notion2Pi © 2026 — By <span className="text-primary">MYH</span>
            </a>
        </footer>
    );
}
