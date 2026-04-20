import { Input } from "@/components/ui/input"

type IFormInput = {
    inputType: string,
    value: string,
    name: string,
    error?: string,
    styling?: string,
    label?: string,
    icon?: React.ReactNode,
    placeHolder?: string,
    changeHandler: ({ key, value }: { key: string, value: string }) => void
}
export const FormInput = (props: IFormInput) => {
    const handleChange = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = changeEvent.target
      
        props.changeHandler({ key: name, value: value })
    }

    return (
        <div className={`relative py-3 px-2 ${props.styling}`}>
            <div className="relative">
                {props.label ? <label htmlFor={props.name}>{props.label}</label> : null}
                {props.icon ? <span className="absolute left-3 top-[52%]  text-gray-400">
                    {props.icon}
                </span> : null}
                <Input className="pl-9 mb-2 border border-gray-400" name={props.name} placeholder={props.placeHolder ? props.placeHolder : ""} value={props.value} onChange={handleChange} />
            </div>
            {props.error ? <span className="text-red-600">{props.error}</span> : null}

        </div>
    )
}