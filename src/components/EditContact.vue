<template>
  <div class="container">
    <h4 class="title">Edit Kontak</h4>
    <div>
      <router-link to="/" class="button is-info"
        ><font-awesome-icon
          icon="arrow-left"
          class="mr-1"
        />Kembali</router-link
      >
    </div>
    <div class="mt-2">
      <div class="field">
        <label class="label">Nama Lengkap</label>
        <div class="control">
          <input
            class="input"
            v-model="namaUser"
            type="text"
            placeholder="Nama Lengkap"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Nomor Handphone</label>
        <div class="control">
          <input
            class="input"
            v-model="nohpUser"
            type="text"
            placeholder="Nomor Handphone"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            class="input"
            v-model="emailUser"
            type="text"
            placeholder="Email"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Alamat</label>
        <div class="control">
          <input
            class="input"
            v-model="alamatUser"
            type="text"
            placeholder="Alamat"
          />
        </div>
      </div>
      <div class="control">
        <button class="button is-success" @click="updateUser">UPDATE</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'EditUser',
  data() {
    return {
        namaUser: "",
        nohpUser: "",
        emailUser: "",
        alamatUser: "",
      };
  },
  created: function () {
    this.getUserById();
  },
  methods: {
    // Mengambil data user berdasarkan ID
    async getUserById() {
      try {
        const response = await axios.get(
          `http://localhost:5000/user/${this.$route.params.id}`
        );
        this.namaUser = response.data[0].nama_lengkap;
        this.nohpUser = response.data[0].no_handphone;
        this.emailUser = response.data[0].email;
        this.alamatUser = response.data[0].alamat;
      } catch (err) {
        console.log(err);
      }
    },
 
    //Perbarui data user
    async updateUser() {
      try {
        await axios.put(
          `http://localhost:5000/user/${this.$route.params.id}`,
          {
            id_user: this.$route.params.id,
            nama_lengkap: this.namaUser,
            no_handphone: this.nohpUser,
            email: this.emailUser,
            alamat: this.alamatUser,
          }
        );
        this.idUser = this.$route.params.id,
        this.namaUser = "";
        this.nohpUser = "";
        this.emailUser = "";
        this.alamatUser = "";
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>