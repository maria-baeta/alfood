import { Box, Button, InputLabel, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { clientV2 } from "../../../../client"


export const Plate = () => {
  const params = useParams()
  const [plate, setPlate] = useState<string>()
  const [tag, setTag] = useState<string>()
  const [description, setDescription] = useState<string>()
  const [idRestaurant, setIdRestaurant] = useState<string>()


  useEffect(() => {
    if (params.id) {
      clientV2.get(`pratos/${params.id}/`)
        .then(({ data }) => {
          setPlate(data.nome)
          setTag(data.tag)
          setDescription(data.descricao)
          setIdRestaurant(data.restaurante)
        })
    }
  }, [params])



  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (params.id) {
      clientV2.put(`pratos/${params.id}/`, {
        nome: plate,
        tag: tag,
        descricao: description,
        restaurante: Number(idRestaurant)
      })
        .then(() => {
          alert('Parto atualizado com sucesso',)
        })
        .catch(({ response }) => {
          const keys = Object.keys(response.data)
          keys.map((key) => (
            alert(`${key.toLocaleUpperCase()}: ${response.data.nome}`)
          ))
        })
    } else {

      clientV2.post('pratos/', {
        nome: plate
      })
        .then(() => {
          alert('Parto cadastrado com sucesso')
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
        Formulário de pratos
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
        <InputLabel id="standard-basic-plate">Nome do novo parto</InputLabel>
        <TextField
          fullWidth
          id="standard-basic-plate"
          onChange={event => setPlate(event.target.value)}
          value={plate}
          variant="standard"
        />
        <InputLabel id="standard-basic-tag">Tag do parto</InputLabel>
        <TextField
          fullWidth
          id="standard-basic-tag"
          onChange={event => setTag(event.target.value)}
          value={tag}
          variant="standard"
        />
        <InputLabel id="standard-basic-description">Descrição do prato</InputLabel>
        <TextField
          fullWidth
          id="standard-basic-description"
          onChange={event => setDescription(event.target.value)}
          value={description}
          variant="standard"
        />
        <InputLabel id="standard-basic-id">Id do Restaurante</InputLabel>
        <TextField
          fullWidth
          id="standard-basic-id"
          onChange={event => setIdRestaurant(event.target.value)}
          value={idRestaurant}
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

