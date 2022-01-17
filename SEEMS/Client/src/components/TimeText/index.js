import { Typography } from '@mui/material'

const TimeText = ({ color, variant, component, time, stroke }) => {
    const isTextStroke = stroke ? `1px ${color}` : '0px'
    const textFill = stroke ? 'transparent' : 'unset'
    return (
        <Typography
            color={color}
            component={component}
            sx={{
                fontWeight: (theme) => theme.typography.fontWeightBold,
                WebkitTextStroke: isTextStroke,
                WebkitTextFillColor: textFill,
            }}
            align="center"
            variant={variant}
            mt={1}
        >
            {time}
        </Typography>
    )
}

export default TimeText
