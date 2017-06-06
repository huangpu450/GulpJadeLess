/*var result;
$(document).ready(function () {
    $.ajax({
        type: "get",        //type：(string)请求方式，POST或GET
        dataType: "json",    //dataType：(string)预期返回的数据类型。xml,html,json,text等
        url: "../../mocks/cityData.json",  //url：(string)发送请求的地址，可以是服务器页面也可以是WebService动作。
        async:false,
        success: function(data) {
            result = data;
            var hn =result["湖南省"];
            var cities= hn[0].city;
            for(var key in cities){
                alert(key+"->"+cities[key].name);
            }
        },
    })
    console.info(result.city)
})*/

var frxs = {

    // 选择城市JS
    ct_show:function () {
        $('.city-picker-dropdown').show();
    } ,
    ctInit:function(){
        $('.city-select-tab a').click(function() {
            $(this).addClass('active').siblings('a').removeClass('active');
            $('.city-select').hide().eq($(this).index()).show();
        });
        $('.city-select dd>a').click(function() {
            $(this).addClass('active').siblings('a').removeClass('active');
        });
        $('.province dd a').click(function() {
            $('.province').hide();
            $('.city').show();
            $('.city-select-tab a:last').addClass('active').siblings('a').removeClass('active');
        });
        $('.city dd a').click(function() {
            $('.city-picker-dropdown').hide();
        });
    },

    //幻灯片
    focus:function(){
        var sw = 0;
        $(".focus .num a").mouseover(function(){
            sw = $(".num a").index(this);
            myShow(sw);
        });
        function myShow(i){
            $(".focus .num a").eq(i).addClass("cur").siblings("a").removeClass("cur");
            $(".focus ul li").eq(i).stop(true,true).fadeIn(600).siblings("li").fadeOut(600);
        }
        //滑入停止动画，滑出开始动画
        $(".focus").hover(function(){
            if(myTime){
                clearInterval(myTime);
            }
        },function(){
            myTime = setInterval(function(){
                myShow(sw)
                sw++;
                if(sw==3){sw=0;}
            } , 3000);
        });
        //自动开始
        var myTime = setInterval(function(){
            myShow(sw)
            sw++;
            if(sw==3){sw=0;}
        } , 3000);
    },

    //Tab切换
    tabs: function(){
        $('.tab li').mouseover(function () {
            $(".tab li").removeClass("cur");
            $(this).addClass("cur");
            $('.tabBox').addClass("hidden");
            $('.tabBox').eq($(this).index()).removeClass("hidden");
        });
    },

    //家庭医生图片列表滑动显示隐藏
    fd_box:function(){
        $('.fd_box').mouseover(function () {       //家庭医生
            $(this).find(".fd_cover").removeClass('hidden');
        });
        $('.fd_box').mouseout(function(){
            $(this).find(".fd_cover").addClass('hidden');
        });
    },

    //管理中心导航下拉
    navPullDown:function () {
        $('.pullDowm .list').hover(function () {
            $(this).find('dl').stop().slideDown();
        },function () {
            $(this).find('dl').stop().slideUp();
        });
    }

}


var str = location.href;

var arr = str.split("/");

delete arr[arr.length-1];

var dir = arr.join("/");

//选择城市 start 2017/2/8
function city_select() {
    frxs.ct_show()
}

$(document).ready(function () {
    frxs.fd_box();
    frxs.ctInit();
    frxs.navPullDown();


    /*$('.banner').unslider({
        arrows: false,
        fluid: true,
        dots: true
    });*/
})

//banner轮播图 参数

