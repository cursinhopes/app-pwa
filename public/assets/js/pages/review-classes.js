$(function(){

    if($("#cpf").hasClass('is-invalid')) {
        $("#btn-modal-initial-registration").click().tap();
    }

    $("#initial-registration-form").validate({
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

    $("#registration-form").validate({
        rules : {
            "first-name":{required: true},
            "last-name":{required: true},
            "pronouns":{required: true},
            "cpf":{required: true, cpfBR: true},
            "email":{required: true, email:true},
            "email2":{required: true, email:true, equalTo:"#email"},
            "birth-date":{required: true}
        },
        messages:{
            "cpf":{
                required:"Informe o seu CPF.",
                cpfBR:"Informe um CPF válido."
            },
            "email":{required: "Informe o seu e-mail", email:"Informe um e-mail válido!"},
            "email2":{required: "Informe o seu e-mail", email:"Informe um e-mail válido", equalTo:"Os e-mail devem ser iguais."},
            "name":{required:"Informe o seu nome."},
            "birth-date":{required: "Informe a sua data de nascimento."}
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

    $("#btn-start-registration").on("click", function(){
        $("#initial-registration-form").submit();
    });

    $(".btn-cancel").on("click", function(){
        $("input").removeClass("is-valid is-invalid").val("");
        $(".invalid-feedback").remove();
    });
})