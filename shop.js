// Slider functionality
let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");

// config param
let countItem = items.length;
let itemActive = 0;

// event next click
if (next) {
    next.onclick = function() {
        itemActive = itemActive + 1;
        if (itemActive >= countItem) {
            itemActive = 0;
        }
        showSlider();
    };
}

//event prev click
if (prev) {
    prev.onclick = function() {
        itemActive = itemActive - 1;
        if (itemActive < 0) {
            itemActive = countItem - 1;
        }
        showSlider();
    };
}

// auto run slider
let refreshInterval;
if (items.length > 0) {
    refreshInterval = setInterval(() => {
        if (next) next.click();
    }, 5000);
}

function showSlider() {
    let itemActiveOld = document.querySelector(".slider .list .item.active");

    if (itemActiveOld) {
        itemActiveOld.classList.remove("active");
    }

    if (items[itemActive]) {
        items[itemActive].classList.add("active");
    }

    // clear auto time run slider
    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => {
        if (next) next.click();
    }, 5000);
}

// Social Share Buttons
const shareBtn = document.querySelector(".share-btn");
const card1 = document.querySelector(".card1");
const card2 = document.querySelector(".card2");
const card3 = document.querySelector(".card3");
const card4 = document.querySelector(".card4");

if (shareBtn && card1 && card2 && card3 && card4) {
    shareBtn.addEventListener("click", () => {
        const isToggled = card1.getAttribute("data-toggle1") === "true";
        if (isToggled) {
            card1.setAttribute("data-toggle1", "false");
            card2.setAttribute("data-toggle2", "false");
            card3.setAttribute("data-toggle3", "false");
            card4.setAttribute("data-toggle4", "false");
        } else {
            card1.setAttribute("data-toggle1", "true");
            card2.setAttribute("data-toggle2", "true");
            card3.setAttribute("data-toggle3", "true");
            card4.setAttribute("data-toggle4", "true");
        }
    });
}

// Contact Form functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact storage if not exists
    if (!localStorage.getItem("contacts")) {
        localStorage.setItem("contacts", JSON.stringify([]));
    }

    // Function to save contact to localStorage
    function saveContact(name, email, subject, message) {
        const contacts = JSON.parse(localStorage.getItem("contacts"));
        const newContact = {
            id: Date.now(),
            name,
            email,
            subject,
            message,
            date: new Date().toISOString(),
        };

        contacts.push(newContact);
        localStorage.setItem("contacts", JSON.stringify(contacts));
        return newContact.id;
    }

    // Form submission handler
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const subject = document.getElementById("subject").value;
            const message = document.getElementById("message").value;

            // Save contact to localStorage
            const contactId = saveContact(name, email, subject, message);

            // Show success message
            const successMessage = document.getElementById("success-message");
            if (successMessage) {
                successMessage.style.display = "block";
            }

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                if (successMessage) {
                    successMessage.style.display = "none";
                }
            }, 5000);

            console.log("Contact saved with ID:", contactId);
        });
    }

    // Login/Signup Form Validation
    const form = document.getElementById("form");
    const error_message = document.getElementById("error-message");

    if (form && error_message) {
        const firstname_input = document.getElementById("firstname-input");
        const email_input = document.getElementById("email-input");
        const password_input = document.getElementById("password-input");
        const repeat_password_input = document.getElementById("repeat-password-input");
        const age_input = document.getElementById("age-input");
        const dob_input = document.getElementById("dob-input");

        form.addEventListener("submit", (e) => {
            let errors = [];

            if (firstname_input) {
                // Signup form validation
                errors = getSignupFormErrors(
                    firstname_input.value,
                    email_input.value,
                    password_input.value,
                    repeat_password_input.value,
                    age_input ? age_input.value : null,
                    dob_input ? dob_input.value : null
                );
            } else {
                // Login form validation
                errors = getLoginFormErrors(email_input.value, password_input.value);
            }

            if (errors.length > 0) {
                e.preventDefault();
                error_message.innerText = errors.join(". ");
            } else {
                if (firstname_input) {
                    // Signup form - redirect to login
                    e.preventDefault();
                    error_message.style.color = "#088178";
                    error_message.innerText = "Account created successfully! Redirecting to login...";

                    setTimeout(() => {
                        window.location.href = "login.html";
                    }, 2000);
                }
            }
        });

        function getSignupFormErrors(firstname, email, password, repeatPassword, age, dob) {
            let errors = [];

            if (firstname === "" || firstname == null) {
                errors.push("Firstname is required");
                if (firstname_input) firstname_input.parentElement.parentElement.classList.add("incorrect");
            } else if (firstname.length < 2) {
                errors.push("Firstname must be at least 2 characters long");
                if (firstname_input) firstname_input.parentElement.parentElement.classList.add("incorrect");
            }

            if (email === "" || email == null) {
                errors.push("Email is required");
                if (email_input) email_input.parentElement.parentElement.classList.add("incorrect");
            } else if (!isValidEmail(email)) {
                errors.push("Please enter a valid email address");
                if (email_input) email_input.parentElement.parentElement.classList.add("incorrect");
            }

            // Check if at least one gender is selected
            const genderSelected = document.querySelector('input[name="gender"]:checked');
            if (!genderSelected) {
                errors.push("Please select your gender");
            }

            if (age && (age === "" || age == null)) {
                errors.push("Age is required");
                if (age_input) age_input.parentElement.parentElement.classList.add("incorrect");
            } else if (age && (age < 1 || age > 120)) {
                errors.push("Please enter a valid age (1-120)");
                if (age_input) age_input.parentElement.parentElement.classList.add("incorrect");
            }

            if (dob && (dob === "" || dob == null)) {
                errors.push("Date of Birth is required");
                if (dob_input) dob_input.parentElement.parentElement.classList.add("incorrect");
            }

            if (password === "" || password == null) {
                errors.push("Password is required");
                if (password_input) password_input.parentElement.parentElement.classList.add("incorrect");
            }
            if (password.length < 8) {
                errors.push("Password must have at least 8 characters");
                if (password_input) password_input.parentElement.parentElement.classList.add("incorrect");
            }
            if (password !== repeatPassword) {
                errors.push("Password does not match repeated password");
                if (password_input) password_input.parentElement.parentElement.classList.add("incorrect");
                if (repeat_password_input) repeat_password_input.parentElement.parentElement.classList.add("incorrect");
            }

            return errors;
        }

        function getLoginFormErrors(email, password) {
            let errors = [];

            if (email === "" || email == null) {
                errors.push("Email is required");
                if (email_input) email_input.parentElement.classList.add("incorrect");
            }
            if (password === "" || password == null) {
                errors.push("Password is required");
                if (password_input) password_input.parentElement.classList.add("incorrect");
            }

            return errors;
        }

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        const allInputs = [firstname_input, email_input, password_input, repeat_password_input, age_input, dob_input].filter(input => input != null);

        allInputs.forEach(input => {
            input.addEventListener("input", () => {
                if (input.parentElement && input.parentElement.classList.contains("incorrect")) {
                    input.parentElement.classList.remove("incorrect");
                } else if (input.parentElement && input.parentElement.parentElement && input.parentElement.parentElement.classList.contains("incorrect")) {
                    input.parentElement.parentElement.classList.remove("incorrect");
                }
                error_message.innerText = "";
            });
        });

        // Set maximum date for date of birth (today)
        if (dob_input) {
            const today = new Date().toISOString().split('T')[0];
            dob_input.setAttribute('max', today);
        }
    }
});