import React from 'react'
import { Checkbox as ChakraCheckbox, CheckboxProps } from '@chakra-ui/react'
import { Option } from '../../entities'

interface Props extends CheckboxProps { 
    option: Option 
}

export const Checkbox = ({ option, ...props }: Props) => {
    return (
        <ChakraCheckbox size='md' colorScheme='white' fontWeight="medium" mt={"2px"} {...props}>
            {option.displayValue} ({option.productCount})
        </ChakraCheckbox>
    )
}
