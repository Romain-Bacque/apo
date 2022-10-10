import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    /* 
        interface PaletteColor {
        light?: string;
        main: string;
        dark?: string;
        contrastText?: string;
        }
    */
    palette: {
        // la couleur la plus utiliser, éléments d'interface primaires.
        primary: {
            main: '#f2cc96',
            light: '#ffffc7',
            dark: '#be9b68'
        },
        // facultatif, éléments d'interface secondaire
        secondary: {
            main: '#F7EBC9',
            light: '#fffffc',
            dark: '#c4b998'
        },
        // éléments d'interface dont l'utilisateur doit être informé.
        error: {
            main: '#d32f2f'
        },
        // messages importants, actions potentiellement dangereuses.
        warning: {
            main: '#ed6c02'
        },
        // informations neutres et pas nécessairement importantes.
        info: {
            main: '#0288d1'
        },
        // indiquer la réussite d'une action 
        success: {
            main: '#2e7d32'
        },
        /* 
            Si "contrastText" est omis, 
            sa valeur sera calculée pour contraster avec "main", 
            selon la valeur de "contrastThreshold".
        */
        contrastThreshold: 3,
        /* 
            Si les touches "dark" et/ou "light" sont omises, 
            leur(s) valeur(s) seront calculées à partir de "main", 
            selon la valeur de "tonalOffset".
        */
        tonalOffset: 0.2 //  nombre compris entre 0 et 1

    },

    components: {
        MuiContainer:{
            styleOverrides:{
                root:{
                    marginTop: '120px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginBottom: '20px',
                    gap: '2rem',
                    width: '100%',
                    paddingTop: '1rem',
                    paddingBottom: '1rem', 
                }
            }
        },
        MuiButton:{
            defaultProps: {
                variant: 'contained',  
            },
            styleOverrides:{
                root:{                  
                    width: '100%',
                    marginTop: '1rem',
                    marginBottom: '1rem',     
                }
            }
        },
        MuiTextField:{
            defaultProps: {
                variant: 'filled',
            },
            styleOverrides:{
                root:{                  
                    width: '100%'  
                }
            }
        },

    }
});

export default theme;
