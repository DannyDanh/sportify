// header.js

const header = document.querySelector('header');

// main container
const headerContainer = document.createElement('div');
headerContainer.className = 'header-container';

// left section
const headerLeft = document.createElement('div');
headerLeft.className = 'header-left';

// logo
const headerLogo = document.createElement('img');
headerLogo.src = '/images/logo.png';   // ✅ updated path (move your logo into /public/images/logo.png)
headerLogo.alt = 'App Logo';

//app heading
const headerTitle = document.createElement('h1');
headerTitle.className = 'app-heading';
headerTitle.textContent = 'Sportify'; 

// assemble
headerLeft.appendChild(headerLogo);
headerLeft.appendChild(headerTitle);
headerContainer.appendChild(headerLeft);

// you can add a right section later if needed
// const headerRight = document.createElement('div');
// headerRight.className = 'header-right';
// headerContainer.appendChild(headerRight);

header.appendChild(headerContainer);
