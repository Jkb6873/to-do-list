import React, { Component } from "react";
 
var taskList = [];
taskList.push({index:1, value:"start to-do app", finished: false});
taskList.push({index:2, value:"add functionality", finished: false});
taskList.push({index:3, value:"remove functionality", finished: false});

class App extends Component {
  constructor(props){
    super(props);
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.swap = this.swap.bind(this);
    this.state = {taskList: taskList};
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input placeholder="enter task">
            </input>
            <button type="submit">add</button>
          </form>
          <List items={taskList} swap={this.swap} remove={this.remove}/>
        </div>
      </div>
    );
  }

  add(task){
    taskList.unshift({
      index: taskList.length+1, 
      value: task.newItemValue, 
      done: false
    });
    this.setState({todoItems: todoItems});
  }

  remove(index){
    taskList.splice(index, 1);
  }
  swap(index){
    taskList.splice(index, 1);
  }
}

class List extends Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
        <Task key={index} item={item} index={index} remove={this.props.remove} swap={this.props.swap} />
      );
    });
    return (
      <ul> {items} </ul>
    );
  }
}

class Task extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this);
    this.swap = this.swap.bind(this);
  }
  render(){
    return(
      <li>
        <div>
          <button onClick={this.swap()}>Done?</button>
          {this.props.item.value}
          <button onClick={this.remove()}>X</button>
        </div>
      </li>
    );
  }
  remove(){
    var index = parseInt(this.props.index);
    console.log("trying to remove ", index);
    this.props.remove(index);
  }

  swap(){
    var index = parseInt(this.props.index);
    console.log("swapping at ", index);
    this.props.swap(index);
  }
}


export default App;














/*

  
class TodoListItem extends React.Component {
  constructor(props) {
    super(props);
    this.onClickClose = this.onClickClose.bind(this);
    this.onClickDone = this.onClickDone.bind(this);
  }
  onClickClose() {
    var index = parseInt(this.props.index);
    this.props.removeItem(index);
  }
  onClickDone() {
    var index = parseInt(this.props.index);
    this.props.markTodoDone(index);
  }
  render () {
    var todoClass = this.props.item.done ? 
        "done" : "undone";
    return(
      <li className="list-group-item ">
        <div className={todoClass}>
          <span className="glyphicon glyphicon-ok icon" aria-hidden="true" onClick={this.onClickDone}></span>
          {this.props.item.value}
          <button type="button" className="close" onClick={this.onClickClose}>&times;</button>
        </div>
      </li>     
    );
  }
}

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    this.refs.itemName.focus();
  }
  onSubmit(event) {
    event.preventDefault();
    var newItemValue = this.refs.itemName.value;
    
    if(newItemValue) {
      this.props.addItem({newItemValue});
      this.refs.form.reset();
    }
  }
  render () {
    return (
      <form ref="form" onSubmit={this.onSubmit} className="form-inline">
        <input type="text" ref="itemName" className="form-control" placeholder="add a new todo..."/>
        <button type="submit" className="btn btn-default">Add</button> 
      </form>
    );   
  }
}
  
class TodoHeader extends React.Component {
  render () {
    return <h1>Todo list</h1>;
  }
}
  
class TodoApp extends React.Component {
  constructor (props) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.markTodoDone = this.markTodoDone.bind(this);
    this.state = {todoItems: todoItems};
  }
  addItem(todoItem) {
    todoItems.unshift({
      index: todoItems.length+1, 
      value: todoItem.newItemValue, 
      done: false
    });
    this.setState({todoItems: todoItems});
  }
  removeItem (itemIndex) {
    todoItems.splice(itemIndex, 1);
    this.setState({todoItems: todoItems});
  }
  markTodoDone(itemIndex) {
    var todo = todoItems[itemIndex];
    todoItems.splice(itemIndex, 1);
    todo.done = !todo.done;
    todo.done ? todoItems.push(todo) : todoItems.unshift(todo);
    this.setState({todoItems: todoItems});  
  }
  render() {
    return (
      <div id="main">
        <TodoHeader />
        <TodoList items={this.props.initItems} removeItem={this.removeItem} markTodoDone={this.markTodoDone}/>
        <TodoForm addItem={this.addItem} />
      </div>
    );
  }
}

ReactDOM.render(<TodoApp initItems={todoItems}/>, document.getElementById('app'));

*/