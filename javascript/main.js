const SPLASH_MIN_TIME = 2000;

const minTimePromise = new Promise(resolve => {
    setTimeout(resolve, SPLASH_MIN_TIME);
});

const resourceLoadPromise = new Promise(resolve => {
    if (document.readyState === 'complete') {
        resolve();
    } else {
        window.addEventListener('load', resolve);
    }
});

Promise.all([minTimePromise, resourceLoadPromise]).then(() => {
    
    $("#splash-screen").addClass('d-none');
   
    initAppRouting();

});

function initAppRouting() {
    // Sua lógica de verificação (isStandalone, checkLogin, etc.)
    console.log("App Iniciado!");
    
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone === true);
    
    if (isStandalone) {
        $("#app").removeClass("d-none");
        $("#scan-screen").removeClass("d-none");
    } else {
        showInstallScreen();
    }
}

function showInstallScreen() {

    $("#app").addClass("d-none");
    $("#login-screen").addClass("d-none");
    $("#install-screen").removeClass("d-none");
    
    const isIos = /iPhone|iPad|iPod/.test(navigator.userAgent);

    if (isIos) {
        $('#ios-install-instructions').removeClass("d-none");
        $('#btn-install-app').addClass("d-none");
    }
}

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    //$('#btn-install').show();
});


$(function() {
    if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(() => console.log("Service Worker Registrado"))
                .catch((err) => console.log("Erro no SW:", err));
        }
    
    $('#btn-install-app').click(function() {
        if (deferredPrompt) {

            deferredPrompt.prompt();
            
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('Usuário aceitou a instalação');
                    $("#install-screen").addClass("d-none");
                    initAppRouting();
                }
                deferredPrompt = null;
            });
        }
    });

        // 2. Configuração do Scanner
        function onScanSuccess(decodedText, decodedResult) {
            // Toca um alerta com o valor lido
            alert("LIDO: " + decodedText);
            
            // Opcional: Parar a câmera após ler
            // html5QrcodeScanner.clear(); 
        }

        function onScanFailure(error) {
            // Ignora erros contínuos de "QR não detectado neste frame" para não poluir o console
            // console.warn(`Erro de leitura = ${error}`);
        }

        // Inicia o scanner com interface padrão
        let html5QrcodeScanner = new Html5QrcodeScanner(
            "reader", 
            { fps: 10, qrbox: {width: 250, height: 250} },
            /* verbose= */ false);
            
        html5QrcodeScanner.render(onScanSuccess, onScanFailure);
});
