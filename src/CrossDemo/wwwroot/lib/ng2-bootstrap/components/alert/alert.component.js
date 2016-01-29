var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
define(["require", "exports", 'angular2/core', 'angular2/common'], function (require, exports, core_1, common_1) {
    var ALERT_TEMPLATE = "\n  <div class=\"alert\" role=\"alert\" [ngClass]=\"classes\" *ngIf=\"!closed\">\n    <button *ngIf=\"dismissible\" type=\"button\" class=\"close\" (click)=\"onClose()\" (touch)=\"onClose()\">\n      <span aria-hidden=\"true\">&times;</span>\n      <span class=\"sr-only\">Close</span>\n    </button>\n    <ng-content></ng-content>\n  </div>\n  ";
    // TODO: templateUrl
    var Alert = (function () {
        function Alert() {
            this.type = 'warning';
            this.close = new core_1.EventEmitter();
            this.classes = [];
        }
        Alert.prototype.ngOnInit = function () {
            var _this = this;
            this.classes[0] = "alert-" + this.type;
            if (this.dismissible) {
                this.classes[1] = 'alert-dismissible';
            }
            else {
                this.classes.length = 1;
            }
            if (this.dismissOnTimeout) {
                setTimeout(function () { return _this.onClose(); }, this.dismissOnTimeout);
            }
        };
        // todo: mouse event + touch + pointer
        Alert.prototype.onClose = function () {
            this.closed = true;
            this.close.emit(this);
        };
        __decorate([
            core_1.Input()
        ], Alert.prototype, "type");
        __decorate([
            core_1.Input()
        ], Alert.prototype, "dismissible");
        __decorate([
            core_1.Input()
        ], Alert.prototype, "dismissOnTimeout");
        __decorate([
            core_1.Output()
        ], Alert.prototype, "close");
        Alert = __decorate([
            core_1.Component({
                selector: 'alert',
                directives: [common_1.NgIf, common_1.NgClass],
                template: ALERT_TEMPLATE
            })
        ], Alert);
        return Alert;
    })();
    exports.Alert = Alert;
});
