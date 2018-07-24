$("#botao-frases").click(selecionarFraseAleatoria);
$("#botao-frases-por-id").click(buscarFrase);

function selecionarFraseAleatoria(){
    //poderia usar o .show() e depois o .hide() mas como sempre
    //terei que ficar fazendo essa transicao o .toggle() eh uma
    //solucao melhor
    $("#spinner").toggle();
    var mensagemErro = $("#erro");
    //para chamar uma requisicao get usando jquery
    $.get("http://localhost:3000/frases", 
          trocarFrase)
    //este bloco abaixo eh executado sempre
    //que ocorrer um erro
    .fail(function(){
        mensagemErro.show();
        setTimeout(function(){
            mensagemErro.toggle();
        }, 1500);
        
    })
    //este bloco eh executado sempre apos a execucao de
    //sucesso ou de erro
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocarFrase(data){
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[numeroAleatorio].texto);
    atualizarTamanhoFrase();
    atualizarTempo(data[numeroAleatorio].tempo);
}

function buscarFrase(){
    var idFrase = $("#frase-id").val();
    var dadosGet = {id: idFrase};

    var mensagemErro = $("#erro");
    $("#spinner").toggle();
    
    $.get( "http://localhost:3000/frases",
            dadosGet,
            trocarFrasePorId)
    .fail(function(){
        mensagemErro.show();
        setTimeout(function(){
            mensagemErro.toggle();
        }, 1500);
    })
    .always(function(){
        $("#spinner").toggle();
    });
}

function trocarFrasePorId(data){
    $(".frase").text(data.texto);
    atualizarTamanhoFrase();
    atualizarTempo(data.tempo);
}