var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
define(["require", "exports", 'angular2/core', 'angular2/common', './pagination.component'], function (require, exports, core_1, common_1, pagination_component_1) {
    var pagerConfig = {
        itemsPerPage: 10,
        previousText: '« Previous',
        nextText: 'Next »',
        align: true
    };
    var PAGER_TEMPLATE = "\n    <ul class=\"pager\">\n      <li [class.disabled]=\"noPrevious()\" [class.previous]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.disabled]=\"noNext()\" [class.next]=\"align\" [ngClass]=\"{'pull-right': align}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
    var Pager = (function (_super) {
        __extends(Pager, _super);
        function Pager(cd, renderer, elementRef) {
            _super.call(this, cd, renderer, elementRef);
            this.config = pagerConfig;
        }
        Pager = __decorate([
            core_1.Component({
                selector: 'pager[ngModel]',
                inputs: [
                    'align',
                    'totalItems', 'itemsPerPage',
                    'previousText', 'nextText',
                ],
                outputs: ['numPages', 'pageChanged'],
                template: PAGER_TEMPLATE,
                directives: [common_1.NgClass]
            }),
            __param(0, core_1.Self())
        ], Pager);
        return Pager;
    })(pagination_component_1.Pagination);
    exports.Pager = Pager;
});
