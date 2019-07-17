

export const state = () => {
  return {
      userInfo:{
      token:"",
      user:{}
    }
  }
 
}

export const mutations = {
    setUserInfo(state,data){
      state.userInfo = data
    },
    cleanUserInfo(state){
      // console.log(state);
      
      state.userInfo = {
        token:"",
        user:{},
      }
    }
}

export const actions = {
  login({commit},data){
    return this.$axios({
      url:'/accounts/login',
      method:'POST',
      data:data
    }).then(res=>{
      console.log(res)
      commit("setUserInfo",res.data)
      // return res.data
    })
  },
  sendCode({commit},phoneNumber){
    return  this.$axios({
        url:`/captchas`,
        method:"POST",
        data:{
          tel: phoneNumber
        }
      }).then(res=>{
        const {code} = res.data
        return code
      })
  },
  // register({commit},data){
  //   return this.$axios({
  //       url: `/accounts/register`,
  //       method: 'POST',
  //       data: data
  //     }).then(res => {
  //       console.log(res);
  //     })  
  // }
}