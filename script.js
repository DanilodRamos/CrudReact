// scripts.js

const addUserForm = document.getElementById('addUserForm');
const userList = document.getElementById('userList');

// Função para renderizar um usuário na lista
function renderUser(user) {
  const userDiv = document.createElement('div');
  userDiv.classList.add('user');

  userDiv.innerHTML = `
    <h3>${user.name}</h3>
    <p>Email: ${user.email}</p>
    <p>Idade: ${user.age}</p>
    <button onclick="deleteUser('${user._id}')">Excluir</button>
  `;

  userList.appendChild(userDiv);
}

// Função para limpar a lista de usuários
function clearUserList() {
  userList.innerHTML = '';
}

// Função para carregar todos os usuários da API
async function loadUsers() {
  clearUserList();

  try {
    const response = await fetch('/users');
    if (!response.ok) {
      throw new Error('Erro ao carregar usuários');
    }
    const users = await response.json();
    users.forEach(user => renderUser(user));
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Função para adicionar um novo usuário
addUserForm.addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    age: document.getElementById('age').value
  };

  try {
    const response = await fetch('/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Erro ao adicionar usuário');
    }

    const newUser = await response.json();
    renderUser(newUser);
    addUserForm.reset();
  } catch (error) {
    console.error('Erro:', error);
  }
});

// Função para excluir um usuário
async function deleteUser(userId) {
  try {
    const response = await fetch(`/users/${userId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir usuário');
    }

    const deletedUser = await response.json();
    clearUserList();
    loadUsers();
  } catch (error) {
    console.error('Erro:', error);
  }
}

// Carrega os usuários ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
  loadUsers();
});
