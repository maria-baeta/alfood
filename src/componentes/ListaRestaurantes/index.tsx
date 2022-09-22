import { Button, TextField } from '@mui/material';
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

  useEffect(() => {
    //get dos restaurantes
    clientV1.get<IPaginacao<IRestaurante>>('restaurantes/')
      .then(({ data }) => {
        setRestaurants(data.results)
        setNextPage(data.next)
      })
      .catch(error => console.log(error))
  }, [])

  const getNetxPage = () => {
    clientV1.get<IPaginacao<IRestaurante>>(nextPage)
      .then(({ data }) => {
        setRestaurants([...restaurants, ...data.results])
        setNextPage(data.next)
      })
      .catch(error => console.log(error))
  }

  const searchName = () => {
    clientV1.get('http://0.0.0.0:8000/api/v1/restaurantes/', {
      params: {
        search: search
      }
    })
      .then(({ data }) => {
        setRestaurants(data.results)
        setNextPage(data.next)
      })
      .catch(error => console.log(error))
    setSearch('')

  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    <div>
      <TextField
        id="standard-basic"
        label="Buscar por nome do restaurante"
        onChange={event => setSearch(event.target.value)}
        value={search}
        variant="standard"
      />
      <Button
        type="submit"
        variant="outlined"
        onClick={searchName}
      >
        Salvar
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

