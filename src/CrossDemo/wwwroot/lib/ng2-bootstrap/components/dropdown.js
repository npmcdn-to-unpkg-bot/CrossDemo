define(["require", "exports", './dropdown/dropdown.directive', './dropdown/dropdown-toggle.directive', './dropdown/dropdown.directive', './dropdown/dropdown-toggle.directive'], function (require, exports, dropdown_directive_1, dropdown_toggle_directive_1, dropdown_directive_2, dropdown_toggle_directive_2) {
    exports.Dropdown = dropdown_directive_2.Dropdown;
    exports.DropdownToggle = dropdown_toggle_directive_2.DropdownToggle;
    exports.DROPDOWN_DIRECTIVES = [dropdown_directive_1.Dropdown, dropdown_toggle_directive_1.DropdownToggle];
});
