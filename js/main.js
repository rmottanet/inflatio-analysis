document.addEventListener('DOMContentLoaded', function () {
    // Por padrão, exibir a primeira página e ocultar as outras
    hideAllPages();
    showPage('page1');

    // Event listener para os links de navegação
    var navLinks = document.getElementsByClassName('nav-link');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function (event) {
            event.preventDefault();

            // Verifica qual relatório foi clicado
            var targetPageId = event.target.getAttribute('href').substring(1);

            // Oculta todas as páginas
            hideAllPages();

            // Exibe a página correspondente
            showPage(targetPageId);
        });
    }
});


function hideAllPages() {
    // Oculta todas as páginas
    var pages = document.querySelectorAll('.page');
    for (var i = 0; i < pages.length; i++) {
        pages[i].style.display = 'none';
    }
}

function showPage(pageId) {
    // Exibe uma página específica
    var targetPage = document.getElementById(pageId);
    targetPage.style.display = 'block';
}

// Buscar a SELIC Atual
window.dataFetcher.fetchSelicAnualizada()
    .then((selic) => {
        const selicValueElement = document.getElementById("selicValue");
        selicValueElement.textContent = selic + "%";
    })
    .catch((error) => {
        const selicValueElement = document.getElementById("selicValue");
        selicValueElement.textContent = "Erro ao buscar a SELIC";
        console.log(error.message);
    });

// Buscar a IPCA Acumulado 12 meses
window.dataFetcher.fetchIPCA12()
    .then((ipca) => {
        const ipcaValueElement = document.getElementById("ipcaValue");
        ipcaValueElement.textContent = ipca + "%";
    })
    .catch((error) => {
        const ipcaValueElement = document.getElementById("ipcaValue");
        ipcaValueElement.textContent = "Erro ao buscar o IPCA acumulado";
        console.log(error.message);
    });
