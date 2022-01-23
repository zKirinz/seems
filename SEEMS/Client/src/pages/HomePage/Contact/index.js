import React from 'react'

import { Grid } from '@mui/material'

import TitleHomePage from '../TitleHomePage'
import ContactForm from './ContactForm'
import MethodsContact from './MethodsContact'

const Contact = ({ contacts }) => {
    return (
        <React.Fragment>
            <TitleHomePage
                color="primary"
                variant="h4"
                title="Contact Us"
                mt={5}
                mb={2}
                align="center"
            />
            <Grid container rowSpacing={5} columnSpacing={{ md: 3 }}>
                <Grid container item xs={12} sm={12} md={3} spacing={5}>
                    {contacts.map((contact) => (
                        <Grid item xs={12} sm={4} md={12} key={contact.name}>
                            <MethodsContact {...contact} />
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={12} sm={12} md={9}>
                    <ContactForm />
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default Contact
