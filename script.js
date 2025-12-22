// Folder mapping for boxes (now 8)
const folderMap = {
    1: 'Qu-Pharma.svu.edu.eg',
    2: 'Qu-media.svu.edu.eg',
    3: 'Qu-medicine.svu.edu.eg',
    4: 'Qu-centre.svu.edu.eg',
    5: 'Qu-sposci.svu.edu.eg',
    6: 'Qu-science.svu.edu.eg',
    7: 'Qu-dental.svu.edu.eg',
    8: 'Qu-pt.svu.edu.eg'
}

// Box content data
const boxContent = {
    1: {
        title: 'منصة جودة كلية الصيدلة',
        meta: 'ضمان جودة التعليم الصيدلاني',
        desc: 'متابعة البرامج والمقررات والمعامل والبحوث',
        logo: 'pharma.jpg'
    },
    2: {
        title: 'منصة جودة كلية الإعلام',
        meta: 'ضمان جودة التعليم الإعلامي',
        desc: 'متابعة برامج الإعلام والصحافة والعلاقات العامة',
        logo: 'meida.jpg'
    },
    3: {
        title: 'منصة جودة كلية الطب',
        meta: 'ضمان جودة التعليم الطبي',
        desc: 'متابعة البرامج الطبية والتدريب السريري والبحوث',
        logo: 'medical.jpeg'
    },
    5: {
        title: 'منصة جودة كلية علوم رياضية',
        meta: 'ضمان جودة التعليم الرياضي',
        desc: 'متابعة برامج التربية الرياضية والتدريب الرياضي',
        logo: 'logo.png'
    },
    6: {
        title: 'منصة جودة كلية علوم',
        meta: 'ضمان جودة التعليم العلمي',
        desc: 'متابعة البرامج العلمية والمختبرات والبحوث',
        logo: 'logo.png'
    },
    7: {
        title: 'منصة جودة كلية طب الأسنان',
        meta: 'ضمان جودة التعليم السني',
        desc: 'متابعة البرامج السنية والتدريب السريري',
        logo: 'logo.png'
    },
    8: {
        title: 'منصة جودة كلية العلاج الطبيعي',
        meta: 'ضمان جودة التعليم العلاجي',
        desc: 'متابعة برامج العلاج الطبيعي والتدريب العلاجي',
        logo: 'logo.png'
    }
}

// Create 7 boxes (skip 4 because it is in HTML)
const boxesEl = document.getElementById('boxes')
const order = [1, 2, 3, 5, 7, 8, 6]
for (let i of order) {
    const box = document.createElement('div')
    box.style.cursor = 'pointer'
    box.className = 'box'
    box.setAttribute('data-box-id', i)

    const content = boxContent[i] || {
        title: `منصة كلية ${i}`,
        meta: 'منصة جودة متخصصة',
        desc: 'نظام إدارة الجودة للكلية'
    }

    box.innerHTML = `
        <div class="topRow" dir="rtl" style="justify-content: flex-start">
            <div style="text-align: right; flex: 1">
                <div class="title" style="font-size: 16px; line-height: 1.3; font-weight: 600;">${content.title}</div>
                <div class="meta" style="font-size: 12px; margin-top: 4px;">${content.meta}</div>
            </div>
            <div class="num"><img src="${content.logo || 'logo.png'}" alt="Logo" /></div>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;direction:rtl">
            <div style="font-size:13px;color:rgba(30,41,59,0.65);text-align:right;line-height:1.4;">${content.desc}</div>
            <svg class="arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
    `
    boxesEl.appendChild(box)
}

// Attach navigation handler to all boxes based on their number
document.querySelectorAll('.box').forEach((el) => {
    const idx = el.getAttribute('data-box-id') ? parseInt(el.getAttribute('data-box-id')) : null
    if (idx && folderMap[idx]) {
        el.addEventListener('click', () => { window.location.href = folderMap[idx] })
    }
})

// Counters: animate 4 stats from 0 to their target
function playCounters() {
    const counts = document.querySelectorAll('.count')
    counts.forEach((el, index) => {
        const target = parseInt(el.getAttribute('data-target')) || 0
        const obj = { val: 0 }
        // العداد الأول أسرع بشكل بسيط
        const duration = index === 0 ? 2 : 2.2
        gsap.to(obj, {
            val: target,
            duration: duration,
            ease: 'power3.out',
            onUpdate: function() {
                const num = Math.floor(obj.val).toLocaleString('en-US')
                el.textContent = index === 1 ? num + '+' : num
            }
        })
    })
}

// Optional interactive badge (if present): allow editing name by double click
const badge = document.getElementById('nameBadge')
if (badge) {
    badge.textContent = 'Gawdah'
    badge.addEventListener('dblclick', () => {
        const name = prompt('أدخل اسم العرض:', badge.textContent) || badge.textContent
        badge.textContent = name
    })
}

// Accessibility: keyboard focus styles + enter to click
document.querySelectorAll('.box').forEach((b) => {
    b.setAttribute('tabindex', '0')
    b.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') b.click()
    })
    b.addEventListener('focus', () => gsap.to(b, { scale: 1.03, duration: 0.25 }))
    b.addEventListener('blur', () => gsap.to(b, { scale: 1, duration: 0.25 }))
})

// Image error handling
const img = document.getElementById('profilePhoto')
img.onerror = () => { img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23f3f4f6"/><text x="50%" y="50%" fill="%236b7280" font-size="24" dominant-baseline="middle" text-anchor="middle">صورة غير متوفرة</text></svg>' }

// Loading screen animations
function initLoadingAnimations() {
    if (typeof gsap === 'undefined') {
        console.error('GSAP not loaded!');
        return;
    }

    const mainLogo = document.getElementById('mainLogo');
    const secondaryLogo = document.getElementById('secondaryLogo');
    const loadingText = document.getElementById('loadingText');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingScreen = document.getElementById('loading-screen');
    const skipBtn = document.getElementById('skipBtn');

    if (!mainLogo || !secondaryLogo || !loadingText || !loadingProgress || !loadingScreen) {
        console.error('Some loading elements not found!');
        return;
    }

    // Initial states
    gsap.set([mainLogo, secondaryLogo], { scale: 0, rotation: -180 });
    gsap.set(loadingText, { y: 30, opacity: 0 });

    // Main logo animation sequence
    const tl = gsap.timeline();

    tl.to(mainLogo, {
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: "back.out(1.7)",
        filter: "drop-shadow(0 12px 24px rgba(22, 163, 74, 0.4))"
    })
    .to(secondaryLogo, {
        scale: 1,
        rotation: 360,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.8")
    .to(loadingText, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
    }, "-=0.4");

    // Continuous floating animation for logos
    gsap.to(mainLogo, {
        y: -10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });

    gsap.to(secondaryLogo, {
        y: -8,
        rotation: 365,
        duration: 2.5,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
    });

    // Simple loading with progress animation
    gsap.to(loadingProgress, {
        width: "100%",
        duration: 3,
        ease: "power2.inOut",
        onComplete: () => {
            // Hide loading screen with elegant animation
            gsap.to(loadingScreen, {
                opacity: 0,
                duration: 1.2,
                ease: "power2.inOut",
                onComplete: () => {
                    loadingScreen.style.display = 'none';
                    // Start main page animations
                    startMainAnimations();
                }
            });
        }
    });

    // Skip button: immediately end splash and show main app
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            try {
                gsap.killTweensOf(loadingProgress)
            } catch (e) { /* ignore */ }
            if (loadingScreen) {
                gsap.to(loadingScreen, { opacity: 0, duration: 0.35, onComplete() { loadingScreen.style.display = 'none' } })
            }
            startMainAnimations();
        })
    }
}

function startMainAnimations() {
    // Show the main content
    const wrap = document.querySelector('.wrap');
    if (wrap) {
        wrap.classList.add('loaded');
    }

    // Original animations
    gsap.from('#mainCard', { duration: 0.8, y: 20, opacity: 0, ease: 'power2.out' });
    gsap.from('.top', { duration: 0.6, y: 10, opacity: 0, delay: 0.2 });
    gsap.from('.stats', { duration: 0.6, y: 10, opacity: 0, delay: 0.4 });
    gsap.from('.box', { duration: 0.6, y: 10, opacity: 0, stagger: 0.1, delay: 0.6 });

    // Start counters
    try { playCounters() } catch (e) { /* ignore if missing */ }
}

// START ANIMATIONS IMMEDIATELY
initLoadingAnimations();

// Fallback: hide loading screen after 5 seconds if not hidden
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.display = 'none';
        startMainAnimations();
    }
}, 5000);
