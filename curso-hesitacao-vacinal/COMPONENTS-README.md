# 📚 Sistema de Componentes Reutilizáveis - Curso Hesitação Vacinal

## 🎯 Visão Geral

Este sistema de componentes foi criado para facilitar a reutilização e manutenção do curso de hesitação vacinal. Todos os componentes são baseados em HTML/CSS puro, seguindo o design do Figma.

## 📁 Estrutura de Arquivos

```
curso-hesitacao-vacinal/
├── index.html                 # Página principal
├── styles.css                 # Estilos principais do layout
├── components.css              # Componentes reutilizáveis
├── components-examples.html    # Exemplos de uso dos componentes
├── assets/                     # Arquivos de imagem
│   ├── logo-curso-hesitacao-vacinal.svg
│   ├── logo-niesp-horizontal.svg
│   ├── icon-home.svg
│   ├── icon-list.svg
│   ├── icon-folder-plus.svg
│   └── icon-book-open.svg
└── README.md                  # Esta documentação
```

## 🧩 Componentes Disponíveis

### 1. **Logo** - Logo do Curso

```html
<div class="logo">
    <div class="logo-content">
        <img src="assets/logo-curso-hesitacao-vacinal.svg" alt="Curso Hesitação Vacinal" class="logo-image">
    </div>
</div>
```

### 2. **StepperVertical** - Navegação de Aulas

O componente principal para navegação entre aulas e tópicos.

```html
<div class="stepper-vertical">
    <!-- Informações da Aula -->
    <div class="stepper-lesson">
        <div class="stepper-lesson-title">Aula 1</div>
        <div class="stepper-lesson-description">
            Título da aula aqui
        </div>
    </div>

    <!-- Lista de Tópicos -->
    <div class="stepper-topics">
        <!-- Tópico Ativo -->
        <div class="topic-item active">
            <svg class="topic-icon" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="currentColor"/>
            </svg>
            <span class="topic-text">Tópico Ativo</span>
        </div>

        <div class="topic-line"></div>

        <!-- Tópicos Inativos -->
        <div class="topic-item">
            <svg class="topic-icon" width="24" height="24" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="1"/>
            </svg>
            <span class="topic-text">Tópico Inativo</span>
        </div>

        <div class="topic-line"></div>
    </div>
</div>
```

**Estados:**
- `.topic-item.completed` - Tópico completo (bolinha preenchida com checkmark)
- `.topic-item.active` - Tópico atual (bolinha preenchida)
- `.topic-item` - Tópico pendente (bolinha vazia)

### 3. **NavigationLink** - Links de Navegação

```html
<div class="nav-link">
    <img src="assets/icon-home.svg" alt="Home" class="nav-icon">
    <span class="nav-text">Texto do Link</span>
</div>
```

**Ícones Disponíveis:**
- `icon-home.svg` - Página inicial
- `icon-list.svg` - Créditos
- `icon-folder-plus.svg` - Material complementar
- `icon-book-open.svg` - Referências

### 4. **LessonBadge** - Etiqueta da Aula

```html
<div class="lesson-badge">
    <span class="lesson-badge-text">Aula 1</span>
</div>
```

### 4. **ObjectiveItem** - Item de Objetivo

```html
<div class="objective-item">
    <svg class="objective-icon" width="14" height="14" viewBox="0 0 14 14">
        <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" stroke-width="1"/>
        <path d="M4.9 7l2.1 2.1 4.2-4.2" stroke="currentColor" stroke-width="1"/>
    </svg>
    <span class="objective-text">Texto do objetivo</span>
</div>
```

### 5. **StructureItem** - Item de Estrutura

```html
<div class="structure-item">
    <div class="structure-number">1</div>
    <span class="structure-text">Texto da estrutura</span>
</div>
```

### 6. **NavigationDivider** - Separador

```html
<div class="nav-divider"></div>
```

### 7. **TitleLine** - Linha de Título

```html
<div class="title-line"></div>
```

## 🎨 Variáveis CSS Disponíveis

```css
:root {
    /* Cores */
    --primary-yellow: #FBB934;
    --primary-yellow-dark: #211502;
    --cream-bg: #F0F0DA;
    --cream-text: #191915;
    --stepper-text: #4A3D02; /* Cor específica para texto do stepper */
    --white: #FFFFFF;
    --dark-gray: #373731;

    /* Espaçamentos */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-xxl: 48px;

    /* Bordas */
    --border-radius-sm: 4px;
    --border-radius-md: 8px;
    --border-radius-lg: 12px;

    /* Tipografia */
    --font-family: 'Montserrat', sans-serif;
    --font-size-xs: 10px;
    --font-size-sm: 12px;
    --font-size-md: 14px;
    --font-size-base: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 20px;
    --font-size-xxl: 24px;
    --font-size-title: 27px;
    --font-size-large: 44px;
}
```

## 🔧 Como Usar

### 1. **Incluir os Arquivos CSS**

```html
<link rel="stylesheet" href="styles.css">
<link rel="stylesheet" href="components.css">
```

### 2. **Criar uma Nova Aula**

Para criar uma nova aula, copie a estrutura do `stepper-vertical` e ajuste:

```html
<div class="stepper-vertical">
    <div class="stepper-lesson">
        <div class="stepper-lesson-title">Aula X</div>
        <div class="stepper-lesson-description">
            Título da nova aula
        </div>
    </div>

    <div class="stepper-topics">
        <!-- Adicione os tópicos aqui -->
    </div>
</div>
```

### 3. **Alterar Estado de Tópico**

Para marcar um tópico como ativo:

```html
<!-- Remover classe 'active' do tópico atual -->
<div class="topic-item">
    <!-- conteúdo -->
</div>

<!-- Adicionar classe 'active' ao novo tópico -->
<div class="topic-item active">
    <!-- conteúdo -->
</div>
```

## 🎯 Vantagens do Sistema

✅ **Reutilização**: Mesmos componentes em diferentes aulas
✅ **Consistência**: Design unificado em todo o curso
✅ **Manutenibilidade**: Mudanças centralizadas no CSS
✅ **Escalabilidade**: Fácil adicionar novas aulas/módulos
✅ **Performance**: CSS otimizado e modular
✅ **Acessibilidade**: Estrutura semântica HTML

### 8. **Tabs** - Abas Interativas

Sistema de abas/tabs para organizar conteúdo relacionado.

```html
<div class="tabs-container">
    <div class="tabs-header">
        <button class="tab-button active" data-tab="tab1">Aba 1</button>
        <button class="tab-button" data-tab="tab2">Aba 2</button>
        <button class="tab-button" data-tab="tab3">Aba 3</button>
    </div>
    <div class="tabs-content">
        <div class="tab-panel active" id="tab1">
            <h4>Título do Conteúdo 1</h4>
            <p>Conteúdo da primeira aba...</p>
        </div>
        <div class="tab-panel" id="tab2">
            <h4>Título do Conteúdo 2</h4>
            <p>Conteúdo da segunda aba...</p>
        </div>
        <div class="tab-panel" id="tab3">
            <h4>Título do Conteúdo 3</h4>
            <p>Conteúdo da terceira aba...</p>
        </div>
    </div>
</div>

<script>
    // Script para funcionalidade das tabs
    document.addEventListener('DOMContentLoaded', function() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');

                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));

                // Add active class to clicked button and corresponding panel
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
            });
        });
    });
</script>
```

**Como usar:**
- Adicione a classe `active` à primeira aba e painel para definir o conteúdo inicial
- O atributo `data-tab` do botão deve corresponder ao `id` do painel
- O JavaScript é necessário para a funcionalidade de troca de abas

## 📝 Exemplos Práticos

Consulte o arquivo `components-examples.html` para ver exemplos completos de uso de todos os componentes.

## 🚀 Próximos Passos

1. **Criar novas aulas** usando os componentes
2. **Personalizar cores** através das variáveis CSS
3. **Adicionar interatividade** com JavaScript (opcional)
4. **Expandir componentes** conforme necessário

---

**Desenvolvido para o Curso de Hesitação Vacinal - Fiocruz**
