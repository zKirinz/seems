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

const EventStatusFilter = ({ submitHandler, defaultPeriod = '' }) => {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <Accordion expanded={isOpen}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={() => setIsOpen(!isOpen)}>
                <Typography variant="h6" color="primary">
                    Status
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
                        <FormControlLabel value="Pending" control={<Radio />} label="Pending" />
                        <FormControlLabel
                            value="TakingAttendance"
                            control={<Radio />}
                            label="Taking Attendance"
                        />
                        <FormControlLabel value="Finished" control={<Radio />} label="Finished" />
                        <FormControlLabel value="" control={<Radio />} label="All" />
                    </RadioGroup>
                </FormControl>
            </AccordionDetails>
        </Accordion>
    )
}

export default EventStatusFilter
