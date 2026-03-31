function openChat() {
    const box = document.getElementById("chat-box");
    if (box.style.display === "block") {
        box.style.display = "none";
        return;
    }
    box.style.display = "block";
    renderChat(1);
}

function renderChat(step) {
    const loader = document.getElementById("chat-loading");
    const content = document.getElementById("chat-content");
    
    content.innerHTML = "";
    loader.style.display = "block";

    setTimeout(() => {
        loader.style.display = "none";
        if (step === 1) {
            content.innerHTML = `
                <div class="bubble">Hi! I'm here to help you navigate.</div>
                <div class="bubble">What are you looking for today?</div>
                <div class="chat-btn" onclick="renderChat(2)">Company Information</div>
                <div class="chat-btn" onclick="renderChat(3)">Project Services</div>
                <div class="chat-btn" onclick="renderChat(4)">Reviews & Feedback</div>
            `;
        } else if (step === 2) {
            content.innerHTML = `
                <div class="bubble">Great! Here is the info on Beyond Group:</div>
                <a href="https://www.beyondgroup.ca/" target="_blank" class="chat-btn">Home Page</a>
                <a href="https://www.beyondgroup.ca/about/who-we-are" target="_blank" class="chat-btn">About Us</a>
                <a href="https://www.beyondgroup.ca/the-beyond-herald" target="_blank" class="chat-btn">Our Blogs</a>
                <div class="chat-btn" style="border-color: #ccc; color: #999;" onclick="renderChat(1)">← Back</div>
            `;
        } else if (step === 3) {
            content.innerHTML = `
                <div class="bubble">You can check out our technical units here:</div>
                <a href="https://www.beyondgroup.ca/about/divisions" target="_blank" class="chat-btn">Services</a>
                <div class="chat-btn" style="border-color: #ccc; color: #999;" onclick="renderChat(1)">← Back</div>
            `;
        } else if (step === 4) {
            content.innerHTML = `
                <div class="bubble">We value your feedback!</div>
                <a href="https://g.page/r/CYwQ8SZNLRBsEBM/review" target="_blank" class="chat-btn">Google Reviews</a>
                <div class="chat-btn" style="border-color: #ccc; color: #999;" onclick="renderChat(1)">← Back</div>
            `;
        }
    }, 700);
}

function calculate() {
    const v = parseFloat(document.getElementById('in-vol').value);
    const d = parseFloat(document.getElementById('in-days').value);
    const dist = parseFloat(document.getElementById('in-dist').value);

    if (!v || v <= 0 || !d || d <= 0 || !dist || dist <= 0) {
        alert("Please enter a value of 1 or higher for all fields.");
        return;
    }

    const lbs = v * 1.308 * 100;
    const rev = lbs * 13;
    const total = rev + 2200;
    const sets = Math.ceil((lbs * 1.12) / 1000);
    const matCost = sets * 2300;
    const labor = (2 * 10 * d * 40) * 1.20; 
    const travel = (d > 1 ? (d - 1) * 200 : 0) + (2 * d * 75) + (dist * 2 * 0.75); 

    document.getElementById('out-rev').innerText = "$" + rev.toLocaleString(undefined, {minimumFractionDigits: 2});
    document.getElementById('out-total').innerText = "$" + total.toLocaleString(undefined, {minimumFractionDigits: 2});
    document.getElementById('out-2027').innerText = "$" + (total * 1.04).toLocaleString(undefined, {minimumFractionDigits: 2});
    
    document.getElementById('out-drums').innerText = sets + " Set(s)";
    document.getElementById('out-labor').innerText = "$" + labor.toLocaleString();
    document.getElementById('out-travel').innerText = "$" + travel.toLocaleString();
    document.getElementById('out-cost').innerText = "$" + (matCost + labor + travel + 1250).toLocaleString(undefined, {minimumFractionDigits: 2});

    document.getElementById('results').style.display = 'block';
    setTimeout(() => {
        window.scrollTo({ top: document.getElementById('results').offsetTop - 100, behavior: 'smooth' });
    }, 100);
}

function resetAll() {
    document.getElementById('in-vol').value = "";
    document.getElementById('in-days').value = "";
    document.getElementById('in-dist').value = "";
    document.getElementById('results').style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copy(type) {
    const id = type === 'client' ? 'copy-client' : 'copy-internal';
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        btn.innerText = "COPIED!";
        setTimeout(() => { btn.innerText = type === 'client' ? "Copy Bid" : "Copy Specs"; }, 2000);
    });
}