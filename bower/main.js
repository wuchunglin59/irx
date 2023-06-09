/*
function updateImage(type, dirName, title) {
    let dir = "images\\" + type + "\\" + dirName + "\\";
    $.ajax({
        url: "get_file_list.php",
        dataType: "json",
        type: "post",
        data: {
            type: type,
            dirName: dirName
        },
        success: function (result) {
            let carousel_indicators = '<ul class="carousel-indicators carousel-indicators-numbers">';
            let carousel_inner = '';
            for (let i = 0; i < result.length; i++) {
                carousel_indicators += '<li data-target="#myCarousel" data-slide-to="' + i + '">' + (i+1) + '</li>';
                carousel_inner += '<div class="carousel-item"><img src="' + dir + result[i] + '" alt=""></div>';
            }
            $("#myCarousel").carousel("pause").removeData();
            //$("#myCarousel").carousel(target_slide_index);
           
            $('#carousel-indicators').html('');
            $('#carousel-inner').html('');

            $('#carousel-indicators').html(carousel_indicators + "</ul>");
            $('#carousel-inner').html(carousel_inner);
            
            $('.carousel-indicators > li').first().addClass('active');            
            $('.carousel-item').first().addClass('active');

            $("#flow-control-title").html(title + "流程步驟");
        },
        error: function (jqxhr, textStatus, errorThrown) {
            alert('讀取失敗(IRXM)');
        }
    });
    //$("#flow-control-title").html(title + "流程步驟");
};
*/

var mode = "";

$(document).ready(function () {     //頁面一進來就會跑的程式
    detectionWidow();               //偵測螢幕的function
    $(window).resize(function () {  //當螢幕調整過尺寸（左右拖拉時），跑的程式
        detectionWidow();           //偵測螢幕的function
    });
});

var detectionWidow = function () {  //偵測螢幕尺寸的function
    console.log(window.innerWidth);
    if (mode == "IRXP") {
        if (window.innerWidth >= 1200) {
            $('#myCarousel').width('35%');
        } else if (window.innerWidth < 1200 && window.innerWidth >= 1000) {
                $('#myCarousel').width('42%');            
        } else if (window.innerWidth < 1000 && window.innerWidth >= 900) {
            $('#myCarousel').width('55%');
        } else if (window.innerWidth < 900  && window.innerWidth >= 768) {
            $('#myCarousel').width('60%');
        } else if (window.innerWidth < 768 && window.innerWidth >= 600) {
            $('#myCarousel').width('75%');
        } else {
            $('#myCarousel').width('90%');
        }
    }
}

function updateImage(type, dirName, title) {
    mode = type;
    let dir = 'images_html/' + type + '/' + dirName;
    let indicators = ajax(dir + '_indicators.txt', type);
    let inner = ajax(dir + '_inner.txt', type);

    $("#myCarousel").hide();
    $("#flow-control-title").hide();

    $("#myCarousel").carousel("pause").removeData();
    //$("#myCarousel").carousel(target_slide_index);

    $('#carousel-indicators').html('');
    $('#carousel-inner').html('');

    $('#carousel-indicators').html(indicators);
    $('#carousel-inner').html(inner);

    $('.carousel-indicators > li').first().addClass('active');
    $('.carousel-item').first().addClass('active');

    $('#myCarousel').width('100%');
    detectionWidow();

    $("#flow-control-title").html(title + "流程步驟");
    
    $("#flow-control-title").show();
    $("#myCarousel").show();

    $('#page-wrap').hide();
    if (type == 'IRXM' || type == 'IRX') {
        $('#page-wrap').show();
    }

    $("body").css('background-image', 'url(images/back2.jpg)');

};

function ajax(dir, type) {
    let html = "";

    $.ajax({
        url: encodeURI(dir),
        dataType: "text",
        type: "get",
        contenType: 'text/plain',
        cache: false,
        async: false,
        success: function (result) {
            html = result;
        },
        error: function (jqxhr, textStatus, errorThrown) {
            alert('讀取失敗(' + type + ')');
        }
    });

    return html;
}

function selectIrxmMenu(select) {
    condition = {
        1: ['繳稅取款委託書', '委取_01', '委託取款'],
        2: ['信用卡', '信用卡_01', '信用卡'],
        3: ['一般繳稅', '一般繳稅_01ATM', '一般繳稅-ATM'],
        4: ['晶片金融卡', '晶片金融卡_01', '晶片金融卡'],
        5: ['活期(儲蓄)存款帳戶', '活期儲蓄存款_01', '活期(儲蓄)存款帳戶'],
        6: ['行動支付-信用卡', '行動支付信用卡_01', '行動支付-信用卡'],
        7: ['行動支付-金融卡', '行動支付金融卡_01', '行動支付-金融卡'],
        8: ['電支帳戶', '電支帳戶_01', '電支帳戶'],
    };

    html_file_url = 'table/IRXM/' + condition[select][0] + '.html';
    $('#page-wrap').load(encodeURI(html_file_url) + ' #page-wrap');

    updateImage('IRXM', condition[select][1], condition[select][2]);
};

function selectIrxMenu(select) {
    condition = {
        1: ['繳稅取款委託書', '委取01', '委託取款'],
        2: ['信用卡', '信用卡01', '信用卡'],
        3: ['一般繳稅', '一般繳稅_02ATM', '一般繳稅-ATM'],
        4: ['晶片金融卡', '線上即時扣款繳稅042_01晶片金融卡', '晶片金融卡'],
        5: ['活期(儲蓄)存款帳戶', '線上即時扣款繳稅041_01活儲', '活期(儲蓄)存款帳戶'],
        6: ['行動支付-信用卡', '行動支付信用卡_01', '行動支付-信用卡'],
        7: ['行動支付-金融卡', '行動支付金融卡_01', '行動支付-金融卡'],
    };

    html_file_url = 'table/IRX/' + condition[select][0] + '.html';
    $('#page-wrap').load(encodeURI(html_file_url) + ' #page-wrap');

    updateImage('IRX', condition[select][1], condition[select][2]);
};

function selectIbxMenu(select) {
    condition = {
        1: ["退稅", "退稅"],
        2: ["不繳不退", "不繳不退"],
        3: ["委託取款轉帳繳稅", "委託取款轉帳繳稅"],
        4: ["信用卡繳稅", "信用卡繳稅"],
        5: ["一般繳稅", "一般繳稅"],
        6: ["晶片金融卡繳稅", "晶片金融卡繳稅"],
        7: ["活期(儲蓄)存款帳戶繳稅", "活期(儲蓄)存款帳戶繳稅"],
        8: ["行動支付信用卡", "行動支付信用卡"],
        9: ["行動支付金融卡", "行動支付金融卡"],
        10: ["電子支付帳戶", "電子支付帳戶"],        
    };
    updateImage('IBX', condition[select][0], condition[select][1]);
};

function selectFidOMenu(select) {
    condition = {
        1: ["TW FidO安裝綁定", "TW FidO APP安裝及行動裝置綁定"],
        2: ["IRXM", "WEB線上版使用TW FidO手機認證"],
        3: ["IRX", "離線版使用TW FidO手機認證"],
        4: ["IBX", "稅額試算使用TW FidO手機認證"],

    };
    updateImage('TW-FidO', condition[select][0], condition[select][1]);
};

function selectKioskMenu(select) {
    condition = {
        1: ["統一_補印稅額試算繳稅繳納單_自然人憑證", "統一超商_使用自然人憑證_補印稅額試算繳稅繳納單"],
        2: ["統一_補印稅額試算繳稅繳納單_健保卡", "統一超商_使用健保卡_補印稅額試算繳稅繳納單"],
        3: ["統一_補印稅額試算繳稅繳納單_行動自然人憑證", "統一超商_使用行動自然人憑證_補印稅額試算繳稅繳納單"],
        4: ["統一_列印所得及扣除額查詢碼_自然人憑證", "統一超商_使用自然人憑證_列印所得及扣除額資料查詢碼"],
        5: ["統一_列印所得及扣除額查詢碼_健保卡", "統一超商_使用健保卡_列印所得及扣除額資料查詢碼"],
        6: ["統一_列印手機報稅繳稅單", "統一超商_列印手機報稅繳稅單"],
        7: ["全家_補印稅額試算繳稅繳納單_自然人憑證", "全家超商_使用自然人憑證_補印稅額試算繳稅繳納單"],
        8: ["全家_補印稅額試算繳稅繳納單_健保卡", "全家超商_使用健保卡_補印稅額試算繳稅繳納單"],
        9: ["全家_補印稅額試算繳稅繳納單_行動自然人憑證", "全家超商_使用行動自然人憑證_補印稅額試算繳稅繳納單"],
        10: ["全家_列印所得及扣除額查詢碼_自然人憑證", "全家超商_使用自然人憑證_列印所得及扣除額資料查詢碼"],
        11: ["全家_列印所得及扣除額查詢碼_健保卡", "全家超商_使用健保卡_列印所得及扣除額資料查詢碼"],
        12: ["全家_列印手機報稅繳稅單", "全家超商_列印手機報稅繳稅單"],
        13: ["萊爾富_補印稅額試算繳稅繳納單_自然人憑證", "萊爾富超商_使用自然人憑證_補印稅額試算繳稅繳納單"],
        14: ["萊爾富_補印稅額試算繳稅繳納單_健保卡", "萊爾富超商_使用健保卡_補印稅額試算繳稅繳納單"],
        15: ["萊爾富_補印稅額試算繳稅繳納單_行動自然人憑證", "萊爾富超商_使用行動自然人憑證_補印稅額試算繳稅繳納單"],
        16: ["萊爾富_列印所得及扣除額查詢碼_自然人憑證", "萊爾富超商_使用自然人憑證_列印所得及扣除額資料查詢碼"],
        17: ["萊爾富_列印所得及扣除額查詢碼_健保卡", "萊爾富超商_使用健保卡_列印所得及扣除額資料查詢碼"],
        18: ["萊爾富_列印手機報稅繳稅單", "萊爾富超商_列印手機報稅繳稅單"],
        19: ["來來_補印稅額試算繳稅繳納單_自然人憑證", "來來超商_使用自然人憑證_補印稅額試算繳稅繳納單"],
        20: ["來來_補印稅額試算繳稅繳納單_健保卡", "來來超商_使用健保卡_補印稅額試算繳稅繳納單"],
        21: ["來來_補印稅額試算繳稅繳納單_行動自然人憑證", "來來超商_使用行動自然人憑證_補印稅額試算繳稅繳納單"],
        22: ["來來_列印所得及扣除額查詢碼_自然人憑證", "來來超商_使用自然人憑證_列印所得及扣除額資料查詢碼"],
        23: ["來來_列印所得及扣除額查詢碼_健保卡", "來來超商_使用健保卡_列印所得及扣除額資料查詢碼"],
        24: ["來來_列印手機報稅繳稅單", "來來超商_列印手機報稅繳稅單"],
    };
    updateImage('KIOSK', condition[select][0], condition[select][1]);
};

function selectMidMenu(select) {
    condition = {
        1: ["IRX", "IRX離線版"],
        2: ["IRXM", "IRXM線上版"],
        3: ["IRXP", "IRXP手機版"],        
        4: ["IBX試算書表下載", "IBX試算書表下載"],
        5: ["IBX試算回復", "IBX試算回復"],        
    };
    updateImage('MID', condition[select][0], condition[select][1]);
};

function selectIrxpMenu(select) {
    condition = {
        1: ['信用卡_01', '信用卡'],
        2: ['活期儲蓄存款_01', '活期(儲蓄)存款帳戶'],
        3: ['行動支付信用卡_01', '行動支付-信用卡'],
        4: ['行動支付金融卡_01', '行動支付-金融卡'],
        5: ['電支帳戶_01', '電支帳戶'],   
        6: ['委取_01', '委託取款'],      
        7: ['一般繳稅_02現金或票據', '現金或票據'],            
        8: ['一般繳稅_01ATM', '自動櫃員機繳稅'],
    };
    updateImage('IRXP', condition[select][0], condition[select][1]);
};

function selectAttachMenu(select) {
    condition = {
        1: ["附件上傳", "附件上傳"],
    };
    updateImage('ATTACH', condition[select][0], condition[select][1]);
};
