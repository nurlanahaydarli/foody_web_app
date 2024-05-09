export default function Select({title, name,value,options=[]}) {
    return (
        <>
            <div className="input_box">
                <label htmlFor="name">{title}</label>
                <select name={name} id={name}>
                    {options?.map((option)=>(
                        <option value={option.id}>{option.title}</option>
                    ))}
                </select>
            </div>
        </>
    )
}