import { Card, CardContent, CardMedia, Typography } from '@mui/material'

const StaffMember = ({ name, role, src, grade }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
            <CardMedia component="img" alt={name} height="300" image={src} />
            <CardContent>
                <Typography gutterBottom variant="h5" color="primary" fontWeight={700}>
                    {name} ({grade})
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                    {role}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default StaffMember
