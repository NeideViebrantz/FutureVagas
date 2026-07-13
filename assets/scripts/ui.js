// RF11: Render dinâmico de cards no DOM usando createElement e classList
export function renderizarResultadosAme(vagasProcessadas, melhorVagaObjeto) {
    const container = document.getElementById("resultados-container");
    container.innerHTML = ""; // Limpa a tela antes de renderizar

    // 1. Renderizar Painel de Destaque (Melhor Vaga + Recomendação)
    if (melhorVagaObjeto) {
        const destaqueDiv = document.createElement("div");
        destaqueDiv.classList.add("painel-destaque");
        
        const habilidadesFaltantesTexto = melhorVagaObjeto.analise.faltantes.length > 0
            ? melhorVagaObjeto.analise.faltantes.join(", ")
            : "Nenhuma! Você está 100% pronto.";

        destaqueDiv.innerHTML = `
            <h2>🌟 Vaga Ideal Recomendada</h2>
            <h3>${melhorVagaObjeto.vaga.cargo} na empresa ${melhorVagaObjeto.vaga.empresa}</h3>
            <p class="match-badge">Compatibilidade Máxima: ${melhorVagaObjeto.analise.percentual}%</p>
            <div class="recomendacao-box">
                <h4>📚 Recomendação de Estudos Personalizada:</h4>
                <p>Com base nos requisitos dessa vaga, focamos nas suas maiores necessidades imediatas de aprendizado. Recomendamos priorizar o estudo das seguintes tecnologias/ferramentas: <strong>${habilidadesFaltantesTexto}</strong>.</p>
            </div>
        `;
        container.appendChild(destaqueDiv);
    }

    // Título da lista de vagas
    const tituloLista = document.createElement("h2");
    tituloLista.textContent = "Catálogo de Vagas Analisadas";
    tituloLista.classList.add("titulo-lista-vagas");
    container.appendChild(tituloLista);

    // Grade container para os cards (Flexbox)
    const gridCards = document.createElement("div");
    gridCards.classList.add("vagas-grid");

    // 2. Renderizar cada card individualmente
    vagasProcessadas.forEach(item => {
        const card = document.createElement("article");
        card.classList.add("card-vaga", `status-${item.analise.classificacao.toLowerCase()}`);

        card.innerHTML = `
            <span class="badge-classificacao">${item.analise.classificacao} Compatibilidade</span>
            <h3>${item.vaga.obterLabelExibicao()}</h3>
            <p class="empresa-nome">🏢 Empresa: ${item.vaga.empresa}</p>
            <p class="salario-info">💰 Salário: R$ ${item.vaga.salario.toFixed(2)}</p>
            
            <div class="progresso-container">
                <div class="barra-progresso" style="width: ${item.analise.percentual}%"></div>
                <span class="porcentagem-texto">${item.analise.percentual}% de Match</span>
            </div>

            <div class="skills-box">
                <p><strong>✅ Conquistadas:</strong> ${item.analise.encontradas.join(", ") || "Nenhuma"}</p>
                <p><strong>❌ Requeridas:</strong> ${item.analise.faltantes.join(", ") || "Nenhuma!"}</p>
            </div>
        `;
        gridCards.appendChild(card);
    });

    container.appendChild(gridCards);
}

// Renderizador para mensagens de transição/status de rede
export function renderizarMensagemStatus(mensagemTexto, tipoClasse = "") {
    const container = document.getElementById("resultados-container");
    container.innerHTML = `<p class="status-mensagem ${tipoClasse}">${mensagemTexto}</p>`;
}