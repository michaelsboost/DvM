let project;
const app = {
  // Function to update localStorage with current project data
  updateLocalStorage: () => {
    localStorage.setItem('DvM', JSON.stringify(project));
  },

  // Function to apply changes to the HTML based on project settings
  applyChanges: () => {
    let dhtml = document.querySelector('html');
    dhtml.setAttribute('data-theme', project.dark ? 'dark' : 'light');
    toggletheme.innerHTML = project.dark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
    document.getElementById('search').value = project.url; // Update input value
    preview.src = project.url; // Update preview src
  },

  // Function to handle click event on toggletheme
  toggleTheme: () => {
    project.dark = !project.dark; // Toggle the dark property
    app.updateLocalStorage(); // Save changes to localStorage
    app.applyChanges(); // Apply changes to the HTML
  },

  // Function to handle input event on search input
  handleSearchInput: () => {
    project.url = document.getElementById('search').value; // Update project URL
    app.updateLocalStorage(); // Save changes to localStorage
    app.applyChanges(); // Apply changes to the HTML
  },
  
  // Function to import a javascript file
  importJS: url => {
    let script = document.createElement('script');
    script.src = url;
    script.setAttribute('defer', '');
    document.head.appendChild(script);
  },

  // Function to init zooming and panning
  initZoomPan: () => {
    // variables
    const userDevice = document.querySelector("[data-device]");
    let canvas = document.querySelector("[data-canvas]");
    let canvasH = parseFloat(canvas.clientHeight);
    let canvasW = parseFloat(canvas.clientWidth / 2);

    // init panzoom
    let instance = panzoom(canvas, {
      bounds: true,
      boundsPadding: 0.1
    });

    let centerCanvas = () => {
      let canvas = document.querySelector("[data-canvas]");
      let canvasH = parseFloat(canvas.clientHeight);
      let canvasW = parseFloat(canvas.clientWidth / 2);
      canvasW = parseFloat(canvas.clientWidth);
      canvasH = parseFloat(canvas.clientHeight);

      // detect if canvas is in portrait mode
      if (canvasW < canvasH) {
        // ratio for zoom
        let zoomRatio = 0.75;

        // to center the canvas horizontally we first need to...
        // get half the body & canvas's width
        let bodyW = parseFloat(canvas.parentElement.clientWidth / 2);
        canvasW = parseFloat(canvas.clientWidth / 2);
        // then add them together
        let initialXPos = parseFloat(
          parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio
        );

        // to center the canvas vertically we first need to...
        // get the size of both the body and the canvas
        let bodyH = parseFloat(canvas.parentElement.clientHeight);
        bodyH = bodyH / 2;
        canvasH = canvasH / 2;
        // then add them together
        let initialYPos = parseFloat(
          parseFloat(canvasH) - parseFloat(bodyH) * zoomRatio
        );

        // set initial zoom
        instance.zoomAbs(
          initialXPos, // initial x position
          initialYPos, // initial y position
          zoomRatio // initial zoom
        );
        instance.moveTo(initialXPos, initialYPos);

        // display size
        viewx = parseInt(canvas.style.width);
        viewy = parseInt(canvas.style.height);
        return false;
      }

      // ratio for zoom
      let zoomRatio = 0.75;

      // to center the canvas horizontally we first need to...
      // get half the body & canvas's width
      let bodyW = parseFloat(canvas.parentElement.clientWidth / 2);
      canvasW = parseFloat(canvas.clientWidth / 2);
      // then add them together
      let initialXPos = parseFloat(
        parseFloat(bodyW) - parseFloat(canvasW) * zoomRatio
      );

      // to center the canvas vertically we first need to...
      // get the size of both the body and the canvas
      let bodyH = parseFloat(canvas.parentElement.clientHeight);
      bodyH = bodyH / 2;
      canvasH = canvasH / 2;
      // then add them together
      let initialYPos = parseFloat(
        parseFloat(bodyH) - parseFloat(canvasH) * zoomRatio
      );

      // set initial zoom
      instance.zoomAbs(
        initialXPos, // initial x position
        initialYPos, // initial y position
        zoomRatio // initial zoom
      );
      instance.moveTo(initialXPos, initialYPos);

      // display size
      viewx.value = parseInt(canvas.style.width);
      viewy.value = parseInt(canvas.style.height);
    };
    centerCanvas();

    // enable disable zoom/pan
    const zoomIcon = document.querySelector("[data-zoom]");
    zoomIcon.onclick = () => {
      if (zoomIcon.getAttribute("data-zoom") === "true") {
        canvas.selection = false;
        instance.pause();
        zoomIcon.innerHTML =
          '<i class="text-xl fa fa-light fa-magnifying-glass-minus"></i>';
        zoomIcon.setAttribute("data-zoom", false);
        fill.classList.add("hidden");
        
        // rich text editor
        if (!liverender.checked) {
          tabsNav.classList.add('top-12');
          tabsNav.classList.remove('top-0');
          wysiwyg.classList.remove('hidden');
        } else {
          tabsNav.classList.add('top-0');
          tabsNav.classList.remove('top-12');
          wysiwyg.classList.add('hidden');
        }
      } else {
        canvas.selection = true;
        instance.resume();
        zoomIcon.innerHTML =
          '<i class="text-xl fa fa-light fa-magnifying-glass-plus"></i>';
        zoomIcon.setAttribute("data-zoom", true);
        fill.classList.remove("hidden");
        
        // rich text editor
        tabsNav.classList.add('top-0');
        tabsNav.classList.remove('top-12');
        wysiwyg.classList.add('hidden');
      }
    };

    // rotate canvas
    let rotateview = () => {
      canvasW = parseFloat(canvas.clientWidth);
      canvasH = parseFloat(canvas.clientHeight);

      canvas.style.width = canvasH + "px";
      canvas.style.height = canvasW + "px";
      centerCanvas();
    };

    // reset canvas dimentions and center it
    let resetCanvas = (w, h) => {
      canvasW = w;
      canvasH = h;

      if (canvasW > canvasH) {
        // landscape
        canvas.style.width = canvasW + "px";
        canvas.style.height = canvasH + "px";
        centerCanvas();
        return false;
      }

      canvas.style.width = canvasH + "px";
      canvas.style.height = canvasW + "px";
      centerCanvas();
    };

    // reset canvas dimensions and center it
    // dimensions of Galaxy S8+ used
    mobilep.onclick = () => {
      resetCanvas(360, 740);
      rotateview();
    };
    mobilel.onclick = () => {
      resetCanvas(360, 740);
    };

    // reset canvas dimensions and center it
    // dimensions of iPad Mini used
    tabletp.onclick = () => {
      resetCanvas(1024, 768);
      rotateview();
    };
    tabletl.onclick = () => {
      resetCanvas(1024, 768);
    };

    // reset canvas dimensions and center it
    // 2012 macbook pro dimensions used
    desktopsize.onclick = () => {
      resetCanvas(1440, 834);
    };
  },

  // initalize application function
  init: () => {
    // init panzoom library
    app.importJS('./libraries/panzoom/panzoom.mod.js');
    
    if (!localStorage.getItem('DvM')) {
      // project json
      project = {
        dark: true,
        url: "https://michaelsboost.com/"
      };
    } else {
      project = JSON.parse(localStorage.getItem('DvM'));
      
      // Update settings
      toggletheme.innerHTML = project.dark ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-solid fa-sun"></i>';
      project.url = search.value;
      project.url = preview.src;
    }
    
    // Apply changes to the HTML based on stored project settings
    app.applyChanges();

    // Attach click event handler to toggletheme
    toggletheme.onclick = () => {
      app.toggleTheme();
    };

    // Attach input event handler to search input
    document.getElementById('search').oninput = () => {
      app.handleSearchInput();
    };
    
    // init zooming and panning
    setTimeout(() => { app.initZoomPan(); }, 300);
  }
}

// initialize application
app.init()