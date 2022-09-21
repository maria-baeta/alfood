import { Banner, Footer, ListaRestaurantes, NavBar } from "../../componentes";


export const ShowcaseRestaurants = () => {
  return (
    <>
      <NavBar headers={['home', 'restaurants', "admin"]} />
      <Banner />
      <ListaRestaurantes />
      <Footer />
    </>
  );
}

