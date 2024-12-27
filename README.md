# ToDo-App

## Descrição do Projeto

Este projeto é uma aplicação de gerenciamento de tarefas desenvolvida com **Angular**, que permite aos usuários criar, editar, excluir e listar tarefas. A aplicação utiliza o **localStorage** para armazenar os dados localmente no navegador, oferecendo uma maneira simples de gerenciar tarefas sem a necessidade de um backend.

## Tecnologias Utilizadas

- **Angular**: Framework para desenvolvimento de aplicações web.
- **TypeScript**: Linguagem baseada em JavaScript com tipagem estática.
- **RxJS**: Biblioteca para programação reativa, utilizada para lidar com fluxos de dados assíncronos.
- **Reactive Forms**: Utilizado para construção de formulários dinâmicos e validados.

## Pré-requisitos

Antes de rodar o projeto, é necessário ter o **Node.js** e o **npm** instalados na sua máquina. Caso ainda não tenha, pode instalá-los [aqui](https://nodejs.org/).

## Instalação e Execução

### Passo 1: Clonar o repositório

Clone este repositório para o seu ambiente local:

```bash
git clone https://github.com/rsaadi28/todo-app.git
```

### Passo 2: Instalar dependências

Entre no diretório do projeto e instale as dependências necessárias com o npm:

```bash
npm install
```

### Passo 3: Rodar a aplicação

Depois de instalar as dependências, você pode rodar a aplicação em modo de desenvolvimento com o comando:

```bash
ng serve
```

### Passo 4: Teste

Para executar os teste basta executar o comando:

```bash
ng test
```

## Decições tecnicas

### Uso de Reactive Forms:

Usei Reactive Forms no Angular para controle sobre a validação dos campos e a manipulação dos dados do formulário. Isso torna a implementação mais escalável e fácil de testar.

### Estrutura Modular:

O projeto foi estruturado de forma modular, com serviços separados para gerenciar as tarefas (TaskService) e um componente específico para o formulário de tarefas (TaskFormComponent). Isso facilita a manutenção e a reutilização de código.

### Uso de Observables com RxJS:

O uso de Observables no RxJS para interagir com os fluxos de dados da aplicação torna o código mais reativo e menos propenso a erros. A manipulação de dados de tarefas como streams, também deixa pronto para escalarmos caso tenhamos uma API.

## Criador:

Rodrigo Saadi Dantas Teixeira

Desenvolvedor Web

Email: rsaadi28@gmail.com
