import { useEffect, useState } from "react";
import { getMultipleGamesById } from "../store";
import Highcharts from 'highcharts';
import Chart from "./Chart";
import { GameLookupResponse } from "../service/types";

function Charts() {
    const [gameCharts, setGameCharts] = useState<GameLookupResponse[]>([]);
    const [options, setOptions] = useState<Highcharts.Options[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const numbers = [612, 128, 129, 130];
                getMultipleGamesById(numbers).then((data) => setGameCharts(data))
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log("täällä",gameCharts)
    }, [gameCharts])

    useEffect(() => {
        if (gameCharts.length !== 0) {
            // Check if gameCharts is not null and is an array
            var games: Highcharts.Options[] = [];
    
           Object.entries(gameCharts).forEach(([key, value]) => {
            var names: string[];
            names= value.deals.map(deal => "'"+ deal.storeID + "'");
            const string = names.join(",");
            console.log(string);
            games.push({
                title: {
                    text: value.info.title
                },
                xAxis: {
                    categories: [
                        string
                    ]

                },
                
                series: [{
                    type: 'column', 
                    data: value.deals.map((deal) => 
                        parseFloat(deal.price))
                }]
            })
            
            setOptions(games);
           });

           
console.log(games);

}
}, [gameCharts]);
    

   /* useEffect(() => {
        if (gameCharts.length !== 0) {
            // Check if gameCharts is not null and is an array
            var games: Highcharts.Options[] = [];
            for (const game of gameCharts){
                games.push({
                    title: {
                        text: game.info.title
                    },
                    series: [{
                        type: 'line', 
                        data: game.deals.map((deal) => parseFloat(deal.price))
                    }]
                })
            }
            setOptions(games);
        }
    }, [gameCharts]);*/
    
    

    if (!options) {
        return <h1>No charts yet...</h1>;
    }

    return (
        <div>
            {options.map((option) => (
                <Chart options = {option}/>
            ))}
        </div>
    );
}

export default Charts;
