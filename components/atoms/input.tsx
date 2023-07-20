import { FormControl, InputGroup, Text, Input as ChakraInput } from '@chakra-ui/react'
import React from 'react'
import { colors } from '../../styles/colors'

export const Input = ({label}: {label: string}) => {
    return (
        <FormControl>
            <Text color={colors.dark} fontWeight="bold">{label}</Text>
            <InputGroup>
                <ChakraInput 
                    borderLeftWidth="4px"
                    borderRadius="0px"
                    borderLeftColor={colors.primary}
                    focusBorderColor={colors.primary}
                />
            </InputGroup>
        </FormControl>
    )
}
