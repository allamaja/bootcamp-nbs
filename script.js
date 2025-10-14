const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRL8cqzJAOvtoxbYB1_vHTk65C_Ki0y6cquXy4ieGSK30WCFKxP6HNguFC5rn6Jvdh/exec';

// Fungsi kirim data pendaftar
async function kirim() {
  const nama = document.getElementById('nama').value.trim();
  const noWa = document.getElementById('noWa').value.trim();
  const email = document.getElementById('email').value.trim();
  const alamat = document.getElementById('alamat').value.trim();
  const pendidikan = document.getElementById('pendidikan').value.trim();
  const pekerjaan = document.getElementById('pekerjaan').value.trim();
  const alasan = document.getElementById('alasan').value.trim();
  const info = document.getElementById('info').value.trim();

  if (!nama || !noWa || !email || !alamat || !pendidikan || !pekerjaan || !alasan || !info) {
    alert("⚠️ Mohon lengkapi semua data!");
    return;
  }

  // Data yang dikirim ke Apps Script
  const pendaftar = { nama, noWa, email, alamat, pendidikan, pekerjaan, alasan, info };

  const statusEl = document.getElementById('status');
  statusEl.textContent = "⏳ Mengirim data...";

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(pendaftar),
    });

    const text = await response.text();
    console.log('Respon dari server:', text);

    statusEl.textContent = text.includes('✅')
      ? "✅ Data anda berhasil dikirim!"
      : "⚠️ Terjadi kesalahan: " + text;

    // Reset form setelah berhasil
    if (text.includes('✅')) {
      document.getElementById('formPendaftaran').reset();
    }

  } catch (err) {
    console.error('Error:', err);
    statusEl.textContent = "❌ Gagal mengirim data!";
  }
}

// Pasang event listener di tombol
document.getElementById('kirim').addEventListener('click', kirim);
