<template>
  <div id="app">
  <div style="display:none" >
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <el-button @click.native="startHacking">Let's do it</el-button>
  </div>

    <h3>共有用户: {{users.length}}</h3>
    <el-table
       :data="users"
       style="width: 100%"
       height="1250"
       border
       stripe
       :row-class-name="tableRowClassName">

       <el-table-column prop="mobile"       label="手机号" width="130" />
       <el-table-column prop="age"          label="年龄" width="60"   />
       <el-table-column prop="sex"          label="性别" width="60"   />
       <el-table-column   inline-template  label="故事"  width="60">
          <el-popover trigger="hover" placement="top" ref="popover4"   width="300">
            <p> {{ row.content }}</p>
            <div slot="reference">
              <el-tag><div class="content">{{ row.content }}</div></el-tag>
            </div>
          </el-popover>
       </el-table-column>
       <el-table-column prop="nickname"     label="昵称" width="90"   />
       <el-table-column prop="productId"    label="物品" width="60" />
       <el-table-column   inline-template  label="图片" width="100"  >
               <el-popover trigger="hover" placement="right" width="60">
                <img :src="row.img" />
                 <div slot="reference">
                   <el-tag>  <img :src="row.img" width="60px" height="60px" /> </el-tag>
                 </div>
               </el-popover>
       </el-table-column>
       <el-table-column prop="createdAt" label="创建时间" width="150"/>
      </el-table>
  </div>
</template>


<script>

import AV from 'leancloud-storage';


Date.prototype.pattern=function(fmt) {
    var o = {
    "M+" : this.getMonth()+1, //月份
    "d+" : this.getDate(), //日
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
    "H+" : this.getHours(), //小时
    "m+" : this.getMinutes(), //分
    "s+" : this.getSeconds(), //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds() //毫秒
    };
    var week = {
    "0" : "/u65e5",
    "1" : "/u4e00",
    "2" : "/u4e8c",
    "3" : "/u4e09",
    "4" : "/u56db",
    "5" : "/u4e94",
    "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}


export default {
  created(){

    const appId = 'O2RXUVqlHFdHRAXRMiTzzqCe-gzGzoHsz';
    const appKey = 'B3jDpT847ccj3hYQkh7Xk4xu';
    AV.init({ appId, appKey });

      var activity_user = AV.Object.extend('activity_user');

     new AV.Query(activity_user)
     .descending('createdAt')
     .find()
     .then(t => {
       this.users = t.map( u => {
          var d =  u.attributes;
          d.createdAt = u.createdAt.pattern("yyyy-MM-dd HH:mm");
          d.updatedAt = u.updatedAt.pattern("yyyy-MM-dd HH:mm");
          d.id        = u.id;
          d.cid       = u.cid;
          return d
       })
     })
     .catch(console.error);

  },
  data () {
    return {
      users:[],
      msg: 'Use Vue 2.0 Today!',
    }
  },

  methods: {
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    },
    tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      }
  }
}
</script>


<style>
.el-popover p {
  line-height:27px;
  font-size:18px;
}
  .el-table .info-row {
    background: #c9e5f5;
  }
  .el-table .positive-row {
    background: #e2f0e4;
  }
  body {
    font-family: Helvetica, sans-serif;
  }
  .content {
    width:110px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
  }
</style>
