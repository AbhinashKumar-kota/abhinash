document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.media-image, .profile-photo').forEach((image) => {
    const markReady = () => image.classList.add('image-ready');
    const markMissing = () => image.classList.add('image-missing');

    image.addEventListener('load', markReady);
    image.addEventListener('error', markMissing);

    if (image.complete) {
      (image.naturalWidth > 0 ? markReady : markMissing)();
    }
  });

  const imageDialog = document.createElement('dialog');
  imageDialog.className = 'image-modal';
  const closeButton = document.createElement('button');
  closeButton.className = 'image-modal-close';
  closeButton.type = 'button';
  closeButton.setAttribute('aria-label', 'Close enlarged image');
  closeButton.textContent = 'x';
  const enlargedImage = document.createElement('img');
  enlargedImage.className = 'image-modal-content';
  imageDialog.append(closeButton, enlargedImage);
  document.body.append(imageDialog);

  const closeImage = () => imageDialog.close();
  closeButton.addEventListener('click', closeImage);
  imageDialog.addEventListener('click', (event) => {
    if (event.target === imageDialog) closeImage();
  });

  document.querySelectorAll('.media-image, .profile-photo').forEach((image) => {
    image.classList.add('zoomable-image');
    image.addEventListener('click', () => {
      if (image.naturalWidth === 0) return;
      enlargedImage.src = image.currentSrc || image.src;
      enlargedImage.alt = image.alt;
      imageDialog.showModal();
    });
  });
});
