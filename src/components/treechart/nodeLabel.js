import React, { PureComponent } from 'react';
import Tree from 'react-d3-tree';
import img from '../img/photo_group.png';
import LinesEllipsis from 'react-lines-ellipsis'

class NodeLabel extends React.PureComponent {
  constructor(props){
    super(props);
  }
  render() {
    const {className, nodeData, isChrome} = this.props;
    return (
      <div className={className}>
        <img src={img} />
        <h6>
        <LinesEllipsis
          title={nodeData.name}
          text={nodeData.name}
          maxLine='2'
          ellipsis='...'
          trimRight
          basedOn='letters'/> 
        </h6>
        <p>{nodeData.attributes.role}</p>
        <p>{nodeData.attributes.participants}</p>
      
      </div>
    );
  }
}


export default NodeLabel;