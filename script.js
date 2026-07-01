/**
 * PROJETO: Portal Concurso Agrinho 2026
 * ARQUIVO: Lógica de Interatividade, Cronograma e Validação
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================================================
    // 1. CONTADOR REGRESSIVO (COUNTDOWN) PARA AS INSCRIÇÕES
    // ==========================================================================
    // Define a data limite fictícia para o fim das inscrições (31 de Agosto de 2026)
    const dataLimite = new Date('August 31, 2026 23:59:59').getTime();

    // Cria o elemento do contador dinamicamente e o insere no topo da seção "Sobre"
    const sobreSection = document.getElementById('sobre');
    const contadorContainer = document.createElement('div');
    contadorContainer.style.margin = '1.5rem 0';
    contadorContainer.style.padding = '1rem';
    contadorContainer.style.backgroundColor = '#e8f5e9';
    contadorContainer.style.borderLeft = '4px solid #2e7d32';
    contadorContainer.style.borderRadius = '4px';
    contadorContainer.style.fontWeight = 'bold';
    
    if (sobreSection) {
        sobreSection.appendChild(contadorContainer);
    }

    const atualizarContador = () => {
        const agora = new Date().getTime();
        const diferenca = dataLimite - agora;

        // Cálculos de tempo para dias, horas, minutos e segundos
        const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

        if (diferenca > 0) {
            contadorContainer.innerHTML = `⏳ Tempo restante para enviar seu trabalho: ${dias}d ${horas}h ${minutos}m ${segundos}s`;
        } else {
            contadorContainer.innerHTML = `🛑 Inscrições para a edição 2026 encerradas!`;
            clearInterval(intervaloContador);
        }
    };

    // Atualiza o contador a cada 1 segundo
    const intervaloContador = setInterval(atualizarContador, 1000);
    atualizarContador(); // Execução inicial imediata


    // ==========================================================================
    // 2. INTERATIVIDADE NAS CATEGORIAS (DESTAQUE AO CLICAR)
    // ==========================================================================
    const cards = document.querySelectorAll('.categoria-card');

    cards.forEach(card => {
        // Altera o estilo do cursor para indicar que é clicável
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.2s ease, box-shadow 0.2s ease';

        card.addEventListener('click', () => {
            // Remove o destaque de todos os outros cards
            cards.forEach(c => {
                c.style.transform = 'scale(1)';
                c.style.boxShadow = 'none';
                c.style.borderColor = '#f9a825';
            });

            // Aplica o destaque exclusivo no card clicado
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
            card.style.borderColor = '#2e7d32'; // Muda a borda para o Verde Agrinho
        });
    });


    // ==========================================================================
    // 3. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE INTERESSE
    // ==========================================================================
    const formulario = document.querySelector('form');

    formulario?.addEventListener('submit', (evento) => {
        // Evita que a página recarregue ao enviar
        evento.preventDefault();

        // Captura os valores dos campos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const perfil = document.getElementById('perfil').value;

        // Remove mensagens de feedback anteriores, se existirem
        const feedbackAntigo = document.getElementById('form-feedback');
        if (feedbackAntigo) feedbackAntigo.remove();

        // Cria o elemento para exibir o resultado na tela
        const feedbackBox = document.createElement('div');
        feedbackBox.id = 'form-feedback';
        feedbackBox.style.marginTop = '1rem';
        feedbackBox.style.padding = '1rem';
        feedbackBox.style.borderRadius = '4px';
        feedbackBox.style.fontWeight = '500';

        // Validação simples de segurança
        if (nome === '' || email === '') {
            feedbackBox.style.backgroundColor = '#ffebee';
            feedbackBox.style.color = '#c62828';
            feedbackBox.textContent = '❌ Por favor, preencha todos os campos obrigatórios.';
        } else {
            // Sucesso no processamento dos dados
            feedbackBox.style.backgroundColor = '#e8f5e9';
            feedbackBox.style.color = '#2e7d32';
            feedbackBox.innerHTML = `🎉 <strong>Obrigado, ${nome}!</strong> Seu interesse como <strong>${perfil}</strong> foi registrado. Enviaremos as novidades do Agrinho 2026 para o e-mail: <em>${email}</em>.`;
            
            // Limpa os campos do formulário após o sucesso
            formulario.reset();
        }

        // Insere a caixa de resposta logo abaixo do botão do formulário
        formulario.appendChild(feedbackBox);
    });
});
