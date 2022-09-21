import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom'

const handleHeaders = (header: string) => {
  switch (header) {
    case 'restaurants':
      return <Link to="/restaurantes">Restaurantes</Link>
    case 'admin':
      return < Link to="/admin/restaurantes" > Administrador</Link >
    case 'home':
      return <Link to="/">Home</Link>
    default:
      return
  }
}

export const NavBar = ({ headers }: any) => {

  return (<nav className={estilos.Link}>
    <ul>
      {
        headers.map((header: string) => (
          <li>
            {handleHeaders(header)}
          </li>
        ))
      }

    </ul>
  </nav>)
}

