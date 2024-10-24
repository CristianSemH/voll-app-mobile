import { Especialista } from "./Especialista";

export interface Consulta {
    id: string;
    data: string;
    especialista: Especialista
}