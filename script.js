/* LOGIN ACCOUNTS */
const accounts = [
    { username: "admin", password: "12345" },
    { username: "teacher", password: "pass123" },
    { username: "student", password: "student1" }
];

/* ------------------------------------------
   LESSON DATA (USE THIS TO ADD ALL FILES)
-------------------------------------------*/

const modules = [
    {
        
        title: "Module 1 – Introduction",
        id: "m1",
        groups: [
            {
                
                title: "Lesson Group A",
                id: "m1a",
                lessons: [
                    {
                        title: "Lesson 1 – Overview (PDF)",
                        type: "pdf",
                        link: "https://drive.google.com/file/d/1Osh8K9S9tQ9jLMhTyTDwAGbpxLJNc1R2/preview"
                    },
                    {
                        title: "Lesson 2 – Video Intro (Google Drive)",
                        type: "video",
                        link: "https://drive.google.com/file/d/1oM5-TrrAYdusd6bBpoCQQekcchJ2nEfK/preview"
                    }                   
                ]
            },
            {
                title: "Lesson Group B",
                id: "m1b",
                lessons: [
                    {
                        title: "Activity 1 – Worksheet",
                        type: "pdf",
                        link: "https://drive.google.com/file/d/1FnBNnr_krvu9bl4v3698eWVsh2H_F-cC/preview"
                    },
                    {
                        title: "Activity 2 – Reference",
                        type: "pdf",
                        link: "https://drive.google.com/file/d/1GkboaVINDtL4VvXeIY3g7L92fiJUmZh5/preview"
                    }
                ]
            }
        ],
        
        
    },

    {
        title: "Module 2 – ICT Fundamentals",
        id: "m2",
        groups: [
            {
                title: "Lessons",
                id: "m2a",
                lessons: [
                    {
                        title: "Lesson 1 – ICT Concepts (PDF)",
                        type: "pdf",
                        link: "https://drive.google.com/file/d/1QqXekV_Dv2Q3WnQi7VM43o-mA0jA-wtE/preview"
                    }
                ]
            }
        ]
    }
];

/* ------------------------------------------
   BUILD MENU DYNAMICALLY
-------------------------------------------*/

function buildMenu() {
    const container = document.getElementById("menuContainer");
    container.innerHTML = "";

    modules.forEach(module => {
        // MODULE TITLE
        container.innerHTML += `
            <div class="menu-group" onclick="toggleMenu('${module.id}')">${module.title}</div>
            <ul id="${module.id}" class="submenu"></ul>
        `;

        // NESTED GROUPS
        const moduleUL = document.getElementById(module.id);

        module.groups.forEach(group => {
            moduleUL.innerHTML += `
                <li class="nested-title" onclick="toggleMenu('${group.id}'); event.stopPropagation();">▶ ${group.title}</li>
                <ul id="${group.id}" class="submenu nested"></ul>
            `;

            const groupUL = document.getElementById(group.id);

            // LESSONS
            group.lessons.forEach(lesson => {
                const loadAction = lesson.type === "video" 
                    ? `loadPDF('${lesson.link}')`  // Google Drive video preview
                    : `loadPDF('${lesson.link}')`;

                groupUL.innerHTML += `
                    <li onclick="highlightMenu(this)">
                        <a onclick="${loadAction}">${lesson.title}</a>
                    </li>
                `;
            });
        });
    });
}

/* ------------------------------------------
   PAGE LOGIC
-------------------------------------------*/

function login() {
    let user = document.getElementById("username").value.trim();
    let pass = document.getElementById("password").value.trim();

    let found = accounts.find(acc => acc.username === user && acc.password === pass);

    if (found) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("systemPage").style.display = "flex";
    } else {
        document.getElementById("loginError").textContent = "Invalid username or password";
    }
}

/* Show PDF / Google Drive video */
function loadPDF(url) {
    document.getElementById("pdfFrame").src = url;
    if (window.innerWidth < 768) toggleSidebar();
}

function toggleMenu(id) {
    const menu = document.getElementById(id);
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function highlightMenu(element) {
    document.querySelectorAll(".submenu li")
        .forEach(li => li.classList.remove("active-menu"));
    element.classList.add("active-menu");
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

/* BUILD MENU WHEN PAGE LOADS */
window.onload = buildMenu;
