import { VagaFrontEnd, criarContadorAnalises } from "./motor.js";
import { buscarVagasCatalogo, obterPerfilLocalStorage, salvarPerfilLocalStorage } from "./dados.js";
import { renderizarResultadosAme, renderizarMensagemStatus } from "./ui.js";

const incrementarContadorAnalise = criarContadorAnalises();

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("perfil-form");

    const perfilSalvo = obterPerfilLocalStorage();
    if (perfilSalvo) {
        document.getElementById("nome").value = perfilSalvo.nome;
        document.getElementById("area").value = perfilSalvo.area;
        document.getElementById("experiencia").value = perfilSalvo.experienciaMeses;
        
        const checkboxes = document.querySelectorAll('input[name="habilidades"]');
        checkboxes.forEach(cb => {
            if (perfilSalvo.habilidades.includes(cb.value)) {
                cb.checked = true;
            }
        });
    }

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const nomeInput = document.getElementById("nome").value;
        const areaInput = document.getElementById("area").value;
        const experienciaInput = parseInt(document.getElementById("experiencia").value, 10);
        
        const checkboxesMarcados = document.querySelectorAll('input[name="habilidades"]:checked');
        const habilidadesSelecionadas = Array.from(checkboxesMarcados).map(cb => cb.value);

        const candidatoPerfil = {
            nome: nomeInput,
            area: areaInput,
            experienciaMeses: experienciaInput,
            habilidades: habilidadesSelecionadas
        };

        salvarPerfilLocalStorage(candidatoPerfil);

        renderizarMensagemStatus("Buscando catálogo de vagas do FutureVagas... Por favor, aguarde.", "carregando");

        const respostaRede = await buscarVagasCatalogo();

        if (respostaRede.estado === "erro") {
            renderizarMensagemStatus(`Erro operacional: ${respostaRede.mensagem}`, "erro");
            return;
        }

        if (respostaRede.estado === "vazio") {
            renderizarMensagemStatus("Nenhuma vaga cadastrada no catálogo neste momento.", "vazio");
            return;
        }

        const vagasAnalisadas = respostaRede.dados.map(dadosVaga => {
            const instanciaVaga = new VagaFrontEnd(
                dadosVaga.id,
                dadosVaga.empresa,
                dadosVaga.cargo,
                dadosVaga.requisitos,
                dadosVaga.salario,
                dadosVaga.modalidade
            );

            const analiseResultado = instanciaVaga.calcularCompatibilidade(candidatoPerfil.habilidades);

            return {
                vaga: instanciaVaga,
                analise: analiseResultado
            };
        });

        const melhorVaga = vagasAnalisadas.reduce((melhor, atual) => {
            if (!melhor) return atual;
            
            if (atual.analise.percentual > melhor.analise.percentual) {
                return atual;
            } else if (atual.analise.percentual === melhor.analise.percentual) {
                return atual.vaga.salario > melhor.vaga.salario ? atual : melhor;
            }
            return melhor;
        }, null);

        const totalConsultas = incrementarContadorAnalise();
        console.log(`[FutureVagas] Varredura de compatibilidade concluída. ID da sessão: ${totalConsultas}`);

        renderizarResultadosAme(vagasAnalisadas, melhorVaga);
    });
});