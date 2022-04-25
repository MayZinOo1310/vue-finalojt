<template>
  <div class="container mt-5">
    <form @submit.prevent="validate">
      <!--<div class="form-group row mb-3">
        <label class="col-md-3" for="id">User ID</label>
        <div class="col-md-9">
          <input
            type="text"
            id="users.id"
            class="form-control"
            v-model="user.id"
            :disabled="disabled == 1"
          />
        </div>
      </div>-->
      <div class="form-group row mb-3">
        <label class="col-md-3" for="name">User Name</label>
        <div class="col-md-9">
          <input
            type="text"
            id="name"
            class="form-control"
            v-model="user.name"
            :disabled="disabled == 1"
          />
          <div class="txt-error">{{ errors.name }}</div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-md-3" for="gender">Gender</label>
        <div class="col-md-9 row">
          <div class="col-md-3">
            <input
              type="radio"
              id="male"
              value="male"
              name="gender"
              v-model="user.gender"
              :disabled="disabled == 1"
            />
            <label class="custom-control-label" for="male">Male</label>
          </div>
          <div class="col-md-3">
            <input
              type="radio"
              id="female"
              value="female"
              name="gender"
              v-model="user.gender"
              :disabled="disabled == 1"
            />
            <label class="custom-control-label" for="female">Female</label>
          </div>
          <div class="txt-error">{{ errors.gender }}</div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-md-3" for="email">Email</label>
        <div class="col-md-9">
          <input
            type="email"
            id="email"
            class="form-control"
            v-model="user.email"
            :disabled="disabled == 1"
          />
          <div class="txt-error">{{ errors.email }}</div>
        </div>
      </div>
      <div class="form-group row mb-3">
        <label class="col-md-3" for="address">Address</label>
        <div class="col-md-9">
          <textarea
            class="form-control"
            id="address"
            v-model="user.address"
            :disabled="disabled == 1"
          ></textarea>
          <div class="txt-error">{{ errors.address }}</div>
        </div>
      </div>
      <Age :disabled="disabled == 1" @getDate="dateHandler" />
      <div class="form-group row mb-3">
        <label class="col-md-3" for="userrole">User Role</label>
        <div class="col-md-5">
          <select
            class="form-select"
            id="userrole"
            v-model="user.userrole"
            :disabled="disabled == 1"
          >
            <option value=""></option>
            <option value="Administrator">Administrator</option>
            <option value="User">User</option>
            <option value="Guest">Guest</option>
          </select>
        </div>
      </div>
      <div class="row">
        <button
          class="btn btn-danger col-md-2 m-3"
          type="button"
          @click="resetHandler"
        >
          {{ this.btnChange }}
        </button>
        <button
          type="submit"
          class="btn btn-danger col-md-2 m-3"
          v-if="disabled == 0"
        >
          Confirm
        </button>
        <button
          type="button"
          class="btn btn-danger col-md-2 m-3"
          @click="register"
          v-if="disabled == 1"
        >
          Register
        </button>
      </div>
    </form>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js"></script>
<script>
import Age from "./Age.vue";
export default {
  name: "Register",
  components: { Age },
  data() {
    return {
      user: {
        id: 0,
        name: "",
        email: "",
        gender: "",
        address: "",
        dob: "",
        userrole: "",
      },
      disabled: 0,
      btnChange: "Clear",
      valid: true,
      success: false,
      errors: {},
      message: null,
    };
  },
  methods: {
    validate(data) {
      this.errors = {};
      const validName = this.validateName(this.user.name);
      this.errors.name = validName.error;
      if (this.valid) {
        this.valid = validName.valid;
      }
      const validGender = this.validateGender(this.user.gender);
      this.errors.gender = validGender.error;
      if (this.valid) {
        this.valid = validGender.valid;
      }
      const validEmail = this.validateEmail(this.user.email);
      this.errors.email = validEmail.error;
      if (this.valid) {
        this.valid = validEmail.valid;
      }
      const validAddress = this.validateAddress(this.user.address);
      this.errors.address = validAddress.error;
      if (this.valid) {
        this.valid = validAddress.valid;
      }
      if (
        !this.user.name == "" &&
        !this.user.email == "" &&
        !this.user.gender == "" &&
        !this.user.address == ""
      ) {
        this.disabled = 1;
      } else {
        this.disabled = 0;
      }
      if (this.disabled) {
        this.btnChange = "Back";
      } else {
        this.btnChange = "Clear";
      }
    },
    register() {
      if (this.disabled == 1) {
        const userInfo = { ...this.user };
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        const userData = JSON.parse(localStorage.getItem("userData")) || [];
        const userList = [...userData, userInfo];
        localStorage.setItem("userData", JSON.stringify(userList));
        this.$router.push({ path: "/" });
      }
    },
    dateHandler(e) {
      this.user.dob = e;
    },
    validateName(name) {
      if (!name.length) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    validateGender(gender) {
      if (!gender.length) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    validateEmail(email) {
      if (!email.length) {
        return { valid: false, error: "This field is required" };
      }
      if (!email.search("@") == -1) {
        return { valid: false, error: "Please, enter a valid email." };
      }
      return { valid: true, error: null };
    },
    validateAddress(address) {
      if (!address.length) {
        return { valid: false, error: "This field is required" };
      }
      return { valid: true, error: null };
    },
    resetHandler() {
      (this.user.name = ""),
        (this.user.email = ""),
        (this.user.gender = 0),
        (this.user.address = ""),
        (this.user.dob = new Date("")),
        (this.user.userrole = "");
    },
    mounted() {
      var users = JSON.parse(localStorage.getItem("userInfo"));
      var user_id = users ? users.id + 1 : 1;
      this.user.id = user_id;
    },
  },
};
</script>
<style>
form {
  max-width: 600px;
  margin: 0 auto;
}
.txt-error {
  font-size: 14px;
  text-align: left;
  color: red;
}
</style>
