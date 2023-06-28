export interface Influencer {
    id: number;
    nome: string;
    email: string;
    descricao: string;
    senha: string;
    cpf: string;
    tags: string;
    data_nascimento: string;
    instagram: string;
}

export interface Enterprise {
    id: number;
    nome: string;
    email: string;
    descricao: string;
    senha: string;
    cnpj: string;
    tags: string;
}