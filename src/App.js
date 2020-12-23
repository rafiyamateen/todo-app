import React from 'react';
import './App.css';
import AddButton from './Components/AddButton/AddButton';
import AddForm from './Components/AddForm/AddForm'
import TodoList from './Components/TodoList/TodoList'
import EditForm from './Components/EditForm/EditForm'
import UpdateBtn from './Components/UpdateBtn/UpdateBtn'
import { Alert } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      todoList: JSON.parse(localStorage.getItem('todoList')) || [],
      id: JSON.parse(localStorage.getItem('id')) || 0,
      input: {
        todo: ''
      },
      edit: false,
      alert: false
    }
  }

  onChange = (e) => {
    this.setState({
      input: {
        todo: e.target.value
      },
      alert: false
    })
  }

  addItem = () => {
    if (this.state.input.todo) {
      const str = this.state.input.todo,
        title = str[0].toUpperCase() + str.slice(1),
        newList = [...this.state.todoList];
      newList.push({ todo: title, id: this.state.id })
      this.setState({
        todoList: newList,
        input: { todo: '' },
        id: this.state.id + 1,
      })
      localStorage.setItem('id', JSON.stringify(this.state.id + 1))
      localStorage.setItem('todoList', JSON.stringify(newList))
    }
    else {
      this.setState({
        alert: true
      })
    }
  }

  editItem = (todo) => {
    this.setState({
      input: {
        todo: todo.todo,
        id: todo.id
      },
      edit: true
    })
  }

  deleteItem = (id) => {
    const filteredList = this.state.todoList.filter(todo => todo.id !== id)
    this.setState({
      todoList: filteredList
    })
    localStorage.setItem('todoList', JSON.stringify(filteredList))
    if (!JSON.parse(localStorage.getItem('todoList'))[0]) {
      localStorage.setItem('id', JSON.stringify(0))
      this.setState({
        id: 0
      })
    }
  }

  update = (toEdit) => {
    if (this.state.input.todo) {
      const string = toEdit.todo,
        firstCap = string[0].toUpperCase() + string.slice(1),
        updateItem = this.state.todoList.map(todo => (todo.id === toEdit.id ? { todo: firstCap, id: toEdit.id } : todo))
      this.setState({
        todoList: updateItem,
        input: {
          todo: ''
        },
        edit: false
      })
      localStorage.setItem('todoList', JSON.stringify(updateItem))
    }
    else {
      this.setState({
        alert: true
      })
    }
  }

  onEdit = (e) => {
    this.setState({
      input: {
        todo: e.target.value,
        id: this.state.input.id
      },
      alert: false
    })
  }
  componentDidMount() {
    document.getElementById('addForm').focus();
  }
  componentDidUpdate() {
    if (this.state.edit) {
      document.getElementById('editForm').focus();
    }
    else {
      document.getElementById('addForm').focus();
    }
  }

  render() {
    return (
      <div className='appContainer'>
        <h2 className='head'> TODO APP</h2>
        <Alert id='alert' show={this.state.alert} variant='dark'>
          Please enter an item!
        </Alert>
        <div className='addSec'>
          {
            this.state.edit ?
              <>
                <EditForm input={this.state.input} onChange={this.onEdit} />
                <UpdateBtn input={this.state.input} update={this.update} />
              </> :
              <>
                <AddForm onChange={this.onChange} input={this.state.input} />
                <AddButton addItem={this.addItem} />
              </>
          }
        </div>
        { JSON.parse(localStorage.getItem('todoList')) ?
          <TodoList todoList={JSON.parse(localStorage.getItem('todoList'))} deleteItem={this.deleteItem} editItem={this.editItem} />
          : null
        }
      </div >
    )
  }
}
export default App;