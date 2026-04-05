import { useEffect, useState } from 'react';
import api from '../services/api';

function Listagem() {
  const [ativos, setAtivos] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    api.get('/ativos')
      .then(response => setAtivos(response.data))
      .catch(err => setErro("Não foi possível carregar os dados. Verifique se o servidor está rodando."));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Meus Investimentos</h1>
      
      {erro && <p style={{ color: 'red' }}>{erro}</p>}

      <table border="1" style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Tipo</th>
            <th>Quantidade</th>
            <th>Preço Médio</th>
          </tr>
        </thead>
        <tbody>
          {ativos.map(ativo => (
            <tr key={ativo.id}>
              <td>{ativo.ticker}</td>
              <td>{ativo.tipo}</td>
              <td>{ativo.quantidade}</td>
              <td>R$ {ativo.preco_medio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listagem;