import { PencilSquare, XCircleFill } from 'react-bootstrap-icons';
import { ListGroup, Col, Row } from 'react-bootstrap';
import './TodoList.css'
const TodoList = ({ todoList, editItem, deleteItem }) => {
    return (
        <ListGroup variant='flush'>
            {todoList.map((todo) => {
                return <ListGroup.Item key={todo.id}>
                    <Row className='li' >
                        <Col>
                            {todo.todo}
                        </Col>
                        <Col className='listIcons'>
                            <PencilSquare className='icons editIcon' onClick={() => editItem(todo)}>Edit</PencilSquare>
                            <XCircleFill className='icons delIcon' onClick={() => deleteItem(todo.id)}>Delete</XCircleFill>
                        </Col>
                    </Row>
                </ListGroup.Item>
            })}
        </ListGroup>
    )
}
export default TodoList;