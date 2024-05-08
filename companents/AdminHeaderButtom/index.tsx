import React from 'react';
import styles from '../AdminHeaderButtom/AdminHederButtom.module.css'
import vector from '../../public/vector.svg'
import Image from 'next/image';

interface PROPS {
    typeTitle?:string;
    addTitle?:string;
    typeButton: boolean;
    addButton: boolean;
    typeButtonFun?: any ;
    addButtonFun?: any ;

}

function AdminHedetbuttom(props:PROPS) {
    let {typeButton,addButton,typeButtonFun,addButtonFun,typeTitle,addTitle}=props
    return (
        <div className={'adminHeaderbg '+styles.heder}>
            <h2 className={ styles.title}> Category</h2>
             <div className='flex  justify-between  '>
                <button 
                className={ styles.typeButton  }
                 style={typeButton?{display:'flex'}:{display:'none'}}
                 onClick={typeButtonFun}
                 >
                    {typeTitle}
                     
                     <Image
                        src={vector}
                        alt="My SVG"
                        width={13}
                        height={24}
                    />
                     </button>
                     <button
                      className={ styles.typeButton} 
                      style={addButton?{display:'flex'}:{display:'none'}}
                      onClick={addButtonFun}
                      >
                    {addTitle}
                     
                     <Image
                        src={vector}
                        alt="My SVG"
                        width={13}
                        height={24}
                    />
                     </button>
                    
             </div>
        </div>
    );
}

export default AdminHedetbuttom;