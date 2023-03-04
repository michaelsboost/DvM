let appJSON = {
  theme: false
}

const app = {
  importJS: url => {
    let script = document.createElement('script')
    script.src = url
    script.setAttribute('defer', '')
    document.head.appendChild(script)
  },

  // zooming and panning function
  initZoomPan: () => {
    // variables
    const userDevice    = document.querySelector('[data-device]')
    let canvas          = document.querySelector('[data-canvas]')
    let canvasH         = parseFloat(canvas.clientHeight)
    let canvasW         = parseFloat(canvas.clientWidth / 2)
  
    // init panzoom
    let instance = panzoom(canvas, {
      bounds: true,
      boundsPadding: 0.1
    })
  
    let centerCanvas = () => {
      let canvas          = document.querySelector('[data-canvas]')
      let canvasH         = parseFloat(canvas.clientHeight)
      let canvasW         = parseFloat(canvas.clientWidth / 2)
      canvasW = parseFloat(canvas.clientWidth)
      canvasH = parseFloat(canvas.clientHeight)
  
      // detect if canvas is in portrait mode
      if (canvasW < canvasH) {
        // ratio for zoom
        let zoomRatio = 0.75
      
        // to center the canvas horizontally we first need to...
        // get half the body & canvas's width
        let bodyW   = parseFloat(canvas.parentElement.clientWidth / 2)
        canvasW = parseFloat(canvas.clientWidth / 2)
        // then add them together
        let initialXPos = parseFloat(parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio)
      
        // to center the canvas vertically we first need to...
        // get the size of both the body and the canvas
        let bodyH   = parseFloat(canvas.parentElement.clientHeight)
        bodyH   = bodyH / 2
        canvasH = canvasH / 2
        // then add them together
        let initialYPos = parseFloat(parseFloat(canvasH) - parseFloat(bodyH) * zoomRatio)
      
        // set initial zoom
        instance.zoomAbs(
          initialXPos, // initial x position
          initialYPos, // initial y position
          zoomRatio // initial zoom
        )
        instance.moveTo(initialXPos, initialYPos)
        return false
      }
  
      // ratio for zoom
      let zoomRatio = 0.75
  
      // to center the canvas horizontally we first need to...
      // get half the body & canvas's width
      let bodyW   = parseFloat(canvas.parentElement.clientWidth / 2)
      canvasW = parseFloat(canvas.clientWidth / 2)
      // then add them together
      let initialXPos = parseFloat(parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio)
  
      // to center the canvas vertically we first need to...
      // get the size of both the body and the canvas
      let bodyH   = parseFloat(canvas.parentElement.clientHeight)
      bodyH   = bodyH / 2
      canvasH = canvasH / 2
      // then add them together
      let initialYPos = parseFloat(parseFloat(bodyH) - parseFloat(canvasH) * zoomRatio)
  
      // set initial zoom
      instance.zoomAbs(
        initialXPos, // initial x position
        initialYPos, // initial y position
        zoomRatio // initial zoom
      )
      instance.moveTo(initialXPos, initialYPos)
    }
    centerCanvas()
  
    // enable disable zoom/pan
    const zoomIcon = document.querySelector('[data-zoom]')
    zoomIcon.onclick = () => {
      if (zoomIcon.getAttribute('data-zoom') === 'true') {
        canvas.selection = false
        instance.pause()
        zoomIcon.innerHTML = '<i class="fa fa-light fa-magnifying-glass-minus"></i>'
        zoomIcon.setAttribute('data-zoom', false)
        fill.classList.add('hidden')
      } else {
        canvas.selection = true
        instance.resume()
        zoomIcon.innerHTML = '<i class="fa fa-light fa-magnifying-glass-plus"></i>'
        zoomIcon.setAttribute('data-zoom', true)
        fill.classList.remove('hidden')
      }
    }
  
    // rotate canvas
    rotate.onclick = () => {
      canvasW = parseFloat(canvas.clientWidth)
      canvasH = parseFloat(canvas.clientHeight)
  
      canvas.style.width  = canvasH + 'px'
      canvas.style.height = canvasW + 'px'
      centerCanvas()
    }

    // reset canvas dimentions and center it
    let resetCanvas = (w, h) => {
      canvasW = w
      canvasH = h

      if (canvasW > canvasH) {
        // landscape
        canvas.style.width  = canvasW + 'px'
        canvas.style.height = canvasH + 'px'
        centerCanvas()
        return false
      }
    
      canvas.style.width  = canvasH + 'px'
      canvas.style.height = canvasW + 'px'
      centerCanvas()
    }
  
    // toggle between mobile and desktop view
    userDevice.onclick = () => {
      if (userDevice.getAttribute('data-device') === 'mobile') {
        userDevice.setAttribute('data-device', 'tablet')
        userDevice.innerHTML = '<i class="fa fa-tablet"></i>'
        
        // reset canvas dimensions and center it
        // dimensions of iPad Mini used
        resetCanvas(1024, 768)
        return false
      }
      if (userDevice.getAttribute('data-device') === 'tablet') {
        userDevice.setAttribute('data-device', 'desktop')
        userDevice.innerHTML = '<i class="fa fa-desktop"></i>'
  
        // reset canvas dimensions and center it
        // 2012 macbook pro dimensions used
        resetCanvas(1440, 834)
        return false
      }
      if (userDevice.getAttribute('data-device') === 'desktop') {
        userDevice.setAttribute('data-device', 'mobile')
        userDevice.innerHTML = '<i class="fa fa-mobile"></i>'
  
        // reset canvas dimensions and center it
        // dimensions of Galaxy S8+ used
        resetCanvas(360, 740)
        return false
      }
    }
  },

  // initalize application function
  init: () => {
    // init panzoom library
    app.importJS('./libraries/panzoom/panzoom.mod.js')
    
    // init zooming and panning
    setTimeout(() => {
      app.initZoomPan()
    }, 300)
  }
}

// initialize application
app.init()