
import type { SignUpReponse, SignUpRequest} from "../types/users";

export default async function SignupReq(data: SignUpRequest) {
    const back = import.meta.env.VITE_API_BASE_URL
    const res = await fetch(`${back}/api/auth/register`, {
        method: 'post',
        headers:{
            "Content-type": "Application/json"
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        throw new Error (res.statusText || "Erreur fetch")
    }
    const reponseJson: SignUpReponse = await res.json()
    localStorage.setItem("user", JSON.stringify(reponseJson))
}