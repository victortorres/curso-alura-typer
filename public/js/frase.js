$("#botao-frases").click(selecionarFraseAleatoria);

function selecionarFraseAleatoria(){
    //para chamar uma requisicao get usando jquery
    $.get("http://localhost:3000/frases", trocarFrase);
}

function trocarFrase(data){
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    $(".frase").text(data[numeroAleatorio].texto);
    atualizarTamanhoFrase();
    atualizarTempo(data[numeroAleatorio].tempo);
}