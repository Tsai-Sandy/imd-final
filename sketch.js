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
let isDrag_list = []
let inShelf = [];
let putBook = [];
let isbn_list = [];
let isDisplay = false;
let data_list = [];
let isClick_list = []
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
  background(254, 249, 244);
  image(bookshelf, size[0] / 2, size[1] * 3 / 4, size[1] / 2, size[1] / 2);
  for(let i = 0; i < books.length; i++) {
    if (books_y[i] <= size[1] - size[1] / 8){
      if (!isDrag_list[i] && !putBook[i]) {
        books_a[i] += gravity;
        books_y[i] += books_a[i];
        isDisplay = false
      }
    }
    if (!inShelf[i]){
      image(books[i], books_x[i], books_y[i], size[1] / 4.5 *0.75, size[1] / 4.5); // 需再調整大小，須確定圖片
    } else {
      image(books_back[i], books_x[i], books_y[i], size[1] / 6 * 0.15, size[1] / 6);
    }
    if (isDisplay) {
      display_data(isbn_list[i])
    }
  }
}

function display_data(isbn) {
  for(let i = 0; i < data_list.length; i++) {
    if (data_list[i].ISBN === isbn && isClick_list[i]) {
      textSize(32);
      text(data_list[i].Title, 10, 40);
      text(`作者：${data_list[i].Creator}`, 10, 80);
      text(`出版社：${data_list[i].Publisher}`, 10, 120);
      text(`ISBN：${data_list[i].ISBN}`, 10, 160);
      fill(0, 102, 153);
    }
  }
}

function mousePressed() {
  for (let i = 0; i < books.length; i++) {
    if ((mouseX > books_x[i] - 50) && (mouseX < books_x[i] + 50)) {
      if ((mouseY > books_y[i] - 50) && (mouseY < books_y[i] + 50)) {
        if ((mouseX > size[0] / 2  - size[1] / 4) && (mouseX < size[0] / 2  + size[1] / 4)){
          if ((mouseY > size[1] * 3 / 4  - size[1] / 4) && (mouseY < size[1] * 3 / 4  + size[1] / 4)) {
            for(let z = 0; z < isClick_list.length; z++) {
              isClick_list[z] = false
            }
          }
          isClick_list[i] = true
          isDisplay = true
        }
      }
    }
  }
}

function hideAddButton() {
  add_button.position(-100, -100);
  var isbn = prompt("請輸入 13 碼 ISBN:");
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
    isDrag_list.push(false)
    isClick_list.push(false)
  }
}

function drawBook(isbn) {
  x = random(1, size[0]);
  y = -10;

  isbn_list.push(isbn)
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
        for(let z = 0; z < isDrag_list.length; z++) {
          isDrag_list[z] = false
        }
        isDrag_list[i] = true;
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
  
  isDrag_list[nowDrag] = false;
  nowDrag = null;
}

async function getBookData(ISBN) {
  const response = await fetch(`http://127.0.0.1:8000/get_book/?ISBN=${ISBN}`)
  var data = await response.json()
  console.log(data)
  data_list.push(data)
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