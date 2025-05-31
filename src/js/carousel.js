// Inspiration: https://www.youtube.com/watch?v=WsH05CGMA7g

class Carousel {
    constructor(containerId, cardClass) {
        this.container = document.getElementById(containerId);
        this.slider = document.querySelectorAll(`.${cardClass}`);
        this.currItem = Math.floor(this.slider.length / 2);
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;

        this.init();
    }

    init() {
        this.slideShow();
        this.setupEventListeners();
    }

    slideShow() {
        this.slider[this.currItem].style.transform = `translate(0, -50%)`;
        this.slider[this.currItem].style.zIndex = 1;
        this.slider[this.currItem].style.filter = "none";
        this.slider[this.currItem].style.opacity = 1;

        let counter = 0;
        for (let i = this.currItem + 1; i < this.slider.length; i++) {
            counter++;
            this.slider[i].style.transform = `translate(${300 * counter}px, -50%) scale(${1 - 0.2 * counter}) perspective(20px) rotateY(-1deg)`;
            this.slider[i].style.zIndex = `${-counter}`;
            this.slider[i].style.filter = "brightness(70%)";
            this.slider[i].style.opacity = counter > 2 ? 0 : 1;
        }
        counter = 0;
        for (let i = this.currItem - 1; i >= 0; i--) {
            counter++;
            this.slider[i].style.transform = `translate(${-300 * counter}px, -50%) scale(${1 - 0.2 * counter}) perspective(20px) rotateY(1deg)`;
            this.slider[i].style.zIndex = `${-counter}`;
            this.slider[i].style.filter = "brightness(70%)";
            this.slider[i].style.opacity = counter > 2 ? 0 : 1;
        }
    }

    setupEventListeners() {
        // Mouse event handling
        this.container.addEventListener('mousedown', this.dragStart.bind(this));
        this.container.addEventListener('mousemove', this.drag.bind(this));
        this.container.addEventListener('mouseup', this.dragEnd.bind(this));
        this.container.addEventListener('mouseleave', this.dragEnd.bind(this));

        // Touch event handling
        this.container.addEventListener('touchstart', this.dragStart.bind(this));
        this.container.addEventListener('touchmove', this.drag.bind(this));
        this.container.addEventListener('touchend', this.dragEnd.bind(this));
    }

    dragStart(event) {
        this.isDragging = true;
        this.startPos = this.getPositionX(event);
        this.container.style.cursor = 'grabbing';
    }

    drag(event) {
        if (!this.isDragging) return;
        event.preventDefault();
        const currentPosition = this.getPositionX(event);
        const diff = currentPosition - this.startPos;
        
        if (Math.abs(diff) > 50) { // 50px threshold to change slide
            if (diff > 0 && this.currItem > 0) {
                this.currItem--;
                this.slideShow();
                this.isDragging = false;
            } else if (diff < 0 && this.currItem < this.slider.length - 1) {
                this.currItem++;
                this.slideShow();
                this.isDragging = false;
            }
        }
    }

    dragEnd() {
        this.isDragging = false;
        this.container.style.cursor = 'grab';
    }

    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }
}

// Initialize carousels
const carousel = new Carousel("carousel-container", "card");
const resumeCarousel = new Carousel("carousel-container-resume", "card-resume");