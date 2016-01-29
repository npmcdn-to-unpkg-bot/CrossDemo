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
define(["require", "exports", 'angular2/core', './dropdown.service'], function (require, exports, core_1, dropdown_service_1) {
    var Dropdown = (function () {
        function Dropdown(el, dropdownMenuList) {
            this.el = el;
            this.onToggle = new core_1.EventEmitter();
            this.addClass = true;
            // todo: bind to route change event
        }
        Object.defineProperty(Dropdown.prototype, "isOpen", {
            get: function () {
                return this._isOpen;
            },
            set: function (value) {
                this._isOpen = !!value;
                // todo: implement after porting position
                if (this.appendToBody && this.menuEl) {
                }
                // todo: $animate open<->close transitions, as soon as ng2Animate will be ready
                if (this.isOpen) {
                    this.focusToggleElement();
                    dropdown_service_1.dropdownService.open(this);
                }
                else {
                    dropdown_service_1.dropdownService.close(this);
                    this.selectedOption = null;
                }
                this.onToggle.emit(this.isOpen);
                // todo: implement call to setIsOpen if set and function
            },
            enumerable: true,
            configurable: true
        });
        Dropdown.prototype.ngOnInit = function () {
            this.autoClose = this.autoClose || dropdown_service_1.ALWAYS;
            if (this.isOpen) {
            }
        };
        Dropdown.prototype.ngOnDestroy = function () {
            if (this.appendToBody && this.menuEl) {
                this.menuEl.nativeElement.remove();
            }
        };
        Object.defineProperty(Dropdown.prototype, "dropDownMenu", {
            set: function (dropdownMenu) {
                // init drop down menu
                this.menuEl = dropdownMenu.el;
                if (this.appendToBody) {
                    window.document.body.appendChild(this.menuEl.nativeElement);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Dropdown.prototype, "dropDownToggle", {
            set: function (dropdownToggle) {
                // init toggle element
                this.toggleEl = dropdownToggle.el;
            },
            enumerable: true,
            configurable: true
        });
        Dropdown.prototype.toggle = function (open) {
            return this.isOpen = arguments.length ? !!open : !this.isOpen;
        };
        Dropdown.prototype.focusDropdownEntry = function (keyCode) {
            // If append to body is used.
            var hostEl = this.menuEl ?
                this.menuEl.nativeElement :
                this.el.nativeElement.getElementsByTagName('ul')[0];
            if (!hostEl) {
                // todo: throw exception?
                return;
            }
            var elems = hostEl.getElementsByTagName('a');
            if (!elems || !elems.length) {
                // todo: throw exception?
                return;
            }
            // todo: use parseInt to detect isNumber?
            // todo: or implement selectedOption as a get\set pair with parseInt on set
            switch (keyCode) {
                case (40):
                    if (typeof this.selectedOption !== 'number') {
                        this.selectedOption = 0;
                        break;
                    }
                    if (this.selectedOption === elems.length - 1) {
                        break;
                    }
                    this.selectedOption++;
                    break;
                case (38):
                    if (typeof this.selectedOption !== 'number') {
                        return;
                    }
                    if (this.selectedOption === 0) {
                        // todo: return?
                        break;
                    }
                    this.selectedOption--;
                    break;
            }
            elems[this.selectedOption].focus();
        };
        Dropdown.prototype.focusToggleElement = function () {
            if (this.toggleEl) {
                this.toggleEl.nativeElement.focus();
            }
        };
        Object.defineProperty(Dropdown.prototype, "isOpen",
            __decorate([
                core_1.HostBinding('class.open'),
                core_1.Input()
            ], Dropdown.prototype, "isOpen", Object.getOwnPropertyDescriptor(Dropdown.prototype, "isOpen")));
        __decorate([
            core_1.Input()
        ], Dropdown.prototype, "autoClose");
        __decorate([
            core_1.Input()
        ], Dropdown.prototype, "keyboardNav");
        __decorate([
            core_1.Input()
        ], Dropdown.prototype, "appendToBody");
        __decorate([
            core_1.Output()
        ], Dropdown.prototype, "onToggle");
        __decorate([
            core_1.HostBinding('class.dropdown')
        ], Dropdown.prototype, "addClass");
        Dropdown = __decorate([
            core_1.Directive({ selector: '[dropdown]' }),
            __param(1, core_1.Query('dropdownMenu', { descendants: false }))
        ], Dropdown);
        return Dropdown;
    })();
    exports.Dropdown = Dropdown;
});
