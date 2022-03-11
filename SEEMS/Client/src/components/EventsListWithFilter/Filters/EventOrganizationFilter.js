import { useState } from 'react'

import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material'
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormControl,
    FormControlLabel,
    Radio,
    RadioGroup,
    Typography,
} from '@mui/material'

const EventOrganizationFilter = ({ submitHandler, defaultPeriod = '' }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Accordion expanded={isOpen}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setIsOpen(!isOpen)}>
                <Typography variant="h6" color="primary">
                    Organization
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={defaultPeriod}
                        onChange={(e) => submitHandler(e.target.value)}
                    >
                        <FormControlLabel value="FPTU" control={<Radio />} label="FPTU" />
                        <FormControlLabel value="FCode" control={<Radio />} label="FCode" />
                        <FormControlLabel value="DSC" control={<Radio />} label="DSC" />
                        <FormControlLabel value="" control={<Radio />} label="All" />
                    </RadioGroup>
                </FormControl>
            </AccordionDetails>
        </Accordion>
    )
}

export default EventOrganizationFilter
