$(function(){

    $(".btn-confirm-presence").on("click tap", function() {
        $("#students-list").addClass("d-none");
        $("#confirmation-presence").removeClass("d-none");
        $(".student-name").text($(this).text());
        $("#id-student").val($(this).val());
        $("h2").text("Confirmação de presença");
    });

    $(".btn-deconfirm-presence").on("click tap", function() {
        $("#students-list").addClass("d-none");
        $("#disconfirmation-presence").removeClass("d-none");
        $(".student-name").text($(this).text());
        $("#id-student2").val($(this).val());
        $("h2").text("Desconfirmação de presença");
    });

})