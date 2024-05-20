import { useEffect, useState } from "react";

type inputTypes = {
    title: string;
    input_name: string;
    type:string;
    value?:string;
    hasLabel:boolean
    name?:string
    Ref? : any
}
export default function Input(props: inputTypes) {
    let {title, input_name, type, value='',Ref, hasLabel = true} = props
    let [inpval,setinpval]=useState('')
    useEffect(()=>setinpval(value),[])
    return(
        <>
            <div className="input_box">
                {hasLabel && <label htmlFor="name">{title}</label>}
                <input ref={Ref} type={type} id={input_name} value={inpval} placeholder={title} onChange={(e)=>{setinpval(e.target.value)
                }}/>
            </div>
        </>
    )
}
