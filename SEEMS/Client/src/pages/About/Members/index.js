import React from 'react'

import { Grid, Typography } from '@mui/material'

import Member from './Member'

const Members = ({ staffs }) => {
    return (
        <React.Fragment>
            <Typography color="primary" variant="h3" mt={5} mb={2} align="center" fontWeight={700}>
                Team members
            </Typography>
            <Grid container spacing={5} columns={{ md: 12, sm: 8, xs: 6 }} justifyContent="center">
                {staffs.map((staff) => (
                    <Grid item sm={4} xs={6} md={4} key={staff.id}>
                        <Member {...staff} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default Members
