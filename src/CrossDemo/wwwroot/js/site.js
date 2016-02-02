// Write your Javascript code.


$(document).ready(function () {/* off-canvas sidebar toggle */

    function toggleSidebar () {
        $(this).toggleClass('visible-xs text-center');
        $(this).find('i').toggleClass('fa-angle-double-right fa-angle-double-left');
        $('.row-offcanvas').toggleClass('active');
        $('#lg-menu').toggleClass('hidden-xs').toggleClass('visible-xs');
        $('#xs-menu').toggleClass('visible-xs').toggleClass('hidden-xs');
        $('#btnShow').toggle();
    };

    $('[data-toggle=offcanvas]').click(function () { toggleSidebar();});

    $('#toggleSidebar').click(function (e) { e.preventDefault(); console.log("toggle"); toggleSidebar(); });
});