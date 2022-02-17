            // ******** CODE POUR PARALLAX ********//
            // ************************************//

// On calcule la position de l'élement par rapport au haut de la page
// Fonction récurcive
function offsetTop(element, acc = 0) {
    if(element.offsetParent) {
        return offsetTop(element.offsetParent, acc + element.offsetTop)
    }
    return acc + element.offsetTop;
}

class Parallax {
    // @param {HTMLElement} element
    constructor(element) {
        this.element = element;
        this.ratio = parseFloat(element.dataset.parallax);
        this.onScroll = this.onScroll.bind(this)
        // On créer une variable pour voir si l'élement est affiché
        this.onIntersection = this.onIntersection.bind(this)
        this.elementY = offsetTop(this.element) + this.element.offsetHeight / 2;
        const observer = new IntersectionObserver(this.onIntersection)
        observer.observe(element)
        this.onScroll()
    }

    // @param {IntersectionObserverEntry[]} entries
    // On utilise le tableau en entrée
    onIntersection(entries) {
        // On regarde si l'élement entre en colision avec la page
        for (const entry of entries) {
            // Si c'est le cas on lance le listener, sinon on l'enlève.
            if (entry.isIntersecting) {
                document.addEventListener("scroll", this.onScroll)
            } else {
                document.removeEventListener("scroll", this.onScroll)
            }
        }
    }

    onScroll() {
        window.requestAnimationFrame(() => {
            console.log(this.element.getAttribute("class"));
            // On crée une valeur de haut de fenetre sur la page comme référence.
            const screenY = window.scrollY + window.innerHeight / 2;
            const diffY = this.elementY-screenY
            this.element.style.setProperty(
                "transform", 
                `translateY(${diffY * -1 * this.ratio}px)`
            );
        });
    }

    // @returns {parallax}
    static bind() {
        // On va chercher tout les élements avec data parallax
        // On fait un tableau de tous les élements avec data-parallax (from HTML)
        Array.from(document.querySelectorAll("[data-parallax")).map(
            (element) => {
            return new Parallax(element);
            }
        );
    }
}

Parallax.bind();