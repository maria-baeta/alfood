import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { clientV2 } from "../../../../client"
import IRestaurante from "../../../../interfaces/IRestaurante"

export const ListPlates = () => {
  const [plates, setPlates] = useState<IRestaurante[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    clientV2.get("pratos/")
      .then(({ data }) => {
        setPlates(data)
      })
  }, [])

  const editPlate = (id: number) => {
    navigate(`/admin/pratos/${id}`)

  }

  const deletePlate = (id: number) => {
    clientV2.delete(`pratos/${id}/`)
      .then(() => {
        alert('Restaurante deletado com sucesso')
        const newListRestaurants = plates.filter(restaurant => restaurant.id !== id)
        setPlates([...newListRestaurants])
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
          {plates.map(plate => (
            <TableRow key={plate.id}>
              <TableCell>
                {plate.id}
              </TableCell>
              <TableCell>
                {plate.nome}
              </TableCell>
              <TableCell>
                <EditOutlinedIcon onClick={() => editPlate(plate.id)} />
                <HighlightOffOutlinedIcon onClick={() => deletePlate(plate.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )

}