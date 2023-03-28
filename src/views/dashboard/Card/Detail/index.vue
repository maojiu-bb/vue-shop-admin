<template>
  <div>
    <div class="card-header">
      <span>{{ title }}</span>
      <i class="el-icon-info" />
    </div>
    <div class="card-body">
      <h1>{{ number }}</h1>
      <div>
        <slot name="charts" />
      </div>
    </div>
    <div class="card-footer">
      <div>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['number', 'title']
}
</script>

<style scoped>
.card-header span {
  color: #ccc;
}
.card-header i {
  margin-left: 5px;
  color: #ccc;
}
.card-body {
  height: 120px;
}
.card-body div {
  height: 70px;
  width: 100%;
}
.card-body h1 {
  font-weight: 400;
  font-size: 26px;
}
.card-footer {
  border-top: 1px solid #eee;
}
.card-footer div {
  margin-top: 10px;
  font-size: 14px;
}
</style>
