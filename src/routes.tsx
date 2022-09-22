import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Admin, Clients } from './pages';
import { ListPlates, Plate } from './pages/Admin/Menus';
import { ListRestaurants, Restaurant } from './pages/Admin/Restaurants';
import { Home, ShowCaseRestaurants } from './pages/Clients/Components';




function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Clients />}>
            <Route index element={<Home />} />
            <Route path="restaurantes" element={<ShowCaseRestaurants />} />
          </Route>

          <Route path='/admin' element={< Admin />}>
            < Route path="restaurantes" element={<ListRestaurants />} />
            <Route path="restaurantes/novo" element={<Restaurant />} />
            <Route path='restaurantes/:id' element={<Restaurant />} />
            < Route path="pratos" element={<ListPlates />} />
            <Route path="pratos/novo" element={<Plate />} />
            <Route path='pratos/:id' element={<Plate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main >
  );
}

export default App;
