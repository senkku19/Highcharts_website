export interface GameInfo {
    gameID: string,
    title: string,
}

export interface  GameStorePrice{
    dealid: number;
    storeid: number;
    salePrice: number;
    retailPrice: number;
}

export interface GameDealResponse {
    gameInfo: GameInfo;
    cheapestStores: GameStorePrice[];
}

export interface CheapestPrice {
    price?: string;
    date: number;
}

export interface GameLookupResponse {
    info: {
        title: string;
        steamAppID: string | null;
        thumb: string;
    }
    cheapestPriceEver: CheapestPrice;
    deals: {
        storeID: string;
        dealID: string;
        price: string;
        retailPrice: string;
        savings: string;
    }[]
}

export interface MultipleGameLookupResponse{
    [key: string] : GameLookupResponse
}

