import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Ubuntu",
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
    const RemixUbuntu = () => {
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
          "d": "M22 12c0 5.522-4.477 10-10 10S2 17.522 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10zM5.2 10.664a1.335 1.335 0 1 0 0 2.67 1.335 1.335 0 0 0 0-2.67zm9.533 6.069a1.334 1.334 0 1 0 1.334 2.31 1.334 1.334 0 0 0-1.334-2.31zM8.1 12c0-1.32.656-2.485 1.659-3.19l-.976-1.636a5.813 5.813 0 0 0-2.399 3.371 1.875 1.875 0 0 1 0 2.91 5.813 5.813 0 0 0 2.398 3.371l.977-1.636A3.892 3.892 0 0 1 8.1 12zM12 8.1a3.9 3.9 0 0 1 3.884 3.554l1.903-.028a5.781 5.781 0 0 0-1.723-3.762A1.872 1.872 0 0 1 13.55 6.41a5.829 5.829 0 0 0-4.12.39l.927 1.663A3.885 3.885 0 0 1 12 8.1zm0 7.8c-.587 0-1.143-.13-1.643-.363l-.927 1.662a5.774 5.774 0 0 0 4.12.39 1.872 1.872 0 0 1 2.514-1.454 5.782 5.782 0 0 0 1.723-3.762l-1.903-.027A3.898 3.898 0 0 1 12 15.9zm2.732-8.633a1.335 1.335 0 1 0 1.335-2.312 1.335 1.335 0 0 0-1.335 2.312z"
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
          "d": "M8.667 19.273l1.006-1.742a6.001 6.001 0 0 0 8.282-4.781h2.012A7.97 7.97 0 0 1 18.928 16a8 8 0 0 1-1.452 1.835 2.493 2.493 0 0 0-1.976.227 2.493 2.493 0 0 0-1.184 1.596 7.979 7.979 0 0 1-5.65-.385zm-1.3-.75a7.979 7.979 0 0 1-3.156-4.7C4.696 13.367 5 12.72 5 12c0-.72-.304-1.369-.791-1.825A8 8 0 0 1 5.072 8a7.97 7.97 0 0 1 2.295-2.524l1.006 1.742a6.001 6.001 0 0 0 0 9.563l-1.005 1.742zm1.3-13.796a8.007 8.007 0 0 1 5.648-.387c.152.65.562 1.238 1.185 1.598.623.36 1.337.42 1.976.227a8.007 8.007 0 0 1 2.49 5.085h-2.013A5.99 5.99 0 0 0 15 6.804a5.99 5.99 0 0 0-5.327-.335L8.667 4.727zM16 5.072a1.5 1.5 0 1 1 1.5-2.598A1.5 1.5 0 0 1 16 5.072zM4 12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm12 6.928a1.5 1.5 0 1 1 1.5 2.598 1.5 1.5 0 0 1-1.5-2.598z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixUbuntu);
    };
  }
});
export {
  _sfc_main as default
};
