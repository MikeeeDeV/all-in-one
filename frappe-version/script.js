frappe.ready(() => {
    const folderMap = {
        1: 'https://Qu-Pharma.svu.edu.eg',
        2: 'https://Qu-media.svu.edu.eg',
        3: 'https://Qu-medicine.svu.edu.eg',
        4: 'https://Qu-centre.svu.edu.eg',
        5: 'https://Qu-sposci.svu.edu.eg',
        6: 'https://Qu-science.svu.edu.eg',
        7: 'https://Qu-dental.svu.edu.eg',
        8: 'https://Qu-pt.svu.edu.eg'
    };

    const boxContent = {
        1: {
            title: 'منصة جودة كلية الصيدلة',
            meta: 'ضمان جودة التعليم الصيدلاني',
            desc: 'متابعة البرامج والمقررات والمعامل والبحوث',
            logo: '/files/pharma.jpg'
        },
        2: {
            title: 'منصة جودة كلية الإعلام',
            meta: 'ضمان جودة التعليم الإعلامي',
            desc: 'متابعة برامج الإعلام والصحافة والعلاقات العامة',
            logo: '/files/meida.jpg'
        },
        3: {
            title: 'منصة جودة كلية الطب',
            meta: 'ضمان جودة التعليم الطبي',
            desc: 'متابعة البرامج الطبية والتدريب السريري والبحوث',
            logo: '/files/medical.jpeg'
        },
        5: {
            title: 'منصة جودة كلية علوم رياضية',
            meta: 'ضمان جودة التعليم الرياضي',
            desc: 'متابعة برامج التربية الرياضية والتدريب الرياضي',
            logo: '/files/logo.png'
        },
        6: {
            title: 'منصة جودة كلية علوم',
            meta: 'ضمان جودة التعليم العلمي',
            desc: 'متابعة البرامج العلمية والمختبرات والبحوث',
            logo: '/files/logo.png'
        },
        7: {
            title: 'منصة جودة كلية طب الأسنان',
            meta: 'ضمان جودة التعليم السني',
            desc: 'متابعة البرامج السنية والتدريب السريري',
            logo: '/files/logo.png'
        },
        8: {
            title: 'منصة جودة كلية العلاج الطبيعي',
            meta: 'ضمان جودة التعليم العلاجي',
            desc: 'متابعة برامج العلاج الطبيعي والتدريب العلاجي',
            logo: '/files/logo.png'
        }
    };

    const boxesEl = document.getElementById('boxes');
    const order = [1, 2, 3, 5, 7, 8, 6];

    order.forEach(i => {
        const box = document.createElement('div');
        box.className = 'gawdah-box';
        box.setAttribute('data-box-id', i);
        box.setAttribute('tabindex', '0');

        const content = boxContent[i] || {
            title: `منصة كلية ${i}`,
            meta: 'منصة جودة متخصصة',
            desc: 'نظام إدارة الجودة للكلية',
            logo: '/files/logo.png'
        };

        box.innerHTML = `
            <div class="topRow" dir="rtl" style="justify-content: flex-start">
                <div style="text-align: right; flex: 1">
                    <div class="title" style="font-size: 16px; line-height: 1.3; font-weight: 600;">${content.title}</div>
                    <div class="meta" style="font-size: 12px; margin-top: 4px;">${content.meta}</div>
                </div>
                <div class="num"><img src="${content.logo}" alt="Logo" /></div>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;direction:rtl">
                <div style="font-size:13px;color:rgba(30,41,59,0.65);text-align:right;line-height:1.4;">${content.desc}</div>
                <svg class="arrow" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
        `;
        boxesEl.appendChild(box);
    });

    document.querySelectorAll('.gawdah-box').forEach(el => {
        const idx = el.getAttribute('data-box-id') ? parseInt(el.getAttribute('data-box-id')) : null;
        
        if (idx && folderMap[idx]) {
            el.addEventListener('click', () => {
                window.location.href = folderMap[idx];
            });

            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = folderMap[idx];
                }
            });
        }
    });

    function playCounters() {
        const counts = document.querySelectorAll('.count');
        counts.forEach((el, index) => {
            const target = parseInt(el.getAttribute('data-target')) || 0;
            let current = 0;
            const increment = target / 50;
            const duration = index === 0 ? 2000 : 2200;
            const stepTime = duration / 50;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                const num = Math.floor(current).toLocaleString('en-US');
                el.textContent = index === 1 ? num + '+' : num;
            }, stepTime);
        });
    }

    playCounters();
});
