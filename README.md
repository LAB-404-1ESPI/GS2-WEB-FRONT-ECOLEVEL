# 🌱 EcoLevel

## **LER O TOPICO IMPORTANTE LOGO DEPOIS DE INTEGRANTES**

## Integrantes

  - GRUPO: LAB 404
  - 1-ESPI2026
  - Arthur Caram Fiorese Herrada Rm 569578
  - Matheus Medeiros da Cunha Rm 572780
  - Felipe Ricardo Moreira Aguiar Rm 573410
  - Gustavo Ferreira Silva Rm 571675
  - Matheus Sequeira Franco da Silva Rm 571127

## IMPORTANTE
### Acesso ao sistema

Para acessar o sistema, utilize os dados de login administrativos abaixo:

- **E-mail:** ADM@ecolevel.com
- **Senha:** ecolevel2026

O sistema possui uma validação de acesso. Portanto, somente será possível entrar utilizando exatamente o e-mail e a senha informados acima. Caso os dados sejam diferentes ou estejam incorretos, o acesso não será permitido.

## 📌 Descrição do projeto

O **EcoLevel** é uma aplicação web desenvolvida para incentivar práticas sustentáveis e conscientizar os usuários sobre a importância da preservação do meio ambiente.

O projeto utiliza elementos de gamificação para tornar a sustentabilidade mais interativa. Por meio de missões, desafios e recompensas, os usuários acumulam pontos conforme participam das atividades propostas.

A ideia é transformar pequenas atitudes sustentáveis em uma experiência de evolução, incentivando hábitos mais conscientes no dia a dia.

## 🚀 Funcionalidades

- **Login:** acesso à plataforma por meio de uma tela de autenticação.
- **Página inicial:** apresenta informações do usuário, saldo de pontos, progresso e missões.
- **Sistema de pontos:** permite acompanhar os pontos Eco acumulados e utilizados.
- **Recompensas:** apresenta opções de recompensas que podem ser resgatadas com os pontos.
- **Resgate de recompensas:** realiza o resgate e desconta automaticamente os pontos necessários.
- **Histórico de resgates:** permite consultar as recompensas adquiridas.
- **Área do usuário:** reúne informações relacionadas à conta.
- **Registro de descarte:** apresenta as etapas para registrar um descarte, incluindo o fechamento do saco e a confirmação por QR Code.
- **Mapa de coleta:** exibe pontos de reciclagem cadastrados no OpenStreetMap.
- **Consumo de API:** consulta pontos de reciclagem por meio da Overpass API, utilizando `fetch` para receber os dados em JSON.
- **Navegação entre páginas:** facilita o acesso às funcionalidades da aplicação.
- **Interface responsiva:** adapta o layout para computadores, tablets e celulares.

## 🛠️ Tecnologias utilizadas

- **React:** desenvolvimento da interface por componentes.
- **Vite:** ambiente de desenvolvimento.
- **JavaScript:** implementação das funcionalidades.
- **Tailwind CSS:** estilização e construção do layout.
- **React Router DOM:** navegação entre páginas.
- **LocalStorage:** armazenamento local de informações, como saldo de pontos e histórico.
- **Leaflet:** exibição do mapa interativo.
- **React Leaflet:** integração do Leaflet com React.
- **OpenStreetMap:** fornecimento dos dados cartográficos.
- **Overpass API:** consulta dos pontos de reciclagem cadastrados no OpenStreetMap.

## 📋 Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- [Node.js](https://nodejs.org/) instalado.
- npm instalado junto com o Node.js.
- Git (opcional).
- Um editor de código, como Visual Studio Code.
- Um navegador atualizado.

## 📥 Instalação

**1. Clone o repositório**

```bash
git clone URL_DO_REPOSITORIO
```

**2. Entre na pasta do projeto**

```bash
cd nome-do-projeto
```

**3. Instale as dependências**

```bash
npm install
```

**4. Execute a aplicação**

```bash
npm run dev
```

**5. Acesse no navegador**

```text
http://localhost:5173
```

O endereço será apresentado no terminal após iniciar o Vite.

**6. Login**

Para acessar o sistema, utilize os dados de login administrativos abaixo:

- **E-mail:** ADM@ecolevel.com
- **Senha:** ecolevel2026

O sistema possui uma validação de acesso. Portanto, somente será possível entrar utilizando exatamente o e-mail e a senha informados acima. Caso os dados sejam diferentes ou estejam incorretos, o acesso não será permitido.

## 💾 Armazenamento de dados

O projeto utiliza o `LocalStorage` do navegador para armazenar informações localmente, como saldo de pontos e histórico de recompensas.

Esses dados ficam salvos no navegador utilizado e não são compartilhados automaticamente entre diferentes dispositivos.

O mapa, por sua vez, consulta informações externas por meio da Overpass API. Os pontos exibidos dependem dos dados cadastrados no OpenStreetMap.

## 🎯 Objetivo do projeto

O principal objetivo do EcoLevel é unir tecnologia, educação ambiental e gamificação para incentivar a adoção de hábitos sustentáveis.

Através de uma plataforma interativa, o projeto busca mostrar que pequenas atitudes individuais podem gerar impactos positivos para o meio ambiente.

---

**EcoLevel — Evolua você. Transforme o planeta.** 🌎
