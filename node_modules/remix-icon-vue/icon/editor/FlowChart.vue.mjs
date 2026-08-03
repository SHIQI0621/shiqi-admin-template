import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlowChart",
  props: Props,
  setup(__props) {
    const props = __props;
    const iconStyle = reactive({
      "--icon-size": "",
      "--icon-color": ""
    });
    const iconSize = isNumber(props.size) ? `${props.size}px` : props.size;
    const iconColor = props.color || "";
    iconStyle["--icon-size"] = iconSize;
    iconStyle["--icon-color"] = iconColor;
    const RemixFlowChart = () => {
      return createVNode("i", {
        "class": ["remix-icon", {
          "remix-icon--spin": props.spin
        }],
        "style": iconStyle
      }, [createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 24 24"
      }, [createVNode("g", null, [createVNode("path", {
        "fill": "none",
        "d": "M0 0H24V24H0z"
      }, null), createVNode("path", {
        "d": "M6 21.5c-1.933 0-3.5-1.567-3.5-3.5s1.567-3.5 3.5-3.5c1.585 0 2.924 1.054 3.355 2.5H15v-2h2V9.242L14.757 7H9V9H3V3h6v2h5.757L18 1.756 22.243 6 19 9.241V15L21 15v6h-6v-2H9.355c-.43 1.446-1.77 2.5-3.355 2.5zm0-5c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5zm13 .5h-2v2h2v-2zM18 4.586L16.586 6 18 7.414 19.414 6 18 4.586zM7 5H5v2h2V5z"
      }, null)])])]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixFlowChart);
    };
  }
});
export {
  _sfc_main as default
};
