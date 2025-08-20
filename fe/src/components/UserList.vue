<template>
  <div class="user-list">
    <h2>Users</h2>

    <div v-if="isLoading" class="loading">Loading...</div>
    <div v-if="error" class="error">{{ error }}</div>

    <div class="user-actions">
      <button @click="showCreateForm = !showCreateForm" class="btn btn-primary">
        {{ showCreateForm ? "Cancel" : "Add User" }}
      </button>
    </div>

    <UserForm
      v-if="showCreateForm"
      @user-saved="handleUserSaved"
      @cancel="showCreateForm = false"
    />

    <div class="users-grid">
      <div v-for="user in allUsers" :key="user.id" class="user-card">
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
        <p>{{ user.email }}</p>
        <p v-if="user.age">Age: {{ user.age }}</p>
        <div class="user-actions">
          <button @click="editUser(user)" class="btn btn-sm btn-secondary">
            Edit
          </button>
          <button
            @click="deleteUserConfirm(user.id)"
            class="btn btn-sm btn-danger"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <UserForm
      v-if="editingUser"
      :user="editingUser"
      @user-saved="handleUserUpdated"
      @cancel="editingUser = null"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import UserForm from "./UserForm.vue";

export default {
  name: "UserList",
  components: {
    UserForm,
  },
  data() {
    return {
      showCreateForm: false,
      editingUser: null,
    };
  },
  computed: {
    ...mapGetters("users", ["allUsers", "isLoading", "error"]),
  },
  async created() {
    await this.fetchUsers();
  },
  methods: {
    ...mapActions("users", ["fetchUsers", "deleteUser"]),

    handleUserSaved() {
      this.showCreateForm = false;
      this.fetchUsers();
    },

    handleUserUpdated() {
      this.editingUser = null;
      this.fetchUsers();
    },

    editUser(user) {
      this.editingUser = { ...user };
    },

    async deleteUserConfirm(userId) {
      if (confirm("Are you sure you want to delete this user?")) {
        try {
          await this.deleteUser(userId);
        } catch (error) {
          alert("Error deleting user: " + error.message);
        }
      }
    },
  },
};
</script>

<style scoped>
.user-list {
  padding: 20px;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.user-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-actions {
  margin: 20px 0;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
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
.btn-sm {
  padding: 4px 8px;
  font-size: 12px;
}

.loading,
.error {
  padding: 20px;
  text-align: center;
}

.error {
  color: red;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}
</style>
