<template>
  <div class="form-group row mb-3">
    <div class="col-md-8 row">
      <label class="col-md-4 me-4">DateofBirth</label>
      <div class="col-md-7">
        <datepicker v-model="date" format="dd-MM-yyyy" input-class="form-control"></datepicker>
      </div>
    </div>
    <div class="col-md-4 row">
      <label class="col-md-3" for="age">Age</label>
      <div class="col-md-9">
        <input id="age" type="text" class="form-control" :value="calculateAge" />
      </div>
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js"></script>
<script>
import datepicker from "vuejs-datepicker";
export default {
  name: "Age",
  components: {
    datepicker,
  },
  props: ['disabled'],
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    calculateAge() {
      this.$emit('getDate', this.date.toLocaleDateString());
      var today = new Date();
      var age = today.getFullYear() - this.date.getFullYear();
      var m = today.getMonth() - this.date.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < this.date.getDate())) {
        age--;
      }
      return age;
    },
  },
};
</script>
