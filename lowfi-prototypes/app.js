const templates = {
  product: `
    <div class="product-card draggable component">
      <i contenteditable="true">可现场面交</i>
      <button type="button">♡</button>
      <div class="ph"></div>
      <b contenteditable="true">新商品标题</b>
      <strong contenteditable="true">¥88</strong>
    </div>
  `,
  list: `
    <div class="near-item draggable component">
      <div class="ph thumb"></div>
      <b contenteditable="true">新列表项</b>
      <strong contenteditable="true">¥60</strong>
      <p contenteditable="true">约300m | 可面交</p>
    </div>
  `,
  chips: `
    <div class="chip-row draggable component">
      <span contenteditable="true">默认排序⌄</span>
      <span contenteditable="true">可现场面交</span>
      <span contenteditable="true">筛选▽</span>
    </div>
  `,
  option: `
    <label class="draggable component selected">
      <input type="radio" checked />
      <span contenteditable="true">新的单选选项</span>
    </label>
  `,
  button: `
    <div class="actions draggable component">
      <button type="button" contenteditable="true">次按钮</button>
      <button type="button" class="dark" contenteditable="true">主按钮</button>
    </div>
  `,
  notice: `
    <div class="notice draggable component" contenteditable="true">新的提示信息</div>
  `,
};

let activeDrag = null;
let offsetX = 0;
let offsetY = 0;

function makeEditable(root = document) {
  root.querySelectorAll("[contenteditable='true']").forEach((node) => {
    node.spellcheck = false;
  });
}

function activateDraggable(node) {
  node.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[contenteditable='true']") && event.detail > 1) return;
    const phone = node.closest(".phone");
    if (!phone) return;

    activeDrag = node;
    const rect = node.getBoundingClientRect();
    const parentRect = phone.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    node.classList.add("dragging");
    node.style.position = "absolute";
    node.style.left = `${rect.left - parentRect.left}px`;
    node.style.top = `${rect.top - parentRect.top}px`;
    node.style.width = `${rect.width}px`;
    phone.appendChild(node);
    node.setPointerCapture(event.pointerId);
  });
}

function installDrag(root = document) {
  root.querySelectorAll(".draggable").forEach((node) => {
    if (node.dataset.dragReady) return;
    node.dataset.dragReady = "true";
    activateDraggable(node);
  });
}

document.addEventListener("pointermove", (event) => {
  if (!activeDrag) return;
  const phone = activeDrag.closest(".phone");
  const rect = phone.getBoundingClientRect();
  activeDrag.style.left = `${event.clientX - rect.left - offsetX}px`;
  activeDrag.style.top = `${event.clientY - rect.top - offsetY}px`;
});

document.addEventListener("pointerup", () => {
  if (!activeDrag) return;
  activeDrag.classList.remove("dragging");
  activeDrag = null;
});

document.querySelectorAll(".palette-item").forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", item.dataset.template);
  });
});

document.querySelectorAll(".phone").forEach((phone) => {
  phone.addEventListener("dragover", (event) => event.preventDefault());
  phone.addEventListener("drop", (event) => {
    event.preventDefault();
    const key = event.dataTransfer.getData("text/plain");
    if (!templates[key]) return;

    const wrapper = document.createElement("div");
    wrapper.innerHTML = templates[key].trim();
    const node = wrapper.firstElementChild;
    const rect = phone.getBoundingClientRect();
    node.style.position = "absolute";
    node.style.left = `${event.clientX - rect.left - 40}px`;
    node.style.top = `${event.clientY - rect.top - 18}px`;
    node.style.width = key === "product" ? "132px" : "calc(100% - 24px)";
    phone.appendChild(node);
    makeEditable(node);
    installDrag(node);
  });
});

makeEditable();
installDrag();
