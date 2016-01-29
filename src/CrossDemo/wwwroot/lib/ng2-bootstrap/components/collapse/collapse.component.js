var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core'], function (require, exports, core_1) {
    // todo: add animate
    // todo: add init and on change
    var Collapse = (function () {
        function Collapse() {
            // shown
            this.isExpanded = true;
            // hidden
            this.isCollapsed = false;
            // stale state
            this.isCollapse = true;
            // animation state
            this.isCollapsing = false;
        }
        Object.defineProperty(Collapse.prototype, "collapse", {
            get: function () {
                return this.isExpanded;
            },
            set: function (value) {
                this.isExpanded = value;
                this.toggle();
            },
            enumerable: true,
            configurable: true
        });
        Collapse.prototype.toggle = function () {
            if (this.isExpanded) {
                this.hide();
            }
            else {
                this.show();
            }
        };
        Collapse.prototype.hide = function () {
            var _this = this;
            this.isCollapse = false;
            this.isCollapsing = true;
            this.isExpanded = false;
            this.isCollapsed = true;
            setTimeout(function () {
                _this.height = '0';
                _this.isCollapse = true;
                _this.isCollapsing = false;
            }, 4);
        };
        Collapse.prototype.show = function () {
            var _this = this;
            this.isCollapse = false;
            this.isCollapsing = true;
            this.isExpanded = true;
            this.isCollapsed = false;
            setTimeout(function () {
                _this.height = 'auto';
                _this.isCollapse = true;
                _this.isCollapsing = false;
            }, 4);
        };
        __decorate([
            core_1.HostBinding('style.height')
        ], Collapse.prototype, "height");
        __decorate([
            core_1.HostBinding('class.in'),
            core_1.HostBinding('attr.aria-expanded')
        ], Collapse.prototype, "isExpanded");
        __decorate([
            core_1.HostBinding('attr.aria-hidden')
        ], Collapse.prototype, "isCollapsed");
        __decorate([
            core_1.HostBinding('class.collapse')
        ], Collapse.prototype, "isCollapse");
        __decorate([
            core_1.HostBinding('class.collapsing')
        ], Collapse.prototype, "isCollapsing");
        Object.defineProperty(Collapse.prototype, "collapse",
            __decorate([
                core_1.Input()
            ], Collapse.prototype, "collapse", Object.getOwnPropertyDescriptor(Collapse.prototype, "collapse")));
        Collapse = __decorate([
            core_1.Directive({ selector: '[collapse]' })
        ], Collapse);
        return Collapse;
    })();
    exports.Collapse = Collapse;
});
