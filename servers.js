// Check server status and update the UI
document.addEventListener("DOMContentLoaded", () => {
    const servers = document.querySelectorAll(".server");

    servers.forEach((server) => {
        const domain = server.dataset.domain;
        const status = server.dataset.status; // "auto" or "maintenance"

        const statusElement = server.querySelector(".server-status");

        if (status === "maintenance") {
            // Manually set to Maintenance
            statusElement.textContent = "Under Maintenance";
            statusElement.style.color = "orange";
        } else if (status === "auto") {
            // Automatically check server status
            fetch(`https://${domain}`)
                .then((response) => {
                    if (response.ok) {
                        statusElement.textContent = "Online";
                        statusElement.style.color = "green";
                    } else {
                        statusElement.textContent = "Offline";
                        statusElement.style.color = "red";
                    }
                })
                .catch(() => {
                    statusElement.textContent = "Offline";
                    statusElement.style.color = "red";
                });
        }
    });
});
