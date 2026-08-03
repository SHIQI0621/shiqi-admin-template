import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Cactus",
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
    const RemixCactus = () => {
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
          "d": "M12 2c2.21 0 4 1.79 4 4v9h1c.55 0 1-.45 1-1V8c0-.552.448-1 1-1s1 .448 1 1v6c0 1.657-1.343 3-3 3h-1v3h2v2H6v-2h2v-6H7c-1.657 0-3-1.343-3-3V9c0-.552.448-1 1-1s1 .448 1 1v2c0 .55.45 1 1 1h1V6c0-2.21 1.79-4 4-4z"
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
          "d": "M12 2c2.21 0 4 1.79 4 4v9h1c.55 0 1-.45 1-1V8c0-.552.448-1 1-1s1 .448 1 1v6c0 1.66-1.34 3-3 3h-1v3h2v2H6v-2h2v-6H7c-1.657 0-3-1.343-3-3V9c0-.552.448-1 1-1s1 .448 1 1v2c0 .55.45 1 1 1h1V6c0-2.21 1.79-4 4-4zm0 2c-1.105 0-2 .895-2 2v14h4V6c0-1.105-.895-2-2-2z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixCactus);
    };
  }
});
export {
  _sfc_main as default
};
