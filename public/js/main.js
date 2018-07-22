var tempoInicial = $("#tempo-digitacao").text();
var campoTextArea = $(".campo-digitacao");
//este comando chama todas as funcoes dentro dela quando
//o document esta carregado
//a sintaxe full seria "$(document).ready(function(){<comandos>});"
//ou a abaixo
$(function(){
    atualizarTamanhoFrase();
    inicializarContadores();
    inicializarCronometro();
    validacaoDigitacao();
    $("#botao-reiniciar").click(reiniciarJogo);
});

function atualizarTamanhoFrase(){
    var frase = $(".frase").text();
    var totalPalavras = frase.split(" ").length;
    
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(totalPalavras);
}

function inicializarContadores(){
    campoTextArea.on("input", function(){
        var conteudo = campoTextArea.val();
        var totalPalavrasDigitadas = conteudo.split(/\S+/).length - 1; //essa expressao regular busca por qualquer espaco vazio
        $("#contador-palavras").text(totalPalavrasDigitadas);
        $("#contador-caracteres").text(conteudo.length);
    });
}

function inicializarCronometro(){
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
                finalizarJogo();

                //quando quiser q um interval pare de funcionar
                //devo chamar a funcao abaixo passando o ID
                //do interval que desejo parar
                clearInterval(intervalID);
                
            }
        },1000);
    });    
}

function finalizarJogo(){
    //esse comando se passar o valor do nome do atributo html
    //ele pega o valor do atributo, e se passar dois parametros
    //ele altera o valor do atributo
    campoTextArea.attr("disabled", true);
    
    //1-o comando abaixo altera o atributo de estilo do CSS, mas uma boa
    //pratica eh criar uma classe CSS e adicionar essa classe
    //campoTextArea.css("background-color", "lightgray");
    //2-agora caso seja adicionado e removido uma class posteriormente
    //ao inves de usar o addClass e o removeClass, usar o toggleClass
    campoTextArea.toggleClass("campo-desativado");

    inserirPlacar();
}

function validacaoDigitacao(){
    var texto = $(".frase").text();
    campoTextArea.on("input", function(){
        var digitando = campoTextArea.val();
        var textoComparavel = texto.substr(0, digitando.length);

        if(digitando == textoComparavel){
            //campo-digitacao
            //campo-validacao-correta
            //campo-validacao-errada
            campoTextArea.addClass("campo-validacao-correta");
            campoTextArea.removeClass("campo-validacao-errada");
        } else {
            campoTextArea.removeClass("campo-validacao-correta");
            campoTextArea.addClass("campo-validacao-errada");
        }

    });
}

function reiniciarJogo(){
    $("#tempo-digitacao").text(tempoInicial);
    campoTextArea.val("");
    campoTextArea.attr("disabled", false);
    campoTextArea.toggleClass("campo-desativado");
    campoTextArea.removeClass("campo-validacao-correta");
    campoTextArea.removeClass("campo-validacao-errada");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    inicializarCronometro();
};

function inserirPlacar(){
    var tabelaPlacar = $(".placar").find("tbody");
    var nome = "Victor";
    var palavrasDigitadas = $("#contador-palavras").text();

    var linhaPlacar = novaLinhaPlacar(nome, palavrasDigitadas);
    linhaPlacar.find(".btn-remover-placar").click(removerPlacar);

    //este comando adiciona no final do html ja existente
    //tabelaPlacar.append(linhaPlacar);
    //este comando adiciona no inicio do html ja existente
    tabelaPlacar.prepend(linhaPlacar);
}

function novaLinhaPlacar(nome, palavrasDigitadas){
    var linha = $("<tr>");
    var colunaNome = $("<td>").text(nome);
    var colunaPalavras = $("<td>").text(palavrasDigitadas);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("btn-remover-placar").attr("href", "#");
    var icone = $("<i>").addClass("material-icons").addClass("small").text("delete");

    colunaRemover
        .append(link
                .append(icone));

    linha
        .append(colunaNome)
        .append(colunaPalavras)
        .append(colunaRemover);

    return linha;
}

function removerPlacar(){
    event.preventDefault();
    $(this).parent().parent().remove();
}