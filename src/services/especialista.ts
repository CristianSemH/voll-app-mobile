import api from "./api"

export async function buscarPorEstado(estado: string, especialista: string) {
    try {
        const resultado = await api.get('especialista/busca', {
            params: {
                estado,
                especialista
            }
        })
        return resultado.data
    } catch (error) {
        console.log(error)
        return null
    }

}