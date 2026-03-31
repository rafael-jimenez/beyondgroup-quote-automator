// --- CONFIGURATION / ASSUMPTIONS ---
const CREW_SIZE = 2;
const HOURS_PER_DAY = 10;
const FUEL_RATE = 0.75; 
const PAYROLL_BURDEN = 1.20; 
const WASTE_FACTOR = 1.12; 
const ESCALATION = 1.04; 

function openChat(event) {
    if (event) event.stopPropagation(); 
    const box = document.getElementById("chat-box");
    if (box.style.display === "block") {
        box.style.display = "none";
        return;
    }
    box.style.display = "block";
    renderChat(1);
}

document.addEventListener('click', function(event) {
    const container = document.getElementById('chat-container');
    const box = document.getElementById("chat-box");
    if (box && box.style.display === "block" && !container.contains(event.target)) {
        box.style.display = "none";
    }
});

function renderChat(step, event) {
    if (event) event.stopPropagation();
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
                <div class="chat-btn" onclick="renderChat(2, event)">Company Information</div>
                <div class="chat-btn" onclick="renderChat(3, event)">Project Services</div>
                <div class="chat-btn" onclick="renderChat(4, event)">Reviews & Feedback</div>
            `;
        } else if (step === 2) {
            content.innerHTML = `
                <div class="bubble">Great! Here is the info on Beyond Group:</div>
                <a href="https://www.beyondgroup.ca/" target="_blank" class="chat-btn">Home Page</a>
                <a href="https://www.beyondgroup.ca/about/who-we-are" target="_blank" class="chat-btn">About Us</a>
                <a href="https://www.beyondgroup.ca/the-beyond-herald" target="_blank" class="chat-btn">Our Blogs</a>
                <div class="chat-btn" style="border-color: #ccc; color: #999;" onclick="renderChat(1, event)">← Back</div>
            `;
        } else if (step === 3) {
            content.innerHTML = `
                <div class="bubble">You can check out our technical units here:</div>
                <a href="https://www.beyondgroup.ca/about/divisions" target="_blank" class="chat-btn">Services</a>
                <div class="chat-btn" style="border-color: #ccc; color: #999;" onclick="renderChat(1, event)">← Back</div>
            `;
        } else if (step === 4) {
            content.innerHTML = `
                <div class="bubble">We value your feedback!</div>
                <a href="https://g.page/r/CYwQ8SZNLRBsEBM/review" target="_blank" class="chat-btn">Google Reviews</a>
                <div class="chat-btn" style="border-color: #ccc; color: #999;" onclick="renderChat(1, event)">← Back</div>
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

    // 1. MATERIAL CALC (MASTER FORMULA)
    const rawLbs = v * 1.308 * 100;
    const totalLbsWithWaste = rawLbs * WASTE_FACTOR; 
    const sets = Math.ceil(totalLbsWithWaste / 1000);

    // 2. CLIENT REVENUE
    const foamRev = rawLbs * 13; // Charged on raw lbs
    const mobCharge = 2200;
    const total2026 = foamRev + mobCharge;
    const total2027 = total2026 * ESCALATION;

    // 3. INTERNAL COST BUILD (ITEMIZED)
    const materialCost = sets * 2300;
    const labor = (CREW_SIZE * HOURS_PER_DAY * d * 40) * PAYROLL_BURDEN; 
    
    // Travel Breakdown
    const hotel = (d - 1) * 200;
    const food = d * (CREW_SIZE * 75);
    const fuel = (dist * 2) * FUEL_RATE;
    const travelTotal = hotel + food + fuel;

    // Fixed Costs
    const fixedTotal = 150 + 300 + 300 + 500; // PPE + Maint + Misc + Overhead
    const internalTotal = materialCost + labor + travelTotal + fixedTotal;

    // 4. MARGIN ANALYSIS
    const profit = total2026 - internalTotal;
    const margin = (profit / total2026) * 100;

    // 5. CLIENT CARD DISPLAY
    document.getElementById('out-rev').innerHTML = 
        `$${foamRev.toLocaleString(undefined, {minimumFractionDigits: 2})} <br>
         <small style="font-size:9px; color:#777; font-weight:400;">(${v}m³ × 1.308 × 100 = ${Math.round(rawLbs)} lbs)</small>`;
    
    document.getElementById('out-total').innerText = "$" + total2026.toLocaleString(undefined, {minimumFractionDigits: 2});
    document.getElementById('out-2027').innerText = "$" + total2027.toLocaleString(undefined, {minimumFractionDigits: 2});
    
    // 6. INTERNAL CARD DISPLAY
    document.getElementById('out-drums').innerText = `${sets} Sets (${Math.round(totalLbsWithWaste)} lbs incl. 12% waste)`;
    document.getElementById('out-labor').innerText = `$${labor.toLocaleString()} (${CREW_SIZE} crew @ 10h)`;
    
    document.getElementById('out-travel').innerHTML = 
        `$${travelTotal.toLocaleString()} <br>
         <small style="font-size:9px; color:#777; font-weight:400;">(Hotel: $${hotel} | Food: $${food} | Fuel: $${fuel.toFixed(0)})</small>`;
    
    document.getElementById('out-cost').innerHTML = 
        `$${internalTotal.toLocaleString(undefined, {minimumFractionDigits: 2})} 
         <br><hr style="margin:8px 0; border:0; border-top:1px dashed #ddd;"> 
         <span style="color:#28a745; font-size:14px;">Profit: $${profit.toLocaleString(undefined, {minimumFractionDigits: 2})}</span><br>
         <span style="font-size:11px; font-weight:400;">Margin: ${margin.toFixed(1)}%</span>`;

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

function copy(type, event) {
    if (event) event.stopPropagation();
    const id = type === 'client' ? 'copy-client' : 'copy-internal';
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        const btn = event.target;
        btn.innerText = "COPIED!";
        setTimeout(() => { btn.innerText = type === 'client' ? "Copy Bid" : "Copy Specs"; }, 2000);
    });
}