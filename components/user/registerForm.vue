<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="form.username" placeholder="用户名手机"></el-input>
    </el-form-item>
    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="chkpassword">
      <el-input v-model="form.chkpassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {

    const validatePass = (rule,value,callback)=>{
      if(value === ''){
        callback(new Error('密码不可为空！'));
      }else if(value!==this.form.password){
        callback(new Error('密码不一致，请重新确认！'));
      }else{
        callback()
      }
    }



    return {
      // 表单数据
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        chkpassword: ""
      },
      // 表单规则
      rules: {
        username: [
          {
            required: true,
            message: "请输入手机号！",
            trigger: "blur"
          }
        ],
        captcha: [
          {
            required: true,
            message: "请输入验证！",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "请输入用户名！",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码！",
            trigger: "blur"
          }
        ],
        chkpassword: [
          {
           validator:validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      console.log(this.form.username);
      
      if (!this.form.username) {
        this.$confirm("手机号码不能为空!", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      if(this.form.username.length!==11){
         this.$confirm("手机号码不符合规则,请输入正确的手机号码！", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }

      this.$store.dispatch("user/sendCode",this.form.username)
      .then(res=>{
           this.$confirm(`当前验证码是: ${res}`, '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'success'
                });
      })
    },

    // 注册
    handleRegSubmit() {
      // console.log(this.form);
      this.$refs.form.validate(valid=>{
        if(valid){
          const {chkpassword, ...props} = this.form;
          this.$axios({
            url:"/accounts/register",
            method:'POST',
            data:props
          }).then(res=>{
              this.$store.commit("user/setUserInfo", res.data);
              this.$router.push("/");
          // this.$store.dispatch("user/register",props)
          // .then(res=>{
          //   console.log(res);
          })
           }
        }) 
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>