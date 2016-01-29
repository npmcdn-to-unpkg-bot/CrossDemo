var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core', './typeahead-utils', './typeahead-container.component', './typeahead-options.class'], function (require, exports, core_1, typeahead_utils_1, typeahead_container_component_1, typeahead_options_class_1) {
    // https://github.com/angular/angular/blob/master/modules/angular2/src/core/forms/directives/shared.ts
    function setProperty(renderer, elementRef, propName, propValue) {
        renderer.setElementProperty(elementRef.nativeElement, propName, propValue);
    }
    var Typeahead = (function () {
        function Typeahead(cd, element, renderer, loader) {
            this.cd = cd;
            this.element = element;
            this.renderer = renderer;
            this.loader = loader;
            this.typeaheadLoading = new core_1.EventEmitter();
            this.typeaheadNoResults = new core_1.EventEmitter();
            this.typeaheadOnSelect = new core_1.EventEmitter();
            this.typeaheadAsync = null;
            this.typeaheadLatinize = true;
            this.typeaheadSingleWords = true;
            this.typeaheadWordDelimiters = ' ';
            this.typeaheadPhraseDelimiters = '\'"';
            this._matches = [];
            this.placement = 'bottom-left';
        }
        Object.defineProperty(Typeahead.prototype, "matches", {
            get: function () {
                return this._matches;
            },
            enumerable: true,
            configurable: true
        });
        Typeahead.prototype.debounce = function (func, wait) {
            var timeout;
            var args;
            var timestamp;
            var waitOriginal = wait;
            return function () {
                // save details of latest call
                args = [].slice.call(arguments, 0);
                timestamp = Date.now();
                // this trick is about implementing of 'typeaheadWaitMs'
                // in this case we have adaptive 'wait' parameter
                // we should use standard 'wait'('waitOriginal') in case of
                // popup is opened, otherwise - 'typeaheadWaitMs' parameter
                wait = this.container ? waitOriginal : this.typeaheadWaitMs;
                // this is where the magic happens
                var later = function () {
                    // how long ago was the last call
                    var last = Date.now() - timestamp;
                    // if the latest call was less that the wait period ago
                    // then we reset the timeout to wait for the difference
                    if (last < wait) {
                        timeout = setTimeout(later, wait - last);
                    }
                    else {
                        timeout = null;
                        func.apply(this, args);
                    }
                };
                // we only need to set the timer now if one isn't already running
                if (!timeout) {
                    timeout = setTimeout(later, wait);
                }
            };
        };
        Typeahead.prototype.processMatches = function () {
            this._matches = [];
            if (this.cd.model.toString().length >= this.typeaheadMinLength) {
                // If singleWords, break model here to not be doing extra work on each iteration
                var normalizedQuery = (this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
                normalizedQuery = this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
                for (var i = 0; i < this.typeahead.length; i++) {
                    var match = void 0;
                    if (typeof this.typeahead[i] === 'object' &&
                        this.typeahead[i][this.typeaheadOptionField]) {
                        match = this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.typeahead[i][this.typeaheadOptionField].toString()) : this.typeahead[i][this.typeaheadOptionField].toString();
                    }
                    if (typeof this.typeahead[i] === 'string') {
                        match = this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.typeahead[i].toString()) : this.typeahead[i].toString();
                    }
                    if (!match) {
                        console.log('Invalid match type', typeof this.typeahead[i], this.typeaheadOptionField);
                        continue;
                    }
                    if (this.testMatch(match.toLowerCase(), normalizedQuery)) {
                        this._matches.push(this.typeahead[i]);
                        if (this._matches.length > this.typeaheadOptionsLimit - 1) {
                            break;
                        }
                    }
                }
            }
        };
        Typeahead.prototype.testMatch = function (match, test) {
            var spaceLength;
            if (typeof test === 'object') {
                spaceLength = test.length;
                for (var i = 0; i < spaceLength; i += 1) {
                    if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                        return false;
                    }
                }
                return true;
            }
            else {
                return match.indexOf(test) >= 0;
            }
        };
        Typeahead.prototype.finalizeAsyncCall = function () {
            this.typeaheadLoading.next(false);
            this.typeaheadNoResults.next(this.cd.model.toString().length >=
                this.typeaheadMinLength && this.matches.length <= 0);
            if (this.cd.model.toString().length <= 0 || this._matches.length <= 0) {
                this.hide();
                return;
            }
            if (this.container && this._matches.length > 0) {
                // This improves the speedas it won't have to be done for each list item
                var normalizedQuery = (this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(this.cd.model) : this.cd.model).toString().toLowerCase();
                this.container.query = this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters) : normalizedQuery;
                this.container.matches = this._matches;
            }
            if (!this.container && this._matches.length > 0) {
                this.show(this._matches);
            }
        };
        Typeahead.prototype.ngOnInit = function () {
            var _this = this;
            this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
            this.typeaheadMinLength = this.typeaheadMinLength || 1;
            this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
            // async should be false in case of array
            if (this.typeaheadAsync === null && typeof this.typeahead !== 'function') {
                this.typeaheadAsync = false;
            }
            // async should be true for any case of function
            if (typeof this.typeahead === 'function') {
                this.typeaheadAsync = true;
            }
            if (this.typeaheadAsync === true) {
                this.debouncer = this.debounce(function () {
                    if (typeof _this.typeahead === 'function') {
                        _this.typeahead().then(function (matches) {
                            _this._matches = [];
                            if (_this.cd.model.toString().length >= _this.typeaheadMinLength) {
                                for (var i = 0; i < matches.length; i++) {
                                    _this._matches.push(matches[i]);
                                    if (_this._matches.length > _this.typeaheadOptionsLimit - 1) {
                                        break;
                                    }
                                }
                            }
                            _this.finalizeAsyncCall();
                        });
                    }
                    // source is array
                    if (typeof _this.typeahead === 'object' && _this.typeahead.length) {
                        _this.processMatches();
                        _this.finalizeAsyncCall();
                    }
                }, 100);
            }
        };
        Typeahead.prototype.onChange = function (e) {
            if (this.container) {
                // esc
                if (e.keyCode === 27) {
                    this.hide();
                    return;
                }
                // up
                if (e.keyCode === 38) {
                    this.container.prevActiveMatch();
                    return;
                }
                // down
                if (e.keyCode === 40) {
                    this.container.nextActiveMatch();
                    return;
                }
                // enter
                if (e.keyCode === 13) {
                    this.container.selectActiveMatch();
                    return;
                }
            }
            this.typeaheadLoading.next(true);
            if (this.typeaheadAsync === true) {
                this.debouncer();
            }
            if (this.typeaheadAsync === false) {
                this.processMatches();
                this.finalizeAsyncCall();
            }
        };
        Typeahead.prototype.changeModel = function (value) {
            var valueStr = ((typeof value === 'object' && this.typeaheadOptionField) ? value[this.typeaheadOptionField] : value).toString();
            this.cd.viewToModelUpdate(valueStr);
            setProperty(this.renderer, this.element, 'value', valueStr);
            this.hide();
        };
        Typeahead.prototype.show = function (matches) {
            var _this = this;
            var options = new typeahead_options_class_1.TypeaheadOptions({
                placement: this.placement,
                animation: false
            });
            var binding = core_1.Injector.resolve([
                new core_1.Provider(typeahead_options_class_1.TypeaheadOptions, { useValue: options })
            ]);
            this.popup = this.loader
                .loadNextToLocation(typeahead_container_component_1.TypeaheadContainer, this.element, binding)
                .then(function (componentRef) {
                componentRef.instance.position(_this.element);
                _this.container = componentRef.instance;
                _this.container.parent = _this;
                // This improves the speedas it won't have to be done for each list item
                var normalizedQuery = (_this.typeaheadLatinize ? typeahead_utils_1.TypeaheadUtils.latinize(_this.cd.model) : _this.cd.model).toString().toLowerCase();
                _this.container.query = _this.typeaheadSingleWords ? typeahead_utils_1.TypeaheadUtils.tokenize(normalizedQuery, _this.typeaheadWordDelimiters, _this.typeaheadPhraseDelimiters) : normalizedQuery;
                _this.container.matches = matches;
                _this.container.field = _this.typeaheadOptionField;
                _this.element.nativeElement.focus();
                return componentRef;
            });
        };
        Typeahead.prototype.hide = function () {
            var _this = this;
            if (this.container) {
                this.popup.then(function (componentRef) {
                    componentRef.dispose();
                    _this.container = null;
                    return componentRef;
                });
            }
        };
        __decorate([
            core_1.Output()
        ], Typeahead.prototype, "typeaheadLoading");
        __decorate([
            core_1.Output()
        ], Typeahead.prototype, "typeaheadNoResults");
        __decorate([
            core_1.Output()
        ], Typeahead.prototype, "typeaheadOnSelect");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeahead");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadMinLength");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadWaitMs");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadOptionsLimit");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadOptionField");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadAsync");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadLatinize");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadSingleWords");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadWordDelimiters");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadPhraseDelimiters");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadAppendToBody");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadEditable");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadFocusFirst");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadInputFormatter");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadSelectOnExact");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadSelectOnBlur");
        __decorate([
            core_1.Input()
        ], Typeahead.prototype, "typeaheadFocusOnSelect");
        Object.defineProperty(Typeahead.prototype, "onChange",
            __decorate([
                core_1.HostListener('keyup', ['$event'])
            ], Typeahead.prototype, "onChange", Object.getOwnPropertyDescriptor(Typeahead.prototype, "onChange")));
        Typeahead = __decorate([
            core_1.Directive({
                selector: 'typeahead[ngModel], [ngModel][typeahead]'
            })
        ], Typeahead);
        return Typeahead;
    })();
    exports.Typeahead = Typeahead;
});
