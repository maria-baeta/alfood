import Banner from '../../componentes/Banner';
import ListaRestaurantes from '../../componentes/ListaRestaurantes';
import NavBar from '../../componentes/NavBar';
import Rodape from '../../componentes/Rodape';

export const ShowcaseRestaurants = () => {
  return (
    <>
      <NavBar />
      <Banner />
      <ListaRestaurantes />
      <Rodape />
    </>
  );
}

