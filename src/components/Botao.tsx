import { Button, IButtonProps } from "native-base";
import { ReactNode } from "react";

interface BotaoProps extends IButtonProps {
    children?: ReactNode
}

export function Botao({ children, ...rest }: BotaoProps) {
    return (
        <Button
            w="100%"
            bg="blue.800"
            mt={10}
            borderRadius="lg"
            {...rest}
        >
            {children}
        </Button>
    )
}