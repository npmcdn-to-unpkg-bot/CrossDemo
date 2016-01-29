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
    var ButtonCheckbox = (function () {
        function ButtonCheckbox(cd) {
            this.cd = cd;
            this.state = false;
            this.onChange = function (_) { };
            this.onTouched = function () { };
            // hack !
            cd.valueAccessor = this;
        }
        // view -> model
        ButtonCheckbox.prototype.onClick = function () {
            this.toggle(!this.state);
            this.cd.viewToModelUpdate(this.value);
        };
        ButtonCheckbox.prototype.ngOnInit = function () {
            this.toggle(this.trueValue === this.value);
        };
        Object.defineProperty(ButtonCheckbox.prototype, "trueValue", {
            get: function () {
                return typeof this.btnCheckboxTrue !== 'undefined' ? this.btnCheckboxTrue : true;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ButtonCheckbox.prototype, "falseValue", {
            get: function () {
                return typeof this.btnCheckboxFalse !== 'undefined' ? this.btnCheckboxFalse : false;
            },
            enumerable: true,
            configurable: true
        });
        ButtonCheckbox.prototype.toggle = function (state) {
            this.state = state;
            this.value = this.state ? this.trueValue : this.falseValue;
        };
        // ControlValueAccessor
        // model -> view
        ButtonCheckbox.prototype.writeValue = function (value) {
            this.state = this.trueValue === value;
            this.value = value;
        };
        ButtonCheckbox.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        ButtonCheckbox.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        __decorate([
            core_1.Input()
        ], ButtonCheckbox.prototype, "btnCheckboxTrue");
        __decorate([
            core_1.Input()
        ], ButtonCheckbox.prototype, "btnCheckboxFalse");
        __decorate([
            core_1.HostBinding('class.active')
        ], ButtonCheckbox.prototype, "state");
        Object.defineProperty(ButtonCheckbox.prototype, "onClick",
            __decorate([
                core_1.HostListener('click')
            ], ButtonCheckbox.prototype, "onClick", Object.getOwnPropertyDescriptor(ButtonCheckbox.prototype, "onClick")));
        ButtonCheckbox = __decorate([
            core_1.Directive({ selector: '[btnCheckbox][ngModel]' }),
            __param(0, core_1.Self())
        ], ButtonCheckbox);
        return ButtonCheckbox;
    })();
    exports.ButtonCheckbox = ButtonCheckbox;
});
