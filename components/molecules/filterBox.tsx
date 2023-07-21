import { AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Box } from '@chakra-ui/react'
import React, { Dispatch, SetStateAction } from 'react'
import { Facet, Option } from '../../entities'
import { Checkbox } from '../atoms/checkbox'

interface Props {
    facet: Facet,
    facetFilters: {}
    setFacetFilters: Dispatch<SetStateAction<{}>>
}

export const FilterBox = ({ facet, facetFilters, setFacetFilters }: Props) => {

    //function to add and remove facets based off the checkbox
    const addRemoveFacet = (option: Option, e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.checked){ //add the facet
            const newFacet = {
                identifier: option.identifier,
                value: option.value
            }
            setFacetFilters(
                {...facetFilters, [facet.identifier]:(facetFilters as any)["categories"]?.concat(newFacet)}      
            )
            return
        }
        //else the remove facet and return new object
    }
    
    return (
        <AccordionItem id={facet.identifier} mt={"2px"} bg="gray.100" border="1px">
            <h2>
                <AccordionButton>
                    <Box flex='1' textAlign='left'>
                        {facet.displayName}
                    </Box>
                    <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel w="full">
                {facet.options.map((option) =>
                    <Checkbox option={option} key={option.displayValue} onChange={e => {}}/>
                )}
            </AccordionPanel>
        </AccordionItem>

    )
}
