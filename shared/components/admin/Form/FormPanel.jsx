import styles from "./form.module.css";
import UploadSvg from "../svg/UploadSvg";
import Input from "./Input";
import Textarea from "./Textarea";
import Select from "./Select";
import {Form} from "./Form";
let category = [
    {id: 1, title: 'Category1'},
    {id: 1, title: 'Category1'},
    {id: 1, title: 'Category1'},
    {id: 1, title: 'Category1'}
]
const Form1 = ({onClose, isOpen}) => {
    return (
        <>
            <Form onClose={onClose} isOpen={isOpen}  />
        </>
    )
}
export default Form1;