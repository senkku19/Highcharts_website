import { URL } from "./Api";
import { GDPCountryResponse} from "./types";

const getCountryGDP = async (id: string): Promise<GDPCountryResponse> => {
            const response = await fetch(`${URL}/country/${id}/indicator/NY.GDP.MKTP.CD?format=json`);
            const data = await response.json();
            return data;
};

const getMultipleCountryGDP = async (id: string[]): Promise<GDPCountryResponse[]> => {
    const multipleData:  GDPCountryResponse[] = [];
    for (var country of id) {
        const response = await fetch(`${URL}/country/${country}/indicator/NY.GDP.MKTP.CD?format=json`);
        const data = await response.json();   
        multipleData.push(data);
    }
    return multipleData;
};



export { getCountryGDP, getMultipleCountryGDP };
