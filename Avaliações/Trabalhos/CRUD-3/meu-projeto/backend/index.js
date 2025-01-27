const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Dados simulados para alunos e turmas
let turmas = [
  { id: 1, nome: '1', quantidade_alunos: 1 },
  { id: 2, nome: '2', quantidade_alunos: 1 },
];

let alunos = [
  { id: 1, nome: 'João Silva', turma: '1' },
  { id: 2, nome: 'Maria Oliveira', turma: '2' },
];

// Endpoint para obter turmas
app.get('/turmas', (req, res) => {
  res.json(turmas);
});

// Endpoint para cadastrar turma
app.post('/turmas', (req, res) => {
  const { nome } = req.body;
  const novaTurma = { id: turmas.length + 1, nome, quantidade_alunos: 0 };
  turmas.push(novaTurma);
  res.json(novaTurma);
});

// Endpoint para cadastrar aluno
app.post('/alunos', (req, res) => {
    const { nome, turma } = req.body;
    const novoAluno = { id: alunos.length + 1, nome, turma };
    alunos.push(novoAluno);
    res.json(novoAluno);
  });
  

// Endpoint para excluir turma
app.delete('/turmas/:id', (req, res) => {
  const { id } = req.params;
  turmas = turmas.filter((turma) => turma.id !== parseInt(id));
  res.status(200).send('Turma excluída');
});

// Endpoint para obter alunos
app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// Endpoint para excluir aluno
app.delete('/alunos/:id', (req, res) => {
  const { id } = req.params;
  alunos = alunos.filter((aluno) => aluno.id !== parseInt(id));
  res.status(200).send('Aluno excluído');
});

app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
