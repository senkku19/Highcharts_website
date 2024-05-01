import axios from "axios";
export const URL = "https://api.worldbank.org/v2";

export const fetchGPD = async(symbol: string, interval:string)=> {
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
