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

    let cartCount = 0;

    function updateCartCount() {
        const cartCountElement = $("#cart-count");

        if (cartCount === 0) {
            cartCountElement.text('⁰');
        } else {
            const countString = cartCount.toString().split('').map(digit => {
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
document.addEventListener('DOMContentLoaded', function () {
    function addToCart(itemName, itemPrice, itemImage) {
        var cartContent = document.getElementById('cartContent');
        var cartContainer = document.getElementById('sidemenu');
        var totalElement = document.getElementById('cartTotal');

        var existingCartItem = findCartItem(itemName);

        if (existingCartItem) {
            updateCartItem(existingCartItem, itemPrice);
        } else {
            var cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            var cartProduct = document.createElement('div');
            cartProduct.classList.add('cart-product');

            var productImage = document.createElement('img');
            productImage.src = itemImage;
            cartProduct.appendChild(productImage);

            cartProduct.innerHTML += `<p>${itemName} - <i class="fa-solid fa-peso-sign"></i>${itemPrice}</p>`;

            var cartQuantity = document.createElement('span');
            cartQuantity.classList.add('cart-quantity');
            cartQuantity.innerText = '1';
            cartProduct.appendChild(cartQuantity);

            cartItem.appendChild(cartProduct);
            cartContent.appendChild(cartItem);
        }

        cartTotal += itemPrice;
        totalElement.innerText = 'Total: ' + cartTotal + ' pesos';

        cartContainer.style.display = 'block';
        void cartContainer.offsetWidth;
        cartContainer.style.opacity = 1;

        setTimeout(function () {
            cartContainer.style.opacity = 0;
            setTimeout(function () {
                cartContainer.style.display = 'none';
            }, 500);
        }, 3000);
    }

    function findCartItem(itemName) {
        var cartItems = document.querySelectorAll('.cart-item');

        for (var i = 0; i < cartItems.length; i++) {
            var productElement = cartItems[i].querySelector('.cart-product p');
            if (productElement && productElement.innerText.includes(itemName)) {
                return cartItems[i];
            }
        }

        return null;
    }

    function updateCartItem(cartItem, itemPrice) {
        var quantityElement = cartItem.querySelector('.cart-quantity');
        if (quantityElement) {
            var currentQuantity = parseInt(quantityElement.innerText);
            quantityElement.innerText = (currentQuantity + 1).toString();
        }

        cartTotal += itemPrice;
        document.getElementById('cartTotal').innerText = 'Total: ' + cartTotal + ' pesos';
    }
});

// Hover sound effect script
var hoverSound = new Audio('assets/Sound/button-sound-effect.mp3');
hoverSound.playbackRate = 7;

function playHoverSound() {
    hoverSound.play();
}
