import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Listagem from './pages/listagem';
// import FormAtivo from './pages/FormAtivo';
// import Detalhes from './pages/Detalhes'; // Criaremos depois
import Footer from './components/footer';

function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
        <nav style={{ padding: '20px', borderBottom: '1px solid #ccc', marginBottom: '20px' }}>
          <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#007BFF' }}>Listagem</Link>
          <Link to="/cadastro" style={{ textDecoration: 'none', color: '#007BFF' }}>Cadastrar Novo Ativo</Link>
        </nav>

        <main style={{ minHeight: '60vh' }}>
          <Routes>
            <Route path="/" element={<Listagem />} />
            <Route path="/cadastro" element={<FormAtivo />} />
            <Route path="/editar/:id" element={<FormAtivo />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;