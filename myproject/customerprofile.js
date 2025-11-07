async function updateOrderCount() {
  try {
    const response = await fetch('http://localhost:8080/api/orders/count');
    const count = await response.json();
    document.getElementById('orderCount').textContent = count;
  } catch(error) {
    console.error('Error fetching order count:', error);
    document.getElementById('orderCount').textContent = 'Error';
  }
}
window.onload = updateOrderCount;