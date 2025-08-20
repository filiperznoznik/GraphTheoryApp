import { userService } from "@/services/api";

const state = {
  users: [],
  currentUser: null,
  loading: false,
  error: null,
};

const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_USERS(state, users) {
    state.users = users;
  },
  SET_CURRENT_USER(state, user) {
    state.currentUser = user;
  },
  ADD_USER(state, user) {
    state.users.push(user);
  },
  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser);
    }
  },
  DELETE_USER(state, userId) {
    state.users = state.users.filter((u) => u.id !== userId);
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    commit("SET_LOADING", true);
    try {
      const response = await userService.getUsers();
      commit("SET_USERS", response.data);
    } catch (error) {
      commit("SET_ERROR", error.message);
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async createUser({ commit }, userData) {
    commit("SET_LOADING", true);
    try {
      const response = await userService.createUser(userData);
      commit("ADD_USER", response.data);
      return response.data;
    } catch (error) {
      commit("SET_ERROR", error.message);
      throw error;
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async updateUser({ commit }, { id, userData }) {
    try {
      const response = await userService.updateUser(id, userData);
      commit("UPDATE_USER", response.data);
      return response.data;
    } catch (error) {
      commit("SET_ERROR", error.message);
      throw error;
    }
  },

  async deleteUser({ commit }, userId) {
    try {
      await userService.deleteUser(userId);
      commit("DELETE_USER", userId);
    } catch (error) {
      commit("SET_ERROR", error.message);
      throw error;
    }
  },
};

const getters = {
  allUsers: (state) => state.users,
  userById: (state) => (id) => state.users.find((u) => u.id === id),
  isLoading: (state) => state.loading,
  error: (state) => state.error,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
