// assets/js/interactive.js
// Modal for interactive cards
const modal = document.getElementById('infoModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close');

const modalContents = {
    target: { title: '🎯 Target Audiens', content: '<p><strong>Demografis:</strong> Remaja usia 15-18 tahun (SMA/SMK/MA), laki-laki & perempuan.</p><p><strong>Geografis:</strong> Seluruh Indonesia, perkotaan & pedesaan.</p><p><strong>Perilaku:</strong> Aktif bermain game online, chat, voice chat, transaksi item digital. Sering berinteraksi dengan orang asing tanpa verifikasi usia.</p><p><strong>Psikografis:</strong> Rasa ingin tahu tinggi, membangun identitas diri, rentan terhadap pengaruh sosial. Ingin kebebasan berekspresi tapi minim kesadaran etika digital.</p>' },
    prinsip: { title: '🎨 Prinsip Desain Poster', content: '<p><strong>Hierarki Visual:</strong> Informasi terpenting harus paling menonjol. Judul minimal 72 pt.</p><p><strong>Warna:</strong> Gunakan palet terbatas (3-4 warna). Kontras tinggi antara teks dan background.</p><p><strong>Tipografi:</strong> Maksimal 2 font. Sans-serif untuk digital, hindari font terlalu dekoratif.</p><p><strong>Layout:</strong> Gunakan grid system. Sisakan ruang kosong (white space) untuk kenyamanan baca.</p><p><strong>Keseimbangan:</strong> Distribusikan elemen secara merata, hindari terlalu padat di satu sisi.</p>' },
    checklist: { title: '✅ Checklist Wajib Poster', content: '<ul><li>Format PDF HD, ukuran A2 (42x59.4cm) PORTRAIT</li><li>Ukuran file 5-10 MB</li><li>Konsep karya max 500 kata, font Arial 12pt, spasi 1</li><li>Surat pernyataan keaslian bermaterai</li><li>DILARANG menggunakan AI atau aset plagiat</li><li>Pesan harus mengajak bertanggung jawab di ruang digital</li><li>Nama file: Desain poster_nama lengkap_nama sekolah_kabupaten-kota.pdf</li></ul>' },
    storytelling: { title: '📖 Storytelling dalam Komik', content: '<p><strong>Struktur 3 Babak:</strong></p><ul><li><strong>Setup:</strong> Perkenalkan karakter, latar, dan konflik awal. Biasanya 25-30% cerita.</li><li><strong>Konfrontasi:</strong> Konflik memuncak, karakter menghadapi rintangan. 50-60% cerita.</li><li><strong>Resolusi:</strong> Konflik terselesaikan, karakter berubah/ belajar sesuatu. 15-20% cerita.</li></ul><p><strong>Tips:</strong> Buat storyboard dulu! Sketsa kasar semua panel sebelum menggambar final.</p>' },
    paneling: { title: '📐 Paneling & Pacing', content: '<p><strong>Jenis Panel:</strong></p><ul><li><strong>Wide/Long Shot:</strong> Untuk memperkenalkan latar atau suasana</li><li><strong>Medium Shot:</strong> Untuk dialog dan interaksi antar karakter</li><li><strong>Close-up:</strong> Untuk menekankan emosi atau detail penting</li><li><strong>Splash Page:</strong> Panel penuh 1 halaman untuk momen dramatis</li></ul><p><strong>Pacing:</strong> Panel besar = momen penting, perlu waktu baca lebih lama. Panel kecil = aksi cepat. Gutter (jarak antar panel) lebar = jeda dramatis.</p>' },
    ekspresi: { title: '😊 Ekspresi Karakter', content: '<p><strong>Facial Expression Mapping:</strong></p><ul><li>Senang: Mata menyipit, alis rileks, mulut melengkung ke atas</li><li>Sedih: Mata setengah tertutup, alis menekuk ke dalam, mulut sedikit terbuka</li><li>Marah: Alis bertemu di tengah, mata terbuka lebar, gigi mengatup</li><li>Kaget: Mata dan mulut membulat, alis terangkat tinggi</li><li>Takut: Mata terbuka lebar dengan pupil kecil, alis terangkat asimetris, mulut sedikit terbuka</li></ul><p><strong>Tips:</strong> Ekspresi harus konsisten dengan gestur tubuh. Latih dengan bercermin!</p>' }
};

document.querySelectorAll('.interactive-card').forEach(card => {
    card.addEventListener('click', (e) => {
        if (e.target.classList.contains('card-detail-btn') || e.target.closest('.card-detail-btn')) {
            const infoType = card.dataset.info;
            if (modalContents[infoType]) {
                modalBody.innerHTML = `<h3>${modalContents[infoType].title}</h3>${modalContents[infoType].content}`;
                modal.style.display = 'block';
            }
        }
    });
});

if (closeBtn) closeBtn.onclick = () => modal.style.display = 'none';

// Accordion
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;
        if (content.classList.contains('active')) content.classList.remove('active');
        else content.classList.add('active');
    });
});

// Before-After Slider
const sliders = document.querySelectorAll('.slider-container');
sliders.forEach(container => {
    const sliderInput = container.querySelector('.slider-input');
    const sliderHandle = container.querySelector('.slider-handle');
    const beforeAfterSlider = container.querySelector('.beforeafter-slider');
    if (sliderInput && sliderHandle && beforeAfterSlider) {
        const updateSlider = (value) => {
            const percent = value / 100;
            beforeAfterSlider.style.transform = `translateX(-${percent * 50}%)`;
            sliderHandle.style.left = `${value}%`;
        };
        sliderInput.addEventListener('input', (e) => updateSlider(e.target.value));
        let isDragging = false;
        const onMouseMove = (e) => {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            let x = (e.clientX - rect.left) / rect.width;
            x = Math.min(Math.max(x, 0), 1);
            sliderInput.value = x * 100;
            updateSlider(x * 100);
        };
        sliderHandle.addEventListener('mousedown', () => { isDragging = true; document.body.style.userSelect = 'none'; });
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', () => { isDragging = false; document.body.style.userSelect = ''; });
        sliderHandle.addEventListener('touchstart', (e) => { isDragging = true; e.preventDefault(); });
        window.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const rect = container.getBoundingClientRect();
            let x = (e.touches[0].clientX - rect.left) / rect.width;
            x = Math.min(Math.max(x, 0), 1);
            sliderInput.value = x * 100;
            updateSlider(x * 100);
        });
        window.addEventListener('touchend', () => { isDragging = false; });
    }
});