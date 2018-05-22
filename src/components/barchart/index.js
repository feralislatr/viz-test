import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme } from 'victory';

class Barchart extends Component{
	// constructor(props){
	// 	super(props);
	// }


	render(){
		const data2012 = [
		  {quarter: 1, earnings: 13000, width: 30},
		  {quarter: 2, earnings: 16500, width: 30},
		  {quarter: 3, earnings: 10000, width: 30},
		  {quarter: 4, earnings: 19000, width: 30}
		];

		const data2013 = [
		  {quarter: 1, earnings: 15000, width: 30},
		  {quarter: 2, earnings: 12500, width: 30},
		  {quarter: 3, earnings: 19500, width: 30},
		  {quarter: 4, earnings: 13000, width: 30}
		];

		const data2014 = [
		  {quarter: 1, earnings: 11500, width: 30},
		  {quarter: 2, earnings: 13250, width: 30},
		  {quarter: 3, earnings: 20000, width: 30},
		  {quarter: 4, earnings: 15500, width: 30}
		];

		const data2015 = [
		  {quarter: 1, earnings: 18000, width: 30},
		  {quarter: 2, earnings: 13250, width: 30},
		  {quarter: 3, earnings: 15000, width: 30},
		  {quarter: 4, earnings: 12000, width: 30}
		];

		return(

		<VictoryChart
        domainPadding={20}
        theme={VictoryTheme.material}
        >
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (`$${x / 1000}k`)}
        />
        <VictoryStack
        	colorScale={"warm"}>
          <VictoryBar
            data={data2012}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2013}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2014}
            x="quarter"
            y="earnings"
          />
          <VictoryBar
            data={data2015}
            x="quarter"
            y="earnings"
          />
        </VictoryStack>
      </VictoryChart>
    )
	}

}
export default Barchart;