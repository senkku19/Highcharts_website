export interface GPDdata {
    indicator: {
        id: string;
        value: string;
    };
    country: {
        id: string;
        value: string;
    };
    countryiso3code: string;
    date: string;
    value: number | null;
    unit: string;
    obs_status: string;
    decimal: number;
}

export interface GDPinfo {
    page: number;
    pages: number;
    per_page: number;
    total: number;
    sourceid: string;
    lastupdated: string;
}

export interface GDPCountryResponse{
    metadata: GDPinfo;
    data: GPDdata[];
}

export interface GDPMultipleCountryResponse{
    [key: string]: GDPCountryResponse;
}