
$(document).ready(function () {

    /* off-canvas sidebar toggle */

    $('[data-toggle=offcanvas]').click(function () {
        console.log("toggle menu");
        $(this).toggleClass('visible-xs text-center');
        //$(this).find('i').toggleClass('glyphicon-chevron-right glyphicon-chevron-left');
        $('.row-offcanvas').toggleClass('active');
        $('#lg-menu').toggleClass('hidden-md-down').toggleClass('hidden-lg-up');
        $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-md-down');
        //$('#btnShow').toggle();
    });
});