var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core', './tooltip-options.class', './tooltip-container.component'], function (require, exports, core_1, tooltip_options_class_1, tooltip_container_component_1) {
    var Tooltip = (function () {
        function Tooltip(element, loader) {
            this.element = element;
            this.loader = loader;
            this.placement = 'top';
            this.visible = false;
        }
        Tooltip.prototype.ngOnInit = function () {
        };
        // todo: filter triggers
        // params: event, target
        Tooltip.prototype.show = function () {
            var _this = this;
            if (this.visible) {
                return;
            }
            this.visible = true;
            var options = new tooltip_options_class_1.TooltipOptions({
                content: this.content,
                placement: this.placement
            });
            var binding = core_1.Injector.resolve([
                new core_1.Provider(tooltip_options_class_1.TooltipOptions, { useValue: options })
            ]);
            this.tooltip = this.loader
                .loadNextToLocation(tooltip_container_component_1.TooltipContainer, this.element, binding)
                .then(function (componentRef) {
                componentRef.instance.position(_this.element);
                return componentRef;
            });
        };
        // params event, target
        Tooltip.prototype.hide = function () {
            if (!this.visible) {
                return;
            }
            this.visible = false;
            this.tooltip.then(function (componentRef) {
                componentRef.dispose();
                return componentRef;
            });
        };
        __decorate([
            core_1.Input('tooltip')
        ], Tooltip.prototype, "content");
        __decorate([
            core_1.Input('tooltipPlacement')
        ], Tooltip.prototype, "placement");
        __decorate([
            core_1.Input('tooltipIsOpen')
        ], Tooltip.prototype, "isOpen");
        __decorate([
            core_1.Input('tooltipEnable')
        ], Tooltip.prototype, "enable");
        __decorate([
            core_1.Input('tooltipAppendToBody')
        ], Tooltip.prototype, "appendToBody");
        Object.defineProperty(Tooltip.prototype, "show",
            __decorate([
                core_1.HostListener('focusin', ['$event', '$target']),
                core_1.HostListener('mouseenter', ['$event', '$target'])
            ], Tooltip.prototype, "show", Object.getOwnPropertyDescriptor(Tooltip.prototype, "show")));
        Object.defineProperty(Tooltip.prototype, "hide",
            __decorate([
                core_1.HostListener('focusout', ['$event', '$target']),
                core_1.HostListener('mouseleave', ['$event', '$target'])
            ], Tooltip.prototype, "hide", Object.getOwnPropertyDescriptor(Tooltip.prototype, "hide")));
        Tooltip = __decorate([
            core_1.Directive({ selector: '[tooltip]' })
        ], Tooltip);
        return Tooltip;
    })();
    exports.Tooltip = Tooltip;
});
