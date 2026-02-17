import type { HistoryReponse } from "../types/history";

export default async function getUserHistory(acces_token:string) {
    const back = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${back}/api/predict/history`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${acces_token}`
        }
    })
    if (!res.ok) {
        throw new Error (res.statusText);
    }
    const reponseJson:HistoryReponse[] = await res.json()
    return reponseJson;
}