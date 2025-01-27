import React, { useState, useEffect } from 'react';
import './cadastrar-turma.css';

function CadastrarTurma() {
  const [nome, setNome] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [message, setMessage] = useState(null);

  // Carregar as turmas do backend ao montar o componente
  useEffect(() => {
    fetch('http://localhost:5000/turmas')
      .then((res) => res.json())
      .then((data) => setTurmas(data))
      .catch((err) => {
        console.error('Erro ao carregar turmas:', err);
        setMessage({ type: 'error', text: 'Erro ao carregar as turmas.' });
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/turmas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome }),
    })
      .then((res) => res.json())
      .then((novaTurma) => {
        setTurmas([...turmas, novaTurma]);
        setNome('');
        setMessage({ type: 'success', text: 'Turma cadastrada com sucesso!' });
      })
      .catch((err) => {
        console.error('Erro ao cadastrar turma:', err);
        setMessage({ type: 'error', text: 'Erro ao cadastrar a turma.' });
      });
  };

  const handleDelete = (id) => {
    if (
      window.confirm(
        'Tem certeza que deseja excluir esta turma? A exclusão só será permitida se não houver alunos na turma.'
      )
    ) {
      fetch(`http://localhost:5000/turmas/${id}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setTurmas(turmas.filter((t) => t.id !== id));
            setMessage({ type: 'success', text: 'Turma excluída com sucesso!' });
          } else {
            throw new Error('Não foi possível excluir a turma.');
          }
        })
        .catch((err) => {
          console.error('Erro ao excluir turma:', err);
          setMessage({ type: 'error', text: 'Erro ao excluir a turma.' });
        });
    }
  };

  return (
    <div className="container">
      <h2>Cadastrar Nova Turma</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome da Turma</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <h3>Turmas Cadastradas</h3>
      {turmas.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Nome da Turma</th>
              <th>Quantidade de Alunos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma) => (
              <tr key={turma.id}>
                <td>{turma.nome}</td>
                <td>{turma.quantidade_alunos || 0}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(turma.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhuma turma cadastrada ainda.</p>
      )}

      <button
        className="back-button"
        onClick={() => (window.location.href = '/')}
      >
        Voltar à tela inicial
      </button>
    </div>
  );
}

export default CadastrarTurma;
