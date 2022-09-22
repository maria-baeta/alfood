import { AppBar, Container, Toolbar, Typography, Link, Box, Button, Paper } from "@mui/material"
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { Link as RouterLink, Outlet, useNavigate } from 'react-router-dom'

export const Admin = () => {
  const navigate = useNavigate()

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <ArrowBackIosNewOutlinedIcon
              fontSize="small"
              onClick={() => navigate(-1)}
            />
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
      <Box>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Paper sx={{ p: 1 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  )
}