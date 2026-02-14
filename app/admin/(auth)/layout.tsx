export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-navy-950 flex flex-col">
            {children}
        </div>
    )
}
