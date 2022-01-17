import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material'

const StaffMember = ({ name, role, src, description }) => {
    return (
        <Grid item sm={4} xs={6} md={4}>
            <Card sx={{ maxWidth: 345, margin: '0 auto' }}>
                <CardActionArea>
                    <CardMedia component="img" alt="green iguana" height="300" image={src} />
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            color="primary"
                            fontWeight={700}
                        >
                            {name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {role}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default StaffMember
