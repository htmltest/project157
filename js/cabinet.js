$(document).ready(function() {

    $('.side-menu').mCustomScrollbar({
        axis: 'y'
    });

    $('.dashboard-zone-dates-item a').click(function(e) {
        var curLi = $(this).parent();
        if (!curLi.hasClass('active')) {
            $('.dashboard-zone-dates-item.active').removeClass('active');
            curLi.addClass('active');
            var curIndex = $('.dashboard-zone-dates-item').index(curLi);
            $('.dashboard-zone-content.active').removeClass('active');
            $('.dashboard-zone-content').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('body').on('click', '.support-search-link', function(e) {
        $('html').addClass('support-search-open');
        $('.support-search-window-input input').trigger('focus');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.support-search').length == 0) {
            $('html').removeClass('support-search-open');
        }
    });

    $('body').on('click', '.card-item-menu-icon', function(e) {
        $(this).parent().parent().toggleClass('open');
        $('header').addClass('header-up');
    });

    $('.meets-content-header').click(function(e) {
        $(this).parent().toggleClass('open');
        $(this).parent().find('.dashboard-zone-list').slideToggle(300);
        e.preventDefault();
    });

    $('body').on('mouseover', '.manager-table-arrow-left', function(e) {
        $(this).parent().find('.manager-table-wrapper').mCustomScrollbar('stop').mCustomScrollbar('scrollTo', 'left');
    });

    $('body').on('mouseover', '.manager-table-arrow-right', function(e) {
        $(this).parent().find('.manager-table-wrapper').mCustomScrollbar('stop').mCustomScrollbar('scrollTo', 'right');
    });

    $('body').on('mouseover', '.manager-table-section', function(e) {
        var curBlock = $(this);
        $('.wrapper').append('<div class="manager-table-section-detail-window" style="left:' + curBlock.offset().left + 'px; top:' + curBlock.offset().top + 'px">' + curBlock.find('.manager-table-section-detail').html() + '</div>');
    });

    $('body').on('mouseout', '.manager-table-section', function(e) {
        $('.manager-table-section-detail-window').remove();
    });

    $('body').on('change', '.manager-table-head-checkbox input', function(e) {
        var curTable = $(this).parents().filter('.manager-table');
        if (curTable.find('.manager-table-head-checkbox input:checked').length == 1) {
            curTable.find('.manager-table-cell-checkbox input').prop('checked', true);
        } else {
            curTable.find('.manager-table-cell-checkbox input').prop('checked', false);
        }
    });

    $('body').on('change', '.manager-table-cell-checkbox input', function(e) {
        var curTable = $(this).parents().filter('.manager-table');
        if (curTable.find('.manager-table-cell-checkbox input:checked').length > 0) {
            curTable.find('.manager-table-head-checkbox input').prop('checked', true);
        } else {
            curTable.find('.manager-table-head-checkbox input').prop('checked', false);
        }
    });

    checkManagerTables();

    $('body').on('click', '.manager-table-filter-link', function() {
        $('html').toggleClass('manager-table-fitler-open');
    });

    $(document).click(function(e) {
        var isDatepicker = false;
        var curClass = $(e.target).attr('class');
        if ((curClass !== undefined && curClass.indexOf('datepicker') > -1) || $(e.target).parents().filter('[class^="datepicker"]').length > 0) {
            isDatepicker = true;
        }
        if ($(e.target).parents().filter('.manager-table-filter').length == 0 && !isDatepicker) {
            $('html').removeClass('manager-table-fitler-open');
        }
    });

    $('.manager-table-filter').each(function() {
        filterUpdate();
        $('.manager-table-filter .form-input-date input').each(function() {
            var myDatepicker = $(this).data('datepicker');
            if (myDatepicker) {
                myDatepicker.update('onSelect', function(formattedDate, date, inst) {
                    filterUpdate();
                });
            }
        });
    });

    $('body').on('change', '.manager-table-filter .form-checkbox input', function(e) {
        filterUpdate();
    });

    $('body').on('change', '.manager-table-filter .form-input-date input', function(e) {
        filterUpdate();
    });

    $('body').on('click', '.manager-table-filter-param span', function() {
        var curId = $(this).attr('data-id');
        var curField = $('.manager-table-filter-params-window *[data-id="' + curId + '"]');
        if (curField.parents().filter('.form-checkbox').length > 0) {
            curField.prop('checked', false);
            curField.trigger('change');
        }
        if (curField.hasClass('manager-table-filter-params-window-dates')) {
            curField.find('input').val('');
            curField.find('input').trigger('change');
        }
    });

    $('body').on('mouseover', '.manager-table-schedule .manager-table-row .manager-table-schedule-section', function() {
        var curCell = $(this);
        var curRow = curCell.parents().filter('.manager-table-row');
        var curTable = curCell.parents().filter('.manager-table-schedule');
        var curIndex = curRow.find('.manager-table-schedule-section').index(curCell);
        curTable.find('.manager-table-row').each(function() {
            $(this).find('.manager-table-schedule-section').eq(curIndex).addClass('hover');
        });
        curTable.find('.manager-table-head-schedule').eq(curIndex).addClass('hover');
    });

    $('body').on('click', '.support-search-link', function(e) {
        $('html').addClass('support-search-open');
        $('.support-search-window-input input').trigger('focus');
        e.preventDefault();
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.support-search').length == 0) {
            $('html').removeClass('support-search-open');
        }
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

    $('body').on('click', '.meet-add-step-ctrl-next a', function(e) {
        var curStep = $('.meet-add-step').index($('.meet-add-step.active'));
        var isValid = true;
        if (curStep == 0) {
            if ($('.meet-add-company input:checked').length == 0) {
                $('.meet-add-company-error').addClass('visible');
                $('html, body').animate({'scrollTop': 0});
                isValid = false;
            } else {
                $('.meet-add-company-error').removeClass('visible');
            }
        }
        if (curStep == 1) {
            if ($('.window-online-type input:checked').length == 0) {
                $('.window-online-type h3 .error').addClass('visible');
                isValid = false;
            } else {
                $('.window-online-type h3 .error').removeClass('visible');
            }
            if ($('.window-online-time .window-online-time-content.active input:checked').length == 0) {
                $('.window-online-time h3 .error').addClass('visible');
                isValid = false;
            } else {
                $('.window-online-time h3 .error').removeClass('visible');
            }
            if ($('.window-online-date input:checked').length == 0) {
                $('.window-online-date h3 .error').addClass('visible');
                isValid = false;
            } else {
                $('.window-online-date h3 .error').removeClass('visible');
            }
            if ($('.meet-add-content h3 .error.visible').length > 0) {
                $('html, body').animate({'scrollTop': $('.meet-add-content h3 .error.visible').eq(0).offset().top - $('header').height() - 50});
            }
        }
        if (isValid) {
            curStep++;
            $('.meet-add-step.active').removeClass('active').addClass('success');
            $('.meet-add-step').eq(curStep).addClass('active');
            $('.meet-add-content.active').removeClass('active');
            $('.meet-add-content').eq(curStep).addClass('active');
            $('html, body').animate({'scrollTop': 0});
            if (curStep == 1) {
                meetAddTimeUpdate();
            }
            if (curStep == 2) {
                meetAddConfirmUpdate();
            }
        }
        e.preventDefault();
    });

    $('.meet-add-step-ctrl-submit a').click(function(e) {
        meetAddConfirm();
        e.preventDefault();
    });

    $('.meet-add-step-ctrl-back a').click(function(e) {
        var curStep = $('.meet-add-step').index($('.meet-add-step.active'));
        curStep--;
        $('.meet-add-step.active').removeClass('active');
        $('.meet-add-step').eq(curStep).removeClass('success').addClass('active');
        $('.meet-add-content.active').removeClass('active');
        $('.meet-add-content').eq(curStep).addClass('active');
        $('html, body').animate({'scrollTop': 0});
        e.preventDefault();
    });

    $('body').on('change', '.window-online-date-list input', function(e) {
        var curIndex = $('.window-online-date-list input').index($('.window-online-date-list input:checked'));
        $('.window-online-time-content.active').removeClass('active');
        $('.window-online-time-content').eq(curIndex).addClass('active');
        $('.window-online-time-container input').prop('checked', false);
    });

    $('body').on('change', '.window-online-time-list input', function(e) {
        $('.window-online-time-error').removeClass('visible');
    });

    $('.meet-add-company-wrapper .manager-table-filter .form-input-date input').each(function() {
        var myDatepicker = $(this).data('datepicker');
        if (myDatepicker) {
            myDatepicker.update('onSelect', function(formattedDate, date, inst) {
                meetAddFilterUpdate();
            });
        }
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter .form-checkbox input', function(e) {
        meetAddFilterUpdate();
    });

    $('body').on('change', '.meet-add-company-wrapper .manager-table-filter .form-input-date input', function(e) {
        meetAddFilterUpdate();
    });

    $('.meet-add-company-wrapper .support-search-window form').each(function() {
        var curForm = $(this);
        var validator = curForm.validate();
        validator.destroy();
        curForm.validate({
            ignore: '',
            submitHandler: function(form) {
                meetAddFilterUpdate();
            }
        });
    });

    $('body').on('click', '.meet-add-company-wrapper .pager a', function(e) {
        var curLink = $(this);
        if (!curLink.hasClass('active')) {
            if (!(curLink.hasClass('pager-prev') && $('.meet-add-company-wrapper .pager-prev').next().hasClass('active')) && !(curLink.hasClass('pager-next') && $('.meet-add-company-wrapper .pager-next').prev().hasClass('active'))) {
                if (!(curLink.hasClass('pager-prev')) && !(curLink.hasClass('pager-next'))) {
                    $('.meet-add-company-wrapper .pager a.active').removeClass('active');
                    curLink.addClass('active');
                } else if (curLink.hasClass('pager-prev')) {
                    var curIndex = $('.meet-add-company-wrapper .pager a').index($('.meet-add-company-wrapper .pager a.active'));
                    $('.meet-add-company-wrapper .pager a.active').removeClass('active');
                    $('.meet-add-company-wrapper .pager a').eq(curIndex - 1).addClass('active');
                } else {
                    var curIndex = $('.meet-add-company-wrapper .pager a').index($('.meet-add-company-wrapper .pager a.active'));
                    $('.meet-add-company-wrapper .pager a.active').removeClass('active');
                    $('.meet-add-company-wrapper .pager a').eq(curIndex + 1).addClass('active');
                }
                meetAddFilterUpdate();
                $('html, body').animate({'scrollTop': 0});
            }
        }
        e.preventDefault();
    });

    if ($('.meet-add-company-wrapper').length > 0) {
        meetAddFilterUpdate();
    }

    $('body').on('change', '.meet-add-company input', function() {
        $('.meet-add-company-error').removeClass('visible');
    });

    $('body').on('click', '.manager-table-filter-params-window-title', function(e) {
        $(this).parent().toggleClass('open');
    });

    $('body').on('click', '.support-open-form a', function(e) {
        $(this).parent().parent().find('.support-form').addClass('visible');
        $(this).parent().parent().find('.support-open-form').hide();
        e.preventDefault();
    });

    $('body').on('mouseover', '.manager-table-hint', function(e) {
        $('body .manager-table-hint-window-show').remove();
        $('body').append('<div class="manager-table-hint-window-show" style="left:' + $(this).offset().left + 'px; top:' + $(this).offset().top + 'px"><div class="manager-table-hint-window-show-inner">' + $(this).find('.manager-table-hint-window').html() + '</div></div>');
        e.preventDefault();
    });

    $('body').on('mouseout', '.manager-table-hint', function(e) {
        $('body .manager-table-hint-window-show').remove();
        e.preventDefault();
    });

});

function meetAddFilterUpdate() {
    $('.meet-add-content.active .meet-add-step-ctrl').removeClass('visible');
    $('.meet-add-company').remove();
    $('.meet-add-company-wrapper').addClass('loading');
    $('.meet-add-company-wrapper .message').remove();
    var filterData = {};
    if ($('.filter-date-from').val() != '') {
        filterData['dateFrom'] = $('.filter-date-from').val();
    }
    if ($('.filter-date-to').val() != '') {
        filterData['dateTo'] = $('.filter-date-to').val();
    }
    for (var i = 0; i < $('.manager-table-filter .form-checkbox').length; i++) {
        var curInput = $('.manager-table-filter .form-checkbox').eq(i).find('input');
        if (curInput.prop('checked')) {
            filterData[curInput.attr('name')] = 'Y';
        }
    }
    if ($('.support-search-window-input input').val() != '') {
        filterData[$('.support-search-window-input input').attr('name')] = $('.support-search-window-input input').val();
    }
    if ($('.meet-add-company-wrapper .pager a.active').length > 0) {
        filterData['page'] = 'page-' + $('.meet-add-company-wrapper .pager a.active').html();
    }
    $.ajax({
        type: 'POST',
        url: $('.meet-add-ctrl').attr('data-url'),
        dataType: 'json',
        data: filterData,
        cache: false,
        success: function(data) {
            if (data.status) {
                $('.meet-add-company-wrapper').removeClass('loading');
                $('.meet-add-company-wrapper .message').remove();
                var newHTML = '';
                var inputName = $('.meet-add-companies').attr('data-inputname');
                for (var i = 0; i < data.data.list.length; i++) {
                    var curCompany = data.data.list[i];
                    newHTML +=  '<label class="meet-add-company">';
                    newHTML +=  '<input type="radio" name="' + inputName + '" value="' + curCompany.ID + '" />';
                    newHTML +=  '<div class="meet-add-company-radiobox"></div>';
                    newHTML +=  '<div class="meet-add-company-info">' +
                                    '<div class="meet-add-company-info-inner">' +
                                        '<div class="meet-add-company-logo"><div class="meet-add-company-logo-inner"><img src="' + curCompany.LOGOTYPE_SRC + '" alt="" /></div></div>' +
                                        '<div class="meet-add-company-text">' +
                                            '<div class="meet-add-company-title">' + curCompany.NAME + '</div>' +
                                            '<div class="meet-add-company-brands">' + curCompany.BRANDS + '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

                    newHTML +=  '<div class="meet-add-company-country"><div class="meet-add-company-title-mobile">Страна</div>';
                    if (curCompany.COUNTRIES !== undefined) {
                        for (var j = 0; j < curCompany.COUNTRIES.length; j++) {
                            newHTML +=  '<div class="catalogue-item-country-item">';
                            newHTML +=      '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.COUNTRIES[j].FLAG_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.COUNTRIES[j].NAME + '</span></span>';
                            newHTML +=      '<span class="catalogue-item-country-item-title">' + curCompany.COUNTRIES[j].NAME + '</span>';
                            if (curCompany.COUNTRIES[j].REGIONS !== undefined) {
                                for (var k = 0; k < curCompany.COUNTRIES[j].REGIONS.length; k++) {
                                    if (k == 0) {
                                        newHTML += '<span class="catalogue-item-country-sep"></span>';
                                    }
                                    newHTML += '<span class="catalogue-item-country-region">' + curCompany.COUNTRIES[j].REGIONS[k].SHORT + '<span class="catalogue-item-country-region-title">' + curCompany.COUNTRIES[j].REGIONS[k].FULL + '</span></span>';
                                }
                            }
                            newHTML +=  '</div>';
                        }
                    }
                    newHTML +=  '</div>';

                    newHTML +=  '<div class="meet-add-company-category"><div class="meet-add-company-title-mobile">Категории</div>';
                    if (curCompany.CATEGORIES !== undefined) {
                        for (var j = 0; j < curCompany.CATEGORIES.length; j++) {
                            newHTML += '<span class="catalogue-item-country-item-hint"><img src="' + curCompany.CATEGORIES[j].ICON_SRC + '" alt="" /><span class="catalogue-item-country-item-hint-title">' + curCompany.CATEGORIES[j].NAME + '</span></span>';
                        }
                    }
                    newHTML +=  '</div>';

                    newHTML +=  '<div class="meet-add-company-source"><div class="meet-add-company-title-mobile">Сырье</div>';
                    if (curCompany.SOURCE !== undefined) {
                        for (var j = 0; j < curCompany.SOURCE.length; j++) {
                            newHTML += '<div class="meet-add-company-source-item">' + curCompany.SOURCE[j].NAME + '</div>';
                        }
                    }
                    newHTML +=  '</div>';

                    newHTML +=  '<div class="meet-add-company-min"><div class="meet-add-company-title-mobile">Минимальный заказ</div>';
                    if (curCompany.ORDER_MIN !== undefined) {
                        newHTML += curCompany.ORDER_MIN;
                    }
                    newHTML +=  '</div>';

                    newHTML +=  '<div class="meet-add-company-props">';
                    if (curCompany.PROPS !== undefined) {
                        for (var j = 0; j < curCompany.PROPS.length; j++) {
                            newHTML +=  '<div class="meet-add-company-prop">';
                            newHTML +=      '<div class="meet-add-company-prop-icon">' + curCompany.PROPS[j].ICON + '</div>';
                            newHTML +=      '<div class="meet-add-company-prop-text">' + curCompany.PROPS[j].NAME + '</div>';
                            newHTML +=  '</div>';
                        }
                    }
                    newHTML +=  '</div>';
                    newHTML +=  '</label>';
                }
                $('.meet-add-companies').append(newHTML);

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
                $('.meet-add-company-wrapper .pager').html(pagerHTML);
            } else {
                $('.meet-add-company-wrapper').removeClass('loading');
                $('.meet-add-company-wrapper .message').remove();
                $('.meet-add-company-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
            }
        },
        error: function() {
            $('.meet-add-company-wrapper').removeClass('loading');
            $('.meet-add-company-wrapper .message').remove();
            $('.meet-add-company-wrapper').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
        }
    });
}

function meetAddTimeUpdate() {
    $('.meet-add-content.active .meet-add-step-ctrl').removeClass('visible');
    $('.meet-add-datetime').addClass('loading');
    $('.meet-add-datetime .message').remove();
    var filterData = {'company': $('.meet-add-company input:checked').val()};
    $.ajax({
        type: 'POST',
        url: $('.meet-add-datetime').attr('data-url'),
        dataType: 'html',
        data: filterData,
        cache: false,
        success: function(data) {
            $('.meet-add-datetime').html(data);
            $('.meet-add-datetime').removeClass('loading');
        },
        error: function() {
            $('.meet-add-datetime').removeClass('loading');
            $('.meet-add-datetime .message').remove();
            $('.meet-add-datetime').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
        }
    });
}

function meetAddConfirmUpdate() {
    var curCompany = $('.meet-add-company input:checked').parents().filter('.meet-add-company');
    $('.meet-add-confirm-company').html(curCompany.find('.meet-add-company-logo-inner').html() + curCompany.find('.meet-add-company-title').html());
    $('.meet-add-confirm-date').html($('.window-online-date-list input:checked').attr('data-name') + ' <span>' + $('.window-online-date-list input:checked').attr('data-day') + '</span>');
    $('.meet-add-confirm-time').html($('.window-online-time-list input:checked').attr('data-timefull'));
    $('.meet-add-confirm-type').html($('.window-online-type input:checked').parent().find('span').html());
}

function meetAddConfirm() {
    $('.meet-add-confirm').addClass('loading');
    $('.meet-add-confirm .message').remove();
    var filterData = {
                        'company': $('.meet-add-company input:checked').val(),
                        'date': $('.window-online-date-list input:checked').val(),
                        'time': $('.window-online-time-list input:checked').val(),
                        'type': $('.window-online-type input:checked').val()
    };
    $.ajax({
        type: 'POST',
        url: $('.meet-add-step-ctrl-submit a').attr('href'),
        dataType: 'json',
        data: filterData,
        cache: false,
        success: function(data) {
            if (data.status) {
                $('.meet-add-container').html('<div class="message message-success"><div class="message-title">Успешно</div><div class="message-text">' + data.message + '</div></div>');
            } else {
                $('.meet-add-confirm').removeClass('loading');
                $('.meet-add-confirm .message').remove();
                $('.meet-add-confirm').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">' + data.message + '</div></div>');
            }
        },
        error: function() {
            $('.meet-add-confirm').removeClass('loading');
            $('.meet-add-confirm .message').remove();
            $('.meet-add-confirm').append('<div class="message message-error"><div class="message-title">Ошибка</div><div class="message-text">Загрузка данных невозможна</div></div>');
        }
    });
}

$(window).on('load resize', function() {
    $('.manager-table-wrapper').each(function() {
        var curWrapper = $(this);
        curWrapper.find('.manager-table-cell').removeAttr('style');
        if ($(window).width() > 1169) {
            curWrapper.find('.manager-table-cell-participant').each(function() {
                $(this).find('.manager-table-participant-text').css({'display': 'inline'});
                $(this).css({'min-width': $(this).find('.manager-table-participant-text').width() + 30});
                $(this).find('.manager-table-participant-text').removeAttr('style');
            });
            curWrapper.mCustomScrollbar({
                axis: 'x',
                mouseWheel: {
                    enable: false
                },
                keyboard: {
                    enable: false
                },
                scrollInertia: 350,
                contentTouchScroll: false,
                callbacks: {
                    onInit: function() {
                        curWrapper.parent().find('.manager-table-arrow-left').removeClass('visible');
                        curWrapper.parent().find('.manager-table-arrow-right').addClass('visible');

                        var windowScroll = $(window).scrollTop();
                        var windowHeight = $(window).height();
                        curWrapper.parent().find('.manager-table-arrow-right .manager-table-arrow-right-inner').each(function() {
                            var curArrow = $(this);
                            var curParent = curArrow.parent();
                            var curDiff = 0;
                            if (curWrapper.parents().filter('.tabs-content').length > 0) {
                                curDiff = curWrapper.parents().filter('.tabs-content').offset().top;
                            }
                            if (curParent.offset().top - curDiff + 86 < windowScroll) {
                                curArrow.css({'top': windowScroll - (curParent.offset().top - curDiff)});
                                if (curArrow.offset().top - curDiff + curArrow.outerHeight() > curParent.offset().top - curDiff + curParent.outerHeight()) {
                                    curArrow.css({'top': curParent.outerHeight() - curArrow.outerHeight()});
                                }
                            } else {
                                curArrow.css({'top': 86});
                            }
                        });
                    },

                    whileScrolling: function() {
                        if (this.mcs.leftPct == 100) {
                            curWrapper.parent().find('.manager-table-arrow-right').removeClass('visible');
                        } else {
                            curWrapper.parent().find('.manager-table-arrow-right').addClass('visible');
                        }

                        if (this.mcs.leftPct == 0) {
                            curWrapper.parent().find('.manager-table-arrow-left').removeClass('visible');
                        } else {
                            curWrapper.parent().find('.manager-table-arrow-left').addClass('visible');

                        }

                        var windowScroll = $(window).scrollTop();
                        var windowHeight = $(window).height();

                        curWrapper.parent().find('.manager-table-arrow-right.visible .manager-table-arrow-right-inner').each(function() {
                            var curArrow = $(this);
                            var curParent = curArrow.parent();
                            var curDiff = 0;
                            if (curWrapper.parents().filter('.tabs-content').length > 0) {
                                curDiff = curWrapper.parents().filter('.tabs-content').offset().top;
                            }
                            if (curParent.offset().top - curDiff + 86 < windowScroll) {
                                curArrow.css({'top': windowScroll - (curParent.offset().top - curDiff)});
                                if (curArrow.offset().top - curDiff + curArrow.outerHeight() > curParent.offset().top - curDiff + curParent.outerHeight()) {
                                    curArrow.css({'top': curParent.outerHeight() - curArrow.outerHeight()});
                                }
                            } else {
                                curArrow.css({'top': 86});
                            }
                        });

                        curWrapper.parent().find('.manager-table-arrow-left.visible .manager-table-arrow-left-inner').each(function() {
                            var curArrow = $(this);
                            var curParent = curArrow.parent();
                            var curDiff = 0;
                            if (curWrapper.parents().filter('.tabs-content').length > 0) {
                                curDiff = curWrapper.parents().filter('.tabs-content').offset().top;
                            }
                            if (curParent.offset().top - curDiff + 86 < windowScroll) {
                                curArrow.css({'top': windowScroll - (curParent.offset().top - curDiff)});
                                if (curArrow.offset().top - curDiff + curArrow.outerHeight() > curParent.offset().top - curDiff + curParent.outerHeight()) {
                                    curArrow.css({'top': curParent.outerHeight() - curArrow.outerHeight()});
                                }
                            } else {
                                curArrow.css({'top': 86});
                            }
                        });
                    }
                }
            });
        } else {
            curWrapper.mCustomScrollbar('destroy');
        }
    });

    resizeManagerTables();
});

function resizeManagerTables() {
    $('.manager-table-container').each(function() {
        var curContainer = $(this);
        var newHTML = '';
        curContainer.find('.manager-table-head-fixed').each(function() {
            newHTML += '<div class="manager-table-head" style="height:' + $(this).outerHeight() + 'px">' + $(this).html() + '</div>';
        });
        curContainer.find('.manager-table-cell-fixed').each(function() {
            newHTML += '<div class="manager-table-cell manager-table-cell-action" style="width:' + $(this).outerWidth() + 'px; height:' + $(this).outerHeight() + 'px">' + $(this).html() + '</div>';
        });
        curContainer.find('.manager-table-fixed').html(newHTML);
    });
}

function checkManagerTables() {
    $('.manager-table').each(function() {
        var curTable = $(this);
        if (curTable.find('.manager-table-cell-checkbox input:checked').length > 0) {
            curTable.find('.manager-table-head-checkbox input').prop('checked', true);
        } else {
            curTable.find('.manager-table-head-checkbox input').prop('checked', false);
        }
    });
}

$(window).on('load resize scroll', function() {
    var windowScroll = $(window).scrollTop();
    var windowHeight = $(window).height();

    $('.manager-table-arrow-right .manager-table-arrow-right-inner').each(function() {
        var curArrow = $(this);
        var curParent = curArrow.parent();
        var curDiff = 0;
        if (curArrow.parents().filter('.tabs-content').length > 0) {
            curDiff = curArrow.parents().filter('.tabs-content').offset().top;
        }
        if (curParent.offset().top - curDiff + 86 < windowScroll) {
            curArrow.css({'top': windowScroll - (curParent.offset().top - curDiff)});
            if (curArrow.offset().top - curDiff + curArrow.outerHeight() > curParent.offset().top - curDiff + curParent.outerHeight()) {
                curArrow.css({'top': curParent.outerHeight() - curArrow.outerHeight()});
            }
        } else {
            curArrow.css({'top': 86});
        }
    });

    $('.manager-table-arrow-left .manager-table-arrow-left-inner').each(function() {
        var curArrow = $(this);
        var curParent = curArrow.parent();
        var curDiff = 0;
        if (curArrow.parents().filter('.tabs-content').length > 0) {
            curDiff = curArrow.parents().filter('.tabs-content').offset().top;
        }
        if (curParent.offset().top - curDiff + 86 < windowScroll) {
            curArrow.css({'top': windowScroll - (curParent.offset().top - curDiff)});
            if (curArrow.offset().top - curDiff + curArrow.outerHeight() > curParent.offset().top - curDiff + curParent.outerHeight()) {
                curArrow.css({'top': curParent.outerHeight() - curArrow.outerHeight()});
            }
        } else {
            curArrow.css({'top': 86});
        }
    });
});

function filterUpdate() {
    var newHTML = '';
    var id = -1;

    if ($('.manager-table-filter-params-window-dates').length == 1) {
        id++;
        $('.manager-table-filter-params-window-dates').attr('data-id', id);
        var datesText = '';
        if ($('.filter-date-from').val() != '') {
            datesText += 'с ' + $('.filter-date-from').val();
        }
        if ($('.filter-date-to').val() != '') {
            if (datesText != '') {
                datesText += ' ';
            }
            datesText += 'по ' + $('.filter-date-to').val();
        }
        if (datesText != '') {
            newHTML += '<div class="manager-table-filter-param">' + datesText + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
        }
        $('.manager-table-filter-params-window-dates .manager-table-filter-params-window-title .manager-table-filter-params-window-title-values').remove();
        $('.manager-table-filter-params-window-dates .manager-table-filter-params-window-title').append('<div class="manager-table-filter-params-window-title-values">' + datesText + '</div>');
    }

    var newText = '';
    for (var i = 0; i < $('.manager-table-filter .form-checkbox').length; i++) {
        var curInput = $('.manager-table-filter .form-checkbox').eq(i).find('input');
        id++;
        curInput.attr('data-id', id);
        if (curInput.prop('checked')) {
            newHTML += '<div class="manager-table-filter-param">' + curInput.parent().find('span').text() + '<span data-id="' + id + '"><svg width="7" height="7" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L4.5 4.5L8 1" stroke-width="1.2"/><path d="M8 8L4.5 4.5L1 8" stroke-width="1.2"/></svg></span></div>';
            if (newText != '') {
                newText += ', ';
            }
            newText += curInput.parent().find('span').text();
        }
    }
    $('.manager-table-filter-params-window-props .manager-table-filter-params-window-title .manager-table-filter-params-window-title-values').remove();
    $('.manager-table-filter-params-window-props .manager-table-filter-params-window-title').append('<div class="manager-table-filter-params-window-title-values">' + newText + '</div>');

    $('.manager-table-filter-params').html(newHTML);
}