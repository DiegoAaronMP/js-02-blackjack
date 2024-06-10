
/**
 * 2C = Two of Clubs (Tréboles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

// Esta funcion crea un nuevo deck
const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);
    // console.log(deck);
}

crearDeck();

// Esta funcion me permite tomer una carta
const pedirCarta = () => {

    // Si el deck esta vacio
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    return carta;
}

// para probar el error
// deck = [];
// console.log(pedirCarta());

const valorCarta = (carta = '') => {
    const valor = carta.substring(0, carta.length - 1);
    // let puntos = 0;
    // if (isNaN(valor)) {
    //     console.log('No es un número');

    //     puntos = (valor === 'A') ? 11 : 10;

    // } else {
    //     console.log('Es un número');
    //     // multiplicamos por 1 para convertir el string en number
    //     puntos = valor * 1;
    // }
    // console.log(puntos);

    // * Resumido
    return (isNaN(valor))  ?
           (valor === 'A') ?  11 : 10
           : valor * 1;

}

// console.log(valorCarta('QD'));
const valor = valorCarta(pedirCarta());
console.log(valor);