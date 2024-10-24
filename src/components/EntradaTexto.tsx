import { FormControl, Input, IInputProps } from "native-base";

interface EntradaTextoProps extends IInputProps {
    label?: string
}

export function EntradaTexto({ label, ...rest }: EntradaTextoProps) {
    return (
        <>
            <FormControl.Label color="blue.800">
                {label}
            </FormControl.Label>
            <Input
                placeholder='Insira seu endereço de email'
                size='lg'
                w="100%"
                borderRadius='lg'
                bgColor='gray.100'
                shadow={2}
                {...rest}
            />
        </>
    )
}

export default EntradaTexto;