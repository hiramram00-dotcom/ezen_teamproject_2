// Enables click-and-drag horizontal scrolling on an element (mouse acts like a
// finger swiping). Returns a cleanup function. A drag that moves past a small
// threshold cancels the trailing click so buttons don't fire after a swipe.
export function attachDragScroll(el: HTMLElement): () => void {
  let isDown = false;
  let startX = 0;
  let startLeft = 0;
  let moved = false;

  const onDown = (e: MouseEvent) => {
    isDown = true;
    moved = false;
    startX = e.pageX;
    startLeft = el.scrollLeft;
    el.classList.add("dragging");
  };

  const onMove = (e: MouseEvent) => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    if (Math.abs(dx) > 4) moved = true;
    el.scrollLeft = startLeft - dx;
  };

  const onUp = () => {
    if (!isDown) return;
    isDown = false;
    el.classList.remove("dragging");
  };

  const onClickCapture = (e: MouseEvent) => {
    if (moved) {
      e.preventDefault();
      e.stopPropagation();
      moved = false;
    }
  };

  el.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
  el.addEventListener("click", onClickCapture, true);

  return () => {
    el.removeEventListener("mousedown", onDown);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mouseup", onUp);
    el.removeEventListener("click", onClickCapture, true);
  };
}

// Attach drag-scroll to every horizontal carousel (they all use `.no-scrollbar`).
export function initDragScroll(root: ParentNode = document): () => void {
  const rows = root.querySelectorAll<HTMLElement>(".no-scrollbar");
  const cleanups = Array.from(rows).map(attachDragScroll);
  return () => cleanups.forEach((fn) => fn());
}
