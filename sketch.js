let size = getSize();

let bookshelf, add_button;
let bookshelf_info = {x: size[0] / 2, y: size[1] * 3 / 4, w: size[1] / 2, h: size[1] / 2};
let button_info = {
  x: bookshelf_info.x - size[1] / 16,
  y: size[1] / 3 + size[1] / 16,
  w: size[1] / 8,
  h: size[1] / 8
};

let book_w;
let book_h;
let books = {};
let count = 0;

let gravity = 0.5;
let isDrag = false;
let nowDrag = null;

function preload() {
  bookshelf = loadImage("images/book_shelf.png");
}

function setup() {
  createCanvas(size[0], size[1]);

  imageMode(CENTER);

  add_button = createImg("images/add.png", "LOADING....");
  add_button.size(button_info.w, button_info.h);
  add_button.position(button_info.x, button_info.y);
  add_button.mousePressed(inputAction);
}

function draw() {
  background(254, 223, 225);
  image(bookshelf, bookshelf_info.x, bookshelf_info.y, bookshelf_info.w, bookshelf_info.h);
  for(let i = 0; i < books.length; i++) {
    if (books[i].y <= size[1] - size[1] / 8){
      if (!isDrag && !books[i].putBook) {
        books[i].d += gravity;
        books[i].y += books[i].d;
      }
    }
    if (!books[i].inShelf){
      image(books[i].cover, books[i].x, books[i].y, size[0] / 11, size[0] / 11 * 1.05); // 需再調整大小，須確定圖片
    } else {
      image(books[i].back, books[i].x, books[i].y, size[1] / 8 * 0.1, size[1] / 8);
    } 
  }
}

function getSize() {
  var body = document.body, html = document.documentElement;
  var screen_width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
  var screen_height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  return [screen_width, screen_height]
}

function inputAction() {
  var isbn = prompt("ISBN????");
  if (isbn !== null) {
    if (isbn.length != 13) {
      alert("格式輸入錯誤，請輸入 13 碼 ISBN");
    } else if (!checkData(isbn)) {
      alert("查無書籍");
    } else {
      drawBook(isbn);
      getBookData(isbn);
    }
  }
}

function drawBook(isbn) {
  let x = random(1, size[0]);
  let y = -10;
  let d = 0;
  let cover_photo = loadImage(`./images/books/${isbn}.png`);
  let back_photo = loadImage(`./images/books/${isbn}_back.png`);
  
  books[count] = {cover: cover_photo, back: back_photo, x: x, y: y, d: d, inShelf: false, putBook: false};
  count++;
}

function mouseDragged() {
  for (let i = 0; i < books.length; i++) {
    if ((mouseX > books[i].x - size[0] / 22) && (mouseX < books[i].x + size[0] / 22)) {
      if ((mouseY > books[i].y - size[0] / 22) && (mouseY < books[i].y + size[0] / 22)) {
        if ((mouseX > size[0] / 2  - size[1] / 4) && (mouseX < size[0] / 2  + size[1] / 4)){
          if ((mouseY > size[1] * 3 / 4  - size[1] / 4) && (mouseY < size[1] * 3 / 4  + size[1] / 4)) {
            books[i].inShelf = true;
          } else {
            books[i].inShelf = false;
          }
        } else {
          books[i].inShelf = false;
        }
        isDrag = true;
        nowDrag = i;
        books[i].x = mouseX;
        books[i].y = mouseY;
      }
    }
  }
}

function mouseReleased() {
  if (nowDrag != null) {
    books[nowDrag].d = 0;
  } 
  if ((mouseX > size[0] / 2  - size[1] / 4) && (mouseX < size[0] / 2  + size[1] / 4)) {
    if ((mouseY > size[1] * 3 / 4  - size[1] / 4) && (mouseY < size[1] * 3 / 4  + size[1] / 4)) {
      books[nowDrag].putBook = true;
    } else {
      books[nowDrag].putBook = false;
    }
  } else {
    books[nowDrag].putBook = false;
  }
  isDrag = false;
  nowDrag = null;
}

async function getBookData(ISBN) {
  const response = await fetch(`http://127.0.0.1:8000/get_book/?ISBN=${ISBN}`)
  var data = await response.json()
  console.log(data)
}

function checkData(isbn) {
  req = new XMLHttpRequest();
  req.open('GET', `images/books/${isbn}.png`, false);
  req.send();
  if (req.status === 200)
    return true;
  else
    return false;
}