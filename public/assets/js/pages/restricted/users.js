$(document).ready(function () {

    var link = Object();
    var user = Object();
    
    $(".editButton").on("click", function(event){
        event.preventDefault();
        // troca o botão de exibir para salvar
        $(".editButton").attr("disabled", true);
        $(".buttonDelete").attr("disabled", true);
        $(this).hide();
        $("#saveButton"+$(this).val()).attr("hidden", false);
        $("#buttonDelete"+$(this).val()).hide();
        $("#buttonCancel"+$(this).val()).attr("hidden", false);
        // habilita campos para edição
        $("#name"+$(this).val()).attr("disabled", false);
        $("#status"+$(this).val()).attr("disabled", false);
        $("#permanentLink"+$(this).val()).attr("disabled", false);
        $("#url"+$(this).val()).attr("disabled", false);
        // verifica se o link é marcado como expirável
        if(!$("#permanentLink"+$(this).val()).is(':checked')){
            $("#expirationDatetime"+$(this).val()).attr("disabled", false);
        }
        // faz cópia dos valores antes da alteração
        link.name = $("#name"+$(this).val()).val();
        link.status = $("#status"+$(this).val()).is(':checked');
        link.permanentLink = $("#permanentLink"+$(this).val()).is(':checked');
        link.url = $("#url"+$(this).val()).val();
        link.expirationDatetime = $("#expirationDatetime"+$(this).val()).val();
        console.log("SALVA LINK");
        console.log(link);
    });

    $(".saveButton").on("click", function(event){
        if($("#name"+$(this).val()).val() == link.name){
            if($("#url"+$(this).val()).val() == link.url){
                if($("#status"+$(this).val()).is(':checked') == link.status){
                    if($("#permanentLink"+$(this).val()).is(':checked') == link.permanentLink){
                        if($("#permanentLink"+$(this).val()).is(':checked') || (!$("#permanentLink"+$(this).val()).is(':checked') && $("#expirationDatetime"+$(this).val()).val() == link.expirationDatetime)){
                            event.preventDefault();
                            // troca botão salvar para editar e ativa a edição dos demais
                            $(".editButton").attr("disabled", false);
                            $(".buttonDelete").attr("disabled", false);
                            $(this).attr("hidden", true);
                            $("#editButton"+$(this).val()).show();
                            $("#buttonDelete"+$(this).val()).show();
                            $("#buttonCancel"+$(this).val()).attr("hidden", true);
                            // desabilita campos para edição
                            $("#name"+$(this).val()).attr("disabled", true);
                            $("#status"+$(this).val()).attr("disabled", true);
                            $("#permanentLink"+$(this).val()).attr("disabled", true);
                            $("#url"+$(this).val()).attr("disabled", true);
                            $("#expirationDatetime"+$(this).val()).attr("disabled", true);
                            return;
                        }
                    }
                }
            }
        }
    });

    $(".permanentLink").on("click", function(){
        if($("#permanentLink"+$(this).val()).is(':checked')){
            $("#expirationDatetime"+$(this).val()).attr("disabled", true);
        }else{
            $("#expirationDatetime"+$(this).val()).attr("disabled", false);
        }
    });

    $("#buttonAddLink").on("click", function(){
        $(".editButton").attr("disabled", true);
        $(this).hide();
        $("#newName").val('');
        $("#newUrl").val('');
        $("#newExpirationDatetime").val('');
        $("#newStatus").prop("checked", false);
        $("#newPermanentLink").prop("checked", false);
        $("#newExpirationDatetime").attr("disabled", false);
        $("#newLinkBox").show();
    });

    $("#newPermanentLink").on("click", function(){
        if($("#newPermanentLink").is(':checked')){
            $("#newExpirationDatetime").attr("disabled", true);
        }else{
            $("#newExpirationDatetime").attr("disabled", false);
        }
    });

    $("#buttonDeleteNewLink").on("click", function(){
        $(".editButton").attr("disabled", false);
        $("#newLinkBox").hide();
        $("#buttonAddLink").show();
    });

    $(".buttonDelete").on("click", function(event){
        event.preventDefault();
        $("#buttonDeleteConfirmation").val($("#idLinks"+$(this).val()).val());
        $("#modalDeleteConfirmation").click();
        return;
        
    });

    $(".buttonCancel").on("click", function(event){
        event.preventDefault();
        // restaura os valores originais, caso alterados
        $("#name"+$(this).val()).val(link.name);
        $("#status"+$(this).val()).prop('checked', link.status);
        $("#permanentLink"+$(this).val()).prop('checked', link.permanentLink);
        $("#url"+$(this).val()).val(link.url);
        $("#expirationDatetime"+$(this).val()).val(link.expirationDatetime);
        $(".editButton").attr("disabled", false);
        $(".buttonDelete").attr("disabled", false);
        $(this).attr("hidden", true);
        $("#editButton"+$(this).val()).show();
        $("#buttonDelete"+$(this).val()).show();
        $("#saveButton"+$(this).val()).attr("hidden", true);
        // desabilita campos para edição
        $("#name"+$(this).val()).attr("disabled", true);
        $("#status"+$(this).val()).attr("disabled", true);
        $("#permanentLink"+$(this).val()).attr("disabled", true);
        $("#url"+$(this).val()).attr("disabled", true);
        $("#expirationDatetime"+$(this).val()).attr("disabled", true);
    });

    $("#buttonDeleteConfirmation").on("click", function(event){
        event.preventDefault();
        $(".editButton").attr("disabled", true);
        $(".buttonDelete").attr("disabled", true);
        $("#buttonAddLink").attr("disabled", true);
        $.post('/usuario/gestor/links/delete', { idLink: $(this).val()}).done(function(){
            window.location.reload();
        }).fail(function(){
            alert("Erro ao tentar realizar a exclusão.");
            $(".editButton").attr("disabled", false);
            $(".buttonDelete").attr("disabled", false);
            $("#buttonAddLink").attr("disabled", false);
        });
    });

    $("#editProfileButton").on("click", function(event){
        event.preventDefault();
        // troca o botão de exibir para salvar
        $(this).hide();
        $("#saveProfileButton").attr("hidden", false);
        $("#CancelProfileEditButton").attr("hidden", false);
        // habilita campos para edição
        $("#name").attr("disabled", false);
        $("#lastName").attr("disabled", false);
        $("#email").attr("disabled", false);
        $("#profileImage").attr("hidden", false);
        // faz cópia dos valores antes da alteração
        user.name = $("#name").val();
        user.lastName = $("#lastName").val();
        user.email = $("#email").val();
    });

    $("#CancelProfileEditButton").on("click", function(event){
        event.preventDefault();
        // restaura os valores originais, caso alterados
        $("#name").val(user.name);
        $("#lastName").val(user.lastName);
        $("#email").val(user.email);
        $("#profileImage").val('');
        $(this).attr("hidden", true);
        $("#editProfileButton").show();
        $("#saveProfileButton").attr("hidden", true);
        // desabilita campos para edição
        $("#name").attr("disabled", true);
        $("#lastName").attr("disabled", true);
        $("#email").attr("disabled", true);
        $("#profileImage").attr("hidden", true);
    });

    $("#saveProfileButton").on("click", function(event){
        if($("#name").val() === user.name){
            if($("#lastName").val() === user.lastName){
                if($("#email").val() === user.email){
                    if($("#profileImage").val() === ''){
                        event.preventDefault();
                        // troca botão salvar para editar e ativa a edição dos demais
                        $(this).attr("hidden", true);
                        $("#editProfileButton").show();
                        $("#CancelProfileEditButton").attr("hidden", true);
                        // desabilita campos para edição
                        $("#name").attr("disabled", true);
                        $("#lastName").attr("disabled", true);
                        $("#email").attr("disabled", true);
                        $("#profileImage").attr("hidden", true);
                        return;
                    }
                }
            }
        }
    });

    $(".buttonDeleteUser").on("click", function(event){
        event.preventDefault();
        $("#buttonDeleteUserConfirmation").val($("#idUser"+$(this).val()).val());
        $("#modalDeleteUserConfirmation").click();
        return;
        
    });

    $("#buttonDeleteUserConfirmation").on("click", function(event){
        event.preventDefault();
        $(".buttonEditUser").attr("disabled", true);
        $(".buttonDeleteUser").attr("disabled", true);
        $("#buttonAddUser").attr("disabled", true);
        $.post('/usuario/gestor/users/delete', { idUser: $(this).val()}).done(function(){
            window.location.reload();
        }).fail(function(){
            alert("Erro ao tentar realizar a exclusão do usuário.");
            $(".buttonEditUser").attr("disabled", false);
            $(".buttonDeleteUser").attr("disabled", false);
            $("#buttonAddUser").attr("disabled", false);
        });
    });

    $("#buttonAddUser").on("click", function(){
        $(".buttonEditUser").attr("disabled", true);
        $(".buttonDeleteUser").attr("disabled", true);
        $(this).hide();
        $("#newName").val('');
        $("#newLastName").val('');
        $("#newUserType").val('');
        $("#newEmail").val('');
        $("#newUsername").val('');
        $("#newCpf").val('');
        $("#newUserBox").show();
    });

    $("#buttonCancelAddUser").on("click", function(event){
        event.preventDefault();
        $(".buttonEditUser").attr("disabled", false);
        $(".buttonDeleteUser").attr("disabled", false);
        $("#buttonAddUser").show();
        $("#newUserBox").hide();
    });

    $(".buttonEditUser").on("click", function(event){
        event.preventDefault();
        // troca o botão de exibir para salvar
        $(".buttonEditUser").attr("disabled", true);
        $(".buttonDeleteUser").attr("disabled", true);
        $(this).hide();
        $("#saveUserButton"+$(this).val()).attr("hidden", false);
        $("#DeleteUserButton"+$(this).val()).hide();
        $("#CancelUserEditButton"+$(this).val()).attr("hidden", false);
        // habilita campos para edição
        $("#name"+$(this).val()).attr("disabled", false);
        $("#lastName"+$(this).val()).attr("disabled", false);
        $("#userType"+$(this).val()).attr("disabled", false);
        $("#email"+$(this).val()).attr("disabled", false);
        $("#username"+$(this).val()).attr("disabled", false);
        $("#cpf"+$(this).val()).attr("disabled", false);
        // faz cópia dos valores antes da alteração
        user.name = $("#name"+$(this).val()).val();
        user.lastName = $("#lastName"+$(this).val()).val();
        user.userType = $("#userType"+$(this).val()).val();
        user.email = $("#email"+$(this).val()).val();
        user.username = $("#username"+$(this).val()).val();
        user.cpf = $("#cpf"+$(this).val()).val();
    });

    $(".cancelEditUserButton").on("click", function(event){
        event.preventDefault();
        // restaura os valores originais, caso alterados
        $("#name"+$(this).val()).val(user.name);
        $("#lastName"+$(this).val()).val(user.lastName);
        $("#userType"+$(this).val()).val(user.userType);
        $("#email"+$(this).val()).val(user.email);
        $("#username"+$(this).val()).val(user.username);
        $("#cpf"+$(this).val()).val(user.cpf);
        //reativa botões
        $(".buttonEditUser").attr("disabled", false);
        $(".buttonDeleteUser").attr("disabled", false);
        $(this).attr("hidden", true);
        $("#editUserButton"+$(this).val()).show();
        $("#DeleteUserButton"+$(this).val()).show();
        $("#saveUserButton"+$(this).val()).attr("hidden", true);
        // desabilita campos para edição
        $("#name"+$(this).val()).attr("disabled", true);
        $("#lastName"+$(this).val()).attr("disabled", true);
        $("#userType"+$(this).val()).attr("disabled", true);
        $("#email"+$(this).val()).attr("disabled", true);
        $("#username"+$(this).val()).attr("disabled", true);
        $("#cpf"+$(this).val()).attr("disabled", true);
    });

    $(".saveUserButton").on("click", function(event){
        if($("#name"+$(this).val()).val() === user.name){
            if($("#lastName"+$(this).val()).val() === user.lastName){
                if($("#userType"+$(this).val()).val() === user.userType){
                    if($("#email"+$(this).val()).val() === user.email){
                        if($("#username"+$(this).val()).val() === user.username){
                            if($("#cpf"+$(this).val()).val() === user.cpf){
                                event.preventDefault();
                                //reativa botões
                                $(".buttonEditUser").attr("disabled", false);
                                $(".buttonDeleteUser").attr("disabled", false);
                                $(this).attr("hidden", true);
                                $("#editUserButton"+$(this).val()).show();
                                $("#DeleteUserButton"+$(this).val()).show();
                                $("#CancelUserEditButton"+$(this).val()).attr("hidden", true);
                                // desabilita campos para edição
                                $("#name"+$(this).val()).attr("disabled", true);
                                $("#lastName"+$(this).val()).attr("disabled", true);
                                $("#userType"+$(this).val()).attr("disabled", true);
                                $("#email"+$(this).val()).attr("disabled", true);
                                $("#username"+$(this).val()).attr("disabled", true);
                                $("#cpf"+$(this).val()).attr("disabled", true);
                                return;
                            }
                        }
                    }
                }
            }
        }
    })
});