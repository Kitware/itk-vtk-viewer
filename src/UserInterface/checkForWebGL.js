function checkForWebGL(container) {
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
    container.appendChild(suggestion);
    return false;
  }
  return true;
}

export default checkForWebGL;
