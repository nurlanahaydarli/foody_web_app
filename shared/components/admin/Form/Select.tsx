
type SelectType={
    onChange:any,
    title?:string,
    name:string,
    value?:any,
    options?:any[]|undefined
}
export default function Select(SelectType:SelectType) {
    let {onChange,title, name,value,options} = SelectType
    if(value && value?.length>0){

      if(options) {
          let newOption = options.sort((item) => {

              return item.name === value ? -1 : 1

          })
          return (  <>
                  <div className="input_box">
                      <label htmlFor="name">{title}</label>
                      <select name={name} id={name} onChange={onChange}>
                          {newOption?.map((option)=>{

                              return(

                              <option value={option.id}>{option.name}</option>
                          )})}
                      </select>
                  </div>
              </>)
      }


    }
    return (
        <>
            <div className="input_box">
                <label htmlFor="name">{title}</label>
                <select name={name} id={name} onChange={onChange}>
                    {options?.map((option)=>{
                     
                        return(
                        
                        <option value={option.id}>{option.name}</option>
                    )})}
                </select>
            </div>
        </>
    )
}