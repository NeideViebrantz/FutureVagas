// RF07: Classe base com uso de Constructor e metódos acessados via 'this'
export class Vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade) {
        this.id = id;
        this.empresa = empresa;
        this.cargo = cargo;
        this.requisitos = requisitos; 
        this.salario = salario;
        this.modalidade = modalidade;
    }

    // RF03: Regra de cálculo de compatibilidade e separação de arrays
    calcularCompatibilidade(habilidadesCandidato) {
        // RF06: Uso de métodos de array (.filter e .includes)
        const encontradas = this.requisitos.filter(req => habilidadesCandidato.includes(req));
        const faltantes = this.requisitos.filter(req => !habilidadesCandidato.includes(req));
        
        const percentual = this.requisitos.length > 0 
            ? Math.round((encontradas.length / this.requisitos.length) * 100) 
            : 0;

        // RF04: Classificação usando condicional estruturada
        let classificacao = "Baixa";
        if (percentual >= 80) {
            classificacao = "Alta";
        } else if (percentual >= 50) {
            classificacao = "Média";
        }

        return {
            percentual,
            classificacao,
            encontradas,
            faltantes
        };
    }
}

// RF07: Herança funcional que estende a classe base injetando propriedades e regras novas
export class VagaFrontEnd extends Vaga {
    constructor(id, empresa, cargo, requisitos, salario, modalidade, stackDesejada = "React") {
        super(id, empresa, cargo, requisitos, salario, modalidade);
        this.stackDesejada = stackDesejada;
    }

    // Sobrescrita opcional ou extensão de rótulo para fins de demonstração técnica
    obterLabelExibicao() {
        return `${this.cargo} (${this.modalidade}) - Foco: ${this.stackDesejada}`;
    }
}

// RF08: Closure para gerenciamento e persistência de estado interno controlado
export function criarContadorAnalises() {
    let contagem = 0;
    return function() {
        contagem++;
        return contagem;
    };
}