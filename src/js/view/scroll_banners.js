'use strict';

const scrollContainer = document.querySelector('.scroll-container');
const dots = document.querySelectorAll('.dot');

scrollContainer.addEventListener('scroll', () => {
  const cardWidth = scrollContainer.children[0].clientWidth;
  const scrollLeft = scrollContainer.scrollLeft;

  const activeIndex = Math.round(scrollLeft / cardWidth);
  setActiveDot(activeIndex);
});

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    scrollToCard(index);
  });
});

function setActiveDot(index) {
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function scrollToCard(index) {
  const cardWidth = scrollContainer.children[0].clientWidth;
  scrollContainer.scroll({
    left: cardWidth * index,
    behavior: 'smooth',
  });
}
