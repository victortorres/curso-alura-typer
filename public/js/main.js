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