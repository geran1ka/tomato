const init = () => {
  const Goods = function(price, name, discount = 0) {
    this.price = price;
    this.name = name;
    this.discount = discount;
  };

  const FoodGoods = function(price, name, discount, calories) {
    Goods.call(this, price, name, discount);
    this.calories = calories;
  };

  const СlothingGoods = function(price, name, discount, material) {
    Goods.call(this, price, name, discount);
    this.material = material;
  };

  const TechnicsGoods = function(price, name, discount, typeOfEquipment) {
    Goods.call(this, price, name, discount);
    this.typeOfEquipment = typeOfEquipment;
  };


  const Cart = function(items = []) {
    this.goods = items;
    this.totalPrice = 0;
    this.count = 0;
  };

  Cart.prototype.calculateGoodsPrice = function() {
    this.totalPrice = this.goods.reduce((acc, item) => acc + (item.price - item.price * item.discount / 100), 0);
  };

  Cart.prototype.addGoods = function(item) {
    this.goods.push(item);
    this.increaseCount();
    this.calculateGoodsPrice();
  };

  Cart.prototype.getTotalPrice = function() {
    return this.totalPrice;
  };

  Cart.prototype.increaseCount = function() {
    return this.count += 1;
  };

  Cart.prototype.clear = function() {
    this.goods = [];
    this.totalPrice = 0;
    this.count = 0;
  };

  Cart.prototype.print = function() {
    console.log(JSON.stringify(this.goods));
    console.log('this.totalPrice: ', this.totalPrice);
  };

  const cart = new Cart();
  console.log('cart: ', cart);

  const item1 = new FoodGoods(100, 'banan', 0, 89);
  console.log('item1: ', item1);
  const item2 = new СlothingGoods(250, 'Кабель КВВГнг-LS 4x1.5', 10, 'cuprum');
  console.log('item2: ', item2);
  const item3 = new TechnicsGoods(10000, 'Смартфон Xiaomi Redmi 9A 32GB Aurora Green', 20, 'phone');
  console.log('item3: ', item3);

  cart.addGoods(item1);
  cart.addGoods(item2);
  cart.addGoods(item3);
  cart.print();
  cart.clear();
  cart.print();
};

init();
