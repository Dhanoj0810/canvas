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

const createCanvasState = (fn, svg, dimensions, ...args) => {
  const coordinates = { lastX: 0, lastY: 0 };

  fn(...args, coordinates, svg, dimensions);
};

const resetPath = () => {
  coordinates.lastX = 0;
  coordinates.lastY = 0;
};

const setupCanvas = () => {
  const svg = document.querySelector("svg");
  const dimensions = svg.getBoundingClientRect();

  const startDrawing = createCanvasState.bind(drawPathSegment, svg, dimensions);
  const reset = createCanvasState.bind(resetPath);

  svg.addEventListener("mousedown", () => {
    svg.addEventListener("mousemove", startDrawing);
  });

  document.addEventListener("mouseup", () => {
    reset();
    svg.removeEventListener("mousemove", startDrawing);
  });

  const button = document.querySelector("button");
  button.addEventListener("click", () => {
    svg.replaceChildren("line");
  });
};

window.onload = setupCanvas;
