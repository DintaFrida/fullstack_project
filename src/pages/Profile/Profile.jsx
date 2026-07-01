import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/Navbar/Navbar';
import styles from './Profile.module.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileImage, setProfileImage] = useState(null);

  const namaUser = user?.nama || user?.name || "User";
  const emailUser = user?.email || "dinta@gmail.com";
  const inisial = namaUser.charAt(0).toUpperCase();

  // Fungsi untuk handle ganti foto
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        alert("Foto profil berhasil dipilih! (Simulasi: Dalam aplikasi nyata, ini akan dikirim ke server)");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              {/* Lingkaran Foto / Huruf */}
              <div className={styles.avatarBig}>
                {profileImage ? (
                  <img src={profileImage} alt="Profile" className={styles.previewImage} />
                ) : (
                  inisial
                )}
              </div>
              
              {/* Tombol Kamera untuk Upload */}
              <label htmlFor="upload-photo" className={styles.cameraIcon}>
                <input 
                  type="file" 
                  id="upload-photo" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  hidden 
                />
                📷
              </label>
            </div>

            <h2 className={styles.mainName}>{namaUser}</h2>
            <p className={styles.subEmail}>{emailUser}</p>
            <span className={styles.badgeMember}>Premium Member</span>
          </div>

          <div className={styles.infoSection}>
            <div className={styles.infoBox}>
              <label>Nama Lengkap</label>
              <p>{namaUser}</p>
            </div>
            <div className={styles.infoBox}>
              <label>Email</label>
              <p>{emailUser}</p>
            </div>
          </div>

          <button className={styles.saveBtn}>Simpan Perubahan</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;