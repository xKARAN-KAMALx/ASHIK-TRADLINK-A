const PRODUCTS = [
  {id:"BR01",name:"Bread 100g",desc:"Fresh bakery bread · 100g",unitPrice:8,perBox:50,boxPrice:400,image:"BR01.jpg"},
  {id:"BR02",name:"Bread 200g",desc:"Fresh bakery bread · 200g",unitPrice:16,perBox:24,boxPrice:384,image:"BR02.jpg"},
  {id:"BR03",name:"Bread 300g",desc:"Fresh bakery bread · 300g",unitPrice:24,perBox:18,boxPrice:432,image:"BR03.jpg"},
  {id:"BR04",name:"Makkhan Malai 300g",desc:"Bakery product · 300g",unitPrice:26,perBox:15,boxPrice:390,image:"BR04.jpg"},
  {id:"BR05",name:"Brown Bread 300g",desc:"Brown bread · 300g",unitPrice:26,perBox:15,boxPrice:390,image:"BR05.jpg"},
  {id:"BR06",name:"Cream Roll ₹10",desc:"Cream roll pack",unitPrice:80,perBox:15,boxPrice:1200,image:"BR06.jpg"},
  {id:"BR07",name:"Cream Roll ₹5",desc:"Cream roll pack",unitPrice:45,perBox:20,boxPrice:900,image:"BR07.jpg"},
  {id:"BR08",name:"Petphata · 6 pcs",desc:"6-piece pack",unitPrice:25,perBox:20,boxPrice:500,image:"BR08.jpg"},
  {id:"BR09",name:"Tikona · 4 pcs",desc:"4-piece pack",unitPrice:16,perBox:20,boxPrice:320,image:"BR09.jpg"},
  {id:"BR10",name:"Fan · 6 pcs",desc:"6-piece pack",unitPrice:9,perBox:50,boxPrice:450,image:"BR10.jpg"},
  {id:"BR11",name:"Fan · 12 pcs",desc:"12-piece pack",unitPrice:18,perBox:30,boxPrice:540,image:"BR11.jpg"},
  {id:"BR12",name:"Bun · 6 pcs",desc:"6-piece pack",unitPrice:9,perBox:50,boxPrice:450,image:"BR12.jpg"},
  {id:"BR13",name:"Pape ₹10",desc:"Pape pack",unitPrice:8,perBox:20,boxPrice:160,image:"BR13.jpg"},
  {id:"BR14",name:"Pape Special ₹20",desc:"Special pape pack",unitPrice:18,perBox:20,boxPrice:360,image:"BR14.jpg"}
];
const OWNER = {name:"Ashik Mansuri",phone:"9389765626",whatsapp:"919389765626"};
const PRODUCT_DIR = "assets/images/product/breads/";
const FALLBACK_IMAGE = "assets/images/product/breads/placeholder.svg";
const state = {category:"all",search:"",cart:loadCart(),modalReturn:"home",theme:"light",cardColor:"orange",language:"en"};
const $ = (id)=>document.getElementById(id);
const rupees = (n)=>"₹"+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2});
function loadCart(){try{return JSON.parse(localStorage.getItem("ashiqTradlinkCart")||"{}")}catch{return {}}}
function saveCart(){try{localStorage.setItem("ashiqTradlinkCart",JSON.stringify(state.cart))}catch{}}
function cartQty(id){return Math.max(0,Number(state.cart[id]||0))}
function totals(){
  let goods=0,boxes=0,pieces=0,types=0;
  PRODUCTS.forEach(p=>{const q=cartQty(p.id);if(q>0){types++;goods+=p.boxPrice*q;boxes+=q;pieces+=p.perBox*q}});
  return {goods,boxes,pieces,types};
}
function productImagePath(p){return PRODUCT_DIR+p.image}
function renderProducts(){
  const list=PRODUCTS.filter(p=>(state.category==="all"||state.category==="breads")&&(`${p.name} ${p.id} ${p.desc}`.toLowerCase().includes(state.search.toLowerCase())));
  $("productGrid").innerHTML=list.map(p=>`
    <article class="product-card">
      <div class="product-image-wrap"><span class="product-id">${p.id}</span>
        <img class="product-image" src="${productImagePath(p)}" alt="${escapeHtml(p.name)}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'">
      </div>
      <div class="product-content">
        <h3 class="product-name">${escapeHtml(p.name)}</h3><p class="product-desc">${escapeHtml(p.desc)}</p>
        <div class="product-price-per">Per piece: <strong>${rupees(p.unitPrice)}</strong></div>
        <div class="product-facts">
          <div class="product-fact"><small>Items / box</small><strong>${p.perBox}</strong></div>
          <div class="product-fact"><small>Box price</small><strong>${rupees(p.boxPrice)}</strong></div>
        </div>
      </div>
      <div class="add-bar">
        <button class="add-main" data-add="${p.id}" aria-label="Add one box of ${escapeHtml(p.name)}"><span class="add-plus">+</span><span class="add-label">Add to Cart</span><span class="quantity">${cartQty(p.id)||""}</span></button>
        <button class="minus-btn" data-minus="${p.id}" aria-label="Remove one box of ${escapeHtml(p.name)}">−</button>
      </div>
    </article>`).join("");
  $("catalogueTitle").textContent=state.category==="all"?"All products":"Breads";
  $("resultCount").textContent=`${list.length} product${list.length===1?"":"s"}`;
  $("emptySearch").classList.toggle("hidden",list.length>0);
  document.querySelectorAll(".category-pill").forEach(b=>b.classList.toggle("active",b.dataset.category===state.category));
  updateSummary();
}
function updateSummary(){
  const t=totals();$("goodsTotal").textContent=rupees(t.goods);$("boxCount").textContent=t.boxes;$("pieceCount").textContent=t.pieces;
  document.querySelectorAll("[data-add]").forEach(b=>{const q=cartQty(b.dataset.add);const el=b.querySelector(".quantity");if(el)el.textContent=q||"";});
  saveCart();
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function cartDetailsHtml(){
  const selected=PRODUCTS.filter(p=>cartQty(p.id)>0);const t=totals();
  if(!selected.length)return `<div class="notice">Your cart is empty. Please select or add something to cart.</div>`;
  const lines=selected.map(p=>`<div class="cart-line"><img src="${productImagePath(p)}" alt="" onerror="this.onerror=null;this.src='${FALLBACK_IMAGE}'"><div><h3>${escapeHtml(p.name)} × ${cartQty(p.id)} box${cartQty(p.id)>1?"es":""}</h3><p>${rupees(p.boxPrice)} / box · ${p.perBox} pieces per box · ${rupees(p.unitPrice)} / piece</p><p>${p.perBox*cartQty(p.id)} pieces total</p></div><strong>${rupees(p.boxPrice*cartQty(p.id))}</strong></div>`).join("");
  return `${lines}<div class="totals-card"><div class="total-row"><span>Distinct product types</span><strong>${t.types}</strong></div><div class="total-row"><span>Total boxes</span><strong>${t.boxes}</strong></div><div class="total-row"><span>Total pieces</span><strong>${t.pieces}</strong></div><div class="total-row grand"><span>Goods subtotal</span><strong>${rupees(t.goods)}</strong></div></div>`;
}
function openModal(title,eyebrow,body,returnTo="home"){
  state.modalReturn=returnTo;$("modalTitle").textContent=title;$("modalEyebrow").textContent=eyebrow;$("modalBody").innerHTML=body;$("modalBackdrop").classList.remove("hidden");document.body.style.overflow="hidden";
}
function closeModal(){$("modalBackdrop").classList.add("hidden");document.body.style.overflow="";if(state.modalReturn==="form")openOrderForm(false)}
function openCartDetails(returnTo="home"){
  const t=totals();let buttons=`<div class="modal-actions"><button class="secondary-btn" data-close>Continue shopping</button>${t.goods>=500?'<button class="primary-btn" data-open-form>Proceed to order →</button>':""}</div>`;
  openModal("Cart Details","YOUR SELECTION",cartDetailsHtml()+buttons,returnTo);
}
function openOrderForm(open=true){
  const t=totals();
  if(t.goods===0){openModal("Your cart is empty","ADD PRODUCTS",`<div class="notice">Please select or add something to cart.</div><div class="modal-actions"><button class="primary-btn" data-close>Continue shopping</button></div>`);return}
  if(t.goods<500){openModal("Minimum order ₹500","MINIMUM ORDER",`<div class="notice">Your goods subtotal is ${rupees(t.goods)}. Add ${rupees(500-t.goods)} more to reach the minimum goods order of ₹500. Delivery is calculated separately.</div><div class="modal-actions"><button class="primary-btn" data-close>Return to shop</button></div>`);return}
  const form=`<div class="modal-actions"><button class="secondary-btn" data-return-shop>← Return to Shop</button><button class="secondary-btn" data-full-details>View Full Order Details</button></div>
  <form id="orderForm" class="order-form">
    <div class="field"><label for="customerName">Name *</label><input id="customerName" name="customerName" required maxlength="80" placeholder="Your full name"></div>
    <div class="field"><label for="shopName">Shop name (optional)</label><input id="shopName" name="shopName" maxlength="100" placeholder="Shop name"></div>
    <div class="field full"><label for="customerAddress">Address *</label><input id="customerAddress" name="customerAddress" required maxlength="220" placeholder="Full delivery address"></div>
    <div class="field"><label for="customerMobile">Mobile number (optional)</label><input id="customerMobile" name="customerMobile" type="tel" inputmode="tel" maxlength="16" placeholder="Mobile number"></div>
    <div class="field"><label for="distanceKm">Mangupur se aapke yahan tak ki lagbhag doori (km) *</label><input id="distanceKm" name="distanceKm" required type="number" min="0.1" max="500" step="0.1" placeholder="e.g. 10"></div>
    <div class="field full"><label>Goods subtotal</label><div class="readonly-box">${rupees(t.goods)} · Minimum ₹500 satisfied</div></div>
    <div class="field"><label>Delivery charge (distance × ₹4)</label><div class="readonly-box" id="deliveryPreview">Enter distance to calculate</div></div>
    <div class="field"><label>Final payable amount</label><div class="readonly-box" id="grandPreview">${rupees(t.goods)} + delivery</div></div>
    <div class="field full"><label for="extraMessage">Additional message (optional)</label><textarea id="extraMessage" name="extraMessage" maxlength="500" placeholder="Any special instructions?"></textarea></div>
    <div class="field full"><label>Order date & time</label><div class="readonly-box" id="orderDateTime">${new Date().toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"})}</div></div>
    <div class="field full"><div class="totals-card"><div class="total-row"><span>Total boxes</span><strong>${t.boxes}</strong></div><div class="total-row"><span>Total individual pieces</span><strong>${t.pieces}</strong></div><div class="total-row"><span>Distinct product types</span><strong>${t.types}</strong></div></div></div>
    <div class="field full"><button class="primary-btn" type="submit">Order on WhatsApp <span>↗</span></button><p class="muted small">WhatsApp will open with your order prepared. Please review it and press Send yourself.</p></div>
  </form>`;
  openModal("Complete Your Order","CUSTOMER DETAILS",form);
  const distance=$("distanceKm");distance.addEventListener("input",updateDeliveryPreview);
  $("orderForm").addEventListener("submit",submitOrder);
  $("orderDateTime").textContent=new Date().toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"});
}
function updateDeliveryPreview(){
  const raw=Number($("distanceKm").value);const valid=Number.isFinite(raw)&&raw>0;
  $("deliveryPreview").textContent=valid?rupees(raw*4):"Enter distance to calculate";
  $("grandPreview").textContent=valid?rupees(totals().goods+raw*4):rupees(totals().goods)+" + delivery";
}
function submitOrder(e){
  e.preventDefault();const t=totals();const form=new FormData(e.currentTarget);
  const name=String(form.get("customerName")||"").trim(),address=String(form.get("customerAddress")||"").trim(),distance=Number(form.get("distanceKm"));
  if(!name||!address||!Number.isFinite(distance)||distance<=0){alert("Please complete the required fields and enter a valid distance.");return}
  if(t.goods<500){alert("Minimum goods order is ₹500.");return}
  const delivery=distance*4,grand=t.goods+delivery,date=new Date().toLocaleString("en-IN",{dateStyle:"medium",timeStyle:"short"});
  const lines=PRODUCTS.filter(p=>cartQty(p.id)>0).map(p=>`• ${p.name} (${p.id}) | ${cartQty(p.id)} box × ${rupees(p.boxPrice)} = ${rupees(p.boxPrice*cartQty(p.id))} | ${p.perBox*cartQty(p.id)} pieces`).join("\n");
  const message=[
    "🛒 *NEW ORDER - ASHIQ TRADLINK*","",
    `Name: ${name}`,`Address: ${address}`,`Shop name: ${String(form.get("shopName")||"").trim()||"Not provided"}`,
    `Mobile: ${String(form.get("customerMobile")||"").trim()||"Not provided"}`,`Order date/time: ${date}`,`Distance from Mangupur: ${distance} km (one-way)`,"",
    "*ORDER ITEMS*",lines,"",`Distinct product types: ${t.types}`,`Total boxes: ${t.boxes}`,`Total pieces: ${t.pieces}`,
    `Goods subtotal: ${rupees(t.goods)}`,`Delivery charge (${distance} km × ₹4): ${rupees(delivery)}`,`*FINAL TOTAL: ${rupees(grand)}*`,
    `Additional message: ${String(form.get("extraMessage")||"").trim()||"None"}`,"","Please confirm this order."
  ].join("\n");
  window.open(`https://wa.me/${OWNER.whatsapp}?text=${encodeURIComponent(message)}`,"_blank","noopener");
}
function showMore(section){
  $("homeView").classList.add("hidden");$("moreView").classList.remove("hidden");document.body.style.overflow="hidden";
  const ids={contact:"more-contact",social:"more-social",about:"more-about",developer:"more-developer",more:"more-contact"};
  setTimeout(()=>{const el=$(ids[section]||"more-contact");if(el)el.scrollIntoView({behavior:"smooth",block:"start"})},30);
}
function returnHome(){$("moreView").classList.add("hidden");$("homeView").classList.remove("hidden");document.body.style.overflow="";window.scrollTo({top:0,behavior:"smooth"})}
function applyTheme(){document.body.classList.toggle("dark",state.theme==="dark");document.body.classList.remove("card-orange","card-blue","card-green","card-yellow","card-red");document.body.classList.add("card-"+state.cardColor)}
function init(){
  renderProducts();$("year").textContent=new Date().getFullYear();
  $("searchInput").addEventListener("input",e=>{state.search=e.target.value.trim();renderProducts()});
  document.querySelectorAll(".category-pill").forEach(b=>b.addEventListener("click",()=>{state.category=b.dataset.category;renderProducts()}));
  $("productGrid").addEventListener("click",e=>{const add=e.target.closest("[data-add]"),minus=e.target.closest("[data-minus]");if(add){state.cart[add.dataset.add]=cartQty(add.dataset.add)+1;renderProducts()}if(minus){state.cart[minus.dataset.minus]=Math.max(0,cartQty(minus.dataset.minus)-1);if(state.cart[minus.dataset.minus]===0)delete state.cart[minus.dataset.minus];renderProducts()}});
  $("viewCartButton").addEventListener("click",()=>openCartDetails("home"));
  $("orderNowButton").addEventListener("click",()=>openOrderForm());
  $("viewMoreButton").addEventListener("click",()=>showMore("contact"));
  $("returnHomeButton").addEventListener("click",returnHome);
  $("menuButton").addEventListener("click",()=>{$("settingsMenu").classList.toggle("hidden");$("menuButton").setAttribute("aria-expanded",String(!$("settingsMenu").classList.contains("hidden")))});
  $("closeMenu").addEventListener("click",()=>$("settingsMenu").classList.add("hidden"));
  $("themeSelect").addEventListener("change",e=>{state.theme=e.target.value;applyTheme()});
  $("cardColorSelect").addEventListener("change",e=>{state.cardColor=e.target.value;applyTheme()});
  document.querySelectorAll("[data-more]").forEach(b=>b.addEventListener("click",()=>showMore(b.dataset.more)));
  $("closeModal").addEventListener("click",closeModal);
  $("modalBackdrop").addEventListener("click",e=>{if(e.target===$("modalBackdrop"))closeModal()});
  $("modalBody").addEventListener("click",e=>{
    if(e.target.closest("[data-close]")){closeModal();return}
    if(e.target.closest("[data-open-form]")){openOrderForm();return}
    if(e.target.closest("[data-return-shop]")){closeModal();return}
    if(e.target.closest("[data-full-details]")){openCartDetails("form");return}
  });
  let slide=0;setInterval(()=>{slide=(slide+1)%2;$("bannerTrack").style.transform=`translateX(-${slide*100}%)`;[...$("bannerDots").children].forEach((d,i)=>d.classList.toggle("active",i===slide))},5000);
  // Real active-user tracking requires a backend. This box stays honest until one is connected.
  $("liveCount").textContent="Count unavailable";
  applyTheme();
}
init();
