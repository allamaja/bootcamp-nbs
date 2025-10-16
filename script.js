const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzRL8cqzJAOvtoxbYB1_vHTk65C_Ki0y6cquXy4ieGSK30WCFKxP6HNguFC5rn6Jvdh/exec';

// Tangani event submit form
document.getElementById('formPendaftaran').addEventListener('submit', async function (e) {
  e.preventDefault(); // cegah reload halaman

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

  const pendaftar = { nama, noWa, email, alamat, pendidikan, pekerjaan, alasan, info };
  const statusEl = document.getElementById('status');
  const formContainer = document.getElementById('formPendaftaran');

  statusEl.textContent = "⏳ Mengirim data...";

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(pendaftar),
    });

    const text = await response.text();
    console.log('Respon dari server:', text);

    if (text.includes('✅')) {
      // Sembunyikan form
      formContainer.style.display = 'none';
      
      // Ganti dengan pesan terima kasih
      const container = document.querySelector('.container');
      container.innerHTML += `
        <div class="thanks-message" style="text-align:center; padding:20px;">
          <h2>🎉 Terima kasih sudah mendaftar Bootcamp NBS!</h2>
          <p>Kami akan menghubungi kamu melalui WhatsApp atau email dalam waktu dekat.</p>
        </div>
      `;
    } else {
      statusEl.textContent = "⚠️ Terjadi kesalahan: " + text;
    }
  } catch (err) {
    console.error('Error:', err);
    statusEl.textContent = "❌ Gagal mengirim data!";
  }
});
