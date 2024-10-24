import { Divider, ScrollView, useToast } from "native-base";
import { CardConsulta } from "../components/CardConsulta";
import { Titulo } from "../components/Titulo";
import { Botao } from "../components/Botao";
import { useEffect, useState } from "react";
import { Consulta } from "../interfaces/Consulta";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { consultarPorPaciente } from "../services/paciente";
import { cancelar } from "../services/consulta";
import { useIsFocused } from "@react-navigation/native";

export default function Consultas() {

    const [consultaProximas, setConsultaProximas] = useState<Consulta[]>([])
    const [consultaPassadas, setConsultaPassadas] = useState<Consulta[]>([])
    const [isRecarregar, setIsRecarregar] = useState(false)
    const toast = useToast()
    const isFocused = useIsFocused()

    async function cancelarConsulta(id: string) {
        const resultado = await cancelar(id)
        console.log(resultado)
        if (resultado) {
            toast.show({
                title: 'Consulta cancelada',
                backgroundColor: 'green.500'
            })
            setIsRecarregar(!isRecarregar)
        } else {
            toast.show({
                title: 'Consulta cancelada',
                backgroundColor: 'green.500'
            })
        }
    }

    useEffect(() => {
        async function Consultas() {
            const pacienteId = await AsyncStorage.getItem('pacienteId')
            if (!pacienteId) return null

            const todasConsultas: Consulta[] = await consultarPorPaciente(pacienteId)

            const agora = new Date();

            const proximas = todasConsultas.filter((consulta) => new Date(consulta.data) > agora)
            const anterior = todasConsultas.filter((consulta) => new Date(consulta.data) <= agora)
            setConsultaPassadas(anterior)
            setConsultaProximas(proximas)
        }
        Consultas()
    }, [isRecarregar, isFocused])

    return (
        <ScrollView p={5}>
            <Titulo color="blue.500">Minhas consultas</Titulo>
            <Botao mt={5} mb={5}>Agendar novas consultas</Botao>
            <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas consultas</Titulo>
            {consultaProximas?.map((consulta, index) => (
                <CardConsulta
                    key={index}
                    nome={consulta?.especialista?.nome}
                    especialidade={consulta?.especialista?.especialidade}
                    foto={consulta?.especialista?.imagem}
                    data={consulta?.data}
                    isAgendado
                    onPress={() => cancelarConsulta(consulta.id)}
                ></CardConsulta>
            ))}

            <Divider mt={5} />
            <Titulo color="blue.500" fontSize="lg" alignSelf="flex-start" mb={2}>Próximas passadas</Titulo>
            {consultaPassadas?.map((consulta, index) => (
                <CardConsulta
                    key={index}
                    nome={consulta?.especialista?.nome}
                    especialidade={consulta?.especialista?.especialidade}
                    foto={consulta?.especialista?.imagem}
                    data={consulta?.data}
                    isAtendido
                ></CardConsulta>
            ))}
        </ScrollView>
    )
}