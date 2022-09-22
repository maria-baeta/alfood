import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { clientV2 } from "../../../../client";
import IRestaurante from "../../../../interfaces/IRestaurante";


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
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Id
            </TableCell>
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
                {restaurant.id}
              </TableCell>
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
  )
}