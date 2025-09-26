/* temples.js */
(function () {
  // Populate dynamic year & last modified
 // Get current year dynamically
const yearSpan = document.getElementById("currentyear");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

  const lastEl = document.getElementById('lastModified');
  if (lastEl) lastEl.textContent = `Last Modification: ${document.lastModified}`;

  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function (e) {
      const isOpen = nav.classList.toggle('show');
      hamburger.setAttribute('aria-expanded', String(isOpen));
      hamburger.textContent = isOpen ? '✕' : '☰';
      hamburger.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });

    // Close on outside click for small screens
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('show')) return;
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-label', 'Open navigation');
      }
    });

    // Close menu when resizing to large screens
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 800 && nav.classList.contains('show')) {
        nav.classList.remove('show');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.textContent = '☰';
      }
    });
  }
})();

 // Temple data
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  // ✅ Add 3 new temples
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
    {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Accra Ghana",
    location: "Accra, Ghana",
    dedicated: "2004, January, 11",
    area: 17500,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
  }
];

// DOM references
const gallery = document.querySelector(".gallery");
const navLinks = document.querySelectorAll("#site-nav a");

// Function to render temple cards
function renderTemples(templesArray) {
  gallery.innerHTML = ""; // Clear old content

  templesArray.forEach(temple => {
    const card = document.createElement("figure");
    card.classList.add("temple-card");

    card.innerHTML = `
      <img src="${temple.imageUrl}" alt="${temple.templeName}" loading="lazy">
      <figcaption>
        <h3>${temple.templeName}</h3>
        <p><strong>Location:</strong> ${temple.location}</p>
        <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
        <p><strong>Area:</strong> ${temple.area.toLocaleString()} sq ft</p>
      </figcaption>
    `;

    gallery.appendChild(card);
  });
}

// Filter handlers
function filterTemples(criteria) {
  let filtered = [];

  switch (criteria) {
    case "old":
      filtered = temples.filter(t => parseInt(t.dedicated) < 1900);
      break;
    case "new":
      filtered = temples.filter(t => parseInt(t.dedicated) > 2000);
      break;
    case "large":
      filtered = temples.filter(t => t.area > 90000);
      break;
    case "small":
      filtered = temples.filter(t => t.area < 10000);
      break;
    default:
      filtered = temples; // home
  }

  renderTemples(filtered);
}

// Setup nav link listeners
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const id = link.getAttribute("href").replace("#", "");
    filterTemples(id);
  });
});

// Initial render
renderTemples(temples);