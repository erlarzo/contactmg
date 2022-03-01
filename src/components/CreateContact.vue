<template>
  <div class="container">
    <h4 class="title">Tambah Kontak</h4>
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
      <div class="field">
        <div class="control">
          <button class="button is-info" @click="addUser">
            <font-awesome-icon
              icon="save"
              class="mr-1"
            />Submit
          </button>
        </div>
      </div>
    </div>
    

    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
        idUser:0,
        namaUser: "",
        nohpUser: "",
        emailUser: "",
        alamatUser: "",
    };
  },
  methods: {
    //Menambahkan user baru
    async addUser() {
      try {
        await axios.post("http://localhost:5000/user/add", {
          id_user: this.idUser,
          nama_lengkap: this.namaUser,
          no_handphone: this.nohpUser,
          email: this.emailUser,
          alamat: this.alamatUser,
        });
        this.idUser = "",
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