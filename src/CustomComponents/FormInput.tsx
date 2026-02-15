import { Input } from "@/components/ui/input"

type IFormInput = {
    inputType: string,
    value: string,
    name: string,
    error?: string,
    styling?: string,
    label?: string,
    placeHolder?: string,
    changeHandler: (key: string, value: string) => void
}
export const FormInput = (props: IFormInput) => {
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = changeEvent.target
        props.changeHandler(name, value)
    }
    return (
        <div className={`py-4 px-2 ${props.styling}`}>
            {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
            <Input className="border border-gray-400" name={props.name} placeholder={props.placeHolder ? props.placeHolder : ""} value={props.value} onChange={handleChange} />
            {props.error ? <span className="text-red-600">{props.error}</span> : null}
        </div>
    )
}