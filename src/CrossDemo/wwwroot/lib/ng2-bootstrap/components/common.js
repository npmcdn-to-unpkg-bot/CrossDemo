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
define(["require", "exports", 'angular2/core'], function (require, exports, core_1) {
    var NgTransclude = (function () {
        function NgTransclude(viewRef) {
            this.viewRef = viewRef;
        }
        Object.defineProperty(NgTransclude.prototype, "ngTransclude", {
            get: function () {
                return this._ngTransclude;
            },
            set: function (templateRef) {
                this._ngTransclude = templateRef;
                if (templateRef) {
                    this.viewRef.createEmbeddedView(templateRef);
                }
            },
            enumerable: true,
            configurable: true
        });
        NgTransclude = __decorate([
            core_1.Directive({
                selector: '[ngTransclude]',
                properties: ['ngTransclude']
            }),
            __param(0, core_1.Inject(core_1.ViewContainerRef))
        ], NgTransclude);
        return NgTransclude;
    })();
    exports.NgTransclude = NgTransclude;
});
