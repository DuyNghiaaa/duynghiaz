const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const imagesPerView = 6; // Số ảnh hiển thị trong một khung
let currentIndex = 0;
const imageWidth = images[0].offsetWidth + 20; // Tính kích thước ảnh (kèm khoảng cách giữa các ảnh)

// Tự động chuyển ảnh
const autoSlide = () => {
    currentIndex = (currentIndex + 1) % (images.length - imagesPerView + 1); // Lặp lại khi đến cuối
    updateCarousel();
};
let autoSlideInterval = setInterval(autoSlide, 3000); // Tự động mỗi 3 giây

// Cập nhật vị trí carousel
const updateCarousel = () => {
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
};

// Kéo hình ảnh
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

const startDrag = (e) => {
    isDragging = true;
    startX = getPositionX(e);
    track.style.transition = 'none'; // Tắt hiệu ứng khi kéo
    clearInterval(autoSlideInterval); // Tạm dừng tự động chạy khi kéo
};

const drag = (e) => {
    if (!isDragging) return;
    const currentX = getPositionX(e);
    currentTranslate = prevTranslate + currentX - startX;
    track.style.transform = `translateX(${currentTranslate}px)`;
};

const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;

    const movedBy = currentTranslate - prevTranslate;

    // Chuyển ảnh khi kéo đủ khoảng cách
    if (movedBy < -50 && currentIndex < images.length - imagesPerView) currentIndex++;
    if (movedBy > 50 && currentIndex > 0) currentIndex--;

    updateCarousel();
    prevTranslate = -currentIndex * imageWidth;

    // Khởi động lại tự động chạy
    autoSlideInterval = setInterval(autoSlide, 3000);
};

// Lấy vị trí X của chuột hoặc cảm ứng
const getPositionX = (e) => (e.type.includes('mouse') ? e.pageX : e.touches[0].clientX);

// Thêm sự kiện kéo
track.addEventListener('mousedown', startDrag);
track.addEventListener('mousemove', drag);
track.addEventListener('mouseup', endDrag);
track.addEventListener('mouseleave', endDrag);
track.addEventListener('touchstart', startDrag);
track.addEventListener('touchmove', drag);
track.addEventListener('touchend', endDrag);



//////////////////////////////////////
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) { // Nếu người dùng cuộn hơn 50px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
