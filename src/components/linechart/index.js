import React, { Component } from 'react';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';

class LineChart extends Component{
	// constructor(props){
	// 	super(props);
	// }

	render(){
		const data = [
				      { x: 1, y: 2 },
				      { x: 2, y: 3 },
				      { x: 3, y: 4.5 },
				      { x: 4, y: 4 },
				      { x: 5, y: 7 }
				    ];
		return(
			<VictoryChart
			  theme={VictoryTheme.material}
			>
			  <VictoryLine
			    style={{
			      data: { stroke: "#38f4af" },
			      parent: { border: "3px solid #ccc"}
			    }}
			    data={data}
			  />
			</VictoryChart>




		)
	}




}
export default LineChart;