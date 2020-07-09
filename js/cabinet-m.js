$(document).ready(function() {

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter .form-checkbox input', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter .manager-table-filter-params-window-count-meets-input input', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('change', '.lkm-exponent-add-wrapper .manager-table-filter .form-select select', function(e) {
        lkmMeetAddFilterUpdate();
    });

    $('body').on('click', '.lkm-exponent-add-wrapper .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            if (!(curLink.hasClass('pager-prev') && $('.lkm-exponent-add-wrapper .pager-prev').next().hasClass('active')) && !(curLink.hasClass('pager-next') && $('.lkm-exponent-add-wrapper .pager-next').prev().hasClass('active'))) {
                if (!(curLink.hasClass('pager-prev')) && !(curLink.hasClass('pager-next'))) {
                    $('.lkm-exponent-add-wrapper .pager a.active').removeClass('active');
                    curLink.addClass('active');
                } else if (curLink.hasClass('pager-prev')) {
                    var curIndex = $('.lkm-exponent-add-wrapper .pager a').index($('.lkm-exponent-add-wrapper .pager a.active'));
                    $('.lkm-exponent-add-wrapper .pager a.active').removeClass('active');
                    $('.lkm-exponent-add-wrapper .pager a').eq(curIndex - 1).addClass('active');
                } else {
                    var curIndex = $('.lkm-exponent-add-wrapper .pager a').index($('.lkm-exponent-add-wrapper .pager a.active'));
                    $('.lkm-exponent-add-wrapper .pager a.active').removeClass('active');
                    $('.lkm-exponent-add-wrapper .pager a').eq(curIndex + 1).addClass('active');
                }
                lkmMeetAddFilterUpdate();
            }
        }
        e.preventDefault();
    });

    $('body').on('change', '.lkm-exponent-add-exponent input', function() {
        $('.lkm-exponent-add-company-error').removeClass('visible');
    });

    $('body').on('click', '.lkm-exponent-add-select-link', function(e) {
        if ($('.lkm-exponent-add-list input:checked').length == 0) {
            $('.lkm-exponent-add-company-error').addClass('visible');
            $('.window').animate({'scrollTop': 0})
        } else {
            var curID = $('.lkm-exponent-add-exponent input:checked').val();
            $('.meet-card-data-item-exponent input').val(curID);
            $('.meet-card-data-item-exponent').removeClass('meet-card-data-item-empty');
            var curExponent = null;
            for (var i = 0; i < lkmMeetAddData.data.list.length; i++) {
                if (lkmMeetAddData.data.list[i].ID == curID) {
                    curExponent = lkmMeetAddData.data.list[i];
                }
            }
            var newHTML =           '<div class="meet-card-data-header">' +
                                        '<h3>Данные экспонента</h3>' +
                                        '<div class="meet-card-data-header-link"><a href="' + curExponent.LINK_DETAIL + '">карточка экспонента</a></div>' +
                                    '</div>' +
                                    '<div class="meet-card-data-container">' +
                                        '<div class="meet-card-data-info">' +
                                            '<div class="meet-card-data-company">' +
                                                '<div class="meet-card-data-company-logo"><img src="' + curExponent.LOGOTYPE_SRC + '" alt="" /></div>' +
                                                '<div class="meet-card-data-company-info">' +
                                                    '<div class="meet-card-data-company-title">' + curExponent.NAME + '</div>';
            if (curExponent.BRANDS !== undefined) {
                newHTML +=                          '<div class="meet-card-data-company-brands">' + curExponent.BRANDS + '</div>';
            }
            newHTML +=                        '</div>' +
                                            '</div>';
            if (curExponent.COUNTRIES !== undefined) {
                newHTML +=                  '<div class="meet-card-data-countries">';
                for (var j = 0; j < curExponent.COUNTRIES.length; j++) {
                    newHTML +=                  '<div class="meet-card-data-country">';
                    newHTML +=                      '<img src="' + curExponent.COUNTRIES[j].FLAG_SRC + '" alt="" />' + curExponent.COUNTRIES[j].NAME
                    if (curExponent.COUNTRIES[j].REGIONS !== undefined) {
                        for (var k = 0; k < curExponent.COUNTRIES[j].REGIONS.length; k++) {
                            if (k == 0) {
                                newHTML += ' '
                            } else {
                                newHTML += ' | '
                            }
                            newHTML +=              '<span class="catalogue-item-country-item-hint">' + curExponent.COUNTRIES[j].REGIONS[k].SHORT + '<span class="catalogue-item-country-item-hint-title">' + curExponent.COUNTRIES[j].REGIONS[k].FULL + '</span></span>';
                        }
                    }
                    newHTML +=                  '</div>';
                }
                newHTML +=                  '</div>';
            }
            newHTML +=                  '</div>' +
                                        '<div class="meet-card-data-props">' +
                                            '<div class="meet-card-data-prop">' +
                                                '<div class="meet-card-data-prop-title">Категории</div>' +
                                                '<div class="meet-card-data-prop-value">' +
                                                    '<div class="meet-card-data-prop-categories">';
            if (curExponent.CATEGORIES !== undefined) {
                for (var j = 0; j < curExponent.CATEGORIES.length; j++) {
                    newHTML +=                          '<span class="catalogue-item-country-item-hint"><img src="' + curExponent.CATEGORIES[j].ICON_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curExponent.CATEGORIES[j].NAME + '</span></span>';
                }
            }
            newHTML +=                              '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="meet-card-data-prop">' +
                                                '<div class="meet-card-data-prop-title">Сырье</div>';
            if (curExponent.SOURCE !== undefined) {
                newHTML +=                      '<div class="meet-card-data-prop-value">';
                for (var j = 0; j < curExponent.SOURCE.length; j++) {
                    if (j > 0) {
                        newHTML +=                  '<br />';
                    }
                    newHTML +=                      curExponent.SOURCE[j].NAME;
                }
                newHTML +=                      '</div>';
            }
            newHTML +=                      '</div>' +
                                            '<div class="meet-card-data-prop">' +
                                                '<div class="meet-card-data-prop-title">Минимальный объем</div>' +
                                                '<div class="meet-card-data-prop-value">' + curExponent.ORDER_MIN + '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';
            $('.meet-card-data-item-exponent .meet-card-data-item-container').html(newHTML);
            $('.meet-card-data-item-exponent .meet-card-data-item-change').show();
            lkmMeetAddDayUpdate();
            windowClose();
        }
        e.preventDefault();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter .form-checkbox input', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter .manager-table-filter-params-window-count-meets-input input', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('change', '.lkm-visitor-add-wrapper .manager-table-filter .form-select select', function(e) {
        lkmMeetAddFilterUpdateVisitor();
    });

    $('body').on('click', '.lkm-visitor-add-wrapper .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            if (!(curLink.hasClass('pager-prev') && $('.lkm-visitor-add-wrapper .pager-prev').next().hasClass('active')) && !(curLink.hasClass('pager-next') && $('.lkm-visitor-add-wrapper .pager-next').prev().hasClass('active'))) {
                if (!(curLink.hasClass('pager-prev')) && !(curLink.hasClass('pager-next'))) {
                    $('.lkm-visitor-add-wrapper .pager a.active').removeClass('active');
                    curLink.addClass('active');
                } else if (curLink.hasClass('pager-prev')) {
                    var curIndex = $('.lkm-visitor-add-wrapper .pager a').index($('.lkm-visitor-add-wrapper .pager a.active'));
                    $('.lkm-visitor-add-wrapper .pager a.active').removeClass('active');
                    $('.lkm-visitor-add-wrapper .pager a').eq(curIndex - 1).addClass('active');
                } else {
                    var curIndex = $('.lkm-visitor-add-wrapper .pager a').index($('.lkm-visitor-add-wrapper .pager a.active'));
                    $('.lkm-visitor-add-wrapper .pager a.active').removeClass('active');
                    $('.lkm-visitor-add-wrapper .pager a').eq(curIndex + 1).addClass('active');
                }
                lkmMeetAddFilterUpdateVisitor();
            }
        }
        e.preventDefault();
    });

    $('body').on('change', '.lkm-visitor-add-visitor input', function() {
        $('.lkm-visitor-add-company-error').removeClass('visible');
    });

    $('body').on('click', '.lkm-visitor-add-select-link', function(e) {
        if ($('.lkm-visitor-add-list input:checked').length == 0) {
            $('.lkm-visitor-add-company-error').addClass('visible');
            $('.window').animate({'scrollTop': 0})
        } else {
            var curID = $('.lkm-visitor-add-visitor input:checked').val();
            $('.meet-card-data-item-visitor input').val(curID);
            $('.meet-card-data-item-visitor').removeClass('meet-card-data-item-empty');
            var curExponent = null;
            for (var i = 0; i < lkmMeetAddDataVisitor.data.list.length; i++) {
                if (lkmMeetAddDataVisitor.data.list[i].ID == curID) {
                    curExponent = lkmMeetAddDataVisitor.data.list[i];
                }
            }
            var newHTML =           '<div class="meet-card-data-header">' +
                                        '<h3>Данные посетителя</h3>' +
                                        '<div class="meet-card-data-header-link"><a href="' + curExponent.LINK_DETAIL + '">карточка посетителя</a></div>' +
                                    '</div>' +
                                    '<div class="meet-card-data-container">' +
                                        '<div class="meet-card-data-props">' +
                                            '<div class="meet-card-data-props-col">' +
                                                '<div class="meet-card-data-props-item">' +
                                                    '<div class="meet-card-data-props-item-title">Название</div>' +
                                                    '<div class="meet-card-data-props-item-value">' + curExponent.NAME + '</div>' +
                                                '</div>' +
                                                '<div class="meet-card-data-props-item">' +
                                                    '<div class="meet-card-data-props-item-title">Город</div>' +
                                                    '<div class="meet-card-data-props-item-value">' + curExponent.CITY + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="meet-card-data-props-col">' +
                                                '<div class="meet-card-data-props-item">' +
                                                    '<div class="meet-card-data-props-item-title">Вид деятельности</div>' +
                                                    '<div class="meet-card-data-props-item-value">' + curExponent.BRANDS + '</div>' +
                                                '</div>' +
                                                '<div class="meet-card-data-props-item">' +
                                                    '<div class="meet-card-data-props-item-title">Представитель</div>' +
                                                    '<div class="meet-card-data-props-item-value">' + curExponent.DELEGATE.NAME + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';
            $('.meet-card-data-item-visitor .meet-card-data-item-container').html(newHTML);
            $('.meet-card-data-item-visitor .meet-card-data-item-change').show();
            lkmMeetAddDayUpdate();
            windowClose();
        }
        e.preventDefault();
    });

    $('body').on('change', '.window-online-date-list input', function(e) {
        var curIndex = $('.window-online-date-list input').index($('.window-online-date-list input:checked'));
        $('.window-online-time-content.active').removeClass('active');
        $('.window-online-time-content .window-online-time-list input').removeClass('required');
        $('.window-online-time-content').eq(curIndex).addClass('active');
        $('.window-online-time-content').eq(curIndex).find('.window-online-time-list input').addClass('required');
        $('.window-online-date h3 .error').removeClass('visible');
        $('.window-online-date-current span').html('<strong>' + $('.window-online-date-list input:checked').attr('data-name') + '</strong> ' + $('.window-online-date-list input:checked').attr('data-day'));
        $('.window-online-date-list .archive-card-days-date').removeClass('current');
        $('.window-online-date-list input:checked').parents().filter('.archive-card-days-date').addClass('current');
    });

    $('body').on('change', '.window-online-time-list input', function(e) {
        $('.window-online-time h3 .error').removeClass('visible');
    });

    $('body').on('change', '.window-online-type input', function(e) {
        $('.window-online-type h3 .error').removeClass('visible');
    });

    $('body').on('click', '.meet-add-submit-link', function(e) {
        if ($('.meet-add-form form').valid()) {
            $('.meet-add-form').addClass('loading');
            var filterData = {};
            filterData['exponentID'] = $('.meet-card-data-item-exponent input').val();
            filterData['visitorID'] = $('.meet-card-data-item-visitor input').val();
            filterData['date'] = $('.window-online-date input:checked').val();
            filterData['time'] = $('.window-online-time input:checked').val();
            filterData['type'] = $('.window-online-type input:checked').val();
            $.ajax({
                type: 'POST',
                url: $('.meet-add-step-3').attr('data-url'),
                dataType: 'html',
                data: filterData,
                cache: false,
                success: function(html) {
                    $('.meet-add-form').removeClass('loading');
                    $('.meet-add-form .message').remove();
                    $('.meet-add-step-2').hide();
                    $('.meet-card-data-item-change').hide();
                    $('.meet-add-step-3').html(html);
                    $('.meet-add-step-3').show();
                    $('html, body').animate({'scrollTop': 0});
                },
                error: function() {
                    $('.meet-add-form').removeClass('loading');
                    $('.meet-add-form .message').remove();
                    $('.meet-add-form').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
                }
            });
        }
        e.preventDefault();
    });

    $('body').on('click', '.meet-add-back-link', function(e) {
        $('.meet-add-step-2').show();
        $('.meet-card-data-item-change').show();
        $('.meet-add-step-3').hide();
        e.preventDefault();
    });

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

function lkmMeetAddFilterInit() {
    $('.lkm-exponent-add-wrapper .support-search-window form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        validator.destroy();
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                lkmMeetAddFilterUpdate();
            }
        });
    });
    $('.window').addClass('with-tabs');
    window.setTimeout(function() {
        $('.lkm-exponent-add-wrapper .form-input-date input').each(function() {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                myDatepicker.update('onSelect', function(formattedDate, date, inst) {
                    lkmMeetAddFilterUpdate();
                });
            }
        });
    }, 500);

    lkmMeetAddFilterUpdate();
}

function lkmMeetAddFilterInitVisitor() {
    $('.lkm-visitor-add-wrapper .support-search-window form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        validator.destroy();
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                lkmMeetAddFilterUpdateVisitor();
            }
        });
    });
    $('.window').addClass('with-tabs');
    window.setTimeout(function() {
        $('.lkm-visitor-add-wrapper .form-input-date input').each(function() {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                myDatepicker.update('onSelect', function(formattedDate, date, inst) {
                    lkmMeetAddFilterUpdateVisitor();
                });
            }
        });
    }, 500);

    lkmMeetAddFilterUpdateVisitor();
}

var lkmMeetAddData = null;
var lkmMeetAddDataVisitor = null;

function lkmMeetAddFilterUpdate() {
    $('.lkm-exponent-add-wrapper').addClass('loading');
    $('.lkm-exponent-add-wrapper .message').remove();
    var filterData = {};
    if ($('.lkm-exponent-add-wrapper .filter-date-from').val() != '') {
        filterData['dateFrom'] = $('.lkm-exponent-add-wrapper .filter-date-from').val();
    }
    if ($('.lkm-exponent-add-wrapper .filter-date-to').val() != '') {
        filterData['dateTo'] = $('.lkm-exponent-add-wrapper .filter-date-to').val();
    }
    if ($('.lkm-exponent-add-wrapper .filter-count-from').val() != '') {
        filterData['countFrom'] = $('.lkm-exponent-add-wrapper .filter-count-from').val();
    }
    if ($('.lkm-exponent-add-wrapper .filter-count-to').val() != '') {
        filterData['countTo'] = $('.lkm-exponent-add-wrapper .filter-count-to').val();
    }
    for (var i = 0; i < $('.lkm-exponent-add-wrapper .manager-table-filter .form-checkbox').length; i++) {
        var curInput = $('.lkm-exponent-add-wrapper .manager-table-filter .form-checkbox').eq(i).find('input');
        if (curInput.prop('checked')) {
            filterData[curInput.attr('name')] = 'Y';
        }
    }
    for (var i = 0; i < $('.lkm-exponent-add-wrapper .manager-table-filter .form-select').length; i++) {
        var curSelect = $('.lkm-exponent-add-wrapper .manager-table-filter .form-select').find('select');
        if (curSelect.val() !== null) {
            filterData[curSelect.attr('name')] = curSelect.val();
        }
    }
    if ($('.lkm-exponent-add-wrapper .support-search-window-input input').val() != '') {
        filterData[$('.lkm-exponent-add-wrapper .support-search-window-input input').attr('name')] = $('.lkm-exponent-add-wrapper .support-search-window-input input').val();
    }
    if ($('.lkm-exponent-add-wrapper .meet-add-company-wrapper .pager a.active').length > 0) {
        filterData['page'] = 'page-' + $('.lkm-exponent-add-wrapper .meet-add-company-wrapper .pager a.active').html();
    }
    $.ajax({
        type: 'POST',
        url: $('.lkm-exponent-add-ctrl').attr('data-url'),
        dataType: 'json',
        data: filterData,
        cache: false,
        success: function(data) {
            if (data.status) {
                $('.lkm-exponent-add-exponent').remove();
                $('.lkm-exponent-add-wrapper').removeClass('loading');
                $('.lkm-exponent-add-wrapper .message').remove();
                lkmMeetAddData = data;
                var newHTML = '';
                var inputName = $('.lkm-exponent-add-list').attr('data-inputname');
                $('.lkm-exponent-add-company-count-current').html(data.data.countOnPage);
                $('.lkm-exponent-add-company-count-all').html(data.data.countAll);
                for (var i = 0; i < data.data.list.length; i++) {
                    var curCompany = data.data.list[i];
                    newHTML +=  '<label class="lkm-exponent-add-exponent">';
                    newHTML +=  '<input type="radio" name="' + inputName + '" value="' + curCompany.ID + '" />';
                    newHTML +=  '<div class="lkm-exponent-add-exponent-radiobox"></div>';
                    newHTML +=  '<div class="lkm-exponent-add-exponent-info">' +
                                    '<div class="lkm-exponent-add-exponent-info-inner">' +
                                        '<div class="lkm-exponent-add-exponent-logo"><div class="lkm-exponent-add-exponent-logo-inner"><img src="' + curCompany.LOGOTYPE_SRC + '" alt="" /></div></div>' +
                                        '<div class="lkm-exponent-add-exponent-text">' +
                                            '<div class="manager-table-participant-name"><a href="' + curCompany.LINK + '" class="window-link"><span>' + curCompany.NAME + '</span></a><a href="' + curCompany.LINK_DETAIL + '"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.41797 7.04173C5.65059 7.35272 5.94737 7.61004 6.28818 7.79624C6.629 7.98244 7.00587 8.09317 7.39324 8.12091C7.78061 8.14865 8.16941 8.09276 8.53328 7.95703C8.89715 7.82129 9.22757 7.60889 9.50214 7.33423L11.1271 5.70923C11.6205 5.19843 11.8935 4.5143 11.8873 3.80418C11.8811 3.09407 11.5963 2.41478 11.0941 1.91264C10.592 1.41049 9.91271 1.12566 9.2026 1.11949C8.49248 1.11332 7.80835 1.3863 7.29755 1.87965L6.36589 2.8059" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.58271 5.95829C7.35009 5.64731 7.05331 5.38999 6.71249 5.20378C6.37168 5.01758 5.99481 4.90685 5.60744 4.87911C5.22007 4.85137 4.83127 4.90726 4.4674 5.04299C4.10353 5.17873 3.77311 5.39113 3.49854 5.66579L1.87354 7.29079C1.3802 7.80159 1.10721 8.48572 1.11338 9.19584C1.11955 9.90595 1.40439 10.5852 1.90653 11.0874C2.40868 11.5895 3.08796 11.8744 3.79808 11.8805C4.5082 11.8867 5.19233 11.6137 5.70313 11.1204L6.62938 10.1941" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>' +
                                            '<div class="manager-table-participant-text">';
                    if (curCompany.BRANDS !== undefined) {
                        newHTML +=              '<span>' + curCompany.BRANDS + '</span>';
                    }
                    if (curCompany.COUNTRIES !== undefined) {
                        newHTML +=              '<div class="manager-table-participant-text-countries">';
                        for (var j = 0; j < curCompany.COUNTRIES.length; j++) {
                            newHTML +=              '<div class="catalogue-item-country-item">';
                            newHTML +=                  '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.COUNTRIES[j].FLAG_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.COUNTRIES[j].NAME + '</span></span>';
                            newHTML +=                  '<span class="catalogue-item-country-item-title">' + curCompany.COUNTRIES[j].NAME + '</span>';
                            if (curCompany.COUNTRIES[j].REGIONS !== undefined) {
                                for (var k = 0; k < curCompany.COUNTRIES[j].REGIONS.length; k++) {
                                    if (k == 0) {
                                        newHTML +=      '<span class="catalogue-item-country-sep"></span>';
                                    }
                                    newHTML +=          '<span class="catalogue-item-country-region">' + curCompany.COUNTRIES[j].REGIONS[k].SHORT + '<span class="catalogue-item-country-region-title">' + curCompany.COUNTRIES[j].REGIONS[k].FULL + '</span></span>';
                                }
                            }
                            newHTML +=              '</div>';
                        }
                        newHTML +=              '</div>';
                    }
                    newHTML +=              '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

                    newHTML +=  '<div class="lkm-exponent-add-exponent-source"><div class="meet-add-company-title-mobile">Сырье</div>';
                    if (curCompany.SOURCE !== undefined) {
                        for (var j = 0; j < curCompany.SOURCE.length; j++) {
                            newHTML += '<span class="catalogue-item-country-item-hint">' + curCompany.SOURCE[j].LETTER + '<span class="catalogue-item-country-item-hint-title">' + curCompany.SOURCE[j].NAME + '</span></span>';
                        }
                    }
                    newHTML +=  '</div>';

                    newHTML +=  '<div class="lkm-exponent-add-exponent-category"><div class="meet-add-company-title-mobile">Категории</div>';
                    if (curCompany.CATEGORIES !== undefined) {
                        for (var j = 0; j < curCompany.CATEGORIES.length; j++) {
                            newHTML += '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.CATEGORIES[j].ICON_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.CATEGORIES[j].NAME + '</span></span>';
                        }
                    }
                    newHTML +=  '</div>';

                    newHTML +=  '</label>';
                }
                $('.lkm-exponent-add-list').append(newHTML);

                var pagerHTML = '';
                if (data.data.pageCount > 1) {
                    pagerHTML += '<div class="pager"><a href="#" class="pager-prev"></a>';
                    var newCurPage = data.data.page.replace('page-', '');
                    for (var i = 0; i < data.data.pageCount; i++) {
                        var curPage = i + 1;
                        if (curPage == newCurPage) {
                            pagerHTML += '<a href="#" class="active">' + curPage + '</a>';
                        } else {
                            pagerHTML += '<a href="#">' + curPage + '</a>';
                        }
                    }
                    pagerHTML += '<a href="#" class="pager-next"></a></div>';
                }
                $('.lkm-exponent-add-wrapper .pager').html(pagerHTML);
            } else {
                $('.lkm-exponent-add-wrapper').removeClass('loading');
                $('.lkm-exponent-add-wrapper .message').remove();
                $('.lkm-exponent-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
            }
        },
        error: function() {
            $('.lkm-exponent-add-wrapper').removeClass('loading');
            $('.lkm-exponent-add-wrapper .message').remove();
            $('.lkm-exponent-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
        }
    });
}

function lkmMeetAddFilterUpdateVisitor() {
    $('.lkm-visitor-add-wrapper').addClass('loading');
    $('.lkm-visitor-add-wrapper .message').remove();
    var filterData = {};
    if ($('.lkm-visitor-add-wrapper .filter-date-from').val() != '') {
        filterData['dateFrom'] = $('.lkm-visitor-add-wrapper .filter-date-from').val();
    }
    if ($('.lkm-visitor-add-wrapper .filter-date-to').val() != '') {
        filterData['dateTo'] = $('.lkm-visitor-add-wrapper .filter-date-to').val();
    }
    if ($('.lkm-visitor-add-wrapper .filter-count-from').val() != '') {
        filterData['countFrom'] = $('.lkm-visitor-add-wrapper .filter-count-from').val();
    }
    if ($('.lkm-visitor-add-wrapper .filter-count-to').val() != '') {
        filterData['countTo'] = $('.lkm-visitor-add-wrapper .filter-count-to').val();
    }
    for (var i = 0; i < $('.lkm-visitor-add-wrapper .manager-table-filter .form-checkbox').length; i++) {
        var curInput = $('.lkm-visitor-add-wrapper .manager-table-filter .form-checkbox').eq(i).find('input');
        if (curInput.prop('checked')) {
            filterData[curInput.attr('name')] = 'Y';
        }
    }
    for (var i = 0; i < $('.lkm-visitor-add-wrapper .manager-table-filter .form-select').length; i++) {
        var curSelect = $('.lkm-visitor-add-wrapper .manager-table-filter .form-select').find('select');
        if (curSelect.val() !== null) {
            filterData[curSelect.attr('name')] = curSelect.val();
        }
    }
    if ($('.lkm-visitor-add-wrapper .support-search-window-input input').val() != '') {
        filterData[$('.lkm-visitor-add-wrapper .support-search-window-input input').attr('name')] = $('.lkm-visitor-add-wrapper .support-search-window-input input').val();
    }
    if ($('.lkm-visitor-add-wrapper .meet-add-company-wrapper .pager a.active').length > 0) {
        filterData['page'] = 'page-' + $('.lkm-visitor-add-wrapper .meet-add-company-wrapper .pager a.active').html();
    }
    $.ajax({
        type: 'POST',
        url: $('.lkm-visitor-add-ctrl').attr('data-url'),
        dataType: 'json',
        data: filterData,
        cache: false,
        success: function(data) {
            if (data.status) {
                $('.lkm-visitor-add-visitor').remove();
                $('.lkm-visitor-add-wrapper').removeClass('loading');
                $('.lkm-visitor-add-wrapper .message').remove();
                lkmMeetAddDataVisitor = data;
                var newHTML = '';
                var inputName = $('.lkm-visitor-add-list').attr('data-inputname');
                $('.lkm-visitor-add-company-count-current').html(data.data.countOnPage);
                $('.lkm-visitor-add-company-count-all').html(data.data.countAll);
                for (var i = 0; i < data.data.list.length; i++) {
                    var curCompany = data.data.list[i];
                    newHTML +=  '<label class="lkm-visitor-add-visitor">';
                    newHTML +=  '<input type="radio" name="' + inputName + '" value="' + curCompany.ID + '" />';
                    newHTML +=  '<div class="lkm-visitor-add-visitor-radiobox"></div>';
                    newHTML +=  '<div class="lkm-visitor-add-visitor-info manager-table-cell-company-type-' + curCompany.TYPE + '">' +
                                    '<div class="manager-table-company-name"><a href="' + curCompany.LINK + '" class="window-link"><span>' + curCompany.NAME + '</span></a><a href="' + curCompany.LINK_DETAIL + '"><svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.41797 7.04173C5.65059 7.35272 5.94737 7.61004 6.28818 7.79624C6.629 7.98244 7.00587 8.09317 7.39324 8.12091C7.78061 8.14865 8.16941 8.09276 8.53328 7.95703C8.89715 7.82129 9.22757 7.60889 9.50214 7.33423L11.1271 5.70923C11.6205 5.19843 11.8935 4.5143 11.8873 3.80418C11.8811 3.09407 11.5963 2.41478 11.0941 1.91264C10.592 1.41049 9.91271 1.12566 9.2026 1.11949C8.49248 1.11332 7.80835 1.3863 7.29755 1.87965L6.36589 2.8059" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.58271 5.95829C7.35009 5.64731 7.05331 5.38999 6.71249 5.20378C6.37168 5.01758 5.99481 4.90685 5.60744 4.87911C5.22007 4.85137 4.83127 4.90726 4.4674 5.04299C4.10353 5.17873 3.77311 5.39113 3.49854 5.66579L1.87354 7.29079C1.3802 7.80159 1.10721 8.48572 1.11338 9.19584C1.11955 9.90595 1.40439 10.5852 1.90653 11.0874C2.40868 11.5895 3.08796 11.8744 3.79808 11.8805C4.5082 11.8867 5.19233 11.6137 5.70313 11.1204L6.62938 10.1941" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>' +
                                    '<div class="manager-table-company-text">';
                    if (curCompany.BRANDS !== undefined) {
                        newHTML +=      '<span>' + curCompany.BRANDS + '</span>';
                    }
                    newHTML +=      '</div>' +
                                '</div>';

                    newHTML +=  '<div class="lkm-visitor-add-visitor-city">' + curCompany.CITY + '</div>';
                    newHTML +=  '<div class="lkm-visitor-add-visitor-delegate">' +
                                    '<div class="manager-table-delegate-name">' + curCompany.DATA.NAME + '</div>' +
                                    '<div class="manager-table-delegate-phone">' + curCompany.DATA.VALUE + '</div>' +
                                '</div>';
                    newHTML +=  '<div class="lkm-visitor-add-visitor-delegate">' +
                                    '<div class="manager-table-delegate-name">' + curCompany.DELEGATE.NAME + '</div>' +
                                    '<div class="manager-table-delegate-phone">' + curCompany.DELEGATE.PHONE + '</div>' +
                                '</div>';

                    newHTML +=  '</label>';
                }
                $('.lkm-visitor-add-list').append(newHTML);

                var pagerHTML = '';
                if (data.data.pageCount > 1) {
                    pagerHTML += '<div class="pager"><a href="#" class="pager-prev"></a>';
                    var newCurPage = data.data.page.replace('page-', '');
                    for (var i = 0; i < data.data.pageCount; i++) {
                        var curPage = i + 1;
                        if (curPage == newCurPage) {
                            pagerHTML += '<a href="#" class="active">' + curPage + '</a>';
                        } else {
                            pagerHTML += '<a href="#">' + curPage + '</a>';
                        }
                    }
                    pagerHTML += '<a href="#" class="pager-next"></a></div>';
                }
                $('.lkm-visitor-add-wrapper .pager').html(pagerHTML);
            } else {
                $('.lkm-visitor-add-wrapper').removeClass('loading');
                $('.lkm-visitor-add-wrapper .message').remove();
                $('.lkm-visitor-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
            }
        },
        error: function() {
            $('.lkm-visitor-add-wrapper').removeClass('loading');
            $('.lkm-visitor-add-wrapper .message').remove();
            $('.lkm-visitor-add-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
        }
    });
}

function lkmMeetAddDayUpdate() {
    if ($('.meet-card-data-item-exponent input').val() != '' && $('.meet-card-data-item-visitor input').val() != '') {
        $('.meet-add-step-1').removeClass('meet-add-step-1-empty');
        $('.meet-add-step-2').addClass('visible');
        $('.meet-add-form').addClass('loading');
        var filterData = {};
        filterData['exponentID'] = $('.meet-card-data-item-exponent input').val();
        filterData['visitorID'] = $('.meet-card-data-item-visitor input').val();
        $.ajax({
            type: 'POST',
            url: $('.meet-add-step-2').attr('data-url'),
            dataType: 'html',
            data: filterData,
            cache: false,
            success: function(html) {
                $('.meet-add-form').removeClass('loading');
                $('.meet-add-form .message').remove();
                $('.meet-add-step-2').html(html)
            },
            error: function() {
                $('.meet-add-form').removeClass('loading');
                $('.meet-add-form .message').remove();
                $('.meet-add-form').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
            }
        });
    }
}