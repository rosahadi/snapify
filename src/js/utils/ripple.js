'use strict';

export const ripple = function (rippleElem) {
  rippleElem.addEventListener('pointerdown', function (e) {
    e.stopImmediatePropagation();

    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    rippleElem.appendChild(ripple);

    const removeRipple = function () {
      ripple.animate({ opacity: 0 }, { fill: 'forwards', duration: 200 });

      setTimeout(() => {
        ripple.remove();
      }, 1000);
    };

    this.addEventListener('pointerup', removeRipple);
    this.addEventListener('pointerleave', removeRipple);

    // Check if the element has the 'icon-btn' class
    const iconButton = this.classList.contains('icon-btn');

    // Calculate the size of the ripple effect based on the container's dimensions
    const rippleSize = Math.max(
      rippleElem.clientWidth,
      rippleElem.clientHeight
    );

    // Calculate the offsetX and offsetY based on touch or mouse event
    let offsetX, offsetY;
    if (e.type === 'touchstart') {
      offsetX = e.touches[0].pageX - rippleElem.getBoundingClientRect().left;
      offsetY = e.touches[0].pageY - rippleElem.getBoundingClientRect().top;
    } else {
      offsetX = e.pageX - rippleElem.getBoundingClientRect().left;
      offsetY = e.pageY - rippleElem.getBoundingClientRect().top;
    }

    // If it's not an icon button, position the ripple effect centered at the pointer press
    if (!iconButton) {
      ripple.style.top = `${offsetY - rippleSize / 2}px`;
      ripple.style.left = `${offsetX - rippleSize / 2}px`;
      ripple.style.width = `${rippleSize}px`;
      ripple.style.height = `${rippleSize}px`;
    }
  });
};
