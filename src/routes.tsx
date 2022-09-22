import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Admin, Clients } from './pages';
import { ListRestaurants, Restaurant } from './pages/Admin/Component';
import { Home, ShowCaseRestaurants } from './pages/Clients/Components';




function App() {

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Clients />}>
            <Route index element={<Home />} />
            <Route path="/restaurantes" element={<ShowCaseRestaurants />} />
          </Route>

          <Route path='/admin' element={< Admin />}>
            < Route path="restaurantes" element={<ListRestaurants />} />
            <Route path="restaurantes/novo" element={<Restaurant />} />
            <Route path='restaurantes/:id' element={<Restaurant />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </main >
  );
}

export default App;
