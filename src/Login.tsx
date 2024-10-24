import { VStack, Image, Text, Box, FormControl, Link, useToast } from 'native-base';
import { TouchableOpacity } from 'react-native';
import Logo from './assets/Logo.png';
import { Titulo } from './components/Titulo';
import { EntradaTexto } from './components/EntradaTexto';
import { Botao } from './components/Botao';
import { useEffect, useState } from 'react';
import { login } from './services/autenticacao';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';


export default function Login({ navigation }) {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [isCarregando, setIsCarregando] = useState(true)
  const toast = useToast()

  async function fazerLogin() {
    const resultado = await login(email, senha)
    if (resultado) {
      const { token } = resultado
      AsyncStorage.setItem('token', token)

      const tokenDecode = jwtDecode(token) as any
      const pacienteId = tokenDecode.id
      AsyncStorage.setItem('pacienteId', pacienteId)
      navigation.replace('Tabs')
    } else {
      toast.show({
        title: "Erro no login",
        description: "O email ou senha não confere",
        backgroundColor: "red.500"
      })
    }
  }

  useEffect(() => {
    async function verificarLogin() {
      const token = await AsyncStorage.getItem('token')
      if (token) {
        navigation.replace('Tabs')
      }
      setIsCarregando(false)
    }
    verificarLogin()
  })

  if (isCarregando) {
    return null
  }

  return (
    <VStack flex={1} alignItems="center" p={5} justifyContent="center">

      <Image source={Logo} alt="Logo Voll" />

      <Titulo>
        Faça login em sua conta
      </Titulo>
      <Box>
        <FormControl mt={3}>
          <EntradaTexto
            label="Email"
            placeholder="Insira seu endereço de email"
            value={email}
            onChangeText={setEmail}
          />
          <EntradaTexto
            label="Senha"
            placeholder="Insira sua senha"
            value={senha}
            onChangeText={setSenha}
          />
        </FormControl>
      </Box>
      <Botao onPress={fazerLogin}>
        Entrar
      </Botao>
      <Link href='https://www.alura.com.br' mt={2}>
        Esqueceu sua senha?
      </Link>

      <Box flexDirection="row" justifyContent="center" mt={8}>
        <Text >Ainda não tem cadastro? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text color="blue.500">
            Faça seu cadastro!
          </Text>
        </TouchableOpacity>
      </Box>
    </VStack >
  );
}
