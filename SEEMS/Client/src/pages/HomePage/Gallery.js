import React from 'react'

import { Avatar, Box, Grid, Card, CardContent, Typography } from '@mui/material'

import TitleHomePage from './TitleHomePage'

const Gallery = ({ gallery }) => {
    return (
        <React.Fragment>
            <TitleHomePage
                color="primary"
                variant="h4"
                title="Gallery"
                mt={5}
                mb={2}
                align="center"
            />
            <Grid container spacing={5} columns={{ md: 12, sm: 8, xs: 6 }}>
                {gallery.map((item, index) => (
                    <Grid item sm={4} xs={6} md={4} key={index}>
                        <Box
                            position="relative"
                            sx={{ '&:hover > .dropdown': { transform: 'scaleY(1)' } }}
                        >
                            <Avatar
                                src={item.src}
                                alt="gallery-item"
                                sx={{
                                    maxWidth: '450px',
                                    height: '450px',
                                    overflow: 'unset',
                                    width: '100%',
                                }}
                            ></Avatar>
                            <Card
                                className="dropdown"
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    left: 0,
                                    bottom: 0,
                                    backgroundColor: (theme) => theme.palette.grey[900],
                                    opacity: 0.9,
                                    transition: 'all 0.3s linear',
                                    transformOrigin: 'center center',
                                    transform: 'scaleY(0)',
                                }}
                            >
                                <CardContent>
                                    <TitleHomePage
                                        color="primary.contrastText"
                                        variant="h4"
                                        title="Title here"
                                        align="left"
                                    />
                                    <Typography
                                        variant="body1"
                                        component="p"
                                        color="primary.contrastText"
                                    >
                                        Content here
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </React.Fragment>
    )
}

export default Gallery
