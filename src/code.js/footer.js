let Modal = document.querySelector('#modal'), 
  ModalContentBlock = Modal.querySelector('.footer-modal__block'), 
  ModalContent;

document.addEventListener('click', function(e) { 
  if(e.target.tagName === 'A') { 
    ModalContent = document.querySelector(e.target.getAttribute('href')) || false; 

    if(ModalContent !== false 
    && ModalContent.classList.contains('footer-modal__content')) {
      e.preventDefault(); 
    

      document.body.style.overflow = 'hidden'; 
      ModalContentBlock.append(...ModalContent.children);
      Modal.style.display = 'block'; 
    } else ModalContent = '';
  }

  
  if(Modal.contains(e.target) && e.target !== ModalContentBlock && !ModalContentBlock.contains(e.target) 
  || e.target.classList.contains('--modal__close')) { 
    document.body.style.overflow = ''; 
    Modal.style.display = ''; 
    if(ModalContent) ModalContent.append(...ModalContentBlock.children); 
  }
});
