import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SignalWifiError",
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
    const RemixSignalWifiError = () => {
      if (props.fill) {
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
          "d": "M12 3c4.284 0 8.22 1.497 11.31 3.996L22.498 8H18v5.571L12 21 .69 6.997C3.78 4.497 7.714 3 12 3zm10 16v2h-2v-2h2zm0-9v7h-2v-7h2z"
        }, null)])])]);
      } else {
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
          "d": "M12 3c4.284 0 8.22 1.497 11.31 3.996l-1.257 1.556C19.306 6.331 15.808 5 12 5c-3.089 0-5.973.875-8.419 2.392L12 17.817l6-7.429v3.183L12 21 .69 6.997C3.78 4.497 7.714 3 12 3zm10 16v2h-2v-2h2zm0-9v7h-2v-7h2z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixSignalWifiError);
    };
  }
});
export {
  _sfc_main as default
};
