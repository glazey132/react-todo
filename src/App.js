import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
// import uuid from 'uuid';
import axios from 'axios';

import Todos from './components/Todos'
import Header from './components/layouts/Header'
import AddTodo from './components/AddTodo'
import About from './components/pages/About'

class App extends Component {

  state = {
    todos: []
  }

  async componentDidMount() {
    // fetch placeholder todos
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10');
    this.setState({ todos: response.data })
  }

  // mark a todo as complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if(todo.id === id) {
          todo.completed = !todo.completed
        }
        return todo;
      })
    })
  }

  // delete a todo
  deleteTodo = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
    .then(res => this.setState({
      todos: [...this.state.todos.filter(todo => todo.id !== id)]
    }))

  }

  // add a todo
  addTodo = (title) => {
    axios.post('https://jsonplaceholder.typicode.com/todos', {
      title,
      completed: false
    })
    .then(res => this.setState({
      todos: [...this.state.todos, res.data]
    }))

  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/" render={props => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos todos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo}/>
              </React.Fragment>)} />
            <Route path="/about" component={About} />
            </div>
        </div>
      </Router>
    );
  }
}

export default App;
