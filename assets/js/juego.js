
(() => {
    'use strict'

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    // let puntosJugador = 0,
    //     puntosComputadora = 0;
    let puntosJugadores = [];

    // Referencias HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const puntosHTML = document.querySelectorAll('small'),
          divCartasJugadores = document.querySelectorAll('.divCartas');
    //   divCartasJugador = document.querySelector('#jugador-cartas'),
    //   divCartasComputadora = document.querySelector('#computadora-cartas');

    // Iniciar juego
    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
    }

    // Esta funcion crea un nuevo deck
    const crearDeck = () => {
        deck = [];
        
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
  
        return _.shuffle(deck);
        // console.log(deck);
    }

    inicializarJuego();
    
    // Esta funcion me permite tomer una carta
    const pedirCarta = () => {

        // Si el deck esta vacio
        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }

        // const carta = deck.pop();
        return deck.pop();
    }

    // para probar el error
    // deck = [];
    // console.log(pedirCarta());

    // Obtener el valor de la carta
    const valorCarta = (carta = '') => {
        // const valor = carta.substring(0, carta.length - 1);
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
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

    }

    // Turno: 0 = Primer Jugador y el último será la computadora
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);
    }

    // Turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta();

            // puntosComputadora = puntosComputadora + valorCarta(carta);
            // puntosHTML[1].innerText = puntosComputadora;
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            // Crear carta HTML
            crearCarta(carta, puntosJugadores.length - 1);
            // const imgCarta = document.createElement('img');
            // imgCarta.src = `assets/cartas/${carta}.png`;
            // imgCarta.classList.add('carta');
            // divCartasComputadora.append(imgCarta);

            // Si el jugador saca más de 21, con una carta la computadora gana
            if (puntosMinimos > 21) {
                break;
            }

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Empate');
            } else if (puntosMinimos > 21) {
                alert('Computadora gana');
            } else if (puntosComputadora > 21) {
                alert('Jugador gana');
            } else {
                alert('Computadora gana');
            }
        }, 10);
    }

    // console.log(valorCarta('QD'));
    const valor = valorCarta(pedirCarta());
    // console.log(valor);

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        // puntosJugador = puntosJugador + valorCarta(carta);
        // puntosHTML[0].innerText = puntosJugador;
        const puntosJugador = acumularPuntos(carta, 0);

        
        // Crear carta HTML
        crearCarta(carta, 0);
        // const imgCarta = document.createElement('img');
        // imgCarta.src = `assets/cartas/${carta}.png`;
        // imgCarta.classList.add('carta');
        // divCartasJugador.append(imgCarta);

        if (puntosJugador > 21) {
            console.warn('Perdiste :(');
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.warn('21 Genial');
            btnDetener.disabled = true;
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        turnoComputadora(puntosJugador);
    });

    btnNuevo.addEventListener('click', () => {
        console.clear();
        inicializarJuego();

        // puntosJugador = 0;
        // puntosComputadora = 0;

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;

        // divCartasJugador.innerHTML = '';
        // divCartasComputadora.innerHTML = '';

        // btnDetener.disabled = false;
        // btnPedir.disabled = false;
    });
})();
