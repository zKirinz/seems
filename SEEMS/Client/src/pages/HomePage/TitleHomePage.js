import { Typography } from '@mui/material'

const TitleHomePage = ({ title, color, variant, mt, mb, align }) => {
    return (
        <Typography
            color={color}
            align={align}
            sx={{
                fontWeight: (theme) => theme.typography.fontWeightBold,
            }}
            variant={variant}
            mb={mb}
            mt={mt}
        >
            {title}
        </Typography>
    )
}

TitleHomePage.defaultProps = {
    mt: 1,
    mb: 1,
}

export default TitleHomePage
