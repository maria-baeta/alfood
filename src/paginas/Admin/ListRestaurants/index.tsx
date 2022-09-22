import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { useNavigate } from "react-router-dom";
import styled from "./ListRestaurants.module.scss";
import { clientV2 } from "../../../client";
import { NavBar } from "../component/NavBar";

export const ListRestaurants = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    clientV2.get("restaurantes/")
      .then(({ data }) => {
        setRestaurants(data)
      })
  }, [])

  const editRestaurant = (id: number) => {
    navigate(`/admin/restaurantes/${id}`)

  }

  const deleteRestaurant = (id: number) => {
    clientV2.delete(`restaurantes/${id}/`)
      .then(() => {
        alert('Restaurante deletado com sucesso')
        const newListRestaurants = restaurants.filter(restaurant => restaurant.id !== id)
        setRestaurants([...newListRestaurants])
      })
  }

  return (
    <>
      <NavBar />
      <Box>
        <Container maxWidth="xl" sx={{ mt: 2 }}>
          <Paper sx={{ p: 1 }}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Nome
                    </TableCell>
                    <TableCell>
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {restaurants.map(restaurant => (
                    <TableRow key={restaurant.id}>
                      <TableCell>
                        {restaurant.nome}
                      </TableCell>
                      <TableCell>
                        <EditOutlinedIcon onClick={() => editRestaurant(restaurant.id)} />
                        <HighlightOffOutlinedIcon onClick={() => deleteRestaurant(restaurant.id)} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Container>
      </Box>
    </>

  )
}