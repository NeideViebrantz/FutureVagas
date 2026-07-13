export async function buscarVagasCatalogo() {
    try {
        const response = await fetch("./assets/dados/vagas.json");
        
        if (!response.ok) {
            throw new Error("Não foi possível conectar ao servidor de vagas.");
        }
        
        const dados = await response.json();
        
        if (!dados || dados.length === 0) {
            return { estado: "vazio", dados: [] };
        }
        
        return { estado: "sucesso", dados };
    } catch (error) {
        return { estado: "erro", mensagem: error.message };
    }
}

export function salvarPerfilLocalStorage(perfilObjeto) {
    localStorage.setItem("futurevagas_perfil", JSON.stringify(perfilObjeto));
}

export function obterPerfilLocalStorage() {
    const dadosSalvos = localStorage.getItem("futurevagas_perfil");
    return dadosSalvos ? JSON.parse(dadosSalvos) : null;
}