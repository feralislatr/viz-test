import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

class HorizonalChart extends Component{
	// constructor(props){
	// 	super(props);
	// }


	render(){
		const data=[
		    { x: 1, y: 2, width: 8},
		    { x: 2, y: 3, width: 8},
		    { x: 3, y: 5, width: 8},
		    { x: 4, y: 4, width: 8},
		    { x: 5, y: 6, width: 8}
		  ]
		return(

		<VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        >
          <VictoryBar
          horizontal
            data={data}
            x="x"
            y="y"
          />
      </VictoryChart>
    )
	}

}
export default HorizonalChart;
