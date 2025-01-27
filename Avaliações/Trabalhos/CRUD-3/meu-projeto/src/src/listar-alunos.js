import React, { useEffect, useState } from 'react';
import './listar-alunos.css';

function ListarAlunos() {
  const [alunos, setAlunos] = useState([]);
  const [sortOrder, setSortOrder] = useState({ column: null, ascending: true });

  // Carregar os alunos do backend ao montar o componente
  useEffect(() => {
    fetch('http://localhost:5000/alunos')
      .then((res) => res.json())
      .then((data) => setAlunos(data))
      .catch((err) => {
        console.error('Erro ao carregar alunos:', err);
        alert('Erro ao carregar os alunos.');
      });
  }, []);

  const confirmDelete = (alunoId) => {
    const senha = prompt('Por favor, insira a senha para excluir o aluno:');
    if (senha === '123') {
      // Se a senha estiver correta, excluir o aluno
      fetch(`http://localhost:5000/alunos/${alunoId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (res.ok) {
            setAlunos(alunos.filter((aluno) => aluno.id !== alunoId));
            alert('Aluno excluído com sucesso!');
          } else {
            alert('Erro ao excluir aluno.');
          }
        })
        .catch((err) => {
          console.error('Erro ao excluir aluno:', err);
          alert('Erro ao excluir aluno.');
        });
    } else {
      alert('Senha incorreta.');
    }
  };

  const sortTable = (column) => {
    const isAscending = sortOrder.column === column ? !sortOrder.ascending : true;
    setSortOrder({ column, ascending: isAscending });

    const sortedAlunos = [...alunos].sort((a, b) => {
      if (a[column] < b[column]) return isAscending ? -1 : 1;
      if (a[column] > b[column]) return isAscending ? 1 : -1;
      return 0;
    });

    setAlunos(sortedAlunos);
  };

  return (
    <div className="container">
      <h2>Lista de Alunos e suas Turmas</h2>
      <table>
        <thead>
          <tr>
            <th onClick={() => sortTable('id')}>Cod. do Aluno &#9662;</th>
            <th onClick={() => sortTable('nome')}>Nome do Aluno &#9662;</th>
            <th onClick={() => sortTable('turma')}>Turma &#9662;</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.id}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.turma}</td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => confirmDelete(aluno.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="back-button"
        onClick={() => (window.location.href = '/')}
      >
        Voltar à tela inicial
      </button>
    </div>
  );
}

export default ListarAlunos;
