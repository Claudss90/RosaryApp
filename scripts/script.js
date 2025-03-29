// Definições das orações
const oracoes = {
    paiNosso: `Pai Nosso, que estais nos céus, santificado seja o Vosso nome;
    Venha a nós o Vosso Reino;
    Seja feita a Vossa vontade, assim na terra como no céu.
    O pão nosso de cada dia nos dai hoje;
    Perdoai as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido;
    E não nos deixeis cair em tentação, mas livrai-nos de todo mal. Amém.`,

    aveMaria: `Ave Maria, cheia de graça, o Senhor é convosco.
    Bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.
    Santa Maria, Mãe de Deus, rogai por nós, pecadores,
    Agora e na hora de nossa morte. Amém.`,
    
    gloria: `Glória ao Pai, ao Filho e ao Espírito Santo.
    Como era no princípio, agora e sempre. Amém.`,
    
    oJesus: `Ó meu Jesus, perdoai-nos e livrai-nos do fogo do inferno,
    levai as almas todas para o céu,
    principalmente as que mais precisarem da vossa misericórdia.`
};

// Definição de todos os mistérios
const todosOsMisterios = {
    gozosos: [
        "A Anunciação do Anjo a Maria",
        "A Visitação de Maria a Isabel",
        "O Nascimento de Jesus",
        "A Apresentação de Jesus no Templo",
        "O Encontro de Jesus no Templo"
    ],
    dolorosos: [
        "A Agonia de Jesus no Horto",
        "A Flagelação de Jesus",
        "A Coroação de Espinhos",
        "Jesus carregando a Cruz",
        "A Crucificação e Morte de Jesus"
    ],
    gloriosos: [
        "A Ressurreição de Jesus",
        "A Ascensão de Jesus ao Céu",
        "A Descida do Espírito Santo",
        "A Assunção de Maria ao Céu",
        "A Coroação de Maria como Rainha"
    ],
    luminosos: [
        "O Batismo de Jesus no Jordão",
        "As Bodas de Caná",
        "O Anúncio do Reino de Deus",
        "A Transfiguração de Jesus",
        "A Instituição da Eucaristia"
    ]
};

// Algarismos romanos para contagem das Ave Marias
const numerosRomanos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

// Variáveis de estado
let tipoMisterioAtual = "gozosos";
let indiceMisterio = 0;
let oracaoAtual = 0; // 0 = Pai Nosso, 1-10 = Ave Maria, 11 = Glória, 12 = Ó Jesus

// Armazenamento temporário de imagens fictícias para desenvolvimento
const imagensMisterios = {};

// Inicializar banco de imagens fictícias
function inicializarImagensFicticias() {
    // Para cada tipo de mistério
    Object.keys(todosOsMisterios).forEach(tipo => {
        imagensMisterios[tipo] = [];
        
        // Para cada mistério deste tipo
        todosOsMisterios[tipo].forEach((_, indice) => {
            // Criar 5 imagens para cada mistério
            imagensMisterios[tipo][indice] = [];
            for (let i = 0; i < 5; i++) {
                // Usar imagens fictícias para desenvolvimento
                imagensMisterios[tipo][indice][i] = `images/${tipo}_misterio${indice+1}_${i+1}.jpg`;
            }
        });
    });
}

// Função para atualizar o texto do mistério atual
function atualizarTituloMisterio() {
    const titulo = document.getElementById("titulo-misterio");
    const tipoFormatado = tipoMisterioAtual.charAt(0).toUpperCase() + tipoMisterioAtual.slice(1);
    titulo.innerText = `Mistérios ${tipoFormatado}: ${todosOsMisterios[tipoMisterioAtual][indiceMisterio]}`;
}

// Atualiza a imagem de fundo baseada no mistério e na oração atual
function atualizarFundoMisterio() {
    const oracaoContainer = document.getElementById("oracao-container");
    
    try {
        // O índice da imagem é baseado na oração atual (0-2, 3-4, 5-6, 7-8, 9-10)
        const indiceImagem = Math.min(Math.floor(oracaoAtual / 3), 4);
        const imagem = imagensMisterios[tipoMisterioAtual][indiceMisterio][indiceImagem];
        
        if (imagem) {
            oracaoContainer.style.backgroundImage = `url('${imagem}')`;
        } else {
            // Fallback para uma cor sólida se a imagem não for encontrada
            oracaoContainer.style.backgroundImage = "none";
            oracaoContainer.style.backgroundColor = "#3f51b5";
        }
    } catch (e) {
        console.error("Erro ao carregar imagem:", e);
        oracaoContainer.style.backgroundImage = "none";
        oracaoContainer.style.backgroundColor = "#3f51b5";
    }
}

// Avança para o próximo mistério
function avancarMisterio() {
    indiceMisterio++;
    if (indiceMisterio >= todosOsMisterios[tipoMisterioAtual].length) {
        indiceMisterio = 0; // Reinicia os mistérios quando chega ao fim
    }
    oracaoAtual = 0;
    atualizarTituloMisterio();
    atualizarFundoMisterio();
    criarContas();
    ativarConta(0); // Reinicia com o Pai Nosso
    atualizarProgressoVisual();
}

// Volta para o mistério anterior
function retornarMisterio() {
    indiceMisterio--;
    if (indiceMisterio < 0) {
        indiceMisterio = todosOsMisterios[tipoMisterioAtual].length - 1; // Vai para o último mistério
    }
    oracaoAtual = 0;
    atualizarTituloMisterio();
    atualizarFundoMisterio();
    criarContas();
    ativarConta(0); // Reinicia com o Pai Nosso
    atualizarProgressoVisual();
}

// Muda o tipo de mistério
function mudarTipoMisterio(novoTipo) {
    tipoMisterioAtual = novoTipo;
    indiceMisterio = 0;
    oracaoAtual = 0;
    atualizarTituloMisterio();
    atualizarFundoMisterio();
    criarContas();
    ativarConta(0);
    atualizarProgressoVisual();
}

// Cria visualmente as contas do terço
function criarContas() {
    const contasDiv = document.getElementById("contas");
    contasDiv.innerHTML = ''; // Limpa as contas antigas

    // Conta do Pai Nosso
    const contaMaior = document.createElement("div");
    contaMaior.classList.add("conta", "maior");
    contaMaior.addEventListener("click", () => ativarConta(0));
    contaMaior.setAttribute("title", "Pai Nosso");
    contasDiv.appendChild(contaMaior);

    // Contas das Ave Marias
    for (let i = 0; i < 10; i++) {
        const conta = document.createElement("div");
        conta.classList.add("conta");
        conta.addEventListener("click", () => ativarConta(i + 1));
        conta.setAttribute("title", `Ave Maria ${i + 1}`);
        contasDiv.appendChild(conta);
    }
    
    // Conta do Glória
    const contaGloria = document.createElement("div");
    contaGloria.classList.add("conta", "maior");
    contaGloria.style.backgroundColor = "#FFD700"; // Dourado para o Glória
    contaGloria.addEventListener("click", () => ativarConta(11));
    contaGloria.setAttribute("title", "Glória ao Pai");
    contasDiv.appendChild(contaGloria);
    
    // Conta do Ó Jesus
    const contaOJesus = document.createElement("div");
    contaOJesus.classList.add("conta", "maior");
    contaOJesus.style.backgroundColor = "#FF6B6B"; // Vermelho para o Ó Jesus
    contaOJesus.addEventListener("click", () => ativarConta(12));
    contaOJesus.setAttribute("title", "Ó Meu Jesus");
    contasDiv.appendChild(contaOJesus);
}

// Ativa uma conta específica e mostra a oração correspondente
function ativarConta(indice) {
    const contas = document.querySelectorAll(".conta");
    const oracaoDiv = document.getElementById("oracao-texto");
    const contadorDiv = document.getElementById("contador-romano");
    
    oracaoAtual = indice;
    
    // Remove a classe "ativa" de todas as contas
    contas.forEach(conta => conta.classList.remove("ativa"));
    
    // Determina qual oração mostrar baseado no índice
    if (indice === 0) {
        // Pai Nosso
        oracaoDiv.innerText = oracoes.paiNosso;
        contadorDiv.innerText = "";
    } else if (indice >= 1 && indice <= 10) {
        // Ave Maria
        oracaoDiv.innerText = oracoes.aveMaria;
        contadorDiv.innerText = numerosRomanos[indice - 1];
    } else if (indice === 11) {
        // Glória
        oracaoDiv.innerText = oracoes.gloria;
        contadorDiv.innerText = "";
    } else if (indice === 12) {
        // Ó Jesus
        oracaoDiv.innerText = oracoes.oJesus;
        contadorDiv.innerText = "";
    }
    
    // Adiciona a classe "ativa" à conta atual
    if (indice <= contas.length - 1) {
        contas[indice].classList.add("ativa");
    }
    
    // Atualiza a imagem de fundo
    atualizarFundoMisterio();
    
    // Atualiza o progresso visual
    atualizarProgressoVisual();
}

// Avança para a próxima oração
function proximaOracao() {
    oracaoAtual++;
    
    // Se chegou ao final das orações deste mistério, avança para o próximo
    if (oracaoAtual > 12) {
        avancarMisterio();
        return;
    }
    
    ativarConta(oracaoAtual);
}

// Volta para a oração anterior
function oracaoAnterior() {
    oracaoAtual--;
    
    // Se voltou antes da primeira oração, vai para o mistério anterior
    if (oracaoAtual < 0) {
        retornarMisterio();
        oracaoAtual = 12; // Vai para a última oração do mistério anterior
        ativarConta(oracaoAtual);
        return;
    }
    
    ativarConta(oracaoAtual);
}

// Atualiza a barra de progresso
function atualizarProgressoVisual() {
    const progressoTexto = document.getElementById("progresso-texto");
    const progressoPreenchido = document.getElementById("progresso-preenchido");
    
    // Calcula o progresso (0-12 orações por mistério)
    const progresso = Math.min((oracaoAtual / 12) * 100, 100);
    
    // Atualiza o texto de progresso
    progressoTexto.innerText = `Oração ${oracaoAtual + 1} de 13 | Mistério ${indiceMisterio + 1} de 5`;
    
    // Atualiza a barra de progresso
    progressoPreenchido.style.width = `${progresso}%`;
}

// Reproduz áudio da oração atual (função de demonstração)
function reproduzirAudio() {
    let textoOracao = "";
    
    // Determina qual oração está em exibição
    if (oracaoAtual === 0) {
        textoOracao = "Pai Nosso";
    } else if (oracaoAtual >= 1 && oracaoAtual <= 10) {
        textoOracao = `Ave Maria ${oracaoAtual}`;
    } else if (oracaoAtual === 11) {
        textoOracao = "Glória ao Pai";
    } else {
        textoOracao = "Ó Meu Jesus";
    }
    
    // Simulação de áudio (você precisaria implementar a reprodução real)
    alert(`Reproduzindo áudio: ${textoOracao}`);
    
    // Nota: Para implementar a reprodução real, você precisaria de arquivos de áudio
    // e usar a API de Áudio do navegador:
    /*
    const audio = new Audio(`audios/${textoOracao.toLowerCase().replace(' ', '_')}.mp3`);
    audio.play();
    */
}

// Inicialização do aplicativo quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
    inicializarImagensFicticias();
    criarContas();
    atualizarTituloMisterio();
    atualizarFundoMisterio();
    ativarConta(0);
    atualizarProgressoVisual();
    
    // Configura os listeners de eventos para os botões
    document.getElementById("btn-anterior").addEventListener("click", oracaoAnterior);
    document.getElementById("btn-proximo").addEventListener("click", proximaOracao);
    document.getElementById("btn-audio").addEventListener("click", reproduzirAudio);
    
    // Configura o listener para a seleção de mistérios
    document.getElementById("tipo-misterio").addEventListener("change", (e) => {
        mudarTipoMisterio(e.target.value);
    });
});