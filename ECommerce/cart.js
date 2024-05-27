let cartproduct = JSON.parse(localStorage.getItem('cartproduct')) || []
updateCART();
function updateCART() {
    cartproduct.forEach(function (el) {
        let result = document.getElementById('result');
        result.style.margin = "2rem"
        result.style.display = 'grid'
        result.style.gridTemplateColumns = 'repeat(4,1fr)'
        result.style.gap = '2rem'
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
        name.textContent = "product name: " + el[0].name;
        name.style.padding = "0px"
        name.style.margin = "0px"
        let price = document.createElement('h1');
        price.textContent = "price: " + parseInt(el[0].price) + "/-";
        price.style.padding = "0px"
        price.style.margin = "0px"
        let img = document.createElement('img');
        img.setAttribute('src', el[0].img);
        img.style.width = "100px"
        img.style.height = "100px"
        img.style.margin = "0 auto"
        let count = document.createElement('span')
        count.textContent = el[1];
        let increase = document.createElement('button')
        increase.textContent = '+';
        increase.addEventListener('click', function () {
            el[1]++;
            localStorage.setItem('cartproduct', JSON.stringify(cartproduct))
            // window.location.reload();
            count.textContent++;
            updatetotal();
        })
        let decrease = document.createElement('button')
        decrease.textContent = '-';
        decrease.addEventListener('click', function () {
            if (count.textContent > 1) {
                el[1]--;
                localStorage.setItem('cartproduct', JSON.stringify(cartproduct))
                // window.location.reload();
                count.textContent--;
                updatetotal();
            }
        })
        let countwrap = document.createElement('div')
        countwrap.style.display = 'flex'
        countwrap.style.width = '100%'
        countwrap.style.height = '50%'
        countwrap.style.justifyContent = 'space-between'
        countwrap.style.alignItems = 'center'
        countwrap.append(increase, count, decrease);
        let remove = document.createElement('button')
        remove.textContent = 'remove item'
        remove.style.borderRadius = "5px"
        remove.style.fontWeight = "800"
        remove.addEventListener('mouseover', function () {
            remove.style.color = "white"
            remove.style.backgroundColor = "red"
        })
        remove.addEventListener('mouseout', function () {
            remove.style.backgroundColor = "white"
            remove.style.color = "black"
        })
        remove.addEventListener('click', function () {
            // Remove the item from the DOM
            card.remove();
            // Remove the item from the cartproduct array
            // returning all except current element
            cartproduct = cartproduct.filter(item => item[0].name !== el[0].name);
            console.log(cartproduct)
            // Update the local storage
            localStorage.setItem('cartproduct', JSON.stringify(cartproduct));
            updatetotal();
        })
        let totalcount = document.createElement('h3')
        totalcount.style.margin = "0px"
        totalcount.style.padding = "0px"
        let totalamount = document.querySelector('#totalamount')
        updatetotal();
        function updatetotal() {
            totalcount.textContent = "total: " + count.textContent * el[0].price + "/-";

            let totalAmount = 0;

            cartproduct.forEach(function (item) {
                let price = parseInt(item[0].price); // Convert price to integer
                let quantity = item[1]; // Get quantity
                totalAmount += price * quantity; // Calculate total amount
            });
            totalamount.textContent = "total amount: " + totalAmount + "/-";
        }

        card.append(name, price, img, countwrap, remove, totalcount);
        result.append(card);
    })
}

let sort = document.querySelector('#sort');
sort.addEventListener('change', function (event) {
    let selectedsort = event.target.value;

    JSON.parse(localStorage.getItem('cartproduct'))
    if (selectedsort === 'asc') {
        // sort- it sorting the products on price base to the original array or not returning new array 
        cartproduct.sort(function (a, b) {
            return a[0].price - b[0].price;
        })
        updateCART(cartproduct);
        localStorage.setItem('cartproduct', JSON.stringify(cartproduct))
    }
    else if (selectedsort === 'des') {
        cartproduct.sort(function (a, b) {
            return b[0].price - a[0].price;
        })
        updateCART(cartproduct);
        localStorage.setItem('cartproduct', JSON.stringify(cartproduct))
    }

})