import { createTheme } from '@mui/material/styles';
import Silkscreen from '../../asset/fonts/Silkscreen-Regular.ttf'

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
    // Attribuer une police au site
    typography: {
        fontFamily: 'Silkscreen, Arial',
      },
    // utilisée pour les media Query
    breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },

    components: {
        // nom du composant pour modifier la police du site
        MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'Raleway';
                font-style: normal;
                font-display: swap;
                font-weight: 400;
                src: local('Silkscreen'), local('Silkscreen-Regular'), url(${Silkscreen}) format('ttf');
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
            `,
          },
        // Mui suivie du nom du composant
        MuiContainer:{
            // modification du style css
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
            // modifier les proprièter applicable a un composant
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
