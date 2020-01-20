import React from 'react';

export class Doneitem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value};
  }
  render() {
    return (<li className="unDown">
      <input  type="checkbox" className= {this.props.id} onChange={(e)=>this.props.down('done',e)} checked = "checked"/>
      <p>{this.state.value.title}</p>
      <span onClick={(e)=>this.props.delet('done',e)} className= {this.props.id} >-</span>
    </li>);
  }
}
