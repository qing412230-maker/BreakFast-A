//    JS：滾動 header 變色 
window.addEventListener('scroll', () => {
  const header = document.getElementById('site-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});



// ----------------- 抓取 DOM 元素 -----------------
const cartPanel = document.getElementById('cartPanel');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartBtn = document.getElementById('cartBtn'); // 購物車按鈕
const closeCart = document.getElementById('closeCart');
const checkoutBtn = document.getElementById('checkoutBtn');


// ----------------- 購物車資料 -----------------
let cart = []; // 儲存商品 { name, price, qty }

// ----------------- 顯示 / 隱藏購物車 -----------------

closeCart.addEventListener('click', (e) => {
  e.stopPropagation();
  cartPanel.classList.remove('active')
});

// ----------------- 加入購物車 -----------------
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.menu-item');
    const name = item.querySelector('.item-title').childNodes[0].textContent.trim();
    const price = parseInt(item.querySelector('.item-price').textContent.replace('$', ''));

    addToCart(name, price);
    renderCart();
    // cartPanel.classList.add('open'); // 加入後自動打開購物車
  });
});


// 點擊購物車本身不關閉
cartPanel.addEventListener('click', (e) => {
  e.stopPropagation();
});

//--------------- 點擊空白處關閉購物車------------------

document.addEventListener('click', (e) => {
  if (
    cartPanel.classList.contains('active') &&
    !cartPanel.contains(e.target) &&
    e.target !== cartBtn

  ) {
    cartPanel.classList.remove('active');
  }

});

cartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  cartPanel.classList.toggle('active');
});



// ----------------- 新增或增加商品數量 -----------------
function addToCart(name, price) {
  const existing = cart.find(i => i.name === name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
}

// ----------------- 刪除商品 -----------------
function removeFromCart(name) {
  cart = cart.filter(i => i.name !== name);
  renderCart();
}

// ----------------- 更新商品數量 -----------------
function updateQty(name, delta) {
  const item = cart.find(i => i.name === name);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(name);
  else renderCart();
}

// ----------------- 渲染購物車 -----------------
function renderCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
      <div class="cart-item-info">
        <span class="cart-item-name">${item.name}</span>
        <div class="cart-item-qty-control">
          <button onclick="updateQty('${item.name}', -1)">➖</button>
          <span>${item.qty}</span>
          <button onclick="updateQty('${item.name}', 1)">➕</button>
        </div>
      </div>
      <div class="cart-item-price">
        <span>$${item.price * item.qty}</span>
        <button class="remove-btn" onclick="removeFromCart('${item.name}')">🗑️</button>
      </div>
    `;
    cartItems.appendChild(li);
  });

  cartTotal.textContent = `$${total}`;
}





checkoutBtn.addEventListener('click', () => {
  // 如果購物車是空的，顯示提示並停止
  if (cart.length === 0) {
    alert('您的購物車目前沒有任何餐點喔!');
    return; // <-- 非常重要，停止後續程式
  }

  // 有商品才會執行下面這行
  alert('已收到您的訂單,馬上幫您製作餐點!');

  // 清空購物車
  cart = [];
  renderCart();

  // 關閉購物車面板
  cartPanel.classList.remove('active');
});