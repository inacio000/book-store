
function Container({
    className,
    children,
    id,
}: {
    className?: string;
    id?: string;
    children?: React.ReactNode;
}) {
    return (
        <section
            id={id}
            className={`w-full bg-[var(--secondary-bg)] rounded-2xl text-[var(--text-color)] ${className}`}
        >
            {children}
        </section>
    )
}

export default Container;