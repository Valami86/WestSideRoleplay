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
        console.error('Hiba: ', err);
    });
}

// --- ÚJ: HÁTTÉR PARALLAX EFFEKT EGÉRMOZGÁSRA ---
document.addEventListener("mousemove", function(e) {
    // Csak desktopon (ahol van egér) fusson, mobilon ne
    if (window.innerWidth > 768) {
        const moveFactor = 20; // Minél kisebb a szám, annál többet mozdul a háttér
        
        // Kiszámoljuk az egér pozícióját a képernyő közepéhez képest
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Mozgatjuk a body hátterét
        document.body.style.backgroundPositionX = (50 + mouseX * moveFactor) + "%";
        document.body.style.backgroundPositionY = (50 + mouseY * moveFactor) + "%";
    }
});
