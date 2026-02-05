export const H1 = ({ text, className }: { text: string, className?: string }) => {
    return (
        <h1 className={`text-[62px]  font-semibold text-black ${className}`}>{text}</h1>
    )
}