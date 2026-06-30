/******************************************************************************
 STAMPIFY Slider Engine
 Version : 5.0.0
******************************************************************************/

class StampifySlider {

    constructor() {

        this.slider = document.querySelector(".red-slider");
        this.track = document.querySelector(".red-slider-track");

        this.slides = [...document.querySelectorAll(".red-slide")];

        this.prevButton = document.querySelector(".red-prev");
        this.nextButton = document.querySelector(".red-next");

        this.current = 0;
        this.total = this.slides.length;

        this.timer = null;

        this.init();

    }

    init() {

        if (!this.slider || this.total === 0) return;

        this.bindEvents();

        this.render();

        if (SliderConfig.AUTO_PLAY) {

            this.startAutoPlay();

        }

    }

    bindEvents() {

        if (this.prevButton) {

            this.prevButton.addEventListener("click", () => {

                this.prev();

            });

        }

        if (this.nextButton) {

            this.nextButton.addEventListener("click", () => {

                this.next();

            });

        }

        window.addEventListener("resize", () => {

            this.render();

        });

    }

    startAutoPlay() {

        this.stopAutoPlay();

        this.timer = setInterval(() => {

            this.next(false);

        }, SliderConfig.INTERVAL);

    }

    stopAutoPlay() {

        if (this.timer) {

            clearInterval(this.timer);

            this.timer = null;

        }

    }

    resetAutoPlay() {

        if (!SliderConfig.AUTO_PLAY) return;

        this.startAutoPlay();

    }

    next(resetTimer = true) {

        this.current++;

        if (this.current >= this.total) {

            this.current = SliderConfig.LOOP
                ? 0
                : this.total - 1;

        }

        this.render();

        if (resetTimer) {

            this.resetAutoPlay();

        }

    }

    prev(resetTimer = true) {

        this.current--;

        if (this.current < 0) {

            this.current = SliderConfig.LOOP
                ? this.total - 1
                : 0;

        }

        this.render();

        if (resetTimer) {

            this.resetAutoPlay();

        }

    }

    render() {

        this.slides.forEach(slide => {

            slide.classList.remove(
                "left",
                "center",
                "right",
                "hidden"
            );

        });

        const left =
            (this.current - 1 + this.total) % this.total;

        const center =
            this.current;

        const right =
            (this.current + 1) % this.total;

        this.slides.forEach((slide, index) => {

            if (index === center) {

                slide.classList.add("center");

            }

            else if (index === left) {

                slide.classList.add("left");

            }

            else if (index === right) {

                slide.classList.add("right");

            }

            else {

                slide.classList.add("hidden");

            }

        });

    }

    destroy() {

        this.stopAutoPlay();

    }

}

document.addEventListener("DOMContentLoaded", () => {

    new StampifySlider();

});
