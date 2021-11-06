<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="Cannot load the image"
        class="profile-img-card"
      />
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="form-group">
          <label for="username">Tên đăng nhập</label>
          <Field name="username" type="text" class="form-control" />
          <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Mật khẩu</label>
          <Field name="password" type="password" class="form-control" />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Đăng nhập</span>
          </button>
        </div>

        <div class="form-group">
          <div v-if="message" class="alert alert-danger" role="alert">
            {{ message }}
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapGetters } from "vuex";

export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Tên đăng nhập phải có giá trị."),
      password: yup.string().required("Mật khẩu phải có giá trị."),
    });

    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    ...mapGetters(["userLoggedIn"]),
  },
  created() {
    if (this.userLoggedIn) {
      this.$router.push("/profile");
    }
  },
  methods: {
    async handleLogin(user) {
      this.loading = true;
      const [error] = await this.handle(this.$store.dispatch("login", user));
      if (error) {
        console.log(error);
        this.loading = false;
        this.message = "Đăng nhập thất bại";
      } else {
        this.$router.push("/profile");
      }
    },
  },
};
</script>

<style>
@import "../assets/styles/main.css";
</style>
