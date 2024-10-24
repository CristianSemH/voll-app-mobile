import { Endereco } from "./Endereco";


export interface Especialista {
    nome: string;
    crm: number;
    imagem: string;
    especialidade: string;
    possuiPlanoSaude: boolean;
    senha: string;
    planosSaude: number[];
    estaAtivo: boolean;
    email: string;
    id: string;
    endereco: Endereco
}

