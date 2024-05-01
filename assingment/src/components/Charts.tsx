import React from 'react';
import Highcharts from 'highcharts';
import Chart from "./Chart";
import './css/Chart.css'


interface ChartsDateRange {
    options: Highcharts.Options[] | null;
}


const Charts: React.FC<ChartsDateRange> = ({options}) => {
    if (options === null || options.length===0) {
        return (
        <div className="toppane"> 
            <h1>No charts yet...</h1> 
        </div>
        )
    }

    return (
        <div>
             <div className="toppane">
            </div>
            {options.map((option, index) => (
                <div key = {index} className="chartsContainer">
                <Chart options = {option}/>
                </div>
            ))}
        </div>
    );
}



export default Charts;
