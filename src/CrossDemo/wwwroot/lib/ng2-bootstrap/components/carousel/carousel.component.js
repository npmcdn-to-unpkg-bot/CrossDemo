// todo: add animate
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core', 'angular2/common', '../ng2-bootstrap-config'], function (require, exports, core_1, common_1, ng2_bootstrap_config_1) {
    (function (Direction) {
        Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
        Direction[Direction["NEXT"] = 1] = "NEXT";
        Direction[Direction["PREV"] = 2] = "PREV";
    })(exports.Direction || (exports.Direction = {}));
    var Direction = exports.Direction;
    var NAVIGATION = (_a = {},
        _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS4] = "\n    <a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n      <span class=\"icon-prev\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Previous</span>\n    </a>\n    <a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n      <span class=\"icon-next\" aria-hidden=\"true\"></span>\n      <span class=\"sr-only\">Next</span>\n    </a>\n  ",
        _a[ng2_bootstrap_config_1.Ng2BootstrapTheme.BS3] = "\n    <a class=\"left carousel-control\" (click)=\"prev()\" [hidden]=\"!slides.length\">\n      <span class=\"glyphicon glyphicon-chevron-left\"></span>\n    </a>\n    <a class=\"right carousel-control\" (click)=\"next()\" [hidden]=\"!slides.length\">\n      <span class=\"glyphicon glyphicon-chevron-right\"></span>\n    </a>\n  ",
        _a
    );
    // todo:
    // (ng-swipe-right)="prev()" (ng-swipe-left)="next()"
    var Carousel = (function () {
        function Carousel() {
            this.slides = [];
            this.destroyed = false;
        }
        Object.defineProperty(Carousel.prototype, "interval", {
            get: function () {
                return this._interval;
            },
            set: function (value) {
                this._interval = value;
                this.restartTimer();
            },
            enumerable: true,
            configurable: true
        });
        Carousel.prototype.ngOnDestroy = function () {
            this.destroyed = true;
        };
        Carousel.prototype.select = function (nextSlide, direction) {
            if (direction === void 0) { direction = Direction.UNKNOWN; }
            var nextIndex = nextSlide.index;
            if (direction === Direction.UNKNOWN) {
                direction = nextIndex > this.getCurrentIndex() ? Direction.NEXT : Direction.PREV;
            }
            // Prevent this user-triggered transition from occurring if there is already one in progress
            if (nextSlide && nextSlide !== this.currentSlide) {
                this.goNext(nextSlide, direction);
            }
        };
        Carousel.prototype.goNext = function (slide, direction) {
            if (this.destroyed) {
                return;
            }
            slide.direction = direction;
            slide.active = true;
            if (this.currentSlide) {
                this.currentSlide.direction = direction;
                this.currentSlide.active = false;
            }
            this.currentSlide = slide;
            // every time you change slides, reset the timer
            this.restartTimer();
        };
        Carousel.prototype.getSlideByIndex = function (index) {
            var len = this.slides.length;
            for (var i = 0; i < len; ++i) {
                if (this.slides[i].index === index) {
                    return this.slides[i];
                }
            }
        };
        Carousel.prototype.getCurrentIndex = function () {
            return !this.currentSlide ? 0 : this.currentSlide.index;
        };
        Carousel.prototype.next = function () {
            var newIndex = (this.getCurrentIndex() + 1) % this.slides.length;
            if (newIndex === 0 && this.noWrap) {
                this.pause();
                return;
            }
            return this.select(this.getSlideByIndex(newIndex), Direction.NEXT);
        };
        Carousel.prototype.prev = function () {
            var newIndex = this.getCurrentIndex() - 1 < 0 ? this.slides.length - 1 : this.getCurrentIndex() - 1;
            if (this.noWrap && newIndex === this.slides.length - 1) {
                this.pause();
                return;
            }
            return this.select(this.getSlideByIndex(newIndex), Direction.PREV);
        };
        Carousel.prototype.restartTimer = function () {
            var _this = this;
            this.resetTimer();
            var interval = +this.interval;
            if (!isNaN(interval) && interval > 0) {
                this.currentInterval = setInterval(function () {
                    var nInterval = +_this.interval;
                    if (_this.isPlaying && !isNaN(_this.interval) && nInterval > 0 && _this.slides.length) {
                        _this.next();
                    }
                    else {
                        _this.pause();
                    }
                }, interval);
            }
        };
        Carousel.prototype.resetTimer = function () {
            if (this.currentInterval) {
                clearInterval(this.currentInterval);
                this.currentInterval = null;
            }
        };
        Carousel.prototype.play = function () {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.restartTimer();
            }
        };
        Carousel.prototype.pause = function () {
            if (!this.noPause) {
                this.isPlaying = false;
                this.resetTimer();
            }
        };
        Carousel.prototype.addSlide = function (slide) {
            slide.index = this.slides.length;
            this.slides.push(slide);
            if (this.slides.length === 1 || slide.active) {
                this.select(this.slides[this.slides.length - 1]);
                if (this.slides.length === 1) {
                    this.play();
                }
            }
            else {
                slide.active = false;
            }
        };
        Carousel.prototype.removeSlide = function (slide) {
            this.slides.splice(slide.index, 1);
            if (this.slides.length === 0) {
                this.currentSlide = null;
                return;
            }
            for (var i = 0; i < this.slides.length; i++) {
                this.slides[i].index = i;
            }
        };
        __decorate([
            core_1.Input()
        ], Carousel.prototype, "noWrap");
        __decorate([
            core_1.Input()
        ], Carousel.prototype, "noPause");
        __decorate([
            core_1.Input()
        ], Carousel.prototype, "noTransition");
        Object.defineProperty(Carousel.prototype, "interval",
            __decorate([
                core_1.Input()
            ], Carousel.prototype, "interval", Object.getOwnPropertyDescriptor(Carousel.prototype, "interval")));
        Carousel = __decorate([
            core_1.Component({
                selector: 'carousel',
                directives: [common_1.NgFor],
                template: "\n    <div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" class=\"carousel slide\">\n      <ol class=\"carousel-indicators\" [hidden]=\"slides.length <= 1\">\n         <li *ngFor=\"#slidez of slides\" [class.active]=\"slidez.active === true\" (click)=\"select(slidez)\"></li>\n      </ol>\n      <div class=\"carousel-inner\"><ng-content></ng-content></div>\n      " + NAVIGATION[ng2_bootstrap_config_1.Ng2BootstrapConfig.theme] + "\n    </div>\n  "
            })
        ], Carousel);
        return Carousel;
    })();
    exports.Carousel = Carousel;
    var _a;
});
