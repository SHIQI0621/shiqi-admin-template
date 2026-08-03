import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserVoice",
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
    const RemixUserVoice = () => {
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
          "d": "M1 22a8 8 0 1 1 16 0H1zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm9.246-9.816A9.97 9.97 0 0 1 19 7a9.97 9.97 0 0 1-.754 3.816l-1.677-1.22A7.99 7.99 0 0 0 17 7a7.99 7.99 0 0 0-.43-2.596l1.676-1.22zm3.302-2.4A13.942 13.942 0 0 1 23 7c0 2.233-.523 4.344-1.452 6.216l-1.645-1.196A11.955 11.955 0 0 0 21 7c0-1.792-.393-3.493-1.097-5.02L21.548.784z"
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
          "d": "M1 22a8 8 0 1 1 16 0h-2a6 6 0 1 0-12 0H1zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM21.548.784A13.942 13.942 0 0 1 23 7c0 2.233-.523 4.344-1.452 6.216l-1.645-1.196A11.955 11.955 0 0 0 21 7c0-1.792-.393-3.493-1.097-5.02L21.548.784zm-3.302 2.4A9.97 9.97 0 0 1 19 7a9.97 9.97 0 0 1-.754 3.816l-1.677-1.22A7.99 7.99 0 0 0 17 7a7.99 7.99 0 0 0-.43-2.596l1.676-1.22z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixUserVoice);
    };
  }
});
export {
  _sfc_main as default
};
