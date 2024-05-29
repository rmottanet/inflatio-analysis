class DataFetcher {
    async fetchSelicAnualizada() {
        try {
            const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.432/dados/ultimos/1?formato=json');
            if (!response.ok) {
                throw new Error(`Erro ao buscar os dados da SELIC: (${response.status}) ${response.statusText}`);
            }
            const data = await response.json();
            const selic = data[0].valor;

            return parseFloat(selic);
        } catch (error) {
            // Relança o erro para que possa ser tratado fora da função
            throw new Error(`Erro no fetchSelicAnualizada: ${error.message}`);
        }
    }

    async fetchIPCA12() {
        try {
            const response = await fetch('https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/12?formato=json');
            if (!response.ok) {
                throw new Error(`Erro ao buscar os dados do IPCA: (${response.status}) ${response.statusText}`);
            }
            const data = await response.json();
            let ipca = 0;

            for (let i = 0; i < data.length; i++) {
                ipca += parseFloat(data[i].valor);
            }

            return parseFloat(ipca).toFixed(2);
        } catch (error) {
            // Relança o erro para que possa ser tratado fora da função
            throw new Error(`Erro no fetchIPCA12: ${error.message}`);
        }
    }

    // Adicione a função fetchIPCA(periodo) conforme a versão aprimorada anterior
    async fetchIPCA(periodo) {
        try {
            const response = await fetch(`https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados/ultimos/${periodo}?formato=json`);
            if (!response.ok) {
                throw new Error(`Erro ao buscar os dados do IPCA: (${response.status}) ${response.statusText}`);
            }
            const data = await response.json();
            
            // Extraia as datas e valores dos dados
            const labels = data.map(item => item.data);
            const valores = data.map(item => parseFloat(item.valor));

            return { labels, valores };
        } catch (error) {
            // Relança o erro para que possa ser tratado fora da função
            throw new Error(`Erro no fetchIPCA: ${error.message}`);
        }
    }
}

// Crie uma instância da classe
const dataFetcherInstance = new DataFetcher();

// Atribua a instância a uma variável global
window.dataFetcher = dataFetcherInstance;
