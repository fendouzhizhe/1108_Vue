//引入UUID
import {getUUID} from '@/utils/storageUtils'

const state={
  //用户信息数据
  userInfo:{},
  //临时用户ID
  userTempId:getUUID()
}
const mutations={}
const actions={}
const getters={}

export default {
  state,
  mutations,
  actions,
  getters
}