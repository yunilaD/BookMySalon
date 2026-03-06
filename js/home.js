console.log("home.js loaded");

import {
    db,
    auth,
    collection,
    getDocs,
    addDoc,
    setDoc,
    doc,
    serverTimestamp,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "../firebase.js";

let salons = [];
let currentSalon = null;
let currentUser = null;
let isLoginMode = true;

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

function showSalonsMessage(message) {
    const salonsGrid = document.getElementById("salonsGrid");
    salonsGrid.innerHTML = `
        <div class="salon-card" style="padding: 2rem;">
            <div class="salon-content">
                <h3 class="salon-name">Notice</h3>
                <p class="salon-description">${escapeHtml(message)}</p>
            </div>
        </div>
    `;
}

async function loadSalons() {
    try {
        console.log("Loading salons from Firestore...");
        const querySnapshot = await getDocs(collection(db, "salons"));

        salons = [];

        querySnapshot.forEach((docSnap) => {
            salons.push({
                id: docSnap.id,
                ...docSnap.data()
            });
        });

        console.log("Loaded salons:", salons);

        if (!salons.length) {
            showSalonsMessage("No salon data found in Firestore. Add documents to the salons collection.");
            return;
        }

        renderSalons();
    } catch (error) {
        console.error("Error loading salons:", error);
        showSalonsMessage(`Failed to load salons: ${error.message}`);
    }
}

function renderSalons() {
    const salonsGrid = document.getElementById("salonsGrid");

    if (!salonsGrid) {
        console.error("salonsGrid element not found");
        return;
    }

    if (!salons.length) {
        showSalonsMessage("No salons available right now.");
        return;
    }

    salonsGrid.innerHTML = salons.map((salon) => {
        const name = salon.name || "Unnamed Salon";
        const location = salon.location || "Location not added";
        const description = salon.description || "No description added yet.";
        const image = salon.image || "https://via.placeholder.com/800x500?text=Salon+Image";
        const services = Array.isArray(salon.services) ? salon.services : [];
        const reviews = salon.reviews ?? 0;
        const contact = salon.contact || "No contact added";
        const availability = salon.availability || "Availability not added";

        return `
            <div class="salon-card">
                <div class="salon-image-wrapper">
                    <img src="${escapeHtml(image)}" alt="${escapeHtml(name)}">
                    <div class="salon-badge">Premium</div>
                </div>

                <div class="salon-content">
                    <h3 class="salon-name">${escapeHtml(name)}</h3>
                    <div class="salon-location">📍 ${escapeHtml(location)}</div>

                    <p class="salon-description">${escapeHtml(description)}</p>

                    <div class="salon-services">
                        ${
            services.length
                ? services.map((service) => `<span class="service-tag">${escapeHtml(service)}</span>`).join("")
                : `<span class="service-tag">No services listed</span>`
        }
                    </div>

                    <div class="salon-footer">
                        <div class="salon-rating">
                            ${
            currentUser
                ? `
                                        <span class="stars">★★★★★</span>
                                        <span class="review-count">${escapeHtml(reviews)} reviews</span>
                                      `
                : `
                                        <span class="review-count">Login to view reviews</span>
                                      `
        }
                        </div>

                        <button
                            class="salon-book-btn"
                            onclick="openBookingModal('${escapeHtml(salon.id)}', '${escapeHtml(name)}')">
                            Book
                        </button>
                    </div>

                    <div style="margin-top:12px;color:#6b6b6b;font-size:0.9rem;">
                        ${
            currentUser
                ? `
                                    <div>📞 ${escapeHtml(contact)}</div>
                                    <div>🕒 ${escapeHtml(availability)}</div>
                                  `
                : `
                                    <div>Login to view contact info and availability</div>
                                  `
        }
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

window.openBookingModal = function (salonId, salonName) {
    currentSalon = salons.find((s) => s.id === salonId);

    if (!currentUser) {
        openAuthModal();
        return;
    }

    document.getElementById("selectedSalon").textContent = salonName;

    const emailField = document.getElementById("clientEmail");
    if (emailField && currentUser?.email) {
        emailField.value = currentUser.email;
        emailField.readOnly = true;
    }

    document.getElementById("bookingModal").classList.add("show");
    document.body.style.overflow = "hidden";
};

function closeModal() {
    document.getElementById("bookingModal").classList.remove("show");
    document.body.style.overflow = "auto";

    const bookingForm = document.querySelector("#bookingModal .booking-form");
    if (bookingForm) bookingForm.reset();
}

window.closeModal = closeModal;

window.submitBooking = async function (event) {
    event.preventDefault();

    if (!currentUser) {
        closeModal();
        openAuthModal();
        return;
    }

    if (!currentSalon) {
        alert("Please select a salon first.");
        return;
    }

    const bookingData = {
        userId: currentUser.uid,
        salonId: currentSalon.id,
        salonName: currentSalon.name || "",
        name: document.getElementById("clientName").value.trim(),
        email: document.getElementById("clientEmail").value.trim(),
        phone: document.getElementById("clientPhone").value.trim(),
        date: document.getElementById("appointmentDate").value,
        time: document.getElementById("appointmentTime").value,
        service: document.getElementById("servicePreference").value,
        notes: document.getElementById("additionalNotes").value.trim(),
        status: "pending",
        createdAt: serverTimestamp()
    };

    try {
        await addDoc(collection(db, "bookings"), bookingData);

        await addDoc(collection(db, "mail"), {
            to: [bookingData.email],
            message: {
                subject: `Booking Confirmed - ${bookingData.salonName}`,
                text: `Hi ${bookingData.name},

Your booking has been confirmed.

Salon: ${bookingData.salonName}
Service: ${bookingData.service}
Date: ${bookingData.date}
Time: ${bookingData.time}
Phone: ${bookingData.phone}
${bookingData.notes ? `Notes: ${bookingData.notes}` : ""}

Thank you for booking with BookMySalon.`,
                html: `
                    <h2>Booking Confirmed</h2>
                    <p>Hi ${escapeHtml(bookingData.name)},</p>
                    <p>Your booking has been confirmed.</p>
                    <ul>
                        <li><strong>Salon:</strong> ${escapeHtml(bookingData.salonName)}</li>
                        <li><strong>Service:</strong> ${escapeHtml(bookingData.service)}</li>
                        <li><strong>Date:</strong> ${escapeHtml(bookingData.date)}</li>
                        <li><strong>Time:</strong> ${escapeHtml(bookingData.time)}</li>
                        <li><strong>Phone:</strong> ${escapeHtml(bookingData.phone)}</li>
                    </ul>
                    ${bookingData.notes ? `<p><strong>Notes:</strong> ${escapeHtml(bookingData.notes)}</p>` : ""}
                    <p>Thank you for booking with BookMySalon.</p>
                `
            }
        });

        closeModal();
        showSuccessMessage();
    } catch (error) {
        console.error("Booking/email error:", error);
        alert(`Booking failed: ${error.message}`);
    }
};

function showSuccessMessage() {
    const successMsg = document.getElementById("successMessage");
    successMsg.classList.add("show");

    setTimeout(() => {
        successMsg.classList.remove("show");
    }, 5000);
}

function openAuthModal() {
    document.getElementById("authModal").classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeAuthModal() {
    document.getElementById("authModal").classList.remove("show");
    document.body.style.overflow = "auto";
}

window.closeAuthModal = closeAuthModal;

window.toggleAuthMode = function (event) {
    event.preventDefault();
    isLoginMode = !isLoginMode;

    document.getElementById("authTitle").textContent = isLoginMode ? "Sign In" : "Create Account";
    document.getElementById("authSubmitBtn").textContent = isLoginMode ? "Sign In" : "Sign Up";
    document.getElementById("authSwitchText").textContent = isLoginMode
        ? "Don’t have an account?"
        : "Already have an account?";
};

window.handleAuth = async function (event) {
    event.preventDefault();

    const email = document.getElementById("authEmail").value.trim();
    const password = document.getElementById("authPassword").value.trim();

    try {
        if (isLoginMode) {
            await signInWithEmailAndPassword(auth, email, password);
            alert("Signed in successfully");
        } else {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email,
                role: "customer",
                createdAt: serverTimestamp()
            });

            alert("Account created successfully");
        }

        closeAuthModal();

        if (currentSalon) {
            document.getElementById("selectedSalon").textContent = currentSalon.name || "";
            document.getElementById("bookingModal").classList.add("show");
            document.body.style.overflow = "hidden";
        }
    } catch (error) {
        console.error("Auth error:", error);
        alert(error.message);
    }
};

function setupAuthUI() {
    const authBtn = document.getElementById("authActionBtn");

    authBtn.addEventListener("click", async () => {
        try {
            if (currentUser) {
                await signOut(auth);
            } else {
                openAuthModal();
            }
        } catch (error) {
            console.error("Sign out error:", error);
            alert(error.message);
        }
    });

    onAuthStateChanged(auth, (user) => {
        currentUser = user;
        authBtn.textContent = user ? "Sign Out" : "Sign In";
        renderSalons();
    });
}

window.onclick = function (event) {
    const bookingModal = document.getElementById("bookingModal");
    const authModal = document.getElementById("authModal");

    if (event.target === bookingModal) closeModal();
    if (event.target === authModal) closeAuthModal();
};

setupAuthUI();
loadSalons();