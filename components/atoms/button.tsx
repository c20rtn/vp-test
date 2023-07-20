import { Button as ChakraButton, ButtonProps, FormControl, InputGroup } from '@chakra-ui/react'
import { colors } from '../../styles/colors'

interface Props extends ButtonProps {
    label: string
}

export const Button = ({ label, ...props }: Props) => {
    return (
        <FormControl>
            <InputGroup>
                <ChakraButton
                    borderRadius="0px"
                    bg={colors.primary}
                    color="white"
                    mx="5px"
                    {...props}
                >
                    {label}
                </ChakraButton>
            </InputGroup>
        </FormControl>
    )
}
