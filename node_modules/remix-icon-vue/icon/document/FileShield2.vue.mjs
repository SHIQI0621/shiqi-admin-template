import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FileShield2",
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
    const RemixFileShield2 = () => {
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
          "d": "M21 10H11v7.382c0 1.563.777 3.023 2.074 3.892l1.083.726H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.447 2 3.998 2h11.999L21 7v3zm-8 2h8v5.382c0 .897-.446 1.734-1.187 2.23L17 21.499l-2.813-1.885A2.685 2.685 0 0 1 13 17.383V12z"
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
          "d": "M14 9V4H5v16h6.056c.328.417.724.785 1.18 1.085l1.39.915H3.993A.993.993 0 0 1 3 21.008V2.992C3 2.455 3.449 2 4.002 2h10.995L21 8v1h-7zm-2 2h9v5.949c0 .99-.501 1.916-1.336 2.465L16.5 21.498l-3.164-2.084A2.953 2.953 0 0 1 12 16.95V11zm2 5.949c0 .316.162.614.436.795l2.064 1.36 2.064-1.36a.954.954 0 0 0 .436-.795V13h-5v3.949z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixFileShield2);
    };
  }
});
export {
  _sfc_main as default
};
