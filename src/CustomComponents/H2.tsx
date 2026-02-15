export const H2=({text,classNames}:{text:string,classNames?:string})=>{
    return (
        <h2 className={`text-3xl font-extrabold text-gray-900 text-center ${classNames}`}>{text}</h2>
    )
}