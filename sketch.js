let bookshelf, add_button;
let size = getSize();
let books = [];
let books_back = [];
let books_x = [];
let books_y = [];
let books_a = [];
let gravity = 0.5;
let isDrag = false;
let nowDrag = null;
let inShelf = [];
let putBook = [];

function preload() {
  bookshelf = loadImage("images/book_shelf.png");
}

function setup() {
  createCanvas(size[0], size[1]);

  imageMode(CENTER);

  add_button = createImg("images/add.png", "LOADING....");
  add_button.size(size[1]/8, size[1]/8);
  add_button.position(size[0] / 2 - size[1] / 16, size[1] / 3 + size[1] / 16);
  add_button.mousePressed(hideAddButton);
}

function draw() {
  background(254, 223, 225);
  image(bookshelf, size[0] / 2, size[1] * 3 / 4, size[1] / 2, size[1] / 2);
  for(let i = 0; i < books.length; i++) {
    if (books_y[i] <= size[1] - size[1] / 8){
      if (!isDrag && !putBook[i]) {
        books_a[i] += gravity;
        books_y[i] += books_a[i];
      }
    }
    if (!inShelf[i]){
      image(books[i], books_x[i], books_y[i], size[0] / 11, size[0] / 11 * 1.05); // 需再調整大小，須確定圖片
    } else {
      image(books_back[i], books_x[i], books_y[i], size[1] / 8 * 0.1, size[1] / 8);
    } 
  }
}

function hideAddButton() {
  add_button.position(-100, -100);
  var isbn = prompt("ISBN????");
  if (isbn !== null) {
    hideInput(isbn);
  } else {
    add_button.position(size[0] / 2 - size[1] / 16, size[1] / 3 + size[1] / 16);
  }
}

function hideInput(isbn) {
  add_button.position(size[0] / 2 - size[1] / 16, size[1] / 3 + size[1] / 16);

  if (isbn.length != 13) {
    alert("格式輸入錯誤，請輸入 13 碼 ISBN");
  } else if (!checkData(isbn)) {
    alert("查無書籍");
  } else {
    drawBook(isbn);
    getBookData(isbn);
  }
}

function drawBook(isbn) {
  x = random(1, size[0]);
  y = -10;

  books.push(loadImage(`./images/books/${isbn}.png`));
  books_back.push(loadImage(`./images/books/${isbn}_back.png`))
  books_x.push(x);
  books_y.push(y);
  books_a.push(0);
  inShelf.push(false);
  putBook.push(false);
}

function getSize() {
  var body = document.body, html = document.documentElement;
  var screen_width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
  var screen_height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  return [screen_width, screen_height]
}

function mouseDragged() {
  for (let i = 0; i < books.length; i++) {
    if ((mouseX > books_x[i] - size[0] / 22) && (mouseX < books_x[i] + size[0] / 22)) {
      if ((mouseY > books_y[i] - size[0] / 22) && (mouseY < books_y[i] + size[0] / 22)) {
        if ((mouseX > size[0] / 2  - size[1] / 4) && (mouseX < size[0] / 2  + size[1] / 4)){
          if ((mouseY > size[1] * 3 / 4  - size[1] / 4) && (mouseY < size[1] * 3 / 4  + size[1] / 4)) {
            inShelf[i] = true;
          } else {
            inShelf[i] = false;
          }
        } else {
          inShelf[i] = false;
        }
        isDrag = true;
        nowDrag = i;
        books_x[i] = mouseX;
        books_y[i] = mouseY;
      }
    }
  }
}

function mouseReleased() {
  if (nowDrag != null) {
    books_a[nowDrag] = 0;
  } 
  if ((mouseX > size[0] / 2  - size[1] / 4) && (mouseX < size[0] / 2  + size[1] / 4)) {
    if ((mouseY > size[1] * 3 / 4  - size[1] / 4) && (mouseY < size[1] * 3 / 4  + size[1] / 4)) {
      putBook[nowDrag] = true;
    } else {
      putBook[nowDrag] = false;
    }
  } else {
    putBook[nowDrag] = false;
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