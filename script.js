document.addEventListener('DOMContentLoaded', function() {
            
    let portfolioData = {}; // Variable to store fetched data

    // --- Page Content Population ---
    function populateContent() {
        const { personalInfo, skills, portfolio, certificates } = portfolioData;

        // Home Page
        document.getElementById('home').innerHTML = `
            <div class="max-w-4xl mx-auto">
                <h1 class="text-4xl md:text-6xl font-bold text-white leading-tight">
                    <span class="text-gradient">${personalInfo.name}</span>
                    <span class="text-white">${personalInfo.nickname}</span>
                </h1>
                <p id="typewriter" class="mt-4 text-lg md:text-xl text-gray-300 min-h-[56px] md:min-h-[28px]"></p>
                <p class="mt-2 text-md text-gray-400">วันเกิด : ${personalInfo.birthdate}</p>
                <a href="#" data-page="portfolio" class="nav-link mt-8 inline-block bg-indigo-600 text-white font-semibold py-3 px-8 mr-5 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    ดูรางวัลของผม
                </a>
                <a href="#" data-page="certificates" class="nav-link mt-8 inline-block bg-indigo-600 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300 cursor-pointer">
                    ดูรางวัลของผม
                </a>
            </div>`;

        // Skills Page
        document.getElementById('skills-container').innerHTML = skills.map(skill => `
            <div class="glassmorphism p-8 rounded-xl card-glow transition-all duration-300">
                <h3 class="text-2xl font-semibold text-white mb-6 flex items-center"><i class="${skill.icon} mr-3 text-indigo-400"></i>${skill.category}</h3>
                <div class="flex flex-wrap gap-4">${skill.items.map(item => `<span class="skill-tag text-lg font-medium py-2 px-4 rounded-lg cursor-pointer">${item}</span>`).join('')}</div>
            </div>`).join('');

        // Portfolio Page
        document.getElementById('portfolio-container').innerHTML = portfolio.map(item => {
            const fileButton = item.file 
                ? `<a href="${item.file}" download class="inline-block bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition cursor-pointer"><i class="fas fa-download mr-2"></i>ดาวน์โหลด</a>` 
                : '';
            
            const linkButton = item.link 
                ? `<a href="${item.link}" target="_blank" rel="noopener noreferrer" class="inline-block ${item.file ? 'ml-2' : ''} bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition cursor-pointer"><i class="fas fa-external-link-alt mr-2"></i>ดูโปรเจค</a>` 
                : '';

            return `
            <div class="glassmorphism rounded-xl overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300 card-glow">
                 <div class="p-6 text-center">
                    <h3 class="text-xl font-bold text-white">${item.title}</h3>
                    <p class="text-gray-300 mt-2">${item.description}</p>
                    <div class="mt-4">
                        ${fileButton}${linkButton}
                    </div>
                </div>
            </div>`;
        }).join('');

        // Certificates Page
        document.getElementById('certificates-container').innerHTML = certificates.map(cert => `
            <a href="${cert.image}" target="_blank" class="block glassmorphism rounded-xl overflow-hidden group cursor-pointer card-glow transition-all duration-300">
                <img src="${cert.image}" alt="เกียรติบัตร ${cert.title}" class="w-full h-48 object-contain group-hover:opacity-75 transition-opacity bg-black bg-opacity-20" onerror="this.onerror=null;this.src='https://placehold.co/400x300/1f2937/d1d5db?text=Image+Not+Found';">
                <div class="p-4 text-center"><h3 class="font-semibold text-white">${cert.title}</h3><p class="text-sm text-gray-400">${cert.award}</p></div>
            </a>`).join('');

        // Contact Page
        document.getElementById('contact-container').innerHTML = `
            <div class="max-w-2xl mx-auto glassmorphism p-8 rounded-xl card-glow transition-all duration-300">
                <p class="text-lg text-gray-300 mb-6 cursor-help">สนใจร่วมงานหรือต้องการสอบถามเพิ่มเติม</p>
                <div class="space-y-4 text-left">
                    <div class="flex items-center text-lg"><i class="fas fa-envelope w-6 mr-4 text-indigo-400"></i><a href="mailto:${personalInfo.contact.email}" class="hover:text-indigo-400 transition cursor-pointer">${personalInfo.contact.email}</a></div>
                    <div class="flex items-center text-lg"><i class="fas fa-phone w-6 mr-4 text-indigo-400"></i><a href="tel:${personalInfo.contact.phone.replace(/[^\d+]/g, '')}" class="hover:text-indigo-400 transition cursor-pointer">${personalInfo.contact.phone}</a></div>
                    <div class="flex items-center text-lg"><i class="fab fa-facebook w-6 mr-4 text-indigo-400"></i><a href="${personalInfo.contact.facebook}" target="_blank" rel="noopener noreferrer" class="hover:text-indigo-400 transition cursor-pointer">${personalInfo.contact.facebookHandle}</a></div>
                </div>
            </div>`;

        // Footer
        document.getElementById('footer-text').innerHTML = `&copy; ${new Date().getFullYear()} ${personalInfo.name}. All Rights Reserved.`;
    }

    let used = false;
    
    // --- Typewriter Effect ---
    function startTypewriter() {
        if (used === true) return;
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;
        const textToType = portfolioData.personalInfo.tagline;
        let i = 0;
        typewriterElement.innerHTML = ''; // Clear before typing
        used = true;
        function typeWriter() {
            if (i < textToType.length) {
                typewriterElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 80);
            }
        }
        setTimeout(typeWriter, 500);
    }

    const pages = document.querySelectorAll('.page');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- Page Switching Logic ---
    function showPage(pageId) {
        pages.forEach(page => page.classList.toggle('hidden', page.id !== pageId));
        if (pageId === 'home') startTypewriter();
        window.scrollTo(0, 0);
    }
    
    // --- Event Listeners ---
    function setupEventListeners() {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const pageId = link.getAttribute('data-page');
                if (pageId) {
                    showPage(pageId);
                    mobileMenu.classList.add('hidden');
                }
            });
        });
        document.getElementById('mobile-menu-button').addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Main App Initialization ---
    async function initializeApp() {
        try {
            // Fetch data from the external JSON file
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            portfolioData = await response.json();
            
            // Once data is loaded, populate content and set up the app
            populateContent();
            setupEventListeners();
            showPage('home');
            
            // Initialize Particles.js
            particlesJS('particles-js', { "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#4f46e5" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#818cf8", "opacity": 0.2, "width": 1 }, "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false } } }, "retina_detect": true });

        } catch (error) {
            console.error('Failed to initialize app:', error);
            document.getElementById('main-content').innerHTML = `
                <div class="text-center text-red-400 py-20">
                    <h2 class="text-2xl font-bold">เกิดข้อผิดพลาด</h2>
                    <p>ไม่สามารถโหลดข้อมูล Portfolio ได้ กรุณาตรวจสอบว่าไฟล์ data.json อยู่ในตำแหน่งที่ถูกต้องและลองอีกครั้ง</p>
                </div>`;
        }
    }

    initializeApp();
});