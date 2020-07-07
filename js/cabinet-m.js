$(document).ready(function() {

});

$(window).on('load resize', function() {

    $('.manager-table-meetdays').each(function() {
        var curTable = $(this);
        var curWidth = 0;
        var curMonth = null;
        curTable.find('.manager-table-cell-meet-cell-month-header').each(function() {
            var curCell = $(this);
            if (curCell.find('.manager-table-meetdays-month-title').length > 0) {
                if (curMonth !== null) {
                    curMonth.width(curWidth - 18);
                }
                curWidth = curCell.outerWidth();
                curMonth = curCell.find('.manager-table-meetdays-month-title');
            } else {
                curWidth += curCell.outerWidth();
            }
            if (curMonth !== null) {
                curMonth.width(curWidth);
            }
        });
    });

});