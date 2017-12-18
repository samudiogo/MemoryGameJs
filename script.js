$(function () {
    var divAberta = "";
    var imgAberta = "";
    var imgAchada = 0;
    var tabuleiro = "#tabuleiro";
    var stopwatch = "#stopwatch";
    var imgFonte = ['img/facebook.png', 'img/android.png', 'img/chrome.png', 'img/firefox.png', 'img/html5.png', 'img/googleplus.png', 'img/twitter.png', 'img/windows.png'];
    var inicioTempo;
    var time;
    var segundos = 0;
    var rodaStopWatch;
    function IniciarJogo() {
        for (let o = 1; o < 3; o++) {
            $.each(imgFonte, function (i, val) {
                $(tabuleiro).append('<div class="card w-22 border-primary m-3 mb-1 p-4 pl-5  align-middle" id="card' + o + i + '"><img src="' + val + '" />');
            });
        }
        $(tabuleiro + " div").css("visibility", "visible");
        $("#btn-start").click(Inicia);
        $("#reset").click(Reset);
        $(tabuleiro + " div").click(AbrirCarta);
    } IniciarJogo();

    function Inicia() {
        $(tabuleiro + " div img").css("visibility", "visible");
        ShuffleImages();
        $(tabuleiro + " div img").fadeOut(3000, "linear");
        $(tabuleiro + " div").css("visibility", "visible");
        $(tabuleiro + " div").click(AbrirCarta);
        inicioTempo = $.now();
        iniciaStopWatch();
    }

    function mostraStopWatch() {
        $(stopwatch).text(moment().hour(0).minute(0).second(segundos++).format('HH : mm : ss'));
    }   
    
    function iniciaStopWatch() {
     rodaStopWatch = setInterval(mostraStopWatch,1000);   
    }

    function paraStopWatch() {
        rodaStopWatch = clearInterval(mostraStopWatch);
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
                    CheckWin ();
                }
                setTimeout(function () {
                    $(tabuleiro + " div").bind("click", AbrirCarta)
                }, 700);
            }
        }
    }
    function CheckWin() {
        
            if (imgAchada == imgFonte.length) {
                $("#time").prepend('<span id="success">Você ganhou: </span>');
                let finalTempo = $.now();
                let tempoTotal = (finalTempo - inicioTempo) / 1000;
                $("#time").html(tempoTotal + " segundos");
                localStorage.setItem('tempo', tempoTotal);
                let temmpo = localStorage.getItem('tempo');
                setTimeout(function () {
                    alert("Você ganhou, seu tempo em segundos é " + temmpo);
                }, 300);
                
            }
    }
    function RandomizarImagens(MaxValue, MinValue) {

        return Math.round(Math.random() * (MaxValue - MinValue) + MinValue);
    }

    function ShuffleImages() {
        let imgAll = $(tabuleiro).children();
        let imgThis = $(tabuleiro + " div:first-child");
        let ImgArr = [];
        for (let i = 0; i < imgAll.length; i++) {
            ImgArr[i] = $("#" + imgThis.attr("id") + " img").attr("src");
            imgThis = imgThis.next();
        }
        imgThis = $(tabuleiro + " div:first-child");
        for (let i = 0; i < imgAll.length; i++) {
            let randomNumero = RandomizarImagens(0, ImgArr.length - 1);
            $("#" + imgThis.attr("id") + " img").attr("src", ImgArr[randomNumero]);
            ImgArr.splice(randomNumero, 1);
            imgThis = imgThis.next();
        }
    }

    function Reset() {
        location.reload();
    }
}());
