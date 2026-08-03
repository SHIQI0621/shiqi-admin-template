import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Opera",
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
    const RemixOpera = () => {
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
          "fill-rule": "nonzero",
          "d": "M8.71 6.365c-1.108 1.305-1.823 3.236-1.873 5.4v.47c.051 2.165.766 4.093 1.872 5.4 1.434 1.862 3.566 3.044 5.95 3.044a7.208 7.208 0 0 0 4.005-1.226 9.94 9.94 0 0 1-7.139 2.535A9.998 9.998 0 0 1 2 12C2 6.476 6.478 2 12 2h.037a9.97 9.97 0 0 1 6.628 2.546 7.239 7.239 0 0 0-4.008-1.226c-2.382 0-4.514 1.183-5.95 3.045h.002zM22 12a9.969 9.969 0 0 1-3.335 7.454c-2.565 1.25-4.955.376-5.747-.17 2.52-.554 4.423-3.6 4.423-7.284 0-3.685-1.903-6.73-4.423-7.283.791-.545 3.182-1.42 5.747-.171A9.967 9.967 0 0 1 22 12z"
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
          "fill-rule": "nonzero",
          "d": "M14.766 19.51a8.003 8.003 0 0 0 0-15.02C16.71 5.977 18 8.935 18 12s-1.289 6.024-3.234 7.51zM9.234 4.49a8.003 8.003 0 0 0 0 15.02C7.29 18.023 6 15.065 6 12s1.289-6.024 3.234-7.51zM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-3.5c2 0 4-3.033 4-6.5s-2-6.5-4-6.5S8 8.533 8 12s2 6.5 4 6.5z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixOpera);
    };
  }
});
export {
  _sfc_main as default
};
