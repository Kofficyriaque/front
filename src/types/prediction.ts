interface RequestPredict {
    titre: string;
    description: string;
    metier: string;
    region: string;
    experience: string;
    competences: string[];
}

interface ReponsePredict{
    salaire_predit: number;
	salaire_min: number,
	salaire_max: number,
	salaire_mensuel: number,
	marge_erreur: number,
	competences_detectees: [],
	niveau_experience: string,
	model_used: false
}

export type {RequestPredict, ReponsePredict}