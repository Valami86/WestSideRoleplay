/* --- BEÁLLÍTÁSOK --- */
// A szervered CFX kódja a játékosszám lekérdezéséhez
const SERVER_CODE = 'xgxbqr'; 

// Hamburger menü nyitás/zárás (Mobilon)
function toggleMenu() {
    var nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

// IP cím másolása a vágólapra
function copyIP() {
    var ipText = document.getElementById("server-ip").innerText;
    navigator.clipboard.writeText(ipText).then(function() {
        // Toast üzenet megjelenítése
        var x = document.getElementById("toast");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }, function(err) {
        console.error('Hiba a másoláskor: ', err);
    });
}

// --- HÁTTÉR PARALLAX EFFEKT (Csak PC-n) ---
document.addEventListener("mousemove", function(e) {
    // Csak akkor fusson, ha szélesebb a képernyő, mint egy tablet (768px)
    if (window.innerWidth > 768) {
        const moveFactor = 20; // Mozgás mértéke
        
        // Egér pozíció kiszámolása
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Háttér eltolása az egérrel ellentétes irányba
        document.body.style.backgroundPositionX = (50 + mouseX * moveFactor) + "%";
        document.body.style.backgroundPositionY = (50 + mouseY * moveFactor) + "%";
    }
});

// --- JÁTÉKOS SZÁMLÁLÓ (FiveM API) ---
async function updatePlayerCount() {
    const statText = document.getElementById("player-stat");
    const dot = document.querySelector(".live-dot");

    try {
        // Lekérdezzük a szerver adatait a hivatalos API-ról
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${SERVER_CODE}`);
        
        if (!response.ok) throw new Error("Szerver nem elérhető");

        const data = await response.json();
        
        // Adatok kinyerése
        const players = data.Data.clients;          // Jelenlegi játékosok
        const maxPlayers = data.Data.sv_maxclients; // Max férőhely

        // Szöveg frissítése
        statText.innerText = `Online: ${players} / ${maxPlayers}`;
        
        // Zöld villogó pötty beállítása
        dot.classList.remove("offline");
        dot.classList.add("online");

    } catch (error) {
        console.error("Hiba a lekérdezésben:", error);
        // Ha hiba van (pl. leállt a szerver), pirosra váltunk
        statText.innerText = "Szerver Offline";
        dot.classList.remove("online");
        dot.classList.add("offline");
    }
}

// Oldal betöltésekor indítsa el a funkciókat
window.onload = function() {
    updatePlayerCount(); // Azonnali lekérdezés
    
    // Frissítés 30 másodpercenként
    setInterval(updatePlayerCount, 30000);
};
