import { Button } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';

export const ListaRestaurantes = () => {

  const [restaurants, setRestaurants] = useState<IRestaurante[]>([])
  const [nextPage, setNextPage] = useState('')

  useEffect(() => {
    //get dos restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(({ data }) => {
        setRestaurants(data.results)
        setNextPage(data.next)
      })
      .catch(error => console.log(error))
  }, [])

  const getNetxPage = () => {
    axios.get<IPaginacao<IRestaurante>>(nextPage)
      .then(({ data }) => {
        setRestaurants([...restaurants, ...data.results])
        setNextPage(data.next)
      })
      .catch(error => console.log(error))
  }

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
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

