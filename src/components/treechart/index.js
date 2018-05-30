import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import './style.css';
import NodeLabel from './nodeLabel';
import { svg } from 'react-d3-tree/node_modules/d3';

const treeData = [
  {
    name: 'ABC',
    attributes: {
      role: 'Lead',
      participants: '31,889',
    },
    children: [
      {
        name: 'Save Us From the Archon',
        attributes: {
          role: 'Band',
          participants: '4,889',
        },
        children: [
          {
            name: 'Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
          {
            name: '4Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
          {
            name: '5Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
        ],
      },
      {
        name: 'Set Course For Andromeda - The Andromedan Pt IV: The Darkness Within',
        attributes: {
          role: 'Long Title',
          participants: '4,889',
        },
        children: [
          {
            name: '6Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
          {
            name: '7Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
          {
            name: '8Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
        ],
      },
      {
        name: '3Save Us From the Archon',
        attributes: {
          role: 'Band',
          participants: '4,889',
        },
        children: [
          {
            name: '9Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
          {
            name: '10Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
          {
            name: '11Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
          },
        ],
      },
      {
        name: 'Invent the Universe - Baryogenesis',
        attributes: {
          role: 'Song',
          participants: '3,780',
        },
      },
      {
        name: '2Invent the Universe - Baryogenesis',
        attributes: {
          role: 'Song',
          participants: '3,780',
        },
        children: [
          {
            name: '2Animals as Leaders',
            attributes: {
              role: 'AnotherBand',
              participants: '15,889',
            },
            children: [
              {
                name: '3Animals as Leaders',
                attributes: {
                  role: 'AnotherBand',
                  participants: '15,889',
                },
              },
            ],
          },
        ],
      },
      {
        name: '3Invent the Universe - Baryogenesis',
        attributes: {
          role: 'Song',
          participants: '3,780',
        },
      },
      {
        name: '4Invent the Universe - Baryogenesis',
        attributes: {
          role: 'Song',
          participants: '3,780',
        },
      },
    ],
  },
];
const isChrome = !!window.chrome && !!window.chrome.webstore;
const isIE = /*@cc_on!@*/false || !!document.documentMode;
const isEdge = !isIE && !!window.StyleMedia;
// const isFirefox = typeof InstallTrigger !== 'undefined';

const nodeX = isIE ? 130 : 120;
const nodeY = 200;

//edge fix
if(isEdge){
  void (new MutationObserver((muts) => {
   for(let i = muts.length; i--;) {
    const mut = muts[i], objs = mut.target.querySelectorAll('foreignObject');
    for(let j = objs.length; j--;) {
     const obj = objs[j];
     let val = obj.style.display;
     obj.style.display = 'none';
     obj.getBBox();
     obj.style.display = val;
    }
   }
  })
  .observe(document.documentElement, { attributes: true, attributeFilter: ['transform'], subtree: true }));
}

class TreeChart extends Component {
  constructor(props){
    super(props);
    this.state= { x: 500, y: 100};
    this.truncateNodeName=this.truncateNodeName.bind(this);
    this.modifyAttributeText=this.modifyAttributeText.bind(this);
    this.handleActiveNode=this.handleActiveNode.bind(this);
    this.highlightActiveNode=this.highlightActiveNode.bind(this);
  }

  componentDidMount() {
    const dimensions = this.treeWrapper.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: 0
      },
    });
    if (isIE) {
      this.truncateNodeName();
      this.modifyAttributeText();
    }
  }

  truncateNodeName(){
    let maxTextLength = 14;
    let nodeNames = this.treeWrapper.getElementsByClassName('nodeNameBase');
    for(let i=0; i<nodeNames.length; i+=1){
      let textlength = nodeNames[i].textContent.length;
      let text = nodeNames[i].textContent;
      // nodeNames[i].setAttribute("title", text);
      if (textlength > maxTextLength) {
        text = text.slice(0, maxTextLength);
        nodeNames[i].textContent = text+'...';
      }
    }
  }
  // WIP
  modifyAttributeText() {
    let attributes = this.treeWrapper.getElementsByTagName('tspan');
    let newText;
    for (let i=0; i<attributes.length; i+=1) {
      let attrText = attributes[i].textContent;
      if(attrText.match(/^role/)) {
        newText = attrText.slice(6, attrText.length);
        attributes[i].textContent = newText;
      } else if (attrText.match(/^participants/)) {
          newText = attrText.slice(8 , attrText.length);
          attributes[i].textContent = newText;
      }
    }
  }
  
  highlightActiveNode(nodeObj){
    if (!nodeObj) return;
    if (isIE) {
      let nodes = Array.from(this.treeWrapper.getElementsByTagName('rect'));
      // remove highlight
      nodes.forEach((node) => {
        node.setAttribute('fill', '#efefef');
        node.setAttribute('stroke', '#cdcdcd');
      });
      // set highlight
      let currNode = nodes.filter(node => node.parentNode.id == nodeObj.id)[0];
      currNode.setAttribute('fill', '#ffffe4');
      currNode.setAttribute('stroke', '#ecc777');
      const highlightParents = (nodeObj) => {
        while (nodeObj.parent) {
          nodeObj = nodeObj.parent;
          let parent = nodes.filter(node => node.parentNode.getAttribute('id') == nodeObj.id)[0];
          parent.setAttribute('fill', '#ffffe4');
          parent.setAttribute('stroke', '#ecc777');
          highlightParents(nodeObj);
        }
      }
      highlightParents(nodeObj);
    }
    else {
      let nodes = Array.from(this.treeWrapper.getElementsByTagName('foreignObject'));
      // remove highlight
      nodes.forEach((node) => {
        node.firstChild.classList.remove('active');
      });
      // set highlight
      let currNode = nodes.filter(node => node.parentElement.getAttribute('id') == nodeObj.id)[0];
      currNode.firstChild.classList.add('active');
      // highlight parents
      const highlightParents = (nodeObj) => {
        while (nodeObj.parent) {
          nodeObj = nodeObj.parent;
          let parent = nodes.filter(node => node.parentElement.getAttribute('id') == nodeObj.id)[0];
          parent.firstChild.classList.add('active');
          highlightParents(nodeObj);
        }
      }
      highlightParents(nodeObj);
    }
  }

  handleActiveNode(nodeObj, cont) {
    if (isIE) this.truncateNodeName();
    this.highlightActiveNode(nodeObj);
    console.log(cont)
    if (!cont || nodeObj._collapsed) {
      return;
    }
    const tree = this.tree;
    const parentObj = nodeObj.parent;
    if (parentObj && tree) {
      const nodesToBeCollapsed = Array.from(parentObj.children.filter(c=> c.id !== nodeObj.id && !c._collapsed))
      console.log('nodesToBeCollapsed ', nodesToBeCollapsed)
      nodesToBeCollapsed.forEach((o) => {
        console.log("to collapse ", o)
        // const collapse = o => {
          console.log('before ',o._collapsed)
          // tree.collapseNode(o)
          // tree.handleNodeToggle(o.id, e);
          console.log('after ',o._collapsed)
          // if (o._children && o._children.length > 0) {
          //   o._children.forEach(child => {
          //     collapse(child)
          //     console.log("collapsing ", child)
          //   })
          // }
        // }
        // collapse(o)
          // tree.handleNodeToggle(o.id, false);
      });
    }
  }

  path(linkData, orientation){
    if (isChrome) {
      return (
      svg.diagonal()
        .source((d) => {
            return {x: d.source.x-5, y: d.source.y+nodeY+3}; //nodesize
        })
        .target((d) => {
            return {x: d.target.x-5, y: d.target.y+(nodeY/4)-12}; //50
        })
        .projection((s) => {
            return [s.x, s.y + ((nodeY+(nodeY/8) )/ 2)];
        })
      )
    }
    else if (isIE) {
      return (
      svg.diagonal()
        .source((d) => {
            return {x: d.source.x+55, y: d.source.y+(nodeY-44)}; //nodesize
        })
        .target((d) => {
            return {x: d.target.x+55, y: d.target.y-10}; //50
        })
        .projection((s) => {
            return [s.x, s.y ];
        })
      )
    }
    else {
      return (
      svg.diagonal()
        .source((d) => {
            return {x: d.source.x+(nodeX/2)-5, y: d.source.y+(nodeY-35)}; //nodesize
        })
        .target((d) => {
            return {x: d.target.x+(nodeX/2)-5, y: d.target.y}; //50
        })
        .projection((s) => {
            return [s.x, s.y ];
        })
      )
    }
    
  }


  render(){
    if (isIE){
      const rectangle = {
        shape: 'rect',
        shapeProps: {
          width: nodeX,
          height: 165,
          x: -10,
          y: -10,
          rx: 4,
          ry: 4,
          fill: '#efefef',
          stroke: '#cdcdcd',
        }
      }
      const textLayout ={
        textAnchor: "start", 
        x: -2, 
        y: 10, 
        transform: undefined,
      }
      return (
      <div id="treeWrapper" ref={node => (this.treeWrapper = node)}>
        <Tree 
          ref={node => this.tree = node}
          onClick={(nodeObj) => this.handleActiveNode(nodeObj, true)}
          data={treeData}
          textLayout={textLayout}
          initialDepth={1}
          translate={this.state.translate}
          orientation="vertical"
          nodeSvgShape={rectangle}
          nodeSize={{x: nodeX+10, y: nodeY}}
          pathFunc={this.path(treeData, "horizontal")}
        />
      </div>
    );
    } else{
      return (
      <div id="treeWrapper" ref={r => this.treeWrapper = r}>
        <Tree
          ref={r => this.tree = r}
          onClick={(nodeObj) => this.handleActiveNode(nodeObj,true)}
          data={treeData}
          initialDepth={1}
          translate={this.state.translate}
          orientation="vertical"
          allowForeignObjects
          nodeSvgShape={{shape: "none"}}
          nodeSize={{x: nodeX+10, y: nodeY}}
          pathFunc={this.path(treeData, "horizontal")}
          nodeLabelComponent={{
            render: <NodeLabel className='label' isChrome={isChrome} />,
            foreignObjectWrapper: {
              style: {
                x: (nodeX/2)*-1,
                y: 150
              }
            }
          }}
        />
      </div>
    );
    }
  }
}

export default TreeChart;
