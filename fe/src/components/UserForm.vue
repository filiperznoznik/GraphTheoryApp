<template>
  <div class="user-form-overlay">
    <form @submit.prevent="handleSubmit" class="user-form">
      <h3>{{ isEditing ? "Edit User" : "Create User" }}</h3>

      <div class="form-group">
        <label>First Name:</label>
        <input v-model="form.firstName" type="text" required />
      </div>

      <div class="form-group">
        <label>Last Name:</label>
        <input v-model="form.lastName" type="text" required />
      </div>

      <div class="form-group">
        <label>Email:</label>
        <input v-model="form.email" type="email" required />
      </div>

      <div class="form-group">
        <label>Age:</label>
        <input v-model.number="form.age" type="number" min="0" />
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? "Saving..." : isEditing ? "Update" : "Create" }}
        </button>
        <button
          type="button"
          @click="$emit('cancel')"
          class="btn btn-secondary"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserForm",
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        age: null,
      },
      loading: false,
    };
  },
  computed: {
    isEditing() {
      return !!this.user;
    },
  },
  watch: {
    user: {
      immediate: true,
      handler(newUser) {
        if (newUser) {
          this.form = { ...newUser };
        } else {
          this.resetForm();
        }
      },
    },
  },
  methods: {
    ...mapActions("users", ["createUser", "updateUser"]),

    async handleSubmit() {
      this.loading = true;
      try {
        if (this.isEditing) {
          await this.updateUser({
            id: this.user.id,
            userData: { ...this.form, id: this.user.id },
          });
        } else {
          await this.createUser(this.form);
        }
        this.$emit("user-saved");
      } catch (error) {
        alert("Error saving user: " + error.message);
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.form = {
        firstName: "",
        lastName: "",
        email: "",
        age: null,
      };
    },
  },
};
</script>

<style scoped>
.user-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.user-form {
  background: white;
  padding: 30px;
  border-radius: 8px;
  width: 400px;
  max-width: 90vw;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
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
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
