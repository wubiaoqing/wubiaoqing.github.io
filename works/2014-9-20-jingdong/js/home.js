
// 图片轮播jquery插件,暂时命名为jquery.imgSlide.js
// 最后更新时间: 2014-9-20
// 作者: 池小林

// 参数说明：
//     imgList： 需要轮播的图片列表(Array)
//     previous: 需要绑定上一张图片的选择器(String)
//     next: 需要绑定下一张图片的选择器(String)
//     auto: 是否自动轮播(Boolean)
//     timeout: 自动轮播的时间间隔,单位为毫秒(Number)




; (function ($) {

    
    $.fn.imgSlide = function (option) {

        var list = [];
        var htmls = [];
        var img = '<a href="#"><img src="{src}" alt="img-carousel" id="{id}" style="display:none;"/></a>';
        var html = '';
        
        // var preimg = new Image();
        // if (preimg.complete) {
            
        // }
        // else {
        //     preimg.onload = function () {
                
        //     };
        // }


        var length = option.imgList.length;
        
        for (var i = 0; i < length; i++) {

            var id = 'img' + random();

            //preimg.src = option.imgList[i];

            var obj = {
                src: option.imgList[i],
                id: id
            };

            html = format(img, obj);
            htmls.push(html);
            list.push('#' + obj.id);
        }

        $(this).append(htmls.join(''));


        var index = 0;

        $(list[index])[0].style.display = 'block';
        $(list[index]).animate({ opacity: 1 },1000);
        var self = this;


        if(option.auto){
            if(isNaN(option.timeout)){
                var timeout = 5000;
            }
            else{
                var timeout = option.timeout;
            }
        
            var timeoutId = setInterval(function() {
                $(option.next).click();
            }, timeout);
        }

        var preTimeOut = null;

        $(option.previous).bind('click', function () {

            clearTimeout(preTimeOut);
            preTimeOut = setTimeout(function () {

                var $pre = $(list[index]);
                $pre.animate({ opacity: 0 },1000);
                $pre[0].style.display = 'none';
                

                if (index == 0) {
                    index = list.length;
                }
                index--;

                var $next = $(list[index]);

                $next[0].style.display = 'block';
                $next.animate({ opacity: 1 },1500);

            }, 300);


        });

        var nextTimeOut = null;

        $(option.next).bind('click', function () {

            clearTimeout(nextTimeOut);

            nextTimeOut = setTimeout(function () {

                var $pre = $(list[index]);
                $pre[0].style.display = 'none';
                $pre.animate({ opacity: 0 });

                if (index == list.length - 1) {
                    index = -1;
                }
                index++;

                
                var $next = $(list[index]);

                $next[0].style.display = 'block';
                $next.animate({ opacity: 1 },1500);

            } , 300);

        });
        


        //模板填充
        function format(s, obj) {
            var str = s;
            for (key in obj) {
                var reg = new RegExp('{' + key + '}', 'g');
                str = str.replace(reg, obj[key]);
            }

            return str;
        }


        //产生随机数
        function random(formater) {
            if (formater === undefined) {
                formater = 12;
            }

            //如果传入的是数字，则生成一个指定长度的格式字符串 'xxxxx...'
            if (typeof formater == 'number') {
                var size = formater + 1;
                if (size < 0) {
                    size = 0;
                }
                formater = [];
                formater.length = size;
                formater = formater.join('x');
            }

            return formater.replace(/x/g, function (c) {
                var r = Math.random() * 16 | 0;
                return r.toString(16);
            }).toUpperCase();
        }
    };
    
})(jQuery);

$('#a-carousel').remove();
$('#div-carousel-img').imgSlide({
    imgList: [
        './images/lunbo_3.png',
        './images/lunbo_4.png',
        './images/lunbo_5.png',
        './images/lunbo_7.png'
    ],
    auto: true,
    previous: '#div-pre',
    next: '#div-next',
    timeout: 5000
});