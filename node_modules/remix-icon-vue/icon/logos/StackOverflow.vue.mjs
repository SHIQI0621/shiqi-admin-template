import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "StackOverflow",
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
    const RemixStackOverflow = () => {
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
          "d": "M18 20.002V14.67h2v7.333H4V14.67h2v5.333h12zM7.599 14.736l.313-1.98 8.837 1.7-.113 1.586-9.037-1.306zm1.2-4.532l.732-1.6 7.998 3.733-.733 1.599-7.998-3.732zm2.265-3.932l1.133-1.333 6.798 5.665-1.133 1.333-6.798-5.665zm4.332-4.132l5.265 7.064-1.4 1.067-5.264-7.065 1.4-1.066zM7.332 18.668v-2h9.33v2h-9.33z"
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
          "d": "M18 20.002V15h2v7.002H4V15h2v5.002h12zM7.5 18v-2h9v2h-9zm.077-4.38l.347-1.97 8.864 1.563-.348 1.97-8.863-1.563zm1.634-5.504l1-1.732 7.794 4.5-1 1.732-7.794-4.5zm3.417-4.613l1.532-1.286 5.785 6.895-1.532 1.285-5.785-6.894z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixStackOverflow);
    };
  }
});
export {
  _sfc_main as default
};
