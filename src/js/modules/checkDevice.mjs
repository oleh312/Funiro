const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i)
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i)
  },
  IOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i)
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i)
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i)
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.IOS() ||
      isMobile.Opera() ||
      isMobile.Windows());
  }
}

const checkDevice = (arrows) => {
  if (isMobile.any()) {
    document.body.classList.add('_touch')
    if (arrows.length > 0) {
      for (let index = 0; index < arrows.length; index++) {
        const menuArrow = arrows[index];
        menuArrow.onclick = (() => {
          menuArrow.parentElement.classList.toggle('_active')
        })

      }
    }
  } else {
    document.body.classList.add('_pc')
  }
}

export { checkDevice }