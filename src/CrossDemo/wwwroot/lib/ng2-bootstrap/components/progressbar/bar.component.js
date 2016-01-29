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
    // todo: number pipe
    // todo: use query from progress?
    var Bar = (function () {
        function Bar(progress) {
            this.progress = progress;
            this.percent = 0;
        }
        Object.defineProperty(Bar.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (v) {
                if (!v && v !== 0) {
                    return;
                }
                this._value = v;
                this.recalculatePercentage();
            },
            enumerable: true,
            configurable: true
        });
        Bar.prototype.ngOnInit = function () {
            this.progress.addBar(this);
        };
        Bar.prototype.ngOnDestroy = function () {
            this.progress.removeBar(this);
        };
        Bar.prototype.recalculatePercentage = function () {
            this.percent = +(100 * this.value / this.progress.max).toFixed(2);
            var totalPercentage = this.progress.bars.reduce(function (total, bar) {
                return total + bar.percent;
            }, 0);
            if (totalPercentage > 100) {
                this.percent -= totalPercentage - 100;
            }
        };
        __decorate([
            core_1.Input()
        ], Bar.prototype, "type");
        Object.defineProperty(Bar.prototype, "value",
            __decorate([
                core_1.Input()
            ], Bar.prototype, "value", Object.getOwnPropertyDescriptor(Bar.prototype, "value")));
        Bar = __decorate([
            core_1.Component({
                selector: 'bar, [bar]',
                directives: [common_1.NgClass, common_1.NgStyle],
                template: "\n  <div class=\"progress-bar\"\n    style=\"min-width: 0;\"\n    role=\"progressbar\"\n    [ngClass]=\"type && 'progress-bar-' + type\"\n    [ngStyle]=\"{width: (percent < 100 ? percent : 100) + '%', transition: transition}\"\n    aria-valuemin=\"0\"\n    [attr.aria-valuenow]=\"value\"\n    [attr.aria-valuetext]=\"percent.toFixed(0) + '%'\"\n    [attr.aria-valuemax]=\"max\"\n    ><ng-content></ng-content></div>\n"
            }),
            __param(0, core_1.Host())
        ], Bar);
        return Bar;
    })();
    exports.Bar = Bar;
});
