import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Cast",
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
    const RemixCast = () => {
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
          "d": "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6a13.1 13.1 0 0 0-.153-2H20V5H4v3.153A13.1 13.1 0 0 0 2 8V4a1 1 0 0 1 1-1zm10 18h-2a9 9 0 0 0-9-9v-2c6.075 0 11 4.925 11 11zm-4 0H7a5 5 0 0 0-5-5v-2a7 7 0 0 1 7 7zm-4 0H2v-3a3 3 0 0 1 3 3zm9.373-4A13.032 13.032 0 0 0 6 8.627V7h12v10h-3.627z"
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
          "d": "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-6a13.1 13.1 0 0 0-.153-2H20V5H4v3.153A13.1 13.1 0 0 0 2 8V4a1 1 0 0 1 1-1zm10 18h-2a9 9 0 0 0-9-9v-2c6.075 0 11 4.925 11 11zm-4 0H7a5 5 0 0 0-5-5v-2a7 7 0 0 1 7 7zm-4 0H2v-3a3 3 0 0 1 3 3z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixCast);
    };
  }
});
export {
  _sfc_main as default
};
