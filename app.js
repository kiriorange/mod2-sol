(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController (ShoppingListCheckOffService) {
    var bought = this;

    bought.list = ShoppingListCheckOffService.getBoughtItems();
    bought.empty = function () {
      return ShoppingListCheckOffService.boughtEmpty();
    }

  }

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController (ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.list = ShoppingListCheckOffService.getBuyItems();
    toBuy.empty = function() {
      return ShoppingListCheckOffService.buyEmpty();
    }
    toBuy.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };

  }

  function ShoppingListCheckOffService() {
    var service = this;

    var bought = [], toBuy = generateRandomItems(5);

    service.buyItem = function (index) {
      addItem(toBuy[index]);
      removeItem(index)
    }

    service.getBoughtItems = function () {
      return bought;
    };

    service.getBuyItems = function () {
      return toBuy;
    };

    service.buyEmpty = function() {
      return toBuy.length === 0;
    };

    service.boughtEmpty = function() {
      return bought.length === 0;
    };

    function addItem (item) {
      bought.push(item);
    };

    function removeItem (index) {
      toBuy.splice(index, 1);
    };

  }

  function Item(itemName, quantity) {
    this.itemName = itemName;
    this.quantity = quantity;
  }

  function generateRandomItems(quantity) {
    var itemName, item, ranNum, itemQuantity, maxQuantity = 10, itemList = [];

    for (var i = 0; i < quantity; i++) {
      ranNum = Math.floor(Math.random() * items.length);
      itemName = items[ranNum];
      items.splice(ranNum, 1);
      itemQuantity = Math.floor(Math.random() * maxQuantity) + 1;
      item = new Item(itemName, itemQuantity);
      itemList.push(item);
    }

    return itemList;
  }

  var items = ['cookies', 'chips', 'coke', 'candy', 'chocolates', 'cakes', 'cinammon rolls', 'cocktails'];

})()
