<template>
  <div class="users">
    <h2>Users Management</h2>
    <button @click="showUserForm = true" class="btn btn-primary">
      Add User
    </button>

    <div class="users-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p>Email: {{ user.email }}</p>
        <p>Age: {{ user.age }}</p>
        <div class="actions">
          <button @click="editUser(user)" class="btn btn-secondary">
            Edit
          </button>
          <button @click="deleteUser(user.id)" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    </div>

    <UserForm
      v-if="showUserForm"
      :user="selectedUser"
      @user-saved="handleUserSaved"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import UserForm from "@/components/UserForm.vue";

export default {
  name: "UsersPage",
  components: {
    UserForm,
  },
  data() {
    return {
      showUserForm: false,
      selectedUser: null,
    };
  },
  computed: {
    ...mapState("users", ["users"]),
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "deleteUser"]),
    editUser(user) {
      this.selectedUser = user;
      this.showUserForm = true;
    },
    handleUserSaved() {
      this.showUserForm = false;
      this.selectedUser = null;
      this.fetchUsers();
    },
    handleCancel() {
      this.showUserForm = false;
      this.selectedUser = null;
    },
  },
  created() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.users {
  padding: 20px;
}

.users-list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.user-card {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}
</style>
