import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"

import { useEffect, useState } from "react"
import IRestaurante from "../../interfaces/IRestaurante"

export const Admin = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/v2/restaurantes/")
      .then(({ data }) => {
        setRestaurants(data)
      })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map(restaurant => (
            <TableRow key={restaurant.id}>
              <TableCell>
                {restaurant.nome}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}