import {useRouter} from "next/router";
import ButtonWeb from "../Button/ButtonWeb";

export default function Auth(){
    let {push}=useRouter()
    return(
        <>
             <ButtonWeb typeButton={true} title={'Sign up'} btnSize={'sm'} addButton={false} />
        </>
    )
}