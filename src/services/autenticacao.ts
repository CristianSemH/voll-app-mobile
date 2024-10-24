import api from "./api"

export async function login(email: string, senha: string) {
    if (!email || !senha) return null
    try {
        const resultado = await api.post('/auth/login', {
            email,
            senha
        })
        return resultado.data
    } catch (error) {
        console.log(error)
        return null
    }
}