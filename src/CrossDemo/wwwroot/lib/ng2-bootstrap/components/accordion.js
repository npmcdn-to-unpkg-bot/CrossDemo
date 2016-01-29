define(["require", "exports", './accordion/accordion.component', './accordion/accordion-group.component', './accordion/accordion.component', './accordion/accordion-group.component'], function (require, exports, accordion_component_1, accordion_group_component_1, accordion_component_2, accordion_group_component_2) {
    exports.Accordion = accordion_component_2.Accordion;
    exports.AccordionPanel = accordion_group_component_2.AccordionPanel;
    exports.ACCORDION_DIRECTIVES = [accordion_component_1.Accordion, accordion_group_component_1.AccordionPanel];
});
