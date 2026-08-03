import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SignalWifiOff",
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
    const RemixSignalWifiOff = () => {
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
          "d": "M2.808 1.393l17.677 17.678-1.414 1.414-3.683-3.683L12 21 .69 6.997c.914-.74 1.902-1.391 2.95-1.942L1.394 2.808l1.415-1.415zM12 3c4.284 0 8.22 1.497 11.31 3.996l-5.407 6.693L7.724 3.511C9.094 3.177 10.527 3 12 3z"
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
          "d": "M2.808 1.393l17.677 17.678-1.414 1.414-3.683-3.682L12 21 .69 6.997c.914-.74 1.902-1.391 2.95-1.942L1.394 2.808l1.415-1.415zm.771 5.999L12 17.817l1.967-2.437-8.835-8.836c-.532.254-1.05.536-1.552.848zM12 3c4.284 0 8.22 1.497 11.31 3.996l-5.407 6.693-1.422-1.422 3.939-4.876C17.922 5.841 15.027 5 12 5c-.873 0-1.735.07-2.58.207L7.725 3.51C9.094 3.177 10.527 3 12 3z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixSignalWifiOff);
    };
  }
});
export {
  _sfc_main as default
};
