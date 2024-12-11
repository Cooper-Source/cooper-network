// Service data: Replace with dynamic backend calls in a real-world app
const services = {
    "101220241650": {
        name: "Minecraft Server Hosting",
        progress: 15,
        goals: ["Order Received", "Setup in Progress", "Configuration Done", "Live"],
        description: "Your Minecraft server is being configured. We are almost there! Please consider to answer our questions to your Server at the Discord! | It's important that you react to our requests. That's why it could need more time.",
        personalmessage: "It's important that you react to our requests. That's why it could need more time.",
    },
    "101220241651": {
        name: "Server Network Setup",
        progress: 2,
        goals: ["Preparing", "Setting up", "Configurating", "Starting"],
        description: "It will be finish at January `25",
    }
    
};

// Get DOM elements
const idInputDialog = document.getElementById("id-input-dialog");
const idInput = document.getElementById("service-id-input");
const submitButton = document.getElementById("submit-id-button");
const statusContent = document.getElementById("status-content");
const statusMessage = document.getElementById("status-message");
const progressElement = document.getElementById("progress");
const progressGoals = document.getElementById("progress-goals");
const serviceDescription = document.getElementById("service-description");
const idErrorMessage = document.getElementById("id-error-message");
const personalMessageBox = document.getElementById("personal-message");

// Function to display service status
function displayServiceStatus(serviceId) {
    if (services[serviceId]) {
        // Valid ID: Show the service status
        const service = services[serviceId];
        idInputDialog.style.display = "none";
        statusContent.style.display = "block";

        // Populate service details
        statusMessage.innerHTML = `<strong>Service:</strong> ${service.name}`;
        progressElement.style.width = `${service.progress}%`;
        serviceDescription.textContent = service.description;

        // Add goals to the progress bar
        progressGoals.innerHTML = ""; // Clear existing goals
        service.goals.forEach(goal => {
            const goalElement = document.createElement("div");
            goalElement.textContent = goal;
            progressGoals.appendChild(goalElement);
        });

        // Display personal message if available
        if (service.personalMessage) {
            personalMessageBox.textContent = service.personalMessage;
            personalMessageBox.classList.remove("hidden");
        } else {
            personalMessageBox.classList.add("hidden");
        }
    } else {
        // Invalid ID: Show error message
        idErrorMessage.style.display = "block";
    }
}

// Check if ID is in URL parameters
const urlParams = new URLSearchParams(window.location.search);
const serviceIdFromUrl = urlParams.get("id");

if (serviceIdFromUrl) {
    // If ID is present in the URL, display the status
    displayServiceStatus(serviceIdFromUrl);
} else {
    // If no ID is in the URL, wait for user input
    submitButton.addEventListener("click", () => {
        const serviceId = idInput.value.trim();
        displayServiceStatus(serviceId);
    });
}
