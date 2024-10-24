const sessions = [
    {
        id: 1,
        title: 'Insira alguns dados básicos',
        inputText: [
            {
                id: 1,
                label: 'Nome',
                placeholder: 'Digite seu nome completo',
                name: 'nome'
            },
            {
                id: 2,
                label: 'Email',
                placeholder: 'Digite seu email',
                name: 'email'
            },
            {
                id: 3,
                label: 'Crie uma senha',
                placeholder: 'Insira uma senha',
                secureTextEntry: true,
                name: 'senha'
            },
            {
                id: 4,
                label: 'Repita a senha',
                placeholder: 'Insira uma senha',
                secureTextEntry: true,
                name: 'confirmasenha'
            },
            {
                id: 5,
                label: 'CPF',
                placeholder: 'Insira seu CPF',
                name: 'cpf'
            },
            {
                id: 6,
                label: 'Foto de perfil',
                placeholder: 'Link foto de perfil',
                name: 'imagem'
            }
        ]
    },
    {
        id: 2,
        title: 'Agora, mais alguns dados sobre você:',
        inputText: [
            {
                id: 1,
                label: 'CEP',
                placeholder: 'Digite seu CEP',
                name: 'cep'
            },
            {
                id: 2,
                label: 'Rua',
                placeholder: 'Insira sua rua',
                name: 'rua'
            },
            {
                id: 3,
                label: 'Número',
                placeholder: 'Insira seu número',
                name: 'numero'
            },
            {
                id: 4,
                label: 'Complemento',
                placeholder: 'Insira seu complemento',
                name: 'complemento'
            },
            {
                id: 5,
                label: 'Telefone',
                placeholder: '(00) 00000-0000',
                name: 'telefone'
            },
            {
                id: 6,
                label: 'Estado',
                placeholder: 'Inseria seu estado',
                name: 'estado'
            }
        ]
    },
    {
        id: 3,
        title: 'Para finalizar, quais são seus planos?',
        inputText: [],
        checkBox: [
            {
                id: 1,
                value: 'Sulamerica'
            },
            {
                id: 2,
                value: 'Unimed'
            },
            {
                id: 3,
                value: 'Bradesco'
            },
            {
                id: 4,
                value: 'Amil'
            },
            {
                id: 5,
                value: 'Biosaúde'
            },
            {
                id: 6,
                value: 'Biovida'
            },
            {
                id: 7,
                value: 'Outros'
            }
        ]
    }
]

export { sessions }