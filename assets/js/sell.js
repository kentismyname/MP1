// Your add to cart animation script
$(document).ready(function () {
    $(".add-to-cart-btn").click(function () {
        var buttonPosition = $(this).offset();
        var animatedElement = $("<div><i class='fas fa-cart-shopping'></i></div>").css({
            position: "absolute",
            top: buttonPosition.top + "px",
            left: buttonPosition.left + "px",
            fontSize: "45px",
            color: "#176B87",
            zIndex: 100
        });

        $("body").append(animatedElement);

        animatedElement.animate({
            top: $("#cart-icon").offset().top + "px",
            left: $("#cart-icon").offset().left + "px",
            fontSize: "14px"
        }, 1500, function () {
            $(this).remove();
            addToCart();
        });
    });
    let cartItems = [];
    let cartCount = 0;

    function updateCartCount() {
        const cartCountElement = $("#cart-count");
        const cartItemCount = $(".cart-item").length;

        if (cartItemCount === 0) {
            cartCountElement.text('⁰');
        } else {
            const countString = cartItemCount.toString().split('').map(digit => {
                return '⁰¹²³⁴⁵⁶⁷⁸⁹'[digit];
            }).join('');
            cartCountElement.text(countString);
        }
    }

    function addToCart() {
        cartCount++;
        updateCartCount();
    }
});

// Categories script
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
};

// Header fade effect script
document.addEventListener('DOMContentLoaded', function () {
    var header = document.getElementById('main-header');

    window.onscroll = function () {
        var scrollPos = document.documentElement.scrollTop || document.body.scrollTop;
        var opacity = 1 - (scrollPos / 150);

        header.style.opacity = opacity;

        if (opacity <= 0) {
            header.style.display = 'none';
        } else {
            header.style.display = 'block';
        }
    };
});



// Add to cart script
var cartItems = [];
var cartTotal = 0;

function addToCart(itemName, itemPrice, itemImage) {
    var existingItem = cartItems.find(function (item) {
        return item.name === itemName;
    });

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({
            name: itemName,
            price: itemPrice,
            image: itemImage,
            quantity: 1
        });
    }
    

    updateCartDisplay();
}

function updateCartDisplay() {
    var cartContent = document.getElementById('cartContent');
    var cartTotalElement = document.getElementById('cartTotal');

    cartContent.innerHTML = '';

    cartItems.forEach(function (item) {
        var cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');

        var cartProductDiv = document.createElement('div');
        cartProductDiv.classList.add('cart-product');

        var productImage = document.createElement('img');
        productImage.src = item.image;
        cartProductDiv.appendChild(productImage);

        var productInfo = document.createElement('p');
        productInfo.innerHTML = `${item.name} - <i class="fa-solid fa-peso-sign"></i>${item.price} x ${item.quantity} = ${item.price * item.quantity} `;
        
        

        cartProductDiv.appendChild(productInfo);

        var quantityButtonsDiv = document.createElement('div');
        quantityButtonsDiv.classList.add('quantity-buttons');

        var increaseButton = document.createElement('button');
        increaseButton.classList.add('quantity-btn');
        increaseButton.innerHTML = '<i class="fa-solid fa-plus fa-beat"></i>';
        increaseButton.onclick = function () {
            item.quantity += 1;
            updateCartDisplay();
        };
        quantityButtonsDiv.appendChild(increaseButton);

        var decreaseButton = document.createElement('button');
        decreaseButton.classList.add('quantity-btn');
        decreaseButton.innerHTML = '<i class="fa-solid fa-minus"></i>';
        decreaseButton.onclick = function () {
            if (item.quantity > 1) {
                item.quantity -= 1;
                updateCartDisplay();
            }
        };
        quantityButtonsDiv.appendChild(decreaseButton);

        var removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        removeButton.onclick = function () {
            removeFromCart(item.name); 
            updateCartCount();
        };
        quantityButtonsDiv.appendChild(removeButton);
        cartItemDiv.appendChild(cartProductDiv);
        cartItemDiv.appendChild(quantityButtonsDiv);
        // cartProductDiv.appendChild(removeButton);
        cartContent.appendChild(cartItemDiv);
    });

    cartTotal = cartItems.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);

    cartTotalElement.innerHTML = 'Total: <i class="fa-solid fa-peso-sign"></i>' + cartTotal;

    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(itemName) {
    cartItems = cartItems.filter(function (item) {
        return item.name !== itemName;
    });
    updateCartDisplay();
};
function proceedToPayment() {
    var modal = document.getElementById('paymentModal');
    modal.style.display = 'block';

    // Optionally, you can update the total cost in the modal
    document.getElementById('totalCost').innerText = 'Total Cost: ' + cartTotal;
    document.getElementById('change').innerText = '';
}

// Your existing functions
function processPayment() {
    // Get form values
    var customerName = document.getElementById('customerName').value;
    var loyaltyCardNumber = document.getElementById('loyaltyCardNumber').value;
    var totalPayment = parseFloat(document.getElementById('totalPayment').value);

    // Validate total payment
    if (isNaN(totalPayment) || totalPayment < cartTotal) {
        alert("Invalid total payment. Please enter a valid amount.");
        return;
    }

    // Calculate change
    var change = totalPayment - cartTotal;
    

    // Update modal content
    document.getElementById('totalCost').innerText = 'Total Cost: ' + cartTotal;

    // Optionally, you can perform additional processing or submit the form data to a server here

    // Generate receipt content
    var receiptContent = generateReceipt(customerName, loyaltyCardNumber, cartTotal, totalPayment, change);

    // Display the receipt in a new window or modal
    showReceipt(receiptContent);

    // Close payment modal
    closePaymentModal();
}

function showReceipt(content) {
    // You can choose how to display the receipt, e.g., in a new window or a modal
    // For simplicity, let's open a new window
    var receiptWindow = window.open('', '_blank');
    receiptWindow.document.write(content);
    receiptWindow.document.close();
}


function closePaymentModal() {
    var modal = document.getElementById('paymentModal');
    modal.style.display = 'none';
}

function generateReceipt(customerName, loyaltyCardNumber, totalCost, totalPayment, change) {
    // Generate a unique transaction ID for the QR code (replace this with your actual logic)
    var transactionId = generateUniqueTransactionId();

    var receiptContent = `
        <div style="border: 2px solid #000; border-radius: 10px; padding: 20px; max-width: 400px; margin: 0 auto; background-color: #fff; color: #000; text-align: left; font-family: 'Arial', sans-serif;">
        <div style="margin-top: 20px; text-align: center;">
            <img src="kenneth-logo.png" alt="LOGO" style="max-width: 30%;">
        </div>
            <h2 style="color: #000; font-size: 26px; margin-bottom: 15px; font-weight: bold; text-align: center;">Kenneth's Moto Parts Shop and Services</h2>
            <p style="margin-bottom: 8px;"><strong>Customer Name:</strong> ${customerName}</p>
            <p style="margin-bottom: 8px;"><strong>Loyalty Card Number:</strong> ${loyaltyCardNumber}</p>
            <p style="margin-bottom: 8px;"><strong>Total Cost:</strong> <span style="color: #000; font-weight: bold;">${totalCost}</span></p>
            <p style="margin-bottom: 8px;"><strong>Total Payment:</strong> <span style="color: #000; font-weight: bold;">${totalPayment}</span></p>
            <p style="margin-bottom: 15px;"><strong>Change:</strong> <span style="color: #000; font-weight: bold;">${change}</span></p>
            <h4 style="margin-top: 15px; color: #000; font-size: 20px; font-weight: bold; text-align: center;">Products</h4>
    `;

    // Include details of each item in the receipt under the "Products" section
    cartItems.forEach(function (item) {
        receiptContent += `
            <p style="color: #000; margin-bottom: 8px;">${item.name} - ${item.quantity} = ${item.price * item.quantity}</p>
        `;
    });

    receiptContent += `
            <hr style="border: 1px dashed #000; margin: 20px 0;">
            <p style="font-size: 16px; color: #000; text-align: center;">Thank you for your purchase! We appreciate your trust in Kenneth's Moto Parts Shop and Services. Please come again!</p>
            <div style="margin-top: 20px; text-align: center;">
                <!-- Placeholder for QR code image, replace 'QR_CODE_URL' with your actual QR code URL -->
                <img src="assets/img/QRcode.png" alt="Receipt QR Code" style="max-width: 30%;">
            </div>
            <p style="font-size: 14px; color: #000; margin-top: 10px; text-align: center;">Scan the QR code for receipt confirmation.</p>
        </div>
    `;

    return receiptContent;
}







// Replace this function with your actual logic to generate a unique transaction ID for the QR code
function generateUniqueTransactionId() {
    // Implement your logic to generate a unique transaction ID
    // For simplicity, you can use a timestamp or any other unique identifier
    return Date.now().toString();
}



// Hover sound effect script
var hoverSound = new Audio('assets/Sound/button-sound-effect.mp3');
hoverSound.playbackRate = 7;

function playHoverSound() {
    hoverSound.play();
}
