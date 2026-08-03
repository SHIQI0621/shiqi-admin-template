import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Gradienter",
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
    const RemixGradienter = () => {
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
          "d": "M0 0h24v24H0z"
        }, null), createVNode("path", {
          "d": "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM8.126 11H4.062a8.079 8.079 0 0 0 0 2h4.064a4.007 4.007 0 0 1 0-2zm7.748 0a4.007 4.007 0 0 1 0 2h4.064a8.079 8.079 0 0 0 0-2h-4.064zM12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
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
          "d": "M0 0h24v24H0z"
        }, null), createVNode("path", {
          "d": "M2.05 13h2.012a8.001 8.001 0 0 0 15.876 0h2.013c-.502 5.053-4.766 9-9.951 9-5.185 0-9.449-3.947-9.95-9zm0-2C2.55 5.947 6.814 2 12 2s9.449 3.947 9.95 9h-2.012a8.001 8.001 0 0 0-15.876 0H2.049zM12 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixGradienter);
    };
  }
});
export {
  _sfc_main as default
};
