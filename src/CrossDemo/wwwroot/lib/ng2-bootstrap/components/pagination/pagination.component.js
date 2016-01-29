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
define(["require", "exports", 'angular2/core', 'angular2/common'], function (require, exports, core_1, common_1) {
    var paginationConfig = {
        maxSize: void 0,
        itemsPerPage: 10,
        boundaryLinks: false,
        directionLinks: true,
        firstText: 'First',
        previousText: 'Previous',
        nextText: 'Next',
        lastText: 'Last',
        rotate: true
    };
    var PAGINATION_TEMPLATE = "\n  <ul class=\"pagination\" [ngClass]=\"classMap\">\n    <li class=\"pagination-first page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(1, $event)\">{{getText('first')}}</a>\n    </li>\n\n    <li class=\"pagination-prev page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noPrevious()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n\n    <li *ngFor=\"#pg of pages\"\n        [class.active]=\"pg.active\"\n        [class.disabled]=\"disabled&&!pg.active\"\n        class=\"pagination-page page-item\">\n      <a class=\"page-link\" href (click)=\"selectPage(pg.number, $event)\">{{pg.text}}</a>\n    </li>\n\n    <li class=\"pagination-next page-item\"\n        *ngIf=\"directionLinks\"\n        [class.disabled]=\"noNext()\">\n      <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a></li>\n\n    <li class=\"pagination-last page-item\"\n        *ngIf=\"boundaryLinks\"\n        [class.disabled]=\"noNext()\">\n      <a class=\"page-link\" href (click)=\"selectPage(totalPages, $event)\">{{getText('last')}}</a></li>\n  </ul>\n  ";
    var Pagination = (function () {
        function Pagination(cd, renderer, elementRef) {
            this.cd = cd;
            this.renderer = renderer;
            this.elementRef = elementRef;
            this.numPages = new core_1.EventEmitter();
            this.pageChanged = new core_1.EventEmitter();
            this.inited = false;
            this.onChange = function (_) {
            };
            this.onTouched = function () {
            };
            cd.valueAccessor = this;
            this.config = this.config || paginationConfig;
        }
        Object.defineProperty(Pagination.prototype, "itemsPerPage", {
            get: function () {
                return this._itemsPerPage;
            },
            set: function (v) {
                this._itemsPerPage = v;
                this.totalPages = this.calculateTotalPages();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "totalItems", {
            get: function () {
                return this._totalItems;
            },
            set: function (v) {
                this._totalItems = v;
                this.totalPages = this.calculateTotalPages();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "totalPages", {
            get: function () {
                return this._totalPages;
            },
            set: function (v) {
                this._totalPages = v;
                this.numPages.emit(v);
                if (this.inited) {
                    this.selectPage(this.page);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Pagination.prototype, "page", {
            get: function () {
                return this._page;
            },
            set: function (value) {
                this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
                this.pageChanged.emit({
                    page: this._page,
                    itemsPerPage: this.itemsPerPage
                });
            },
            enumerable: true,
            configurable: true
        });
        Pagination.prototype.ngOnInit = function () {
            this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
            // watch for maxSize
            this.maxSize = typeof this.maxSize !== 'undefined' ? this.maxSize : paginationConfig.maxSize;
            this.rotate = typeof this.rotate !== 'undefined' ? this.rotate : paginationConfig.rotate;
            this.boundaryLinks = typeof this.boundaryLinks !== 'undefined' ? this.boundaryLinks : paginationConfig.boundaryLinks;
            this.directionLinks = typeof this.directionLinks !== 'undefined' ? this.directionLinks : paginationConfig.directionLinks;
            // base class
            this.itemsPerPage = typeof this.itemsPerPage !== 'undefined' ? this.itemsPerPage : paginationConfig.itemsPerPage;
            this.totalPages = this.calculateTotalPages();
            // this class
            this.pages = this.getPages(this.page, this.totalPages);
            this.page = this.cd.value;
            this.inited = true;
        };
        Pagination.prototype.writeValue = function (value) {
            this.page = value;
            this.pages = this.getPages(this.page, this.totalPages);
        };
        Pagination.prototype.selectPage = function (page, event) {
            if (event) {
                event.preventDefault();
            }
            if (!this.disabled) {
                if (event && event.target) {
                    var target = event.target;
                    target.blur();
                }
                this.writeValue(page);
                this.cd.viewToModelUpdate(this.page);
            }
        };
        Pagination.prototype.getText = function (key) {
            return this[key + 'Text'] || paginationConfig[key + 'Text'];
        };
        Pagination.prototype.noPrevious = function () {
            return this.page === 1;
        };
        Pagination.prototype.noNext = function () {
            return this.page === this.totalPages;
        };
        // Create page object used in template
        Pagination.prototype.makePage = function (number, text, isActive) {
            return {
                number: number,
                text: text,
                active: isActive
            };
        };
        Pagination.prototype.getPages = function (currentPage, totalPages) {
            var pages = [];
            // Default page limits
            var startPage = 1;
            var endPage = totalPages;
            var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
            // recompute if maxSize
            if (isMaxSized) {
                if (this.rotate) {
                    // Current page is displayed in the middle of the visible ones
                    startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                    endPage = startPage + this.maxSize - 1;
                    // Adjust if limit is exceeded
                    if (endPage > totalPages) {
                        endPage = totalPages;
                        startPage = endPage - this.maxSize + 1;
                    }
                }
                else {
                    // Visible pages are paginated with maxSize
                    startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                    // Adjust last page if limit is exceeded
                    endPage = Math.min(startPage + this.maxSize - 1, totalPages);
                }
            }
            // Add page number links
            for (var number = startPage; number <= endPage; number++) {
                var page = this.makePage(number, number.toString(), number === currentPage);
                pages.push(page);
            }
            // Add links to move between page sets
            if (isMaxSized && !this.rotate) {
                if (startPage > 1) {
                    var previousPageSet = this.makePage(startPage - 1, '...', false);
                    pages.unshift(previousPageSet);
                }
                if (endPage < totalPages) {
                    var nextPageSet = this.makePage(endPage + 1, '...', false);
                    pages.push(nextPageSet);
                }
            }
            return pages;
        };
        // base class
        Pagination.prototype.calculateTotalPages = function () {
            var totalPages = this.itemsPerPage < 1 ? 1 : Math.ceil(this.totalItems / this.itemsPerPage);
            return Math.max(totalPages || 0, 1);
        };
        Pagination.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        Pagination.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "maxSize");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "boundaryLinks");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "directionLinks");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "firstText");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "previousText");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "nextText");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "lastText");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "rotate");
        __decorate([
            core_1.Input()
        ], Pagination.prototype, "disabled");
        __decorate([
            core_1.Output()
        ], Pagination.prototype, "numPages");
        __decorate([
            core_1.Output()
        ], Pagination.prototype, "pageChanged");
        Object.defineProperty(Pagination.prototype, "itemsPerPage",
            __decorate([
                core_1.Input()
            ], Pagination.prototype, "itemsPerPage", Object.getOwnPropertyDescriptor(Pagination.prototype, "itemsPerPage")));
        Object.defineProperty(Pagination.prototype, "totalItems",
            __decorate([
                core_1.Input()
            ], Pagination.prototype, "totalItems", Object.getOwnPropertyDescriptor(Pagination.prototype, "totalItems")));
        Pagination = __decorate([
            core_1.Component({
                selector: 'pagination[ngModel]',
                template: PAGINATION_TEMPLATE,
                directives: [common_1.NgFor, common_1.NgIf]
            }),
            __param(0, core_1.Self())
        ], Pagination);
        return Pagination;
    })();
    exports.Pagination = Pagination;
});
