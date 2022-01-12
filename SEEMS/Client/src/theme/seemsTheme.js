import { deepOrange, pink } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

const themeObject = {
    palette: {
        primary: deepOrange,
        secondary: pink,
    },
}

const seemsTheme = createTheme(themeObject)
export default seemsTheme
