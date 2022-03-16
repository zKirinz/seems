import { useRecoilValue } from 'recoil'

import {
    Event,
    Comment,
    CommentsDisabled,
    WebAssetOff,
    SentimentSatisfiedAlt,
} from '@mui/icons-material'
import {
    Avatar,
    Dialog,
    DialogContent,
    DialogTitle,
    Box,
    Typography,
    Grid,
    Alert,
} from '@mui/material'
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
            backgroundColor: ['#2e7d32', '#0288d1', '#d32f2f'],
            borderColor: ['rgba(96, 255, 86, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1,
        },
    ],
}

const options = {
    plugins: {
        legend: {
            position: 'bottom',
            align: 'center',
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
            <DialogContent sx={{ minWidth: 550, maxWidth: 650, py: 3 }} dividers>
                {hasRegisterEvent !== 0 && (
                    <Box sx={{ mb: 4 }}>
                        {/* <Alert
                        severity="success"
                        variant="outlined"
                        sx={{ textAlign: 'center', justifyContent: 'center' }}
                        icon={<ThumbUp />}
                    >
                        You are doing well! Keep it up!
                    </Alert> */}
                        <Alert
                            severity="warning"
                            variant="outlined"
                            sx={{
                                textAlign: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            You&apos;ve been absence twice. Your account will be banned if reaching
                            three times and you have to contact IT department to get unbanned.
                        </Alert>
                    </Box>
                )}
                <Box display="flex" alignItems="center">
                    <Avatar alt="avatar" src={auth.image} sx={{ height: 100, width: 100 }} />
                    <Box sx={{ ml: 4 }}>
                        <Typography fontWeight={700} sx={{ color: blueGrey[800] }} variant="h6">
                            {auth.name} - {auth.organization}
                        </Typography>
                        <Typography variant="subtitle1">{auth.email}</Typography>
                    </Box>
                </Box>
                {hasRegisterEvent === 0 && (
                    <Box
                        sx={{
                            mt: 5.5,
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <SentimentSatisfiedAlt fontSize="large" sx={{ color: blueGrey[500] }} />
                        <Typography sx={{ ml: 0.75 }}>
                            You have not
                            <Typography
                                sx={{
                                    fontStyle: 'italic',
                                    fontWeight: 700,
                                    mx: 0.6,
                                }}
                                color="primary"
                                component="span"
                            >
                                Registered
                            </Typography>
                            any event.
                        </Typography>
                    </Box>
                )}
                {hasRegisterEvent !== 0 && (
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item sm={6} xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexDirection="column"
                                    sx={{ border: '1px solid #ff5722', p: 2 }}
                                >
                                    <Event fontSize="large" color="primary" />
                                    <Typography
                                        fontWeight={700}
                                        variant="h5"
                                        sx={{ my: 1, color: blueGrey[800] }}
                                    >
                                        15
                                    </Typography>
                                    <Typography variant="body2">Total Registration</Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexDirection="column"
                                    sx={{ border: '1px solid #2e7d32', p: 2 }}
                                >
                                    <Comment fontSize="large" color="success" />
                                    <Typography
                                        fontWeight={700}
                                        variant="h5"
                                        sx={{ my: 1, color: blueGrey[800] }}
                                    >
                                        20
                                    </Typography>
                                    <Typography variant="body2">
                                        Participation with feedback
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexDirection="column"
                                    sx={{ border: '1px solid #0288d1', p: 2 }}
                                >
                                    <CommentsDisabled fontSize="large" color="info" />
                                    <Typography
                                        fontWeight={700}
                                        variant="h5"
                                        sx={{ my: 1, color: blueGrey[800] }}
                                    >
                                        10
                                    </Typography>
                                    <Typography variant="body2">
                                        Participation without feedback
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={6} xs={12}>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    flexDirection="column"
                                    sx={{ border: '1px solid #d32f2f', p: 2 }}
                                >
                                    <WebAssetOff fontSize="large" color="error" />
                                    <Typography
                                        fontWeight={700}
                                        variant="h5"
                                        sx={{ my: 1, color: blueGrey[800] }}
                                    >
                                        5
                                    </Typography>
                                    <Typography variant="body2">
                                        Registration without attendance
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ width: 400, mx: 'auto', mt: 5 }}>
                            <Pie data={data} options={options} />
                        </Box>
                    </Box>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default UserProfile
