import React from 'react';
import './index.css';
import { Todoitem } from '../todoitem';
import { Doneitem } from '../doneitem'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ToDoItems: [], todo: "", DownItems: [] };
    this.handleToSubmit = this.handleToSubmit.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleToDown = this.handleToDown.bind(this);
    this.handleToDelete = this.handleToDelete.bind(this)
  }
  handleToChange(e) {
    var todo = { 'title': e.target.value, "done": false };
    this.setState({ todo: todo })
  }
  handleToSubmit(e) {
    e.preventDefault();
    e.target.reset();
    var arr = [...this.state.ToDoItems]
    arr.push(this.state.todo)
    this.setState((_todo) => ({
      ToDoItems: arr
    }))
  }
  handleToDown(status,e) {
    var Eindex = e.target.className
    var arr = status === "todo" ? this.state.ToDoItems : this.state.DownItems
    var brr = status === "todo" ? this.state.DownItems : this.state.ToDoItems
    arr.map((_item, index) => {
      if (Eindex === index.toString() && arr[Eindex] === arr[index]) {
        brr.push(arr[index])
        arr.splice(index, 1)
        if(status === "todo"){
          this.setState(() => ({
            DownItems: brr,
            ToDoItems: arr
          }))
        }else{
          this.setState(() => ({
            DownItems: arr,
            ToDoItems: brr
          }))
        }
      }
    return true
    })
  }
  handleToDelete(status,e) {
    var Eindex = e.target.className
    var arr = status === "todo" ? this.state.ToDoItems : this.state.DownItems
    arr.map((_item, index) => {
      if (Eindex === index.toString() && arr[Eindex] === arr[index]) {
        arr.splice(index, 1)
        if(status === "todo"){
          this.setState(() => ({
          ToDoItems: arr
        }))
        }else{
          this.setState(() => ({
            Doneitem: arr
          }))
        }  
      }
      return false
    })
  }
  render() {

    return (
      <div>
        <header>
          <section>
            <form onSubmit={this.handleToSubmit} id="form">
              <label htmlFor="title">ToDoList</label>
              <input type="text" id="title" name="title" placeholder="添加ToDo" required="required"
                autoComplete="off" onChange={this.handleToChange} />
            </form>
          </section>
        </header>
        <section>
          <h2>正在进行 <span id="todocount">{this.state.ToDoItems.length}</span></h2>
          <ol id="todolist" className="demo-box">
            {this.state.ToDoItems.map((item, index) =>
              <Todoitem key={item.title.toString() + index} id={index} value={item} down={this.handleToDown} delet={this.handleToDelete} />
            )}
          </ol>
          <h2>已经完成 <span id="donecount">{this.state.DownItems.length}</span></h2>
          <ul id="donelist">
            {this.state.DownItems.map((item, index) =>
              <Doneitem key={item.title.toString() + index} id={index} value={item} down={this.handleToDown} delet={this.handleToDelete} />
            )}
          </ul>
        </section>
      </div>

    )
  }

}






export default Header;
