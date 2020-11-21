import './AddButton.css'
import { PlusCircleFill } from 'react-bootstrap-icons';
const AddButton = ({ addItem }) => {
    return <PlusCircleFill className='icons addIcon' onClick={addItem} ></PlusCircleFill>
}
export default AddButton;