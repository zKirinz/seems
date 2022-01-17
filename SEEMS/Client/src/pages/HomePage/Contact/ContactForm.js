import React from 'react'

import {
    Box,
    Button,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Paper,
    TextField,
} from '@mui/material'

const ContactForm = () => {
    return (
        <Box component={Paper} elevation={2} maxWidth={1200} sx={{ p: 4, margin: '0 auto' }}>
            <Box component="form">
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    <FormControl sx={{ m: 1, width: { sm: '45%', xs: '100%' } }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Họ và tên</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-fullName"
                            startAdornment={
                                <InputAdornment position="start">Họ Tên</InputAdornment>
                            }
                            label="FullName"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: { sm: '45%', xs: '100%' } }}>
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-email"
                            startAdornment={<InputAdornment position="start">Email</InputAdornment>}
                            label="email"
                            color="primary"
                        />
                    </FormControl>
                    <FormControl sx={{ m: 1, width: { sm: '45%', xs: '100%' } }}>
                        <InputLabel htmlFor="outlined-adornment-phone">Số điện thoại</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-phone"
                            startAdornment={
                                <InputAdornment position="start">Số điện thoại</InputAdornment>
                            }
                            label="phoneNumber"
                        />
                    </FormControl>
                </Box>
                <FormControl sx={{ m: 1 }} fullWidth>
                    <TextField
                        fullWidth
                        label="Ý kiến của bạn"
                        id="message"
                        minRows={10}
                        multiline
                    />
                </FormControl>
                <Button variant="contained" sx={{ m: 1 }}>
                    Submit
                </Button>
            </Box>
        </Box>
    )
}

export default ContactForm
