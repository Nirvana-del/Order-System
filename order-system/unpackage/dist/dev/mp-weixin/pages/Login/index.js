"use strict";
const common_vendor = require("../../common/vendor.js");
const store_modules_user = require("../../store/modules/user.js");
const api_user_index = require("../../api/user/index.js");
require("../../store/index.js");
require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_forms_item2 = common_vendor.resolveComponent("uni-forms-item");
  const _easycom_uni_forms2 = common_vendor.resolveComponent("uni-forms");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_data_select2 = common_vendor.resolveComponent("uni-data-select");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_forms_item2 + _easycom_uni_forms2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_data_select2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_forms_item = () => "../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js";
const _easycom_uni_forms = () => "../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_data_select = () => "../../uni_modules/uni-data-select/components/uni-data-select/uni-data-select.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_forms_item + _easycom_uni_forms + _easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_data_select + _easycom_uni_popup_message)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const {
      redirectInfo,
      updateRedirectInfo,
      updateUserInfo,
      userLogin,
      token
    } = store_modules_user.useUserStoreHook();
    const registerForm = common_vendor.ref();
    const message = common_vendor.ref();
    const error_message = common_vendor.ref();
    const registForm = common_vendor.ref();
    const loginForm = common_vendor.ref();
    const customForm = common_vendor.ref();
    const state = common_vendor.reactive({
      userinfo: {
        username: "test",
        password: "123456"
      },
      registFormData: {
        username: "",
        nickname: "",
        password: "",
        password_confirm: "",
        mobile: "",
        gender: "",
        avatar: ""
      },
      customRules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: "请填写用户名"
            },
            // 对name字段进行长度验证
            {
              minLength: 3,
              maxLength: 5,
              errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符"
            }
          ],
          validateTrigger: "blur"
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "请填写密码"
          }],
          validateTrigger: "blur"
        }
      },
      baseRules: {
        username: {
          rules: [
            {
              required: true,
              errorMessage: "请填写用户名"
            },
            // 对name字段进行长度验证
            {
              minLength: 3,
              maxLength: 5,
              errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符"
            }
          ],
          validateTrigger: "blur"
        },
        nickname: {
          rules: [
            {
              required: true,
              errorMessage: "请填写用户名"
            },
            // 对name字段进行长度验证
            {
              minLength: 3,
              maxLength: 5,
              errorMessage: "{label}长度在 {minLength} 到 {maxLength} 个字符"
            }
          ],
          validateTrigger: "blur"
        },
        password: {
          rules: [{
            required: true,
            errorMessage: "请填写密码"
          }],
          validateTrigger: "blur"
        },
        password_confirm: {
          rules: [{
            required: true,
            errorMessage: "请确认密码"
          }],
          validateTrigger: "blur"
        },
        mobile: {
          rules: [{
            required: true,
            errorMessage: "请填写电话号码"
          }],
          validateTrigger: "blur"
        },
        gender: {
          rules: [{
            required: true,
            errorMessage: "请填写性别"
          }],
          validateTrigger: "blur"
        }
      }
    });
    const {
      userinfo,
      customRules,
      baseRules,
      registFormData
    } = common_vendor.toRefs(state);
    function chooseImg() {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          console.log(res);
          const tempFilePaths = res.tempFilePaths;
          common_vendor.index.uploadFile({
            url: "http://localhost:8080/worder/files",
            //post请求的地址
            filePath: tempFilePaths[0],
            name: "file",
            success: (uploadFileRes) => {
              console.log(uploadFileRes);
              var obj = JSON.parse(uploadFileRes.data);
              console.log(obj.data.url);
              registFormData.value.avatar = obj.data.url;
              message.value.open();
            }
          });
        }
      });
    }
    const range = [
      {
        value: 0,
        text: "未知"
      },
      {
        value: 1,
        text: "男"
      },
      {
        value: 2,
        text: "女"
      }
    ];
    async function submitRegister() {
      console.log(registFormData.value);
      const {
        username,
        nickname,
        password,
        password_confirm,
        mobile,
        gender,
        avatar
      } = registFormData.value;
      if (password !== password_confirm) {
        error_message.value.open();
      } else {
        registerForm.value.close();
        const newObj = {
          username,
          nickname,
          password,
          mobile,
          gender,
          avatar
        };
        console.log("去注册");
        const res = await api_user_index.registerUserApi(newObj);
        console.log(res);
      }
    }
    function submit() {
      customForm.value.validate().then(async (data) => {
        console.log(data);
        await userLogin(data);
        loginForm.value.close();
        navigateBack();
      }).catch((err) => {
        console.log(err);
      });
    }
    function gotoReg() {
      registerForm.value.open();
    }
    function gotoLogin() {
      loginForm.value.open();
    }
    common_vendor.onShow(() => {
      common_vendor.index.hideHomeButton();
      console.log("token", token);
      if (token !== "") {
        console.log("跳转到首页");
        common_vendor.index.switchTab({
          url: "/pages/Home/index"
        });
      }
    });
    function navigateBack() {
      common_vendor.index.switchTab({
        url: "/pages/Home/index",
        complete: () => {
          updateRedirectInfo(null);
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "contact-filled",
          size: "100",
          color: "#AFAFAF"
        }),
        b: common_vendor.o(gotoReg),
        c: common_vendor.o(gotoLogin),
        d: common_vendor.o(($event) => common_vendor.unref(userinfo).username = $event),
        e: common_vendor.p({
          placeholder: "请输入用户名",
          modelValue: common_vendor.unref(userinfo).username
        }),
        f: common_vendor.p({
          label: "用户名",
          required: true,
          name: "username"
        }),
        g: common_vendor.o(($event) => common_vendor.unref(userinfo).password = $event),
        h: common_vendor.p({
          placeholder: "请输入密码",
          modelValue: common_vendor.unref(userinfo).password
        }),
        i: common_vendor.p({
          label: "密码",
          required: true,
          name: "password"
        }),
        j: common_vendor.o(submit),
        k: common_vendor.sr(customForm, "1cea3c5d-3,1cea3c5d-2", {
          "k": "customForm"
        }),
        l: common_vendor.p({
          rules: common_vendor.unref(customRules),
          modelValue: common_vendor.unref(userinfo)
        }),
        m: common_vendor.o(submit),
        n: common_vendor.p({
          mode: "input",
          title: "登录信息"
        }),
        o: common_vendor.sr(loginForm, "1cea3c5d-1", {
          "k": "loginForm"
        }),
        p: common_vendor.p({
          type: "dialog"
        }),
        q: common_vendor.o(($event) => common_vendor.unref(registFormData).username = $event),
        r: common_vendor.p({
          placeholder: "请输入用户名",
          modelValue: common_vendor.unref(registFormData).username
        }),
        s: common_vendor.p({
          label: "用户名",
          name: "username",
          required: true
        }),
        t: common_vendor.o(($event) => common_vendor.unref(registFormData).nickname = $event),
        v: common_vendor.p({
          placeholder: "请输入昵称",
          modelValue: common_vendor.unref(registFormData).nickname
        }),
        w: common_vendor.p({
          label: "昵称",
          name: "nickname",
          required: true
        }),
        x: common_vendor.o(($event) => common_vendor.unref(registFormData).password = $event),
        y: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          modelValue: common_vendor.unref(registFormData).password
        }),
        z: common_vendor.p({
          label: "密码",
          name: "password",
          required: true
        }),
        A: common_vendor.o(($event) => common_vendor.unref(registFormData).password_confirm = $event),
        B: common_vendor.p({
          placeholder: "请再次输入密码",
          modelValue: common_vendor.unref(registFormData).password_confirm
        }),
        C: common_vendor.p({
          label: "确认密码",
          name: "password_confirm",
          required: true
        }),
        D: common_vendor.o(($event) => common_vendor.unref(registFormData).mobile = $event),
        E: common_vendor.p({
          type: "password",
          placeholder: "请输入电话号码",
          modelValue: common_vendor.unref(registFormData).mobile
        }),
        F: common_vendor.p({
          label: "电话",
          name: "mobile",
          required: true
        }),
        G: common_vendor.o(($event) => common_vendor.unref(registFormData).gender = $event),
        H: common_vendor.p({
          localdata: range,
          modelValue: common_vendor.unref(registFormData).gender
        }),
        I: common_vendor.p({
          label: "性别",
          name: "gender",
          required: true
        }),
        J: common_vendor.o(chooseImg),
        K: common_vendor.p({
          label: "头像"
        }),
        L: common_vendor.sr(registForm, "1cea3c5d-10,1cea3c5d-9", {
          "k": "registForm"
        }),
        M: common_vendor.p({
          rules: common_vendor.unref(baseRules),
          modelValue: common_vendor.unref(registFormData)
        }),
        N: common_vendor.o(submitRegister),
        O: common_vendor.p({
          mode: "input",
          title: "注册信息"
        }),
        P: common_vendor.sr(registerForm, "1cea3c5d-8", {
          "k": "registerForm"
        }),
        Q: common_vendor.p({
          type: "dialog"
        }),
        R: common_vendor.p({
          type: "success",
          message: "上传成功",
          duration: 2e3
        }),
        S: common_vendor.sr(message, "1cea3c5d-24", {
          "k": "message"
        }),
        T: common_vendor.p({
          type: "message"
        }),
        U: common_vendor.p({
          type: "error",
          message: "两次输入密码不一致",
          duration: 2e3
        }),
        V: common_vendor.sr(error_message, "1cea3c5d-26", {
          "k": "error_message"
        }),
        W: common_vendor.p({
          type: "message"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/23877/Desktop/毕设/点餐小程序/order-system/pages/Login/index.vue"]]);
wx.createPage(MiniProgramPage);
