export default function Select({ onChange,title, name,value,options=[]}) {
    return (
        <>
            <div className="input_box">
                <label htmlFor="name">{title}</label>
                <select name={name} id={name} onChange={onChange}>
                    {options?.map((option)=>(
                        <option value={option.id}>{option.name}</option>
                    ))}
                </select>
            </div>
        </>
    )
}