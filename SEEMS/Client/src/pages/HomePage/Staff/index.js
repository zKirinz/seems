import React from 'react'

import { Grid } from '@mui/material'

import TitleHomePage from '../TitleHomePage'
import StaffMember from './StaffMember'

const Staffs = ({ staffs }) => {
    return (
        <React.Fragment>
            <TitleHomePage
                color="secondary"
                variant="h4"
                title="Our Staffs"
                mt={5}
                mb={2}
                align="center"
            />
            <Grid container spacing={5} columns={{ md: 12, sm: 8, xs: 6 }} id="staff">
                {staffs.map((staff) => (
                    <StaffMember {...staff} key={staff.id} />
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default Staffs
