let bookshelf;
let button
let size = get_size();
let add_mode = False

function preload() {
  bookshelf = loadImage("images/book_shelf.png");
}

function setup() {
  createCanvas(size[0], size[1]);
  button = createImg("images/add.png","LOADING....TSE");
  button.size(size[1]/8, size[1]/8);
  button.position(size[0] / 2 - size[1] / 16, size[1] / 3 + size[1] / 16);
  button.mousePressed(hideAddButton);

  imageMode(CENTER);

  
  
  // button.mousePressed(changeBG);
  // image(bg, width/2, height/2);
  // input_title = createInput();
  // input_title.position(20, 65);
  // button_title = createButton('submit');
  // button_title.position(input_title.x + input_title.width, 65);
  // button_title.mousePressed(get_title);
  // createElement('h2', 'Enter book title').position(20, 5);
  // input_isbn = createInput();
  // input_isbn.position(20, 160);
  // button_isbn = createButton('submit');
  // button_isbn.position(input_isbn.x + input_isbn.width, 160);
  // button_isbn.mousePressed(get_data);
  // createElement('h2', 'Enter book isbn').position(20, 120);
  // textAlign(CENTER);
  // textSize(50);
}

function draw() {
  background(254, 223, 225);
  image(bookshelf, size[0] / 2, size[1] * 3 / 4, size[1]/2, size[1]/2);
}

function hideAddButton() {
  button.position(-100, -100);
  input_title = createInput();
  input_title.position(20, 65);
  button_title = createButton('submit');
  button_title.position(input_title.x + input_title.width, 65);
  button_title.mousePressed(hideInput);
}
function hideInput() {
  button.position(size[0] / 2 - size[1] / 16, size[1] / 3 + size[1] / 16);
  input_title.position(-100, -100);
  button_title.position(-100, -100);
}

// function get_data() {
//   const title = input_title.value()
//   console.log(title)
//   const isbn = input_isbn.value()
//   console.log(isbn)
// }


function get_size(){
  var body = document.body, html = document.documentElement;

  var width = Math.max(body.scrollWidth, body.offsetWidth, html.clientWidth, html.scrollWidth, html.offsetWidth);
  var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

  return [width, height]
}
