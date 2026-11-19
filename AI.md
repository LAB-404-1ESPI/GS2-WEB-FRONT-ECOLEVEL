# 🌱 EcoLevel — Documentação de uso de IA

**Aplicativo web de reciclagem e gamificação**

## 👥 Grupo

**Grupo:** LAB 404  
**Turma:** 1-ESPI2026

### Integrantes

- Arthur Caram Fiorese Herrada — RM 569578
- Matheus Medeiros da Cunha — RM 572780
- Felipe Ricardo Moreira Aguiar — RM 573410
- Gustavo Ferreira Silva — RM 571675
- Matheus Sequeira Franco da Silva — RM 571127

## 🤖 1. Ferramenta utilizada

Foi utilizado o **Claude (Anthropic)** como ferramenta de inteligência artificial, por meio de conversas com envio de imagens do Figma, códigos e capturas de tela dos erros encontrados.

## 💻 2. Como a IA ajudou no projeto

A inteligência artificial auxiliou principalmente em:

- Criação de páginas em React e Tailwind CSS a partir do protótipo do Figma.
- Criação e organização de componentes reutilizáveis.
- Desenvolvimento de custom hooks para separar a lógica das páginas.
- Correção de erros no código.
- Implementação e organização do consumo de APIs.
- Ajuda na utilização do LocalStorage para armazenar informações.

## 🤖 3. Exemplos de perguntas feitas à IA

Durante o desenvolvimento, foram feitas perguntas para ajudar na implementação e resolução de problemas. Alguns exemplos:

**1. Pergunta:** Como posso criar componentes reutilizáveis no React?

**Resposta da IA:** É possível separar partes repetidas da interface em componentes independentes, permitindo utilizá-los em diferentes páginas e facilitando a manutenção do código.

**2. Pergunta:** Como faço para guardar os pontos do usuário mesmo quando ele troca de página?

**Resposta da IA:** Uma solução simples é utilizar o LocalStorage, que permite salvar informações no navegador e recuperá-las quando necessário.

**3. Pergunta:** Como posso consumir uma API externa no React?

**Resposta da IA:** Você pode utilizar o `fetch()` para enviar uma requisição à API, receber os dados em JSON e armazená-los em um estado com `useState`.

**4. Pergunta:** Como posso colocar pontos de coleta em um mapa dentro do meu projeto?

**Resposta da IA:** Uma possibilidade é utilizar a Overpass API, que consulta pontos de reciclagem cadastrados no OpenStreetMap. Com o Leaflet, esses locais podem ser exibidos como marcadores em um mapa interativo.

**5. Pergunta:** Como resolver problemas de responsividade quando o conteúdo fica muito grande no celular?

**Resposta da IA:** É possível ajustar as dimensões dos elementos utilizando classes responsivas do Tailwind CSS, definindo tamanhos diferentes para celulares e computadores.

**6. Pergunta:** Como posso organizar melhor o código de uma página que possui muitas funcionalidades?

**Resposta da IA:** Uma boa prática é separar a interface, a lógica e os componentes reutilizáveis, utilizando páginas, custom hooks e componentes para deixar o projeto mais organizado.

## 🌐 4. Consumo de APIs

Foram utilizadas APIs externas em diferentes funcionalidades:

- **API de chamados:** utilizada na página Suporte para criar, consultar, atualizar e excluir chamados (CRUD).
- **Overpass API:** utilizada na página Mapa para buscar pontos de reciclagem cadastrados no OpenStreetMap. Os dados são recebidos em JSON por meio de `fetch` e exibidos no mapa com Leaflet.

## ⚠️ 5. Dificuldades encontradas

Durante o desenvolvimento, alguns códigos gerados pela IA precisaram de ajustes. Entre os problemas encontrados estavam erros nos caminhos das imagens, problemas de responsividade e elementos que ficavam fora da área visível da aplicação.

Também foi necessário adaptar algumas respostas para manter o padrão visual e a organização do projeto.

## 👥 6. O que foi desenvolvido pelo grupo

O grupo também foi responsável pelo protótipo no Figma, identidade visual, imagens, ícones, estrutura principal do projeto, rotas, navegação e desenvolvimento das páginas que não receberam auxílio direto da IA.

## 📝 7. Considerações finais

A inteligência artificial ajudou a economizar tempo, encontrar soluções e facilitar o desenvolvimento do EcoLevel. Porém, nem todas as respostas funcionaram de primeira, sendo necessário analisar, testar e corrigir os códigos.

Concluímos que a IA foi uma ferramenta de apoio importante, mas o conhecimento, as decisões e a responsabilidade pelo projeto continuaram sendo do grupo.