import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "NotificationOff",
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
    const RemixNotificationOff = () => {
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
          "d": "M18.586 20H4a.5.5 0 0 1-.4-.8l.4-.533V10c0-1.33.324-2.584.899-3.687L1.393 2.808l1.415-1.415 19.799 19.8-1.415 1.414L18.586 20zM20 15.786L7.559 3.345A8 8 0 0 1 20 10v5.786zM9.5 21h5a2.5 2.5 0 1 1-5 0z"
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
          "d": "M18.586 20H4a.5.5 0 0 1-.4-.8l.4-.533V10c0-1.33.324-2.584.899-3.687L1.393 2.808l1.415-1.415 19.799 19.8-1.415 1.414L18.586 20zM6.408 7.822A5.985 5.985 0 0 0 6 10v8h10.586L6.408 7.822zM20 15.786l-2-2V10a6 6 0 0 0-8.99-5.203L7.56 3.345A8 8 0 0 1 20 10v5.786zM9.5 21h5a2.5 2.5 0 1 1-5 0z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixNotificationOff);
    };
  }
});
export {
  _sfc_main as default
};
