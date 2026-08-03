import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TextWrap",
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
    const RemixTextWrap = () => {
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
        "d": "M0 0h24v24H0z"
      }, null), createVNode("path", {
        "d": "M15 18h1.5a2.5 2.5 0 1 0 0-5H3v-2h13.5a4.5 4.5 0 1 1 0 9H15v2l-4-3 4-3v2zM3 4h18v2H3V4zm6 14v2H3v-2h6z"
      }, null)])])]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixTextWrap);
    };
  }
});
export {
  _sfc_main as default
};
