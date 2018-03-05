/**
 * Created by web on 24.01.2018.
 */
$(document).ready(function () {
	$(".twentytwenty-container").twentytwenty({
        default_offset_pct: 0.3,
        before_label: 'До операции',
        after_label: 'После операции'
        });
    sideCorrectionBackground();

    var today = new Date();
    var tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    var dayTomorrow = tomorrow.getDate();
    var monthTomorrow = tomorrow.getMonth();

    if(today.getHours()>'6') {
        Day=dayTomorrow;
        Month = tomorrow.getMonth()+1;
        Year = tomorrow.getFullYear();
    }else {
        Day = today.getDate();
        Month =today.getMonth()+1;
        Year = today.getFullYear();
    }


    d = endAction();

    $('#countdown-3').timeTo({
        timeTo: new Date(new Date(Month+' '+ Day+' '+Year+' '+ '11' + ':59:59')),
        countdown: true,
        lang: 'ru',
        displayDays: 2,
        displayCaptions: true,
        fontSize: 48,
        captionSize: 14
    });

    $('.countdown-3').timeTo({
        timeTo: new Date(new Date(Month+' '+ Day+' '+Year+' '+ '11' + ':59:59')),
        countdown: true,
        lang: 'ru',
        displayDays: 2,
        displayCaptions: true,
        fontSize: 25,
        captionSize: 13
    });

    /*Контроль левого бекграунда*/
    $(window).resize(function () {
        sideCorrectionBackground();
    });



    /*Запрет одновременного показа*/

    /*    UIkit.toggle('#toggle-mobile-time', 'beforeshow', function () {
     alert('121212');
     });*/
    UIkit.util.on('#toggle-mobile-adres', 'beforeshow', function () {
        $(this).siblings('.mobile-menu-pop-up').attr('hidden','true');
    });

    UIkit.util.on('#toggle-mobile-time', 'beforeshow', function () {
        $(this).siblings('.mobile-menu-pop-up').attr('hidden','true');
    });

    UIkit.util.on('#toggle-mobile-contacts', 'beforeshow', function () {
        $(this).siblings('.mobile-menu-pop-up').attr('hidden','true');
    });


    $(window).scroll(function() {
        if ($(this).scrollTop()>=200) {
            // длительность анимации - 'slow'
            // тип анимации -  'linear'
            $('.mobile-menu, .top-navigation').fadeIn('slow','linear');
        }
        else {
            // длительность анимации - 'fast'
            // тип анимации -  'swing'
            $('.mobile-menu, .top-navigation').fadeOut('fast','swing');
        }
    });



    $(".mobile-menu-pop-up-close ").click(function() {
        $(this).closest('.mobile-menu-pop-up').attr('hidden','true');
    });

    /*Вставка названия кнопки из которой отправлена форма*/
    $(".getTtl").click(function() {
        $title = $(this).attr("ttl");
        $(".popup-form-bottom input[name*='target']").val($title);
    });

    $.each($("[type='tel']"), function(i,v){
        $(this).inputmask({"mask": $(this).attr("mask")})
    });

    /* Сокрытие и показ плейсхолдера в формах*/
    $('.popup-form-bottom input, .onConsult1 input, .lechenie-onConsult input').focus(function(){
        $(this).data('placeholder',$(this).attr('placeholder'))
        $(this).attr('placeholder','');
    });
    $('.popup-form-bottom input, .onConsult1 input, .lechenie-onConsult input').blur(function(){
        $(this).attr('placeholder',$(this).data('placeholder'));
    });

    function errMess(elem, mes) {
        atrrname=$(elem).attr('name');
        /*$(elem).parent().prev().text(mes).fadeIn();*/
        $(elem).siblings('.err-'+atrrname).text(mes).fadeIn();
    }
    function validate(fields) {
        $('.error').fadeOut();
        var CountError = 0;
        fields.each(function( index,element ) {
            valueInput=$(element).val();
            attrInputName=$(element).attr('name');
            if (valueInput=='' && !$(element).hasClass('myEmail') &&!$(element).hasClass('messages'))
            {errMess(element,'Поле не заполнено!')
                CountError++;
            }
            else if(attrInputName=='name' && valueInput.length>149){
                errMess(element,'Длинное имя!');
                CountError++;

            }
            else if (valueInput!='' && $(element).hasClass('myEmail')){
                var pattern = /.+@.+\..+/i;
                if (valueInput.search(pattern) != 0){
                    {errMess(element,'Некорректный E-mail!')
                        CountError++;
                    }
                }
            }
        });
        return CountError;
    }

    $('.onConsult, .onConsult1, .lechenie-onConsult ').submit(function (e) {
        fields = $(this).find("input");
        if (validate(fields)>0) {return false} else {
            var arr = [];
            fields.each(
                function( index,element ) {
                    attrInputName=$(element).attr('name');
                    valueInput=$(element).val();
                    switch (attrInputName) {
                        case 'name':
                            arr['name'] = valueInput;
                            break;
                        case 'phone':
                            arr['phone'] = valueInput;
                            break;
                        case 'email':
                            arr['email'] = valueInput;
                            break;
                        case 'mes':
                            arr['mes'] = valueInput;
                            break;
                        case 'target':
                            arr['target'] = valueInput;
                            break;
                    }
                });




            $.post("/mailer/mail.php", //Если ВСЕ ОК - Запросим сгенерированную форму без перезагрузки страницы
                {
                    name: arr['name'], //В качестве параметра передадим сумму (введенную в поле)
                    email: arr['email'],//$('#desc').val(),
                    phone:arr['phone'],
                    mess:arr['mes'],
                    target:arr['target'],
                },
                onAjaxSuccess //Функция, которая сработает если ВСЕ ОК
            );

            function onAjaxSuccess(data)
            {
                arr['mes'];
                $('#toggle-mobile-contacts').attr('hidden','true');
                UIkit.modal.dialog('<h2 class="uk-alert-primary uk-notification-message-success uk-text-center uk-padding"> '+data+' </h2>');
                ga('send','event','Форма лендинга Абдоминопластика живота','Успешная отправка', location.pathname);
                setTimeout(f_out, 5000);
            }
            return false
        }
        function f_out() { UIkit.modal('.uk-open').hide(); }
    });

    $(window).scroll(function() {
        if ($(this).scrollTop()>=200) {
            // длительность анимации - 'slow'
            // тип анимации -  'linear'
            $('.mobile-menu, .top-navigation').fadeIn('slow','linear');
        }
        else {
            // длительность анимации - 'fast'
            // тип анимации -  'swing'
            $('.mobile-menu, .top-navigation').fadeOut('fast','swing');
        }
    });

});


/*Вставка названия кнопки из которой отправлена форма*/
$(".getTtl").click(function () {
    $title = $(this).attr("ttl");
    $(".popup-form-bottom input[name*='target']").val($title);
});

function endAction() {
    var Xmas95 = new Date();
    var hours = Xmas95.getHours();
    /*console.log(hours*60*60);*/
    var minutes = Xmas95.getMinutes();
    /*console.log(minutes*60);*/
    var seconds = Xmas95.getSeconds();
    /*console.log(seconds);*/
    res = (hours * 60 * 60) + (minutes * 60) + seconds;
    return (86400 - res); // 23
}

function sideCorrectionBackground() {
    strLeft = (1920 - $('body').width()) / 4
    strRight = (1920 - $('body').width()) / 4
/*    console.log('левый бекграунд ' + strLeft);
    console.log('правый бекграунд ' + strLeft);*/
    /*$('.right-img').css('right',0-strLeft);*/
    $('.right-img').css('width', 227 - strLeft);
    $('.right2-img').css('width', (234 - (strLeft * 1.3)));
    $('.left-img').css('left', -285 - (strLeft*1.2));
    if (parseInt($('.right-img').css('width')) > 225) {
        $('.right-img').css('background-position-x', '100%');
        $('.right2-img').css('background-position-x', '100%');
    };
    /*$('.left-img').css('width',227-strLeft);*/
}


$(window).bind("load", function() {
    $(".twentytwenty-container").twentytwenty({
        default_offset_pct: 0.3,
        before_label: 'До операции',
        after_label: 'После операции'
    });
});
