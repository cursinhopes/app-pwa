const SPLASH_MIN_TIME = 2000;

// Variáveis globais de controle do scanner
let html5QrCode;
let currentFacingMode = "environment"; // Começa com a câmera traseira
let isScanning = false;

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
        $("#home-screen").removeClass("d-none"); // Mostra a tela com o botão "Registrar"
        setupScannerUI(); // Configura os eventos dos botões
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

function setupScannerUI() {
    // Instancia a classe principal (sem UI padrão)
    html5QrCode = new Html5Qrcode("reader");

    // Botão na Home para abrir o scanner
    $('#btn-start-scan').click(function() {
        openScanner();
    });

    // Botão para fechar o scanner manualmente
    $('#btn-close-scan').click(function() {
        stopScanner();
    });

    // Botão para trocar de câmera
    $('#btn-switch-cam').click(function() {
        switchCamera();
    });
}

function openScanner() {
    // Troca visibilidade das telas
    $('#home-screen').addClass('d-none');
    $('#scan-screen').removeClass('d-none');
    
    startCamera(currentFacingMode);
}

function startCamera(facingMode) {
    const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0 
    };

    // Inicia a câmera
    html5QrCode.start(
        { facingMode: facingMode }, 
        config, 
        onScanSuccess, 
        onScanFailure
    ).then(() => {
        isScanning = true;
        // Ajusta texto/icone do botão de troca se necessário
        console.log(`Câmera iniciada em modo: ${facingMode}`);
    }).catch(err => {
        console.error("Erro ao iniciar câmera", err);
        alert("Erro ao acessar a câmera. Verifique as permissões.");
        stopScanner(); // Volta para home em caso de erro
    });
}

function stopScanner() {
    if (isScanning) {
        html5QrCode.stop().then(() => {
            isScanning = false;
            $('#scan-screen').addClass('d-none');
            $('#home-screen').removeClass('d-none');
            console.log("Scanner parado.");
        }).catch(err => {
            console.error("Falha ao parar scanner", err);
        });
    } else {
        // Caso já esteja parado mas a UI não atualizou
        $('#scan-screen').addClass('d-none');
        $('#home-screen').removeClass('d-none');
    }
}

function switchCamera() {
    if (!isScanning) return;

    // Troca o modo
    currentFacingMode = (currentFacingMode === "environment") ? "user" : "environment";

    // Para a câmera atual e inicia a nova
    html5QrCode.stop().then(() => {
        startCamera(currentFacingMode);
    }).catch(err => {
        console.error("Erro ao trocar câmera", err);
    });
}

function onScanSuccess(decodedText, decodedResult) {
    // Toca um som ou vibra (opcional)
    if (navigator.vibrate) navigator.vibrate(200);

    // Para o scanner imediatamente após leitura
    stopScanner();

    // Executa a lógica de sucesso (Alert temporário)
    setTimeout(() => {
        alert("LIDO COM SUCESSO: " + decodedText);
        // Aqui virá seu fetch POST futuramente
    }, 300);
}

function onScanFailure(error) {
    // Console limpo, ignorando erros de frames sem QR Code
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
