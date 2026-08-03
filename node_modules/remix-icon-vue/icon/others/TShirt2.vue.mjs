import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "TShirt2",
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
    const RemixTShirt2 = () => {
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
          "d": "M21 3a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2.001L19 20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1l-.001-8.001L3 12a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6a3 3 0 0 0 6 0h6z"
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
          "d": "M9 3a3 3 0 0 0 6 0h6a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-2.001L19 20a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1l-.001-8.001L3 12a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6zm11 1.999h-3.417l-.017.041a5.002 5.002 0 0 1-4.35 2.955L12 8a5.001 5.001 0 0 1-4.566-2.96L7.416 5H4v5l2.999-.001V19H17l-.001-9L20 9.999v-5z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixTShirt2);
    };
  }
});
export {
  _sfc_main as default
};
