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
    var DropdownToggle = (function () {
        function DropdownToggle(dropdown, el) {
            this.dropdown = dropdown;
            this.el = el;
            this.disabled = false;
            this.addClass = true;
        }
        DropdownToggle.prototype.ngOnInit = function () {
            this.dropdown.dropDownToggle = this;
        };
        Object.defineProperty(DropdownToggle.prototype, "isOpen", {
            get: function () {
                return this.dropdown.isOpen;
            },
            enumerable: true,
            configurable: true
        });
        DropdownToggle.prototype.toggleDropdown = function (event) {
            event.stopPropagation();
            if (!this.disabled) {
                this.dropdown.toggle();
            }
            return false;
        };
        __decorate([
            core_1.HostBinding('class.disabled'),
            core_1.Input()
        ], DropdownToggle.prototype, "disabled");
        __decorate([
            core_1.HostBinding('class.dropdown-toggle'),
            core_1.HostBinding('attr.aria-haspopup')
        ], DropdownToggle.prototype, "addClass");
        Object.defineProperty(DropdownToggle.prototype, "isOpen",
            __decorate([
                core_1.HostBinding('attr.aria-expanded')
            ], DropdownToggle.prototype, "isOpen", Object.getOwnPropertyDescriptor(DropdownToggle.prototype, "isOpen")));
        Object.defineProperty(DropdownToggle.prototype, "toggleDropdown",
            __decorate([
                core_1.HostListener('click', ['$event'])
            ], DropdownToggle.prototype, "toggleDropdown", Object.getOwnPropertyDescriptor(DropdownToggle.prototype, "toggleDropdown")));
        DropdownToggle = __decorate([
            core_1.Directive({ selector: '[dropdownToggle]' }),
            __param(0, core_1.Host())
        ], DropdownToggle);
        return DropdownToggle;
    })();
    exports.DropdownToggle = DropdownToggle;
});
