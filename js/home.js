const salons = [
    {
        id: 1,
        name: "Elegance Hair Studio",
        location: "Downtown",
        rating: 4.8,
        reviews: 245,
        image: "✨",
        description: "Premium hair care and styling services",
        services: ["Haircut", "Coloring", "Extensions"]
    },
    {
        id: 2,
        name: "Spa Luxe",
        location: "Midtown",
        rating: 4.9,
        reviews: 312,
        image: "🧖",
        description: "Luxury spa and facial treatments",
        services: ["Facials", "Massage", "Body Treatments"]
    },
    {
        id: 3,
        name: "Nails & Beauty",
        location: "Westside",
        rating: 4.7,
        reviews: 189,
        image: "💅",
        description: "Nail art and beauty services",
        services: ["Manicure", "Pedicure", "Nail Art"]
    },
    {
        id: 4,
        name: "Serenity Wellness Center",
        location: "Eastside",
        rating: 4.9,
        reviews: 276,
        image: "🌿",
        description: "Holistic wellness and beauty treatments",
        services: ["Massage", "Skincare", "Wellness"]
    },
    {
        id: 5,
        name: "Modern Cuts Barber",
        location: "Central Plaza",
        rating: 4.6,
        reviews: 198,
        image: "💈",
        description: "Contemporary barbering and grooming",
        services: ["Haircut", "Beard Trim", "Styling"]
    },
    {
        id: 6,
        name: "Golden Hour Beauty",
        location: "North District",
        rating: 4.8,
        reviews: 234,
        image: "👑",
        description: "Full beauty and aesthetic services",
        services: ["Makeup", "Skincare", "Hair"]
    }
];

let currentSalon = null;

// Render salons
function renderSalons() {
    const salonsGrid = document.getElementById('salonsGrid');
    salonsGrid.innerHTML = salons.map(salon => `
                <div class="salon-card">
                    <div class="salon-image">${salon.image}</div>
                    <div class="salon-content">
                        <h3 class="salon-name">${salon.name}</h3>
                        <div class="salon-meta">
                            <span>📍 ${salon.location}</span>
                            <span>⭐ ${salon.rating}</span>
                        </div>
                        <p class="salon-description">${salon.description}</p>
                        <div class="salon-services">
                            ${salon.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                        </div>
                        <div class="salon-footer">
                            <div class="salon-rating">
                                <span class="stars">★★★★★</span>
                                <span style="color: var(--text-light); font-size: 0.85rem;">${salon.reviews} reviews</span>
                            </div>
                            <button class="salon-action" onclick="openBookingModal(${salon.id}, '${salon.name}')">Book Now</button>
                        </div>
                    </div>
                </div>
            `).join('');
}

// Modal functions
function openBookingModal(salonId, salonName) {
    currentSalon = salons.find(s => s.id === salonId);
    document.getElementById('selectedSalon').textContent = salonName;
    document.getElementById('selectedService').textContent = currentSalon.services[0];
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

    const formData = {
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        phone: document.getElementById('clientPhone').value,
        date: document.getElementById('appointmentDate').value,
        time: document.getElementById('appointmentTime').value,
        service: document.getElementById('servicePreference').value,
        notes: document.getElementById('additionalNotes').value,
        salon: currentSalon.name
    };

    console.log('Booking submitted:', formData);

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

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize
renderSalons();