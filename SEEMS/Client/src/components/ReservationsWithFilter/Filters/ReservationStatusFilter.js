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

const ReservationActiveFilter = ({ submitHandler, defaultPeriod = '' }) => {
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
                            value="Attended"
                            control={<Radio />}
                            label="Feedback available"
                        />
                        <FormControlLabel
                            value="Feedbacked"
                            control={<Radio />}
                            label="Feedbacked"
                        />
                        <FormControlLabel value="Absent" control={<Radio />} label="Absent" />
                        <FormControlLabel value="" control={<Radio />} label="All" />
                    </RadioGroup>
                </FormControl>
            </AccordionDetails>
        </Accordion>
    )
}

export default ReservationActiveFilter
