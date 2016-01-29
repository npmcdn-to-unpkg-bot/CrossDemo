var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core', 'angular2/common', '../common'], function (require, exports, core_1, common_1, common_2) {
    // todo: add active event to tab
    // todo: fix? mixing static and dynamic tabs position tabs in order of creation
    var Tabset = (function () {
        function Tabset() {
            this.tabs = [];
            this.classMap = {};
        }
        Object.defineProperty(Tabset.prototype, "vertical", {
            get: function () {
                return this._vertical;
            },
            set: function (value) {
                this._vertical = value;
                this.setClassMap();
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Tabset.prototype, "justified", {
            get: function () {
                return this._justified;
            },
            set: function (value) {
                this._justified = value;
                this.setClassMap();
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Tabset.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (value) {
                this._type = value;
                this.setClassMap();
            },
            enumerable: true,
            configurable: true
        });
        ;
        Tabset.prototype.setClassMap = function () {
            this.classMap = (_a = {
                    'nav-stacked': this.vertical,
                    'nav-justified': this.justified
                },
                _a['nav-' + (this.type || 'tabs')] = true,
                _a
            );
            var _a;
        };
        Tabset.prototype.ngOnInit = function () {
            this.type = this.type !== 'undefined' ? this.type : 'tabs';
        };
        Tabset.prototype.addTab = function (tab) {
            this.tabs.push(tab);
            tab.active = this.tabs.length === 1 && tab.active !== false;
        };
        Tabset.prototype.removeTab = function (tab) {
            var index = this.tabs.indexOf(tab);
            if (index === -1) {
                return;
            }
            // Select a new tab if the tab to be removed is selected and not destroyed
            if (tab.active && this.tabs.length > 1) {
                // If this is the last tab, select the previous tab. else, the next tab.
                var newActiveIndex = index === this.tabs.length - 1 ? index - 1 : index + 1;
                this.tabs[newActiveIndex].active = true;
            }
            this.tabs.slice(index, 1);
        };
        Object.defineProperty(Tabset.prototype, "vertical",
            __decorate([
                core_1.Input()
            ], Tabset.prototype, "vertical", Object.getOwnPropertyDescriptor(Tabset.prototype, "vertical")));
        Object.defineProperty(Tabset.prototype, "justified",
            __decorate([
                core_1.Input()
            ], Tabset.prototype, "justified", Object.getOwnPropertyDescriptor(Tabset.prototype, "justified")));
        Object.defineProperty(Tabset.prototype, "type",
            __decorate([
                core_1.Input()
            ], Tabset.prototype, "type", Object.getOwnPropertyDescriptor(Tabset.prototype, "type")));
        Tabset = __decorate([
            core_1.Component({
                selector: 'tabset',
                directives: [common_1.NgClass, common_2.NgTransclude],
                template: "\n    <ul class=\"nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"#tabz of tabs\" class=\"nav-item\"\n          [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\">\n          <a href class=\"nav-link\"\n            [class.active]=\"tabz.active\" [class.disabled]=\"tabz.disabled\"\n            (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
            })
        ], Tabset);
        return Tabset;
    })();
    exports.Tabset = Tabset;
});
