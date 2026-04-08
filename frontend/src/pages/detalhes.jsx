import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function Detalhes() {
  const { id } = useParams();
  const [ativo, setAtivo] = useState(null);
  const [erro, setErro] = useState('');

  useEffect(() => {
    api.get(`/ativos/${id}`)
      .then(response => setAtivo(response.data))
      .catch(() => setErro('Erro ao carregar detalhes do ativo.'));
  }, [id]);

  if (erro) return <p style={{ color: 'red' }}>{erro}</p>;
  if (!ativo) return <p>Carregando dados...</p>;

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', margin: '20px auto' }}>
      <h2>Detalhes: {ativo.ticker}</h2>
      <ul style={{ listStyleType: 'none', padding: 0, lineHeight: '1.8' }}>
        <li><strong>ID:</strong> {ativo.id}</li>
        <li><strong>Tipo:</strong> {ativo.tipo}</li>
        <li><strong>Quantidade:</strong> {ativo.quantidade}</li>
        <li><strong>Preço Médio:</strong> R$ {ativo.preco_medio}</li>
        <li><strong>Data da Compra:</strong> {new Date(ativo.data_compra).toLocaleDateString('pt-BR')}</li>
        <li><hr /></li>
        <li><strong>Total Investido:</strong> R$ {(ativo.quantidade * ativo.preco_medio).toFixed(2)}</li>
      </ul>
      <Link to="/" style={{ display: 'inline-block', marginTop: '15px', textDecoration: 'none', color: '#007BFF' }}>
        ← Voltar para Listagem
      </Link>
    </div>
  );
}

export default Detalhes;