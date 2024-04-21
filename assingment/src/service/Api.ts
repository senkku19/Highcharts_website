import axios from "axios";
export const URL = "https://www.cheapshark.com/api/1.0";

export const fetchGameData = async(symbol: string, interval:string)=> {
    try{
        const response = await axios.get(URL, {
            params: {
                
                symbol: symbol,
                interval: interval,
            }
        });

        const responseData = response.data;
        return responseData;
    } catch (error){
        console.error("Error fetching time series data from Alpha Vantage API:", error);
        throw error;
    }
}
