import { URL } from "../service/Api";
import { GameLookupResponse } from "../service/types";

const getDealforGame = async (id: number): Promise<GameLookupResponse> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await (await fetch(`${URL}/games?id=${id}`)).json();
            console.log('moikku', response);
            resolve(response); 
        } catch (err: any) {
            reject(err);
        }
    });
};

async function getMultipleGamesById( ids: number[] ): Promise<GameLookupResponse[]>  {
    const string = ids.join(",");
    console.log(string);
    const response = await fetch(`${URL}/games?ids=${string}`)
    const data = await response.json();
    return data;
}

export { getDealforGame, getMultipleGamesById };
