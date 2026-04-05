import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    <div>
      <h2>{id ? 'Editar Ativo' : 'Cadastrar Novo Ativo'}</h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input name="ticker" value={formData.ticker} onChange={handleChange} placeholder="Ticker (Ex: VALE3)" required />
        
        <select name="tipo" value={formData.tipo} onChange={handleChange}>
          <option value="Ação">Ação</option>
          <option value="FII">FII</option>
          <option value="BDR">BDR</option>
          <option value="ETF">ETF</option>
        </select>
        
        <input type="number" name="quantidade" value={formData.quantidade} onChange={handleChange} placeholder="Quantidade" step="0.01" required />
        <input type="number" name="preco_medio" value={formData.preco_medio} onChange={handleChange} placeholder="Preço Médio" step="0.01" required />
        <input type="date" name="data_compra" value={formData.data_compra} onChange={handleChange} required />
        
        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer' }}>
          {id ? 'Atualizar' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}

export default FormAtivo;