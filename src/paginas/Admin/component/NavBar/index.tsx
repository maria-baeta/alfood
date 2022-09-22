import { AppBar, Container, Toolbar, Typography, Link, Box, Button } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography variant="h6">
            Administrador
          </Typography>
          <Box sx={{ display: 'flex', flexGrow: 1 }}>
            <Link component={RouterLink} to='/admin/restaurantes'>
              <Button sx={{ my: 2, color: "white" }}>
                Restaurantes
              </Button>
            </Link>
            <Link component={RouterLink} to='/admin/restaurantes/novo'>
              <Button sx={{ my: 2, color: "white" }}>
                Novo Restaurante
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}