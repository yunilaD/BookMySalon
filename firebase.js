console.log("home.js loaded");

import {
    db,
    auth,
    collection,
    getDocs,
    addDoc,
    setDoc,
    doc,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "../firebase.js";


let salons = [];
let currentSalon = null;
let currentUser = null;
let isLoginMode = true;


/* ---------------- LOAD SALONS ---------------- */

async function loadSalons() {

    console.log("Loading salons...");

    const querySnapshot = await getDocs(collection(db, "salons"));

    salons = [];

    querySnapshot.forEach(docSnap => {
        salons.push({
            id: docSnap.id,
            ...docSnap.data()
        });
    });

    renderSalons();
}


/* ---------------- RENDER SALONS ---------------- */

function renderSalons() {

    const salonsGrid = document.getElementById("salonsGrid");

    salonsGrid.innerHTML = salons.map(salon => `
    
        <div class="salon-card">

            <div class="salon-image-wrapper">
                <img src="${salon.image}" alt="${salon.name}">
                <div class="salon-badge">Premium</div>
            </div>

            <div class="salon-content">

                <h3 class="salon-name">${salon.name}</h3>
                <div class="salon-location">📍 ${salon.location}</div>

                <p class="salon-description">${salon.description || ""}</p>

                <div class="salon-services">
                    ${(salon.services || []).map(service =>
        `<span class="service-tag">${service}</span>`
    ).join("")}
                </div>

                <div class="salon-footer">

                    <div class="salon-rating">
                    
                        ${
        currentUser
            ? `
                            <span class="stars">★★★★★</span>
                            <span class="review-count">${salon.reviews || 0} reviews</span>
                          `
            : `
                            <span class="review-count">Login to view reviews</span>
                          `
    }

                    </div>

                    <button 
                        class="salon-book-btn"
                        onclick="openBookingModal('${salon.id}', '${salon.name}')">
                        Book
                    </button>

                </div>

                <div style="margin-top:12px;color:#6b6b6b;font-size:0.9rem;">

                    ${
        currentUser
            ? `
                        <div>📞 ${salon.contact || "No contact added"}</div>
                        <div>🕒 ${salon.availability || "Availability not added"}</div>
                      `
            : `
                        <div>Login to view contact info and availability</div>
                      `
    }

                </div>

            </div>

        </div>

    `).join("");
}


/* ---------------- BOOKING MODAL ---------------- */

window.openBookingModal = function (salonId, salonName) {

    currentSalon = salons.find(s => s.id === salonId);

    if (!currentUser) {

        openAuthModal();
        return;

    }

    document.getElementById("selectedSalon").textContent = salonName;

    document.getElementById("clientEmail").value = currentUser.email;
    document.getElementById("clientEmail").readOnly = true;

    document.getElementById("bookingModal").classList.add("show");
    document.body.style.overflow = "hidden";
};


function closeModal() {

    document.getElementById("bookingModal").classList.remove("show");
    document.body.style.overflow = "auto";

    document.querySelector(".booking-form").reset();
}

window.closeModal = closeModal;


/* ---------------- SAVE BOOKING ---------------- */

window.submitBooking = async function (event) {

    event.preventDefault();

    if (!currentUser) {

        closeModal();
        openAuthModal();
        return;
    }

    try {

        await addDoc(collection(db, "bookings"), {

            userId: currentUser.uid,
            salonId: currentSalon.id,
            salonName: currentSalon.name,

            name: document.getElementById("clientName").value,
            email: document.getElementById("clientEmail").value,
            phone: document.getElementById("clientPhone").value,

            date: document.getElementById("appointmentDate").value,
            time: document.getElementById("appointmentTime").value,

            service: document.getElementById("servicePreference").value,
            notes: document.getElementById("additionalNotes").value,

            status: "pending",
            createdAt: new Date()

        });

        closeModal();
        showSuccessMessage();

    } catch (error) {

        console.error(error);
        alert("Booking failed");

    }
};


/* ---------------- SUCCESS MESSAGE ---------------- */

function showSuccessMessage() {

    const successMsg = document.getElementById("successMessage");

    successMsg.classList.add("show");

    setTimeout(() => {

        successMsg.classList.remove("show");

    }, 5000);
}


/* ---------------- AUTH MODAL ---------------- */

function openAuthModal() {

    document.getElementById("authModal").classList.add("show");
    document.body.style.overflow = "hidden";
}

function closeAuthModal() {

    document.getElementById("authModal").classList.remove("show");
    document.body.style.overflow = "auto";
}

window.closeAuthModal = closeAuthModal;


/* ---------------- SWITCH LOGIN / SIGNUP ---------------- */

window.toggleAuthMode = function (event) {

    event.preventDefault();

    isLoginMode = !isLoginMode;

    document.getElementById("authTitle").textContent =
        isLoginMode ? "Sign In" : "Create Account";

    document.getElementById("authSubmitBtn").textContent =
        isLoginMode ? "Sign In" : "Sign Up";

    document.getElementById("authSwitchText").textContent =
        isLoginMode
            ? "Don’t have an account?"
            : "Already have an account?";
};


/* ---------------- LOGIN / SIGNUP ---------------- */

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
                email: email,
                role: "customer",
                createdAt: new Date()

            });

            alert("Account created successfully");

        }

        closeAuthModal();

        if (currentSalon) {

            document.getElementById("selectedSalon").textContent = currentSalon.name;

            document.getElementById("bookingModal").classList.add("show");
            document.body.style.overflow = "hidden";

        }

    } catch (error) {

        alert(error.message);

    }
};


/* ---------------- AUTH UI ---------------- */

function setupAuthUI() {

    const authBtn = document.getElementById("authActionBtn");

    authBtn.addEventListener("click", async () => {

        if (currentUser) {

            await signOut(auth);

        } else {

            openAuthModal();

        }

    });

    onAuthStateChanged(auth, (user) => {

        currentUser = user;

        authBtn.textContent = user ? "Sign Out" : "Sign In";

        renderSalons();

    });
}


/* ---------------- CLICK OUTSIDE MODALS ---------------- */

window.onclick = function (event) {

    const bookingModal = document.getElementById("bookingModal");
    const authModal = document.getElementById("authModal");

    if (event.target === bookingModal) closeModal();
    if (event.target === authModal) closeAuthModal();
};


/* ---------------- INIT ---------------- */

setupAuthUI();
loadSalons();