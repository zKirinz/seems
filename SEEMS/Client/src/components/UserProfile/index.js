import { useRecoilValue } from 'recoil'

import { Avatar, Dialog, DialogContent, DialogTitle, Box, Typography } from '@mui/material'
import { blueGrey } from '@mui/material/colors'

import atom from '../../recoil/auth'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)
const data = {
    labels: ['Participation with feedback', 'Participation without feedback', 'No participation'],
    datasets: [
        {
            label: 'Activity',
            data: [12, 19, 3],
            backgroundColor: [
                'rgba(96, 255, 86, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: ['rgba(96, 255, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        },
    ],
}

const options = {
    plugins: {
        legend: {
            position: 'bottom',
            align: 'start',
            labels: {
                padding: 20,
                usePointStyle: true,
            },
        },
        tooltip: {
            callbacks: {
                label: function (TooltipItem) {
                    return `${TooltipItem.formattedValue}%`
                },
            },
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            boxWidth: 0,
            boxHeight: 0,
            xAlign: 'right',
            yAlign: 'right',
        },
    },
}

const UserProfile = ({ onClose, open }) => {
    const auth = useRecoilValue(atom)
    const hasRegisterEvent = 0

    return (
        <Dialog onBackdropClick={onClose} open={open}>
            <DialogTitle color="primary.dark">My Profile</DialogTitle>
            <DialogContent sx={{ minWidth: 450, py: 3 }} dividers>
                <Box display="flex" alignItems="center">
                    <Avatar alt="avatar" src={auth.image} sx={{ height: 100, width: 100 }} />
                    <Box sx={{ ml: 4 }}>
                        <Typography fontWeight={700} sx={{ color: blueGrey[800] }} variant="h6">
                            {auth.name} - {auth.organization}
                        </Typography>
                        <Typography variant="subtitle1">{auth.email}</Typography>
                    </Box>
                </Box>
                <Box display="flex"></Box>
                <Box sx={{ width: 300, height: 300, mx: 'auto', mt: 2 }}>
                    <Pie data={data} options={options} />
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default UserProfile
