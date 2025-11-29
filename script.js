/* ============================
   1. DATA & CONFIG
   ============================ */
const accounts = [
    { username: "kokai", password: "123" },
    { username: "tem", password: "2025" },
    { username: "TEM", password: "2025" },
    { username: "Tem", password: "2025" }
];

const areaContent = [
    {
        title: "601 - Dr. Portez",
        type: "folder",
        children: [
            {title: "Historical Roots of Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Philosophical Underpinnings of Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Core Principles of Advanced Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Theoretical Models in Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Best Practices and Pedagogical Innovations", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "National Legal Frameworks in Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Contemporary Challenges and Problems in Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Emerging Trends and Innovations", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Future Prospects and Policy Directions", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Comparative Studies in Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Globalization and International Collaboration", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Current Tools and Applications in Technology Education", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
            {title: "Impact of Educational Technology on Advanced Teaching and Learning", type: "file", link: "https://drive.google.com/file/d/1678NMH6hEUOy2TsxYXJ92YiV5C78HVOM/preview"},                            
        ]
    },
    {
        title: "604 - Dr. Cruz",
        type: "folder",
        children: [
            {title: "Introduction to Leadership Theories in Technology Education (part 1)", type: "file", link: ""},                            
            {title: "Introduction to Leadership Theories in Technology Education (part 2)", type: "file", link: ""},                            
            {title: "Leadership for Innovation and Change", type: "file", link: ""},
            {title: "Policy Development in Technology Education	(part 1)", type: "file", link: ""},
            {title: "Policy Development in Technology Education	(part 2)", type: "file", link: ""},
            {title: "Legal Issues", type: "file", link: ""},
            {title: "Ethical Issues", type: "file", link: "https://drive.google.com/file/d/1QkMxd9DnYYA7tDLGXV0cRKCyyczGn5F4/view?usp=drive_link"},
            {title: "Governance Models in Technology Education (part 1)", type: "file", link: ""},
            {title: "Governance Models in Technology Education (part 2)", type: "file", link: ""},
            {title: "Accountability and Performance Management (part 1)", type: "file", link: ""},
            {title: "Accountability and Performance Management (part 2)", type: "file", link: ""},
            {title: "Accountability and Performance Management (part 3)", type: "file", link: ""},
            {title: "Strategic Leadership Defined, Essentials, SL Frameworks", type: "file", link: ""},
            {title: "Resource Management Nature, Scope, Elements, Types	", type: "file", link: ""},                          
        ]
    },
    {
        title: "609 - Dr. De Asis",
        type: "folder",
        children: [
            {title: "Investigate Challenges PH Education Facilities", type: "file", link: "https://drive.google.com/file/d/1H-qY7BLzrAOxtJhp1h6b9tYTrmccpHg9/view?usp=drive_link"},                            
                          
        ]
    },

];

/* ============================
   2. INITIALIZATION (Runs when page loads)
   ============================ */
document.addEventListener("DOMContentLoaded", () => {
    
    // --- SECURITY CHECKS ---
    const isSystemPage = document.getElementById("systemPage");
    const isLoginPage = document.getElementById("loginPage");

    // 1. If on System Page
    if (isSystemPage) {
        if (!localStorage.getItem("isLoggedIn")) {
            window.location.href = "login.html"; // Redirect to login
        } else {
            isSystemPage.style.display = "flex"; // Show page
            
            // *** CRITICAL FIX: BUILD THE MENU HERE ***
            buildMenu(); 

            // Auto-open sidebar on mobile
            if (window.innerWidth <= 768) {
                const sidebar = document.getElementById("sidebar");
                const overlay = document.getElementById("mobileOverlay");
                
                if (sidebar) sidebar.classList.add("active");
                if (overlay) overlay.classList.add("active");
            }
        }
    }

    // 2. If on Login Page
    if (isLoginPage) {
        if (localStorage.getItem("isLoggedIn")) {
            window.location.href = "index.html"; // Redirect to system
        } else {
            isLoginPage.style.display = "flex"; // Show page
        }
    }

    // --- EVENT LISTENERS ---

    // Login "Enter" Key
    const loginInputs = document.querySelectorAll("#loginBox input");
    if (loginInputs.length > 0) {
        loginInputs.forEach(input => {
            input.addEventListener("keydown", function(event) {
                if (event.key === "Enter") login();
            });
        });
    }

    // Search Box "Enter" Key
    const searchBox = document.getElementById("searchBox");
    if (searchBox) {
        searchBox.addEventListener("keydown", function(e) {
            if (e.key === "Enter") {
                this.value.trim() === "" ? restoreMenu() : searchPDF();
            } else if (e.key === "Escape") {
                this.value = "";
                restoreMenu();
            }
        });
        
        searchBox.addEventListener("input", function () {
            if (this.value.trim() === "") restoreMenu();
        });
    }
});

/* ============================
   3. FUNCTIONS
   ============================ */

/* --- MENU BUILDER (THE MISSING PART) --- */
function buildMenu() {
    const container = document.getElementById("menuContainer");
    if (!container) return;
    container.innerHTML = ""; // Clear existing
    buildMenuRecursive(areaContent, container);
}

function buildMenuRecursive(items, container) {
    if (!items || items.length === 0) return;

    const ul = document.createElement("ul");
    // Only hide sub-menus (inside folders), but keep the main list visible
    if (container.id !== "menuContainer") {
        ul.style.display = "none"; 
    }

    items.forEach(item => {
        const li = document.createElement("li");

        if (item.type === "folder") {
            // Folder Logic
            const isArea = item.title.toUpperCase().startsWith("AREA");
            const className = isArea ? "area-title" : "folder";
            
            li.innerHTML = `
                <div class="${className}" onclick="toggleFolder(this)">
                    <span class="arrow">▶</span> ${item.title}
                </div>
            `;
            if (item.children) {
                buildMenuRecursive(item.children, li);
            }

        } else if (item.type === "file") {
            // File Logic
            li.innerHTML = `
                <div class="file" data-title="${item.title}" data-type="${item.type}">
                    <a href="#" onclick="openFile(this, '${item.link}'); return false;" data-original="${item.title}">
                        ${item.title}
                    </a>
                </div>
            `;
        }
        ul.appendChild(li);
    });

    container.appendChild(ul);
}

function toggleFolder(element) {
    const nextUl = element.nextElementSibling; // The <ul> containing children
    const arrow = element.querySelector(".arrow");
    
    if (nextUl && nextUl.tagName === "UL") {
        if (nextUl.style.display === "block") {
            nextUl.style.display = "none";
            if (arrow) arrow.classList.remove("rotate");
        } else {
            nextUl.style.display = "block";
            if (arrow) arrow.classList.add("rotate");
        }
    }
}

/* --- FILE PREVIEW --- */
function openFile(element, link) {
    const iframe = document.getElementById("pdfFrame");
    if (iframe) iframe.src = link;

    const header = document.getElementById("fileTitleHeader");
    if (header) header.textContent = element.innerText;
}

/* --- SYSTEM UTILS --- */
function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("mobileOverlay");

    if (sidebar) sidebar.classList.toggle("active");
    if (overlay) overlay.classList.toggle("active");
}

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorDiv = document.getElementById("loginError");

    const validUser = accounts.find(acc => acc.username === user && acc.password === pass);

    if (validUser) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
    } else {
        errorDiv.textContent = "Invalid Username or Password";
        errorDiv.style.color = "yellow";
    }
}

function logout() {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
}

/* --- SEARCH --- */
/* --- SEARCH --- */
function searchPDF() {
    const query = document.getElementById("searchBox").value.toLowerCase();
    const files = document.querySelectorAll("#menuContainer .file");

    // If empty, reset the menu
    if (!query.trim()) {
        restoreMenu();
        return;
    }

    // 1. Hide ALL files first (Reset visibility)
    files.forEach(file => {
        file.style.display = "none";
        
        // Restore original text (remove highlights) if it exists
        const a = file.querySelector("a");
        if (a && a.hasAttribute("data-original")) {
            a.innerHTML = a.getAttribute("data-original");
        }
    });

    // 2. Loop through and find matches
    files.forEach(file => {
        const title = file.getAttribute("data-title");
        
        // FIX: Convert title to lowercase before checking!
        if (title && title.toLowerCase().includes(query)) {
            
            // Show the matching file
            file.style.display = "block";
            
            // Open the folders leading to this file
            expandParents(file);

            // Highlight the keyword
            const a = file.querySelector("a");
            const original = a.getAttribute("data-original");
            
            // Safe regex for highlighting
            const safeQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp("(" + safeQuery + ")", "gi");
            a.innerHTML = original.replace(regex, `<span class="highlight">$1</span>`);
        }
    });
}

function expandParents(element) {
    let parent = element.parentElement;
    while (parent && parent.id !== "menuContainer") {
        if (parent.tagName === "UL") {
            parent.style.display = "block";
            const folderTitle = parent.previousElementSibling; 
            if (folderTitle) {
                const arrow = folderTitle.querySelector(".arrow");
                if (arrow) arrow.classList.add("rotate");
            }
        }
        parent = parent.parentElement;
    }
}

function restoreMenu() {
    buildMenu(); // Re-render the menu to clear search state
}

