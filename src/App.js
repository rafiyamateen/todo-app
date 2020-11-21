import React from 'react';
import './App.css';
import AddButton from './Components/AddButton/AddButton';
import AddForm from './Components/AddForm/AddForm'
import TodoList from './Components/TodoList/TodoList'
import EditForm from './Components/EditForm/EditForm'
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      todoList: [],
      input: '',
      id: 0,
      edit: ''
    }
  }
  onChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }
  addItem = () => {
    if (this.state.input) {
      const str = this.state.input,
        title = str[0].toUpperCase() + str.slice(1),
        newItem = [...this.state.todoList];
      newItem.push({ todo: title, id: this.state.id })
      const idVal = this.state.id;
      this.setState({
        todoList: newItem,
        input: '',
        id: idVal + 1,
      })
    }
    else {
      alert('Please enter an item')
    }
  }
  editItem = (todo) => {
    this.setState({
      edit: {
        todo: todo.todo,
        id: todo.id
      }
    })
  }
  deleteItem = (id) => {
    const newList = this.state.todoList.filter(todo => todo.id !== id)
    this.setState({
      todoList: newList
    })
  }
  update = (toEdit) => {
    const string = toEdit.todo,
      firstCap = string[0].toUpperCase() + string.slice(1),
      updateItem = this.state.todoList.map(todo => (todo.id === toEdit.id ? { todo: firstCap, id: toEdit.id } : todo))
    this.setState({
      todoList: updateItem,
      edit: ''
    })
  }
  onEdit = (e) => {
    this.setState({
      edit: {
        todo: e.target.value,
        id: this.state.edit.id
      }
    })
  }
  render() {
    return (
      <div className='appContainer'>
        <h1 className='head'> TODO APP</h1>
        {
          this.state.edit ?
            <EditForm edit={this.state.edit} onChange={this.onEdit} update={this.update} /> :
            <div>
              <AddForm onChange={this.onChange} input={this.state.input} />
              <AddButton addItem={this.addItem} />
            </div>
        }
        { this.state.todoList[0] ?
          <TodoList todoList={this.state.todoList} deleteItem={this.deleteItem} editItem={this.editItem} />
          : null
        }
      </div >
    );
  }
};

export default App;
