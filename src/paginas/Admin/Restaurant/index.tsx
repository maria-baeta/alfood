import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { clientV2 } from "../../../client"
import { NavBar } from "../component/NavBar"

export const Restaurant = () => {
  const params = useParams()
  const [restaurant, setRestaurant] = useState('')

  useEffect(() => {
    if (params.id) {
      clientV2.get(`http://0.0.0.0:8000/api/v2/restaurantes/${params.id}/`)
        .then(({ data }) => {
          setRestaurant(data.nome)
        })
    }
  }, [params])



  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (params.id) {
      clientV2.put(`restaurantes/${params.id}/`, {
        nome: restaurant
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso',)
        })
        .catch(({ response }) => {
          const keys = Object.keys(response.data)
          keys.map((key) => (
            alert(`${key.toLocaleUpperCase()}: ${response.data.nome}`)
          ))
        })
    } else {

      clientV2.post('restaurantes/', {
        nome: restaurant
      })
        .then(() => {
          alert('Restaurante cadastrado com sucesso')
        })
        .catch(({ response }) => {
          const keys = Object.keys(response.data)
          keys.map((key) => (
            alert(`${key.toLocaleUpperCase()}: ${response.data.nome}`)
          ))
        })
    }


  }

  return (

    <>
      <NavBar />
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>

            <Box sx={
              {
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                marginTop: '10px'
              }
            }>
              <Typography
                component='h1'
                variant="h6"
              >
                Formulário de Restaurantes
              </Typography>
              <Box
                component='form'
                onSubmit={event => submitForm(event)}
                sx={
                  {
                    width: '100%'
                  }
                }

              >
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Nome do novo restaurante"
                  onChange={event => setRestaurant(event.target.value)}
                  value={restaurant}
                  variant="standard"
                />
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: "10px" }}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  )
}

