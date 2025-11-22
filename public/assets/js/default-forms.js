// função que limpa os dados e validações dos ofrmulários
function clearFormValues() {
    $("input").val('').removeClass('is-valid').removeClass('is-invalid');
    $("textarea").val('').removeClass('is-valid').removeClass('is-invalid');
    $("select").val('').removeClass('is-valid').removeClass('is-invalid');
    $(".error").remove();
}

// adiciona método para validação de cpf
jQuery.validator.addMethod("cpf", function(value, element) {
    var cpf = value.replace(/[^\d]+/g,'');
    if(cpf.length < 11) return this.optional(element) || false;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i=0; i<11; i++){
        a[i] = cpf.charAt(i);
        if (i < 9) b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) { a[9] = 0 } else { a[9] = 11-x }
    b = 0;
    c = 11;
    for (y=0; y<10; y++) b += (a[y] * c--);
    if ((x = b % 11) < 2) { a[10] = 0; } else { a[10] = 11-x; }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg)) retorno = false;

    return this.optional(element) || retorno;
 
 }, "Número de CPF inválido");

 $(function(){
     // definições de máscaras para alguns dados gerais
    $(".date").mask("99/99/9999", {autoclear: false, placeholder:"dd/mm/aaaa"});
    $(".cpf").mask("999.999.999-99", {autoclear: false});
    $(".cep").mask("99.999-999", {autoclear: false});
    $(".phone").mask("(99) 9999-9999?9", {autoclear: false});
    
    // coreção de máscaras para telefones fixo/celular
    $(".phone").on('change', function(){
        let number = $(this).val().replace(/[^\d]+/g,'');
        if(number.length>10){
            $(this).mask("(99) 9 9999-9999", {autoclear: false});
        }else{
            $(this).mask("(99) 9999-9999?9", {autoclear: false});
        }
    });

    $(".cpf").on('change', function(){
        let number = $(this).val().replace(/[^\d]+/g,'');
        if(number.length === 0){
            $(this).val("");
        }
    });
 });