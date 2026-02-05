export const Para=({text,className,icon}:{text:string,className:string,icon?:React.ReactNode})=>{
    return (
        <span  className={`text-[16px] font-bold ${className}`}>{icon} {text}</span>
    )
}