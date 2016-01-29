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
    var ButtonRadio = (function () {
        function ButtonRadio(cd, el) {
            this.cd = cd;
            this.el = el;
            this.onChange = function (_) { };
            this.onTouched = function () { };
            // hack!
            cd.valueAccessor = this;
        }
        Object.defineProperty(ButtonRadio.prototype, "isActive", {
            get: function () {
                return this.btnRadio === this.value;
            },
            enumerable: true,
            configurable: true
        });
        ButtonRadio.prototype.onClick = function () {
            if (this.uncheckable && this.btnRadio === this.value) {
                return this.cd.viewToModelUpdate(null);
            }
            this.cd.viewToModelUpdate(this.btnRadio);
        };
        ButtonRadio.prototype.ngOnInit = function () {
            this.uncheckable = typeof this.uncheckable !== 'undefined';
        };
        Object.defineProperty(ButtonRadio.prototype, "value", {
            // hack view model!
            get: function () {
                return this.cd.viewModel;
            },
            set: function (value) {
                this.cd.viewModel = value;
            },
            enumerable: true,
            configurable: true
        });
        // ControlValueAccessor
        // model -> view
        ButtonRadio.prototype.writeValue = function (value) {
            this.value = value;
        };
        ButtonRadio.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        ButtonRadio.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        __decorate([
            core_1.Input()
        ], ButtonRadio.prototype, "btnRadio");
        __decorate([
            core_1.Input()
        ], ButtonRadio.prototype, "uncheckable");
        Object.defineProperty(ButtonRadio.prototype, "isActive",
            __decorate([
                core_1.HostBinding('class.active')
            ], ButtonRadio.prototype, "isActive", Object.getOwnPropertyDescriptor(ButtonRadio.prototype, "isActive")));
        Object.defineProperty(ButtonRadio.prototype, "onClick",
            __decorate([
                core_1.HostListener('click')
            ], ButtonRadio.prototype, "onClick", Object.getOwnPropertyDescriptor(ButtonRadio.prototype, "onClick")));
        ButtonRadio = __decorate([
            core_1.Directive({ selector: '[btnRadio][ngModel]' }),
            __param(0, core_1.Self())
        ], ButtonRadio);
        return ButtonRadio;
    })();
    exports.ButtonRadio = ButtonRadio;
});
