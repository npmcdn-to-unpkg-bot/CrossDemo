var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core'], function (require, exports, core_1) {
    var Slide = (function () {
        function Slide(carousel) {
            this.carousel = carousel;
            this.addClass = true;
        }
        Slide.prototype.ngOnInit = function () {
            this.carousel.addSlide(this);
        };
        Slide.prototype.ngOnDestroy = function () {
            this.carousel.removeSlide(this);
        };
        __decorate([
            core_1.Input()
        ], Slide.prototype, "index");
        __decorate([
            core_1.Input()
        ], Slide.prototype, "direction");
        __decorate([
            core_1.HostBinding('class.active'),
            core_1.Input()
        ], Slide.prototype, "active");
        __decorate([
            core_1.HostBinding('class.item'),
            core_1.HostBinding('class.carousel-item')
        ], Slide.prototype, "addClass");
        Slide = __decorate([
            core_1.Component({
                selector: 'slide',
                template: "\n    <div [class.active]=\"active\" class=\"item text-center\">\n      <ng-content></ng-content>\n    </div>\n  "
            })
        ], Slide);
        return Slide;
    })();
    exports.Slide = Slide;
});
