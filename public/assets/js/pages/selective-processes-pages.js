$(function(){
    $("#initial-registration-form").validate({
        rules : {
            "cpf":{required: true, cpfBR: true},
            "email":{required: true, email:true},
            "email2":{required: true, email:true, equalTo: "#email"},
        },
        messages:{
            "cpf":{
                required:"É obrigatório informar o seu CPF.",
                cpfBR:"O número de CPF informado é inválido."
            },
            "email":{
                required:"Informe o seu endereço de e-mail.",
                email:"Informe um endereço de e-mail válido."
            },
            "email2":{
                required:"Confirme o seu endereço de e-mail.",
                email:"Informe um endereço de e-mail válido.",
                equalTo:"Os endereços informados não coincidem."
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

    $("#btn-start-registration").on("click tap", function(){
        $("#initial-registration-form").submit();
    });

    $(".btn-cancel").on("click tap", function(){
        $("input").removeClass("is-valid is-invalid").val("");
        $(".invalid-feedback").remove();
    });
})