import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Suitcase3",
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
    const RemixSuitcase3 = () => {
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
          "d": "M15 1c.552 0 1 .448 1 1v5h1V6h2v1h1c.552 0 1 .448 1 1v12c0 .552-.448 1-1 1h-1v1h-2v-1H7v1H5v-1H4c-.552 0-1-.448-1-1V8c0-.552.448-1 1-1h1V6h2v1h1V2c0-.552.448-1 1-1h6zm-6 9H7v8h2v-8zm4 0h-2v8h2v-8zm4 0h-2v8h2v-8zm-3-7h-4v4h4V3z"
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
          "d": "M15 1c.552 0 1 .448 1 1v5h1V6h2v1h1c.552 0 1 .448 1 1v12c0 .552-.448 1-1 1h-1v1h-2v-1H7v1H5v-1H4c-.552 0-1-.448-1-1V8c0-.552.448-1 1-1h1V6h2v1h1V2c0-.552.448-1 1-1h6zm4 8H5v10h14V9zM9 10v8H7v-8h2zm4 0v8h-2v-8h2zm4 0v8h-2v-8h2zm-3-7h-4v4h4V3z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixSuitcase3);
    };
  }
});
export {
  _sfc_main as default
};
