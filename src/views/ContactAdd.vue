<template>
  <div class="edit-form">
    <h4>Thêm Liên hệ</h4>
    <ContactForm
      :contact="contact"
      @contact-submit="addContact"
      @contact-delete="resetContact"
    />
    <p>{{ message }}</p>
  </div>
</template>
<script>
import ContactService from "../services/contact.service";
import ContactForm from "../components/ContactForm";
export default {
  name: "ContactAdd",
  components: {
    ContactForm,
  },
  data() {
    return {
      contact: {
        name: "AAA",
        email: "",
        address: "",
        phone: "",
        favorite: false
      },
      message: "",
    };
  },
  methods: {
    initContact() {
      // maybe not...      
    },
    async addContact(data) {
      console.log("input: ", data);
      const [error, response] = await this.handle(
        ContactService.create(data)
      );
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Liên hệ được thêm thành công.";
      }
    },
    resetContact() {
      alert("reset");
    },
  },
  mounted() {
    this.message = "";
    this.initContact();
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
