import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Listagem from './pages/listagem';
import FormAtivo from './pages/formAtivo';
import Detalhes from './pages/detalhes';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100 bg-light">
        <Header />
        <main className="container-fluid px-4 flex-grow-1 mb-5">
          <Routes>
            <Route path="/" element={<Listagem />} />
            <Route path="/cadastro" element={<FormAtivo />} />
            <Route path="/editar/:id" element={<FormAtivo />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;