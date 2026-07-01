function Profile() {
  const user = {
    nama: "Eshi Aulia",
    email: "eshi@gmail.com",
    role: "Pelanggan",
  };

  return (
    <div>
      <h1>Profil Pengguna</h1>

      <p>Nama: {user.nama}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>

      <button>Edit Profil</button>
    </div>
  );
}

export default Profile;