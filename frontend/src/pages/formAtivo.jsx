import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../services/api';

function FormAtivo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [erro, setErro] = useState('');
  
  const [formData, setFormData] = useState({
    ticker: '',
    tipo: 'Ação',
    quantidade: '',
    preco_medio: '',
    data_compra: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/ativos/${id}`)
        .then(response => {
          const dataFormatada = response.data.data_compra.split('T')[0];
          setFormData({ ...response.data, data_compra: dataFormatada });
        })
        .catch(() => setErro('Erro ao carregar dados do ativo.'));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      if (id) {
        await api.put(`/ativos/${id}`, formData);
      } else {
        await api.post('/ativos', formData);
      }
      navigate('/');
    } catch (err) {
      setErro(err.response?.data?.error || 'Erro ao salvar o ativo.');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-success text-white">
            <h4 className="mb-0">{id ? 'Editar Ativo' : 'Cadastrar Novo Ativo'}</h4>
          </div>
          <div className="card-body p-4">
            {erro && <div className="alert alert-danger">{erro}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Ticker</label>
                <input className="form-control" name="ticker" value={formData.ticker} onChange={handleChange} placeholder="Ex: VALE3" required />
              </div>
              
              <div className="mb-3">
                <label className="form-label fw-bold">Tipo de Ativo</label>
                <select className="form-select" name="tipo" value={formData.tipo} onChange={handleChange}>
                  <option value="Ação">Ação</option>
                  <option value="FII">Fundo Imobiliário (FII)</option>
                  <option value="BDR">BDR</option>
                  <option value="ETF">ETF</option>
                </select>
              </div>
              
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Quantidade</label>
                  <input type="number" className="form-control" name="quantidade" value={formData.quantidade} onChange={handleChange} placeholder="0" step="0.01" required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label fw-bold">Preço Médio (R$)</label>
                  <input type="number" className="form-control" name="preco_medio" value={formData.preco_medio} onChange={handleChange} placeholder="0.00" step="0.01" required />
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label fw-bold">Data da Compra</label>
                <input type="date" className="form-control" name="data_compra" value={formData.data_compra} onChange={handleChange} required />
              </div>
              
              <div className="d-flex justify-content-between">
                <Link to="/" className="btn btn-outline-secondary">Cancelar</Link>
                <button type="submit" className="btn btn-success px-4">
                  {id ? 'Atualizar Ativo' : 'Salvar Ativo'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormAtivo;