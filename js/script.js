// ============================================
// CONFIGURACIÓN - PERSONALIZA AQUÍ
// ============================================

const PERSONA = {
    nombre: "Amarilla", // Cambia esto
    fotos: {
        principal: "imagenes/principal.jpg",
        galeria: [
            "imagenes/momento-1.jpg",
            "imagenes/momento-2.jpg"
        ]
    },
    
    // BANCO DE SORPRESAS - Agrega tantas como quieras
    sorpresas: {
        mensajes: [
            "Amarilla pela procuraa.",
            "Eres esa persona que vale la pena, trabaja en ti mismo mi reina.",
            "No dejes que alguien mas te imponga que gacer, por eso debes trabajar para tener lo tuyo.",
            "Amate como si tu vida dependiera de eso, y q crees es asi flaka.",
            "Tienes un corazón que no le cabe en el pecho, flojo pero ahi esta.",
            "No le muestres esto a mariana.",
            "Dios ya deja de escuchar tanto ventura.",
            "Eres un universo entero por descubrir, dejate descubrir.",
        ],
        
        caracteristicas: [
            "Creatividad infinita: Siempre encuentras formas únicas de resolver cualquier problema ignorar todo.",
            "Resiliencia: Te caes siete veces, y siete veces te quedas callada.",
            "Inteligencia emocional: Literal no reaccionas aveces eso me atemorisa.",
            "Generosidad: nunca me diste a probar una arepa.",
            "Autenticidad: Nunca pretendes ser quien no eres osea siempre con flojera.",
            "Optimismo: Encuentras el lado fatal diosss.",
            "Determinación: Cuando te propones algo lo haces con flojera pero llegas.",
        ],
        
        recuerdos: [
            "Cada vez que miraba para atras andabas con una arepa en la boca.",
            "Hablando de las mujeres de orlando jajaja.",
            "Cuando te pedi el cuaderno de matematicas de Urvina, andaba atrazado gracias amarilla.",
            "huy no tu musica toda triste ,,, noooo.",
            "Joda la cara de trasnocho con la que vivias.",
            "Cuando saliamos del colegio en la moto la yenis, mariana y tu.",
            "No se porque ecgaron a urvina.",
            "Joda yo si le tenia miedo a tu hermana veee.",
            "la forma de caminar sin espiritu q tenias jajaj.",
            "imaginate la chacho que no le gustaban los negros y se va a cazar con uno jajaja."
        ]
    }
};

// ============================================
// SISTEMA DE AUDIO
// ============================================

class AudioController {
    constructor() {
        this.audio = document.getElementById('audioFondo');
        this.btn = document.getElementById('btnAudio');
        this.reproduciendo = false;
        
        this.init();
    }
    
    init() {
        this.btn.addEventListener('click', () => this.toggle());
        
        // Intentar autoplay
        this.audio.volume = 0.4;
        this.audio.play().then(() => {
            this.reproduciendo = true;
            this.actualizarUI();
        }).catch(() => {
            // Esperar interacción
        });
    }
    
    toggle() {
        if (this.reproduciendo) {
            this.audio.pause();
            this.reproduciendo = false;
        } else {
            this.audio.play();
            this.reproduciendo = true;
        }
        this.actualizarUI();
    }
    
    actualizarUI() {
        if (this.reproduciendo) {
            this.btn.classList.add('reproduciendo');
        } else {
            this.btn.classList.remove('reproduciendo');
        }
    }
}

// ============================================
// NAVEGACIÓN
// ============================================

class Navegacion {
    constructor() {
        this.pantallaInicio = document.getElementById('pantallaInicio');
        this.pantallaPrincipal = document.getElementById('pantallaPrincipal');
        this.btnEntrar = document.getElementById('btnEntrar');
        this.navItems = document.querySelectorAll('.nav-item');
        this.secciones = document.querySelectorAll('.seccion');
        
        this.init();
    }
    
    init() {
        // Entrar al universo
        this.btnEntrar.addEventListener('click', () => {
            this.pantallaInicio.classList.remove('pantalla-activa');
            this.pantallaPrincipal.classList.add('pantalla-activa');
            
            // Iniciar audio si no se ha hecho
            if (window.audioController && !window.audioController.reproduciendo) {
                window.audioController.audio.play().catch(() => {});
            }
        });
        
        // Navegación entre secciones
        this.navItems.forEach(item => {
            item.addEventListener('click', () => {
                const seccionId = item.dataset.seccion;
                this.cambiarSeccion(seccionId, item);
            });
        });
    }
    
    cambiarSeccion(seccionId, navItem) {
        // Actualizar nav
        this.navItems.forEach(n => n.classList.remove('activo'));
        navItem.classList.add('activo');
        
        // Actualizar sección
        this.secciones.forEach(s => s.classList.remove('seccion-activa'));
        document.getElementById(`seccion${seccionId.charAt(0).toUpperCase() + seccionId.slice(1)}`).classList.add('seccion-activa');
    }
}

// ============================================
// GALERÍA
// ============================================

class Galeria {
    constructor() {
        this.items = document.querySelectorAll('.item-galeria');
        this.modal = document.getElementById('modalImagen');
        this.imgModal = document.getElementById('imgModal');
        this.btnCerrar = document.querySelector('.btn-cerrar-modal');
        
        this.init();
    }
    
    init() {
        this.items.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img').src;
                this.abrirModal(img);
            });
        });
        
        this.btnCerrar.addEventListener('click', () => this.cerrarModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.cerrarModal();
        });
    }
    
    abrirModal(src) {
        this.imgModal.src = src;
        this.modal.classList.remove('hidden');
    }
    
    cerrarModal() {
        this.modal.classList.add('hidden');
    }
}

// ============================================
// MÁQUINA DE SORPRESAS
// ============================================

class MaquinaSorpresas {
    constructor() {
        this.btnGenerar = document.getElementById('btnGenerar');
        this.slotMachine = document.getElementById('slotMachine');
        this.resultado = document.getElementById('resultadoSorpresa');
        this.tarjeta = document.getElementById('tarjetaResultado');
        this.contenido = document.getElementById('contenidoResultado');
        this.categoria = document.getElementById('categoriaTag');
        this.btnGuardar = document.getElementById('btnGuardar');
        this.coleccion = document.getElementById('gridColeccion');
        
        this.sorpresasGuardadas = [];
        this.animando = false;
        
        this.init();
    }
    
    init() {
        this.btnGenerar.addEventListener('click', () => this.generar());
        this.btnGuardar.addEventListener('click', () => this.guardar());
    }
    
    async generar() {
        if (this.animando) return;
        this.animando = true;
        
        // Ocultar resultado anterior
        this.resultado.classList.add('hidden');
        
        // Animar slot machine
        await this.animarSlots();
        
        // Seleccionar sorpresa
        const tipos = ['mensaje', 'caracteristica', 'recuerdo'];
        const tipo = tipos[Math.floor(Math.random() * tipos.length)];
        const banco = PERSONA.sorpresas[`${tipo}s`];
        const sorpresa = banco[Math.floor(Math.random() * banco.length)];
        
        // Mostrar resultado
        this.mostrarResultado(tipo, sorpresa);
        
        this.animando = false;
    }
    
    animarSlots() {
        return new Promise(resolve => {
            const items = this.slotMachine.querySelectorAll('.slot-item');
            let vueltas = 0;
            const maxVueltas = 15;
            let velocidad = 100;
            
            const animar = () => {
                // Quitar activo actual
                items.forEach(i => i.classList.remove('activo'));
                
                // Activar aleatorio
                const random = Math.floor(Math.random() * items.length);
                items[random].classList.add('activo');
                
                vueltas++;
                
                if (vueltas < maxVueltas) {
                    // Ir frenando
                    if (vueltas > maxVueltas - 5) {
                        velocidad += 50;
                    }
                    setTimeout(animar, velocidad);
                } else {
                    // Dejar el que corresponde al tipo seleccionado
                    items.forEach(i => i.classList.remove('activo'));
                    const tipoSeleccionado = ['mensaje', 'caracteristica', 'recuerdo'][Math.floor(Math.random() * 3)];
                    document.querySelector(`[data-tipo="${tipoSeleccionado}"]`).classList.add('activo');
                    setTimeout(resolve, 300);
                }
            };
            
            animar();
        });
    }
    
    mostrarResultado(tipo, contenido) {
        this.tarjeta.dataset.categoria = tipo;
        this.categoria.textContent = tipo;
        this.contenido.textContent = contenido;
        
        this.resultado.classList.remove('hidden');
        
        // Scroll al resultado
        this.resultado.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    guardar() {
        const tipo = this.tarjeta.dataset.categoria;
        const contenido = this.contenido.textContent;
        
        // Agregar a colección
        this.sorpresasGuardadas.push({ tipo, contenido });
        
        // Renderizar
        this.renderizarColeccion();
        
        // Feedback
        this.btnGuardar.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>¡Guardado!</span>
        `;
        
        setTimeout(() => {
            this.btnGuardar.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                <span>Guardar esta sorpresa</span>
            `;
        }, 2000);
    }
    
    renderizarColeccion() {
        this.coleccion.innerHTML = '';
        
        this.sorpresasGuardadas.forEach((s, index) => {
            const item = document.createElement('div');
            item.className = 'item-coleccion';
            item.style.animationDelay = `${index * 0.1}s`;
            item.innerHTML = `
                <span class="tag-mini ${s.tipo}">${s.tipo}</span>
                <p class="texto-coleccion">${s.contenido}</p>
            `;
            this.coleccion.appendChild(item);
        });
    }
}

// ============================================
// BARRAS DE PROGRESO (ESENCIA)
// ============================================

class BarrasProgreso {
    constructor() {
        this.barras = document.querySelectorAll('.barra-progreso');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const valor = entry.target.dataset.valor;
                    entry.target.style.setProperty('--valor', `${valor}%`);
                }
            });
        }, { threshold: 0.5 });
        
        this.barras.forEach(barra => observer.observe(barra));
    }
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Reemplazar nombre en el HTML
    document.querySelectorAll('.nombre-highlight, .nombre-principal').forEach(el => {
        el.textContent = el.textContent.replace('[Nombre]', PERSONA.nombre);
    });
    
    // Inicializar sistemas
    window.audioController = new AudioController();
    new Navegacion();
    new Galeria();
    new MaquinaSorpresas();
    new BarrasProgreso();
});