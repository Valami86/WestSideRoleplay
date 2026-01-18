/* --- BEÁLLÍTÁSOK --- */
// A szervered CFX kódja:
const SERVER_CODE = 'xgxbqr'; 

// Hamburger menü nyitás/zárás
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
        console.error('Hiba a másoláskor: ', err);
    });
}

// Háttér effekt (mozgatás egérre)
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

    // Ellenőrzés, hogy a kód be van-e írva (most már be van!)
    if (!SERVER_CODE || SERVER_CODE === 'IDE_ÍRD_A_KÓDOT') {
        statText.innerText = "Nincs CFX kód beállítva!";
        statText.style.color = "red";
        return;
    }

    try {
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${SERVER_CODE}`);
        
        if (!response.ok) throw new Error("Szerver nem elérhető");

        const data = await response.json();
        
        // Ha offline a szerver vagy nincs adat
        if (!data || !data.Data) {
             throw new Error("Nincs adat");
        }

        const players = data.Data.clients;
        const maxPlayers = data.Data.sv_maxclients;

        statText.innerText = `Online: ${players} / ${maxPlayers}`;
        statText.style.color = "white"; // Visszaállítjuk fehérre, ha jó
        
        dot.classList.remove("offline");
        dot.classList.add("online");

    } catch (error) {
        console.error("Hiba:", error);
        statText.innerText = "Szerver Offline";
        dot.classList.remove("online");
        dot.classList.add("offline");
    }
}

window.onload = function() {
    updatePlayerCount();
    setInterval(updatePlayerCount, 30000);
};
