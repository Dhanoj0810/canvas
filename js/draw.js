const drawPathSegment = (
  { clientX, clientY },
  coordinates,
  svg,
  dimensions
) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

  const currentX = clientX - dimensions.x;
  const currentY = clientY - dimensions.y;

  line.setAttribute("x1", coordinates.lastX || currentX);
  line.setAttribute("y1", coordinates.lastY || currentY);
  line.setAttribute("x2", currentX);
  line.setAttribute("y2", currentY);
  line.setAttribute("stroke", "white");

  svg.appendChild(line);

  coordinates.lastX = currentX;
  coordinates.lastY = currentY;
};

const createCanvasState = (...args) => {
  const coordinates = { lastX: 0, lastY: 0 };

  return function (fn) {
    return function (...params) {
      return fn(...params, coordinates, ...args);
    };
  };
};

const resetPath = (cor) => {
  cor.lastX = 0;
  cor.lastY = 0;
};

const setupCanvas = () => {
  const svg = document.querySelector("svg");
  const dimensions = svg.getBoundingClientRect();
  const button = document.querySelector("button");

  const canvas = createCanvasState(svg, dimensions);
  const startDrawing = canvas(drawPathSegment);
  const reset = canvas(resetPath);

  svg.addEventListener("mousedown", () => {
    svg.addEventListener("mousemove", startDrawing);
  });

  document.addEventListener("mouseup", () => {
    reset();
    svg.removeEventListener("mousemove", startDrawing);
  });

  button.addEventListener("click", () => {
    svg.replaceChildren("line");
  });
};

window.onload = setupCanvas;
