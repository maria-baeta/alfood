import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Banner, Footer, NavBar } from "../../../componentes"

export const Restaurant = () => {
  const params = useParams()
  const [restaurant, setRestaurant] = useState('')

  useEffect(() => {
    if (params.id) {
      axios.get(`http://0.0.0.0:8000/api/v2/restaurantes/${params.id}/`)
        .then(({ data }) => {
          setRestaurant(data.nome)
        })
    }
  }, [params])



  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (params.id) {
      axios.put(`http://0.0.0.0:8000/api/v2/restaurantes/${params.id}/`, {
        nome: restaurant
      })
        .then(() => {
          alert('Restaurante atualizado com sucesso',)
        })
        .catch(({ response }) => {
          const keys = Object.keys(response.data)
          console.log(keys);
          keys.map((key) => (
            alert(`${key.toLocaleUpperCase()}: ${response.data.nome}`)
          ))
        })
    } else {

      axios.post('http://0.0.0.0:8000/api/v2/restaurantes/', {
        nome: restaurant
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


  }

  return (

    <>
      <NavBar headers={["admin"]} />
      <Banner />
      <section>
        <form onSubmit={event => submitForm(event)}>
          <TextField
            id="standard-basic"
            label="Nome do novo restaurante"
            onChange={event => setRestaurant(event.target.value)}
            value={restaurant}
            variant="standard"
          />
          <Button
            type="submit"
            variant="outlined">
            Salvar
          </Button>
        </form>
      </section>
      <Footer />
    </>

  )
}

