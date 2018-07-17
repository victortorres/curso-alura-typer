var frase = $(".frase").text();
var totalPalavras = frase.split(" ").length;

var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(totalPalavras);