console.log("home.js loaded");
import {
    db,
    collection,
    getDocs
} from "../firebase.js";

let salons = [];
let currentSalon = null;

async function loadSalons() {

    console.log("Loading salons from Firestore...");

    const querySnapshot = await getDocs(collection(db, "salons"));

    console.log("Firestore response:", querySnapshot);

    salons = [];

    querySnapshot.forEach(doc => {

        console.log("Salon:", doc.data());

        salons.push({
            id: doc.id,
            ...doc.data()
        });

    });

    renderSalons();
}

function renderSalons() {

    const salonsGrid = document.getElementById('salonsGrid');

    salonsGrid.innerHTML = salons.map(salon => `

        <div class="salon-card">

            <div class="salon-image-wrapper">
                <img src="${salon.image}" alt="${salon.name}">
                <div class="salon-badge">Premium</div>
            </div>

            <div class="salon-content">

                <h3 class="salon-name">${salon.name}</h3>

                <div class="salon-location">📍 ${salon.location}</div>

                <p class="salon-description">${salon.description}</p>

                <div class="salon-services">
                    ${salon.services.map(service =>
        `<span class="service-tag">${service}</span>`
    ).join("")}
                </div>

                <div class="salon-footer">

                    <div class="salon-rating">
                        <span class="stars">★★★★★</span>
                        <span class="review-count">
                        ${salon.reviews || 0} reviews
                        </span>
                    </div>

                    <button 
                        class="salon-book-btn"
                        onclick="openBookingModal('${salon.id}', '${salon.name}')">
                        Book
                    </button>

                </div>

            </div>

        </div>

    `).join("");

}

window.openBookingModal = function(salonId, salonName) {

    currentSalon = salons.find(s => s.id === salonId);

    document.getElementById('selectedSalon').textContent = salonName;

    document.getElementById('bookingModal').classList.add('show');

    document.body.style.overflow = 'hidden';

}

function closeModal() {

    document.getElementById('bookingModal').classList.remove('show');

    document.body.style.overflow = 'auto';

    document.querySelector('.booking-form').reset();

}

function submitBooking(event) {

    event.preventDefault();

    closeModal();

    showSuccessMessage();

}

function showSuccessMessage() {

    const successMsg = document.getElementById('successMessage');

    successMsg.classList.add('show');

    setTimeout(() => {
        successMsg.classList.remove('show');
    }, 5000);

}

window.onclick = function(event) {

    const modal = document.getElementById('bookingModal');

    if (event.target === modal) {
        closeModal();
    }

}

loadSalons();