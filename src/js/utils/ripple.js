'use strict';

export const ripple = function (rippleElem) {
  rippleElem.addEventListener('pointerdown', function (e) {
    e.stopImmediatePropagation();

    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    this.appendChild(ripple);

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
    const rippleSize = Math.max(this.clientWidth, this.clientHeight);

    // Calculate the offsetX and offsetY based on touch or mouse event
    let offsetX, offsetY;
    if (e.type === 'touchstart') {
      offsetX = e.touches[0].pageX - this.getBoundingClientRect().left;
      offsetY = e.touches[0].pageY - this.getBoundingClientRect().top;
    } else {
      offsetX = e.pageX - this.getBoundingClientRect().left;
      offsetY = e.pageY - this.getBoundingClientRect().top;
    }

    // If it's not an icon button, position the ripple effect centered at the pointer press
    if (!iconButton) {
      ripple.style.top = `${e.layerY}px`;
      ripple.style.left = `${e.layerX}px`;
      ripple.style.width = `${rippleSize}px`;
      ripple.style.height = `${rippleSize}px`;
    }
  });
};
