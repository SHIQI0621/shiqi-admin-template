import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FileHwp",
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
    const RemixFileHwp = () => {
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
          "d": "M16 2l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.447 2 3.999 2H16zM9.333 14.667H8V18h8v-1.333l-6.667-.001v-2zM12 14.333a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM12 9a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm0 1.333a1.167 1.167 0 1 1 0 2.334 1.167 1.167 0 0 1 0-2.334zM12.667 6h-1.334v1.333H8v1.334h8V7.333h-3.334V6z"
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
          "d": "M16 2l5 5v13.993A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992C3 2.444 3.447 2 3.999 2H16zm0 6.667H8V7.333h3.333V6h1.334l-.001 1.333h2.333L15 4H5v16h14V8l-3-.001v.668zm-6.667 6v1.999H16V18H8v-3.333h1.333zM12 14.333a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zm0 1.333a1.167 1.167 0 1 0 0 2.334 1.167 1.167 0 0 0 0-2.334z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixFileHwp);
    };
  }
});
export {
  _sfc_main as default
};
