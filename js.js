const searchButton = document.querySelector('.search-button');
const searchInput = document.querySelector('.search-input');
const searchGrid = document.querySelector('#search-grid');

const products = [
    { name: 'Жаңа жылға сыйлықтар', img: 'ee.jpg' },
    { name: 'Декоративті жарықтандыру', img: 'ff.jpg' },
    { name: 'Жаңа жылдық безендіру', img: 'gg.jpg' },
];

searchButton.addEventListener('click', function() {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
       
        searchGrid.innerHTML = '';
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('image-item');
                productElement.innerHTML = `
                    <img src="${product.img}" alt="${product.name}">
                    <button>${product.name}</button>
                `;
                searchGrid.appendChild(productElement);
            });
        } else {
            searchGrid.innerHTML = '<p>Нәтижелер табылмады.</p>';
        }
    } else {
        alert('Іздеу сұрауын енгізіңіз!');
    }
});

const NUMBER_OF_SNOWFLAKES = 300;
const MAX_SNOWFLAKE_SIZE = 5;
const MAX_SNOWFLAKE_SPEED = 2;
const SNOWFLAKE_COLOUR = '#ddd';
const snowflakes = [];

const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.pointerEvents = 'none';
canvas.style.top = '0px';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

const createSnowflake = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.floor(Math.random() * MAX_SNOWFLAKE_SIZE) + 1,
    color: SNOWFLAKE_COLOUR,
    speed: Math.random() * MAX_SNOWFLAKE_SPEED + 1,
    sway: Math.random() - 0.5 // next
});

const drawSnowflake = snowflake => {
    ctx.beginPath();
    ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
    ctx.fillStyle = snowflake.color;
    ctx.fill();
    ctx.closePath();
}

const updateSnowflake = snowflake => {
    snowflake.y += snowflake.speed;
    snowflake.x += snowflake.sway; // next
    if (snowflake.y > canvas.height) {
        Object.assign(snowflake, createSnowflake());
    }
}

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    snowflakes.forEach(snowflake => {
        updateSnowflake(snowflake);
        drawSnowflake(snowflake);
    });

    requestAnimationFrame(animate);
}

for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
    snowflakes.push(createSnowflake());
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.addEventListener('scroll', () => {
    canvas.style.top = `${window.scrollY}px`;
});

// setInterval(animate, 15);
animate()