export default function Input({title, name, type,value}) {
    return (
        <>
            <div className="input_box">
                <label htmlFor="name">{title}</label>
                <input type={type} id={name} value={value} />
            </div>
        </>
    )
}