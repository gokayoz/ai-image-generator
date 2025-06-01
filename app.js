const form = document.getElementById("gorselFormu");
const gorselGirdisi = document.getElementById("gorselGirdisi");
const olusturmaMesaji = document.getElementById("olusturmaMesaji");
const gorselSonucu = document.getElementById("gorselSonucu");
const gorselAciklama = document.querySelector("figcaption");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const komut = gorselGirdisi.value.trim();
  if (komut === "") return;

  olusturmaMesaji.style.display = "block";
  olusturmaMesaji.textContent = "Görsel Oluşturuluyor...";
  
  gorselSonucu.style.display = "none";

  try {
    const encodedPrompt = encodeURIComponent(komut);
    const gorselUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=800&height=600&seed=${Math.floor(Math.random() * 1000000)}`;
    
    gorselSonucu.onload = function() {
      gorselSonucu.style.display = "block";
      gorselAciklama.textContent = `Komut: ${komut}`;
      olusturmaMesaji.style.display = "none";
      gorselGirdisi.value = "";
    };
    
    gorselSonucu.onerror = function() {
      olusturmaMesaji.textContent = "Görsel oluşturulurken bir hata oluştu!";
    };
    
    gorselSonucu.src = gorselUrl;
    gorselSonucu.alt = `Komut: ${komut}`;

  } catch (hata) {
    console.error("Hata:", hata);
    olusturmaMesaji.textContent = "Görsel oluşturulurken bir hata oluştu!";
  }
});

setTimeout(() => {
  gorselGirdisi.placeholder = "Örnek: Mars yüzeyinde meyve yiyen bir Erhan!";
}, 3000);