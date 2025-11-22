$(function() {
    if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(() => console.log("Service Worker Registrado"))
                .catch((err) => console.log("Erro no SW:", err));
        }

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
