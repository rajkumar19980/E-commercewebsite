let username = document.querySelector('div>h1>span')
// fetching signup data page values in another page
username.textContent = localStorage.getItem('name')
username.style.color = 'red'


let addnewproduct = JSON.parse(localStorage.getItem('product')) || []
// console.log(addnewproduct)
let form = document.getElementById('form')
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let newproduct =
    {
        name: form.name.value,
        brand: form.brand.value,
        category: form.category.value,
        price: form.price.value,
        img: form.img.value
    }
    if (newproduct.brand == "All" || newproduct.category == "All" || newproduct.name == "" || newproduct.price == "" || newproduct.img == "") {
        alert("fill all the inputs!")
    }
    else {
        if (addnewproduct.some(item => item.img === newproduct.img)) {
            alert("product already in the cart!")
            return;
        }
        else {
            addnewproduct.push(newproduct)
            localStorage.setItem('product', JSON.stringify(addnewproduct))
            PrintDOM(addnewproduct);
            alert("added succesfully!")
            form.reset();
        }
    }
})

function PrintDOM(products) {
    let result = document.getElementById('result');
    result.innerHTML = '';
    result.style.margin = "2rem auto"
    products.forEach(function (el) {
        let card = document.createElement('div');
        card.style.display = "grid";
        card.style.padding = "1rem"
        card.style.gridTemplateColumns = "repeat(1,1fr)";
        card.style.gap = "1rem";
        card.style.height = "100%"
        card.style.backgroundColor = "white"
        card.style.borderRadius = "5px"
        card.style.boxShadow = "0px 0px 20px black"
        let name = document.createElement('h2');
        name.textContent = el.name;
        name.style.padding = "0px"
        name.style.margin = "0px"
        let brand = document.createElement('h2')
        brand.textContent = "brand: " + el.brand;
        brand.style.margin = '0px'
        brand.style.padding = '0px'
        let price = document.createElement('h1');
        price.textContent = "price: " + el.price + "/-";
        price.style.padding = "0px"
        price.style.margin = "0px"
        let img = document.createElement('img');
        img.setAttribute('src', el.img);
        img.style.width = "100px"
        img.style.height = "100px"
        img.style.margin = "0 auto"
        let add = document.createElement('button');
        add.textContent = 'add to cart';
        add.style.color = "black"
        add.style.fontWeight = "800"
        add.style.borderRadius = "10px"
        add.addEventListener('mouseover', function () {
            add.style.backgroundColor = 'blue'
            add.style.color = "white"
        })
        add.addEventListener('mouseout', function () {
            add.style.backgroundColor = 'white'
            add.style.color = "black"
        })
        add.addEventListener('click', function () {
            let cartproduct = JSON.parse(localStorage.getItem('cartproduct')) || []
            // Check if the product is already in the cart
            let foundIndex = cartproduct.findIndex(item => item[0].name === el.name);
            if (foundIndex !== -1) {
                alert("already added!");
            } else {
                // If not found, add the product to the cart with a quantity of 1
                cartproduct.push([el, 1]); //[product, quantity] directly into an array
                localStorage.setItem('cartproduct', JSON.stringify(cartproduct));
                alert("Added to cart successfully!");
            }
        });

        card.append(name, brand, price, img, add);
        result.append(card);
    });
}
PrintDOM(addnewproduct);

let selectbrand = document.getElementById('selectbrand')
selectbrand.addEventListener('change', function (event) {
    let selectedbrand = event.target.value;
    let storebrand = JSON.parse(localStorage.getItem('storedbrand')) || []
    storebrand = addnewproduct.filter(function (el) {
        return selectedbrand === el.brand;
    })
    localStorage.setItem('storedbrand', JSON.stringify(storebrand))
    PrintDOM(storebrand)
})
let selectcategory = document.getElementById('selectcategory')
selectcategory.addEventListener('change', function (event) {
    let selectedcategory = event.target.value;
    let storecategory = JSON.parse(localStorage.getItem('storedcategory')) || []
    storecategory = addnewproduct.filter(function (el) {
        return selectedcategory === el.category;
    })
    localStorage.setItem('storedcategory', JSON.stringify(storecategory))
    PrintDOM(storecategory)
})
let logout = document.getElementById('logout')
logout.addEventListener('click', function () {
    alert("logout succesfully!")
    window.location.assign('./index.html')
})

let gotocart = document.getElementById('gotocart')
gotocart.addEventListener('click', function () {
    window.location.assign('./cart.html')
})



