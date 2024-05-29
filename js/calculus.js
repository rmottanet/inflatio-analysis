class Calculus {
    calcMedia(dados) {
        if (!dados || dados.length === 0) {
            return null; // Retorna null se não houver dados
        }

        const soma = dados.reduce((acc, valor) => acc + valor, 0);
        const valorMedio = soma / dados.length;

        return valorMedio;
    }

	calcDesvio(dados) {
        if (!dados || dados.length === 0) {
            return null; // Retorna null se não houver dados
        }

        const valorMedio = this.calcMedia(dados);
        const somaDesviosQuadrados = dados.reduce((acc, valor) => acc + Math.pow(valor - valorMedio, 2), 0);

        const desvioPadrao = Math.sqrt(somaDesviosQuadrados / dados.length);
        return desvioPadrao;
    }
}

// Instância da classe Calculus
const calculusInstance = new Calculus();
