//引入Vue
import Vue from 'vue'
//引入VeeValidate
import VeeValidate from 'vee-validate'
//引入zh_CN
import zh_CN from 'vee-validate/dist/locale/zh_CN'
//声明使用
Vue.use(VeeValidate)
VeeValidate.Validator.localize('zh_CN', {
  //中文的提示信息
  messages:zh_CN.messages,
  //翻译正文
  attributes:{
    mobile:'手机号码',
    code:'图形验证码',
    password:'密码',
    password2:'确认密码'
  }
})
VeeValidate.Validator.extend('checkMobile',{
  //验证的提示信息
  getMessage:field=>`请输入正确的`+field,
  //如何验证
  validate:value=>/^[1]\d{10}$/.test(value)
})
VeeValidate.Validator.extend('checkCode',{
  //验证的提示信息
  getMessage:field=>`请输入正确的`+field,
  //如何验证
  validate:value=>/^\d{4}$/.test(value)
})
// var dict = {
//   zh_CN: {
//     messages: {
//       required: function (field) {
//         return '请输入' + field;
//       },
//       confirmed: function (field) {
//         return '两次输入的密码不一致';
//       }
//     }, 
//     attributes: {
//       OldPassword: '旧密码',
//       NewPassword: '新密码',
//       ConfirmNewPassword: '确认密码',
//     }
//   }
// };
// VeeValidate.Validator.localize('zh_CN', dict.zh_CN);