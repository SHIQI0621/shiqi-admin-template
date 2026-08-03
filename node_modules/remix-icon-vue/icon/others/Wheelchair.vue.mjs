import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Wheelchair",
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
    const RemixWheelchair = () => {
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
          "d": "M8 10.341v2.194C6.804 13.227 6 14.52 6 16c0 2.21 1.79 4 4 4 1.48 0 2.773-.804 3.465-2h2.193c-.823 2.33-3.046 4-5.658 4-3.314 0-6-2.686-6-6 0-2.613 1.67-4.835 4-5.659zM12 17c-1.657 0-3-1.343-3-3v-4c0-1.657 1.343-3 3-3s3 1.343 3 3v5h1.434c.648 0 1.253.314 1.626.836l.089.135 2.708 4.515-1.714 1.028L16.433 17H12zm0-15c1.38 0 2.5 1.12 2.5 2.5S13.38 7 12 7 9.5 5.88 9.5 4.5 10.62 2 12 2z"
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
          "d": "M8 10.341v2.194C6.804 13.227 6 14.52 6 16c0 2.21 1.79 4 4 4 1.48 0 2.773-.804 3.465-2h2.193c-.823 2.33-3.046 4-5.658 4-3.314 0-6-2.686-6-6 0-2.613 1.67-4.835 4-5.659zM12 17c-1.657 0-3-1.343-3-3v-4c0-1.044.534-1.964 1.343-2.501C9.533 6.964 9 6.044 9 5c0-1.657 1.343-3 3-3s3 1.343 3 3c0 1.044-.534 1.964-1.343 2.501C14.467 8.036 15 8.956 15 10v4.999l1.434.001c.648 0 1.253.314 1.626.836l.089.135 2.708 4.515-1.714 1.028L16.433 17 15 16.999 12 17zm0-8c-.552 0-1 .448-1 1v4c0 .552.448 1 1 1h.999L13 10c0-.552-.448-1-1-1zm0-5c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixWheelchair);
    };
  }
});
export {
  _sfc_main as default
};
