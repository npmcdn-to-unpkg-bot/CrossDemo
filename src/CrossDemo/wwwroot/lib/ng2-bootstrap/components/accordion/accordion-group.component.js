var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core', 'angular2/common', '../collapse'], function (require, exports, core_1, common_1, collapse_1) {
    var AccordionPanel = (function () {
        function AccordionPanel(accordion) {
            this.accordion = accordion;
        }
        Object.defineProperty(AccordionPanel.prototype, "isOpen", {
            get: function () {
                return this._isOpen;
            },
            set: function (value) {
                this._isOpen = value;
                if (value) {
                    this.accordion.closeOtherPanels(this);
                }
            },
            enumerable: true,
            configurable: true
        });
        AccordionPanel.prototype.ngOnInit = function () {
            this.panelClass = this.panelClass || 'panel-default';
            this.accordion.addGroup(this);
        };
        AccordionPanel.prototype.ngOnDestroy = function () {
            this.accordion.removeGroup(this);
        };
        AccordionPanel.prototype.toggleOpen = function (event) {
            event.preventDefault();
            if (!this.isDisabled) {
                this.isOpen = !this.isOpen;
            }
        };
        __decorate([
            core_1.Input()
        ], AccordionPanel.prototype, "heading");
        __decorate([
            core_1.Input()
        ], AccordionPanel.prototype, "panelClass");
        __decorate([
            core_1.Input()
        ], AccordionPanel.prototype, "isDisabled");
        Object.defineProperty(AccordionPanel.prototype, "isOpen",
            __decorate([
                core_1.HostBinding('class.panel-open'),
                core_1.Input()
            ], AccordionPanel.prototype, "isOpen", Object.getOwnPropertyDescriptor(AccordionPanel.prototype, "isOpen")));
        AccordionPanel = __decorate([
            core_1.Component({
                selector: 'accordion-group, accordion-panel',
                directives: [collapse_1.Collapse, common_1.NgClass],
                template: "\n    <div class=\"panel\" [ngClass]=\"panelClass\">\n      <div class=\"panel-heading\" (click)=\"toggleOpen($event)\">\n        <h4 class=\"panel-title\">\n          <a href tabindex=\"0\" class=\"accordion-toggle\">\n            <span *ngIf=\"heading\" [ngClass]=\"{'text-muted': isDisabled}\">{{heading}}</span>\n            <ng-content select=\"[accordion-heading]\"></ng-content>\n          </a>\n        </h4>\n      </div>\n      <div class=\"panel-collapse collapse\" [collapse]=\"!isOpen\">\n        <div class=\"panel-body\">\n          <ng-content></ng-content>\n        </div>\n      </div>\n    </div>\n  "
            })
        ], AccordionPanel);
        return AccordionPanel;
    })();
    exports.AccordionPanel = AccordionPanel;
});
