import { Grid } from '@mui/material'

import ContactForm from './ContactForm'
import MethodsContact from './MethodsContact'

const Contact = ({ contacts }) => {
    return (
        <Grid container rowSpacing={5} columnSpacing={{ md: 3 }} mt={2}>
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
    )
}

export default Contact
