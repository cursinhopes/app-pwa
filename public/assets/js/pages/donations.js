$(function() {
    $("#btn-pix-copy-paste").on("click", function(){
        if(navigator.clipboard) {
            navigator.clipboard.writeText($("#code-pix-copy-paste").val()).then(function() {
                alert("Código PIX copiado para área de transferência!");
            }, function() {
                alert("Falha ao copiar código PIX para área de transferência!");
            });
        }
    });

    
});
