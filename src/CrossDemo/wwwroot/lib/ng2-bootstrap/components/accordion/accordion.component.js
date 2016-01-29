var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core'], function (require, exports, core_1) {
    // todo: support template url
    var Accordion = (function () {
        function Accordion() {
            this.addClass = true;
            this.groups = [];
        }
        Accordion.prototype.closeOtherPanels = function (openGroup) {
            if (!this.closeOthers) {
                return;
            }
            this.groups.forEach(function (group) {
                if (group !== openGroup) {
                    group.isOpen = false;
                }
            });
        };
        Accordion.prototype.addGroup = function (group) {
            this.groups.push(group);
        };
        Accordion.prototype.removeGroup = function (group) {
            var index = this.groups.indexOf(group);
            if (index !== -1) {
                this.groups.slice(index, 1);
            }
        };
        __decorate([
            core_1.Input()
        ], Accordion.prototype, "closeOthers");
        __decorate([
            core_1.HostBinding('class.panel-group')
        ], Accordion.prototype, "addClass");
        Accordion = __decorate([
            core_1.Component({
                selector: 'accordion',
                template: "<ng-content></ng-content>"
            })
        ], Accordion);
        return Accordion;
    })();
    exports.Accordion = Accordion;
});
