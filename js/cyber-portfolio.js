// Cybersecurity-focused homepage data and rendering

const cyberLabs = [
    {
        title: "BTLO Labs",
        icon: "fa-shield-halved",
        description: "Practicing beginner blue-team security labs to understand security monitoring, threat detection, and defensive security concepts.",
        tags: ["Blue Team", "Threat Detection", "Defensive Security"]
    },
    {
        title: "BurpSuite Testing",
        icon: "fa-bug",
        description: "Practiced SQL injection and brute-force testing to understand how web application vulnerabilities can be exploited and mitigated.",
        tags: ["SQL Injection", "BurpSuite", "Web Security"]
    },
    {
        title: "Wireshark Packet Analysis",
        icon: "fa-magnifying-glass",
        description: "Captured and analyzed packets from test websites to study network traffic and identify suspicious communication patterns.",
        tags: ["Packet Analysis", "Network Traffic", "Wireshark"]
    },
    {
        title: "Cisco Packet Tracer Lab",
        icon: "fa-network-wired",
        description: "Simulated network environments with routers and switches to understand routing, segmentation, and networking fundamentals.",
        tags: ["Routing", "Segmentation", "Network Fundamentals"]
    },
    {
        title: "ANY.RUN Malware Analysis",
        icon: "fa-virus",
        description: "Analyzed malware samples from MalwareBazaar using the ANY.RUN sandbox to observe behavior, attack techniques, and threat patterns.",
        tags: ["Malware Analysis", "Sandbox", "Threat Behavior"]
    }
];

const cyberRoadmap = [
    {
        stage: "Stage 1",
        title: "Foundations",
        items: [
            "Networking fundamentals",
            "Operating systems basics",
            "Linux fundamentals",
            "Introduction to cybersecurity"
        ]
    },
    {
        stage: "Stage 2",
        title: "Security Fundamentals",
        items: [
            "Web security basics",
            "Authentication and access control",
            "Common vulnerabilities",
            "Cryptography basics"
        ]
    },
    {
        stage: "Stage 3",
        title: "Practical Security Learning",
        items: [
            "Web vulnerability testing using BurpSuite",
            "Network traffic analysis with Wireshark",
            "Security lab practice with BTLO",
            "Malware behavior analysis with sandbox tools"
        ]
    },
    {
        stage: "Stage 4",
        title: "Future Learning Goals",
        items: [
            "Penetration testing methodologies",
            "Threat intelligence analysis",
            "Security monitoring and incident response",
            "Advanced cybersecurity certifications"
        ]
    }
];

const certificationGroups = [
    {
        provider: "Cisco",
        className: "cisco",
        items: [
            ["Introduction to Cybersecurity", "2025"],
            ["Networking Basics", "2024"],
            ["Network Support and Security", "2024"],
            ["Operating Systems Basics", "2024"],
            ["Introduction to IoT", "2024"],
            ["Introduction to Data Science", "2024"],
            ["Introduction to Modern AI", "2024"]
        ]
    },
    {
        provider: "EC-Council",
        className: "ec-council",
        items: [
            ["Introduction to Dark Web, Anonymity and Cryptocurrency", "2025"],
            ["SQL Injection Attacks", "2025"]
        ]
    },
    {
        provider: "SAS",
        className: "sas",
        items: [
            ["Statistics 1: Introduction to ANOVA, Regression, and Logistic Regression", "2024"],
            ["Statistics 2: ANOVA and Regression", "2024"]
        ]
    },
    {
        provider: "In Progress",
        className: "in-progress",
        items: [
            ["ISC2 Certified in Cybersecurity (CC)", "Preparing"]
        ]
    }
];

const securityTools = [
    {
        title: "Security Tools",
        icon: "fa-screwdriver-wrench",
        tools: ["BurpSuite", "Wireshark", "ANY.RUN"]
    },
    {
        title: "Networking",
        icon: "fa-diagram-project",
        tools: ["Cisco Packet Tracer"]
    },
    {
        title: "Security Labs",
        icon: "fa-flask",
        tools: ["BTLO Labs"]
    },
    {
        title: "Programming & Technical Skills",
        icon: "fa-code",
        tools: ["Python", "JavaScript", "PHP"]
    },
    {
        title: "Systems & Platforms",
        icon: "fa-server",
        tools: ["Linux", "Git", "GitHub", "AWS", "Firebase"]
    },
    {
        title: "Frontend Development",
        icon: "fa-window-maximize",
        tools: ["HTML5", "CSS3", "JavaScript", "React"]
    },
    {
        title: "AI-Assisted Development",
        icon: "fa-robot",
        tools: ["Cursor", "Codex", "AI coding assistants"]
    }
];

const writeupTopics = [
    {
        title: "Understanding SQL Injection Attacks",
        description: "A future note on how SQL injection works, why it appears, and how web apps can reduce risk."
    },
    {
        title: "My Experience Using BurpSuite for Security Testing",
        description: "A practical writeup about proxying requests, testing inputs, and learning from web vulnerability labs."
    },
    {
        title: "Basic Packet Analysis with Wireshark",
        description: "A beginner-friendly breakdown of inspecting packets and recognizing useful network traffic patterns."
    },
    {
        title: "Exploring Malware Behavior using ANY.RUN",
        description: "Notes from sandbox analysis, behavior observation, indicators, and safe learning practices."
    },
    {
        title: "Learning Networking with Cisco Packet Tracer",
        description: "A writeup on simulated routers, switches, VLANs, and why networking basics matter in cybersecurity."
    }
];

document.addEventListener("DOMContentLoaded", function() {
    renderExploringChips();
    renderCards("[data-labs-grid]", cyberLabs, createLabCard);
    renderRoadmap();
    renderCertificationsSummary();
    renderTools();
    renderWriteups();
    initViewMoreLists();
    initCyberScrollReveal();
});

function renderCards(selector, data, renderer) {
    const container = document.querySelector(selector);
    if (!container) {
        return;
    }

    container.innerHTML = data.map(renderer).join("");
}

function createLabCard(lab) {
    return `
        <article class="card card-primary scroll-reveal">
            <div class="card-icon">
                <i class="fas ${lab.icon}" aria-hidden="true"></i>
            </div>
            <h3>${escapeCyberHtml(lab.title)}</h3>
            <p>${escapeCyberHtml(lab.description)}</p>
            <div class="tag-row">
                ${lab.tags.map(function(tag) {
                    return `<span class="tag">${escapeCyberHtml(tag)}</span>`;
                }).join("")}
            </div>
        </article>
    `;
}

function renderExploringChips() {
    const target = document.querySelector("[data-exploring-chips]");
    if (!target) {
        return;
    }

    const chips = [
        "Web Security",
        "Network Security",
        "Vulnerability Scanning",
        "Secure Authentication",
        "AI Security Tools"
    ];

    target.innerHTML = chips.map(function(chip) {
        return `<span class="chip">${escapeCyberHtml(chip)}</span>`;
    }).join("");
}

function renderRoadmap() {
    renderCards("[data-roadmap-grid]", cyberRoadmap, function(stage) {
        const index = escapeCyberHtml(stage.stage).replace("Stage ", "0");
        return `
            <article class="timeline-step roadmap-milestone scroll-reveal">
                <div class="roadmap-index">${index}</div>
                <div class="roadmap-card-body">
                    <p class="timeline-index">${escapeCyberHtml(stage.stage)}</p>
                    <h3>${escapeCyberHtml(stage.title)}</h3>
                    <ul class="list">
                        ${stage.items.map(function(item) {
                            return `<li>${escapeCyberHtml(item)}</li>`;
                        }).join("")}
                    </ul>
                </div>
            </article>
        `;
    });
}

function renderCertificationsSummary() {
    const flattened = certificationGroups.flatMap(function(group) {
        return group.items.map(function(item) {
            return {
                provider: group.provider,
                className: group.className,
                title: item[0],
                year: item[1]
            };
        });
    });

    renderCards("[data-certification-summary]", flattened, function(cert) {
        return `
            <article class="card cert-card scroll-reveal">
                <span class="cert-summary-provider ${cert.className}">${escapeCyberHtml(cert.provider)}</span>
                <h3>${escapeCyberHtml(cert.title)}</h3>
                <p class="cert-summary-item">${escapeCyberHtml(cert.year)}</p>
            </article>
        `;
    });
}

function renderTools() {
    renderCards("[data-tools-grid]", securityTools, function(group) {
        return `
            <article class="panel tool-group scroll-reveal">
                <h3>${escapeCyberHtml(group.title)}</h3>
                <div class="tool-tags">
                    ${group.tools.map(function(tool) {
                        return `<span class="tool-tag">${escapeCyberHtml(tool)}</span>`;
                    }).join("")}
                </div>
            </article>
        `;
    });
}

function renderWriteups() {
    renderCards("[data-writeups-grid]", writeupTopics, function(topic) {
        return `
            <article class="card writeup-card scroll-reveal">
                <h3>${escapeCyberHtml(topic.title)}</h3>
                <p>${escapeCyberHtml(topic.description)}</p>
                <a href="blog.html" class="button link-button">Read notes</a>
            </article>
        `;
    });
}

function initViewMoreLists() {
    const containers = document.querySelectorAll("[data-view-more-limit]");

    containers.forEach(function(container) {
        const limit = Number(container.dataset.viewMoreLimit || 6);
        const items = Array.from(container.children);

        if (items.length <= limit) {
            return;
        }

        items.slice(limit).forEach(function(item) {
            item.classList.add("view-more-hidden");
        });

        const action = document.createElement("div");
        action.className = "view-more-action scroll-reveal";

        const button = document.createElement("button");
        button.className = "button view-more-button";
        button.type = "button";
        button.innerHTML = `<span>${escapeCyberHtml(container.dataset.viewMoreLabel || "View More")} &rarr;</span>`;

        button.addEventListener("click", function() {
            items.slice(limit).forEach(function(item, index) {
                item.classList.remove("view-more-hidden");
                item.classList.add("view-more-revealed", "is-visible");
                item.style.animationDelay = `${index * 45}ms`;
            });

            action.remove();
        });

        action.appendChild(button);
        container.insertAdjacentElement("afterend", action);
    });
}

function initCyberScrollReveal() {
    const elements = document.querySelectorAll(".scroll-reveal");

    if (!elements.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        elements.forEach(function(element) {
            element.classList.add("is-visible");
        });
        return;
    }

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.16,
        rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(function(element) {
        observer.observe(element);
    });
}

function escapeCyberHtml(value) {
    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
