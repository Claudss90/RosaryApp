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
    Agora e na hora de nossa morte. Amém.`
};

// Mistérios do Rosário
const misterios = [
    "Mistério Gozoso: A Anunciação do Anjo a Maria",
    "Mistério Gozoso: A Visitação de Maria a Isabel",
    "Mistério Gozoso: O Nascimento de Jesus",
    "Mistério Gozoso: A Apresentação de Jesus no Templo",
    "Mistério Gozoso: O Encontro de Jesus no Templo"
];

// Algarismos romanos para contagem das Ave Marias
const numerosRomanos = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

let indiceMisterio = 0;
let oracaoAtual = 0; // 0 = Pai Nosso, 1-10 = Ave Maria

const imagensMisterios = [
    [ "images/misterio1_1.jpg", "images/misterio1_2.jpg", "images/misterio1_3.jpg", "images/misterio1_4.jpg", "images/misterio1_5.jpg" ],
    [ "images/misterio2_1.jpg", "images/misterio2_2.jpg", "images/misterio2_3.jpg", "images/misterio2_4.jpg", "images/misterio2_5.jpg" ],
    [ "images/misterio3_1.jpg", "images/misterio3_2.jpg", "images/misterio3_3.jpg", "images/misterio3_4.jpg", "images/misterio3_5.jpg" ],
    [ "images/misterio4_1.jpg", "images/misterio4_2.jpg", "images/misterio4_3.jpg", "images/misterio4_4.jpg", "images/misterio4_5.jpg" ],
    [ "images/misterio5_1.jpg", "images/misterio5_2.jpg", "images/misterio5_3.jpg", "images/misterio5_4.jpg", "images/misterio5_5.jpg" ]
];

function atualizarFundoMisterio() {
    const oracaoContainer = document.getElementById("oracao-container");
    
    // Verifica se as imagens existem antes de aplicar
    if (imagensMisterios[indiceMisterio] && imagensMisterios[indiceMisterio][Math.floor(oracaoAtual / 2)]) {
        const indiceImagem = Math.floor(oracaoAtual / 2); // Alternar entre 5 imagens (0 a 4)
        oracaoContainer.style.backgroundImage = `url('${imagensMisterios[indiceMisterio][indiceImagem]}')`;
    } else {
        console.error("Imagem não encontrada para o mistério:", indiceMisterio, "e etapa:", oracaoAtual);
    }
}

function avancarMisterio() {
    indiceMisterio++;
    if (indiceMisterio >= misterios.length) {
        indiceMisterio = 0; // Reinicia os mistérios quando chega ao fim
    }
    atualizarTituloMisterio();
    atualizarFundoMisterio();
    criarContas();
    ativarConta(0); // Reinicia com o Pai Nosso
}

document.addEventListener("DOMContentLoaded", () => {
    criarContas();
    atualizarTituloMisterio();
    atualizarFundoMisterio();
    ativarConta(0);
});

function criarContas() {
    const contasDiv = document.getElementById("contas");
    contasDiv.innerHTML = ''; // Limpa as contas antigas

    const contaMaior = document.createElement("div");
    contaMaior.classList.add("conta", "maior");
    contaMaior.addEventListener("click", () => ativarConta(0));
    contasDiv.appendChild(contaMaior);

    for (let i = 0; i < 10; i++) {
        const conta = document.createElement("div");
        conta.classList.add("conta");
        conta.addEventListener("click", () => ativarConta(i + 1));
        contasDiv.appendChild(conta);
    }
}

function atualizarTituloMisterio() {
    const titulo = document.getElementById("titulo-misterio");
    titulo.innerText = misterios[indiceMisterio];
}

function ativarConta(indice) {
    const contas = document.querySelectorAll(".conta");
    const oracaoDiv = document.getElementById("oracao-texto");
    const contadorDiv = document.getElementById("contador-romano");

    contas.forEach(conta => conta.classList.remove("ativa"));

    if (indice === 0) {
        // Pai Nosso
        oracaoDiv.innerText = oracoes.paiNosso;
        contadorDiv.innerText = "";
        oracaoAtual = 1;
    } else {
        // Ave Maria
        oracaoDiv.innerText = oracoes.aveMaria;
        contadorDiv.innerText = numerosRomanos[indice - 1];
        oracaoAtual = indice;

        if (oracaoAtual === 10) {
            setTimeout(avancarMisterio, 1000); // Aguarda 1 segundo antes de mudar o mistério
        }
    }

    contas[indice].classList.add("ativa");
}
