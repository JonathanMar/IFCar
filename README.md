# 🚗 IFCar

<p align="center">
  <img src="img/logo.png" alt="IFCar Logo" width="180">
</p>

<p align="center">
  Plataforma de compartilhamento de caronas para estudantes e servidores do IFSULDEMINAS.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/PHP-8.x-blue">
  <img src="https://img.shields.io/badge/JavaScript-ES6-yellow">
  <img src="https://img.shields.io/badge/MySQL-Compatible-green">
  <img src="https://img.shields.io/badge/Status-Acadêmico-success">
  <img src="https://img.shields.io/badge/License-MIT-lightgrey">
</p>

---

# 📖 Sobre o Projeto

O IFCar é uma plataforma web desenvolvida para facilitar o compartilhamento de caronas entre estudantes, professores e servidores do IFSULDEMINAS.

O sistema permite que usuários:

- Cadastrem novas caronas;
- Visualizem caronas disponíveis;
- Reservem vagas em caronas existentes;
- Cancelarem participações;
- Realizem autenticação através de login seguro;
- Gerenciem sessões de usuário.

O objetivo principal é reduzir custos de transporte, promover sustentabilidade e incentivar a integração da comunidade acadêmica.

---

# ✨ Funcionalidades

## 👤 Usuários

- Cadastro de conta
- Login
- Logout
- Controle de sessão

## 🚘 Caronas

- Cadastro de caronas
- Visualização de caronas disponíveis
- Aceitação de caronas
- Cancelamento de participação
- Controle de vagas disponíveis

## 🔒 Segurança

- Hash de senha utilizando BCrypt
- Sessões PHP
- Prepared Statements contra SQL Injection

---

# 🏗️ Arquitetura

```text
Cliente (HTML/CSS/JS)
        │
        ▼
PHP (API Backend)
        │
        ▼
Banco de Dados MySQL
```

---

# 📂 Estrutura do Projeto

```text
IFCar/
│
├── css/
│   └── style.css
│
├── img/
│   ├── logo.png
│   └── guarrita_01.jpg
│
├── js/
│   ├── login.js
│   ├── register.js
│   ├── script.js
│   ├── verificarSessao.js
│   └── ...
│
├── php/
│   ├── connection.php
│   ├── queries.php
│   ├── cadastra_carona.php
│   ├── mostra_carona.php
│   └── user/
│       ├── login.php
│       ├── create_account.php
│       └── destroy_session.php
│
├── sql/
│   ├── sql.sql
│   └── postgre.sql
│
├── src/
│   ├── login.html
│   ├── formulario_criar_conta.html
│   └── formulario_cadastro.html
│
└── index.html
```

---

# 🛠️ Tecnologias Utilizadas

## Front-end

- HTML5
- CSS3
- JavaScript (ES6)

## Back-end

- PHP

## Banco de Dados

- MySQL
- PostgreSQL (estrutura alternativa)

## Segurança

- Password Hashing (BCrypt)
- PHP Sessions
- Prepared Statements

---

# ⚙️ Instalação

## 1. Clonar o repositório

```bash
git clone https://github.com/JonathanMar/IFCar.git
```

## 2. Entrar no diretório

```bash
cd IFCar
```

## 3. Criar banco de dados

Execute:

```sql
sql/sql.sql
```

ou

```sql
sql/postgre.sql
```

dependendo do SGBD utilizado.

---

## 4. Configurar conexão

Arquivo:

```php
php/connection.php
```

Exemplo:

```php
$host = "localhost";
$connname = "IFcar";
$user = "root";
$password = "";
```

---

## 5. Iniciar servidor PHP

```bash
php -S localhost:8000
```

---

## 6. Acessar aplicação

```text
http://localhost:8000
```

---

# 🗄️ Modelo de Dados

## users_tb

| Campo | Tipo |
|---------|---------|
| cod_user | INT |
| email_user | VARCHAR |
| password_user | VARCHAR |

## rides_tb

| Campo | Tipo |
|---------|---------|
| cod_ride | INT |
| address_ride | VARCHAR |
| time_ride | TIME |
| max_quant_ride | INT |
| accepted_ride | INT |
| status_ride | INT |
| date_ride | TIMESTAMP |

---

# 🔄 Fluxo do Sistema

```text
Cadastro
    │
    ▼
Login
    │
    ▼
Sessão Ativa
    │
    ├── Cadastrar Carona
    │
    ├── Visualizar Caronas
    │
    ├── Aceitar Carona
    │
    └── Cancelar Carona
```

---

# 🚧 Melhorias Futuras

- [ ] Perfil completo do usuário
- [ ] Recuperação de senha
- [ ] Geolocalização
- [ ] Integração com Google Maps
- [ ] Notificações em tempo real
- [ ] Sistema de avaliações
- [ ] Histórico de viagens
- [ ] API REST

---

# 📸 Capturas de Tela

Adicionar imagens da aplicação:

```text
img/screenshots/
```

Exemplos:

- Tela de Login
- Cadastro
- Listagem de Caronas
- Cadastro de Carona

---

# 🤝 Contribuição

1. Faça um Fork do projeto
2. Crie uma branch

```bash
git checkout -b feature/nova-funcionalidade
```

3. Commit

```bash
git commit -m "feat: adiciona nova funcionalidade"
```

4. Push

```bash
git push origin feature/nova-funcionalidade
```

5. Abra um Pull Request

---

# 📄 Licença

Este projeto está licenciado sob os termos da licença MIT.

---

# 👨‍💻 Autor

**Jonathan Marcon**

Projeto desenvolvido para fins acadêmicos no curso de Ciência da Computação.

---

⭐ Se este projeto foi útil para você, considere deixar uma estrela no repositório.
