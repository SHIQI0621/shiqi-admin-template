import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MoonCloudy",
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
    const RemixMoonCloudy = () => {
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
          "d": "M8.67 5.007a7 7 0 0 1 7.55-3.901 4.5 4.5 0 0 0 5.674 5.674c.07.396.106.804.106 1.22a6.969 6.969 0 0 1-.865 3.373A5.5 5.5 0 0 1 17.5 21H9a8 8 0 0 1-.33-15.993zm2.177.207a8.016 8.016 0 0 1 5.61 4.885 5.529 5.529 0 0 1 2.96.245c.226-.425.393-.885.488-1.37a6.502 6.502 0 0 1-5.878-5.88 5.003 5.003 0 0 0-3.18 2.12z"
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
          "d": "M8.67 5.007a7 7 0 0 1 7.55-3.901 4.5 4.5 0 0 0 5.674 5.674c.07.396.106.804.106 1.22a6.969 6.969 0 0 1-.865 3.373A5.5 5.5 0 0 1 17.5 21H9a8 8 0 0 1-.33-15.993zm2.177.207a8.016 8.016 0 0 1 5.61 4.885 5.529 5.529 0 0 1 2.96.245c.226-.425.393-.885.488-1.37a6.502 6.502 0 0 1-5.878-5.88 5.003 5.003 0 0 0-3.18 2.12zM17.5 19a3.5 3.5 0 1 0-2.5-5.95V13a6 6 0 1 0-6 6h8.5z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixMoonCloudy);
    };
  }
});
export {
  _sfc_main as default
};
