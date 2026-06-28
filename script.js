// ================= Image Slider Logic =================
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }
    
    slides[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

setInterval(() => {
    changeSlide(1);
}, 5000);

// ================= Initialize AOS Animation =================
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
    });
});

// ================= Initialize Typed.js (ปรับเหลือคำว่า UX/UI Designer ตามบรีฟ) =================
if(document.getElementById('typed-text')) {
    var typed = new Typed('#typed-text', {
        strings: ['UX/UI Designer'],
        typeSpeed: 80,   // ความเร็วในการพิมพ์ (80ms กำลังสมูทพอดีค่ะ)
        loop: false,     // ไม่ต้องวนลูปคำอื่น พิมพ์คำนี้คำเดียวเท่ๆ คลีนๆ เลยค่ะ
        showCursor: true,
        cursorChar: '_'  // เปลี่ยน Cursor เป็นขีดล่างเท่ๆ แนวดีไซเนอร์สไตล์โค้ดดิ้ง
    });
}