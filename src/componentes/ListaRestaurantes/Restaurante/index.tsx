import { useEffect, useState } from 'react';
import { clientV1 } from '../../../client';
import IPrato from '../../../interfaces/IPrato';
import IRestaurante from '../../../interfaces/IRestaurante';
import Prato from '../Prato';
import estilos from './Restaurante.module.scss';

interface RestauranteProps {
  restaurante: IRestaurante
}

const Restaurante = ({ restaurante }: RestauranteProps) => {
  const { id } = restaurante
  const [menu, setMenu] = useState<IPrato[]>()

  useEffect(() => {
    clientV1.get<IPrato[]>(`restaurantes/${id}/pratos/`)
      .then(({ data }) => {
        setMenu(data)
      })
  }, [id])

  return (<section className={estilos.Restaurante}>
    <div className={estilos.Titulo}>
      <h2>{restaurante.nome}</h2>
    </div>
    <div>
      {menu?.map(item => <Prato prato={item} key={item.id} />)}
    </div>
  </section>)
}

export default Restaurante