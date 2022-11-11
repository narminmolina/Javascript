let arr1 = [2, 5, 1, 2, 3, 5, 6];
let arr2 = [2, 1, 1, 2, 3, 5, 6];
let arr3 = [2, 3, 1, 4, 7, 5, 6];

let getFirstRecurring = function (input) {
  let map = {};
  for (let i = 0; i < input.length; i++) {
    if (map[input[i]] !== undefined) {
      return console.log(input[i]);
    } else {
      map[input[i]] = i;
    }
  }
  return undefined;
};
getFirstRecurring(arr1);

let swapDimentions = function () {
  let imgs = document.querySelectorAll("img");
  let newDimentions = imgs.map((img) => {
    let height = img.clientHeight;
    let width = img.clientWidth;
    img.clientHeight = width;
    img.clientHeight = height;
  });
  return newDimentions;
};
