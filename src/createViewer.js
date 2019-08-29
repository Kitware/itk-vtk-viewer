import vtkProxyManager from 'vtk.js/Sources/Proxy/Core/ProxyManager';
import macro from 'vtk.js/Sources/macro';

import ResizeSensor from 'css-element-queries/src/ResizeSensor';

import proxyConfiguration from './proxyManagerConfiguration';
import UserInterface from './UserInterface';
import addKeyboardShortcuts from './addKeyboardShortcuts';
import rgb2hex from './UserInterface/rgb2hex';
import ViewerStore from './ViewerStore';
import { autorun, reaction } from 'mobx';

function applyStyle(el, style) {
  Object.keys(style).forEach((key) => {
    el.style[key] = style[key];
  });
}

const createViewer = (
  rootContainer,
  { image, geometries, pointSets, use2D = false, rotate = true, viewerStyle, viewerState }
) => {
  UserInterface.emptyContainer(rootContainer);

  const proxyManager = vtkProxyManager.newInstance({ proxyConfiguration });
  window.addEventListener('resize', proxyManager.resizeAllViews);


  // Todo: deserialize from viewerState, if present
  const viewerStore = new ViewerStore(proxyManager);

  applyStyle(viewerStore.container, viewerStore.style.containerStyle);
  rootContainer.appendChild(viewerStore.container);
  autorun(() => {
    applyStyle(viewerStore.container, viewerStore.style.containerStyle);
  })
  autorun(() => {
    viewerStore.itkVtkView.setBackground(viewerStore.style.backgroundColor);
  })

  if (viewerStyle) {
    viewerStore.style = viewerStyle;
  }
  console.log(viewerStore)

  const testCanvas = document.createElement("canvas");
  const gl = testCanvas.getContext("webgl")
      || testCanvas.getContext("experimental-webgl");
  if (!(gl && gl instanceof WebGLRenderingContext)) {
    const suggestion = document.createElement("p");
    const preSuggestionText = document.createTextNode("WebGL could not be loaded. ");
    suggestion.appendChild(preSuggestionText);
    const getWebGLA = document.createElement("a");
    getWebGLA.setAttribute("href", "http://get.webgl.org/troubleshooting");
    const getWebGLAText = document.createTextNode("Try a different browser or video drivers for WebGL support.");
    getWebGLA.appendChild(getWebGLAText);
    suggestion.appendChild(getWebGLA);
    const suggestionText = document.createTextNode(" This is required to view interactive 3D visualizations.");
    suggestion.appendChild(suggestionText);
    viewerStore.container.appendChild(suggestion);
    return null;
  }

  UserInterface.addLogo(viewerStore.container);

  UserInterface.createMainUI(
    rootContainer,
    viewerStore,
    use2D,
  );

  let updatingImage = false;
  reaction(() => viewerStore.imageUI.image,
    (image) => {
      if (!!!image) {
        return;
      }
      if (!!!viewerStore.imageUI.representationProxy) {
        viewerStore.imageUI.source.setInputData(image);

        proxyManager.createRepresentationInAllViews(viewerStore.imageUI.source);
        viewerStore.imageUI.representationProxy = proxyManager.getRepresentation(viewerStore.imageUI.source, viewerStore.itkVtkView);

        const dataArray = image.getPointData().getScalars();
        viewerStore.imageUI.lookupTableProxy = proxyManager.getLookupTable(dataArray.getName());
        if (dataArray.getNumberOfComponents() > 1) {
          viewerStore.imageUI.lookupTableProxy.setPresetName('Grayscale');
        } else {
          viewerStore.imageUI.lookupTableProxy.setPresetName('Viridis (matplotlib)');
        }
        viewerStore.imageUI.piecewiseFunctionProxy = proxyManager.getPiecewiseFunction(dataArray.getName());

        // Slices share the same lookup table as the volume rendering.
        const lut = viewerStore.imageUI.lookupTableProxy.getLookupTable();
        const sliceActors = viewerStore.imageUI.representationProxy.getActors();
        sliceActors.forEach((actor) => {
          actor.getProperty().setRGBTransferFunction(lut);
        });

        if (use2D) {
          viewerStore.itkVtkView.setViewMode('ZPlane');
          viewerStore.itkVtkView.setOrientationAxesVisibility(false);
        } else {
          viewerStore.itkVtkView.setViewMode('VolumeRendering');
        }

        UserInterface.createImageUI(
          viewerStore,
          use2D
        );
        const annotationContainer = viewerStore.container.querySelector('.js-se');
        annotationContainer.style.fontFamily = 'monospace';
      } else {
        if (updatingImage) {
          return;
        }
        updatingImage = true;
        viewerStore.imageUI.source.setInputData(image);
        const transferFunctionWidget = viewerStore.imageUI.transferFunctionWidget;
        transferFunctionWidget.setDataArray(image.getPointData().getScalars().getData());
        transferFunctionWidget.invokeOpacityChange(transferFunctionWidget);
        transferFunctionWidget.modified();
        viewerStore.imageUI.croppingWidget.setVolumeMapper(viewerStore.imageUI.representationProxy.getMapper());
        const cropFilter = viewerStore.imageUI.representationProxy.getCropFilter();
        cropFilter.reset();
        viewerStore.imageUI.croppingWidget.resetWidgetState();
        setTimeout(() => {
          transferFunctionWidget.render();
          viewerStore.renderWindow.render();
          updatingImage = false;
        }, 0);
      }
    }
  );
  viewerStore.imageUI.image = image;

  reaction(() => viewerStore.geometriesUI.geometries,
    (geometries) => {
      if(!!!geometries || geometries.length === 0) {
        return;
      }

      geometries.forEach((geometry, index) => {
        if (viewerStore.geometriesUI.sources.length <= index) {
          const uid = `GeometrySource${index}`
          const geometrySource = proxyManager.createProxy('Sources', 'TrivialProducer', {
            name: uid,
          });
          viewerStore.geometriesUI.sources.push(geometrySource)
          viewerStore.geometriesUI.sources[index].setInputData(geometry)
          proxyManager.createRepresentationInAllViews(geometrySource);
          const geometryRepresentation = proxyManager.getRepresentation(geometrySource, viewerStore.itkVtkView);
          viewerStore.geometriesUI.representationProxies.push(geometryRepresentation);
        } else {
          viewerStore.geometriesUI.sources[index].setInputData(geometry);
          viewerStore.geometriesUI.representationProxies[index].setVisibility(true);
        }
      })

      if(geometries.length < viewerStore.geometriesUI.representationProxies.length) {
        const proxiesToDisable = viewerStore.geometriesUI.representationProxies.slice(geometries.length);
        proxiesToDisable.forEach((proxy) => {
          proxiesToDisable.setVisibility(false);
        })
      }

      if(!viewerStore.geometriesUI.initialized) {
        UserInterface.createGeometriesUI(
          viewerStore,
        );
      }
      viewerStore.geometriesUI.geometryNames = geometries.map((geometry, index) => `Geometry ${index}`);
      let geometryRepresentations = viewerStore.geometriesUI.geometryRepresentations.slice(0, geometries.length);
      const defaultGeometryRepresentations = new Array(geometries.length);
      defaultGeometryRepresentations.fill('Surface');
      geometryRepresentations.concat(defaultGeometryRepresentations.slice(0, geometries.length - geometryRepresentations.length));
      viewerStore.geometriesUI.geometryRepresentations = geometryRepresentations;
    }
  );
  viewerStore.geometriesUI.geometries = geometries;

  reaction(() => viewerStore.pointSetsUI.pointSets,
    (pointSets) => {
      if(!!!pointSets || pointSets.length === 0) {
        return;
      }

      pointSets.forEach((pointSet, index) => {
        if (viewerStore.pointSetsUI.sources.length <= index) {
          const uid = `PointSetSource${index}`
          const pointSetSource = proxyManager.createProxy('Sources', 'TrivialProducer', {
            name: uid,
          });
          viewerStore.pointSetsUI.sources.push(pointSetSource)
          viewerStore.pointSetsUI.sources[index].setInputData(pointSet)
          const pointSetRepresentationUid = `pointSetRepresentation${index}`
          const pointSetRepresentation = proxyManager.createProxy('Representations', 'PointSet', {
            name: pointSetRepresentationUid,
          });
          pointSetRepresentation.setInput(pointSetSource);
          viewerStore.itkVtkView.addRepresentation(pointSetRepresentation);
          viewerStore.pointSetsUI.representationProxies.push(pointSetRepresentation);
        } else {
          viewerStore.pointSetsUI.sources[index].setInputData(pointSet);
          viewerStore.pointSetsUI.representationProxies[index].setVisibility(true);
        }
      })

      if(pointSets.length < viewerStore.pointSetsUI.representationProxies.length) {
        const proxiesToDisable = viewerStore.pointSetsUI.representationProxies.slice(pointSets.length);
        proxiesToDisable.forEach((proxy) => {
          proxiesToDisable.setVisibility(false);
        })
      }

      if(!viewerStore.pointSetsUI.initialized) {
        UserInterface.createPointSetsUI(
          viewerStore,
          pointSets,
        );
      }

    // Estimate a reasonable point sphere radius in pixels
    const renderView = viewerStore.renderWindow.getViews()[0];
    const windowWidth = renderView.getViewportSize(viewerStore.itkVtkView.getRenderer())[0];
    const maxLength = pointSets.reduce((max, pointSet) => {
      pointSet.computeBounds();
      const bounds = pointSet.getBounds();
      max = Math.max(max, bounds[1] - bounds[0]);
      max = Math.max(max, bounds[3] - bounds[2]);
      max = Math.max(max, bounds[5] - bounds[4]);
      return max;
    }, -Infinity);
    const radiusFactor = windowWidth / maxLength * 2e-4;
    viewerStore.pointSetsUI.representationProxies.forEach((proxy) => {
      proxy.setRadiusFactor(radiusFactor);
    })
    }
  );
  viewerStore.pointSetsUI.pointSets = pointSets;


  viewerStore.itkVtkView.resize();
  const resizeSensor = new ResizeSensor(viewerStore.container, function() {
    viewerStore.itkVtkView.resize();
  });
  proxyManager.renderAllViews();

  setTimeout(viewerStore.itkVtkView.resetCamera, 1);

  const publicAPI = {};

  publicAPI.renderLater = () => {
    viewerStore.itkVtkView.renderLater();
  }

  const viewerDOMId = viewerStore.id;

  const setImage = (image) => {
    viewerStore.imageUI.image = image;
  }
  publicAPI.setImage = macro.throttle(setImage, 100);

  publicAPI.setPointSets = (pointSets) => {
    viewerStore.pointSetsUI.pointSets = pointSets;
  }

  publicAPI.setGeometries = (geometries) => {
    viewerStore.geometriesUI.geometries = geometries;
  }

  publicAPI.setUserInterfaceCollapsed = (collapse) => {
    const collapsed = viewerStore.mainUI.collapsed;
    if (collapse && !collapsed || !collapse && collapsed) {
      viewerStore.mainUI.collapsed = !collapsed;
    }
  }

  const toggleUserInterfaceCollapsedHandlers = [];
  autorun(() => {
    const collapsed = viewerStore.mainUI.collapsed;
    toggleUserInterfaceCollapsedHandlers.forEach((handler) => {
      handler.call(null, collapsed);
    })
  })

  publicAPI.subscribeToggleUserInterfaceCollapsed = (handler) => {
    const index = toggleUserInterfaceCollapsedHandlers.length;
    toggleUserInterfaceCollapsedHandlers.push(handler);
    function unsubscribe() {
      toggleUserInterfaceCollapsedHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  // Start collapsed on mobile devices or small pages
  if (window.screen.availWidth < 768 || window.screen.availHeight < 800) {
    publicAPI.setUserInterfaceCollapsed(true);
  }


  publicAPI.captureImage = () => {
    return viewerStore.itkVtkView.captureImage();
  }


  const toggleAnnotationsHandlers = [];
  autorun(() => {
    const enabled = viewerStore.mainUI.annotationsEnabled;
    toggleAnnotationsHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  })

  publicAPI.subscribeToggleAnnotations = (handler) => {
    const index = toggleAnnotationsHandlers.length;
    toggleAnnotationsHandlers.push(handler);
    function unsubscribe() {
      toggleAnnotationsHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setAnnotationsEnabled = (enabled) => {
    const annotations = viewerStore.mainUI.annotationsEnabled;
    if (enabled && !annotations || !enabled && annotations) {
      viewerStore.mainUI.annotationsEnabled = enabled;
    }
  }


  const toggleRotateHandlers = [];
  autorun(() => {
    const enabled = viewerStore.mainUI.rotateEnabled;
    toggleRotateHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  })

  publicAPI.subscribeToggleRotate = (handler) => {
    const index = toggleRotateHandlers.length;
    toggleRotateHandlers.push(handler);
    function unsubscribe() {
      toggleRotateHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setRotateEnabled = (enabled) => {
    const rotate = viewerStore.mainUI.rotateEnabled;
    if (enabled && !rotate || !enabled && rotate) {
      viewerStore.mainUI.rotateEnabled = enabled;
    }
  }


  const toggleFullscreenHandlers = [];
  autorun(() => {
    const enabled = viewerStore.mainUI.fullscreenEnabled;
    toggleFullscreenHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  })

  publicAPI.subscribeToggleFullscreen = (handler) => {
    const index = toggleFullscreenHandlers.length;
    toggleFullscreenHandlers.push(handler);
    function unsubscribe() {
      toggleFullscreenHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setFullscreenEnabled = (enabled) => {
    const fullscreen = viewerStore.mainUI.fullscreenEnabled;
    if (enabled && !fullscreen || !enabled && fullscreen) {
      viewerStore.mainUI.fullscreenEnabled = enabled;
    }
  }


  const toggleInterpolationHandlers = [];
  autorun(() => {
    const enabled = viewerStore.mainUI.interpolationEnabled;
    toggleInterpolationHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  })

  publicAPI.subscribeToggleInterpolation = (handler) => {
    const index = toggleInterpolationHandlers.length;
    toggleInterpolationHandlers.push(handler);
    function unsubscribe() {
      toggleInterpolationHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setInterpolationEnabled = (enabled) => {
    const interpolation = viewerStore.mainUI.interpolationEnabled;
    if (enabled && !interpolation || !enabled && interpolation) {
      viewerStore.mainUI.interpolationEnabled = enabled;
    }
  }


  const toggleCroppingPlanesHandlers = [];
  autorun(() => {
    const enabled = viewerStore.mainUI.croppingPlanesEnabled;
    toggleCroppingPlanesHandlers.forEach((handler) => {
      handler.call(null, enabled);
    })
  })

  publicAPI.subscribeToggleCroppingPlanes = (handler) => {
    const index = toggleCroppingPlanesHandlers.length;
    toggleCroppingPlanesHandlers.push(handler);
    function unsubscribe() {
      toggleCroppingPlanesHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setCroppingPlanesEnabled = (enabled) => {
    const cropping = viewerStore.mainUI.croppingPlanesEnabled;
    if (enabled && !cropping || !enabled && cropping) {
      viewerStore.mainUI.croppingPlanesEnabled = cropping;
    }
  }

  publicAPI.subscribeCroppingPlanesChanged = (handler) => {
    return viewerStore.imageUI.addCroppingPlanesChangedHandler(handler);
  }

  publicAPI.subscribeResetCrop = (handler) => {
    return viewerStore.imageUI.addResetCropHandler(handler);
  }


  const selectColorMapHandlers = [];
  autorun(() => {
    const colorMap = viewerStore.imageUI.colorMap;
    selectColorMapHandlers.forEach((handler) => {
      handler.call(null, colorMap);
    })
  })

  publicAPI.subscribeSelectColorMap = (handler) => {
    const index = selectColorMapHandlers.length;
    selectColorMapHandlers.push(handler);
    function unsubscribe() {
      selectColorMapHandlers[index] = null;
    }
    return Object.freeze({ unsubscribe });
  }

  publicAPI.setColorMap = (colorMap) => {
    const currentColorMap = viewerStore.imageUI.colorMap;
    if (currentColorMap !== colorMap) {
      viewerStore.imageUI.colorMap = colorMap;
    }
  }


  if (!use2D) {
    const viewModeChangedHandlers = [];
    reaction(() => { return viewerStore.mainUI.viewMode; },
      (viewMode) => {
        switch(viewMode) {
        case 'XPlane':
          viewModeChangedHandlers.forEach((handler) => {
            handler.call(null, 'XPlane');
          })
          break;
        case 'YPlane':
          viewModeChangedHandlers.forEach((handler) => {
            handler.call(null, 'YPlane');
          })
          break;
        case 'ZPlane':
          viewModeChangedHandlers.forEach((handler) => {
            handler.call(null, 'ZPlane');
          })
          break;
        case 'VolumeRendering':
          viewModeChangedHandlers.forEach((handler) => {
            handler.call(null, 'VolumeRendering');
          })
          break;
        default:
          console.error('Invalid view mode: ' + viewMode);
        }
      }
    )

    publicAPI.subscribeViewModeChanged = (handler) => {
      const index = viewModeChangedHandlers.length;
      viewModeChangedHandlers.push(handler);
      function unsubscribe() {
        viewModeChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setViewMode = (mode) => {
      if (!image) {
        return
      }
      viewerStore.mainUI.viewMode = mode;
    }


    const xSliceChangedHandlers = [];
    const xSliceChangedListener = (event) => {
      xSliceChangedHandlers.forEach((handler) => {
        handler.call(null, event.target.valueAsNumber);
      })
    }
    const xSliceElement = document.getElementById(`${viewerDOMId}-xSlice`);
    xSliceElement && xSliceElement.addEventListener('input', xSliceChangedListener);
    publicAPI.subscribeXSliceChanged = (handler) => {
      const index = xSliceChangedHandlers.length;
      xSliceChangedHandlers.push(handler);
      function unsubscribe() {
        xSliceChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    const ySliceChangedHandlers = [];
    const ySliceChangedListener = (event) => {
      ySliceChangedHandlers.forEach((handler) => {
        handler.call(null, event.target.valueAsNumber);
      })
    }
    const ySliceElement = document.getElementById(`${viewerDOMId}-ySlice`);
    ySliceElement && ySliceElement.addEventListener('input', ySliceChangedListener);
    publicAPI.subscribeYSliceChanged = (handler) => {
      const index = ySliceChangedHandlers.length;
      ySliceChangedHandlers.push(handler);
      function unsubscribe() {
        ySliceChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    const zSliceChangedHandlers = [];
    const zSliceChangedListener = (event) => {
      zSliceChangedHandlers.forEach((handler) => {
        handler.call(null, event.target.valueAsNumber);
      })
    }
    const zSliceElement = document.getElementById(`${viewerDOMId}-zSlice`);
    zSliceElement && zSliceElement.addEventListener('input', zSliceChangedListener);
    publicAPI.subscribeZSliceChanged = (handler) => {
      const index = zSliceChangedHandlers.length;
      zSliceChangedHandlers.push(handler);
      function unsubscribe() {
        zSliceChangedHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }


    const toggleShadowHandlers = [];
    autorun(() => {
      const enabled = viewerStore.imageUI.useShadow;
      toggleShadowHandlers.forEach((handler) => {
        handler.call(null, enabled);
      })
    })

    publicAPI.subscribeToggleShadow = (handler) => {
      const index = toggleShadowHandlers.length;
      toggleShadowHandlers.push(handler);
      function unsubscribe() {
        toggleShadowHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setShadowEnabled = (enabled) => {
      const shadow = viewerStore.imageUI.useShadow;
      if (enabled && !shadow || !enabled && shadow) {
        viewerStore.imageUI.useShadow = enabled;
      }
    }


    const toggleSlicingPlanesHandlers = [];
    autorun(() => {
      const enabled = viewerStore.imageUI.slicingPlanesEnabled;
      toggleSlicingPlanesHandlers.forEach((handler) => {
        handler.call(null, enabled);
      })
    })

    publicAPI.subscribeToggleSlicingPlanes = (handler) => {
      const index = toggleSlicingPlanesHandlers.length;
      toggleSlicingPlanesHandlers.push(handler);
      function unsubscribe() {
        toggleSlicingPlanesHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setSlicingPlanesEnabled = (enabled) => {
      const slicingPlanes = viewerStore.imageUI.slicingPlanesEnabled;
      if (enabled && !slicingPlanes || !enabled && slicingPlanes) {
        viewerStore.imageUI.slicingPlanesEnabled = enabled;
      }
    }


    const gradientOpacitySliderHandlers = [];
    autorun(() => {
      const gradientOpacity = viewerStore.imageUI.gradientOpacity;
      gradientOpacitySliderHandlers.forEach((handler) => {
        handler.call(null, gradientOpacity);
      })
    })

    publicAPI.subscribeGradientOpacityChanged = (handler) => {
      const index = gradientOpacitySliderHandlers.length;
      gradientOpacitySliderHandlers.push(handler);
      function unsubscribe() {
        gradientOpacitySliderHandlers[index] = null;
      }
      return Object.freeze({ unsubscribe });
    }

    publicAPI.setGradientOpacity = (opacity) => {
      const current_opacity = viewerStore.imageUI.gradientOpacity;
      if (current_opacity !== parseFloat(opacity)) {
        viewerStore.imageUI.gradientOpacity = opacity;
      }
    }
  }

  const pointSetSelector = document.getElementById(`${viewerDOMId}-pointSetSelector`);
  const pointSetColorInput = document.getElementById(`${viewerDOMId}-pointSetColorInput`);
  const pointSetOpacitySlider = document.getElementById(`${viewerDOMId}-pointSetOpacitySlider`);

  const inputPointSetColorHandlers = [];
  const inputPointSetColorListener = (event) => {
    const value = pointSetColorInput.value;
    inputPointSetColorHandlers.forEach((handler) => {
      handler.call(null, value);
    })
  }
  if (pointSetColorInput !== null) {
    pointSetColorInput.addEventListener('change', inputPointSetColorListener);
  }

  //publicAPI.subscribeSelectColorMap = (handler) => {
    //const index = inputPointSetColorHandlers.length;
    //inputPointSetColorHandlers.push(handler);
    //function unsubscribe() {
      //inputPointSetColorHandlers[index] = null;
    //}
    //return Object.freeze({ unsubscribe });
  //}

  publicAPI.setPointSetColor = (index, rgbColor) => {
    if (pointSetColorInput !== null && pointSetSelector !== null) {
      if (index === pointSetSelector.selectedIndex) {
        const hexColor = rgb2hex(rgbColor);
        pointSetColorInput.value = hexColor;
      }
    }
    viewerStore.pointSetsUI.representationProxies[index].setColor(Array.from(rgbColor));
  }

  publicAPI.setPointSetOpacity = (index, opacity) => {
    if (pointSetOpacitySlider !== null && pointSetSelector !== null) {
      if (index === pointSetSelector.selectedIndex) {
        pointSetOpacitySlider.value = opacity;
      }
    }
    viewerStore.pointSetsUI.representationProxies[index].setOpacity(opacity);
  }

  const geometrySelector = document.getElementById(`${viewerDOMId}-geometrySelector`);
  const geometryColorInput = document.getElementById(`${viewerDOMId}-geometryColorInput`);
  const geometryOpacitySlider = document.getElementById(`${viewerDOMId}-geometryOpacitySlider`);

  const inputGeometryColorHandlers = [];
  const inputGeometryColorListener = (event) => {
    const value = geometryColorInput.value;
    inputGeometryColorHandlers.forEach((handler) => {
      handler.call(null, value);
    })
  }
  if (geometryColorInput !== null) {
    geometryColorInput.addEventListener('change', inputGeometryColorListener);
  }

  //publicAPI.subscribeSelectColorMap = (handler) => {
    //const index = inputGeometryColorHandlers.length;
    //inputGeometryColorHandlers.push(handler);
    //function unsubscribe() {
      //inputGeometryColorHandlers[index] = null;
    //}
    //return Object.freeze({ unsubscribe });
  //}

  publicAPI.setGeometryColor = (index, rgbColor) => {
    if (geometryColorInput !== null && geometrySelector !== null) {
      if (index === geometrySelector.selectedIndex) {
        const hexColor = rgb2hex(rgbColor);
        geometryColorInput.value = hexColor;
      }
    }
    viewerStore.geometriesUI.representationProxies[index].setColor(Array.from(rgbColor));
  }

  publicAPI.setGeometryOpacity = (index, opacity) => {
    if (geometryOpacitySlider !== null && geometrySelector !== null) {
      if (index === geometrySelector.selectedIndex) {
        geometryOpacitySlider.value = opacity;
      }
    }
    viewerStore.geometriesUI.representationProxies[index].setOpacity(opacity);
  }

  publicAPI.getViewProxy = () => {
    return viewerStore.itkVtkView;
  }

  //publicAPI.saveState = () => {
    //// todo
  //}

  //publicAPI.loadState = (state) => {
    //// todo
  //}
  addKeyboardShortcuts(rootContainer, publicAPI, viewerDOMId);

  publicAPI.setRotateEnabled(rotate)

  return publicAPI;
};

export default createViewer;
