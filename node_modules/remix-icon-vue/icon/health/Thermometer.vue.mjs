import { defineComponent, reactive, openBlock, createBlock, createVNode } from "vue";
import { Props } from "../props.mjs";
import isNumber from "../../utils/isNumber.mjs";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Thermometer",
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
    const RemixThermometer = () => {
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
          "d": "M20.556 3.444c1.562 1.562 1.562 4.094 0 5.657l-8.2 8.2c-.642.642-1.484 1.047-2.387 1.147l-3.378.374-2.298 2.3c-.39.39-1.024.39-1.414 0-.39-.391-.39-1.024 0-1.415l2.298-2.299.375-3.377c.1-.903.505-1.745 1.147-2.387l8.2-8.2c1.563-1.562 4.095-1.562 5.657 0zm-9.192 9.192L9.95 14.05l2.121 2.122 1.414-1.415-2.121-2.121zm2.828-2.828l-1.414 1.414 2.121 2.121 1.415-1.414-2.122-2.121zm2.829-2.829l-1.414 1.414 2.12 2.122L19.143 9.1l-2.121-2.122z"
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
          "d": "M20.556 3.444c1.562 1.562 1.562 4.094 0 5.657l-8.2 8.2c-.642.642-1.484 1.047-2.387 1.147l-3.378.374-2.298 2.3c-.39.39-1.024.39-1.414 0-.39-.391-.39-1.024 0-1.415l2.298-2.299.375-3.377c.1-.903.505-1.745 1.147-2.387l8.2-8.2c1.563-1.562 4.095-1.562 5.657 0zm-4.242 1.414l-8.2 8.2c-.322.321-.524.742-.574 1.193l-.276 2.485 2.485-.276c.45-.05.872-.252 1.193-.573l.422-.423L9.95 14.05l1.414-1.414 1.414 1.414 1.414-1.414-1.414-1.414 1.414-1.414 1.415 1.414 1.414-1.415-1.414-1.414L17.02 6.98l1.414 1.414.707-.707c.781-.78.781-2.047 0-2.828-.78-.781-2.047-.781-2.828 0z"
        }, null)])])]);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(RemixThermometer);
    };
  }
});
export {
  _sfc_main as default
};
