import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold" to="/"> Dashboard Financeiro</Link>
        
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/">Listagem</Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="btn btn-success fw-bold px-4" to="/cadastro">
                + Novo Ativo
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;