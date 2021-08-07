const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tabs = $$(".tab-item"); // lấy tất cả các thẻ có class là tab-item và gán vào biến tabs
const panes = $$(".tab-pane"); // lấy tất cả các thẻ có class là tab-pane và gán vào biến panes

const tabActive = $(".tab-item.active"); // lấy thẻ có tên class là tab-item và active ra và gán cho tabActive
const line = $(".tabs .line"); // lấy thẻ có class là line và gán vào biến line

// tạo thanh trượt 
line.style.left = tabActive.offsetLeft + "px";
line.style.width = tabActive.offsetWidth + "px";

// dùng forEach để lặp qua
tabs.forEach((tab, index) => {
  const pane = panes[index];

  tab.onclick = function () {
    $(".tab-item.active").classList.remove("active"); // bỏ active đi khi không được bấm vào
    $(".tab-pane.active").classList.remove("active"); // bỏ active đi khi không được bấm vào

    // khi bấm trỏ đến đâu thì thanh trượt chạy đến đó
    line.style.left = this.offsetLeft + "px";
    line.style.width = this.offsetWidth + "px";

    this.classList.add("active"); // thêm active khi được bấm vào
    pane.classList.add("active"); // thêm active khi được bấm vào
  };
});
