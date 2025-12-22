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
        const headerEl = document.querySelector('.header');
        const bodyEl = document.body;
        if (moduleNumberEl) moduleNumberEl.textContent = `MÓDULO ${module.id}`;
        if (moduleTitleEl) moduleTitleEl.textContent = module.title || '';
        if (headerEl) {
            if (module.id === 2) {
                headerEl.style.backgroundImage = "url('assets/banner-2.svg')";
            } else if (module.id === 3) {
                headerEl.style.backgroundImage = "url('assets/banner-3.png')";
            } else if (module.id === 4) {
                headerEl.style.backgroundImage = "url('assets/banner-4.png')";
            } else {
                headerEl.style.backgroundImage = "url('assets/banner.svg')";
            }
        }
        if (bodyEl) {
            bodyEl.classList.remove('module-2', 'module-3', 'module-4');
            if (module.id === 2) {
                bodyEl.classList.add('module-2');
            } else if (module.id === 3) {
                bodyEl.classList.add('module-3');
            } else if (module.id === 4) {
                bodyEl.classList.add('module-4');
            }
        }
    }

    function renderSidebarTree(structure, currentModuleId, currentLessonId, currentStepId) {
        const root = document.getElementById('stepper-root');
        if (!root) return;

        const lines = [];
        lines.push('<div class="sidebar-tree">');

        (structure.modules || []).forEach((module, moduleIdx) => {
            const isCurrentModule = module.id === currentModuleId;
            const openClass = isCurrentModule || moduleIdx === 0 ? ' open' : '';
            const firstLessonId = (module.lessons && module.lessons[0] && module.lessons[0].id) || 1;
            lines.push(`<div class="sidebar-module${openClass}" data-module="${module.id}">`);
            lines.push('  <button class="sidebar-module-header" type="button">');
            lines.push('    <div class="module-top">');
            lines.push('      <span class="module-chevron"></span>');
            lines.push('      <div class="module-text">');
            lines.push(`        <div class="module-title">Módulo ${module.id}</div>`);
            lines.push('      </div>');
            lines.push('    </div>');
            lines.push('  </button>');
            lines.push(`  <a class="module-subtitle" href="#/modulo/${module.id}/aula/${firstLessonId}/step/1">${module.title || ''}</a>`);

            lines.push('  <div class="sidebar-lessons">');
            (module.lessons || []).forEach(lesson => {
                const isCurrentLesson = isCurrentModule && lesson.id === currentLessonId;
                const lessonOpenClass = isCurrentLesson ? ' open' : '';
                const firstStepId = (lesson.steps && lesson.steps[0] && lesson.steps[0].id) || 1;

                lines.push(`    <div class="lesson-group${lessonOpenClass}" data-module="${module.id}" data-lesson="${lesson.id}">`);
                lines.push('      <button class="lesson-header" type="button">');
                lines.push('        <span class="lesson-chevron"></span>');
                lines.push(`        <span class="lesson-number">Aula ${lesson.id}</span>`);
                lines.push('      </button>');
                lines.push(`      <a class="lesson-title-text" href="#/modulo/${module.id}/aula/${lesson.id}/step/${firstStepId}">${lesson.title || ''}</a>`);

                // Steps dentro da aula
                lines.push('      <div class="lesson-steps">');
                (lesson.steps || []).forEach((step, stepIdx) => {
                    const isActiveStep = isCurrentModule && lesson.id === currentLessonId && step.id === currentStepId;
                    // Um step é completado se:
                    // 1. A aula é anterior à aula atual (no mesmo módulo)
                    // 2. OU está na aula atual mas é um step anterior ao atual
                    const isPreviousLesson = isCurrentModule && lesson.id < currentLessonId;
                    const isCompleted = isPreviousLesson || (isCurrentLesson && step.id < currentStepId);
                    const stepClass = isActiveStep ? ' active' : (isCompleted ? ' completed' : '');

                    lines.push(`        <a class="step-item${stepClass}" href="#/modulo/${module.id}/aula/${lesson.id}/step/${step.id}">`);
                    lines.push('          <svg class="step-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">');

                    if (isCompleted) {
                        lines.push('            <circle cx="8" cy="8" r="6" fill="#FBB934"/>');
                        lines.push('            <path d="M5 8l2 2 4-4" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>');
                    } else if (isActiveStep) {
                        lines.push('            <circle cx="8" cy="8" r="6" fill="#FBB934"/>');
                    } else {
                        lines.push('            <circle cx="8" cy="8" r="6" stroke="#FBB934" stroke-width="1.5" fill="none"/>');
                    }

                    lines.push('          </svg>');
                    lines.push(`          <span class="step-title">${step.title || ''}</span>`);
                    lines.push('        </a>');
                });
                lines.push('      </div>');
                lines.push('    </div>');
            });
            lines.push('  </div>');
            lines.push('</div>');
        });

        lines.push('</div>');
        root.innerHTML = lines.join('\n');

        // Toggling modules
        root.querySelectorAll('.sidebar-module-header').forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.closest('.sidebar-module');
                if (parent) parent.classList.toggle('open');
            });
        });

        // Toggling lessons
        root.querySelectorAll('.lesson-header').forEach(header => {
            header.addEventListener('click', () => {
                const parent = header.closest('.lesson-group');
                if (parent) parent.classList.toggle('open');
            });
        });

        // Scroll para o topo ao clicar nos links do sidebar
        root.querySelectorAll('.step-item').forEach(link => {
            link.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        });
    }

    function renderPrevNext(lesson, currentStepId, module, structure) {
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
            } else {
                // Se for a última aula do módulo, verifica se há próximo módulo
                const currentModuleIndex = (structure.modules || []).findIndex(m => m.id === moduleId);
                if (currentModuleIndex !== -1 && currentModuleIndex < (structure.modules || []).length - 1) {
                    const nextModule = structure.modules[currentModuleIndex + 1];
                    if (nextModule.lessons && nextModule.lessons.length > 0) {
                        nextHref = `#/modulo/${nextModule.id}/aula/${nextModule.lessons[0].id}/step/1`;
                        nextButtonText = 'Próximo Módulo';
                    }
                } else {
                    // Se for o último step do último módulo, vai para o encerramento
                    nextHref = 'encerramento.html';
                    nextButtonText = 'Encerramento';
                }
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
                    // Se for uma página HTML (não um hash), navega diretamente
                    if (href.endsWith('.html')) {
                        window.location.href = href;
                    } else {
                        location.hash = href.replace('#', '');
                        // Scroll para o topo da página
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
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

    function getBasePath() {
        // Detecta o caminho base do repositório
        const pathname = window.location.pathname;
        // Remove o nome do arquivo (index.html) e mantém o caminho do diretório
        const basePath = pathname.substring(0, pathname.lastIndexOf('/') + 1);
        return basePath;
    }

    function fixImagePaths(html) {
        const basePath = getBasePath();
        // Corrige caminhos relativos que começam com assets/ ou assets/
        html = html.replace(
            /src=["'](?:\.\.\/)+assets\/([^"']+)["']/g,
            `src="${basePath}assets/$1"`
        );
        html = html.replace(
            /src=["']assets\/([^"']+)["']/g,
            `src="${basePath}assets/$1"`
        );
        // Corrige caminhos que começam com modules/
        html = html.replace(
            /src=["']modules\/([^"']+)["']/g,
            `src="${basePath}modules/$1"`
        );
        return html;
    }

    async function render() {
        try {
            // Scroll para o topo sempre que renderizar uma nova página
            window.scrollTo({ top: 0, behavior: 'smooth' });

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

            let html = await loadStepContent(moduleId, lessonId, stepId);
            // Corrige os caminhos das imagens
            html = fixImagePaths(html);
            const content = document.getElementById('content');
            content.innerHTML = html;
            renderSidebarTree(structure, moduleId, lessonId, stepId);
            renderPrevNext(lesson, stepId, module, structure);

            // Inicializa as tabs após o conteúdo ser carregado
            setTimeout(() => {
                initializeTabs();
                initializeVaccineTabs();
                initializeExercises();
                initializeCheckButtons();
                // Garante scroll para o topo após o conteúdo ser carregado
                window.scrollTo({ top: 0, behavior: 'smooth' });
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

                        // Feedback automático
                        const feedbackDiv = container.querySelector('.exercise-feedback');
                        if (feedbackDiv) {
                            feedbackDiv.style.display = 'block';
                            if (selectedOption === correctOption) {
                                feedbackDiv.className = 'exercise-feedback correct';
                                feedbackDiv.textContent = '✓ Resposta correta! Parabéns!';
                            } else {
                                feedbackDiv.className = 'exercise-feedback incorrect';
                                feedbackDiv.textContent = '✗ Resposta incorreta. A resposta correta está destacada em verde.';
                            }
                        }
                    });
                }
            });
        });
    }

    function initializeCheckButtons() {
        const checkButtons = document.querySelectorAll('.check-answer-button');

        checkButtons.forEach(button => {
            button.addEventListener('click', function() {
                const exerciseNumber = this.getAttribute('data-exercise');
                const container = this.closest('.exercise-container');

                if (!container) return;

                const correctOption = container.getAttribute('data-correct');
                const selectedInput = container.querySelector('input[type="radio"]:checked');
                const feedbackDiv = container.querySelector(`.exercise-feedback[data-exercise="${exerciseNumber}"]`);

                if (!selectedInput) {
                    // Se nenhuma opção foi selecionada
                    if (feedbackDiv) {
                        feedbackDiv.className = 'exercise-feedback incorrect';
                        feedbackDiv.textContent = 'Por favor, selecione uma resposta antes de verificar.';
                    }
                    return;
                }

                const selectedOption = selectedInput.parentElement.getAttribute('data-option');
                const options = container.querySelectorAll('.exercise-option');

                // Remove classes anteriores
                options.forEach(opt => {
                    opt.classList.remove('correct', 'incorrect');
                });

                // Verifica se está correto
                if (selectedOption === correctOption) {
                    selectedInput.parentElement.classList.add('correct');
                    if (feedbackDiv) {
                        feedbackDiv.className = 'exercise-feedback correct';

                        // Feedback personalizado para a pergunta sobre primeira vacina
                        if (exerciseNumber === "1" && container.querySelector('.exercise-question').textContent.includes('primeira vacina da história')) {
                            feedbackDiv.textContent = '✓ Correto! A primeira vacina da história foi desenvolvida no final do século XVIII para combater a varíola. O médico inglês Edward Jenner observou que pessoas expostas à varíola bovina desenvolviam imunidade contra a varíola humana. Com base nisso, em 1796, ele realizou a primeira inoculação bem-sucedida, marcando o início da imunização moderna.';
                        } else if (exerciseNumber === "2" && container.querySelector('.exercise-question').textContent.includes('Marque a alternativa correta') && correctOption === 'c') {
                            feedbackDiv.textContent = '✓ Correto! A preocupação das elites com a erradicação da varíola se deu porque observou-se a perda financeira e comercial que a doença acarretou e porque passou a acometer um maior contingente de pessoas de classes sociais superiores.';
                        } else {
                            feedbackDiv.textContent = '✓ Resposta correta! Parabéns!';
                        }
                    }
                } else {
                    selectedInput.parentElement.classList.add('incorrect');
                    // Mostra a resposta correta em verde
                    options.forEach(opt => {
                        if (opt.getAttribute('data-option') === correctOption) {
                            opt.classList.add('correct');
                        }
                    });
                    if (feedbackDiv) {
                        feedbackDiv.className = 'exercise-feedback incorrect';

                        // Feedback personalizado para cada opção incorreta da pergunta sobre primeira vacina
                        if (exerciseNumber === "1" && container.querySelector('.exercise-question').textContent.includes('primeira vacina da história')) {
                            let incorrectMessage = '✗ Resposta incorreta. ';

                            if (selectedOption === 'a') {
                                incorrectMessage += 'Embora tenha causado grandes epidemias, como a Peste Negra, não foi a doença que levou ao desenvolvimento da primeira vacina. A vacina contra a peste bubônica surgiu apenas no final do século XIX. A resposta correta é: Varíola (opção destacada em verde).';
                            } else if (selectedOption === 'c') {
                                incorrectMessage += 'A vacina contra a cólera foi desenvolvida no século XIX por Jaime Ferrán e posteriormente aprimorada por Waldemar Haffkine, mas não foi a primeira da história. A resposta correta é: Varíola (opção destacada em verde).';
                            } else if (selectedOption === 'd') {
                                incorrectMessage += 'A pandemia de gripe espanhola ocorreu em 1918, mais de um século após a criação da primeira vacina, e as primeiras vacinas contra gripe só surgiram na década de 1940. A resposta correta é: Varíola (opção destacada em verde).';
                            } else {
                                incorrectMessage += 'A resposta correta está destacada em verde.';
                            }

                            feedbackDiv.textContent = incorrectMessage;
                        } else if (exerciseNumber === "2" && container.querySelector('.exercise-question').textContent.includes('Marque a alternativa correta') && correctOption === 'c') {
                            let incorrectMessage = '✗ Resposta incorreta. ';

                            if (selectedOption === 'a') {
                                incorrectMessage += 'A inoculação (variolização) realmente antecedeu as vacinas, mas há registros de seu uso muito antes do século XII, principalmente na China e na Índia, o que torna a afirmação imprecisa. A resposta correta está destacada em verde.';
                            } else if (selectedOption === 'b') {
                                incorrectMessage += 'Desde o início da vacinação houve resistência, seja por desconfiança, crenças religiosas, medo de efeitos adversos ou imposições governamentais. A resposta correta está destacada em verde.';
                            } else if (selectedOption === 'd') {
                                incorrectMessage += 'Os movimentos antivacinação começaram antes do século XX. Já havia resistências desde o século XIX, como o movimento antivacina na Inglaterra em resposta à obrigatoriedade da vacina contra a varíola. A resposta correta está destacada em verde.';
                            } else {
                                incorrectMessage += 'A resposta correta está destacada em verde.';
                            }

                            feedbackDiv.textContent = incorrectMessage;
                        } else {
                            feedbackDiv.textContent = '✗ Resposta incorreta. A resposta correta está destacada em verde.';
                        }
                    }
                }

                // Desabilita o botão após checagem
                this.disabled = true;
            });
        });
    }

    // Initialize exercises when content is loaded
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(() => {
            initializeTabs();
            initializeVaccineTabs();
            initializeExercises();
            initializeCheckButtons();
        }, 100);
    });

    // Re-initialize after content changes (hash navigation)
    window.addEventListener('hashchange', function() {
        setTimeout(() => {
            initializeExercises();
            initializeCheckButtons();
        }, 100);
    });
})();
