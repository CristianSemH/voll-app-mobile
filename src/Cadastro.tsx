import { Text, Image, Box, FormControl, Checkbox, ScrollView, useToast } from 'native-base';
import Logo from './assets/Logo.png';
import { Titulo } from './components/Titulo';
import { EntradaTexto } from './components/EntradaTexto';
import { Botao } from './components/Botao';
import { useState } from 'react';
import { sessions } from './utils/CadastroEntradaTexto';
import { cadastrar } from './services/paciente';

export default function Cadastro() {

  const [numSession, setNumSession] = useState(0);
  const [dados, setDados] = useState({} as any)
  const [planos, setPlanos] = useState([] as number[])
  const toast = useToast()

  const NextSession = () => {
    if (numSession < sessions.length - 1) {
      setNumSession(numSession + 1)
    } else {
      cadastrarPaciente()
    }
  }

  const previousSession = () => {
    if (numSession > 0) {
      setNumSession(numSession - 1)
    }
  }

  function atualizarDados(id: string, valor: string) {
    setDados({ ...dados, [id]: valor })
  }

  async function cadastrarPaciente() {
    const resultado = await cadastrar({
      cpf: dados.cpf,
      nome: dados.nome,
      email: dados.email,
      endereco: {
        cep: dados.cep,
        rua: dados.rua,
        numero: dados.numero,
        estado: dados.estado,
        complemento: dados.complemento
      },
      senha: dados.senha,
      telefone: dados.telefone,
      possuiPlanoSaude: planos.length > 0,
      planosSaude: planos,
      imagem: dados.imagem
    })

    if (!resultado) {
      toast.show({
        title: "Erro no cadastro",
        description: "Erro ao cadastrar paciente",
        backgroundColor: "red.500"
      })
    }else{
      toast.show({
        title: "Sucesso",
        description: "Cadastro feito com sucesso",
        backgroundColor: "green.500"
      })
    }
  }

  return (
    <ScrollView flex={1} p={5} >

      <Image alignSelf="center" source={Logo} alt="Logo Voll" />

      <Titulo>
        {sessions[numSession].title}
      </Titulo>
      <Box>
        <FormControl mt={3}>
          {
            sessions[numSession].inputText?.map(input => {
              return (
                <EntradaTexto
                  key={input.id}
                  label={input.label}
                  placeholder={input.placeholder}
                  secureTextEntry={input.secureTextEntry}
                  value={dados[input.name]}
                  onChangeText={(text) => atualizarDados(input.name, text)}
                >
                </EntradaTexto>)
            })
          }
          {numSession == 2 &&
            <Text color="blue.800" fontWeight="bold" fontSize="md" mt={2} mb={2}>Selecione o plano:</Text>
          }
          {
            sessions[numSession].checkBox?.map(checkbox => {
              return (
                <Checkbox
                  key={checkbox.id}
                  value={checkbox.value}
                  onChange={() => {
                    setPlanos((planosAnt) => {
                      if (planosAnt.includes(checkbox.id)) {
                        return planosAnt.filter((id) => id !== checkbox.id)
                      }
                      return [...planosAnt, checkbox.id]
                    })
                  }}
                  isChecked={planos.includes(checkbox.id)}
                >
                  {checkbox.value}
                </Checkbox>
              )
            })
          }
        </FormControl>
      </Box>
      {numSession > 0 &&
        <Botao onPress={previousSession} bgColor="gray.400">
          Voltar
        </Botao>
      }
      <Botao onPress={NextSession} mt={4} mb={20}>
        {numSession == 2 ? 'Finalizar' : 'Avançar'}
      </Botao>
    </ScrollView>
  );
}
