(function ($) {
    "use strict";
    $.fn.cookieWall = function (options) {
        const params = $.extend({
            id: '',
            cookie: {
                name: 'nest-documentation',
                days: 15,
                path: '/'
            },
            website: {
                name: '',
                url: ''
            },
            logo: {
                url: '',
                width: '',
                align: 'left',
                margin: '0'
            },
            modal: {
                hrColor: '#b3b3b3',
                fontColor: '#3c3c3c',
                backgroundColor: '#fafafa'
            },
            button: {
                acceptColor: '#0a9919',
                acceptColorHover: '#076212',
                refuseColor: '#a40606',
                refuseColorHover: '#7b0505',
            },
            tag: {
                cookiePrefix: '',
                cookieDomain: '',
                cookieExpires: '',
                cookieUpdate: ''
            },
            lang: 'en'
        }, options);
        const content = {
            title: {
                en: `Data collection policy`
            },
            message: {
                en: `<b>Cookie files are used to analyze ${params.website.url} website traffic by Google Analytics service.</b><br><br>Information about your browsing and use of the website is transmitted ${params.website.name.length > 0 ? ' to ' + params.website.name : ''} and will be analyzed <b>anonymously</b> to improve services. The data will be transmitted to the United States and are subject to <a href="https://policies.google.com/privacy?hl=en-US" target="_blank" title="Google privacy policy" style="color:inherit;font-weight:bold;">the Google privacy policy</a>.`
            },
            titleList: {
                en: `List of cookies`
            },
            list: {
                en: `<ul><li><b>_ga</b>: Used to distinguish users (expires after 2 years)</li><li><b>_gid</b>: Used to distinguish users (expires after 24 hours)</li><li><b>_gat</b>: Used to limit request rate (expires after 1 minute)</li></ul>`
            },
            conservation: {
                en: `Your consent is kept for <b>${params.cookie.days}</b> day${params.cookie.days > 1 ? 's' : ''}. You can reset your consent by deleting the <b>${params.cookie.name}</b> cookie from your browser data.`
            },
            accepted: {
                en: `Accept`
            },
            refused: {
                en: `No thanks`
            }
        };
        const tag_params = {}
        for (const property in params.tag) {
            if (params.tag[property] !== '') {
                tag_params[property.replace(/([A-Z])/g, "-$1").toLowerCase()] = params.tag[property];
            }
        }
        const tag = '<script async src="https://www.googletagmanager.com/gtag/js?id=' + params.id + '"></script>' +
            '<script>' +
            'window.dataLayer = window.dataLayer || [];' +
            'function gtag(){dataLayer.push(arguments);}' +
            'gtag(\'js\', new Date());' +
            'gtag(\'config\', \'' + params.id + '\', ' + JSON.stringify(tag_params).replace(/"/g, '\'') + ');' +
            '</script>';

        const logo = params.logo.url != '' ? `<div class="logo"><img src="${params.logo.url}" alt="Logo"></div>` : '';
        const modal = '' +
            '<div class="ck-modal">' +
            '<div class="ck-window">' +
            '<div class="ck-content">' +
            '<span>' + logo + content.title[params.lang] + '</span>' +
            '<hr>' +
            '<p>' + content.message[params.lang] + '</p>' +
            '<button class="accordion">' + content.titleList[params.lang] + '</button>' +
            '<div class="panel">' + content.list[params.lang] + '</div>' +
            '<p>' + content.conservation[params.lang] + '</p>' +
            '</div> ' +
            '<div class="ck-choise">' +
            '<a class="btn-refuse" href="#">' + content.refused[params.lang] + '</a>' +
            '<a class="btn-accept" href="#">' + content.accepted[params.lang] + '</a>' +
            '</div> ' +
            '</div> ' +
            '</div>' +
            '<style>' +
            '.ck-modal{display:flex;align-items:center;justify-content:center;position:fixed;width:100%;height:100%;top:0;left:0;background-color:rgba(0,0,0,.7);z-index:999;overflow-y:auto;}' +
            '.ck-window{font-family:"Helvetica Neue", Helvetica, Arial, sans-serif;position:absolute;border-radius:5px;background-color:' + params.modal.backgroundColor + ';box-shadow:3px 3px 10px rgba(0,0,0,.5);}' +
            '.ck-content{padding:15px;color:' + params.modal.fontColor + ';}' +
            `.ck-content .logo{width:100%;text-align:${params.logo.align};}` +
            `.ck-content .logo img{width:${params.logo.width};margin:${params.logo.margin};}` +
            '.ck-content span{font-weight:300;}' +
            '.ck-content b{font-weight:400;}' +
            '.ck-content ul{margin:0;padding:0 20px 8px;}' +
            '.ck-content p, .ck-content li{font-weight:200;margin:0.9em 0 1.0em!important;}' +
            '.ck-content hr{height:1px;margin:15px 0;border:0;border-top:1px solid ' + params.modal.hrColor + ';}' +
            '.ck-content .accordion{background-color:#e2e2e2;color:#444;font-size:1em;font-weight:600;cursor:pointer;padding:10px;width:100%;text-align:left;border:none;outline:none;transition:background-color 0.4s ease-in-out;}' +
            '.ck-content .accordion:after{content:\'\\002B\';color:#777;font-weight:bold;float:right;margin-left:5px;}' +
            '.ck-content .accordion.active:after{content:\'\\002D\'}' +
            '.ck-content .accordion.active, .ck-content .accordion:hover{background-color:#d7d7d7;}' +
            '.ck-content .panel{height:0;padding:0 5px;background-color:transparent;border:1px solid #d7d7d7;visibility:hidden;}' +
            '.ck-choise{display:flex;align-items:stretch;justify-content:center;}' +
            '.ck-choise .btn-refuse, .ck-choise .btn-accept{display:block;width:50%;font-size:0.9em;font-weight:bold;text-transform:uppercase;text-decoration:none;padding:10px 5px;text-align:center;transition:background-color .5s ease;}' +
            '.ck-choise .btn-refuse{color:#fff;background-color:' + params.button.refuseColor + ';border-radius:0 0 0 3px;}' +
            '.ck-choise .btn-refuse:hover, .ck-choise .btn-refuse:focus{color:#fff;background-color:' + params.button.refuseColorHover + ';text-decoration:none;}' +
            '.ck-choise .btn-accept{color:#fff;background-color:' + params.button.acceptColor + ';border-radius:0 0 3px 0;}' +
            '.ck-choise .btn-accept:hover, .ck-choise .btn-accept:focus{color:#fff;background-color:' + params.button.acceptColorHover + ';text-decoration:none;}' +
            '@media (max-width: 576px) { .ck-modal .ck-window{width:90%;}.ck-content p, .ck-content li{font-size:0.9em;}.ck-content span{font-size:1.3em;}.ck-content .logo{display:none;} }' +
            '@media (min-width: 576px) { .ck-modal .ck-window{width:70%;}.ck-content p, .ck-content li{font-size:1.0em;}.ck-content span{font-size:1.4em;}.ck-content .logo{display:block;} }' +
            '@media (min-width: 769px) { .ck-modal .ck-window{width:50%;}.ck-content p, .ck-content li{font-size:1.1em;}.ck-content span{font-size:1.5em;} }' +
            '</style>';
        let h;
        function init() {
            if (params.id != '') {
                let c = getCookie();
                if (c == null || (c != 0 && c != 1)) {
                    displayModal();
                } else if (c == 1) {
                    addTag();
                }
            } else {
                console.log('No ID defined in the cookieWall params.');
            }
        }
        function displayModal() {
            $('body').prepend(modal);
            h = $('.ck-modal .panel ul').outerHeight(true);
            $('body').on('mousedown', '.ck-modal .ck-choise a', setChoise);
            $('body').on('click', '.accordion', function () {
                this.classList.toggle('active');
                let panel = $(this).parent().find('.panel');
                if (panel.css('visibility') === 'visible') {
                    $(panel).animate({
                        height: 0
                    }, 200, function () {
                        panel.css('visibility', 'hidden');
                    });
                } else {
                    panel.css('visibility', 'visible');
                    $(panel).animate({
                        height: h
                    }, 200);
                }
            });
            $(window).on('resize', function (e) {
                h = $('.ck-modal .panel ul').outerHeight(true);
                let panel = $('.ck-modal .panel');
                if (panel.css('visibility') === 'visible') {
                    panel.css('height', h);
                }
            });
        }
        function setChoise(e) {
            e.preventDefault();
            let r = $(this).attr('class').substring(4, $(this).attr('class').length);
            if (r == 'accept') {
                setCookie(1);
                addTag();
            } else {
                setCookie(0);
            }
            $('body .ck-modal').remove();
            $('body').off('mousedown', '.ck-modal .ck-choise a');
            $('body').off('click', '.accordion');
            $(window).off('resize');
        }
        function addTag() {
            $('body').append(tag);
        }
        function getCookie() {
            let t = document.cookie.split('; ');
            let f = t.find(row => row.startsWith(params.cookie.name + '='));
            if (typeof f != 'undefined') {
                return f.split('=')[1];
            }
            return null;
        }
        function setCookie(value) {
            let a = params.cookie.days * 86400;
            document.cookie = params.cookie.name + '=' + value + ';max-age=' + a + ';path=' + params.cookie.path + ';SameSite=None;Secure';
        }
        function removeCookie() {
            document.cookie = params.cookie.name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;SameSite=None;Secure'
        }
        init();
        return this;
    };
})(jQuery);
