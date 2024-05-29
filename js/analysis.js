// analysis.js

document.addEventListener('DOMContentLoaded', () => {
    const periodoIPCA = document.getElementById('periodo');
    const ipcaCanvas = document.getElementById('ipcaCanvas');
    const ipcaMudCanvas = document.getElementById('ipcaMudCanvas');
    const ipcaVarCanvas = document.getElementById('ipcaVarCanvas');

    let chartIPCA;
    let chartIPCAMud;
    let chartIPCAVar;

    // Função para buscar dados do IPCA
    async function fetchIPCAData(periodo) {
        try {
            const data = await window.dataFetcher.fetchIPCA(periodo);
            return data;
        } catch (error) {
            console.error(`Erro ao obter e processar os dados do IPCA: ${error.message}`);
            throw error; // Propaga o erro para que a chamada possa tratá-lo
        }
    }

    // Event listener para a mudança na caixa de seleção de período
    periodoIPCA.addEventListener('change', async () => {
        // Obtenha o período selecionado
        const periodo = periodoIPCA.value;

        try {
            // Obtenha o dataset do IPCA para o período selecionado
            ipcData = await fetchIPCAData(periodo);

            // Montagem dos gráficos
			createChartIPCA(ipcData);
            createChartIPCAMud(ipcData);
            createChartIPCAVar(ipcData);
        } catch (error) {
            console.error(`Erro ao criar gráficos: ${error.message}`);
        }
    });

    // Função para carregar o gráfico inicial com o período padrão
    async function loadDefaultChart() {
        try {
            // Obtenha o dataset do IPCA para o período padrão
            ipcData = await fetchIPCAData(periodoIPCA.value);

            // Montagem dos gráficos
            createChartIPCA(ipcData);
            createChartIPCAMud(ipcData);
            createChartIPCAVar(ipcData);
        } catch (error) {
            console.error(`Erro ao carregar o gráfico inicial: ${error.message}`);
        }
    }

    // Chame a função ao carregar a página
    loadDefaultChart();

    // Restante do código...


	// Função para criar o gráfico IPCA
	async function createChartIPCA(data) {
	    try {
	        const { labels, valores } = data;
	        
	        const valorMedio = calculusInstance.calcMedia(valores);
	        const desvioPadrao = calculusInstance.calcDesvio(valores);
	
	        // Atualize o elemento HTML com os valores
	        document.getElementById('valorMedio').innerText = `${valorMedio.toFixed(2)}`;
	        document.getElementById('desvioPadrao').innerText = `${desvioPadrao.toFixed(2)}`;


	        // Verifique se o gráfico IPCA já existe e, se sim, destrua-o
	        if (chartIPCA) {
	            chartIPCA.destroy();
	        }
	
	        // Crie o novo gráfico IPCA com os dados obtidos
	        chartIPCA = new Chart(ipcaCanvas, {
	            type: 'line',
	            data: {
	                labels,
	                datasets: [{
	                    label: 'IPCA',
	                    data: valores,
	                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
	                    borderColor: 'rgba(255, 193, 7, 1)',
	                    borderWidth: 1
	                }]
	            },
	            options: {
	                responsive: true,
	                maintainAspectRatio: true,
	                plugins: {
	                    legend: {
	                        display: false,
	                    },
	                    title: {
	                        display: true,
	                        text: 'IPCA',
	                        color: 'rgba(255, 193, 7, 1)',
	                        font: {
	                            size: 18,
	                        },
	                    },
	                },
	                scales: {
	                    y: {
	                        beginAtZero: true
	                    }
	                }
	            }
	        });
	    } catch (error) {
	        console.error(`Erro ao criar o gráfico IPCA: ${error.message}`);
	    }
	}


	// Função para criar o gráfico IPCAMud
	async function createChartIPCAMud(data) {
	    try {
	        const { labels, valores } = data;
	
	        // Cálculo dos valores de variação
	        const variacoes = valores.reduce((acc, val, i) => {
	            if (i > 0) {
	                acc.push(val - valores[i - 1]);
	            }
	            return acc;
	        }, []);
	
	        // Verifique se o gráfico IPCAMud já existe e, se sim, destrua-o
	        if (chartIPCAMud) {
	            chartIPCAMud.destroy();
	        }
	
	        // Crie o novo gráfico IPCAMud com os dados obtidos
	        chartIPCAMud = new Chart(ipcaMudCanvas, {
	            type: 'line',
	            data: {
	                labels: labels.slice(1),
	                datasets: [{
	                    label: 'IPCA Mudança',
	                    data: variacoes,
	                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
	                    borderColor: 'rgba(255, 193, 7, 1)',
	                    borderWidth: 1
	                }]
	            },
	            options: {
	                responsive: true,
	                maintainAspectRatio: true,
	                plugins: {
	                    legend: {
	                        display: false,
	                    },
	                    title: {
	                        display: true,
	                        text: 'Mudança',
	                        color: 'rgba(255, 193, 7, 1)',
	                        font: {
	                            size: 14,
	                        },
	                    },
	                },
	                scales: {
	                    y: {
	                        beginAtZero: true
	                    }
	                }
	            }
	        });
	
	    } catch (error) {
	        console.error(`Erro ao criar o gráfico IPCAMud: ${error.message}`);
	    }
	}


	// Função para criar o gráfico IPCAVar
	async function createChartIPCAVar(data) {
	    try {
			const { labels, valores } = data;
	
	        // Cálculo dos valores de variação
	        const variacoes = valores.reduce((acc, val, i) => {
	            if (i > 0) {
	                acc.push(valores[i - 1] - val);
	            }
	            return acc;
	        }, []);
	
	        // Cálculo do valor médio e da variância
	        const media = variacoes.reduce((acc, val) => acc + val, 0) / variacoes.length;
	        const variancia = variacoes.reduce((acc, val) => acc + Math.pow(val - media, 2), 0) / variacoes.length;
	
	        // Verifique se o gráfico IPCAVar já existe e, se sim, destrua-o
	        if (chartIPCAVar) {
	            chartIPCAVar.destroy();
	        }
	
	        // Crie o novo gráfico IPCAVar com os dados obtidos
	        chartIPCAVar = new Chart(ipcaVarCanvas, {
	            type: 'line',
	            data: {
	                labels: labels.slice(1),
	                datasets: [{
	                    label: false,
	                    data: variacoes,
	                    backgroundColor: 'rgba(255, 193, 7, 0.2)',
	                    borderColor: 'rgba(255, 193, 7, 1)',
	                    borderWidth: 1
	                }]
	            },
	            options: {
	                responsive: true,
	                maintainAspectRatio: true,
	                plugins: {
	                    legend: {
	                        display: false,
	                    },
	                    title: {
	                        display: true,
	                        text: 'Variância',
	                        color: 'rgba(255, 193, 7, 1)',
	                        font: {
	                            size: 14,
	                        },
	                    },
	                },
	                scales: {
	                    y: {
	                        beginAtZero: true
	                    }
	                }
	            }
	        });
	
	    } catch (error) {
	        console.error(`Erro ao criar o gráfico IPCAVar: ${error.message}`);
	    }
	}

});
