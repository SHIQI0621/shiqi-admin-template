import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChatQuote",
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
    const RemixChatQuote = () => {
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
          "d": "M21 3c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H6.455L2 22.5V4c0-.552.448-1 1-1h18zM10.962 8.1l-.447-.688C8.728 8.187 7.5 9.755 7.5 11.505c0 .995.277 1.609.792 2.156.324.344.837.589 1.374.589.966 0 1.75-.784 1.75-1.75 0-.92-.711-1.661-1.614-1.745-.16-.015-.324-.012-.479.01v-.092c.006-.422.092-1.633 1.454-2.466l.185-.107-.447-.688zm4.553-.688c-1.787.775-3.015 2.343-3.015 4.093 0 .995.277 1.609.792 2.156.324.344.837.589 1.374.589.966 0 1.75-.784 1.75-1.75 0-.92-.711-1.661-1.614-1.745-.16-.015-.324-.012-.479.01 0-.313-.029-1.762 1.639-2.665z"
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
          "d": "M21 3c.552 0 1 .448 1 1v14c0 .552-.448 1-1 1H6.455L2 22.5V4c0-.552.448-1 1-1h18zm-1 2H4v13.385L5.763 17H20V5zm-9.485 2.412l.447.688c-1.668.903-1.639 2.352-1.639 2.664.155-.02.318-.024.48-.009.902.084 1.613.825 1.613 1.745 0 .966-.784 1.75-1.75 1.75-.537 0-1.05-.245-1.374-.59-.515-.546-.792-1.16-.792-2.155 0-1.75 1.228-3.318 3.015-4.093zm5 0l.447.688c-1.668.903-1.639 2.352-1.639 2.664.155-.02.318-.024.48-.009.902.084 1.613.825 1.613 1.745 0 .966-.784 1.75-1.75 1.75-.537 0-1.05-.245-1.374-.59-.515-.546-.792-1.16-.792-2.155 0-1.75 1.228-3.318 3.015-4.093z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixChatQuote);
    };
  }
});
export {
  _sfc_main as default
};
