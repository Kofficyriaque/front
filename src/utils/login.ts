import type { LoginRequest, Users } from "../types/users";

async function LoginReq(data:LoginRequest) {
    const back = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${back}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if (!res.ok) {
        throw new Error(res.statusText || "Erreur fetch")
    }
    const reponseJson: Users = await res.json()
    localStorage.setItem("user", JSON.stringify(reponseJson))
}

async function validateToken(token: string) {
    const back = import.meta.env.VITE_API_BASE_URL;
    try {
        const res = await fetch(`${back}/api/auth/me`, {
            headers: { "Authorization": `Bearer ${token}` },
        });
        if (res.status === 401) {
            return false
        }
        else {
            return true
        }
    } catch (err) {
        console.error("Erreur validation token", err);
    }
}

export {LoginReq, validateToken}