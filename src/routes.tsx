import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, ShowcaseRestaurants } from './paginas';
import { ListRestaurants, Restaurant } from './paginas/Admin';



function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<ShowcaseRestaurants />} />
          <Route path="/admin/restaurantes" element={<ListRestaurants />} />
          <Route path="/admin/restaurantes/novo" element={<Restaurant />} />
          <Route path='/admin/restaurantes/:id' element={<Restaurant />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
