// URL da API (ajuste conforme necessário)
const API_URL = 'http://127.0.0.1:5000';

// Função para verificar se o usuário está autenticado
function checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
        fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                localStorage.removeItem('token');
                window.location.href = 'index.html';
            } else {
                // Lógica para verificar se é professor ou aluno
                showDashboard(data);
            }
        });
    } else {
        window.location.href = 'index.html';
    }
}

// Exibe o painel de acordo com o tipo de usuário
function showDashboard(user) {
    if (user.role === 'professor') {
        document.getElementById('professorPanel').classList.remove('hidden');
    } else if (user.role === 'aluno') {
        document.getElementById('alunoPanel').classList.remove('hidden');
    }
}

// Função de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.access_token) {
            localStorage.setItem('token', data.access_token);
            window.location.href = 'dashboard.html';
        } else {
            document.getElementById('errorMessage').textContent = 'Credenciais inválidas';
        }
    })
    .catch(err => console.error('Erro ao realizar login:', err));
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
});

// Criar turma (professor)
document.getElementById('createTurmaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nome = document.getElementById('turmaNome').value;
    const codigo = document.getElementById('turmaCodigo').value;

    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/turmas`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ nome, codigo })
    })
    .then(response => response.json())
    .then(data => {
        alert('Turma criada com sucesso!');
    })
    .catch(err => console.error('Erro ao criar turma:', err));
});

// Entrar na turma (aluno)
document.getElementById('enterTurmaForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const codigo = document.getElementById('turmaCodigoAluno').value;

    const token = localStorage.getItem('token');
    fetch(`${API_URL}/api/turmas/${codigo}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.codigo) {
            alert('Você entrou na turma com sucesso!');
        } else {
            alert('Turma não encontrada!');
        }
    })
    .catch(err => console.error('Erro ao entrar na turma:', err));
});
