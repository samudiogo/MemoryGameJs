$(function () {
    var divAberta = "";
    var imgAberta = "";
    var imgAchada = 0;
    var tabuleiro = "#tabuleiro";
    var stopwatch = "#stopwatch";
    var imgFonte = ['img/facebook.png', 'img/android.png', 'img/chrome.png', 'img/firefox.png', 'img/html5.png', 'img/googleplus.png', 'img/twitter.png', 'img/windows.png'];
    var segundos = 0;
    var rodaStopWatch;

    function init() {
        for (let o = 1; o < 3; o++) {
            $.each(imgFonte, function (i, val) {
                $(tabuleiro).append('<div class="card w-25 my-2" id="card' + o + i + '"><img class="mx-auto pt-3" src="' + val + '" />');
            });
        }
        
        $(tabuleiro + " div").css("visibility", "visible");
        
        $("#btn-start").click(iniciaRodada);

        $('#btn-stop').click(function(){
            paraStopWatch();
            $('#btn-start > i').toggleClass('fa-pause');

        });

        $("#btn-reset").click(function(){
            location.reload(false);
        });
        
        $(tabuleiro + " div").click(AbrirCarta);


    } init();

    function iniciaRodada() {
        paraStopWatch();
        $('#btn-start > i').toggleClass('fa-pause');
        $(tabuleiro + " div img").css("visibility", "visible");
        embaralhaImagens();
        $(tabuleiro + " div img").fadeOut(3000, "linear");
        $(tabuleiro + " div").css("visibility", "visible");
        $(tabuleiro + " div").click(AbrirCarta);
        iniciaStopWatch();
    }
    
    function randomInterval(MaxValue, MinValue) {
        return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
    }

    function mostraStopWatch() {
        $(stopwatch).text(moment().hour(0).minute(0).second(segundos++).format('HH : mm : ss'));
    }   
    
    function iniciaStopWatch() {
     rodaStopWatch = setInterval(mostraStopWatch,1000);   
    }

    function paraStopWatch() {
        clearInterval(rodaStopWatch);
    }

    function acompanhaResultado() {        
            if (imgAchada == imgFonte.length) {
                paraStopWatch();
                $('#btn-start > i').toggleClass('fa-pause');
                setTimeout(function () {
                    alert("Parabéns! Você ganhou! seu tempo foi: " + $(stopwatch).text());
                }, 1000);
            }
    }

    function AbrirCarta() {
        var id = $(this).attr("id");
        if ($("#" + id + " img").is(":hidden")) {
            $(tabuleiro + " div").unbind("click", AbrirCarta);
            $("#" + id).css("background-image", "none");
            $("#" + id + " img").slideDown(100, "linear");
            if (imgAberta == "") {
                divAberta = id;
                imgAberta = $("#" + id + " img").attr("src");
                setTimeout(function () {
                    $(tabuleiro + " div").bind("click", AbrirCarta)
                }, 300);
            } else {
                let AtualAberta = $("#" + id + " img").attr("src");
                if (imgAberta != AtualAberta) {
                    setTimeout(function () {
                        $("#" + id + " img").fadeOut(1000, "linear");
                        $("#" + divAberta + " img").fadeOut(1000, "linear");
                        divAberta = "";
                        imgAberta = "";
                    }, 700);
                } else {
                    imgAchada++;
                    divAberta = "";
                    imgAberta = "";
                    acompanhaResultado();
                }
                setTimeout(function () {
                    $(tabuleiro + " div").bind("click", AbrirCarta)
                }, 700);
            }
        }
    }
    
    function embaralhaImagens() {
        let imgAll = $(tabuleiro).children();
        let imgThis = $(tabuleiro + " div:first-child");
        let ImgArr = [];
        for (let i = 0; i < imgAll.length; i++) {
            ImgArr[i] = $("#" + imgThis.attr("id") + " img").attr("src");
            imgThis = imgThis.next();
        }
        imgThis = $(tabuleiro + " div:first-child");
        for (let i = 0; i < imgAll.length; i++) {
            let randomNumero = randomInterval(0, ImgArr.length - 1);
            $("#" + imgThis.attr("id") + " img").attr("src", ImgArr[randomNumero]);
            ImgArr.splice(randomNumero, 1);
            imgThis = imgThis.next();
        }
    }
}());
