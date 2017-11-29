
var SkinColor = {
    WHITE : 0,
    BLACK: 1,
    ASIAN: 2,
    ARAB: 3
};

function Person(firstName, lastName, age, skinColor) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.skinColor = skinColor;
}

var Suzy = new Person("Suzy", "Rottencrotch", 24, SkinColor.WHITE);
var Sam = new Person("Sam", "Allen", 23, SkinColor.ASIAN);
var Taylor = new Person("Taylor", "Bishop", 26, SkinColor.WHITE);

console.log(Suzy);

//alert(Suzy);