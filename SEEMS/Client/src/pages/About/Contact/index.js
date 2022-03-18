import React from 'react'

import { Grid, Typography } from '@mui/material'

import MethodsContact from './MethodsContact'

const Contact = ({ contacts }) => {
    return (
        <React.Fragment>
            <Typography color="primary" variant="h3" mt={5} mb={4} align="center" fontWeight={700}>
                Contact
            </Typography>
            <Grid container spacing={5}>
                {contacts.map((contact) => (
                    <Grid item xs={12} sm={4} key={contact.name}>
                        <MethodsContact {...contact} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default Contact
