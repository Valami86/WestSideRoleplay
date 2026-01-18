/* --- BEÁLLÍTÁSOK --- */
// IDE ÍRD BE A SZERVERED CFX KÓDJÁT! (Ez nem az IP, hanem a betűkód)
// Ha nem tudod, keresd meg a szervert a FiveM listában, a link vége a kód.
// Példa: 'qj854r'
const SERVER_CODE = 'xgxbqr'; 

// Hamburger menü
function toggleMenu() {
    var nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

// IP cím másolása
function copyIP() {
    var ipText = document.getElementById("server-ip").innerText;
    navigator.clipboard.writeText(ipText).then(function() {
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }, function(err) {
        console.error('Hiba: ', err);
    });
}

// Háttér effekt
document.addEventListener("mousemove", function(e) {
    if (window.innerWidth > 768) {
        const moveFactor = 20; 
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        document.body.style.backgroundPositionX = (50 + mouseX * moveFactor) + "%";
        document.body.style.backgroundPositionY = (50 + mouseY * moveFactor) + "%";
    }
});

// --- JÁTÉKOS SZÁMLÁLÓ ---
async function updatePlayerCount() {
    const statText = document.getElementById("player-stat");
    const dot = document.querySelector(".live-dot");

    // Ha nincs beállítva kód, ne fusson
    if (SERVER_CODE === 'xgxbqr' || SERVER_CODE === '') {
        statText.innerText = "Nincs CFX kód beállítva!";
        return;
    }

    try {
        // Lekérdezzük a FiveM hivatalos API-ját
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${xgxbqr}`);
        
        if (!response.ok) throw new Error("Szerver nem elérhető");

        const data = await response.json();
        
        // Adatok kinyerése
        const players = data.Data.clients;     // Jelenlegi játékosok
        const maxPlayers = data.Data.sv_maxclients; // Max slot

        // Szöveg frissítése
        statText.innerText = `Online: ${players} / ${maxPlayers}`;
        
        // Zöld pötty aktiválása
        dot.classList.remove("offline");
        dot.classList.add("online");

    } catch (error) {
        console.error("Hiba a lekérdezésben:", error);
        statText.innerText = "Szerver Offline";
        dot.classList.remove("online");
        dot.classList.add("offline");
    }
}

// Az oldal betöltésekor fusson le először
window.onload = function() {
    updatePlayerCount();
    // Utána 30 másodpercenként frissítsen
    setInterval(updatePlayerCount, 30000);
};
