import React from 'react'

import { Grid, Typography } from '@mui/material'

import BTH from '../../../assets/members/BTH.jpg'
import DGP from '../../../assets/members/DGP.jpg'
import LTT from '../../../assets/members/LTT.jpg'
import NKN from '../../../assets/members/NKN.jpg'
import TTK from '../../../assets/members/TTK.jpg'
import Member from './Member'

const members = [
    {
        id: 1,
        src: TTK,
        name: 'Trần Trung Kiên',
        grade: '(K15/Leader)',
        role: 'Frontend Developer',
    },
    {
        id: 2,
        src: NKN,
        name: 'Nguyễn Khôi Nguyên',
        grade: '(K14)',
        role: 'Backend Developer',
    },
    {
        id: 3,
        src: DGP,
        name: 'Dương Gia Phát',
        grade: '(K14)',
        role: 'Backend Developer',
    },
    {
        id: 4,
        src: BTH,
        name: 'Bùi Thế Hiển',
        grade: '(K15)',
        role: 'Frontend Developer',
    },
    {
        id: 5,
        src: LTT,
        name: 'Lê Tiến Thịnh',
        grade: '(K15)',
        role: 'Backend Developer',
    },
]

const Members = () => {
    return (
        <React.Fragment>
            <Typography color="primary" variant="h3" mt={5} mb={4} align="center" fontWeight={700}>
                Team members
            </Typography>
            <Grid container spacing={5} columns={{ md: 12, sm: 8, xs: 6 }} justifyContent="center">
                {members.map((member) => (
                    <Grid item sm={4} xs={6} md={4} key={member.id}>
                        <Member {...member} />
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default Members
