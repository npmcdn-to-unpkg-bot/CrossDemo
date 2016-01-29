var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core', './progress.directive', './bar.component'], function (require, exports, core_1, progress_directive_1, bar_component_1) {
    var Progressbar = (function () {
        function Progressbar() {
        }
        __decorate([
            core_1.Input()
        ], Progressbar.prototype, "animate");
        __decorate([
            core_1.Input()
        ], Progressbar.prototype, "max");
        __decorate([
            core_1.Input()
        ], Progressbar.prototype, "type");
        __decorate([
            core_1.Input()
        ], Progressbar.prototype, "value");
        Progressbar = __decorate([
            core_1.Component({
                selector: 'progressbar, [progressbar]',
                directives: [progress_directive_1.Progress, bar_component_1.Bar],
                template: "\n    <div progress [animate]=\"animate\" [max]=\"max\">\n      <bar [type]=\"type\" [value]=\"value\">\n          <ng-content></ng-content>\n      </bar>\n    </div>\n  "
            })
        ], Progressbar);
        return Progressbar;
    })();
    exports.Progressbar = Progressbar;
});
