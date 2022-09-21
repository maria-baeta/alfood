import { Routes, Route } from 'react-router-dom';
import { Admin, Home, ShowcaseRestaurants } from './paginas';
import NewRestaurant from './paginas/Admin/NewRestaurant';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<ShowcaseRestaurants />} />
      <Route path="/admin/restaurantes" element={<Admin />} />
      <Route path="/admin/restaurantes/novo" element={<NewRestaurant />} />
    </Routes>
  );
}

export default App;
