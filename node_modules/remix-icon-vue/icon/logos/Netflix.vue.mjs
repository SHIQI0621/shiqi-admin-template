import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Netflix",
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
    const RemixNetflix = () => {
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
          "d": "M11.29 3.814l2.02 5.707.395 1.116.007-4.81.01-4.818h4.27L18 11.871c.003 5.98-.003 10.89-.015 10.9-.012.009-.209 0-.436-.027-.989-.118-2.29-.236-3.34-.282a14.57 14.57 0 0 1-.636-.038c-.003-.004-.273-.762-.776-2.184v-.004l-2.144-6.061-.34-.954-.008 4.586c-.006 4.365-.01 4.61-.057 4.61-.163 0-1.57.09-2.04.136-.308.027-.926.09-1.37.145-.446.051-.816.085-.823.078C6.006 22.77 6 17.867 6 11.883V1.002h.005V1h4.288l.028.08c.007.016.065.176.157.437l.641 1.778.173.496-.001.023z"
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
          "d": "M15.984 17.208L16 2h2v20a7.593 7.593 0 0 0-2.02-.5L8 6.302V21.5a7.335 7.335 0 0 0-2 .5V2h2l7.984 15.208z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixNetflix);
    };
  }
});
export {
  _sfc_main as default
};
