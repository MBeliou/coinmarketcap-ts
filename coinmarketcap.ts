import fetch from "node-fetch";

const apiVersion = "v2";
const apiURL = "https://api.coinmarketcap.com";

async function query(endpoint: string, args?: string[]): Promise<JSON> {
    let url = `${apiURL}/${apiVersion}/${endpoint}/`;
    let queryString = "";
    if (!args) {
        console.log("No args")
        args = []
    }
    for (let index = 0; index < args.length; index++) {
        const element = args[index];
        queryString += element;
        if (index != 0) {
            queryString += "&"
        }
    }
    url += queryString;
    let resp = await fetch(url);
    return resp.json()
}

export function getGlobal(convert?: string): Promise<JSON> {
    let args = ["?"];
    if (convert) {
        args.push(`convert=${convert}`);
    }
    return query("global", args)
}

export function getTicker(start?: number, limit?: number, sort?: string, structure?: string, convert?: string): Promise<JSON> {
    let args = ["?"];
    if (start) {
        args.push(`start=${start}`);
    }
    if (limit) {
        args.push(`limit=${limit}`);
    }
    if (sort) {
        args.push(`sort=${sort}`);
    }
    if (structure) {
        args.push(`structure=${structure}`);
    }
    if (convert) {
        args.push(`convert=${convert}`);
    }
    return query("ticker", args)
}

export function getTickerByID(id: number, structure?: string, convert?: string): Promise<JSON> {
    let args = ["?"];
    if (structure) {
        args.push(`structure=${structure}`);
    }
    if (convert) {
        args.push(`convert=${convert}`);
    }
    return query(`ticker/${id}`, args)
}
