var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
define(["require", "exports", 'angular2/core', 'angular2/common'], function (require, exports, core_1, common_1) {
    var Rating = (function () {
        function Rating(cd) {
            this.cd = cd;
            this.onHover = new core_1.EventEmitter();
            this.onLeave = new core_1.EventEmitter();
            this.onChange = function (_) {
            };
            this.onTouched = function () {
            };
            cd.valueAccessor = this;
        }
        Rating.prototype.onKeydown = function (event) {
            if ([37, 38, 39, 40].indexOf(event.which) === -1) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            var sign = event.which === 38 || event.which === 39 ? 1 : -1;
            this.rate(this.value + sign);
        };
        Rating.prototype.ngOnInit = function () {
            this.max = typeof this.max !== 'undefined' ? this.max : 5;
            this.readonly = this.readonly === true;
            this.stateOn = typeof this.stateOn !== 'undefined' ? this.stateOn : 'glyphicon-star';
            this.stateOff = typeof this.stateOff !== 'undefined' ? this.stateOff : 'glyphicon-star-empty';
            this.titles = typeof this.titles !== 'undefined' && this.titles.length > 0 ? this.titles : ['one', 'two', 'three', 'four', 'five'];
            this.range = this.buildTemplateObjects(this.ratingStates, this.max);
        };
        // model -> view
        Rating.prototype.writeValue = function (value) {
            if (value % 1 !== value) {
                this.value = Math.round(value);
                this.preValue = value;
                return;
            }
            this.preValue = value;
            this.value = value;
        };
        Rating.prototype.buildTemplateObjects = function (ratingStates, max) {
            ratingStates = ratingStates || [];
            var count = ratingStates.length || max;
            var result = [];
            for (var i = 0; i < count; i++) {
                result.push(Object.assign({
                    index: i,
                    stateOn: this.stateOn,
                    stateOff: this.stateOff,
                    title: this.titles[i] || i + 1
                }, ratingStates[i] || {}));
            }
            return result;
        };
        Rating.prototype.rate = function (value) {
            if (!this.readonly && value >= 0 && value <= this.range.length) {
                this.writeValue(value);
                this.cd.viewToModelUpdate(value);
            }
        };
        Rating.prototype.enter = function (value) {
            if (!this.readonly) {
                this.value = value;
                this.onHover.next(value);
            }
        };
        Rating.prototype.reset = function () {
            this.value = this.preValue;
            this.onLeave.next(this.value);
        };
        Rating.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        Rating.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        __decorate([
            core_1.Input()
        ], Rating.prototype, "max");
        __decorate([
            core_1.Input()
        ], Rating.prototype, "stateOn");
        __decorate([
            core_1.Input()
        ], Rating.prototype, "stateOff");
        __decorate([
            core_1.Input()
        ], Rating.prototype, "readonly");
        __decorate([
            core_1.Input()
        ], Rating.prototype, "titles");
        __decorate([
            core_1.Input()
        ], Rating.prototype, "ratingStates");
        __decorate([
            core_1.Output()
        ], Rating.prototype, "onHover");
        __decorate([
            core_1.Output()
        ], Rating.prototype, "onLeave");
        Object.defineProperty(Rating.prototype, "onKeydown",
            __decorate([
                core_1.HostListener('keydown', ['$event'])
            ], Rating.prototype, "onKeydown", Object.getOwnPropertyDescriptor(Rating.prototype, "onKeydown")));
        Rating = __decorate([
            core_1.Component({
                selector: 'rating[ngModel]',
                directives: [common_1.NgFor],
                template: "\n    <span (mouseleave)=\"reset()\" (keydown)=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" [attr.aria-valuemax]=\"range.length\" [attr.aria-valuenow]=\"value\">\n      <template ngFor #r [ngForOf]=\"range\" #index=\"index\">\n        <span class=\"sr-only\">({{ index < value ? '*' : ' ' }})</span>\n        <i (mouseenter)=\"enter(index + 1)\" (click)=\"rate(index + 1)\" class=\"glyphicon\" [ngClass]=\"index < value ? r.stateOn : r.stateOff\" [title]=\"r.title\" ></i>\n      </template>\n    </span>\n  "
            }),
            __param(0, core_1.Self())
        ], Rating);
        return Rating;
    })();
    exports.Rating = Rating;
});
