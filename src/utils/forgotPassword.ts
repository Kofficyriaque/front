export default async function resetPassword(email:string) {
    const back = import.meta.env.VITE_API_BASE_URL;
    const res = await fetch(`${back}/api/auth/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)
    })
    if (!res.ok) {
        throw new Error(res.statusText || "Erreur fetch forgot password")
    }
    const reponseJson = await res.json()
    return reponseJson.email
}