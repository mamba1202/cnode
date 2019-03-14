<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="jduge">......</button>
  <button
      v-for="btn in pagebtns"
      @click="changeBtn(btn)"
      :class="[{currentPage:btn == currentPage},'pagebtn']"
    >
      <!--第一个currentPage是类名，第二个是data中定义的----pagebtn为默认class-->
      {{btn}}
      <!--当前btn==currentPage时class生效-->
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  name: "Pagination",
  data() {
    return {
      pagebtns: [1, 2, 3, 4, 5, "......"],
      currentPage: 1, //表示当前选中页码
      jduge: false,
    };
  },
  methods: {
    changeBtn(page) {
      //点击上一页，下一页
      if (typeof page != "number") {
        switch (page.target.innerText) {
          case "上一页":
            $("button.currentPage")
              .prev()
              .click();
            break;
          case "下一页":
            $("button.currentPage")
              .next()
              .click();
            break;
          case "首页":
            this.pagebtns = [1, 2, 3, 4, 5, "......"];
            this.changeBtn(1);
            break;
          default:
            //默认情况
            break;
        }
        return;
      }
      this.currentPage = page; //page传递进来的页码（点击）
      if(page>4){
          this.jduge = true
      }else{
          this.jduge = false
      }
      if (page == this.pagebtns[4]) {
        this.pagebtns.shift(); //移除第一个元素
        this.pagebtns.splice(4, 0, this.pagebtns[3] + 1); //移除第一个元素后给第四个元素后面加一个
      } else if (page == this.pagebtns[0] && page != 1) {
        //!=1时不能执行
        //先在第一个位置添加一个数字
        this.pagebtns.unshift(this.pagebtns[0] - 1);
        //再移除最后一个数字
        this.pagebtns.splice(5, 1);
      }
      this.$emit('handleList',this.currentPage) //currentPage为点击的页码
    }
  }
};
</script>
<style scoped>
.pagination {
  margin-top: 5px;
  margin-bottom: 20px;
  background-color: white;
  padding: 6px 20px;
  border-radius: 5px;
  /*box-shadow: 0px 2px 9px #888888;*/
  border: 1px solid #888888;
}

button {
  background-color: #fff;
  border: 1px solid #ddd;
  color: #778087;
  border-radius: 3px;
  outline: none;
  height: 21px;
  cursor: pointer;
  padding: 0 2px;
  width: 55px;
  height: 29px;
}

.pagebtn {
  position: relative;
  bottom: 1px;
  width: 40px;
  margin: 0 4px;
}

.currentPage {
  color: white;
  background-color: #1f1b1b;
}
</style>

