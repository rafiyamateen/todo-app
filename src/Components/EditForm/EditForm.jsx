import './EditForm.css'
const EditForm = ({ edit, update, onChange }) => {
    return (
        <div>
            <input value={edit.todo} onChange={onChange} />
            <button className='updateBtn' onClick={() => { update(edit) }}>Update</button>
        </div>
    )
}

export default EditForm
