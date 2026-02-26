window.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS PRINCIPALES ---
    const boton = document.getElementById('boton-rotar');
    const esfera = document.getElementById('esfera');
    const disco0 = document.getElementById('disco0');
    const ciudades = [
        "Fund I", "Fund II", "Fund III", "Fund IV",
        "Fund V", "Fund VI", "Fund VII", "Fund VIII",
        "Fund IX", "Fund X", "Fund XI", "Fund XII"
    ];
    let contador = 0;
    const perdidaMax = document.getElementById('perdida-max');
    const retorno = document.getElementById('retorno');
    const perdidaMaxDiv = document.getElementById('perdida-max');
    const retornoDiv = document.getElementById('retorno');
    const porcentajeRealDiv = document.getElementById('porcentajeReal');
    // Objetos varios
    const objeto1 = document.getElementById('objeto1');
    const objeto2 = document.getElementById('objeto2');
    const objeto3 = document.getElementById('objeto3');
    const objeto4 = document.getElementById('objeto4');
    const objeto5 = document.getElementById('objeto5');
    const objeto6 = document.getElementById('objeto6');
    const objeto7 = document.getElementById('objeto7');
    const objeto8 = document.getElementById('objeto8'); // oculto
    const objeto9 = document.getElementById('objeto9');
    const objeto10 = document.getElementById('objeto10');
    const objeto11 = document.getElementById('objeto11');
    const objeto12 = document.getElementById('objeto12');
    const objeto13 = document.getElementById('objeto13');
    const objeto14 = document.getElementById('objeto14');
    const objeto15 = document.getElementById('objeto15');
    const objeto16 = document.getElementById('objeto16');
    const objeto17 = document.getElementById('objeto17');
    const objeto18 = document.getElementById('objeto18');
    const objeto19 = document.getElementById('objeto19');
    const cuadroInversion = document.getElementById('cuadro-inversion');
    // Manecillas
    const manecillaHora = document.getElementById('manecillaHora');
    manecillaHora.style.filter = 'drop-shadow(2px 2px 3px rgba(132, 126, 126, 2.35))';
    const manecillaMinuto = document.getElementById('manecillaMinuto');
    manecillaMinuto.style.filter = 'drop-shadow(2px 2px 3px rgba(132, 126, 126, 2.35))';
    const manecillaSegundo = document.getElementById('manecillaSegundo');
    //manecillaSegundo.style.filter = 'drop-shadow(0 1px 2px rgba(50, 224, 222, 0.58))';
    manecillaSegundo.style.filter = 'drop-shadow(2px 2px 3px rgba(132, 126, 126, 2.35))';
    const manecillaAlma = document.getElementById('manecillaAlma');
    //manecillaAlma.style.filter = 'drop-shadow(0 1px 2px rgba(31, 167, 163, 1.0))';
    manecillaAlma.style.filter = 'drop-shadow(2px 2px 3px rgba(132, 126, 126, 2.35))';
    const discominicentro = document.getElementById('discominicentro');
    const puntero = document.getElementById('puntero');
    const mascaraprueba = document.getElementById('mascaraprueba');
    mascaraprueba.style.filter = 'drop-shadow(0 1px 2px rgba(132, 126, 126, .8))';
    ;
    const posAbsolutePuntero = document.getElementById('posAbsolutePuntero');
    const posAbsoluteDiscoMiniCentro = document.getElementById('posAbsoluteDiscoMiniCentro');
    const cristal = document.getElementById('cristal');
    // Contenedor principal para cálculos de centro
    const container = boton.parentElement;
    // Botones laterales
    const btn1 = document.querySelector('#side-buttons button:nth-child(1)');
    const btn2 = document.querySelector('#side-buttons button:nth-child(2)');
    const btn3 = document.querySelector('#side-buttons button:nth-child(3)');
    const btn4 = document.querySelector('#side-buttons button:nth-child(4)');
    const btn5 = document.querySelector('#side-buttons button:nth-child(5)');
    const btn6 = document.querySelector('#side-buttons button:nth-child(6)');
    // Referencias a los nuevos botones
    const btnInfo = document.getElementById('btnInfo');
    const btnLogin = document.getElementById('btnLogin');
    // Botón externo adicional (opcional)
    const boton1Externo = document.getElementById('boton1');
    // Agregar esta función justo después de declarar constantes principales (antes de las funciones de actualización)
    // Al final de la sección donde declaraste y posicionaste todos los elementos
    window.addEventListener("load", () => {
        const elementosReloj = [
            esfera, disco0, objeto1, objeto2, objeto3, objeto4, objeto5, objeto6,
            objeto7, objeto8, objeto9, objeto10, objeto11, objeto12, objeto13, objeto14,
            objeto15, objeto16, objeto17, objeto18, objeto19,
            puntero, discominicentro, cristal,
            manecillaHora, manecillaMinuto, manecillaSegundo, manecillaAlma,
            btnInfo, btnLogin // forzamos que existen
        ];
        function getFondoActual() {
            return ciudades[contador % ciudades.length];
        }
        let svgsCargados = 0;
        function intentarActualizarFechaCuandoListos() {
            svgsCargados++;
            if (svgsCargados === 3) {
                actualizarFecha(); // Ejecuta la función cuando los 3 SVG están cargados
            }
        }
        objeto1.addEventListener('load', intentarActualizarFechaCuandoListos);
        objeto2.addEventListener('load', intentarActualizarFechaCuandoListos);
        objeto3.addEventListener('load', intentarActualizarFechaCuandoListos);
        objeto4.addEventListener('load', () => {
            // Aquí ya está cargado el SVG dentro del <object>
            // Ahora podés llamar a la función que actualice la rotación del disco4
            actualizarRotacionObjeto4();
        });
        function diasEnMes(mes, anio) {
            return new Date(anio, mes + 1, 0).getDate();
        }
        // Validar existencia de todos los elementos
        if (!container || !boton || !esfera || !disco0 || !objeto1 || !objeto2 || !objeto3 || !objeto4 || !objeto5 || !objeto6 ||
            !objeto7 || !objeto8 || !objeto9 || !objeto10 || !objeto11 || !objeto12 || !objeto13 || !objeto14 || !objeto15 ||
            !objeto16 || !objeto17 || !objeto18 || !objeto19 || !btn1 || !btn2 || !btn3 || !btn4 || !btn5 || !btn6 ||
            !manecillaHora || !manecillaMinuto || !manecillaSegundo || !manecillaAlma) {
            console.error('Error: Algún elemento no se encontró en el DOM.');
            return;
        }
        // Centro contenedor para posicionamiento
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        // Función para posicionar elementos con offset absoluto relativo al centro
        function posicionarElemento(elem, fixedX, fixedY, offsetX, offsetY) {
            elem.style.position = 'absolute';
            elem.style.left = `calc(50% + ${offsetX}px)`;
            elem.style.top = `calc(50% + ${offsetY}px)`;
            elem.style.transform = 'translate(-50%, -50%)';
        }
        // Posiciones fijas base para elementos
        const fixedPositions = {
            boton: { x: 319, y: 102 },
            esfera: { x: 175, y: 174 },
            disco0: { x: 175, y: 175 },
            numeros: [
                { elem: perdidaMax, x: 99.5, y: 178 },
                { elem: retorno, x: 274.3, y: 178 },
                { elem: porcentajeRealDiv, x: 148, y: 187.5 },
            ],
            objetos: [
                { elem: objeto1, x: 176, y: 179 },
                { elem: objeto2, x: 143, y: 141 },
                { elem: objeto3, x: 208, y: 143 },
                { elem: objeto4, x: 177, y: 171 },
                { elem: objeto5, x: 177, y: 230 },
                { elem: objeto6, x: 176, y: 235 },
                { elem: objeto7, x: 175, y: 235 },
                { elem: objeto8, x: 195, y: 280 },
                { elem: objeto9, x: 175, y: 235 },
                { elem: objeto10, x: 175, y: 235 },
                { elem: objeto11, x: 175, y: 235 },
                { elem: objeto12, x: 175, y: 235 },
                { elem: objeto13, x: 175, y: 235 },
                { elem: objeto14, x: 175, y: 235 },
                { elem: objeto15, x: 175, y: 235 },
                { elem: objeto16, x: 175, y: 235 },
                { elem: objeto17, x: 175, y: 235 },
                { elem: objeto18, x: 175, y: 235 },
                { elem: objeto19, x: 175, y: 235 },
                { elem: puntero, x: 174, y: 66 },
                { elem: discominicentro, x: 174.5, y: 177 },
                // === NUEVOS BOTONES ===
                { elem: btnInfo, x: 430, y: 280 }, // + Info
                { elem: btnLogin, x: 323, y: 280 }, // Login
            ],
            manecillas: [
                { elem: manecillaHora, x: 174, y: 116 },
                { elem: manecillaMinuto, x: 176, y: 87 },
                { elem: manecillaSegundo, x: 174, y: 72 },
                { elem: manecillaAlma, x: 174.5, y: 127 },
            ],
            cristal: { x: 175, y: 175 },
        };
        fixedPositions.numeros.forEach(({ elem, x, y }) => {
            if (elem) {
                elem.style.position = 'absolute'; // asegurate que esté posicionado para poder moverlo
                elem.style.left = `${x}px`;
                elem.style.top = `${y}px`;
            }
        });
        // Posicionar botón y disco0 con offset relativo
        posicionarElemento(boton, fixedPositions.boton.x, fixedPositions.boton.y, fixedPositions.boton.x - centerX, fixedPositions.boton.y - centerY);
        posicionarElemento(disco0, fixedPositions.disco0.x, fixedPositions.disco0.y, fixedPositions.disco0.x - centerX, fixedPositions.disco0.y - centerY);
        disco0.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        disco0.style.pointerEvents = 'none';
        // Objetos de fondo para fondos de "Funds" (menos objeto8 oculto)
        const fondosObjetos = [
            objeto7, objeto9, objeto10, objeto11, objeto12, objeto13, objeto14,
            objeto15, objeto16, objeto17, objeto18, objeto19,
        ];
        // Posicionar fondos, setear opacidad y transición inicial
        fondosObjetos.forEach(obj => {
            posicionarElemento(obj, fixedPositions.objetos[6].x, fixedPositions.objetos[6].y, fixedPositions.objetos[6].x - centerX, fixedPositions.objetos[6].y - centerY);
            obj.style.opacity = '0';
            obj.style.transition = 'opacity 0.5s ease';
            obj.style.position = 'absolute';
            obj.style.pointerEvents = 'none';
        });
        fondosObjetos[0].style.opacity = '1'; // mostrar objeto7 (Fund I) inicialmente
        // Variables estado rotaciones
        let rotationDegrees = 0;
        const diaHoy = new Date().getDate(); // del 1 al 31
        let objeto1Rotation = (diaHoy - 1) * (360 / 31); // calcula rotación exacta
        let objeto2Rotation = 0;
        let objeto3Rotation = 0;
        let objeto4Rotation = 0;
        // Grados por paso para cada disco o grupo
        const degreesPerStep = 360 / 12; // esfera principal (ciudades)
        const degreesPerStepObj1 = 360 / 31; // objeto1 (días)
        const degreesPerStepObj2 = 360 / 7; // objeto2 (días2)
        const degreesPerStepObj3 = 360 / 12; // objeto3 (meses)
        const degreesPerStepObj4 = 360 / 5; // objeto4 (romanos)
        const offsetCorreccionObj4 = -45; // Ajustá este valor a ojo (empieza con -45)
        const offsetInicialObjeto4 = 144; // Corregimos inclinación inicial
        // Estado índice fund actual para fondosObjetos
        let currentFundIndex = 0;
        // Filtros de sombras para objeto6 según ciudad/fund
        const filtrosPorCiudad = [
            'drop-shadow(0 0 4px #9faebb) drop-shadow(0 0 1.5px #9faebb)',
            'drop-shadow(0 0 4px #ffb07b) drop-shadow(0 0 1.5px #ffb07b)',
            'drop-shadow(0 0 4px #7fe5ac) drop-shadow(0 0 1.5px #7fe5ac)',
            'drop-shadow(0 0 4px #0fc0ea) drop-shadow(0 0 1.5px #0fc0ea)',
            'drop-shadow(0 0 4px #f0ead3) drop-shadow(0 0 1.5px #f0ead3)',
            'drop-shadow(0 0 4px #deab90) drop-shadow(0 0 1.5px #deab90)',
            'drop-shadow(0 0 4px #a1fffc) drop-shadow(0 0 1.5px #a1fffc)',
            'drop-shadow(0 0 4px #ab9bdd) drop-shadow(0 0 1.5px #ab9bdd)',
            'drop-shadow(0 0 4px #7fe5ac) drop-shadow(0 0 1.5px #7fe5ac)',
            'drop-shadow(0 0 4px #60c1d8) drop-shadow(0 0 1.5px #60c1d8)',
            'drop-shadow(0 0 4px #f97084) drop-shadow(0 0 1.5px #f97084)',
            'drop-shadow(0 0 4px #9faebb) drop-shadow(0 0 1.5px #9faebb)',
        ];
        const coloresSombraPorFondo = {
            "Fund I": "#00aaff",
            "Fund II": "#ffb07b",
            "Fund III": "#7fe5ac",
            "Fund IV": "#0fc0ea",
            "Fund V": "#f0ead3",
            "Fund VI": "#deab90",
            "Fund VII": "#a1fffc",
            "Fund VIII": "#ab9bdd",
            "Fund IX": "#7fe5ac",
            "Fund X": "#60c1d8",
            "Fund XI": "#f97084",
            "Fund XII": "#9faebb"
        };
        // Cambia opacidad de fondos y filtro según índice
        function actualizarOpacidadFondos(nuevoIndex) {
            if (nuevoIndex === currentFundIndex)
                return;
            const totalFondos = fondosObjetos.length;
            if (nuevoIndex < 0)
                nuevoIndex = totalFondos - 1;
            else if (nuevoIndex >= totalFondos)
                nuevoIndex = 0;
            fondosObjetos[currentFundIndex].style.opacity = '0';
            fondosObjetos[nuevoIndex].style.opacity = '1';
            objeto6.style.filter = filtrosPorCiudad[nuevoIndex] || filtrosPorCiudad[0];
            currentFundIndex = nuevoIndex;
        }
        // Obtener grupos rotables dentro de SVGs
        function getRotatableDias() {
            var _a;
            return (_a = objeto1.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementById('rotatableDias');
        }
        function getRotatableDias2() {
            var _a;
            return (_a = objeto2.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementById('rotatableDias2');
        }
        function getRotatableMeses() {
            var _a;
            return (_a = objeto3.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementById('rotatableMeses');
        }
        function getRotatableRomanos() {
            var _a;
            return (_a = objeto4.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementById('rotatableRomanos');
        }
        function getRotatableObjeto5() {
            var _a;
            return (_a = objeto5.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementById('rotatableObjeto5');
        }
        // Actualizar rotación esfera (ciudades)
        function actualizarTransformEsfera() {
            var _a;
            const esferaOffsetX = fixedPositions.esfera.x - centerX;
            const esferaOffsetY = fixedPositions.esfera.y - centerY;
            posicionarElemento(esfera, fixedPositions.esfera.x, fixedPositions.esfera.y, esferaOffsetX, esferaOffsetY);
            const rotatable = (_a = esfera.contentDocument) === null || _a === void 0 ? void 0 : _a.getElementById('rotatable');
            if (rotatable) {
                rotatable.style.transformOrigin = '50% 50%';
                rotatable.style.transition = 'transform 0.6s ease-in-out';
                rotatable.style.transform = `rotate(${rotationDegrees}deg)`;
            }
            disco0.style.transform = 'translate(-50%, -50%) rotate(0deg)';
        }
        function actualizarCuadroInversion(fondo) {
            const resumen = document.getElementById('resumen');
            const gestionadoPor = document.getElementById('gestionadoPor');
            const expReturn = document.getElementById('expReturn');
            const maxLoss = document.getElementById('maxLoss');
            const fechaDesde = document.getElementById('fechaDesde');
            const fechaHasta = document.getElementById('fechaHasta');
            const estadoSubscripcion = document.getElementById('estadoSubscripcion');
            const desdeSubscripcion = document.getElementById('desdeSubscripcion');
            const hastaSubscripcion = document.getElementById('hastaSubscripcion');
            const fundID = document.getElementById('fundID');
            const blank1 = document.getElementById('blank1');
            if (!resumen || !gestionadoPor || !expReturn || !maxLoss || !fechaDesde || !fechaHasta || !estadoSubscripcion || !desdeSubscripcion || !hastaSubscripcion || !fundID || !blank1) {
                console.error('Error: Algún campo del cuadro de inversión no fue encontrado.');
                return;
            }
            resumen.value = fondo.nombre || "";
            gestionadoPor.value = fondo.gestor || "";
            expReturn.value = fondo.retorno || "";
            maxLoss.value = fondo.perdidaMax || "";
            fechaDesde.value = fondo.fechaDesde || "";
            fechaHasta.value = fondo.fechaHasta || "";
            estadoSubscripcion.value = fondo.estadoSubscripcion || "";
            desdeSubscripcion.value = fondo.fechaSubscripcionDesde || "";
            hastaSubscripcion.value = fondo.fechaSubscripcionHasta || "";
            fundID.value = fondo.fundId || "";
            blank1.value = fondo.descripcionPeriodo || "";
            // Actualizar los valores en los números dinámicos visuales
            const perdidaMaxDiv = document.getElementById('perdida-max');
            const retornoDiv = document.getElementById('retorno');
            if (perdidaMaxDiv && retornoDiv) {
                perdidaMaxDiv.textContent = fondo.perdidaMax || "-";
                retornoDiv.textContent = fondo.retorno || "-";
            }
        }
        function rotarDiscoPeriodo(descripcionPeriodo) {
            var _a;
            const periodoToIndexMap = {
                "1 year": 0,
                "2 years": 1,
                "3 years": 2,
                "4 years": 3,
                "5 years": 4
            };
            const index = (_a = periodoToIndexMap[descripcionPeriodo]) !== null && _a !== void 0 ? _a : 0; // default 0 si no encuentra
            const anguloPorSegmento = 360 / 5; // 72 grados
            objeto4Rotation = -(index * anguloPorSegmento + anguloPorSegmento) + 72;
            actualizarRotacionObjeto4();
        }
        function actualizarColorSombra(color) {
            if (cuadroInversion) {
                cuadroInversion.style.setProperty('--shadow-color', color);
            }
        }
        // Calcula la rotación del disco de días según el día seleccionado
        function calcularRotacionDia(dia) {
            const totalDias = 31; // número de días en el disco
            const gradosPorDia = 360 / totalDias;
            return -((dia - 1) * gradosPorDia); // negativo si gira hacia la izquierda
        }
        function calcularRotacionDia() {
            const diaHoy = new Date().getDate(); // 1-31
            return (diaHoy - 1) * (360 / 31); // ajusta si tu disco tiene 31 posiciones
        }
        function aplicarRotacionDia() {
            const rotDias = getRotatableDias(); // tu función que obtiene el grupo del SVG
            if (!rotDias)
                return;
            const rotation = calcularRotacionDia();
            rotDias.style.transformOrigin = '50% 50%';
            rotDias.style.transition = 'transform 0.6s ease-in-out';
            rotDias.style.transform = `rotate(${rotation}deg)`;
        }
        // Actualizar rotaciones objetos
        function actualizarRotacionObjeto1() {
            const rotatable = getRotatableDias();
            if (!rotatable)
                return;
            rotatable.style.transformOrigin = '50% 50%';
            rotatable.style.transition = 'transform 0.6s ease-in-out';
            rotatable.style.transform = `rotate(${objeto1Rotation}deg)`;
        }
        function actualizarRotacionObjeto2() {
            const rotatable = getRotatableDias2();
            if (!rotatable)
                return;
            rotatable.style.transformOrigin = '50% 50%';
            rotatable.style.transition = 'transform 0.6s ease-in-out';
            rotatable.style.transform = `rotate(${objeto2Rotation}deg)`;
        }
        function actualizarRotacionObjeto3() {
            const rotatable = getRotatableMeses();
            if (!rotatable)
                return;
            rotatable.style.transformOrigin = '50% 50%';
            rotatable.style.transition = 'transform 0.6s ease-in-out';
            rotatable.style.transform = `rotate(${objeto3Rotation}deg)`;
        }
        function actualizarRotacionObjeto4() {
            const rotatable = getRotatableRomanos();
            if (!rotatable)
                return;
            rotatable.style.transformOrigin = '50% 50%';
            rotatable.style.transition = 'transform 0.6s ease-in-out';
            // Ajustamos con offset para alinear correctamente el número
            const rotacionConOffset = objeto4Rotation + offsetInicialObjeto4;
            rotatable.style.transform = `rotate(${rotacionConOffset}deg)`;
        }
        // Animación continua objeto5
        let animacionActivaObjeto5 = false;
        let anguloObjeto5 = 0;
        let animacionIdObjeto5 = null;
        function animarRotacionContinuaObjeto5() {
            if (!animacionActivaObjeto5)
                return;
            anguloObjeto5 = (anguloObjeto5 + 1) % 360;
            const rotatable = getRotatableObjeto5();
            if (rotatable) {
                rotatable.style.transformOrigin = '50% 50%';
                rotatable.style.transition = 'transform 0s linear';
                rotatable.style.transform = `rotate(${anguloObjeto5}deg)`;
            }
            animacionIdObjeto5 = requestAnimationFrame(animarRotacionContinuaObjeto5);
        }
        // Función para actualizar ángulos basados en el fondo
        function actualizarAngulosAlmaDesdeFondo(fondo) {
            if (!fondo || typeof fondo !== 'object') {
                console.warn('Fondo inválido para actualizar ángulos de alma:', fondo);
                return;
            }
            // Leer valores directamente del DOM para que se mantenga sincronizado
            const retornoStr = (retornoDiv === null || retornoDiv === void 0 ? void 0 : retornoDiv.textContent) || fondo.retorno || "";
            const perdidaStr = (perdidaMaxDiv === null || perdidaMaxDiv === void 0 ? void 0 : perdidaMaxDiv.textContent) || fondo.perdidaMax || "";
            if (!retornoStr || !perdidaStr) {
                console.warn('Fondo sin datos de retorno o pérdida:', fondo);
                return;
            }
            const retornoNum = parseFloat(retornoStr.replace('%', '').trim()) / 100;
            const perdidaNum = parseFloat(perdidaStr.replace('%', '').trim()) / 100;
            if (isNaN(retornoNum) || isNaN(perdidaNum)) {
                console.warn('No se pudieron convertir retorno o pérdida a número:', retornoStr, perdidaStr);
                return;
            }
            const anguloMax = 130;
            if (retornoNum >= 0) {
                anguloTopeDerechaAlma = retornoNum * anguloMax;
                anguloTopeIzquierdaAlma = -Math.abs(perdidaNum) * anguloMax;
            }
            else {
                anguloTopeIzquierdaAlma = retornoNum * anguloMax;
                anguloTopeDerechaAlma = Math.abs(perdidaNum) * anguloMax;
            }
            // Guardamos los valores reales (en %) para uso en el cálculo de porcentaje real
            retornoReal = retornoNum * 100;
            perdidaReal = perdidaNum * 100;
            console.log('Ángulos de alma actualizados:', anguloTopeIzquierdaAlma, anguloTopeDerechaAlma);
            console.log('Valores reales actualizados:', perdidaReal, retornoReal);
        }
        // Calcula el porcentaje normalizado entre 0 y 100 según el ángulo actual y límites angular reales
        function calcularPorcentajeNormalizado(anguloActualAlma) {
            // Rango angular total sin considerar el extra visual para porcentaje real
            const rangoTotalAngular = Math.abs(anguloTopeIzquierdaAlma) + anguloTopeDerechaAlma;
            const rangoAngularReal = rangoTotalAngular - gradosExtraDerecha;
            // Limitar el ángulo actual al tope derecho sin extra
            let anguloAjustado = anguloActualAlma;
            if (anguloActualAlma > anguloTopeDerechaAlma) {
                anguloAjustado = anguloTopeDerechaAlma;
            }
            // Posición relativa dentro del rango (desde tope izquierdo hasta tope derecho)
            const posicionRelativa = anguloAjustado + Math.abs(anguloTopeIzquierdaAlma);
            // Porcentaje entre 0 y 100
            let porcentajeNorm = (posicionRelativa / rangoAngularReal) * 100;
            porcentajeNorm = Math.min(Math.max(porcentajeNorm, 0), 100);
            return porcentajeNorm;
        }
        function calcularValorRealPorcentaje(angulo) {
            // rango angular extendido, incluye gradosExtraDerecha
            const rangoAngularTotal = (anguloTopeDerechaAlma + gradosExtraDerecha) - anguloTopeIzquierdaAlma;
            // posición relativa del ángulo dentro de ese rango extendido
            const posicionRelativa = angulo - anguloTopeIzquierdaAlma;
            // rango porcentual real (basado en los valores reales de retorno y pérdida)
            // Por ejemplo, el porcentaje mínimo es la pérdida real negativa, y máximo el retorno real positivo
            const porcentajeMin = perdidaReal; // ej: -18
            const porcentajeMax = retornoReal; // ej: 27
            // Mapeo lineal: de rangoAngularTotal a porcentajeMin-porcentajeMax
            const porcentajeReal = porcentajeMin + (posicionRelativa / rangoAngularTotal) * (porcentajeMax - porcentajeMin);
            return porcentajeReal;
        }
        // Eventos botones
        // Botón principal de rotación y cambio de fondo
        boton.addEventListener('click', () => {
            rotationDegrees -= degreesPerStep;
            actualizarTransformEsfera();
            let nuevoIndex = currentFundIndex + 1;
            if (nuevoIndex >= fondosObjetos.length)
                nuevoIndex = 0;
            actualizarOpacidadFondos(nuevoIndex);
            actualizarCuadroInversion(nuevoIndex);
            objeto4Rotation -= degreesPerStepObj4;
            actualizarRotacionObjeto4();
            // Emitir evento con fondo activo
            const fondoActual = ciudades[nuevoIndex];
            const evento = new CustomEvent("fondoCambiado", {
                detail: { fondo: fondoActual }
            });
            window.dispatchEvent(evento);
        });
        // Botón externo idéntico
        if (boton1Externo) {
            boton1Externo.addEventListener('click', () => {
                rotationDegrees -= degreesPerStep;
                actualizarTransformEsfera();
                let nuevoIndex = currentFundIndex + 1;
                if (nuevoIndex >= fondosObjetos.length)
                    nuevoIndex = 0;
                actualizarOpacidadFondos(nuevoIndex);
                // Emitir evento con fondo activo igual que en boton principal
                const fondoActual = ciudades[nuevoIndex];
                const evento = new CustomEvent("fondoCambiado", {
                    detail: { fondo: fondoActual }
                });
                window.dispatchEvent(evento);
            });
        }
        // ⬅️ Exponer funciones globalmente justo después de definirlas
        window.actualizarCuadroInversion = actualizarCuadroInversion;
        window.rotarDiscoPeriodo = rotarDiscoPeriodo;
        window.actualizarAngulosAlmaDesdeFondo = actualizarAngulosAlmaDesdeFondo;
        // ⬅️ Inicializar Fondo I al cargar la página
        fetch("/backend/fondos.json")
            .then(res => res.json())
            .then(data => {
            const fondoInicial = "Fund I";
            const fondo = data.find((f) => f.nombre === fondoInicial);
            if (fondo) {
                actualizarCuadroInversion(fondo);
                actualizarAngulosAlmaDesdeFondo(fondo);
                rotarDiscoPeriodo(fondo.descripcionPeriodo || "3 years");
                // Dispara evento para que tu listener también se ejecute
                const evento = new CustomEvent("fondoCambiado", { detail: { fondo: fondoInicial } });
                window.dispatchEvent(evento);
            }
            else {
                console.warn(`Fondo inicial no encontrado: ${fondoInicial}`);
            }
        })
            .catch(err => console.error("Error al cargar fondos.json:", err));
        // --- Inicializar calendario de discos (fecha) solo cuando existan ---
        const intervalCalendario = setInterval(() => {
            const rotDias = getRotatableDias();
            const rotDias2 = getRotatableDias2();
            const rotMeses = getRotatableMeses();
            if (rotDias && rotDias2 && rotMeses) {
                clearInterval(intervalCalendario);
                actualizarFecha(); // ahora sí, todos los discos existen
            }
        }, 10);
        // Listener que reacciona a cambio de fondo
        window.addEventListener("fondoCambiado", (e) => {
            const fondoNombre = e.detail.fondo;
            const colorSombra = coloresSombraPorFondo[fondoNombre] || "#00aaff";
            actualizarColorSombra(colorSombra);
            fetch("/backend/fondos.json")
                .then(res => res.json())
                .then(data => {
                const fondo = data.find((f) => f.nombre === fondoNombre);
                if (fondo) {
                    actualizarCuadroInversion(fondo);
                    actualizarAngulosAlmaDesdeFondo(fondo);
                    rotarDiscoPeriodo(fondo.descripcionPeriodo || "3 years");
                }
                else {
                    console.warn(`Fondo no encontrado: ${fondoNombre}`);
                }
            })
                .catch(err => console.error("Error al cargar fondos.json:", err));
        });
        document.addEventListener("DOMContentLoaded", () => {
            fetch("/backend/fondos.json")
                .then(res => res.json())
                .then(data => {
                const fondoInicial = "Fund I";
                const fondo = data.find((f) => f.nombre === fondoInicial);
                if (fondo) {
                    // Espera a que los elementos del SVG existan
                    const interval = setInterval(() => {
                        const svgReady = document.querySelector("#id-del-cuadro-inversion"); // ajusta al ID real
                        if (svgReady) {
                            clearInterval(interval);
                            actualizarCuadroInversion(fondo);
                            actualizarAngulosAlmaDesdeFondo(fondo);
                            rotarDiscoPeriodo(fondo.descripcionPeriodo || "3 years");
                        }
                    }, 10); // revisa cada 10ms hasta que exista
                }
                else {
                    console.warn(`Fondo inicial no encontrado: ${fondoInicial}`);
                }
            })
                .catch(err => console.error("Error al cargar fondos.json:", err));
        });
        // Función para forzar la opacidad de los objetos según el fondo seleccionado
        // Función para forzar la opacidad de los objetos según el fondo seleccionado
        function forzarOpacidades(nuevoIndex) {
            // Lista de todos los objetos relevantes (incluye objeto8)
            const todosObjetos = [
                objeto7, objeto8, objeto9, objeto10, objeto11, objeto12, objeto13,
                objeto14, objeto15, objeto16, objeto17, objeto18, objeto19
            ];
            // Mapear índice de fondosObjetos (sin objeto8) a todosObjetos (con objeto8)
            const idxTodos = (nuevoIndex === 0) ? 0 : nuevoIndex + 1;
            todosObjetos.forEach((obj, i) => {
                obj.style.opacity = (i === idxTodos) ? "1" : "0";
            });
        }
        btn1.addEventListener('click', () => {
            const nuevoIndex = 1; // Ciudad/Fondo II siempre
            const gradosPorFondo = 360 / fondosObjetos.length;
            const anguloObjetivo = -gradosPorFondo * nuevoIndex;
            const anguloInicial = rotationDegrees;
            const duracion = 100; // ms
            const inicioTiempo = performance.now();
            function animar(time) {
                const elapsed = time - inicioTiempo;
                const t = Math.min(elapsed / duracion, 1);
                const easing = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
                rotationDegrees = anguloInicial + (anguloObjetivo - anguloInicial) * easing;
                actualizarTransformEsfera();
                if (t < 1) {
                    requestAnimationFrame(animar);
                }
                else {
                    // Estado final
                    currentFundIndex = nuevoIndex;
                    actualizarOpacidadFondos(nuevoIndex);
                    actualizarCuadroInversion(nuevoIndex);
                    objeto4Rotation -= degreesPerStepObj4;
                    actualizarRotacionObjeto4();
                    const fondoActual = ciudades[nuevoIndex];
                    window.dispatchEvent(new CustomEvent("fondoCambiado", { detail: { fondo: fondoActual } }));
                    // Forzar opacidades exactas de todos los objetos incluyendo objeto7 y objeto9
                    if (typeof forzarOpacidades === "function") {
                        forzarOpacidades(nuevoIndex);
                    }
                }
            }
            requestAnimationFrame(animar);
        });
        btn2.addEventListener('click', () => {
            const nuevoIndex = 2; // Ciudad/Fondo III siempre
            const gradosPorFondo = 360 / fondosObjetos.length;
            const anguloObjetivo = -gradosPorFondo * nuevoIndex;
            const anguloInicial = rotationDegrees;
            const duracion = 100; // ms
            const inicioTiempo = performance.now();
            function animar(time) {
                const elapsed = time - inicioTiempo;
                const t = Math.min(elapsed / duracion, 1);
                const easing = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
                rotationDegrees = anguloInicial + (anguloObjetivo - anguloInicial) * easing;
                actualizarTransformEsfera();
                if (t < 1) {
                    requestAnimationFrame(animar);
                }
                else {
                    currentFundIndex = nuevoIndex;
                    // Actualizamos cuadro de inversión
                    actualizarCuadroInversion(currentFundIndex);
                    // Ajustamos rotación de objeto4
                    objeto4Rotation -= degreesPerStepObj4;
                    actualizarRotacionObjeto4();
                    // Emitimos evento
                    const fondoActual = ciudades[currentFundIndex];
                    window.dispatchEvent(new CustomEvent("fondoCambiado", { detail: { fondo: fondoActual } }));
                    // Forzar opacidades de todos los objetos
                    forzarOpacidades(nuevoIndex);
                }
            }
            requestAnimationFrame(animar);
        });
        btn3.addEventListener('click', () => {
            const nuevoIndex = 3; // Ciudad/Fondo IV siempre
            const gradosPorFondo = 360 / fondosObjetos.length;
            const anguloObjetivo = -gradosPorFondo * nuevoIndex;
            const anguloInicial = rotationDegrees;
            const duracion = 100; // ms
            const inicioTiempo = performance.now();
            function animar(time) {
                const elapsed = time - inicioTiempo;
                const t = Math.min(elapsed / duracion, 1);
                const easing = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
                rotationDegrees = anguloInicial + (anguloObjetivo - anguloInicial) * easing;
                actualizarTransformEsfera();
                if (t < 1) {
                    requestAnimationFrame(animar);
                }
                else {
                    // Estado final
                    currentFundIndex = nuevoIndex;
                    actualizarOpacidadFondos(nuevoIndex); // Actualiza opacidades normales
                    actualizarCuadroInversion(nuevoIndex);
                    objeto4Rotation -= degreesPerStepObj4;
                    actualizarRotacionObjeto4();
                    const fondoActual = ciudades[nuevoIndex];
                    window.dispatchEvent(new CustomEvent("fondoCambiado", { detail: { fondo: fondoActual } }));
                    // Forzar opacidades exactas de todos los objetos incluyendo objeto7 y objeto9
                    if (typeof forzarOpacidades === "function") {
                        forzarOpacidades(nuevoIndex);
                    }
                }
            }
            requestAnimationFrame(animar);
        });
        btn4.addEventListener('click', () => {
            const nuevoIndex = 4; // Ciudad/Fondo V siempre
            const gradosPorFondo = 360 / fondosObjetos.length;
            const anguloObjetivo = -gradosPorFondo * nuevoIndex;
            const anguloInicial = rotationDegrees;
            const duracion = 100; // ms
            const inicioTiempo = performance.now();
            function animar(time) {
                const elapsed = time - inicioTiempo;
                const t = Math.min(elapsed / duracion, 1);
                const easing = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
                rotationDegrees = anguloInicial + (anguloObjetivo - anguloInicial) * easing;
                actualizarTransformEsfera();
                if (t < 1) {
                    requestAnimationFrame(animar);
                }
                else {
                    // Estado final
                    currentFundIndex = nuevoIndex;
                    actualizarOpacidadFondos(nuevoIndex); // Actualiza opacidades normales
                    actualizarCuadroInversion(nuevoIndex);
                    objeto4Rotation -= degreesPerStepObj4;
                    actualizarRotacionObjeto4();
                    const fondoActual = ciudades[nuevoIndex];
                    window.dispatchEvent(new CustomEvent("fondoCambiado", { detail: { fondo: fondoActual } }));
                    // Forzar opacidades exactas de todos los objetos incluyendo objeto7 y objeto9
                    if (typeof forzarOpacidades === "function") {
                        forzarOpacidades(nuevoIndex);
                    }
                }
            }
            requestAnimationFrame(animar);
        });
        btn5.addEventListener('click', () => {
            const nuevoIndex = 5; // Ciudad/Fondo VI siempre
            const gradosPorFondo = 360 / fondosObjetos.length;
            const anguloObjetivo = -gradosPorFondo * nuevoIndex;
            const anguloInicial = rotationDegrees;
            const duracion = 100; // ms
            const inicioTiempo = performance.now();
            function animar(time) {
                const elapsed = time - inicioTiempo;
                const t = Math.min(elapsed / duracion, 1);
                const easing = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
                rotationDegrees = anguloInicial + (anguloObjetivo - anguloInicial) * easing;
                actualizarTransformEsfera();
                if (t < 1) {
                    requestAnimationFrame(animar);
                }
                else {
                    // Estado final
                    currentFundIndex = nuevoIndex;
                    actualizarOpacidadFondos(nuevoIndex); // Actualiza opacidades normales
                    actualizarCuadroInversion(nuevoIndex);
                    objeto4Rotation -= degreesPerStepObj4;
                    actualizarRotacionObjeto4();
                    const fondoActual = ciudades[nuevoIndex];
                    window.dispatchEvent(new CustomEvent("fondoCambiado", { detail: { fondo: fondoActual } }));
                    // Forzar opacidades exactas de todos los objetos incluyendo objeto7 y objeto9
                    if (typeof forzarOpacidades === "function") {
                        forzarOpacidades(nuevoIndex);
                    }
                }
            }
            requestAnimationFrame(animar);
        });
        btn6.addEventListener('click', () => {
            const nuevoIndex = 6; // Ciudad/Fondo VII siempre
            const gradosPorFondo = 360 / fondosObjetos.length;
            const anguloObjetivo = -gradosPorFondo * nuevoIndex;
            const anguloInicial = rotationDegrees;
            const duracion = 100; // ms
            const inicioTiempo = performance.now();
            function animar(time) {
                const elapsed = time - inicioTiempo;
                const t = Math.min(elapsed / duracion, 1);
                const easing = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
                rotationDegrees = anguloInicial + (anguloObjetivo - anguloInicial) * easing;
                actualizarTransformEsfera();
                if (t < 1) {
                    requestAnimationFrame(animar);
                }
                else {
                    // Estado final
                    currentFundIndex = nuevoIndex;
                    actualizarOpacidadFondos(nuevoIndex); // Actualiza opacidades normales
                    actualizarCuadroInversion(nuevoIndex);
                    objeto4Rotation -= degreesPerStepObj4;
                    actualizarRotacionObjeto4();
                    const fondoActual = ciudades[nuevoIndex];
                    window.dispatchEvent(new CustomEvent("fondoCambiado", { detail: { fondo: fondoActual } }));
                    // Forzar opacidades exactas de todos los objetos incluyendo objeto7 y objeto9
                    if (typeof forzarOpacidades === "function") {
                        forzarOpacidades(nuevoIndex);
                    }
                }
            }
            requestAnimationFrame(animar);
        });
        // Controles de posición offset para esfera (sliders)
        const offsetXEsferaSlider = document.getElementById('offsetXEsfera');
        const offsetYEsferaSlider = document.getElementById('offsetYEsfera');
        const offsetXValueEsfera = document.getElementById('offsetXValueEsfera');
        const offsetYValueEsfera = document.getElementById('offsetYValueEsfera');
        const posAbsoluteEsfera = document.getElementById('posAbsoluteEsfera');
        function actualizarPosicionEsfera() {
            const offsetX = parseInt(offsetXEsferaSlider.value, 10);
            const offsetY = parseInt(offsetYEsferaSlider.value, 10);
            offsetXValueEsfera.textContent = offsetX.toString();
            offsetYValueEsfera.textContent = offsetY.toString();
            posicionarElemento(esfera, fixedPositions.esfera.x, fixedPositions.esfera.y, offsetX, offsetY);
            // Mostrar coordenadas absolutas relativas al contenedor
            const rect = esfera.getBoundingClientRect();
            const absX = rect.left - containerRect.left + rect.width / 2;
            const absY = rect.top - containerRect.top + rect.height / 2;
            posAbsoluteEsfera.textContent = `Coordenadas absolutas: (${Math.round(absX)} px, ${Math.round(absY)} px)`;
        }
        offsetXEsferaSlider.addEventListener('input', actualizarPosicionEsfera);
        offsetYEsferaSlider.addEventListener('input', actualizarPosicionEsfera);
        actualizarPosicionEsfera();
        // --- CONTROLES DE POSICIÓN PARA MANECILLAS ---
        const offsetXDiscoSlider = document.getElementById('offsetXDiscoMiniCentro');
        const offsetYDiscoSlider = document.getElementById('offsetYDiscoMiniCentro');
        const offsetXPunteroSlider = document.getElementById('offsetXPuntero');
        const offsetYPunteroSlider = document.getElementById('offsetYPuntero');
        function actualizarPosicion(elem, offsetX, offsetY) {
            elem.style.position = 'absolute';
            elem.style.left = `calc(50% + ${offsetX}px)`;
            elem.style.top = `calc(50% + ${offsetY}px)`;
            elem.style.transform = 'translate(-50%, -50%)';
        }
        function updateDisco() {
            actualizarPosicion(discominicentro, parseInt(offsetXDiscoSlider.value), parseInt(offsetYDiscoSlider.value));
        }
        function updatePuntero() {
            actualizarPosicion(puntero, parseInt(offsetXPunteroSlider.value), parseInt(offsetYPunteroSlider.value));
        }
        offsetXDiscoSlider.addEventListener('input', updateDisco);
        offsetYDiscoSlider.addEventListener('input', updateDisco);
        offsetXPunteroSlider.addEventListener('input', updatePuntero);
        offsetYPunteroSlider.addEventListener('input', updatePuntero);
        // Inicializar
        updateDisco();
        updatePuntero();
        function crearControlesManecilla(idPrefix, elem, fixedX, fixedY) {
            return {
                offsetXSlider: document.getElementById(`offsetX${idPrefix}`),
                offsetYSlider: document.getElementById(`offsetY${idPrefix}`),
                offsetXValue: document.getElementById(`offsetXValue${idPrefix}`),
                offsetYValue: document.getElementById(`offsetYValue${idPrefix}`),
                posAbsolute: document.getElementById(`posAbsolute${idPrefix}`),
                elem,
                fixedX,
                fixedY,
            };
        }
        const controlesManecillaHora = crearControlesManecilla('Hora', manecillaHora, fixedPositions.manecillas[0].x, fixedPositions.manecillas[0].y);
        const controlesManecillaMinuto = crearControlesManecilla('Minuto', manecillaMinuto, fixedPositions.manecillas[1].x, fixedPositions.manecillas[1].y);
        const controlesManecillaSegundo = crearControlesManecilla('Segundo', manecillaSegundo, fixedPositions.manecillas[2].x, fixedPositions.manecillas[2].y);
        const controlesManecillaAlma = crearControlesManecilla('Alma', manecillaAlma, fixedPositions.manecillas[3].x, fixedPositions.manecillas[3].y);
        function actualizarPosicionManecilla(ctrl) {
            const offsetX = parseInt(ctrl.offsetXSlider.value, 10);
            const offsetY = parseInt(ctrl.offsetYSlider.value, 10);
            ctrl.offsetXValue.textContent = offsetX.toString();
            ctrl.offsetYValue.textContent = offsetY.toString();
            posicionarElemento(ctrl.elem, ctrl.fixedX, ctrl.fixedY, offsetX, offsetY);
            // Mostrar coordenadas absolutas relativas al contenedor
            const rect = ctrl.elem.getBoundingClientRect();
            const absX = rect.left - containerRect.left + rect.width / 2;
            const absY = rect.top - containerRect.top + rect.height / 2;
            ctrl.posAbsolute.textContent = `Coordenadas absolutas: (${Math.round(absX)} px, ${Math.round(absY)} px)`;
        }
        function agregarListenersManecilla(ctrl) {
            ctrl.offsetXSlider.addEventListener('input', () => actualizarPosicionManecilla(ctrl));
            ctrl.offsetYSlider.addEventListener('input', () => actualizarPosicionManecilla(ctrl));
            actualizarPosicionManecilla(ctrl);
        }
        agregarListenersManecilla(controlesManecillaHora);
        agregarListenersManecilla(controlesManecillaMinuto);
        agregarListenersManecilla(controlesManecillaSegundo);
        agregarListenersManecilla(controlesManecillaAlma);
        // ==========================
        // ROTACION MANECILLAS SEGÚN HORA REAL
        // ==========================
        function actualizarManecillas() {
            const now = new Date();
            const horas = now.getHours() % 12;
            const minutos = now.getMinutes();
            const segundos = now.getSeconds();
            const milisegundos = now.getMilliseconds();
            const gradosHora = (horas * 30) + (minutos * 0.5);
            const gradosMinuto = (minutos * 6) + (segundos * 0.1);
            const gradosSegundo = (segundos * 6) + (milisegundos * 0.006);
            manecillaHora.style.transform = `translateX(-50%) rotate(${gradosHora}deg)`;
            manecillaMinuto.style.transform = `translateX(-50%) rotate(${gradosMinuto}deg)`;
            manecillaSegundo.style.transform = `translateX(-50%) rotate(${gradosSegundo}deg)`;
            //manecillaAlma.style.transform = `translateX(-50%) rotate(0deg)`;
            requestAnimationFrame(actualizarManecillas);
        }
        // ==== Animación oscilante para alma.svg ====
        const anguloInicialAlma = 90;
        // Ángulos límite que pueden cambiar dinámicamente
        let anguloTopeDerechaAlma = 130;
        let anguloTopeIzquierdaAlma = -130;
        let anguloActualAlma = anguloInicialAlma;
        let direccionAlma = 1; // 1 = girar hacia derecha, -1 = hacia izquierda
        const velocidadAngularAlma = 0.5; // Grados por frame (ajusta para velocidad)
        let gradosExtraDerecha = 20; // Ajusta este valor para probar
        let retornoReal = 0; // Valor real en % del retorno (ej: 27)
        let perdidaReal = 0; // Valor real en % de la pérdida (ej: -18)
        let porcentajeAlmaActual = 0; // porcentaje oscilante sincronizado con la aguja
        function animarAlma() {
            anguloActualAlma += direccionAlma * velocidadAngularAlma;
            const anguloMaxFisico = anguloTopeDerechaAlma + gradosExtraDerecha;
            if (anguloActualAlma >= anguloMaxFisico) {
                anguloActualAlma = anguloMaxFisico;
                direccionAlma = -1;
            }
            else if (anguloActualAlma <= anguloTopeIzquierdaAlma) {
                anguloActualAlma = anguloTopeIzquierdaAlma;
                direccionAlma = 1;
            }
            manecillaAlma.style.transform = `translateX(-50%) rotate(${anguloActualAlma}deg)`;
            // Actualizamos porcentajes
            const porcentajeNorm = calcularPorcentajeNormalizado(anguloActualAlma);
            porcentajeAlmaActual = calcularValorRealPorcentaje(anguloActualAlma);
            // Actualizar texto y color en pantalla
            if (porcentajeRealDiv) {
                porcentajeRealDiv.textContent = `${porcentajeAlmaActual.toFixed(1)}%`;
                porcentajeRealDiv.classList.remove('positivo', 'negativo');
                if (porcentajeAlmaActual >= 0) {
                    porcentajeRealDiv.classList.add('positivo');
                }
                else {
                    porcentajeRealDiv.classList.add('negativo');
                }
            }
            requestAnimationFrame(animarAlma);
        }
        function actualizarFecha() {
            const ahora = new Date();
            const diaMes = ahora.getDate(); // 1 a 31
            const diaSemana = ahora.getDay(); // 0 (domingo) a 6 (sábado)
            const mes = ahora.getMonth(); // 0 (enero) a 11 (diciembre)
            const anio = ahora.getFullYear();
            const rotatableDias = getRotatableDias();
            const rotatableDias2 = getRotatableDias2();
            const rotatableMeses = getRotatableMeses();
            const totalDiasMes = diasEnMes(mes, anio);
            // Offset X e Y para que pruebes valores de 0 a 6 (ajusta según necesites)
            const offsetXDia = 0;
            const offsetYDia = 0;
            const offsetXSemana = 0;
            const offsetYSemana = 0;
            const offsetXMes = 0;
            const offsetYMes = 0;
            const offsetDias = 3.38500 + offsetXDia; // Puedes ir cambiando 0 a 6
            const offsetSemana = 1 + offsetXSemana;
            const offsetMes = 0 + offsetXMes; // (usamos solo para consistencia, si necesitas luego se agrega)
            const diaMesIndex = (diaMes - offsetDias + totalDiasMes) % totalDiasMes;
            const diaSemanaIndex = (diaSemana - offsetSemana + 7) % 7;
            if (rotatableDias) {
                const objeto1Rotation = -(diaMesIndex * 360) / totalDiasMes + offsetYDia;
                rotatableDias.style.transformOrigin = '50% 50%';
                rotatableDias.style.transition = 'transform 0.5s ease-in-out';
                rotatableDias.style.transform = `rotate(${objeto1Rotation}deg)`;
                rotatableDias.style.opacity = '1';
            }
            if (rotatableDias2) {
                const rotacionSemana = -(diaSemanaIndex * 360) / 7 + offsetYSemana;
                rotatableDias2.style.transformOrigin = '50% 50%';
                rotatableDias2.style.transition = 'transform 0.5s ease-in-out';
                rotatableDias2.style.transform = `rotate(${rotacionSemana}deg)`;
                rotatableDias2.style.opacity = '1';
            }
            if (rotatableMeses) {
                const rotacionMes = -(mes * 360) / 12 + offsetYMes;
                rotatableMeses.style.transformOrigin = '50% 50%';
                rotatableMeses.style.transition = 'transform 0.5s ease-in-out';
                rotatableMeses.style.transform = `rotate(${rotacionMes}deg)`;
                rotatableMeses.style.opacity = '1';
            }
            // Calcular milisegundos hasta la próxima medianoche
            const ahoraMs = ahora.getTime();
            const medianoche = new Date(anio, mes, diaMes + 1, 0, 0, 0).getTime();
            const msHastaMedianoche = medianoche - ahoraMs;
            // Si faltan más de un minuto para medianoche, esperar solo 1 minuto para actualizar suave
            // Si falta menos de un minuto, sincronizar justo al cambio de día
            const siguienteTimeout = msHastaMedianoche > 30000 ? 30000 : msHastaMedianoche;
            setTimeout(actualizarFecha, siguienteTimeout);
        }
        actualizarManecillas();
        animarAlma();
        actualizarFecha(); // 1) Fija la fecha real primero
        inicializarRotaciones(); // 2) Inicializa rotaciones sin usar objeto1Rotation inicial
        // Activar rotación continua de objeto5
        animacionActivaObjeto5 = true;
        animarRotacionContinuaObjeto5();
        // ===========================
        // Inicializar rotaciones y posiciones de manera segura
        // ===========================
        function inicializarRotaciones() {
            actualizarTransformEsfera();
            // Esperar a que los discos existan y tengan dimensiones
            const rotDias = getRotatableDias();
            const rotDias2 = getRotatableDias2();
            const rotMeses = getRotatableMeses();
            // Función para asegurar que el primer disco tenga tamaño
            const centrarDia = () => {
                if (rotDias) {
                    const bbox = rotDias.getBBox();
                    if (bbox.width && bbox.height) {
                        // Ahora sí podemos centrar el día
                        rotDias.style.transformOrigin = '50% 50%';
                        rotDias.style.transition = 'transform 0.6s ease-in-out';
                        // Usa la rotación ya calculada al cargar
                        //rotDias.style.transform = `rotate(${objeto1Rotation}deg)`;
                        // Será reemplazado por actualizarFecha() inmediatamente
                    }
                    else {
                        // Reintentar en el siguiente frame si aún no tiene tamaño
                        requestAnimationFrame(centrarDia);
                    }
                }
            };
            requestAnimationFrame(centrarDia);
            // Para los demás discos no es crítico esperar dimensiones, pero se asegura consistencia
            if (rotDias2)
                actualizarRotacionObjeto2();
            if (rotMeses)
                actualizarRotacionObjeto3();
            actualizarRotacionObjeto4();
            // Posicionar objetos fijos y manecillas
            fixedPositions.objetos.forEach(({ elem, x, y }) => {
                posicionarElemento(elem, x, y, x - centerX, y - centerY);
            });
            fixedPositions.manecillas.forEach(({ elem, x, y }) => {
                posicionarElemento(elem, x, y, x - centerX, y - centerY);
            });
            posicionarElemento(cristal, fixedPositions.cristal.x, fixedPositions.cristal.y, fixedPositions.cristal.x - centerX, fixedPositions.cristal.y - centerY);
            cristal.style.transform = 'translate(-50%, -50%)';
            cristal.style.pointerEvents = 'none';
            cristal.style.position = 'absolute';
            cristal.style.zIndex = '999';
        }
        // ✅ Ejecutar inicialización
        inicializarRotaciones();
        fixedPositions.objetos.forEach(({ elem, x, y }) => {
            posicionarElemento(elem, x, y, x - centerX, y - centerY);
        });
        fixedPositions.manecillas.forEach(({ elem, x, y }) => {
            posicionarElemento(elem, x, y, x - centerX, y - centerY);
        });
        posicionarElemento(cristal, fixedPositions.cristal.x, fixedPositions.cristal.y, fixedPositions.cristal.x - centerX, fixedPositions.cristal.y - centerY);
        cristal.style.transform = 'translate(-50%, -50%)'; // Sin rotación, centrado
        cristal.style.pointerEvents = 'none'; // Para que no interfiera con clicks
        cristal.style.position = 'absolute'; // Por si no está ya en absolute
        cristal.style.zIndex = '999'; // Que quede encima de todo
        function actualizarPosicionYCoordenadas(elem, offsetX, offsetY, fixedX, fixedY, posAbsoluteElem) {
            // Posicionar el elemento en base a su offset y posición fija base
            elem.style.position = 'absolute';
            elem.style.left = `calc(50% + ${offsetX}px)`;
            elem.style.top = `calc(50% + ${offsetY}px)`;
            elem.style.transform = 'translate(-50%, -50%)';
            // Calcular coordenadas absolutas en pantalla
            const rect = elem.getBoundingClientRect();
            const absX = rect.left + rect.width / 2;
            const absY = rect.top + rect.height / 2;
            // Mostrar coordenadas absolutas en el elemento HTML correspondiente
            posAbsoluteElem.textContent = `Coordenadas absolutas: (${Math.round(absX)} px, ${Math.round(absY)} px)`;
        }
        actualizarCuadroInversion(currentFundIndex);
    });
});
