<template id="user-list">
  <div class="user-list">
    <div class="container">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">UserID</th>
            <th scope="col">User Name</th>
            <th scope="col">Gender</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">DateOfBrith</th>
            <th scope="col">UserRole</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in this.userList"
          :key="index.id"
          :user="user">
            <th>{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.gender }}</td>
            <td>{{ user.email }}</td>
            <th>{{ user.address }}</th>
            <td>{{ user.dob }}</td>
            <td>{{ user.userrole }}</td>
          </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-center">
      <button
          type="button"
          class="btn btn-danger col-md-2 m-3"
          @click="$router.push('/register')"
        >
          Register New User
        </button>
        </div>
    </div>
  </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.0.3/vue.js"></script>
<script>
export default {
  name: "UserList",
  template: "#user-list",
  data() {
    return {
      userList: JSON.parse(localStorage.getItem("userData")) || [],
    };
  },
};
</script>
<style>
</style>
