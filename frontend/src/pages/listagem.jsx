import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function Listagem() {
  const [ativos, setAtivos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    carregarAtivos();
  }, []);

  const carregarAtivos = () => {
    api.get('/ativos')
      .then(response => {
        setAtivos(response.data.data || []); 
      })
      .catch(err => setErro("Não foi possível carregar os dados. Verifique se o backend está rodando."));
  };

  const handleExcluir = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir este ativo?")) {
      try {
        await api.delete(`/ativos/${id}`);
        carregarAtivos(); 
      } catch (err) {
        alert("Erro ao excluir o ativo.");
      }
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h4 className="mb-0">Meus Investimentos</h4>
      </div>
      <div className="card-body">
        {erro && <div className="alert alert-danger">{erro}</div>}

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Ticker</th>
                <th>Tipo</th>
                <th>Quantidade</th>
                <th>Preço Médio</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {ativos.map(ativo => (
                <tr key={ativo.id}>
                  <td className="fw-bold">{ativo.ticker}</td>
                  <td><span className="badge bg-secondary">{ativo.tipo}</span></td>
                  <td>{ativo.quantidade}</td>
                  <td>R$ {ativo.preco_medio}</td>
                  <td className="text-center">
                    <div className="btn-group" role="group">
                      <Link to={`/detalhes/${ativo.id}`} className="btn btn-sm btn-outline-info">Detalhes</Link>
                      <Link to={`/editar/${ativo.id}`} className="btn btn-sm btn-outline-warning">Editar</Link>
                      <button onClick={() => handleExcluir(ativo.id)} className="btn btn-sm btn-outline-danger">Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
              {ativos.length === 0 && !erro && (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    Nenhum ativo cadastrado ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Listagem;