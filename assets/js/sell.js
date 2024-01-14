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
        
        var removeButton = document.createElement('button');
        removeButton.classList.add('remove-btn');
        removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        removeButton.onclick = function () {
            removeFromCart(item.name); 
            updateCartCount();
        };

        cartProductDiv.appendChild(productInfo);
        cartProductDiv.appendChild(removeButton);

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
        // var removeButton = document.createElement('button');
        // removeButton.classList.add('remove-btn');
        // removeButton.innerText = 'Remove';
        // removeButton.onclick = function () {
        //     removeFromCart(item.name);
        //     updateCartCount();
        //     updateCartDisplay();

        // };

        quantityButtonsDiv.appendChild(decreaseButton);
        cartItemDiv.appendChild(cartProductDiv);
        cartItemDiv.appendChild(quantityButtonsDiv);
        // cartProductDiv.appendChild(removeButton);
        cartContent.appendChild(cartItemDiv);
    });

    cartTotal = cartItems.reduce(function (total, item) {
        return total + item.price * item.quantity;
    }, 0);

    cartTotalElement.innerText = 'Total: ' + cartTotal + ' pesos';

    updateCartCount();
    updateCartDisplay();
}

function removeFromCart(itemName) {
    cartItems = cartItems.filter(function (item) {
        return item.name !== itemName;
    });
    updateCartDisplay();
};

// Hover sound effect script
var hoverSound = new Audio('assets/Sound/button-sound-effect.mp3');
hoverSound.playbackRate = 7;

function playHoverSound() {
    hoverSound.play();
}
