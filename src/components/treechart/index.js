import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import './style.css';
import NodeLabel from './nodeLabel';
import { svg } from 'react-d3-tree/node_modules/d3';

const treeData = [
  {
    name: 'NIH',
    attributes: {
      role: 'Program Lead',
      participants: '31,889',
    },
    children: [
      {
        name: 'California Precision Medicine',
        attributes: {
          role: 'Awardee',
          participants: '4,889',
        },
        children: [
          {
            name: 'San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
          {
            name: '4San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
          {
            name: '5San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
        ],
      },
      {
        name: 'Trans-American Consortium for the Health Care Systems Research Network',
        attributes: {
          role: 'Awardee',
          participants: '4,889',
        },
        children: [
          {
            name: '6San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
          {
            name: '7San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
          {
            name: '8San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
        ],
      },
      {
        name: '3California Precision Medicine',
        attributes: {
          role: 'Awardee',
          participants: '4,889',
        },
        children: [
          {
            name: '9San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
          {
            name: '10San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
          {
            name: '11San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
          },
        ],
      },
      {
        name: 'New England Precision Medicine',
        attributes: {
          role: 'Awardee',
          participants: '3,780',
        },
      },
      {
        name: '2New England Precision Medicine',
        attributes: {
          role: 'Awardee',
          participants: '3,780',
        },
        children: [
          {
            name: '2San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              participants: '15,889',
            },
            children: [
              {
                name: '3San Diego Blood Bank',
                attributes: {
                  role: 'Organization',
                  participants: '15,889',
                },
              },
            ],
          },
        ],
      },
      {
        name: '3New England Precision Medicine',
        attributes: {
          role: 'Awardee',
          participants: '3,780',
        },
      },
      {
        name: '4New England Precision Medicine',
        attributes: {
          role: 'Awardee',
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
   for(var i = muts.length; i--;) {
    var mut = muts[i], objs = mut.target.querySelectorAll('foreignObject');
    for(var j = objs.length; j--;) {
     var obj = objs[j];
     var val = obj.style.display;
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

  truncateNodeName( ){
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


  path(linkData, orientation){
    if (isChrome) {
      return (
      svg.diagonal()
        .source((d) => {
            return {x: d.source.x, y: d.source.y+nodeY}; //nodesize
        })
        .target((d) => {
            return {x: d.target.x, y: d.target.y+(nodeY/4)}; //50
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
            return {x: d.source.x+55, y: d.source.y+(nodeY-45)}; //nodesize
        })
        .target((d) => {
            return {x: d.target.x+55, y: d.target.y}; //50
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
            return {x: d.source.x+(nodeX/2), y: d.source.y+(nodeY-37)}; //nodesize
        })
        .target((d) => {
            return {x: d.target.x+(nodeX/2), y: d.target.y}; //50
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
      <div id="treeWrapper" ref={wrap => (this.treeWrapper = wrap)}>
        <Tree 
          onClick={() => this.truncateNodeName()}
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
      <div id="treeWrapper" ref={wrap => (this.treeWrapper = wrap)}>
        <Tree 
          data={treeData}
          initialDepth={1}
          translate={this.state.translate}
          orientation="vertical"
          allowForeignObjects
          nodeSvgShape={{shape: "none"}}
          nodeSize={{x: nodeX+10, y: nodeY}}
          pathFunc={this.path(treeData, "horizontal")}
          nodeLabelComponent={{
            render: <NodeLabel className='label' />,
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
