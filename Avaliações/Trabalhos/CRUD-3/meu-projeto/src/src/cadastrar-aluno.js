import React, { useState, useEffect } from 'react';
import './cadastrar-aluno.css';

function CadastrarAluno() {
  const [nome, setNome] = useState('');
  const [turma, setTurma] = useState('');
  const [turmas, setTurmas] = useState([]);
  const [novaTurma, setNovaTurma] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/turmas')
      .then((res) => res.json())
      .then((data) => setTurmas(data))
      .catch((err) => console.error('Erro ao buscar turmas:', err));
  }, []);

  const handleCadastrarAluno = (event) => {
    event.preventDefault();

    const aluno = { nome, turma };

    fetch('http://localhost:5000/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno),
    })
      .then((res) => res.json())
      .then(() => {
        setNome('');
        setTurma('');
        setMessage({ type: 'success', text: 'Aluno cadastrado com sucesso!' });
      })
      .catch((err) => {
        console.error('Erro ao cadastrar aluno:', err);
        setMessage({ type: 'error', text: 'Erro ao cadastrar aluno.' });
      });
  };

  const handleAdicionarTurma = (event) => {
    event.preventDefault();
    fetch('http://localhost:5000/turmas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novaTurma }),
    })
      .then((res) => res.json())
      .then((turmaAdicionada) => {
        setTurmas([...turmas, turmaAdicionada]);
        setNovaTurma('');
        alert('Turma adicionada com sucesso!');
      })
      .catch((err) => console.error('Erro ao adicionar turma:', err));
  };

  return (
    <div className="container">
      <h2>Cadastrar Novo Aluno</h2>
      <form onSubmit={handleCadastrarAluno}>
        <label htmlFor="nome">Nome do Aluno</label>
        <input
          type="text"
          id="nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label htmlFor="turma">Turma</label>
        <select
          id="turma"
          name="turma_id"
          value={turma}
          onChange={(e) => setTurma(e.target.value)}
          required
        >
          <option value="" disabled>
            Selecione uma turma
          </option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome}
            </option>
          ))}
        </select>

        <button type="submit">Cadastrar</button>
      </form>

      {message && <div className={`alert alert-${message.type}`}>{message.text}</div>}

      <button
        className="back-button"
        onClick={() => (window.location.href = '/')}
      >
        Voltar à tela inicial
      </button>
    </div>
  );
}

export default CadastrarAluno;
