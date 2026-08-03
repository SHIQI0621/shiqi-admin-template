import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Hammer",
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
    const RemixHammer = () => {
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
          "d": "M17 8V2h3a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-3zm-2 14a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V8H2.5V6.074a1 1 0 0 1 .496-.863L8.5 2H15v20z"
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
          "d": "M20 2a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5v13a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1V9H3.5a1 1 0 0 1-1-1V5.618a1 1 0 0 1 .553-.894L8.5 2H20zm-5 2H8.972L4.5 6.236V7H11v14h2V7h2V4zm4 0h-2v3h2V4z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixHammer);
    };
  }
});
export {
  _sfc_main as default
};
