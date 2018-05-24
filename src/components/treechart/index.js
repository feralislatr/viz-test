import React, { Component } from 'react';
import Tree from 'react-d3-tree';
import './style.css';
import NodeLabel from './nodeLabel';
import { svg } from 'react-d3-tree/node_modules/d3';
import ReactDOM from 'react-dom';

const treeData = [
  {
    name: 'NIH',
    attributes: {
      role: 'Program Lead',
      members: '31,889',
    },
    children: [
      {
        name: 'California Precision Medicine',
        attributes: {
          role: 'Awardee',
          members: '4,889',
        },
        children: [
          {
            name: 'San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
          {
            name: '4San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
          {
            name: '5San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
        ],
      },
      {
        name: 'Trans-American Consortium for the Health Care Systems Research Network',
        attributes: {
          role: 'Awardee',
          members: '4,889',
        },
        children: [
          {
            name: '6San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
          {
            name: '7San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
          {
            name: '8San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
        ],
      },
      {
        name: '3California Precision Medicine',
        attributes: {
          role: 'Awardee',
          members: '4,889',
        },
        children: [
          {
            name: '9San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
          {
            name: '10San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
          {
            name: '11San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
          },
        ],
      },
      {
        name: 'New England Precision Medicine',
        attributes: {
          role: 'Awardee',
          members: '3,780',
        },
      },
      {
        name: '2New England Precision Medicine',
        attributes: {
          role: 'Awardee',
          members: '3,780',
        },
        children: [
          {
            name: '2San Diego Blood Bank',
            attributes: {
              role: 'Organization',
              members: '15,889',
            },
            children: [
              {
                name: '3San Diego Blood Bank',
                attributes: {
                  role: 'Organization',
                  members: '15,889',
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
          members: '3,780',
        },
      },
      {
        name: '4New England Precision Medicine',
        attributes: {
          role: 'Awardee',
          members: '3,780',
        },
      },
    ],
  },
];
const isChrome = !!window.chrome && !!window.chrome.webstore;
const isIE = /*@cc_on!@*/false || !!document.documentMode;
const isEdge = !isIE && !!window.StyleMedia;
// const isFirefox = typeof InstallTrigger !== 'undefined';

const nodeX = isIE ? 350 : 120;
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
  }

  componentDidMount(){
    const dimensions = this.treeWrapper.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: 0
      },
    });
    let nodeNames = this.treeWrapper.getElementsByClassName('nodeNameBase')
    for(let i=0; i<nodeNames.length; i+=1){
      let textlength = nodeNames[i].getComputedTextLength();
      let text = nodeNames[i].textContent;
      if (textlength > 30) {
        text = text.slice(0, 30);
        nodeNames[i].textContent = text;

       }
    }
  }

  // shouldComponentUpdate() {
  //   return false;
  // }

  componentWillUnmount() {
      // ReactDOM.unmountComponentAtNoe(this.treeWrapper);
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
            return {x: d.source.x+50, y: d.source.y+(nodeX-60)}; //nodesize
        })
        .target((d) => {
            return {x: d.target.x+50, y: d.target.y}; //50
        })
        .projection((s) => {
            return [s.y, s.x ];
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
          width: nodeX-50,
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
        x: 0, 
        y: 10, 
        transform: undefined,
      }
      return (
      <div id="treeWrapper" ref={wrap => (this.treeWrapper = wrap)}>
        <Tree 
          data={treeData}
          textLayout={textLayout}
          initialDepth={1}
          translate={this.state.translate}
          orientation="horizontal"
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