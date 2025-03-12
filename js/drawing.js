class Canvas {
  constructor(svgElement, buttonElement) {
    this.svgElement = svgElement;
    this.buttonElement = buttonElement;
    this.coordinates = { lastX: 0, lastY: 0 };
    const svgDimensions = this.svgElement.getBoundingClientRect();
    this.svgX = svgDimensions.x;
    this.svgY = svgDimensions.y;

    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  setupListeners() {
    this.svgElement.addEventListener("mousedown", this.startDrawing);
    document.addEventListener("mouseup", this.stopDrawing);
    this.buttonElement.addEventListener("click", this.clearCanvas);
  }

  startDrawing(event) {
    this.coordinates.lastX = event.clientX - this.svgX;
    this.coordinates.lastY = event.clientY - this.svgY;
    this.svgElement.addEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove(event) {
    const currentX = event.clientX - this.svgX;
    const currentY = event.clientY - this.svgY;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", this.coordinates.lastX);
    line.setAttribute("y1", this.coordinates.lastY);
    line.setAttribute("x2", currentX);
    line.setAttribute("y2", currentY);
    line.setAttribute("stroke", "white");
    this.svgElement.appendChild(line);

    this.coordinates.lastX = currentX;
    this.coordinates.lastY = currentY;
  }

  stopDrawing(event) {
    this.svgElement.removeEventListener("mousemove", this.handleMouseMove);
  }

  clearCanvas() {
    this.coordinates.lastX = 0;
    this.coordinates.lastY = 0;

    this.svgElement.replaceChildren();
  }
}

const main = () => {
  const svgElement = document.querySelector("svg");
  const buttonElement = document.querySelector("button");

  const canvas = new Canvas(svgElement, buttonElement);
  canvas.setupListeners();
};

window.onload = main;
