var frase = $(".frase").text();
var totalPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(totalPalavras);

var campoTextArea = $(".campo-digitacao");

campoTextArea.on("input", function(){
    var conteudo = campoTextArea.val();
    var totalPalavrasDigitadas = conteudo.split(/\S+/).length; //essa expressao regular busca por qualquer espaco vazio
    $("#contador-palavras").text(totalPalavrasDigitadas);
    $("#contador-caracteres").text(conteudo.length);
});

var tempoDigitacao = $("#tempo-digitacao").text();
//quando chamo um evento xxx.on() esse evento
//sera acionado toda vez que for executado, mas
//se chamar o evento xxx.one() independente de
//quantas vezes ocorra o evento, ele soh sera
//chamado 1x
campoTextArea.one("focus", function(){
    //1-todo o set interval retorna um ID
    var intervalID = setInterval(function(){
        tempoDigitacao--;
        $("#tempo-digitacao").text(tempoDigitacao);
        if(tempoDigitacao < 1){
            //esse comando se passar o valor do nome do atributo html
            //ele pega o valor do atributo, e se passar dois parametros
            //ele altera o valor do atributo
            campoTextArea.attr("disabled", true);
            //quando quiser q um interval pare de funcionar
            //devo chamar a funcao abaixo passando o ID
            //do interval que desejo parar
            clearInterval(intervalID);
        }
    },1000);
});