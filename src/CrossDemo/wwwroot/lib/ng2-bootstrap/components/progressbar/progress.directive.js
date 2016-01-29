var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core'], function (require, exports, core_1) {
    var progressConfig = {
        animate: true,
        max: 100
    };
    // todo: progress element conflict with bootstrap.css
    // todo: need hack: replace host element with div
    var Progress = (function () {
        function Progress() {
            this.addClass = 'progress';
            this.bars = [];
        }
        Object.defineProperty(Progress.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (v) {
                this._max = v;
                this.bars.forEach(function (bar) {
                    bar.recalculatePercentage();
                });
            },
            enumerable: true,
            configurable: true
        });
        Progress.prototype.ngOnInit = function () {
            this.animate = this.animate !== false;
            this.max = typeof this.max === 'number' ? this.max : progressConfig.max;
        };
        Progress.prototype.addBar = function (bar) {
            if (!this.animate) {
                bar.transition = 'none';
            }
            this.bars.push(bar);
        };
        Progress.prototype.removeBar = function (bar) {
            this.bars.splice(this.bars.indexOf(bar), 1);
        };
        __decorate([
            core_1.Input()
        ], Progress.prototype, "animate");
        Object.defineProperty(Progress.prototype, "max",
            __decorate([
                core_1.HostBinding('attr.max'),
                core_1.Input()
            ], Progress.prototype, "max", Object.getOwnPropertyDescriptor(Progress.prototype, "max")));
        __decorate([
            core_1.HostBinding('class')
        ], Progress.prototype, "addClass");
        Progress = __decorate([
            core_1.Directive({ selector: 'bs-progress, [progress]' })
        ], Progress);
        return Progress;
    })();
    exports.Progress = Progress;
});
