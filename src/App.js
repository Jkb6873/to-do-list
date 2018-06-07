import React, { Component } from "react";
 
var taskList = [{
  {index:1, value:"start to-do app", finished: false},
  {index:2, value:"add functionality", finished: false},
  {index:3, value:"remove functionality", finished: false}
];

class App extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.remove = this.remove.bind(this);
    this.swap = this.swap.bind(this);
    this.star = this.star.bind(this);
    this.state = {
      taskList: taskList,
      numStarred: 0
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
          <List items={taskList} star={this.star} swap={this.swap} remove={this.remove}/>
        </div>
      </div>
    );
  }

  onSubmit(event){
    event.preventDefault();
    taskList.unshift({
      index: taskList.length+1, 
      value: this.refs.submit.value, 
      done: false
    });
    this.setState({taskList: taskList});
  }

  remove(index){
    taskList.splice(index, 1);
    this.setState({taskList: taskList});
  }
  swap(index){
    taskList[index].finished = !taskList[index].finished;
    this.setState({taskList: taskList});
  }
}
class Starred extends Component {
  render() {
    var items = this.props.items.map((item, index) => {
      return (
          <Task key={index} item={item} index={index} remove={this.props.remove} swap={this.props.swap} />
      );
    });
    return (
      <div>{items}</div>
    );
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
    this.state = {
      starred:false,
      finished:false,
      color:"#ff6b63"
    };
  }
  render(){
    return(
      <div className = "task">
        <button onClick={() => this.star()}>★</button>
        <span style={{backgroundColor:this.state.color}} onClick={() => this.swap()}>{this.props.item.value}</span>
        <button onClick={() => this.remove()}>X</button>
      </div>
    );
  }

  getColor(star, fin){
    if (!star && !fin)
      return "#ff6b63"; //not starred, unfinished, red
    else if (!star && fin)
      return "#8bff5e"; //not starred, finished, green
    else if (star && !fin)
      return "#70ffd6"; //starred, unfinished, blue
    else
      return "#ffda56"; //starred, finished, gold
  }

  star(){
    var newcolor = this.getColor(!this.state.starred, this.state.finished);
    this.setState({
      starred: !this.state.starred,
      color: newcolor
    });
  }


  remove(){
    var index = parseInt(this.props.index);
    console.log("trying to remove ", index);
    this.props.remove(index);
  }

  swap(){
    var index = parseInt(this.props.index);
    var newcolor = this.getColor(this.state.starred, !this.state.finished);
    console.log("swapping at ", index);
    this.setState({
      finished: !this.state.finished, 
      color: newcolor
    });
    this.props.swap(index);
  }
}


export default App;