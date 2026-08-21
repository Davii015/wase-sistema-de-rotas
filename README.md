# WASE — Sistema de Rotas

O WASE é uma aplicação web educacional para visualizar uma rede de locais urbanos e calcular o menor caminho entre dois pontos. A interface representa a cidade como um grafo, calcula a rota com o algoritmo de Dijkstra e destaca o trajeto encontrado por meio de uma animação.

## Principais funcionalidades

- seleção interativa do ponto de origem e do destino;
- cálculo automático do menor caminho com o algoritmo de Dijkstra;
- exibição da sequência de locais e da distância total da rota;
- representação visual dos locais, conexões e pesos em SVG;
- destaque animado do trajeto selecionado;
- atualização imediata do resultado ao alterar origem ou destino.

## Tecnologias utilizadas

- [React 19](https://react.dev/) para a interface;
- [Vite 7](https://vite.dev/) como servidor de desenvolvimento e ferramenta de build;
- JavaScript com módulos ES;
- SVG para a visualização do grafo;
- Tailwind CSS 4 disponível na configuração do projeto;
- ESLint 9 para análise estática do código.

## Pré-requisitos

Antes de começar, instale:

- [Git](https://git-scm.com/);
- [Node.js](https://nodejs.org/) 20.19 ou superior, ou 22.12 ou superior;
- npm, incluído na instalação do Node.js.

Confirme as versões instaladas:

```bash
git --version
node --version
npm --version
```

## Estrutura básica do projeto

```text
.
├── public/              # Arquivos públicos servidos sem transformação
├── src/
│   ├── assets/          # Recursos estáticos usados pela aplicação
│   ├── App.jsx          # Grafo, algoritmo de Dijkstra e interface principal
│   ├── App.css          # Estilos do componente principal
│   ├── index.css        # Estilos globais e importação do Tailwind CSS
│   └── main.jsx         # Ponto de entrada do React
├── .gitignore           # Arquivos que não devem ser versionados
├── eslint.config.js     # Configuração do ESLint
├── index.html           # Documento HTML base
├── package.json         # Dependências e scripts npm
├── package-lock.json    # Versões exatas das dependências
└── vite.config.js       # Configuração do Vite e seus plugins
```

## Como clonar o repositório

```bash
git clone https://github.com/Davii015/wase-sistema-de-rotas.git
cd wase-sistema-de-rotas
```

## Como instalar as dependências

Para uma instalação reproduzível baseada no `package-lock.json`, use:

```bash
npm ci
```

Durante o desenvolvimento, `npm install` também pode ser usado:

```bash
npm install
```

Não copie nem envie a pasta `node_modules`; ela é recriada pelos comandos acima.

## Variáveis de ambiente

A versão atual não exige variáveis de ambiente e, por isso, não possui um `.env.example`.

Se uma integração externa for adicionada no futuro, documente somente nomes e valores de exemplo seguros em `.env.example`. No frontend Vite, apenas variáveis com o prefixo `VITE_` ficam disponíveis no código executado pelo navegador; portanto, elas nunca devem conter segredos.

Arquivos `.env`, tokens, senhas, chaves de API e outras credenciais não devem ser enviados ao GitHub.

## Como executar em desenvolvimento

Na raiz do repositório, execute:

```bash
npm run dev
```

O Vite exibirá o endereço no terminal. Por padrão, a aplicação fica disponível em:

```text
http://localhost:5173
```

Se a porta `5173` estiver ocupada, o Vite poderá selecionar automaticamente outra porta e informá-la no terminal.

### Frontend e backend

O projeto atual contém somente o frontend. Não há um serviço de backend para iniciar separadamente.

Para executar apenas o frontend:

```bash
npm run dev
```

## Qualidade do código

Execute a verificação do ESLint antes de enviar alterações:

```bash
npm run lint
```

## Build de produção

Gere os arquivos otimizados com:

```bash
npm run build
```

O resultado será criado em `dist/`, diretório que não deve ser versionado.

Para testar localmente o build gerado:

```bash
npm run preview
```

Por padrão, a pré-visualização usa:

```text
http://localhost:4173
```

## Solução de problemas comuns

### `node` ou `npm` não é reconhecido

Instale uma versão compatível do Node.js, feche e reabra o terminal e confirme com `node --version` e `npm --version`.

### Erros ao instalar dependências

Confirme a versão do Node.js e execute uma instalação limpa usando o arquivo de lock:

```bash
npm ci
```

Se o arquivo de lock tiver sido alterado intencionalmente após uma atualização de dependências, execute `npm install` e revise o novo `package-lock.json`.

### Porta já está em uso

Inicie o servidor em outra porta:

```bash
npm run dev -- --port 5174
```

### A página não reflete uma alteração recente

Interrompa o servidor com `Ctrl+C`, inicie-o novamente e faça uma atualização forçada no navegador. Se necessário, remova somente o cache do Vite e reinicie o servidor.

### O build falha

Execute primeiro `npm run lint`, confira a mensagem de erro no terminal e verifique se todas as dependências foram instaladas com uma versão compatível do Node.js.

## Segurança e versionamento

- não versione `.env` ou arquivos de configuração local;
- não publique tokens, senhas, chaves privadas ou credenciais;
- não envie `node_modules`, caches, logs, builds temporários ou arquivos `.zip`;
- revise `git status` e o conteúdo do commit antes de cada push.
