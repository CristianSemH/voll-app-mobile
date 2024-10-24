import { ScrollView, Box } from "native-base";
import { CardConsulta } from "../components/CardConsulta";
import { Titulo } from "../components/Titulo";
import { Botao } from "../components/Botao";
import { EntradaTexto } from "../components/EntradaTexto";
import { useState } from "react";
import { buscarPorEstado } from "../services/especialista";
import { Especialista } from "../interfaces/Especialista";

export default function Explorar({ navigation }) {

    const [estado, setEstado] = useState('')
    const [especialidade, setEspecialidade] = useState('')
    const [especialistas, setEspecialistas] = useState([])

    async function filtrar() {
        if (!estado && !especialidade) return null
        const resultado = await buscarPorEstado(estado, especialidade)
        if (resultado) {
            setEspecialistas(resultado)
        }
    }

    return (
        <ScrollView p={5}>
            <Box w="100%" borderRadius="lg" p={3} mt={10} shadow="1" borderRightRadius="md">
                <EntradaTexto
                    placeholder="Digite a especialidade"
                    value={especialidade}
                    onChangeText={setEspecialidade}
                ></EntradaTexto>
                <EntradaTexto
                    placeholder="Digite sua localização"
                    value={estado}
                    onChangeText={setEstado}
                ></EntradaTexto>
                <Botao mt={3} mb={3} onPress={filtrar}>
                    Buscart
                </Botao>
            </Box>
            <Titulo color="blue.500" mb={5}>Resultado da busca</Titulo>

            {especialistas?.map((especialista: Especialista, index) => (
                <CardConsulta key={index}
                    nome={especialista.nome}
                    especialidade={especialista.especialidade}
                    foto={especialista.imagem}
                    onPress={() => navigation.navigate('Agendamento', especialista.id)}
                ></CardConsulta>
            ))}

        </ScrollView>
    )
}