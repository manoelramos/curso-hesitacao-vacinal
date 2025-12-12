# Página de Apresentação do Curso

## Descrição

Esta é a página inicial/introdução do **Curso Hesitação Vacinal: uma ferramenta para profissionais de saúde**. A página foi desenvolvida seguindo fielmente o design do Figma, com atenção especial a todos os detalhes de tipografia, espaçamento, cores e responsividade.

## Arquivos

- **apresentacao.html** - Estrutura HTML da página
- **apresentacao.css** - Estilos específicos da página de apresentação

## Estrutura da Página

### 1. Hero Banner
- Logo do curso com 4 quadrados coloridos (amarelo, azul, vermelho, verde)
- Título "CURSO HESITAÇÃO VACINAL"
- Subtítulo "uma ferramenta para profissionais de saúde"
- Fundo com gradiente sutil e borda inferior

### 2. Seção Apresentação
- Título centralizado
- Texto introdutório com informações sobre o curso
- Parágrafos bem espaçados
- Destaques em negrito para informações importantes

### 3. Estrutura do Curso
- Grid 2x2 com cards dos 4 módulos
- Cada card contém:
  - Label do módulo (MÓDULO 1, 2, 3, 4)
  - Nome do módulo
  - Botão "Começar" com cor específica do módulo
- Cores dos módulos:
  - Módulo 1: Amarelo (#FBB934)
  - Módulo 2: Azul (#2E96D4)
  - Módulo 3: Vermelho (#EA5548)
  - Módulo 4: Verde (#109D82)

### 4. Footer
- Seção "Apoio" com logo NiESP
- Seção "Realização" com logos das instituições parceiras
- Barra inferior escura

## Tipografia

A página utiliza a fonte **Montserrat** em diferentes pesos:

- **Logo "CURSO"**: 800 (Extra Bold), 28px
- **Logo "HESITAÇÃO/VACINAL"**: 800 (Extra Bold), 40px
- **Subtítulo Hero**: 400 (Regular), 20px
- **Títulos de Seção**: 700 (Bold), 32px
- **Texto de Conteúdo**: 400 (Regular), 17px
- **Labels de Módulo**: 500 (Medium), 14px, uppercase
- **Nomes de Módulo**: 700 (Bold), 24px
- **Botões**: 600 (Semi Bold), 16px

## Cores

### Cores Principais
- **Fundo Creme**: #F0F0DA
- **Texto Principal**: #191915
- **Texto Escuro**: #211502
- **Texto Secundário**: #4A3D02
- **Branco**: #FFFFFF
- **Cinza Escuro**: #373731

### Cores dos Módulos
- **Módulo 1 (Amarelo)**: #FBB934
- **Módulo 2 (Azul)**: #2E96D4
- **Módulo 3 (Vermelho)**: #EA5548
- **Módulo 4 (Verde)**: #109D82

## Espaçamento

- **Padding Hero**: 80px 100px
- **Padding Main**: 80px 100px 100px
- **Gap entre seções**: 80px
- **Gap entre parágrafos**: 24px
- **Gap entre cards**: 32px
- **Padding cards**: 32px 28px
- **Gap interno cards**: 32px

## Responsividade

A página possui 3 breakpoints principais:

### Desktop (> 1200px)
- Layout completo com espaçamentos generosos
- Grid 2x2 para os módulos
- Hero com logo e subtítulo lado a lado

### Tablet (768px - 1200px)
- Espaçamentos reduzidos
- Grid 2x2 mantido
- Hero com elementos empilhados

### Mobile (< 768px)
- Grid 1 coluna para os módulos
- Hero compacto e centralizado
- Texto alinhado à esquerda
- Logos menores no footer

## Funcionalidades

### Navegação
Cada botão "Começar" redireciona para o módulo correspondente:
- **Módulo 1**: `index.html?module=1&lesson=1&step=1`
- **Módulo 2**: `index.html?module=2&lesson=1&step=1`
- **Módulo 3**: `index.html?module=3&lesson=1&step=1`
- **Módulo 4**: `index.html?module=4&lesson=1&step=1`

### Efeitos Interativos
- **Cards**: Hover com elevação e sombra
- **Botões**: Hover com mudança de cor e elevação
- **Transições**: Suaves (0.2s ease)

## Acessibilidade

- Estrutura semântica HTML5
- Headings hierárquicos (h1, h2, h3)
- Alt text em todas as imagens
- Contraste adequado de cores
- Botões com cursor pointer
- Foco visível em elementos interativos

## Como Usar

1. Acesse `http://localhost:3000/apresentacao.html`
2. Leia a apresentação do curso
3. Escolha um módulo para começar
4. Clique no botão "Começar" do módulo desejado

## Notas de Desenvolvimento

- A página foi desenvolvida com foco em fidelidade ao design do Figma
- Todos os valores de tipografia, espaçamento e cores foram medidos com precisão
- A responsividade foi testada em múltiplos tamanhos de tela
- O código está limpo, bem comentado e organizado
- Sem erros de lint

## Compatibilidade

- Chrome/Edge (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Dispositivos móveis iOS e Android

