$(function(){

    const clickEventType = (('ontouchstart' in document.documentElement) ? 'tap' : 'click');

    function renameProjects(type) {
        $("#"+type+"-projects-list .project-name").each(function(index){
            $(this).attr("id", type+"-project-name-"+index);
            $(this).attr("name", type+"-project-name-"+index);
            $(this).prev().attr("for", type+"-project-name-"+index);
            if($(this).next().length !== 0) {
                $(this).next().attr("for", type+"-project-name-"+index);
            }
        });

        $("#"+type+"-projects-list .project-professor").each(function(index){
            $(this).attr("id", type+"-project-professor-"+index);
            $(this).attr("name", type+"-project-professor-"+index);
            $(this).prev().attr("for", type+"-project-professor-"+index);
            if($(this).next().length !== 0) {
                $(this).next().attr("for", type+"-project-professor-"+index);
            }
        });

        $("#"+type+"-projects-list .project-time").each(function(index){
            $(this).attr("id", type+"-project-time-"+index);
            $(this).attr("name", type+"-project-time-"+index);
            $(this).prev().attr("for", type+"-project-time-"+index);
            if($(this).next().length !== 0) {
                $(this).next().attr("for", type+"-project-time-"+index);
            }
        });
    }

    function checkAvailability() {
        var status = false;
        $("#availability-table input").each(function(){
            if($(this).val() === "Disponível") {
                status = true;
            }
        });
        (status)? $("#availability-table-error").addClass("d-none"):$("#availability-table-error").removeClass("d-none");
        return status;
    }

    function getAge(birthDate) {
        var now = new Date();
        [year, month, day] = birthDate.split('-');
        year = parseInt(year);
        month = parseInt(month);
        day = parseInt(day);
        var age;
        if(now.getFullYear() > year) {
            age = now.getFullYear() - year;
            if(month > (now.getMonth()+1) || (month == (now.getMonth()+1) && day > now.getDate())) {
                age--;
            }
        } else {
            age = 0;
        }
        return age;
    }

    $("#registration-form").validate({
        rules : {
            "declaration-of-reading":{required: true},
            "first-name":{required: true},
            "last-name":{required: true},
            "civil-name":{required: true},
            "name":{required: true},
            "pronouns":{required: true},
            "cpf":{required: true},
            "birth-date":{required: true, birthDate: true},
            "email":{required: true},
            "phone":{required: true, phone:true},
            "emergency-contact-name":{required: true},
            "emergency-contact-kinship":{required: true},
            "emergency-contact-phone":{required: true},
            "first-option":{required: true},
            "second-option":{secondOption:true},
            "third-option":{thirdOption:true},
            "motivation-because-sector":{required: true, minlength: 25, maxlength: 1000},
            "motivation-because-education":{required: true, minlength: 25, maxlength: 1000},
            "motivation-because-pes":{required: true, minlength: 25, maxlength: 1000},
            "motivation-how-help":{required: true, minlength: 25, maxlength: 1000},
            "weekly-availability":{required: true},
            "pes-relationship":{required: true},
            "occupation":{required: true},
            "university-name":{required: true},
            "university-registration":{required: true, number:true},
            "university-phase":{required: true},
            "university-course":{required: true},
            "current-project-name-0":{required: true},
            "current-project-name-1":{required: true},
            "current-project-name-2":{required: true},
            "current-project-name-3":{required: true},
            "current-project-name-4":{required: true},
            "old-project-name-0":{required: true},
            "old-project-name-1":{required: true},
            "old-project-name-2":{required: true},
            "old-project-name-3":{required: true},
            "old-project-name-4":{required: true},
            "current-project-time-0":{required: true},
            "current-project-time-1":{required: true},
            "current-project-time-2":{required: true},
            "current-project-time-3":{required: true},
            "current-project-time-4":{required: true},
            "old-project-time-0":{required: true},
            "old-project-time-1":{required: true},
            "old-project-time-2":{required: true},
            "old-project-time-3":{required: true},
            "old-project-time-4":{required: true},
            "volunteer-experience":{required: true, minlength: 25, maxlength: 1000},
            "review-confirmation":{required: true},
            "school-name":{required:true},
            "school-city":{required:true},
            "school-uf":{required:true},
            "school-registration":{required:true},
            "school-grade":{required:true},
            "school-class":{required:true},
            "school-shift":{required:true},
            "school-type":{required:true},
            "school-conclusion-year":{required:true},
            "work":{required: true},
            "work-time":{required: true},
            "working-hours":{required: true},
            "study-routine":{required: true},
            "study-days":{required: true},
            "study-time":{required: true},
            "route-origin":{required: true},
            "transport-type":{required: true},
            "route-time":{required: true},
            "university-entrance-exam":{required: true},
            "university-type":{required: true},
            "vaccination-certificate":{required: true, accept: "application/pdf", maxsize:2097152},
            "enrollment-certificate":{required: true, accept: "application/pdf", maxsize:2097152},
            "school-records":{required: true, accept: "application/pdf", maxsize:2097152},
            "educational-grant-receipt":{accept: "application/pdf", maxsize:2097152}
        },
        messages:{
            "declaration-of-reading":{required:"<b>ATENÇÃO!</b> Você precisa declarar ciência do Edital antes de prosseguir com a inscrição."},
            "review-confirmation":{required: "<b>ATENÇÃO!</b> Você precisa confirmar que revisou os dados antes de enviar."},
            "birth-date":{
                required: "Informe a sua data de nascimento.",
                min: "Informe uma data maior do que 01/01/1900.",
                max: "Informe uma data anterior a hoje."},
            name:{required:"É obrigatório informar o seu nome."},
            email:{required:"É obrigatório informar o seu e-mail.",
                    email:"O endereço de e-mail digitado é inválido!"},
            cpf:{
                required: "É obrigatório informar o seu CPF."
            },
            "vaccination-certificate":{
                required: "Você precisa enviar o Certificado de Vacinação! (ou a declaração para não vacinados assinada).",
                accept: "Tipo de arquivo inválido! Esse campos aceita apenas arquivos no formato PDF.",
                maxsize:"Arquivo muito grande! O Tamanho máximo permitido é de 2 MB."
            },
            "enrollment-certificate":{
                required: "Você precisa enviar o seu Atestado de Freqência/Matrícula.",
                accept: "Tipo de arquivo inválido! Esse campos aceita apenas arquivos no formato PDF.",
                maxsize:"Arquivo muito grande! O Tamanho máximo permitido é de 2 MB."
            },
            "school-records":{
                required: "Você precisa enviar o seu Histórico Escolar.",
                accept: "Tipo de arquivo inválido! Esse campos aceita apenas arquivos no formato PDF.",
                maxsize:"Arquivo muito grande! O Tamanho máximo permitido é de 2 MB."
            },
            "educational-grant-receipt":{
                accept: "Tipo de arquivo inválido! Esse campos aceita apenas arquivos no formato PDF.",
                maxsize:"Arquivo muito grande! O Tamanho máximo permitido é de 2 MB."
            }
        },
        errorClass: "invalid-feedback",
        highlight: function(element, errorClass, validClass) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass("is-invalid").addClass("is-valid");
        },
        errorPlacement:function(error, element) {
            if(element.attr("type") === 'checkbox') {
                error.insertAfter(element.parent());
            } else {
                error.insertAfter(element)
            }
        }
    });

    jQuery.validator.addMethod("phone", function(value, element) {
        var phone = value.replace(/[^\d]+/g,'');
        if(phone.length != 11) {
            return false;
        }
        return true;
    }, "Forneça um número de telefone válido.");

    jQuery.validator.addMethod("birthDate", function(value, element) {
        var now = new Date();
        now.setFullYear(now.getFullYear()-15);
        if(now.toISOString().split('T')[0] >= value) {
            return true;
        }
        return false;
    }, "Você precisa ter pelo menos 15 anos para participar.");

    jQuery.validator.addMethod("secondOption", function(value, element) {
        if(value != $('#first-option').val() || value === ''){
            return true;
        }
        return false;
    }, "Sua segunda opção precisa ser diferente da primeira opção.");

    jQuery.validator.addMethod("thirdOption", function(value, element) {
        if((value != $('#first-option').val() && value != $('#second-option').val()) || value === ''){
            return true;
        }
        return false;
    }, "Sua terceira opção precisa ser diferente das opções anteriores.");

    $("#cpf").mask("999.999.999-99", {autoclear: false});
    $("#phone").mask("(99) 9 9999-9999", {autoclear: false});
    $("#emergency-contact-phone").mask("(99) 9 9999-9999", {autoclear: false});
    $("#university-registration").mask("99999999", {autoclear: false});
    $("#university-phase").mask("9?9", {autoclear: false});

    function fillTheFields() {
        $("#review-full-name").val($("#first-name").val()+" "+$("#last-name").val());
        $("#review-cpf").val($("#cpf").val());
        $("#review-birth-date").val($("#birth-date").val());
        $("#review-email").val($("#email").val());
        $("#review-phone").val($("#phone").val());
        $("#review-first-option").val($("#first-option").val());
        $("#review-second-option").val(($("#second-option").val()==="")?"Nenhuma":$("#second-option").val());
        $("#review-third-option").val(($("#third-option").val()==="")?"Nenhuma":$("#third-option").val());
        $("#review-school-grade").val($("#school-grade").val()+" - "+$("#school-class").val()+" - "+$("#school-shift").val());
        $("#review-school-name").val($("#school-name").val());
        $("#review-school-city").val($("#school-city").val()+" - "+$("#school-uf").val());
        $("#review-conclusion-year").val($("#school-conclusion-year").val());
        $("#review-school-type").val($("#school-type").val());
    }

    function renameButtons(section) {
        if(section === "start") {
            $("#btn-previous-section").text("Cancelar");
            if($("#declaration-of-reading").is(":checked")) {
                $("#btn-next-section").text("Próximo");
            } else {
                $("#btn-next-section").text("Iniciar Inscrição");
            }
        } else if (section === "review-and-send") {
            fillTheFields();
            $("#btn-previous-section").text("Anterior");
            $("#btn-next-section").text("Enviar Inscrição");
        } else {
            $("#btn-previous-section").text("Anterior");
            $("#btn-next-section").text("Próximo");
        }
    }

    function validateSections(finalSection){
        var validator = $("#registration-form").validate();
        var currentSection = "start";
        var previousSection = "";
        $("section").each(function(){
            $(this).addClass("d-none");
        });

        do {
            if(previousSection !== "") {
                if(previousSection === 'availability') {
                    if(!checkAvailability()) {
                        break;
                    }
                }
                if(!validator.form()) {
                    break;
                } else{
                    $("#"+previousSection).addClass("d-none");
                }
                
            }
            $("#"+currentSection).removeClass("d-none");
            previousSection = currentSection;
            currentSection = $("#"+currentSection).next().attr("id");
        } while(previousSection != finalSection);
        
        renameButtons(previousSection); 
    }

    $("#btn-next-section, #btn-previous-section").css({
        "pointer-events": "auto",
        "z-index": "9999",
        "position": "relative"
    });

    $(".btn-section").on("click tap", function(event){
        event.stopPropagation();
        validateSections($(this).val());
    });

    $("#btn-previous-section").on("click tap", function(event){
        event.preventDefault();
        event.stopPropagation();
        let currentSection = $("section:not(.d-none)").attr("id");
        let previousSection = $("#"+currentSection).prev("section").attr("id");
        
        if(previousSection) {
            $("#"+currentSection).addClass("d-none");
            $("#"+previousSection).removeClass("d-none");
            renameButtons(previousSection);
        } else {
            $("form").trigger("reset");
            $.post("/logout");
            window.history.back();
        }
    });


    $("#btn-next-section").on("click tap", function(event){
        event.preventDefault();
        event.stopPropagation();
        let currentSection = $("section:not(.d-none)").attr("id");
        let nextSection = $("#"+currentSection).next("section").attr("id");
        
        var validator = $("#registration-form").validate();
        if(validator.form()) {
            if(nextSection) {
                $("#"+currentSection).addClass("d-none");
                $("#"+nextSection).removeClass("d-none");
                renameButtons(nextSection)
             } else {
                $("#page-content").addClass("d-none");
                $("#loading-message").removeClass("d-none");
                $("#registration-form").submit();
             }
        }
    });

    $('#birth-date').on("blur", function(){
        $("#age").val(getAge($(this).val()));
    });

    $(".btn-availability").on("click tap", function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("Disponibilidade clicado");
        if($(this).val() === "Indisponível") {
            $(this).val("Disponível").removeClass("btn-danger").addClass("btn-success");
        } else {
            $(this).val("Indisponível").removeClass("btn-success").addClass("btn-danger");
        }
        checkAvailability();
    });

    $("#occupation").on("change", function(){
        var occupation = $(this).val().toLowerCase();
        $("#university-name").val("");
        $("#university-registration").val("");
        $("#university-phase").val("");
        $("#university-course").val("");
        if (occupation.includes("estudante")) {
            $("#universitary-informations").removeClass("d-none");
            $("#university-name").val(occupation.includes("ufsc")?"UFSC":"").prop("readonly", occupation.includes("ufsc"));
            if(occupation.includes("pós")) {
                $("#university-registration").parent().hide();
                $("#university-phase").parent().hide();
                $("#univercitary-enrollment-certificate").addClass("d-none");
                $("#no-document-required").removeClass("d-none");
            } else {
                if(occupation.includes("ufsc")) {
                    $("#university-registration").parent().show();
                } else {
                    $("#university-registration").parent().hide();
                }
                $("#university-phase").parent().show();
                $("#no-document-required").addClass("d-none");
                $("#univercitary-enrollment-certificate").removeClass("d-none");
            }
        }else{
            $("#no-document-required").removeClass("d-none");
            $("#universitary-informations").addClass("d-none");
            $("#univercitary-enrollment-certificate").addClass("d-none");
        }
    });

    $(".btn-add-project").on("click tap", function(event){
        event.stopPropagation();
        var projectType = $(this).val();
        if($("#"+projectType+"-projects-list > .row").length < 5) {
            html = ($("#"+projectType+"-projects-list > .row").length != 0)? "<hr>":"";
            html += '<div class="row g-2"><div class="col"><div class="row g-2"><div class="col-sm-12 col-xl-5"><label class="form-label"><b>Projeto:</b></label><input type="text" class="form-control project-name" placeholder="Nome do projeto"></div><div class="col-sm-7 col-xl-4"><label class="form-label"><b>Professor orientador:</b></label><input type="text" class="form-control project-professor" placeholder="Nome do professor (opcional)"></div><div class="col-sm-5 col-xl"><label class="form-label"><b>';
            html += (projectType === "current")? "Carga Horária":"Ano de participação";
            html += '</b></label><input type="text" class="form-control project-time" placeholder="';
            html += (projectType === "current")? "horas/semana":"Ano ou semestre";
            html += '"></div></div></div><div class="col-auto"><button type="button" class="col-auto btn btn-primary-pes ms-1 h-100 btn-remove-project" value="';
            html += projectType;
            html += '"><i class="bi bi-trash3" role="img" aria-label="Remover projeto"></i></button></div></div>';
            $("#"+projectType+"-projects-list").append(html);
            renameProjects(projectType);
        } 
    })

    $(".projects-list").on("click tap", ".btn-remove-project", function(event){
        event.stopPropagation();
        var projectType = $(this).val();
        if($("#"+projectType+"-projects-list > .row").length == 1) {
            $("#"+projectType+"-projects-no").trigger(clickEventType);
            return;
        }
        var projectLine = $(this).parent().parent();
        if(projectLine.prev().length != 0) {
            projectLine.prev().remove();
        } else {
            projectLine.next().remove();
        }
        $(this).parent().parent().remove();
        renameProjects(projectType);
    });

    $("#old-projects-yes").on("click tap", function(event){
        event.stopPropagation();
        if($("#old-projects-information").hasClass("d-none")) {
            $("#old-projects-information").removeClass("d-none");
            $("#old-projects-information .btn-add-project").trigger(clickEventType);
        }
    });

    $("#current-projects-yes").on("click tap", function(event){
        event.stopPropagation();
        if($("#current-projects-information").hasClass("d-none")) {
            $("#current-projects-information").removeClass("d-none");
            $("#current-projects-information .btn-add-project").trigger(clickEventType);
        }
    });

    $("#old-projects-no").on("click tap", function(event){
        event.stopPropagation();
        if(!$("#old-projects-information").hasClass("d-none")) {
            $("#old-projects-list").children().each(function(){
                $(this).remove();
            });
            $("#old-projects-information").addClass("d-none");
        }
    });

    $("#current-projects-no").on("click tap", function(event){
        event.stopPropagation();
        if(!$("#current-projects-information").hasClass("d-none")) {
            $("#current-projects-list").children().each(function(){
                $(this).remove();
            });
            $("#current-projects-information").addClass("d-none");
        }
    });

    $("#volunteer-work-yes").on("click tap", function(event){
        event.stopPropagation();
        $("#volunteer-experiences-information").removeClass("d-none");
    });

    $("#volunteer-work-no").on("click tap", function(event){
        event.stopPropagation();
        $("#volunteer-experiences-information").addClass("d-none");
    });

    $("#student-type-studying").on("click tap", function(event){
        event.stopPropagation();
        $("#formed-fields").addClass("d-none");
        $("#studying-fields").removeClass("d-none");
        $("#formed-fields input").each(function(){
            $(this).val("").removeClass("is-valid is-invalid");
        });
        $("#school-grade").val("3º");
        $("#school-enrollment-certificate").removeClass("d-none");
        $("#review-formed").addClass('d-none');
        $("#review-studying").removeClass('d-none');
    });

    $("#student-type-formed").on("click tap", function(event){
        event.stopPropagation();
        $("#studying-fields").addClass("d-none");
        $("#formed-fields").removeClass("d-none");
        $("#studying-fields input").each(function(){
            $(this).val("").removeClass("is-valid is-invalid");
        });
        $("#studying-fields select").each(function(){
            $(this).val("").removeClass("is-valid is-invalid");
        });
        $("#school-enrollment-certificate").addClass("d-none");
        $("#review-studying").addClass('d-none');
        $("#review-formed").removeClass('d-none');
    });

    $("#school-type").on("change", function(){
        if($(this).val().includes("particular")) {
            $("#educational-grant-receipt").removeClass("d-none");
        } else {
            $("#educational-grant-receipt").addClass("d-none");
        }
    });

    $("#use-social-name-yes").on("click tap", function(event){
        event.stopPropagation();
        $("#civil-name-field").removeClass("d-none");
    });

    $("#use-social-name-no").on("click tap", function(event){
        event.stopPropagation();
        $("#civil-name-field").addClass("d-none");
        $("#civil-name").val("").removeClass("is-valid is-invalid");
    });

    $("#school-name-select").on("change", function(){
        if($(this).val() === "Outra") {
            $(this).val("").prop("hidden", true).prop("disabled", true).removeClass("is-valid is-invalid");
            $("#school-name-label").attr("for", "school-name-text");
            $("#school-name-text").prop("disabled", false);
            $("#school-name-text-field").removeClass("d-none");
            $("#school-city").val("").removeClass("is-valid is-invalid");
            $("#school-uf").val("").removeClass("is-valid is-invalid");
        } else if($(this).val() === "E.E.B. Apolônio Ireno Cardoso") {
            $("#school-city").val("Balneário Arroio do Silva").addClass("is-valid").removeClass("is-invalid");
            $("#school-uf").val("SC").addClass("is-valid").removeClass("is-invalid");
        } else if($(this).val() != "") {
            $("#school-city").val("Araranguá").addClass("is-valid").removeClass("is-invalid");
            $("#school-uf").val("SC").addClass("is-valid").removeClass("is-invalid");
        } else {
            $("#school-city").val("").removeClass("is-valid is-invalid");
            $("#school-uf").val("").removeClass("is-valid is-invalid");
        }
    })

    $("#btn-back-school-name-select").on("click tap", function(event){
        event.preventDefault();
        event.stopPropagation();
        $("#school-name-text").val("").prop("disabled", true).removeClass("is-valid is-invalid");
        $("#school-name-text-field").addClass("d-none");
        $("#school-name-label").attr("for", "school-name-select");
        $("#school-name-select").prop("hidden", false).prop("disabled", false);
        $("#school-city").val("").removeClass("is-valid is-invalid");
        $("#school-uf").val("").removeClass("is-valid is-invalid");
    })
})
