import { useState, useRef } from "react";
import styles from "./UploadFoto.module.css";

function UploadFoto() {
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const inputRef = useRef(null);

  function handleFile(file) {
    setError("");
    setSuccess(false);

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG, PNG).");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setError("Ukuran file maksimal 2MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function handleChange(e) {
    handleFile(e.target.files[0]);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  function handleUpload() {
    if (!preview) {
      setError("Pilih foto terlebih dahulu.");
      return;
    }
    setSuccess(true);
    setError("");
  }

  function handleRemove() {
    setPreview(null);
    setSuccess(false);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className={styles.wrapper}>

      {/* Drop zone */}
      <div
        className={`${styles.dropZone} ${dragging ? styles.dragging : ""} ${preview ? styles.hasPreview : ""}`}
        onClick={() => !preview && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        {preview ? (
          <img src={preview} alt="Preview" className={styles.previewImg} />
        ) : (
          <div className={styles.dropContent}>
            <div className={styles.dropIcon}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className={styles.dropTitle}>Drag & drop foto di sini</p>
            <p className={styles.dropSubtitle}>atau klik untuk pilih file</p>
            <span className={styles.dropHint}>JPG, PNG — maks 2MB</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className={styles.inputHidden}
      />

      {/* Error & success */}
      {error   && <p className={styles.alertError}>{error}</p>}
      {success && <p className={styles.alertSuccess}>Foto berhasil diupload!</p>}

      {/* Actions */}
      <div className={styles.actions}>
        {preview ? (
          <>
            <button className={styles.btnUpload} onClick={handleUpload}>
              Simpan Foto
            </button>
            <button className={styles.btnRemove} onClick={handleRemove}>
              Hapus
            </button>
          </>
        ) : (
          <button className={styles.btnUpload} onClick={() => inputRef.current?.click()}>
            Pilih Foto
          </button>
        )}
      </div>

    </div>
  );
}

export default UploadFoto;
