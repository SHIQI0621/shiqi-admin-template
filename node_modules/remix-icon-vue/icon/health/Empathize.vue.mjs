import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Empathize",
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
    const RemixEmpathize = () => {
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
          "d": "M18.364 10.98c1.562 1.561 1.562 4.094 0 5.656l-5.657 5.657c-.39.39-1.024.39-1.414 0l-5.657-5.657c-1.562-1.562-1.562-4.095 0-5.657 1.562-1.562 4.095-1.562 5.657 0l.706.707.708-.707c1.562-1.562 4.095-1.562 5.657 0zM12 1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4z"
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
          "d": "M18.364 10.98c1.562 1.561 1.562 4.094 0 5.656l-5.657 5.657c-.39.39-1.024.39-1.414 0l-5.657-5.657c-1.562-1.562-1.562-4.095 0-5.657 1.562-1.562 4.095-1.562 5.657 0l.706.707.708-.707c1.562-1.562 4.095-1.562 5.657 0zM7.05 12.392c-.78.781-.78 2.048 0 2.829l4.95 4.95 4.95-4.95c.78-.781.78-2.048 0-2.829-.781-.78-2.048-.78-2.83.002l-2.122 2.118-2.12-2.12c-.78-.78-2.047-.78-2.828 0zM12 1c2.21 0 4 1.79 4 4s-1.79 4-4 4-4-1.79-4-4 1.79-4 4-4zm0 2c-1.105 0-2 .895-2 2s.895 2 2 2 2-.895 2-2-.895-2-2-2z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixEmpathize);
    };
  }
});
export {
  _sfc_main as default
};
