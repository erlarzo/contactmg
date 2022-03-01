<template>
  <div class="container">
    <h1 class="title">Daftar Kontak</h1>
    <div>
      <router-link to="/tambah" class="button is-info"
        ><font-awesome-icon icon="plus" class="mr-1" />Tambah
        Kontak</router-link
      >
    </div>
    <table class="table is-stripped mt-3">
      <thead>
        <td>ID</td>
        <td>Nama Lengkap</td>
        <td>No. Handphone</td>
        <td>Email</td>
        <td>Alamat</td>
        <td>Aksi</td>
      </thead>
      <tbody v-for="(user, index) in users" :key="user.id_user">
        <td>
          {{ index + 1 }}
        </td>
        <td>
          {{ user.nama_lengkap }}
        </td>
        <td>
          {{ user.no_handphone }}
        </td>
        <td>
          {{ user.email }}
        </td>
        <td>
          {{ user.alamat }}
        </td>
        <td>
          <router-link
            :to="{ name: 'Edit', params: { id: user.id_user } }"
            class="button is-warning mr-1"
          >
            <font-awesome-icon icon="edit" class="mr-1" />Edit
          </router-link>
          <button class="button is-danger" @click="deleteUser(user.id_user)">
            <font-awesome-icon icon="trash" class="mr-1" />Hapus
          </button>
        </td>
      </tbody>
    </table>
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    //Ambil semua data user
    async getUser() {
      try {
        const response = await axios.get("http://localhost:5000/user");
        this.users = response.data;
      } catch (err) {
        console.log(err);
      }
    },

    //Hapus data User
    async deleteUser(id) {
        this.$swal({
          title: 'Apakah Anda yakin?',
          text: 'Anda tidak bisa mengembalikan data yang sudah terhapus',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Ya',
          cancelButtonText: 'Tidak',
          showCloseButton: true,
          showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
            axios.delete(`http://localhost:5000/user/delete/${id}`)
            .then(() => {
            this.$swal('Terhapus', 'Kamu telah sukses menghapus data', 'success')
            this.getUser();
          })
          } else {
            this.$swal('Batal', 'Data masih tersimpan', 'info')
          }
        })
      }
  },
};
</script>

<style scoped>
</style>