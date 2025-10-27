(function() {
    function parseHash() {
        const hash = (location.hash || "").replace(/\/$/, ''); // Remove trailing slash
        console.log('ParseHash - Hash recebido:', hash);
        const match = hash.match(/^#?\/modulo\/(\d+)\/aula\/(\d+)\/step\/(\d+)$/);
        if (!match) {
            console.log('ParseHash - Não match, usando padrão');
            return { moduleId: 1, lessonId: 1, stepId: 1 };
        }
        const result = { moduleId: +match[1], lessonId: +match[2], stepId: +match[3] };
        console.log('ParseHash - Resultado:', result);
        return result;
    }

    async function loadStructure() {
        const response = await fetch('data/structure.json');
        if (!response.ok) throw new Error('Falha ao carregar estrutura');
        return response.json();
    }

    function findLesson(structure, moduleId, lessonId) {
        const module = structure.modules.find(m => m.id === moduleId);
        if (!module) return {};
        const lesson = (module.lessons || []).find(l => l.id === lessonId);
        return { module, lesson };
    }

    async function loadStepContent(moduleId, lessonId, stepId) {
        const path = `modules/module-${moduleId}/lesson-${lessonId}/steps/step-${stepId}.html`;
        const res = await fetch(path);
        if (!res.ok) throw new Error('Conteúdo não encontrado');
        return res.text();
    }

    function renderHeader(module) {
        const moduleNumberEl = document.querySelector('.module-number');
        const moduleTitleEl = document.querySelector('.module-title');
        if (moduleNumberEl) moduleNumberEl.textContent = `MÓDULO ${module.id}`;
        if (moduleTitleEl) moduleTitleEl.textContent = module.title || '';
    }

    function renderStepper(lesson, currentStepId) {
        const stepperRoot = document.getElementById('stepper-root');
        if (!stepperRoot) return;
        const lessonTitleEl = document.querySelector('.stepper-lesson-title');
        const lessonDescEl = document.querySelector('.stepper-lesson-description');
        if (lessonTitleEl) lessonTitleEl.textContent = `Aula ${lesson.id}`;
        if (lessonDescEl) lessonDescEl.textContent = lesson.title || '';
        const lines = [];
        (lesson.steps || []).forEach((s, idx) => {
            const stateClass = s.id === currentStepId ? ' active' : (s.id < currentStepId ? ' completed' : '');
            lines.push(`<div class="topic-item${stateClass}" data-step="${s.id}">`);
            if (stateClass.includes('completed')) {
                lines.push('  <svg class="topic-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">');
                lines.push('    <circle cx="12" cy="12" r="11" fill="#FBB934"/>');
                lines.push('    <path d="M7 12l3 3 7-7" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>');
                lines.push('  </svg>');
            } else if (stateClass.includes('active')) {
                lines.push('  <svg class="topic-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">');
                lines.push('    <circle cx="12" cy="12" r="11" fill="#FBB934"/>');
                lines.push('  </svg>');
            } else {
                lines.push('  <svg class="topic-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">');
                lines.push('    <circle cx="12" cy="12" r="11" fill="#F0F0DA" stroke="#FBB934" stroke-width="1"/>');
                lines.push('  </svg>');
            }
            lines.push(`  <span class="topic-text">${s.title}</span>`);
            lines.push('</div>');
            if (idx < (lesson.steps.length - 1)) {
                lines.push('<div class="topic-line"></div>');
            }
        });
        stepperRoot.innerHTML = lines.join('\n');

        stepperRoot.querySelectorAll('.topic-item').forEach(el => {
            el.addEventListener('click', () => {
                const stepId = +el.getAttribute('data-step');
                const { moduleId, lessonId } = parseHash();
                location.hash = `#/modulo/${moduleId}/aula/${lessonId}/step/${stepId}`;
            });
        });
    }

    function renderPrevNext(lesson, currentStepId, module) {
        const contentEl = document.getElementById('content');
        if (!contentEl) return;
        const containerEl = contentEl.querySelector('.content-container') || contentEl;
        let nav = containerEl.querySelector('.content-navigation');
        if (!nav) {
            nav = document.createElement('div');
            nav.className = 'content-navigation';
            containerEl.appendChild(nav);
        }

        const prev = currentStepId > 1 ? currentStepId - 1 : null;
        let next = currentStepId < (lesson.steps || []).length ? currentStepId + 1 : null;
        const { moduleId, lessonId } = parseHash();

        let nextHref = null;
        let nextButtonText = 'Próximo';

        // Se estiver no último step (exercícios)
        if (!next) {
            // Verifica se há próxima aula no módulo
            const currentLessonIndex = (module.lessons || []).findIndex(l => l.id === lessonId);
            if (currentLessonIndex !== -1 && currentLessonIndex < (module.lessons || []).length - 1) {
                const nextLesson = module.lessons[currentLessonIndex + 1];
                nextHref = `#/modulo/${moduleId}/aula/${nextLesson.id}/step/1`;
                nextButtonText = 'Próxima Aula';
            }
        } else {
            nextHref = `#/modulo/${moduleId}/aula/${lessonId}/step/${next}`;
        }

        const prevAttrs = prev ? `data-href="#/modulo/${moduleId}/aula/${lessonId}/step/${prev}"` : 'disabled';
        const nextAttrs = nextHref ? `data-href="${nextHref}"` : 'disabled';

        const html = [
            '<button class="btn-navigation btn-previous" ' + prevAttrs + '>',
            '  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">',
            '    <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            '  </svg>',
            '  <span>Anterior</span>',
            '</button>',
            '<button class="btn-navigation btn-next" ' + nextAttrs + '>',
            '  <span>' + nextButtonText + '</span>',
            '  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">',
            '    <path d="M6 4L10 8L6 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
            '  </svg>',
            '</button>'
        ].join('\n');

        nav.innerHTML = html;

        nav.querySelectorAll('button[data-href]').forEach(b => {
            b.addEventListener('click', () => {
                const href = b.getAttribute('data-href');
                if (href) {
                    location.hash = href.replace('#', '');
                }
            });
        });
    }

    function renderNotFound() {
        const content = document.getElementById('content');
        if (content) content.innerHTML = '<div class="content-container"><p>Conteúdo não encontrado.</p></div>';
    }

    function initializeTabs() {
        const buttons = document.querySelectorAll('.tab-button');

        if (buttons.length === 0) return;

        buttons.forEach((button) => {
            button.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                const targetTab = this.getAttribute('data-tab');

                // Remove active de todos os botões e painéis
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });

                document.querySelectorAll('.tab-panel').forEach(panel => {
                    panel.classList.remove('active');
                    panel.style.display = 'none';
                });

                // Ativa o botão clicado e o painel correspondente
                this.classList.add('active');
                const targetPanel = document.getElementById(targetTab);

                if (targetPanel) {
                    targetPanel.classList.add('active');
                    targetPanel.style.display = 'block';
                }

                return false;
            };
        });
    }

    function initializeVaccineTabs() {
        const vaccineTabs = document.querySelectorAll('.vaccine-tab');

        if (vaccineTabs.length === 0) return;

        vaccineTabs.forEach((tab) => {
            tab.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();

                const targetTab = this.getAttribute('data-tab');

                // Remove active de todos os botões e painéis
                document.querySelectorAll('.vaccine-tab').forEach(btn => {
                    btn.classList.remove('active');
                });

                document.querySelectorAll('.vaccine-panel').forEach(panel => {
                    panel.classList.remove('active');
                });

                // Ativa o botão clicado e o painel correspondente
                this.classList.add('active');
                const targetPanel = document.getElementById(targetTab);

                if (targetPanel) {
                    targetPanel.classList.add('active');
                }

                return false;
            };
        });
    }

    async function render() {
        try {
            const { moduleId, lessonId, stepId } = parseHash();
            console.log('Navegando para:', { moduleId, lessonId, stepId });
            console.log('Hash atual:', location.hash);

            const structure = await loadStructure();
            const { module, lesson } = findLesson(structure, moduleId, lessonId);
            if (!module || !lesson) {
                console.error('Módulo ou aula não encontrados');
                renderNotFound();
                return;
            }
            renderHeader(module);

            const path = `modules/module-${moduleId}/lesson-${lessonId}/steps/step-${stepId}.html`;
            console.log('Carregando:', path);

            const html = await loadStepContent(moduleId, lessonId, stepId);
            const content = document.getElementById('content');
            content.innerHTML = html;
            renderStepper(lesson, stepId);
            renderPrevNext(lesson, stepId, module);

            // Inicializa as tabs após o conteúdo ser carregado
            setTimeout(() => {
                initializeTabs();
                initializeVaccineTabs();
            }, 100);
        } catch (e) {
            console.error('Erro ao carregar step:', e);
            renderNotFound();
        }
    }

    window.addEventListener('hashchange', render);

    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded - Hash inicial:', location.hash);
        if (!location.hash || location.hash === '' || location.hash === '#') {
            console.log('Sem hash, redirecionando para step 1');
            location.hash = '#/modulo/1/aula/1/step/1';
        }
        // Sempre renderiza, independente se há hash ou não
        render();
    });

    function initializeExercises() {
        const exerciseContainers = document.querySelectorAll('.exercise-container');

        exerciseContainers.forEach(container => {
            const correctOption = container.getAttribute('data-correct');
            const options = container.querySelectorAll('.exercise-option');

            options.forEach(option => {
                const radioInput = option.querySelector('input[type="radio"]');

                if (radioInput) {
                    radioInput.addEventListener('change', function() {
                        // Remove todas as classes de estado
                        options.forEach(opt => {
                            opt.classList.remove('correct', 'incorrect');
                        });

                        // Adiciona classe baseada na resposta
                        const selectedOption = option.getAttribute('data-option');

                        if (selectedOption === correctOption) {
                            option.classList.add('correct');
                        } else {
                            option.classList.add('incorrect');
                            // Mostra a resposta correta
                            options.forEach(opt => {
                                if (opt.getAttribute('data-option') === correctOption) {
                                    opt.classList.add('correct');
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    // Initialize exercises when content is loaded
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            initializeTabs();
            initializeVaccineTabs();
            initializeExercises();
        }, 100);
    });
})();
