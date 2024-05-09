import React from 'react';
import styles from '../AdminHeaderButtom/AdminHederButtom.module.css'
import vector from '../../../../public/vector.svg'
import Image from 'next/image';
import CustomButton from '../Button';

interface PROPS {
    Title:String;
    typeTitle?:string;
    addTitle?:string;
    typeButton: boolean;
    addButton: boolean;
    typeButtonFun?: any ;
    addButtonFun?: any ;

}

function AdminHedetbuttom(props:PROPS) {
    let {typeButton,addButton,typeButtonFun,addButtonFun,typeTitle,addTitle ,Title}=props
    return (
        <div className={'adminHeaderbg '+styles.heder}>
            <h2 className={ styles.title}> {Title}</h2>
             <div className={styles.div}>
                <button 
                className={ styles.typeButton  }
                 style={typeButton?{display:'flex'}:{display:'none'}}
                 onClick={typeButtonFun}
                 >
                    {typeTitle}
                     
                     <Image
                        src={vector}
                        alt="My SVG"
                        width={16}
                        height={16}
                    />
                     </button>
                     <div style={addButton?{display:'flex'}:{display:'none'}} >
                     <CustomButton type={'submit'} size={'md'} color={'1'} title={addTitle}  onAction={addButtonFun} icon={true}/>
                     </div>
                    
             </div>
        </div>
    );
}

export default AdminHedetbuttom;