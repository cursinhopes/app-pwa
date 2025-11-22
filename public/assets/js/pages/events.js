$(function(){
    $("#presenter-registration-form").validate({
        rules : {
            name:{required: true},
            email:{required:true, email:true},
            cpf:{required: true, cpf:true},
            abstract:{required:true}
        },
        messages:{
            name:{required:"É obrigatório informar o seu nome."},
            email:{required:"É obrigatório informar o seu e-mail.",
                    email:"O endereço de e-mail digitado é inválido!"},
            cpf:{
                required: "É obrigatório informar o seu CPF.",
                cpf:"O número de CPF informado é inválido.",
            },
            abstract:{required:"É obrigatório anexar o seu resumo em PDF."}
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass("is-invalid").addClass("is-valid");
        }
    });

    $("#btn-close-modal-register-presenter").on('click', function(){
        $("#presenter-registration-form").validate().resetForm();
        clearFormValues();
    });

    /*$("#btn-submit-presenter-registration").on('click', function(event){
        event.preventDefault();
        if($("#presenter-registration-form").validate().form() === true)
            $.ajax({
                method: "POST",
                url: '/t',
                data: {nome: 'roger'}
            }).done(function(msg){
                console.log('ok '+msg);
            }).fail(function(msg){
                console.log('not ok '+msg);
            });
        else
            console.log("enviar form not ok");
        $("#presenter-registration-form").trigger('submit');
    })*/
})