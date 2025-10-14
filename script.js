const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRL8cqzJAOvtoxbYB1_vHTk65C_Ki0y6cquXy4ieGSK30WCFKxP6HNguFC5rn6Jvdh/exec';

// Kirim data pesanan
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


  document.getElementById('status').textContent = "⏳ Mengirim data...";
  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    document.getElementById('status').textContent = "✅ Data anda berhasil dikirim!";
  } catch (err) {
    console.error(err);
    document.getElementById('status').textContent = "❌ Gagal mengirim data!";
  }
}

// Event listeners
document.getElementById('kirim').addEventListener('click', kirim);
