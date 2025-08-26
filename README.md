# DevOps Todo Application

Este projeto demonstra a implementação de práticas modernas de DevOps através de uma aplicação completa de gerenciamento de tarefas, incluindo pipeline de CI/CD automatizado e infraestrutura como código.



## Configuração e Execução

Para executar o projeto localmente:

```bash
# 1. Clone o repositório
git clone https://github.com/guilhermedospassos/devops-project.git
cd devops-project

# 2. Instale as dependências
npm install

# 3. Execute a aplicação em modo de desenvolvimento
npm run dev

# 4. Execute a suíte de testes
npm test

# 5. Execute o ambiente completo com Docker
docker-compose up
```

A aplicação ficará disponível em `http://localhost:3000`.

## Funcionalidades e API

Este projeto implementa uma API RESTful para gerenciamento de tarefas seguindo as melhores práticas de desenvolvimento e DevOps.

### Características do Projeto

- **Pipeline de CI/CD**: Automação completa com GitHub Actions para testes, análise de código e build
- **Infraestrutura como Código**: Provisionamento automatizado na AWS usando Terraform
- **Containerização**: Aplicação totalmente containerizada com Docker e Docker Compose
- **Testes Automatizados**: Cobertura completa com testes unitários e de integração usando Jest e Supertest
- **Qualidade de Código**: Análise estática com ESLint para manter padrões de código

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/health` | Verificação de status da aplicação |
| `GET` | `/api/todos` | Lista todas as tarefas |
| `POST` | `/api/todos` | Cria uma nova tarefa |
| `GET` | `/api/todos/:id` | Busca tarefa por ID |
| `PUT` | `/api/todos/:id` | Atualiza tarefa existente |
| `DELETE` | `/api/todos/:id` | Remove uma tarefa |

## Stack Tecnológica

| Componente | Tecnologia |
|------------|------------|
| **Backend** | Node.js com Express.js |
| **Banco de Dados** | PostgreSQL |
| **Containerização** | Docker e Docker Compose |
| **CI/CD** | GitHub Actions |
| **Infraestrutura** | Terraform + AWS (ECS, ECR, VPC) |
| **Testes** | Jest e Supertest |
| **Qualidade de Código** | ESLint |

## Pipeline de Integração Contínua

O pipeline definido em `.github/workflows/ci.yml` é executado automaticamente a cada push ou pull request, realizando as seguintes etapas:

1. **Checkout do código**: Clona o repositório para o ambiente de CI
2. **Configuração do ambiente**: Setup da versão específica do Node.js
3. **Instalação de dependências**: Executa `npm ci` para instalação determinística
4. **Análise de código**: Validação com ESLint seguindo os padrões definidos
5. **Execução de testes**: Roda toda a suíte de testes unitários e de integração
6. **Build e deploy**: Constrói a imagem Docker e faz push para o GitHub Container Registry (apenas na branch main)
