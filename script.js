// Folder mapping for boxes (now 8)
const folderMap = {
    1: 'https://qu-pharma.gawdah.org/app/',
    2: 'https://qu-media.gawdah.org/app/',
    3: 'https://qu-medicine.gawdah.org/app/',
    4: 'http://qu-centre.gawdah.org/',
    5: 'https://qu-sposci.gawdah.org/app/',
    6: 'https://qu-science.gawdah.org/app/',
    7: 'https://qu-dental.gawdah.org/app/',
    8: 'https://qu-pt.gawdah.org/app/'
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
for (let i = 1; i <= 8; i++) {
        if (i === 4) continue // large card is static in HTML
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

// Apply VanillaTilt to photo and boxes for parallax tilt
VanillaTilt.init(document.querySelectorAll('.photo'), {
    max: 12,
    speed: 400,
    glare: true,
    "max-glare": 0.15
})
VanillaTilt.init(document.querySelectorAll('.box'), {
    max: 10,
    speed: 400,
    glare: false,
    scale: 1.03
})

// GSAP entrance animations
const xDir = document.documentElement.dir === 'rtl' ? 20 : -20
gsap.from('#mainCard', { duration: 1.1, y: 20, opacity: 0, ease: 'power3.out' })
gsap.from('.photo', { duration: 1.2, x: xDir, opacity: 0, delay: 0.15, ease: 'elastic.out(1,0.6)' })
gsap.from('.logo-box', { duration: 1.2, x: -xDir, opacity: 0, delay: 0.2, ease: 'elastic.out(1,0.6)' })
gsap.from('.intro h1', { duration: 1, x: xDir, opacity: 0, delay: 0.25, ease: 'power3.out' })
gsap.from('.intro p', { duration: 0.9, y: 10, opacity: 0, delay: 0.35 })

// stagger boxes
gsap.from('.box', { duration: 0.9, y: 18, opacity: 0, stagger: { each: 0.06 }, delay: 0.45, ease: 'back.out(1.3)' })

// hover pulse using small GSAP timeline on mouseenter/mouseleave
document.querySelectorAll('.box').forEach((el) => {
    el.addEventListener('mouseenter', () => {
        gsap.to(el, { scale: 1.04, duration: 0.35, ease: 'power2.out' })
    })
    el.addEventListener('mouseleave', () => {
        gsap.to(el, { scale: 1, duration: 0.45, ease: 'elastic.out(1,0.6)' })
    })

    // click action: quick bounce + ripple effect
    el.addEventListener('click', () => {
        gsap.fromTo(el, { y: -6 }, { y: 0, duration: 0.5, ease: 'bounce.out' })
    })
})



// Cinematic name animation: letter-by-letter using mo.js (runs once after loader)
const nameContainer = document.getElementById('nameBadge');
const NAME = 'Gawdah'.split('');
const letters = [];

NAME.forEach((ch) => {
    const span = document.createElement('span');
    span.className = 'neon-letter';
    span.textContent = ch;
    span.style.opacity = '0';
    nameContainer.appendChild(span);
    letters.push(span);
});

function explodeLetter(letter) {
    const burst = new mojs.Burst({
        parent: letter,
        radius: { 0: 70 },
        count: 12,
        angle: { 0: 180 },
        children: {
            shape: 'polygon',
            points: 5,
            radius: { 6: 0 },
            fill: ['#8b5cf6', '#06b6d4', '#f97316'],
            duration: 1300,
            easing: 'cubic.out'
        }
    });
    burst.play();
}

function playCinematicName() {
    letters.forEach((l, i) => {
        gsap.to(l, {
            opacity: 1,
            y: [20, 0],
            scale: [0.4, 1],
            duration: 0.9,
            delay: 0.35 + i * 0.25,
            ease: 'expo.out',
            onStart: () => explodeLetter(l)
        });
    });
}

window.addEventListener('name:play', playCinematicName);

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

// Small interactive badge: allow editing name by double click
const badge = document.getElementById('nameBadge')
badge.addEventListener('dblclick', () => {
    const name = prompt('أدخل اسم العرض:', badge.textContent) || badge.textContent
    badge.textContent = name
})

// Accessibility: keyboard focus styles + enter to click
document.querySelectorAll('.box').forEach((b) => {
    b.setAttribute('tabindex', '0')
    b.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') b.click()
    })
    b.addEventListener('focus', () => gsap.to(b, { scale: 1.03, duration: 0.25 }))
    b.addEventListener('blur', () => gsap.to(b, { scale: 1, duration: 0.25 }))
})

// If image fails to load, show placeholder
const img = document.getElementById('profilePhoto')
img.onerror = () => { img.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600"><rect width="100%" height="100%" fill="%23071a2a"/><text x="50%" y="50%" fill="%23fff" font-size="36" dominant-baseline="middle" text-anchor="middle">أضف me.jpg بجانب هذا الملف</text></svg>' }

// Add breathing glow to photo
document.querySelector('.photo').classList.add('breathing-glow')



// Floating particles from boxes on hover
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('mouseenter', () => {
        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div')
                particle.className = 'particle'
                const rect = box.getBoundingClientRect()
                particle.style.left = (rect.left + Math.random() * rect.width) + 'px'
                particle.style.top = rect.bottom + 'px'
                particle.style.background = ['#8b5cf6', '#06b6d4', '#f97316'][Math.floor(Math.random() * 3)]
                document.body.appendChild(particle)
                setTimeout(() => particle.remove(), 4000)
            }, i * 200)
        }
    })
})

// Auto-animate boxes periodically
setInterval(() => {
    const all = document.querySelectorAll('.box')
    const randomBox = all[Math.floor(Math.random() * all.length)]
    if (randomBox) gsap.to(randomBox, { y: -3, duration: 0.3, yoyo: true, repeat: 1, ease: 'power2.out' })
}, 8000)

// Parallax scroll effect for blobs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset
    const blobs = document.querySelectorAll('.blob')
    blobs.forEach((blob, i) => {
        const speed = 0.5 + i * 0.2
        blob.style.transform = `translateY(${scrolled * speed}px)`
    })
})

// Apply VanillaTilt to logo box
VanillaTilt.init(document.querySelectorAll('.logo-box'), {
    max: 12,
    speed: 400,
    glare: true,
    "max-glare": 0.15
})

// Add breathing glow to logo box
document.querySelector('.logo-box').classList.add('breathing-glow')


// MOBILE DETECTION AND BLOCK
function checkScreenSize() {
    if (window.innerWidth < 768) {
        document.getElementById('mobileBlock').style.display = 'block'
        document.getElementById('app').style.display = 'none'
    } else {
        document.getElementById('mobileBlock').style.display = 'none'
        document.getElementById('app').style.display = 'flex'
    }
}
checkScreenSize()
window.addEventListener('resize', checkScreenSize)

// START ANIMATIONS ON LOAD
window.addEventListener('load', () => {
    window.dispatchEvent(new Event('name:play'));
    // start counters after load
    try { playCounters() } catch (e) { /* ignore if missing */ }
})
