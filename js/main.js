const pinterestBoards = [
  { name: 'Cute Gadgets', boardId: 'YOUR_BOARD_ID_1' },
  { name: 'Home Decor', boardId: 'YOUR_BOARD_ID_2' }
];

async function fetchPinterestPins(boardId) {
  // Use Pinterest API or RSS feed to fetch pins
  const response = await fetch(`https://api.pinterest.com/v1/boards/${boardId}/pins/`);
  const data = await response.json();
  return data.pins; // adjust based on API response
}

async function loadProducts() {
  const grid = document.getElementById('productGrid');
  for (let board of pinterestBoards) {
    const pins = await fetchPinterestPins(board.boardId);
    pins.forEach(pin => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${pin.image}" alt="${pin.title}">
        <h3>${pin.title}</h3>
        <p>${pin.price || ''}</p>
      `;
      card.onclick = () => {
        window.location.href = `product.html?pin=${pin.id}`;
      };
      grid.appendChild(card);
    });
  }
}

loadProducts();
