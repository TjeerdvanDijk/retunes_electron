const resizer = document.querySelector(".resizer");
const sidebar = document.querySelector(".sidebar");

sidebar.style.flexBasis = '260px';

resizer.addEventListener("mousedown", (event) => {
  document.addEventListener("mousemove", resizeSidebar, false);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", resizeSidebar, false);
  }, false);
});

function resizeSidebar(e) {
  const size = `${e.x}px`;
  sidebar.style.flexBasis = size;
}
