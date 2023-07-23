import { Select } from '@chakra-ui/react'
import { Dispatch, SetStateAction } from 'react'
import { colors } from '../../styles/colors'

interface IOption {
    name: string
    value: string
}
interface Props {
    options: IOption[],
    placeholder: string,
    state: string,
    setState: Dispatch<SetStateAction<string>>
}

export const Dropdown = ({ options, placeholder, state, setState }: Props) => {
    return (
        <Select
            bg="white"
            color={colors.dark}
            borderRadius="0"
            borderWidth="2px"
            borderBottomWidth="4px"
            borderColor={colors.primary}
            value={state}
            onChange={(e) => setState(e.target.value)}
        >
            <option disabled value={placeholder} key={placeholder}>{placeholder}</option>
            {options.map((op) => {
                return (
                    <option value={op.value} key={op.value}>{op.name}</option>
                )
            })}
        </Select>
    )
}
