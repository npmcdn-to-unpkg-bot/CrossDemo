var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core'], function (require, exports, core_1) {
    // TODO: templateUrl?
    var Tab = (function () {
        function Tab(tabset) {
            this.tabset = tabset;
            this.select = new core_1.EventEmitter();
            this.deselect = new core_1.EventEmitter();
            this.addClass = true;
            this.tabset.addTab(this);
        }
        Object.defineProperty(Tab.prototype, "active", {
            /** tab active state toogle */
            get: function () {
                return this._active;
            },
            set: function (active) {
                var _this = this;
                if (this.disabled && active || !active) {
                    if (!active) {
                        this._active = active;
                    }
                    this.deselect.emit(this);
                    return;
                }
                this._active = active;
                this.select.emit(this);
                this.tabset.tabs.forEach(function (tab) {
                    if (tab !== _this) {
                        tab.active = false;
                    }
                });
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.ngOnDestroy = function () {
            this.tabset.removeTab(this);
        };
        __decorate([
            core_1.Input()
        ], Tab.prototype, "heading");
        __decorate([
            core_1.Input()
        ], Tab.prototype, "disabled");
        Object.defineProperty(Tab.prototype, "active",
            __decorate([
                core_1.HostBinding('class.active'),
                core_1.Input()
            ], Tab.prototype, "active", Object.getOwnPropertyDescriptor(Tab.prototype, "active")));
        __decorate([
            core_1.Output()
        ], Tab.prototype, "select");
        __decorate([
            core_1.Output()
        ], Tab.prototype, "deselect");
        __decorate([
            core_1.HostBinding('class.tab-pane')
        ], Tab.prototype, "addClass");
        Tab = __decorate([
            core_1.Directive({ selector: 'tab, [tab]' })
        ], Tab);
        return Tab;
    })();
    exports.Tab = Tab;
});
