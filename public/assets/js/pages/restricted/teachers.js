$(function(){
    
    const clickEventType = ((document.ontouchstart!==null)?'click':'touchstart');

    function checkAvailability() {
        var status = 0;
        $("#availability-table input").each(function(){
            if($(this).val() === "Disponível") {
                status++;
            }
        });
        (status >= 2)? $("#availability-table-error").addClass("d-none"):$("#availability-table-error").removeClass("d-none");
        return (status >= 2)? true:false;
    }

    $(".btn-availability").on(clickEventType, function() {
        if($(this).val() === "Indisponível") {
            $(this).val("Disponível").removeClass("btn-danger").addClass("btn-success");
        } else {
            $(this).val("Indisponível").removeClass("btn-success").addClass("btn-danger");
        }
        if($("#btn-save-availability").hasClass("d-none")) {
            $("#btn-save-availability").removeClass("d-none");
        }
    });

    $("#observations").on("change keyup paste", function(){
        if($("#btn-save-availability").hasClass("d-none")) {
            $("#btn-save-availability").removeClass("d-none");
        }
    })

    $("#btn-save-availability").on(clickEventType, function(){
        if(checkAvailability()) {
            $("#form-availability").submit();
        }
    })
})