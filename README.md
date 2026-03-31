# Beyond Group | Foam Project Estimator (v1.0)

### **Overview**
This is a high-performance web-based tool designed to automate industrial foam bidding. Instead of using "black box" calculations, this tool provides full transparency into the **Master Formula**, **Internal Cost Build**, and **Project Profitability**.

### **The "Lethbridge Job" Output**
Based on the **18m³ / 2-day / 215km** scenario, the tool generates:
* **Total 2026 Bid:** $32,807.20
* **2027 Contingency (+4%):** $34,119.49
* **Internal Cost Build:** $10,892.50
* **Project Profit:** $21,914.70 (**66.8% Margin**)

---

### **Detailed Technical & Math Breakdown**

#### **1. Material Logic (The Billing vs. Ordering Split)**
One of the most critical decisions I made was separating **Billable Lbs** from **Ordered Lbs** to protect company margins.
* **The Master Formula:** I followed your instruction exactly: $$m^3 \times 1.308 \times 100 = \text{Raw Lbs}$$
    * *Calculation:* $18 \times 1.308 \times 100 = 2,354.4 \text{ lbs}$.
* **Revenue:** The client is billed **$13/lb** on these raw lbs.
* **Waste Factor:** Internally, a **12% waste factor** ($2,354.4 \times 1.12 = 2,636.9 \text{ lbs}$) is applied to determine the internal cost. Since HMI sets are 1,000 lbs, the tool automatically calculates that we need **3 sets**.

#### **2. Labor & Payroll Burden**
The brief provided a $40/hr rate but not a crew size. I utilized **Global Constants** to account for standard field operations:
* **Crew Size:** 2 Workers (Standard safety protocol for high-pressure pumping).
* **Work Day:** 10 Hours (Accounting for travel/setup).
* **Payroll Burden:** I added a **20% burden** to the base rate to reflect the true cost (taxes, benefits, insurance).
    * *Formula:* $$(2 \text{ staff} \times 10 \text{ hrs} \times 2 \text{ days} \times \$40) \times 1.20 = \$1,920$$

#### **3. Logistics & Travel**
To ensure the numbers were "right," I itemized the travel costs:
* **Hotel:** Calculated as $$(Days - 1) \times \$200$$. (1 night for a 2-day job).
* **Food:** $75/person/day$ for the full duration of the trip.
* **Fuel:** A round-trip calculation $$(Dist \times 2)$$ at a rate of **$0.75/km**.

#### **4. Fixed Cost Transparency**
I broke down the **$1,250** overhead into specific categories (PPE, Maintenance, Misc, Overhead) within the UI. This ensures the tool is an audit-ready internal tool, not just a calculator. This also allows a team member to see exactly where the money is going rather than seeing one "scary" lump sum.

---

### **Why I Made These Choices**
* **Brand Integration (The "Beyond" Support Widget):** I integrated a custom-built navigation widget that links directly to Beyond Group’s core resources (Divisions, Blogs, and Google Reviews). This ensures the tool functions as a central operational hub for the team.
* **User Interface:** I used a "Card" layout. The left card is **Client Facing** (for sales communication), and the right card is **Internal Only** (for management margin analysis).
* **Scalability:** All rates (Fuel, Labor, Waste) are variables at the top of the script. As Beyond Group grows, the tool can be updated in seconds by changing one number.
* **Bilingual Capability:** As a bilingual communicator (English/Spanish), I ensured the code is clean and structured for easy localization if Beyond Group expands into international markets.

### **What I’d Build Next (Day 2 Features)**
1.  **PDF Export:** A button to instantly generate a branded PDF quote to email the client.
2.  **Dynamic Crew Inputs:** Adding toggles to change crew size or hours on the fly for more complex jobs.
3.  **Database Integration:** Saving bids to a dashboard to track close rates and historical pricing.

---
[**View project**](https://beyondgroupquote-rafael.netlify.app/)
---
**Developed by Rafael Jimenez**