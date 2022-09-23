import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { clientV2 } from "../../../../client"
import IRestaurante from "../../../../interfaces/IRestaurante"
import ITag from "../../../../interfaces/ITags"



export const Plate = () => {
  const params = useParams()
  const [plate, setPlate] = useState<string>('')
  const [tags, setTags] = useState<ITag[]>([])
  const [restaurants, setIdRestaurants] = useState<IRestaurante[]>([])
  const [description, setDescription] = useState<string>('')
  const [tag, setTag] = useState<string>('')
  const [idRestaurant, setIdRestaurant] = useState<string>('null')
  const [image, setImage] = useState<File | null>(null)

  useEffect(() => {
    clientV2.get<{ tags: ITag[] }>('/tags/')
      .then(({ data }) => setTags(data.tags))

    clientV2.get<IRestaurante[]>('/restaurantes/')
      .then(({ data }) => setIdRestaurants(data))
  }, [])

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
    const formData = new FormData()

    formData.append('nome', plate)
    formData.append('tag', tag)
    formData.append('descricao', description)
    formData.append('restaurante', idRestaurant)
    if (image) formData.append('imagem', image)

    if (params.id) {
      clientV2.request({
        url: `pratos/${params.id}/`,
        method: 'PUT',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
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
      clientV2.request({
        url: 'pratos/',
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
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
    }

  }

  const handleFile = (target: EventTarget & HTMLInputElement) => {
    if (target.files?.length) {
      setImage(target.files[0])
    } else {
      setImage(null)
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
          margin="dense"
        />
        <InputLabel id="standard-basic-description">Descrição do prato</InputLabel>
        <TextField
          fullWidth
          id="standard-basic-description"
          onChange={event => setDescription(event.target.value)}
          value={description}
          variant="standard"
          margin="dense"
        />
        <FormControl margin="dense" fullWidth>
          <InputLabel id="tag">Tag do parto</InputLabel>
          <Select labelId="tag" value={tag} onChange={(event) => setTag(event.target.value)}>
            {tags?.map(tag => {
              return (
                <MenuItem
                  key={tag.id}
                  value={tag.value}
                >
                  {tag.value}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <FormControl margin="dense" fullWidth>
          <InputLabel id="id">Restaurante</InputLabel>
          <Select labelId="id" value={idRestaurant} onChange={(event) => setIdRestaurant(event.target.value)}>
            {restaurants?.map(restaurant => {
              return (
                <MenuItem
                  key={restaurant.id}
                  value={restaurant.id}
                >
                  {restaurant.nome}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        <input type="file" onChange={({ target }) => handleFile(target)} />
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

