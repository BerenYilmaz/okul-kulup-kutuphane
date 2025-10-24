//  Sabit kitap listesi
const kitaplar = [
  { id: 1, baslik: "Suç ve Ceza", yazar: "Fyodor Dostoyevski", kategori: "Roman" },
  { id: 2, baslik: "Zamanın Kısa Tarihi", yazar: "Stephen Hawking", kategori: "Bilim" },
  { id: 3, baslik: "Hayvan Çiftliği", yazar: "George Orwell", kategori: "Roman" },
  { id: 4, baslik: "Sapiens", yazar: "Yuval Noah Harari", kategori: "Tarih" },
  { id: 5, baslik: "Türlerin Kökeni", yazar: "Charles Darwin", kategori: "Bilim" },
];

//  localStorage'dan verileri yükle
let favoriler = JSON.parse(localStorage.getItem("favoriler")) || [];
let sonArama = localStorage.getItem("aramaMetni") || "";
let sonKategori = localStorage.getItem("kategori") || "Hepsi";

//  HTML elementlerini seç
const aramaInput = document.getElementById("aramaInput");
const kategoriSelect = document.getElementById("kategoriSelect");
const kitapListesi = document.getElementById("kitapListesi");
const favCount = document.getElementById("favCount");
const favList = document.getElementById("favList");

//  Önceki durumu geri yükle
aramaInput.value = sonArama;
kategoriSelect.value = sonKategori;

//  Kitapları filtreleyip listele
function kitaplariGoster() {
  const aramaMetni = aramaInput.value.toLowerCase();
  const seciliKategori = kategoriSelect.value;

  // Kaydet
  localStorage.setItem("aramaMetni", aramaMetni);
  localStorage.setItem("kategori", seciliKategori);

  // Filtreleme
  const filtrelenmis = kitaplar.filter(kitap => {
    const baslikUygun = kitap.baslik.toLowerCase().includes(aramaMetni);
    const kategoriUygun = seciliKategori === "Hepsi" || kitap.kategori === seciliKategori;
    return baslikUygun && kategoriUygun;
  });

  // Listeyi oluştur
  kitapListesi.innerHTML = filtrelenmis.map(kitap => {
    const favorideMi = favoriler.includes(kitap.id);
    return `
      <div class="book-card">
        <h3>${kitap.baslik}</h3>
        <p><strong>Yazar:</strong> ${kitap.yazar}</p>
        <p><strong>Kategori:</strong> ${kitap.kategori}</p>
        <button class="${favorideMi ? "remove" : "add"}" onclick="favoriDegistir(${kitap.id})">
          ${favorideMi ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        </button>
      </div>
    `;
  }).join("");
}

//  Favorileri listele
function favorileriGoster() {
  favCount.textContent = favoriler.length;
  favList.innerHTML = favoriler.map(id => {
    const favKitap = kitaplar.find(k => k.id === id);
    return `<li>${favKitap.baslik}</li>`;
  }).join("");
}

//  Favori ekleme/çıkarma
function favoriDegistir(id) {
  if (favoriler.includes(id)) {
    favoriler = favoriler.filter(f => f !== id);
  } else {
    favoriler.push(id);
  }
  localStorage.setItem("favoriler", JSON.stringify(favoriler));
  kitaplariGoster();
  favorileriGoster();
}

//  Olay dinleyicileri
aramaInput.addEventListener("input", kitaplariGoster);
kategoriSelect.addEventListener("change", kitaplariGoster);

//  Sayfa açıldığında başlat
kitaplariGoster()
