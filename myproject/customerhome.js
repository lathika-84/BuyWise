const addProductBtn = document.getElementById('addProductBtn');
const productContainer = document.getElementById('productContainer');
const searchBar = document.getElementById('searchBar');

let products = [];

// Function to render all products
function renderProducts(filter = "") {
  filter= filter || "";
  productContainer.innerHTML = "";
  products
    .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(p => {
      const div = document.createElement('div');
      div.className = "product";
      div.textContent = p.name;
      productContainer.appendChild(div);
    });
}

// Add product dynamically
addProductBtn.addEventListener('click', () => {
  const newProduct = {name: `Product${products.length+1}`};
  products.push(newProduct);
  renderProducts(searchBar.value);
});

// Search functionality
searchBar.addEventListener('input', e => {
  renderProducts(e.target.value);
});

// Initial sample products
for (let i = 1; i <= 6; i++) {
  products.push({ name: `Product${i}`});
}
renderProducts();