let names = [
  "Apple",
  "Banana",
  "Orange",
  "Carrot",
  "Broccoli",
  "Grapes",
  "Tomato",
  "Spinach",
  "Strawberry",
  "Cucumber",
  "Kiwi",
  "Avocado",
  "Pineapple",
  "Bell Pepper",
  "Watermelon",
  "Cherry",
  "Zucchini",
  "Blueberry",
  "Potato",
  "Lettuce",
];
for (let el of names) {
  setInterval(
    () =>
      fetch(`https://www.fruityvice.com/api/fruit/${el}/image`)
        .then((response) => response.json())
        .then((data) => console.log(data)),
    2000
  );
}
