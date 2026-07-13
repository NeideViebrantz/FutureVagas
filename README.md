# FutureVagas 🚀

## 📝 Descrição do Projeto
O **FutureVagas** é uma Single Page Application (SPA) desenvolvida para o ambiente web com o objetivo de otimizar a triagem e análise de compatibilidade entre candidatos e vagas de desenvolvimento Front-End Júnior.

O sistema evolui um antigo motor de análise baseado em console para uma interface gráfica moderna, fluida e totalmente acessível. Através de um formulário interativo, o usuário informa seu perfil e habilidades técnicas; instantaneamente, o motor da aplicação cruza os dados com um catálogo de vagas assíncrono, calcula o percentual exato de compatibilidade, classifica as oportunidades (Alta/Média/Baixa) e destaca a melhor vaga disponível junto a uma recomendação personalizada de estudos.

---

## 🛠️ Técnicas e Tecnologias Utilizadas
O projeto foi construído utilizando estritamente tecnologias nativas (Vanilla), sem o uso de frameworks ou ferramentas de build, cumprindo rigorosamente o escopo pedagógico do Módulo 01:

- **HTML5 Semântico & Acessibilidade (A11y):** Uso correto de landmarks (`<header>`, `<main>`, `<section>`, `<footer|`), hierarquia lógica de títulos, rótulos associados aos campos (`label/for`), imagens com atributos `alt` informativos e gerenciamento de anúncios dinâmicos com `aria-live`.
- **CSS3 Responsivo (Mobile-First):** Layout fluido baseado inteiramente em Flexbox (`flex-wrap` e `gap`), utilizando unidades relativas (`rem`, `%`) e media queries para garantir que a interface funcione perfeitamente do celular ao desktop.
- **JavaScript Moderno (ES6+):**
  - **Módulos ES:** Arquitetura limpa e modularizada dividindo responsabilidades através de `import`/`export` (`motor.js`, `ui.js`, `dados.js`, `main.js`).
  - **Programação Orientada a Objetos (POO):** Modelagem de dados estruturada na classe base `Vaga` e na subclasse estendida `VagaFrontEnd`, utilizando construtores e manipulação de métodos via `this`.
  - **Métodos Avançados de Array:** Uso de `.map()`, `.filter()` e `.reduce()` para processamento e filtragem inteligente de listas.
  - **Assincronismo & Rede:** Consumo de catálogo local (`vagas.json`) via `fetch` com estruturas `async/await` e tratamento explícito dos três estados de rede (carregando, vazio e erro).
  - **Persistência Local:** Salvamento automático do perfil do usuário utilizando `localStorage` com tratamento do valor nulo (`null`) na primeira visita do candidato.
  - **Closures & Callbacks:** Aplicação de closures para controle e preservação de estados locais (contador de análises da sessão) e callbacks no tratamento de eventos do DOM.

---

## 🗂️ Organização do Projeto (Kanban)
O fluxo de desenvolvimento e o gerenciamento das tarefas foram organizados de forma ágil através de um quadro Kanban.
🔗 [Clique aqui para acessar o nosso quadro Kanban](https://trello.com/invite/b/6a54134b313a46d1363657f4/ATTI83f65d9759572c9d012b75a353fdedcf8C179FFB/future-vagas)

---

## ⚙️ Como Executar o Projeto

Como o **FutureVagas** utiliza Módulos ES e requisições de rede assíncronas (`fetch`), o navegador bloqueia a execução caso o arquivo `index.html` seja aberto diretamente via protocolo local `file://`. Para rodar o projeto em um contexto seguro (`localhost`), siga os passos abaixo:

1. Abra o **VS Code** e certifique-se de ter a extensão **Live Server** instalada.
2. Abra a pasta raiz do projeto (`futurevagas-web/`) no seu VS Code.
3. Clique com o botão direito sobre o arquivo `index.html` e selecione a opção **"Open with Live Server"**.
4. A aplicação será iniciada e aberta automaticamente no seu navegador padrão através do endereço local `http://127.0.0.1:5500`.
