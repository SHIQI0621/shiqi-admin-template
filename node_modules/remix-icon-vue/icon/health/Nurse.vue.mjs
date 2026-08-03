import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Nurse",
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
    const RemixNurse = () => {
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
          "d": "M14.956 15.564c2.659 1.058 4.616 3.5 4.982 6.436H4.062c.366-2.936 2.323-5.378 4.982-6.436L12 20l2.956-4.436zM18 2v6c0 3.314-2.686 6-6 6s-6-2.686-6-6V2h12zm-2 6H8c0 2.21 1.79 4 4 4s4-1.79 4-4z"
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
          "d": "M12 15c4.08 0 7.446 3.054 7.938 7H4.062c.492-3.946 3.858-7 7.938-7zm-1.813 2.28C8.753 17.734 7.546 18.713 6.8 20H12l-1.813-2.72zm3.627 0L12 20h5.199c-.745-1.287-1.952-2.266-3.385-2.72zM18 2v6c0 3.314-2.686 6-6 6s-6-2.686-6-6V2h12zM8 8c0 2.21 1.79 4 4 4s4-1.79 4-4H8zm8-4H8v2h8V4z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixNurse);
    };
  }
});
export {
  _sfc_main as default
};
