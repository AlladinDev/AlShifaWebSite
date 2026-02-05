export const P=({text,className}:{text:string,className?:string})=>{
    return (
        <p className={`font ${className}`}>{text}</p>
    )
}