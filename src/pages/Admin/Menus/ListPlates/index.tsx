import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { clientV2 } from "../../../../client"
import IPrato from "../../../../interfaces/IPrato";

export const ListPlates = () => {
  const [plates, setPlates] = useState<IPrato[]>([])
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
        alert('Parto deletado com sucesso')
        const newListPlates = plates.filter(plate => plate.id !== id)
        setPlates([...newListPlates])
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