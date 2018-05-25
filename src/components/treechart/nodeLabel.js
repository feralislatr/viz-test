import React, { PureComponent } from 'react';
import Tree from 'react-d3-tree';
import img from '../img/photo_group.png';
import Dotdotdot from 'react-dotdotdot';

class NodeLabel extends React.PureComponent {
  constructor(props){
    super(props);
  }
  render() {
    const {className, nodeData, isChrome} = this.props;
    return (
      <div className={className}>
        <img src={img} />
        <Dotdotdot clamp={ isChrome ? 2 : 3 }> 
          <h6 title={nodeData.name}>{nodeData.name}</h6>
        </Dotdotdot>
        <p>{nodeData.attributes.role}</p>
        <p>{nodeData.attributes.participants}</p>
      
      </div>
    );
  }
}


export default NodeLabel;