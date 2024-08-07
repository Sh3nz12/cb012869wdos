const prices = {
    "Fresh Milk 500ml": 750,
    "4 Flavours Yogurt": 500,
    "Butter 350g": 650,
    "Shredded Cheese 400g": 1250,
    "Whipped Cream 450ml": 1350,
    "Curd 400g": 550,
    "Yogurt Drink 3 pack": 550,
    "Ice Cream 3 pack": 650,
    "Banana 500g": 650,
    "Green Apple 100g": 550,
    "Red Apple 100g": 420,
    "Oranges 200g": 350,
    "Strawberry 650g": 1250,
    "Grapes 500g": 1375,
    "Carrots 1Kg": 700,
    "Garlic 2Kg": 1350,
    "Mini Corn Cobs": 650,
    "Bell Pepper 500g": 350,
    "Tomatoes 450g": 200,
    "Spinach 100g": 175,
    "Pickle 500g": 750,
    "Lettuce 350g": 400,
    "Red Onion 1Kg": 550,
    "Green Beans 500g": 200,
    "MAC Lipstick": 1500,
    "MAC Eyeliner": 1200,
    "MAC Blush": 900,
    "MAC Blush Set": 1400,
    "Face Wash": 750,
    "Shower Gel": 500,
    "Face Serum": 750,
    "4 Pieces Soap": 1000,
    "Chicken 1kg": 1250,
    "Turkey 1kg": 2550,
    "Beef 1kg": 4200,
    "Pork 1kg": 2500,
    "Lamb Chops 1kg": 2200,
    "Salmon 1kg": 1250,
    "Shrimp 1kg": 1375,
    "Squid 1kg": 2200,
    "Olive Oil 750ml": 750,
    "Black Pepper 500g": 550,
    "Paprika 500g": 400,
    "Baking Powder 200g": 220,
    "Vanilla Extract 60ml": 120,
    "Dry Yeast 100g": 110,
    "Sugar 1kg": 575,
    "Flour 1kg": 750
};
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('select');
    const qualityInputs = document.querySelectorAll('input[id="qualityinput"]');
    const priceInputs = document.querySelectorAll('input[id="currentPriceinput"]');
    const addToCartButtons = document.querySelectorAll('button[id="addtocartbtn"]');
    const clearButtons = document.querySelectorAll('button[id="clearBtn"]');
    const orderSummaryTableBody = document.querySelector('#order-summary tbody');
    const displayTotalBtn = document.getElementById('displayTotalBtn');
    const totalPriceElement = document.getElementById('totalPrice');

    dropdowns.forEach((dropdown, index) => {
        dropdown.addEventListener('change', function() {
            const selectedItem = dropdown.options[dropdown.selectedIndex].text;
            priceInputs[index].value = prices[selectedItem] || 0;
        });
    });
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const selectedItem = dropdowns[index].options[dropdowns[index].selectedIndex].text;
            const quantity = parseInt(qualityInputs[index].value);
            const price = parseFloat(priceInputs[index].value);

            if (selectedItem && quantity > 0 && price > 0) {
                const newRow = document.createElement('tr');

                const productNameCell = document.createElement('td');
                productNameCell.textContent = selectedItem;
                newRow.appendChild(productNameCell);

                const quantityCell = document.createElement('td');
                quantityCell.textContent = quantity;
                newRow.appendChild(quantityCell);

                const priceCell = document.createElement('td');
                priceCell.textContent = (quantity * price).toFixed(2);
                newRow.appendChild(priceCell);

                orderSummaryTableBody.appendChild(newRow);

                dropdowns[index].selectedIndex = 0;
                qualityInputs[index].value = 0;
                priceInputs[index].value = 0;
            }
        });
    });
    clearButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            dropdowns[index].selectedIndex = 0;
            qualityInputs[index].value = 0;
            priceInputs[index].value = 0;
        });
    });
    displayTotalBtn.addEventListener('click', function() {
        let total = 0;
        const rows = orderSummaryTableBody.querySelectorAll('tr');
        rows.forEach(row => {
            const priceCell = row.querySelector('td:nth-child(3)');
            total += parseFloat(priceCell.textContent);
        });
        totalPriceElement.textContent = `Total Price: ${total.toFixed(2)} LKR`;
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const addToFavouritesBtn = document.getElementById('addToFavouritesBtn');
    const applyFavouritesBtn = document.getElementById('applyFavouritesBtn');
    const clearCartBtn = document.getElementById('clearCartBtn');

    addToFavouritesBtn.addEventListener('click', addToFavourites);
    applyFavouritesBtn.addEventListener('click', applyFavourites);
    clearCartBtn.addEventListener('click', clearCart);

    function addToFavourites() {
        const orderSummary = document.getElementById('order-summary').innerHTML;
        localStorage.setItem('favouriteOrder', orderSummary);
        alert('Favourites saved!');
    }

    function applyFavourites() {
        const favouriteOrder = localStorage.getItem('favouriteOrder');
        if (favouriteOrder) {
            document.getElementById('order-summary').innerHTML = favouriteOrder;
            alert('Favourites applied!');
        } else {
            alert('No favourites saved.');
        }
    }

    function clearCart() {
        const orderSummaryTable = document.getElementById('order-summary').querySelector('tbody');
        orderSummaryTable.innerHTML = '';
        document.getElementById('totalPrice').innerText = 'Total Price: 0 LKR';
    }
});
document.getElementById('paynowBtn').addEventListener('click', function() {
    const orderSummary = [];
    const rows = document.querySelectorAll('#order-summary tbody tr');
    rows.forEach(row => {
        const productName = row.cells[0].innerText;
        const quantity = row.cells[1].innerText;
        const price = row.cells[2].innerText;
        orderSummary.push({ productName, quantity, price });
    });

    const totalPrice = document.getElementById('totalPrice').innerText;
    
    localStorage.setItem('orderSummary', JSON.stringify(orderSummary));
    localStorage.setItem('totalPrice', totalPrice);
});
document.addEventListener('DOMContentLoaded', function() {
    const orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || [];
    const totalPrice = localStorage.getItem('totalPrice') || 'Total Price: 0 LKR';

    const tbody = document.querySelector('#order-summary tbody');
    orderSummary.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.productName}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('totalPrice').innerText = totalPrice;
});
