let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add('active');
}

closeCart.onclick = () => {
    cart.classList.remove('active');
}

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    document.getElementsByClassName('btn-buy')[0].addEventListener("click", buyButtonClicked);

    var buyButton2 = document.querySelector(".PayButton");
    buyButton2.onclick = BuyButton2;
}

function buyButtonClicked() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('You already have this item in your cart');
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bx bxs-trash-alt cart-remove"></i>
    `;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change", quantityChanged);
}

function updateTotal() {
    var total = 0;
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.textContent.replace("€", ""));
        var quantity = quantityElement.value;

        total += price * quantity;

        total = total + (price * quantity);
        var quantity = parseFloat(quantityElement.value);

            total = total + (price * quantity);
        

    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "€" + total;
}



var buyButton2 = document.querySelector(".submit-button-lock");

buyButton2.onclick = BuyButton2;


function BuyButton2() {
    setTimeout(() => {
        alert("Your order is placed");
        window.location.href = "catalog.html";
    }, 5000);
}

$(function () {
    $('[data-toggle="popover"]').popover();
    
    $('#cvc').on('click', function() {
        if ($('.cvc-preview-container').hasClass('hide')) {
            $('.cvc-preview-container').removeClass('hide');
        } else {
            $('.cvc-preview-container').addClass('hide');
        }    
    });
    
    $('.cvc-preview-container').on('click', function() {
        $(this).addClass('hide');
    });
});
function valideFormLogin(event) {
    var password = document.getElementById("passwordLogin").value;
    var username = document.getElementById("usernameLogin").value;

    var storedData = localStorage.getItem("userData");
    if (storedData) {
      var existingUserData = JSON.parse(storedData);
      if (existingUserData.username !== username) {
        alert("Non è stato registrato un account con questo username. Se non hai effettuato il login, premi nel link in basso");
        return;
      }
    }
  
    var userData = JSON.parse(storedData);
  
    if (userData.username !== username || userData.password !== password) 
    {
      alert("Username o password non corretti.");
      return;
    }

    window.location.href = "index.html";
  }
  
  function valideFormSignup(event) {
    var password = document.getElementById("passwordSignup").value;
    var confirmPassword = document.getElementById("passwordSignup2").value;
    var username = document.getElementById("usernameSignup").value;

    var storedData = localStorage.getItem("userData");

    if (password !== confirmPassword) {
      alert("Le password non corrispondono.");
      return;
    }

    if (storedData) {
      var existingUserData = JSON.parse(storedData);
      if (existingUserData.username === username) {
        alert("Un account è già registrato con questo username. Per favore, fai il login.");
        return;
      }
    }

    var userData = {
      password: password,
      username: username,
    };
  
    var jsonData = JSON.stringify(userData);
    localStorage.setItem("userData", jsonData);
    window.location.href = "index.html";
  }
  
  function checkForm(event, formType) {
    event.preventDefault(); 
  
    if (formType === "login") {
      valideFormLogin();
    } else if (formType === "signup") {
      valideFormSignup();
    } else {
      alert("Tipo di form non valido.");
    }
  }
