import { Card, CardContent, Grid, Typography } from '@mui/material'

const RightDetail = ({ title, content, topics }) => {
    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography
                    component="h1"
                    fontWeight={700}
                    color="secondary"
                    sx={{ fontSize: { md: 20, lg: 24, sm: 18 } }}
                >
                    {title}
                </Typography>
                <Typography component="p" mt={2} sx={{ color: '#515154' }} fontWeight={500}>
                    {content}
                </Typography>
                <Typography
                    mt={1}
                    component="h5"
                    color="secondary"
                    fontWeight={700}
                    sx={{ textDecoration: 'underline' }}
                >
                    Topic
                </Typography>
                <Grid mt={2} container>
                    {topics.map((topic) => (
                        <Grid key={topic.id} xs={12} sm={4} item>
                            <Typography
                                fontSize={{
                                    xs: 14,
                                    sm: 18,
                                }}
                                sx={{
                                    color: (theme) => theme.palette.grey[800],
                                    textAlign: { xs: 'left', sm: 'center' },
                                }}
                            >
                                {topic.title}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default RightDetail
