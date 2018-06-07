import React, { Component } from "react";
 
var toBeDone = [
  {value:"a", finished: false, starred: false},
  {value:"b", finished: false, starred: false},
  {value:"c", finished: false, starred: false}
];

var done = [
  {value:"d", finished: true, starred: false},
  {value:"e", finished: true, starred: false},
  {value:"f", finished: true, starred: false}
];

var starred = [
  {value:"g", finished: true, starred: true},
  {value:"h", finished: false, starred: true},
  {value:"i", finished: true, starred: true}
];


class App extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.remove = this.remove.bind(this);
    this.move = this.move.bind(this);
    this.state = {
      toBeDone: toBeDone,
      done: done,
      starred: starred
    };
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <form onSubmit={(event) => this.onSubmit(event)}>
            <input ref="submit" placeholder="enter task" />
            <button>add</button>
          </form>
          <h3>Starred</h3>
          <List items={starred} move={this.move} remove={this.remove}/>
          <h3>To Do</h3>
          <List items={toBeDone} move={this.move} remove={this.remove}/>
          <h3>Done</h3>
          <List items={done} move={this.move} remove={this.remove}/>
        </div>
      </div>
    );
  }

  onSubmit(event){
    event.preventDefault();
    toBeDone.unshift({
      index: toBeDone.length, 
      value: this.refs.submit.value, 
      done: false
    });
    this.setState({toBeDone: toBeDone});
  }

  move(index, list1, list2){
    //when star is clicked, move list[index] to list2
    const item = {value:list1[index].value, finished:list1[index].finished, starred:list1[index].starred};
    console.log(item);
    list2.push(item); //{value:item.value, finished:item.finished, starred:item.starred});
    list1.splice(index, 1);
    this.setState({
      list1:list1,
      list2:list2
     });
  }
  remove(index, list){
    //when remove is clicked, simply remove
    list.splice(index, 1);
    this.setState({list: list});
  }
}

class List extends Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
          <Task list={this.props.items} key={index} index={index} item={item} move={this.props.move} remove={this.props.remove}/>
      );
    });
    return (
      <div>{items}</div>
    );
  }
}

class Task extends Component {
  constructor(props){
    super(props);
    this.remove = this.remove.bind(this);
    this.swap = this.swap.bind(this);
    this.star = this.star.bind(this);
    this.getColor = this.getColor.bind(this);
    var newColor = this.getColor(this.props.item.finished);
    this.state = {
      starred: this.props.item.starred,
      finished: this.props.item.finished,
      color: newColor
    };
  }

  render(){
    return(
      <div className = "task">
        <button onClick={() => this.star(this.props.list)}>★</button>
        <span style={{backgroundColor:this.state.color}} onClick={() => this.swap(this.props.list)}>{this.props.item.value}</span>
        <button onClick={() => this.remove(this.props.list)}>X</button>
      </div>
    );
  }

  star(){
    var index = parseInt(this.props.index);
    //if starred and task is not done, move to todo
    if(this.state.starred && !this.state.finished){
      this.props.move(index, starred, toBeDone);
    }
    //if this is starred and task is done, move to done
    else if(this.state.starred)
      this.props.move(index, starred, done);
    //if this is in todo or done, move to starred
    else
      this.props.move(index, this.props.list, starred);
  }

  getColor(fin){
     return fin? "#8bff5e" : "#ff6b63";
  }

  swap(){
    var index = parseInt(this.props.index);
    //if not starred, and finished, move to done
    if(!this.state.starred && this.state.finished){
      console.log("moving to done");
      this.props.move(index, toBeDone, done);
    }
    //if not starred, and not finished, move to todo
    else if(!this.state.starred){
      console.log("moving to todo");
      this.props.move(index, done, toBeDone);
    }
  }

  remove(list){
    var index = parseInt(this.props.index);
    this.props.remove(index, list);
  }
}


export default App;