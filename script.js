/* --- BEÁLLÍTÁSOK --- */
const SERVER_CODE = 'xgxbqr'; // Itt a kódod beégetve

// Hamburger menü
function toggleMenu() {
    var nav = document.getElementById("navLinks");
    nav.classList.toggle("active");
}

// IP másolás
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

// --- JÁTÉKOS SZÁMLÁLÓ (EGYSZERŰSÍTVE) ---
async function updatePlayerCount() {
    const statText = document.getElementById("player-stat");
    const dot = document.querySelector(".live-dot");

    try {
        // Lekérdezés
        const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/${SERVER_CODE}`);
        const data = await response.json();

        // Ha van adat
        if (data && data.Data) {
            const players = data.Data.clients;
            const maxPlayers = data.Data.sv_maxclients;
            
            statText.innerText = `Online: ${players} / ${maxPlayers}`;
            statText.style.color = "white"; 
            
            dot.classList.remove("offline");
            dot.classList.add("online");
        } else {
            // Ha a szerver nem ad adatot (pl. offline)
            statText.innerText = "Szerver Offline";
            dot.classList.remove("online");
            dot.classList.add("offline");
        }

    } catch (error) {
        console.log("API Hiba:", error);
        statText.innerText = "Szerver Offline";
        dot.classList.remove("online");
        dot.classList.add("offline");
    }
}

window.onload = function() {
    updatePlayerCount();
    setInterval(updatePlayerCount, 30000);
};
