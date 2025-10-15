//    JS：滾動 header 變色 
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});



//  側邊購物車 


const cartPanel = document.getElementById('cartPanel');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');

let cart = [];

cartBtn.addEventListener('click', () => {
  cartPanel.classList.toggle('open');
});

closeCart.addEventListener('click', () => {
  cartPanel.classList.remove('open');
});

// 點擊加入購物車
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.menu-item');
    const name = item.querySelector('.item-title').childNodes[0].textContent.trim();
    const price = parseInt(item.querySelector('.item-price').textContent.replace('$', ''));

    addToCart(name, price);
    renderCart();

    // 點加入購物車呼叫cartPanel視窗
    // cartPanel.classList.add('open');
  });
});

// 新增商品或增加數量
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
}

// 刪除單項商品
function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}

// 更新購物車畫面
function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement('li');
    li.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-qty">數量：${item.qty}</span>
      </div>
      <div>
        <span>$${item.price * item.qty}</span>
        <button class="remove-btn" title="刪除" onclick="removeFromCart('${item.name}')">✕</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `$${total}`;

  function updateQty(name, delta) {
    const item = cart.find(i => i.name === name);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.name !== name);
    renderCart();
  }
}