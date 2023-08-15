const product = {
    'nike-air': {
        name: 'Nike-Air',
        price: 1800000,
        img: './img/cart-1.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    'air-jordan': {
        name: 'Air-Jordan',
        price: 1990000,
        img: './img/cart-2.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    'nike-netro': {
        name: 'Nike-Netro',
        price: 1350000,
        img: './img/cart-3.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
    'air-spain': {
        name: 'Air-Spain',
        price: 1850000,
        img: './img/cart-4.png',
        amount: 0,
        get totalSum() {
            return this.price * this.amount
        }
    },
}


const cartBtn = document.querySelector('.header-nav__cart');
const cartCount = document.querySelector('.header-nav__cart-span');
const sidebar = document.querySelector('.sidebar');
const sidebarClose = document.querySelector('.sidebar-header__icon');
const sidebarPrice = document.querySelector('.sidebar-footer__price');
const sidebarMain = document.querySelector('.sidebar-main');
const sidebarBtn = document.querySelector('.sidebar-footer__title');
const productBtn = document.querySelectorAll('.product-card__btn');
const printBody = document.querySelector('.print__body');
const printFooter = document.querySelector('.print__footer');


cartBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('active')) {
        sidebar.classList.remove('active')
    } else {
        sidebar.classList.add('active')
    }
})

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('active')
})


productBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        plusOrMines(btn)
    })
})

function plusOrMines(btn) {
    let parrent = btn.closest('.product-card')
    let parrentID = parrent.getAttribute('id')
    product[parrentID].amount++
    basket()
}

function basket() {
    const productArr = []
    for (const key in product) {
        let prKey = product[key]
        let prCard = document.querySelector(`#${key}`)
        let prIndecator = prCard.querySelector('.product-card__count')
        if (prKey.amount) {
            productArr.push(prKey);
            prIndecator.classList.add('active')
            prIndecator.innerHTML = prKey.amount
        } else {
            prIndecator.classList.remove('active')
            prIndecator.innerHTML = '';
        }
    }
    const allCount = totalCountProduct()
    if (allCount) {
        cartCount.classList.add('active')
    } else {
        cartCount.classList.remove('active')
    }
    cartCount.innerHTML = allCount.toLocaleString()
    sidebarPrice.innerHTML = totalPriceProduct()

    sidebarMain.innerHTML = '';
    for (let i = 0; i < productArr.length; i++) {
        sidebarMain.innerHTML += cardItemProduct(productArr[i])
    }
}


function cardItemProduct(productArr) {
    const { name, totalSum, price, amount, img } = productArr
    return `
                <div class="sidebar-main__cart">
                    <div class="sidebar-main__cart-info">
                        <img src="${img}" alt="" class="sidebar-main__img">
                        <div class="sidebar-main__text">
                            <h3 class="sidebar-main__text-title">${name}</h3>
                            <p class="sidebar-main__text-sub">
                                ${totalSum.toLocaleString()} <span> сум</span>
                            </p>
                        </div>
                    </div>
                    <div class="plus-or-mines" id="${name.toLowerCase()}_card">
                        <button class="plus-or-mines__symb" data-symbol="-">
                            -
                        </button>
                        <span class="plus-or-mines__text">${amount}</span>
                        <button class="plus-or-mines__symb" data-symbol="+">
                            +
                        </button>
                    </div>
                </div>
    `
}

function totalCountProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].amount != 0 ? 1 : 0
    }
    return total
}

function totalPriceProduct() {
    let total = 0
    for (const key in product) {
        total += product[key].totalSum
    }
    return total.toLocaleString()
}

window.addEventListener('click', (e) => {
    const btn = e.target
    if (btn.classList.contains('plus-or-mines__symb')) {
        const attr = btn.getAttribute('data-symbol')
        const parrent = btn.closest('.plus-or-mines')
        if (parrent) {
            const idParrent = parrent.getAttribute('id').split('_')[0]
            if (attr == '-') product[idParrent].amount--
            else if (attr == '+') product[idParrent].amount++
            basket()
        }
    } else {
        console.error('Topolmadim');
    }
})


sidebarBtn.addEventListener('click', () => {
    printBody.innerHTML = ''
    for (const key in product) {
        const { name, totalSum, amount } = product[key]
        if (amount) {
            printBody.innerHTML += `
            <div class="print__body-item">
                <p class="print__body-item_name">
                    <span class="name">${name}</span>
                    <span class="count">${amount} шт: </span>
                </p>
                <p class="print__body-item_summ">${totalSum} сум</p>
            </div>
                `
        }
    }
    printFooter.innerHTML = `${totalPriceProduct()} сум`
    window.print()
    location.reload()
})