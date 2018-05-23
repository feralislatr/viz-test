import React, { PureComponent } from 'react';
import Tree from 'react-d3-tree';
import img from '../img/photo_group.png';
import Dotdotdot from 'react-dotdotdot';

class NodeLabel extends React.PureComponent {
  constructor(props){
    super(props);
  }
  render() {
    const {className, nodeData} = this.props;
    return (
      <div className={className}>
        <img src={img} />
        <Dotdotdot clamp={2}> 
          <h6 title={nodeData.name}>{nodeData.name}</h6>
        </Dotdotdot>
        <p>{nodeData.attributes.role}</p>
        <p>{nodeData.attributes.members}</p>
      
      </div>
    );
  }
}


export default NodeLabel;