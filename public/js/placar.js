$("#botao-placar").click(mostrarPlacar);
$("#botao-sincronizar-placar").click(sincronizarPlacar);

function inserirPlacar(){
    var tabelaPlacar = $(".placar").find("tbody");
    var nome = $("#usuarios").val();
    var palavrasDigitadas = $("#contador-palavras").text();

    var linhaPlacar = novaLinhaPlacar(nome, palavrasDigitadas);
    linhaPlacar.find(".btn-remover-placar").click(removerPlacar);

    //este comando adiciona no final do html ja existente
    //tabelaPlacar.append(linhaPlacar);
    //este comando adiciona no inicio do html ja existente
    tabelaPlacar.prepend(linhaPlacar);

    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;

    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
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
    var linhaPlacar = $(this).parent().parent();
    
    var segundos = 1000 * 1
    linhaPlacar.fadeOut(segundos);//animacao de fazer esconder informacao    
    setTimeout(function(){
        linhaPlacar.remove();
    }, segundos);
}

function mostrarPlacar(){
    //se usar o stop antes de chamar uma funcao de animacao
    //isso faz com que o jquery pare a execucao corrente
    //e faca apenas a ultima, e isso eh util para quando eu
    //aciono a animacao varias vezes, e caso nao use, o jquery
    //vai tentar acionar todas as animacoes
    $(".placar").stop().slideToggle(600);//abaixa a tela e sobre a tela com uma transicao
}

function sincronizarPlacar(){
    var dadosPlacar = [];
    //o "tbody>tr" eh um seletor especial do css, e diz que
    //estou selecionando os primeiros nivels de TR do TBODY
    var linhasPlacar = $("tbody>tr");

    linhasPlacar.each(function(){
        //o "td:nth-child(1)" eh um seletor especial do css
        //e diz que eu estou selecionando o primeiro TD em uma
        //lista de TDs
        var nome = $(this).find("td:nth-child(1)").text();
        var qtdPalavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: nome,
            pontos: qtdPalavras
        };

        dadosPlacar.push(score)
    });
    
    var dadosJson = {
        placar: dadosPlacar
    };

    $.post("http://localhost:3000/placar", dadosJson, function(){
        console.log("processou requisicao POST");
    });
}

function buscarPlacar(){
    $.get("http://localhost:3000/placar", function(data){

        $(data).each(function(){
            var linha = novaLinhaPlacar(this.usuario, this.pontos);
            linha.find(".btn-remover-placar").click(removerPlacar);

            $(".placar").find("tbody").append(linha);
        });
    });    
}