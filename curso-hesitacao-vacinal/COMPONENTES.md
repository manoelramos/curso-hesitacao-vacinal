# Componentes do Curso Hesitação Vacinal

Este documento descreve os componentes criados para a interface do curso.

## Estrutura da Página

### Layout Principal
- Grid com 3 áreas: sidebar, header, main, footer
- Sidebar fixa de 250px à esquerda
- Header responsivo no topo
- Conteúdo principal centralizado
- Footer com logos institucionais

## Componentes da Sidebar

### Logo
- Logo do curso no topo
- Subtítulo descritivo abaixo do logo
- Responsivo e centralizado

### Navegação
- Links de navegação com ícones SVG
- Divisores horizontais entre itens
- Hover suave com background amarelo translúcido

### Stepper Vertical
- Título da aula (pequeno, uppercase)
- Descrição da aula
- Lista de tópicos com círculos conectados
- Item ativo destacado em amarelo

### Tópicos
- Círculos preenchidos para item ativo
- Círculos vazados para itens não visitados
- Linhas conectoras entre tópicos
- Texto responsivo

### Menu Adicional
- Referências
- Material Complementar
- Créditos
- Ícones SVG inline

### Logo NiESP
- Posicionado no rodapé da sidebar
- Estilo único e destacado

## Componentes do Header

### Banner do Módulo
- Background amarelo com gradiente
- Efeitos visuais sutis de overlay
- Sombra inferior

### Informações do Módulo
- Número do módulo (uppercase, menor)
- Título do módulo (grande, bold)
- Hierarquia visual clara

## Componentes do Conteúdo Principal

### Badge da Aula
- Fundo bege
- Texto uppercase
- Largura ajustável ao conteúdo

### Título da Aula
- Tipografia grande e bold
- Linha decorativa abaixo
- Espaçamento adequado

### Corpo da Aula
- Texto introdutório
- Tipografia legível (18px)
- Line-height confortável (1.7)

### Estrutura da Aula
- Lista numerada com círculos
- Números em círculos preenchidos
- Alinhamento à esquerda

### Objetivos de Aprendizagem
- Lista com checkmarks SVG
- Ícones alinhados ao topo
- Espaçamento consistente

## Componentes do Footer

### Seção de Apoio
- Logo NiESP
- Label descritivo

### Seção de Realização
- Múltiplos logos institucionais
- Layout flexível com wrap
- Placeholders para logos reais

### Barra Inferior
- Barra cinza escura
- Altura fixa de 48px
- Full width

## Padrões de Design

### Cores
- Amarelo primário: #FBB934
- Amarelo escuro: #211502
- Creme background: #F0F0DA
- Branco: #FFFFFF
- Cinza escuro: #373731
- Texto padrão: #191915
- Texto stepper: #4A3D02

### Tipografia
- Fonte: Montserrat (300, 400, 500, 700, 800)
- Tamanhos: 10px a 44px
- Line-height: 1.2 a 1.7

### Espaçamentos
- Gaps: 16px, 24px, 32px, 48px
- Padding: 20px, 32px, 40px, 80px, 100px

### Interatividade
- Hover suave nos links
- Transições de 0.3s
- Background amarelo translúcido no hover
- Cursor pointer em elementos clicáveis

### Responsividade
- Breakpoint 1200px: esconde sidebar
- Breakpoint 768px: ajusta tipografia
- Layouts flexíveis e adaptáveis
- Scrollbar personalizado na sidebar

### Componentes de Exercícios

#### Exercise Block
- Container para cada exercício
- Fundo branco com borda preta
- Border-radius de 16px
- Padding de 36px

#### Exercise Question
- Número do exercício (ícone SVG)
- Texto da questão
- Layout flexível horizontal

#### Exercise Options
- Lista de alternativas com radio buttons customizados
- Radio button estilizado com checkmark para resposta correta
- Hover suave em cada opção
- Padding à esquerda para alinhamento

#### References Box
- Seção de referências bibliográficas
- Header amarelo com ícone de livro
- Conteúdo branco com borda
- Tipografia menor (14px) para referências

## Uso dos Componentes

Todos os componentes são reutilizáveis e estão definidos em:
- `components.css` - componentes base reutilizáveis
- `styles.css` - layout e estilos específicos da página

Os componentes seguem uma nomenclatura semântica e clara, facilitando manutenção e extensão futura.

## Página de Exercícios

A página de exercícios está localizada em:
- `modules/module-1/lesson-1/steps/step-6.html`

Para visualizar a página:
1. Acesse: `http://localhost:8080/#/modulo/1/aula/1/step/6`
2. Ou navegue através dos passos da aula até chegar aos exercícios

Para testar a página de forma isolada:
- Abra: `modules/module-1/lesson-1/steps/test-step-6.html` em um navegador

