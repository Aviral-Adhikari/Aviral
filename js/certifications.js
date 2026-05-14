// Certification data and UI rendering

const certifications = [
    {
        title: "Introduction to Cybersecurity",
        provider: "Cisco",
        year: "2025",
        image: "images/certification/itcs.png",
        category: "Cisco"
    },
    {
        title: "Networking Basics",
        provider: "Cisco",
        year: "2024",
        image: "images/certification/nb.png",
        category: "Cisco"
    },
    {
        title: "Network Support and Security",
        provider: "Cisco",
        year: "2024",
        image: "images/certification/nsas.png",
        category: "Cisco"
    },
    {
        title: "Introduction to Data Science",
        provider: "Cisco",
        year: "2024",
        image: "images/certification/itds.png",
        category: "Cisco"
    },
    {
        title: "Introduction to IoT",
        provider: "Cisco",
        year: "2024",
        image: "images/certification/iti.png",
        category: "Cisco"
    },
    {
        title: "Introduction to Modern AI",
        provider: "Cisco",
        year: "2024",
        image: "images/certification/itmi.png",
        category: "Cisco"
    },
    {
        title: "Operating Systems Basics",
        provider: "Cisco",
        year: "2024",
        image: "images/certification/osb.png",
        category: "Cisco"
    },
    {
        title: "Statistics 1: Introduction to ANOVA, Regression, and Logistic Regression",
        provider: "SAS",
        year: "2024",
        image: "images/certification/stat1.png",
        category: "SAS"
    },
    {
        title: "Statistics 2: ANOVA and Regression",
        provider: "SAS",
        year: "2024",
        image: "images/certification/stat2.png",
        category: "SAS"
    },
    {
        title: "Introduction to Dark Web, Anonymity, and Cryptocurrency",
        provider: "EC-Council",
        year: "2025",
        image: "images/certification/itdwaac.png",
        category: "EC-Council"
    },
    {
        title: "SQL Injection Attacks",
        provider: "EC-Council",
        year: "2025",
        image: "images/certification/sia.png",
        category: "EC-Council"
    }
];

const providerMeta = {
    Cisco: {
        badgeClass: "cisco",
        icon: "fa-network-wired"
    },
    "EC-Council": {
        badgeClass: "ec-council",
        icon: "fa-shield-halved"
    },
    SAS: {
        badgeClass: "sas",
        icon: "fa-chart-simple"
    }
};

let activeCertificationIndex = null;

document.addEventListener("DOMContentLoaded", function() {
    window.portfolioCertifications = certifications;
    initCertificationGallery();
    initCertificationPreview();
});

function initCertificationGallery() {
    const grid = document.querySelector("[data-certifications-grid]");
    if (!grid) {
        return;
    }

    const filters = document.querySelectorAll("[data-certification-filter]");
    renderCertificationGrid("All");

    filters.forEach(function(filterButton) {
        filterButton.addEventListener("click", function() {
            const filterValue = filterButton.dataset.certificationFilter;

            filters.forEach(function(button) {
                button.classList.toggle("active", button === filterButton);
            });

            filterCertifications(filterValue);
        });
    });
}

function initCertificationPreview() {
    const previewGrid = document.querySelector("[data-cert-preview]");
    if (!previewGrid) {
        return;
    }

    const limit = Number(previewGrid.dataset.limit || 6);
    const previewItems = certifications.slice(0, limit);
    previewGrid.innerHTML = previewItems.map(createCertificationCard).join("");
    bindCertificationCardEvents(previewGrid);
    bindImageFallbacks(previewGrid);
}

function filterCertifications(category) {
    const grid = document.querySelector("[data-certifications-grid]");
    if (!grid) {
        return;
    }

    grid.classList.add("is-filtering");

    window.setTimeout(function() {
        renderCertificationGrid(category);
        grid.classList.remove("is-filtering");
    }, 180);
}

function renderCertificationGrid(category) {
    const grid = document.querySelector("[data-certifications-grid]");
    if (!grid) {
        return;
    }

    const filteredCertifications = category === "All"
        ? certifications
        : certifications.filter(function(certification) {
            return certification.category === category;
        });

    grid.innerHTML = filteredCertifications.map(createCertificationCard).join("");
    updateCertificationCount(category, filteredCertifications.length);
    bindCertificationCardEvents(grid);
    bindImageFallbacks(grid);
}

function createCertificationCard(certification) {
    const originalIndex = certifications.indexOf(certification);
    const meta = providerMeta[certification.provider] || providerMeta.Cisco;

    return `
        <button class="certification-card" type="button" data-cert-index="${originalIndex}" aria-label="Preview ${escapeHtml(certification.title)} certificate">
            <span class="certification-card-inner">
                <span class="certification-image-shell" data-provider="${escapeHtml(certification.provider)}">
                    <img src="${certification.image}" alt="${escapeHtml(certification.title)} certificate" loading="lazy">
                </span>
                <span class="certification-card-body">
                    <span class="certification-card-title">${escapeHtml(certification.title)}</span>
                    <span class="certification-card-meta">
                        <span class="certification-provider-badge ${meta.badgeClass}">
                            <i class="fas ${meta.icon}" aria-hidden="true"></i>
                            ${escapeHtml(certification.provider)}
                        </span>
                        <span class="certification-year">${escapeHtml(certification.year)}</span>
                    </span>
                </span>
            </span>
        </button>
    `;
}

function bindCertificationCardEvents(container) {
    const cards = container.querySelectorAll(".certification-card");

    cards.forEach(function(card) {
        card.addEventListener("click", function() {
            openCertificationModal(Number(card.dataset.certIndex));
        });
    });
}

function updateCertificationCount(category, count) {
    const countLabel = document.querySelector("[data-certification-count]");
    if (!countLabel) {
        return;
    }

    countLabel.textContent = category === "All"
        ? `Showing all ${count} certifications`
        : `Showing ${count} ${category} certifications`;
}

function openCertificationModal(index) {
    const certification = certifications[index];
    if (!certification) {
        return;
    }

    activeCertificationIndex = index;
    const modal = ensureCertificationModal();
    const meta = providerMeta[certification.provider] || providerMeta.Cisco;
    const imageShell = modal.querySelector("[data-modal-image-shell]");
    const image = modal.querySelector("[data-modal-image]");
    const title = modal.querySelector("[data-modal-title]");
    const provider = modal.querySelector("[data-modal-provider]");
    const year = modal.querySelector("[data-modal-year]");
    const download = modal.querySelector("[data-modal-download]");

    imageShell.classList.remove("is-missing");
    imageShell.dataset.provider = certification.provider;
    image.style.display = "";
    image.alt = `${certification.title} certificate`;
    image.onerror = function() {
        imageShell.classList.add("is-missing");
        image.style.display = "none";
    };
    image.onload = function() {
        imageShell.classList.remove("is-missing");
        image.style.display = "";
    };
    image.src = certification.image;

    title.textContent = certification.title;
    provider.className = `certification-provider-badge ${meta.badgeClass}`;
    provider.innerHTML = `<i class="fas ${meta.icon}" aria-hidden="true"></i>${escapeHtml(certification.provider)}`;
    year.textContent = certification.year;

    if (certification.download) {
        download.href = certification.download;
        download.classList.add("is-visible");
    } else {
        download.removeAttribute("href");
        download.classList.remove("is-visible");
    }

    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    modal.querySelector("[data-modal-close]").focus();
}

function closeCertificationModal() {
    const modal = document.querySelector("[data-cert-modal]");
    if (!modal) {
        return;
    }

    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    activeCertificationIndex = null;
}

function ensureCertificationModal() {
    let modal = document.querySelector("[data-cert-modal]");

    if (modal) {
        return modal;
    }

    modal = document.createElement("div");
    modal.className = "certification-modal";
    modal.dataset.certModal = "";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "certification-modal-title");
    modal.innerHTML = `
        <div class="certification-modal-dialog">
            <div class="certification-modal-header">
                <button class="certification-modal-close" type="button" data-modal-close aria-label="Close certificate preview">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </button>
            </div>
            <div class="certification-modal-image" data-modal-image-shell>
                <img data-modal-image src="" alt="">
            </div>
            <div class="certification-modal-content">
                <h3 id="certification-modal-title" data-modal-title></h3>
                <div class="certification-modal-meta">
                    <span data-modal-provider></span>
                    <span class="certification-year" data-modal-year></span>
                </div>
                <a class="certification-download btn-immersive primary-immersive" data-modal-download download>
                    <span>Download certificate</span>
                    <i class="fas fa-download btn-icon" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeCertificationModal();
        }
    });

    modal.querySelector("[data-modal-close]").addEventListener("click", closeCertificationModal);
    bindImageFallbacks(modal);
    bindModalKeyboardSupport();

    return modal;
}

function bindModalKeyboardSupport() {
    if (window.certificationModalKeyboardBound) {
        return;
    }

    window.certificationModalKeyboardBound = true;

    document.addEventListener("keydown", function(event) {
        const modal = document.querySelector("[data-cert-modal]");
        const isOpen = modal && modal.getAttribute("aria-hidden") === "false";

        if (!isOpen) {
            return;
        }

        if (event.key === "Escape") {
            closeCertificationModal();
        }
    });
}

function bindImageFallbacks(scope) {
    const images = scope.querySelectorAll(".certification-image-shell img, [data-modal-image]");

    images.forEach(function(image) {
        image.addEventListener("error", function() {
            const shell = image.closest(".certification-image-shell, .certification-modal-image");
            if (shell) {
                shell.classList.add("is-missing");
            }

            image.style.display = "none";
        }, { once: true });
    });
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
