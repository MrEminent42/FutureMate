import { createTheme } from "@mui/material";
import '../index.css'
import blue from "@mui/material/colors/blue";
import green from "@mui/material/colors/green";
import grey from "@mui/material/colors/grey";

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: green[100],
        },
        secondary: {
            main: 'rgba(232,90,141,0.96)',
        },
        background: {
            default: '#f1f1f1',
        },
    },
    typography: {
        fontFamily: 'Poppins',
        h5: {
            fontWeight: '700',
            fontSize: '.9rem',
        },
        h6: {
            fontWeight: '700',
            fontSize: '0.6rem',
            color: grey[500],
        }
    },
    shape: {
        borderRadius: 15,
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: 'primary.main'
                }
            },
            defaultProps: {
                position: 'sticky',
                elevation: 10,
            }
        },
        // MuiPaper: {
        //     styleOverrides: {
        //         root: {
        //             borderRadius: 30
        //         }
        //     }
        // }

    }

})

export default theme;