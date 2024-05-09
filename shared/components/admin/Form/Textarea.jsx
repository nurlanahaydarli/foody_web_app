export default function Textarea({title, name, value, limit}) {
    return (
        <>
            <div className="input_box">
                <label htmlFor="name">{title}</label>
                <textarea
                    id={name}
                    value={value}
                    maxlength={limit}
                />
            </div>
        </>
    )
}