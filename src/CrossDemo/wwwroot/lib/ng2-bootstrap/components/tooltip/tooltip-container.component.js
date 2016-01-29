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
define(["require", "exports", 'angular2/core', 'angular2/common', '../position', './tooltip-options.class'], function (require, exports, core_1, common_1, position_1, tooltip_options_class_1) {
    var TooltipContainer = (function () {
        function TooltipContainer(element, options) {
            this.element = element;
            Object.assign(this, options);
            this.classMap = { 'in': false };
            this.classMap[options.placement] = true;
        }
        TooltipContainer.prototype.position = function (hostEl) {
            this.display = 'block';
            this.top = '0px';
            this.left = '0px';
            var p = position_1.positionService
                .positionElements(hostEl.nativeElement, this.element.nativeElement.children[0], this.placement, this.appendToBody);
            this.top = p.top + 'px';
            this.left = p.left + 'px';
            this.classMap['in'] = true;
        };
        TooltipContainer = __decorate([
            core_1.Component({
                selector: 'tooltip-container',
                directives: [common_1.NgClass, common_1.NgStyle],
                template: "\n    <div class=\"tooltip\" role=\"tooltip\"\n     [ngStyle]=\"{top: top, left: left, display: display}\"\n     [ngClass]=\"classMap\" >\n      <div class=\"tooltip-arrow\"></div>\n      <div class=\"tooltip-inner\">\n        {{content}}\n      </div>\n    </div>"
            }),
            __param(1, core_1.Inject(tooltip_options_class_1.TooltipOptions))
        ], TooltipContainer);
        return TooltipContainer;
    })();
    exports.TooltipContainer = TooltipContainer;
});
