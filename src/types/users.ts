
interface User {
    nom: string,
    prenom:string,
    email: string,
    role: string,
    location: string,
    date_creation:string
}
interface SignUpRequest {
    nom: string,
    prenom:string,
    email: string,
    password: string,
    role: string,
    location: string,
    date_creation:string
}
interface SignUpReponse {
    access_token: string,
    user: User
    
}

interface LoginRequest{
    email: string,
    password: string
}

export type {SignUpRequest,SignUpReponse,User,LoginRequest}