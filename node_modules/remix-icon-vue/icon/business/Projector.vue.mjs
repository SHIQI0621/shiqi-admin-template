import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Projector",
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
    const RemixProjector = () => {
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
          "d": "M11.112 12a4.502 4.502 0 0 0 8.776 0H22v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8h9.112zM5 16h2v2H5v-2zm10.5-2.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zM11.112 10H2V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v6h-2.112a4.502 4.502 0 0 0-8.776 0z"
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
          "d": "M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm8.126 9H4v7h16v-7h-1.126a4.002 4.002 0 0 1-7.748 0zm0-2a4.002 4.002 0 0 1 7.748 0H20V5H4v5h7.126zM15 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-9 2h2v2H6v-2z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixProjector);
    };
  }
});
export {
  _sfc_main as default
};
