$(function() {
    $("#form-check-confirmation").validate({
        rules : {
            "cpf":{required: true, cpfBR: true}
        },
        messages:{
            "cpf":{
                required:"É obrigatório informar o seu CPF.",
                cpfBR:"O número de CPF informado é inválido."
            }
        },
        errorClass: "invalid-feedback",
        highlight: function(element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass("is-invalid").addClass("is-valid");
        },
    });

    $("#cpf").mask("999.999.999-99", {autoclear: false});

    $("#btn-documents").on("click tap", function(event){
        event.stopPropagation();
        if($(this).text() == 'Detalhes da documentação') {
            $(this).text('Voltar para confirmação de inscrição')
            $("#candidate-confirmation").addClass("d-none");
            $("#section-documents").removeClass("d-none");
        } else {
            $(this).text('Detalhes da documentação')
            $("#section-documents").addClass("d-none");
            $("#candidate-confirmation").removeClass("d-none");
        }
        
    })

});