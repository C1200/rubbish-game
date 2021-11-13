var counter = parseInt(localStorage.getItem("highscore") ?? "0");
var totalCPS = parseInt(localStorage.getItem("cps") ?? "0");
localStorage.setItem("highscore", counter);
localStorage.setItem("cps", totalCPS);
updateCounter();

function updateCounter() {
    var cs = document.getElementsByClassName("counter");
    for (var c of cs) {
        c.innerText = `${counter}`
            .replace(/,/g, "")
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
}

function newRubbish(enableDelay) {
    if (document.getElementsByClassName("rubbish").length > 50) return;
    var r = new Image();
    r.className = "rubbish";
    r.style.top = Math.floor(Math.random() * 100) + "%";
    if (enableDelay) r.style.animationDelay = Math.random() * 6 + "s";
    r.src = Math.random() > 0.5 ? "images/rubbish1.png" : "images/rubbish2.png";
    r.onanimationend = () => r.remove();
    document.getElementsByClassName("clicker")[0].append(r);
}

function donate(val, rubbishDelay) {
    counter += val;
    localStorage.setItem("highscore", counter);
    updateCounter();
    if (val > 0) {
        for (var i = 0; i < val; i++) newRubbish(rubbishDelay);
    }
}

function buy(price, cps) {
    if (price > counter) return alert("You don't have enough cash!");
    counter -= price;
    totalCPS += cps;
    localStorage.setItem("cps", totalCPS);
    localStorage.setItem("highscore", counter);
    updateCounter();
}

function reset() {
    var conf = confirm("Are you sure you want to reset?");
    if (conf) {
        counter = 0;
        totalCPS = 0;
        localStorage.setItem("highscore", counter);
        localStorage.setItem("cps", totalCPS);
        updateCounter();
        for (var r of document.getElementsByClassName("rubbish")) {
            r.remove();
        }
    }
}

function openShop() {
    var s = document.getElementsByClassName("shop")[0];
    s.classList.contains("open")
        ? s.classList.remove("open")
        : s.classList.add("open");
}

setInterval(() => {
    donate(totalCPS, true);
}, 1000);
