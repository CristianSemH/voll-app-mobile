import { VStack, Text, ScrollView, Avatar, Divider } from "native-base";
import { Titulo } from "../components/Titulo";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { consultarPorId } from "../services/paciente";
import { Paciente } from "../interfaces/Paciente";
import { Botao } from "../components/Botao";

export default function Perfil({ navigation }: any) {

    const [paciente, setPaciente] = useState({} as Paciente)

    function logout() {
        AsyncStorage.removeItem('token')
        AsyncStorage.removeItem('pacienteId')
        navigation.replace('Login')
    }

    useEffect(() => {
        async function dadosPaciente() {
            const pacienteId = await AsyncStorage.getItem('pacienteId')
            if (!pacienteId) return null
            const resultado = await consultarPorId(pacienteId)
            if (resultado) {
                setPaciente(resultado)
            }
        }
        dadosPaciente()
    }, [])

    return (
        <ScrollView flex={1}>
            <VStack flex={1} alignItems="center" p={5}>
                <Titulo color="blue.500">Meu perfil</Titulo>
                <Avatar source={{ uri: paciente?.imagem }} mt={5} size="xl" />
                <Titulo color="blue.500">Informações pessoais</Titulo>
                <Titulo fontSize="lg" mb={1}>{paciente.nome}</Titulo>
                <Text>{paciente?.email}</Text>
                <Text>{paciente?.endereco?.estado}</Text>
                <Divider mt={5} />
                <Titulo color="blue.500" mb={1}>Planos de saúde</Titulo>
                {paciente?.planosSaude?.map((plano, index) => (
                    <Text key={index}>{plano}</Text>
                ))}
                <Botao onPress={logout}>Logout</Botao>
            </VStack>
        </ScrollView>
    )
}