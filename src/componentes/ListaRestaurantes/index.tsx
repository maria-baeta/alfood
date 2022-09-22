import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { clientV1 } from '../../client';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

export const ListaRestaurantes = () => {

  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')
  const [search, setSearch] = useState('')
  const [ordering, setOrdering] = useState('')

  const getRestaurants = (params?: any) => {
    console.log(params)

    if (params) {
      clientV1.get('restaurantes/', {
        params: params
      })
        .then(({ data }) => {
          setRestaurants(data.results)
          setNextPage(data.next)
        })
        .catch(error => console.log(error))
    } else {
      clientV1.get<IPaginacao<IRestaurante>>('restaurantes/')
        .then(({ data }) => {
          setRestaurants(data.results)
          setNextPage(data.next)
        })
        .catch(error => console.log(error))
    }

  }

  useEffect(() => {
    //get dos restaurantes
    getRestaurants()
  }, [])

  const getNetxPage = () => {
    clientV1.get<IPaginacao<IRestaurante>>(nextPage)
      .then(({ data }) => {
        setRestaurants([...restaurants, ...data.results])
        setNextPage(data.next)
      })
      .catch(error => console.log(error))
  }

  const handleFilters = () => {
    getRestaurants({ search: search, ordering: ordering })
  }

  const cleanFilters = () => {
    setOrdering('')
    setSearch('')
    getRestaurants()
  }

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      <div className={style.Filters}>
        <TextField
          id="standard-basic"
          label="Buscar por nome do restaurante"
          onChange={event => setSearch(event.target.value)}
          value={search}
          variant="standard"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-label">Order Restaurantes por:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={ordering}
            label="Order Restaurantes por:"
            onChange={event => setOrdering(event.target.value)}
          >
            <MenuItem value={'id'}>Id</MenuItem>
            <MenuItem value={'nome'}>Nome</MenuItem>
          </Select>

        </FormControl>
      </div>
      <div className={style.Buttons}>
        <Button
          type="submit"
          variant="outlined"
          onClick={handleFilters}
          className={style.Button}
        >
          Buscar
        </Button>
        <Button
          type="submit"
          variant="outlined"
          onClick={cleanFilters}
          className={style.Button}
        >
          Limpar
        </Button>
      </div>
      {restaurants?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {nextPage &&
        <Button
          onClick={getNetxPage}
          variant="outlined">
          Ver mais
        </Button>
      }
    </section>)
}

