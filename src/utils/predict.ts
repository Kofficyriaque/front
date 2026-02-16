import type { ReponsePredict, RequestPredict } from "../types/prediction";

const back = import.meta.env.VITE_API_BASE_URL;
export default async function predict(data: RequestPredict, acces_token: string) {
    const res = await fetch(`${back}/api/predict/salary`, {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${acces_token}`,
        },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        throw new Error (res.statusText || "Erreur fetch");
    }
    const reponseJson: ReponsePredict = await res.json();
    return reponseJson
}
