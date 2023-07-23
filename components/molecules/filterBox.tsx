import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Facet, Option } from '../../entities'
import { FF } from '../../pages'
import { colors } from '../../styles/colors'
import { Checkbox } from '../atoms/checkbox'

interface Props {
    facet: Facet,
    facetFilters: FF[]
    setFacetFilters: Dispatch<SetStateAction<FF[]>>
}

export const FilterBox = ({ facet, facetFilters, setFacetFilters }: Props) => {

    //function to add and remove facets based off the checkbox
    const addRemoveFacet = (option: Option, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.checked) { //add the facet
            setFacetFilters(
                [...facetFilters, { type: facet.identifier, identifier: option.identifier, value: option.value }]
            )
            return
        }
        const filteredFacets = facetFilters.filter(f => f.identifier !== option.identifier)
        setFacetFilters(filteredFacets)
        //else the remove facet and return new object
    }

    return (
        <AccordionItem
            id={facet.identifier}
            mt={"2px"}
            border="0px"
            borderColor={colors.primary}
            bg={colors.primary}
            color="white"
        >
            <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                        {facet.displayName}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel w="full" display="inline-grid">
                {facet.options.map((option) =>
                    <Checkbox
                        isChecked={facetFilters.filter(f => f.identifier === option.identifier).length > 0}
                        option={option}
                        key={option.identifier}
                        onChange={e => addRemoveFacet(option, e)} />
                )}
            </AccordionPanel>
        </AccordionItem>

    )
}
