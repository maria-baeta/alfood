import { Box, Button, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { clientV2 } from "../../../../client"


export const Restaurant = () => {
  const params = useParams()
  const [restaurant, setRestaurant] = useState('')


  const getRestaurant = () => {
    if (params.id) {
      clientV2.get(`restaurantes/${params.id}/`)
        .then(({ data }) => {
          setRestaurant(data.nome)
        })
    }
  }

  useEffect(() => {
    if (params.id) {
      getRestaurant()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  )
}

