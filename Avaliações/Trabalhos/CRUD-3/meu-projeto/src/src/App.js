import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CadastrarAluno from './cadastrar-aluno';
import CadastrarTurma from './cadastrar-turma';
import ListarAlunos from './listar-alunos';

function App() {
  return (
    <Router>
      <div className="container">
        <h1>Sistema de Cadastro</h1>
        <p>Bem-vindo ao sistema de cadastro de alunos e turmas.</p>

        <div className="buttons">
          <Link to="/cadastrar_aluno">Cadastrar Aluno</Link>
          <Link to="/cadastrar_turma">Cadastrar Turma</Link>
          <Link to="/listar_alunos">Ver Lista de Alunos e Turmas</Link>
        </div>

        <Routes>
          <Route path="/cadastrar_aluno" element={<CadastrarAluno />} />
          <Route path="/cadastrar_turma" element={<CadastrarTurma />} />
          <Route path="/listar_alunos" element={<ListarAlunos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
