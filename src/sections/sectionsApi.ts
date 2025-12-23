export type section  = {
    block_name: string 
    type: string 
    items_count: number 
    api_url: string 
}

const SECTIONS_API_URL = " https://api3.islamhouse.com/v3/paV29H2gm56kvLPy/main/sitecontent/ar/ar/json"

//  fetch sections from the API

export async function fetchSections(): Promise<section[]> {
 const response = await fetch(SECTIONS_API_URL);
 if (!response.ok) {
    throw new Error("Failed to fetch sections");
 }
 const data = await response.json();
 return data;
}


//  get the sections from the API

export async function getSections(): Promise<section[]> {
    const response = await fetch(SECTIONS_API_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch sections");
    }
    const data = await response.json();
    return data;

}