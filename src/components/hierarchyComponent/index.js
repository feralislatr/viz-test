import React, { Component } from 'react';
import TreeChart from '../treechart';
import { Modal, Breadcrumb }from 'react-bootstrap';
import './style.css';

class HierarchyComponent extends Component{
  constructor(props){
    super(props);
    this.state ={ showMenu:false, };
  }
  async toggleMenu(){
    await this.setState({ showMenu: !this.state.showMenu });
  }

  render(){
    return(
      <div className="hierarchy-container">
        <Breadcrumb>
          <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
          <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
            Library
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Data</Breadcrumb.Item>
        </Breadcrumb>

        <div className={this.state.showMenu ? 'open' : 'menu-container'} >
            <div className='menu-toggle' onClick={()=>this.toggleMenu()}>
              <h4>Organizational Structure <i className={this.state.showMenu ? "fas fa-arrow-down" : "fas fa-arrow-up"}></i></h4>
            </div>
            <div className="chart-container">
              <TreeChart />
            </div>
          </div>
      </div>
    );
  }
}
export default HierarchyComponent;
