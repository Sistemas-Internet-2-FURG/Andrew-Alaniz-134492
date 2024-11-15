let token = '';

async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
        token = data.token;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('content').style.display = 'block';
    } else {
        alert('Login falhou: ' + data.message);
    }
}

async function listarTurmas() {
    const response = await fetch('/api/turmas', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const turmas = await response.json();
    const list = document.getElementById('turmas-list');
    list.innerHTML = turmas.map(t => `<li>${t.codigo} - ${t.nome}</li>`).join('');
}

async function listarAlunos() {
    const response = await fetch('/api/alunos', {
        headers: { 'Authorization': 'Bearer ' + token }
    });
    const alunos = await response.json();
    const list = document.getElementById('alunos-list');
    list.innerHTML = alunos.map(a => `<li>${a.matricula} - ${a.nome}</li>`).join('');
}
