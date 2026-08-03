import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EnglishInput",
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
    const RemixEnglishInput = () => {
      return createVNode("i", {
        "class": ["remix-icon", {
          "remix-icon--spin": props.spin
        }],
        "style": iconStyle
      }, [createVNode("svg", {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 24 24"
      }, [createVNode("path", {
        "fill": "none",
        "d": "M0 0h24v24H0z"
      }, null), createVNode("path", {
        "d": "M14 10h2v.757a4.5 4.5 0 0 1 7 3.743V20h-2v-5.5c0-1.43-1.175-2.5-2.5-2.5S16 13.07 16 14.5V20h-2V10zm-2-6v2H4v5h8v2H4v5h8v2H2V4h10z"
      }, null)])]);
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixEnglishInput);
    };
  }
});
export {
  _sfc_main as default
};
