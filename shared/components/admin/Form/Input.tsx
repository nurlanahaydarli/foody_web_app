
type inputTypes = {
    title: string;
    input_name: string;
    type:string;
    value?:string;
    hasLabel:boolean
    name?:string
}
export default function Input(props: inputTypes) {
    let {title, input_name, type, value, hasLabel = true} = props
    return(
        <>
            <div className="input_box">
                {hasLabel && <label htmlFor="name">{title}</label>}
                <input type={type} id={input_name} value={value} placeholder={title}/>
            </div>
        </>
    )
}
