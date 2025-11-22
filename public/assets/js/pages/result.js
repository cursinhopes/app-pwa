$(function() {
    $("#form-check-result").validate({
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

     $("#btn-back").on("click", function(){

     });

     $("#btn-result").on("click", function(){
        if($("#candidate-situation").hasClass("d-none")) {
            $("#candidate-situation").removeClass("d-none");
            $("#objective-test-result").addClass("d-none");
            $(this).text("Ver dados da prova");
        } else {
            $("#candidate-situation").addClass("d-none");
            $("#objective-test-result").removeClass("d-none");
            $(this).text("Voltar ao resultado");
        }//13175987923
     });
});