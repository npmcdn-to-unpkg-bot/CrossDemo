define(["require", "exports", './carousel/slide.component', './carousel/carousel.component', './carousel/slide.component', './carousel/carousel.component'], function (require, exports, slide_component_1, carousel_component_1, slide_component_2, carousel_component_2) {
    exports.Slide = slide_component_2.Slide;
    exports.Carousel = carousel_component_2.Carousel;
    exports.CAROUSEL_DIRECTIVES = [carousel_component_1.Carousel, slide_component_1.Slide];
});
