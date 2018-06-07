import React, { Component } from "react";
 
var toBeDone = [];

class App extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.remove = this.remove.bind(this);
    this.state = {
      toBeDone: toBeDone,
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
          <h3>To Do</h3>
          <List items={toBeDone} swap={this.swap} remove={this.remove}/>
        </div>
      </div>
    );
  }

  onSubmit(event){
    event.preventDefault();
    toBeDone.push({
      index: toBeDone.length, 
      value: this.refs.submit.value, 
      done: false
    });
    this.setState({toBeDone: toBeDone});
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
          <Task item={item} list={this.props.items} key={index} index={index} starred={false} move={this.props.move} remove={this.props.remove}/>
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
    this.getColor = this.getColor.bind(this);
    this.state = {
      starred: false,
      finished: false,
      color: "#ff6b63"
    };
  }

  render(){
    return(
      <div className = "task">
        <div className={this.state.starred? "fas fa-star" : "far fa-star"} onClick={() => this.star()}/>
        <span style={{backgroundColor:this.state.color}} onClick={() => this.swap(this.props.list)}>{this.props.item.value}</span>
        <button onClick={() => this.remove(this.props.list)}>X</button>
      </div>
    );
  }

  getColor(fin){
     return fin? "#8bff5e" : "#ff6b63";
  }
  
  star(){
    this.setState({starred: !this.state.starred});
    this.className = this.state.starred? "fas fa-star" : "far fa-star";
    console.log(this.state.starred);
  }

  swap(){
    //var index = parseInt(this.props.index);
    this.setState({finished: !this.state.finished, color:this.getColor(!this.state.finished)});
  }

  remove(list){
    var index = parseInt(this.props.index);
    this.props.remove(index, list);
  }
}


export default App;