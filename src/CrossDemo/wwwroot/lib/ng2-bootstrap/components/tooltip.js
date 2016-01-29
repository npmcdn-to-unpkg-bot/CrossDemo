define(["require", "exports", './tooltip/tooltip.directive', './tooltip/tooltip-container.component', './tooltip/tooltip.directive', './tooltip/tooltip-container.component'], function (require, exports, tooltip_directive_1, tooltip_container_component_1, tooltip_directive_2, tooltip_container_component_2) {
    exports.Tooltip = tooltip_directive_2.Tooltip;
    exports.TooltipContainer = tooltip_container_component_2.TooltipContainer;
    exports.TOOLTIP_DIRECTIVES = [tooltip_directive_1.Tooltip, tooltip_container_component_1.TooltipContainer];
});
