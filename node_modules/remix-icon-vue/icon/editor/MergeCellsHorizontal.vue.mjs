import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MergeCellsHorizontal",
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
    const RemixMergeCellsHorizontal = () => {
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
        "d": "M20 3c.552 0 1 .448 1 1v16c0 .552-.448 1-1 1H4c-.552 0-1-.448-1-1V4c0-.552.448-1 1-1h16zm-9 2H5v5.999h2V9l3 3-3 3v-2H5v6h6v-2h2v2h6v-6h-2v2l-3-3 3-3v1.999h2V5h-6v2h-2V5zm2 8v2h-2v-2h2zm0-4v2h-2V9h2z"
      }, null)])])]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixMergeCellsHorizontal);
    };
  }
});
export {
  _sfc_main as default
};
