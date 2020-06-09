import { TweenMax, TimelineMax, Power2, Power1, TweenLite } from 'gsap';

class menuImageAnimation {
    constructor() {
        this.el = document.querySelector('.header');
        this._setup();
        this._setupEventListener();
    }

    _setup() {
        this._ui = {
            animationContainer: this.el.querySelector('.navbar'),
            imageAnimationContainer: this.el.querySelector('.menu__image-container'),
            nextImageContainer: this.el.querySelector(".next-image"),
            currentImageContainer: this.el.querySelector(".current-image"),
            nextImage: this.el.querySelector(".next-image .menu__image"),
            currentImage: this.el.querySelector(".current-image .menu__image"),
            listMenu: this.el.querySelector(".navbar__list"),
            listItemMenu: this.el.querySelectorAll(".navbar__list-item"),

        }

        this.mouse = { x: 0, y: 0 };
        this._setupTween();
    }

    _setupTween() {
        this.tl = new TimelineMax({ paused: true, onComplete: () => { this._onCompleteIntro() } });
        this.tl.fromTo(this._ui.nextImageContainer, 1, { height: 0 }, { height: 350, ease: Power2.easeInOut }, 0)

    }

    _setupEventListener() {
        this._ui.animationContainer.addEventListener('mousemove', (event) => this._mouseFollow(event));

        for (let index = 0; index < this._ui.listItemMenu.length; index++) {
            if (this._ui.listItemMenu[index].hasAttribute("data-image")){
                this._ui.listItemMenu[index].addEventListener('mouseenter', () => { this._mouseEnterFunction(index) });
            } else
            {
                this._ui.listItemMenu[index].addEventListener('mouseenter', () => this._leaveContainer());
            }

        }

        this._ui.listMenu.addEventListener('mouseleave', () => this._leaveContainer());

    }

    _mouseEnterFunction(index) {
        TweenMax.to(this._ui.imageAnimationContainer, .5, { autoAlpha: .7, ease: Power1.easeInOut });
        if (this._ui.currentImage.src === "") {
            this._firstImageAnimation(index);
        } else {
            this._imageAnimation(index);
        }
    }


    _firstImageAnimation(index) {
        this._ui.currentImage.style.opacity = 0;
        this._ui.nextImage.src = this._ui.listItemMenu[index].dataset.image;
        this.currentImageLink = this._ui.listItemMenu[index].dataset.image;
        this._ui.currentImage.src = this.currentImageLink;

        this.tl.play();
    }

    _leaveContainer() {
        TweenMax.to(this._ui.imageAnimationContainer, .5,
            {
                autoAlpha: 0,
                onComplete: () => {
                    this._ui.currentImage.src = "";
                    this._ui.nextImage.src = "";
                },
                ease: Power1.easeInOut
            }
        );
    }

    _onCompleteIntro() {
        this._ui.currentImage.src = this.currentImageLink;
        this._ui.currentImage.style.opacity = 1
    }

    _onCompleteImageChange() {
        this._ui.currentImage.src = this.currentImageLink
    }

    _imageAnimation(index) {
        this.currentImageLink = this._ui.listItemMenu[index].dataset.image;
        this._ui.nextImage.src = this._ui.listItemMenu[index].dataset.image;
        TweenLite.fromTo(this._ui.nextImageContainer, 1, { height: 0, ease: Power2.easeInOut }, { height: 350, ease: Power2.easeInOut, onComplete: () => this._onCompleteImageChange() }, 0);

    }

    _mouseFollow(event) {
        let imageAnimationContainerBounds = this._ui.imageAnimationContainer.getBoundingClientRect();

        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY - this.el.getBoundingClientRect().y;


        TweenMax.to(this._ui.imageAnimationContainer, 0.7, { x: this.mouse.x - (imageAnimationContainerBounds.width / 2), y: this.mouse.y - (imageAnimationContainerBounds.height / 2), ease: Power2.easeInCubic })
    }

}

export default menuImageAnimation;