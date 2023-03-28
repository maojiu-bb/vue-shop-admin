<template>
  <div class="trank">
    <h3>
      门店{{ title }}排名<i
        class="el-icon-caret-top"
        style="color: yellowgreen"
      />
    </h3>
    <ul>
      <li v-for="item in detail" :key="item.id">
        <span>{{ item.id }}</span>
        <span>{{ item.name }}</span>
        <span>{{ item.num }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['title'],
  data() {
    return {
      detail: [
        {
          id: 1,
          name: '肯德基',
          num: 323234
        },
        {
          id: 2,
          name: '麦当劳',
          num: 299132
        },
        {
          id: 3,
          name: '华莱士',
          num: 283998
        },
        {
          id: 4,
          name: '海底捞',
          num: 266223
        },
        {
          id: 5,
          name: '西贝筱面村',
          num: 223445
        },
        {
          id: 6,
          name: '汉堡王',
          num: 219663
        },
        {
          id: 7,
          name: '真功夫',
          num: 200997
        },
        {
          id: 8,
          name: '川味火锅',
          num: 199876
        }
      ]
    }
  }
}
</script>

<style scoped>
.trank {
  width: 100%;
  height: 350px;
}
.trank h3 {
  margin-top: -5px;
  font-weight: 400;
  font-size: 16px;
}
ul {
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
ul li {
  list-style: none;
  display: flex;
  height: 40px;
}
ul li span:first-child {
  flex: 2;
}
ul li span:nth-child(2) {
  flex: 5;
}
ul li span:nth-child(3) {
  flex: 3;
}
</style>
