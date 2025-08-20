<template>
  <div class="users">
    <UserList />
  </div>
</template>

<script>
import UserList from "@/components/UserList.vue";

export default {
  name: "Users",
  components: {
    UserList,
  },
};
</script>
