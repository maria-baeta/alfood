import { Routes, Route } from 'react-router-dom';
import { Admin, Home, ShowcaseRestaurants } from './paginas';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<ShowcaseRestaurants />} />
      <Route path="/admin/restaurantes" element={<Admin />} />
    </Routes>
  );
}

export default App;
