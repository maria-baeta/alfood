import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"

const NewRestaurant = () => {
  const [newRestaurant, setNewRestaurant] = useState('')

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post('http://0.0.0.0:8000/api/v2/restaurantes/', {
      nome: newRestaurant
    })
      .then(() => {
        alert('Restaurante cadastrado com sucesso')
      })
      .catch(({ response }) => {
        const keys = Object.keys(response.data)
        console.log(keys);
        keys.map((key) => (
          alert(`${key.toLocaleUpperCase()}: ${response.data.nome}`)
        ))
      })
  }

  return (
    <form onSubmit={event => submitForm(event)}>
      <TextField
        id="standard-basic"
        label="Nome do novo restaurante"
        onChange={event => setNewRestaurant(event.target.value)}
        value={newRestaurant}
        variant="standard"
      />
      <Button
        type="submit"
        variant="outlined">
        Salvar
      </Button>
    </form>
  )
}

export default NewRestaurant