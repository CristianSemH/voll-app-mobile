import { Paciente } from "../interfaces/Paciente";
import api from "./api";


export async function cadastrar(paciente: Paciente) {
    if (!paciente) return;
    try {
        const resultado = await api.post('/paciente', paciente)
        return resultado.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function consultarPorId(id: string) {

    try {
        const resultado = await api.get(`/paciente/${id}`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function consultarPorPaciente(id: string) {

    try {
        const resultado = await api.get(`/paciente/${id}/consultas`)
        return resultado.data
    } catch (error) {
        console.log(error)
        return null
    }
}
