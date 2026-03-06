const salons = [
    {
        id: 1,
        name: "Elegance Hair Studio",
        location: "Downtown",
        rating: 4.8,
        reviews: 245,
        image: "https://images.unsplash.com/photo-1633273432032-a967ff023ffe?w=500&h=280&fit=crop",
        description: "Premium hair services with master stylists specializing in cuts, color, and treatments.",
        services: ["Haircut", "Coloring", "Extensions"]
    },
    {
        id: 2,
        name: "Spa Luxe",
        location: "Midtown",
        rating: 4.9,
        reviews: 312,
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=500&h=280&fit=crop",
        description: "Luxury spa with premium facials, massages, and holistic body treatments.",
        services: ["Facials", "Massage", "Body Treatments"]
    },
    {
        id: 3,
        name: "Nails & Beauty",
        location: "Westside",
        rating: 4.7,
        reviews: 189,
        image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=280&fit=crop",
        description: "Artistic nail designs and premium nail care with top-rated technicians.",
        services: ["Manicure", "Pedicure", "Nail Art"]
    },
    {
        id: 4,
        name: "Serenity Wellness Center",
        location: "Eastside",
        rating: 4.9,
        reviews: 276,
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=280&fit=crop",
        description: "Holistic wellness center offering therapeutic massages and premium skincare.",
        services: ["Massage", "Skincare", "Wellness"]
    },
    {
        id: 5,
        name: "Modern Cuts Barber",
        location: "Central Plaza",
        rating: 4.6,
        reviews: 198,
        image: "https://images.unsplash.com/photo-1585747860715-cd4628902d4a?w=500&h=280&fit=crop",
        description: "Contemporary barbering and grooming with expert barbers in a refined setting.",
        services: ["Haircut", "Beard Trim", "Styling"]
    },
    {
        id: 6,
        name: "Golden Hour Beauty",
        location: "North District",
        rating: 4.8,
        reviews: 234,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=280&fit=crop",
        description: "Full-service beauty center offering makeup, skincare, and hair services.",
        services: ["Makeup", "Skincare", "Hair"]
    }
];

let currentSalon = null;

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
                    ${salon.services.map(service => `<span class="service-tag">${service}</span>`).join('')}
                </div>
                <div class="salon-footer">
                    <div class="salon-rating">
                        <span class="stars">★★★★★</span>
                        <span class="review-count">${salon.reviews} reviews</span>
                    </div>
                    <button class="salon-book-btn" onclick="openBookingModal(${salon.id}, '${salon.name}')">Book</button>
                </div>
            </div>
        </div>
    `).join('');
}

function openBookingModal(salonId, salonName) {
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

renderSalons();