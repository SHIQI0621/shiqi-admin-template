import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Hotel",
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
    const RemixHotel = () => {
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
          "d": "M17 19h2v-8h-6v8h2v-6h2v6zM3 19V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1v2H2v-2h1zm4-8v2h2v-2H7zm0 4v2h2v-2H7zm0-8v2h2V7H7z"
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
          "d": "M22 21H2v-2h1V4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v5h2v10h1v2zm-5-2h2v-8h-6v8h2v-6h2v6zm0-10V5H5v14h6V9h6zM7 11h2v2H7v-2zm0 4h2v2H7v-2zm0-8h2v2H7V7z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixHotel);
    };
  }
});
export {
  _sfc_main as default
};
