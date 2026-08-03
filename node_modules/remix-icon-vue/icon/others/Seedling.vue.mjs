import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Seedling",
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
    const RemixSeedling = () => {
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
          "d": "M22 7v2.5c0 3.59-2.91 6.5-6.5 6.5H13v5h-2v-7l.019-1c.255-3.356 3.06-6 6.481-6H22zM6 3c3.092 0 5.716 2.005 6.643 4.786-1.5 1.275-2.49 3.128-2.627 5.214H9c-3.866 0-7-3.134-7-7V3h4z"
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
          "d": "M6 3c3.49 0 6.383 2.554 6.913 5.895C14.088 7.724 15.71 7 17.5 7H22v2.5c0 3.59-2.91 6.5-6.5 6.5H13v5h-2v-8H9c-3.866 0-7-3.134-7-7V3h4zm14 6h-2.5c-2.485 0-4.5 2.015-4.5 4.5v.5h2.5c2.485 0 4.5-2.015 4.5-4.5V9zM6 5H4v1c0 2.761 2.239 5 5 5h2v-1c0-2.761-2.239-5-5-5z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixSeedling);
    };
  }
});
export {
  _sfc_main as default
};
