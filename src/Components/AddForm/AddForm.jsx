const AddForm = ({ onChange, input }) => {
    return (
        <>
            <input type='text' value={input} onChange={onChange} />
        </>
    )
};
export default AddForm;