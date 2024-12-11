// Service data: Replace with dynamic backend calls in a real-world app
const services = {
    "101220241650": {
        name: "Minecraft Server Hosting",
        progress: 20,
        goals: ["Order Received", "Setup in Progress", "Configuration Done", "Live"],
        description: "Your Minecraft server is being configured. We are almost there! Please consider to answer our questions to your Server at the Discord! | It's important that you react to our requests. That's why it could need more time.",
        personalmessage: "It's important that you react to our requests. That's why it could need more time.",
        status: "Active", // New field for service status
        personalMessage: "If you have questions, feel free to contact support.",
        additionalInfo: "Planed Configuration: \n- 4gbyte RAM\n- Optimized for 20 Player\n- with Paper/Bukkit-Plugins\n\n--> NOTE <--\nInformation needed! Please contact Support!",
    },
    "101220241651": {
        name: "Server Network Setup",
        progress: 35,
        goals: ["Preparing", "Setting up", "Configurating", "Starting"],
        description: "It will be finished until January `25",
        status: "Paused", // New field for service status
        personalMessage: "We will notify you once setup finished.",
        additionalInfo: "Setting up network infrastructure for our servers.\n\nUpdate from 11.12.2024\nMain Issue fixed. Could be finished until the 19.12"
    }
    
};

// Get DOM elements
const idInputDialog = document.getElementById("id-input-dialog");
const idInput = document.getElementById("service-id-input");
const submitButton = document.getElementById("submit-id-button");
const statusContent = document.getElementById("status-content");
const serviceStatusText = document.getElementById("service-status");
const statusMessage = document.getElementById("status-message");
const progressElement = document.getElementById("progress");
const progressGoals = document.getElementById("progress-goals");
const serviceDescription = document.getElementById("service-description");
const idErrorMessage = document.getElementById("id-error-message");
const personalMessageBox = document.getElementById("personal-message");
const serviceInfoBox = document.getElementById("service-info");

// Function to display service status
function displayServiceStatus(serviceId) {
    if (services[serviceId]) {
        const service = services[serviceId];
        idInputDialog.style.display = "none";
        statusContent.style.display = "block";

        // Populate service details
        statusMessage.innerHTML = `<strong>Service:</strong> ${service.name}`;
        progressElement.style.width = `${service.progress}%`;
        serviceDescription.textContent = service.description;

        // Display status with colors and font size
        const serviceStatusElement = document.getElementById("service-status");

        // Dynamically set the class for status
        let statusClass = '';
        switch (service.status) {
            case 'Active':
                statusClass = 'active';
                break;
            case 'Paused':
                statusClass = 'paused';
                break;
            case 'Completed':
                statusClass = 'completed';
                break;
        }

        serviceStatusElement.innerHTML = `<strong>Status:</strong> <span class="${statusClass}">${service.status}</span>`;

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

        // Display Additional Info with line breaks if available
        if (service.additionalInfo) {
            const additionalInfoBox = document.getElementById("additional-info");
            additionalInfoBox.innerHTML = `<p>${service.additionalInfo.replace(/\n/g, '<br>')}</p>`;
            additionalInfoBox.style.display = "block";  // Show the additional info
        } else {
            const additionalInfoBox = document.getElementById("additional-info");
            additionalInfoBox.style.display = "none"; // Hide the additional info if no info
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