const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`)
    this.energy += amount
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`)
    this.energy += length
  },
  play(length) {
    console.log(`${this.name} is playing.`)
    this.energy -= length
  }
}


/** 
 * Functional Instantiation 
 * - CONS: create a new funtion every time an instance of Animal is created
 * */
{
  function Animal (name, energy) {
    let animal = {}
    animal.name = name
    animal.energy = energy
  
    animal.eat = function (amount) {
      console.log(`${this.name} is eating.`)
      this.energy += amount
    }
  
    animal.sleep = function (length) {
      console.log(`${this.name} is sleeping.`)
      this.energy += length
    }
  
    animal.play = function (length) {
      console.log(`${this.name} is playing.`)
      this.energy -= length
    }
  
    return animal
  }
  const dog = Animal('Dog 1', 10);
  dog.eat();
}

/** 
 * Functional Instantiation with Shared Methods 
 * + PROS: fix the memory waste issue
 * - CONS: function is verbal
 * */
{
  function Animal (name, energy) {
    let animal = {};
    animal.name = name
    animal.energy = energy
    animal.eat = animalMethods.eat
    animal.sleep = animalMethods.sleep
    animal.play = animalMethods.play
  
    return animal
  }
  
  const dog = Animal('Dog 2', 10);
  dog.eat();
}

/**  Object.create only  */
{
  const animal = {
    init: function(name, energy){
      this.name = name;
      this.energy = energy;
      return this;
    },
    eat: function(amount) {
      console.log(`${this.name} is eating.`)
      this.energy += amount
    },
    sleep: function(length) {
      console.log(`${this.name} is sleeping.`)
      this.energy += length
    },
    play: function(length) {
      console.log(`${this.name} is playing.`)
      this.energy -= length
    }
  }
  const dog = Object.create(animal).init('Dog 3', 10).eat();
}

/** 
 * Functional Instantiation, directly modify [[Prototype]]
 * + PROS: makes the code much cleaner
 * - CONS: directly modify [[Prototype]] which is very slow 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto 
 * */
{
  function Animal (name, energy) {
    let animal = {};
    animal.name = name
    animal.energy = energy
  
    return animal
  }
  
  const dog = Animal('Dog 4', 10)
  dog.__proto__ = animalMethods; 
  // Object.setPrototypeOf(dog, animalMethods)
  dog.eat();
}

/** Functional Instantiation with prototype and Object.create  */
{
  function Animal (name, energy) {
    const animal = Object.create(Animal.prototype);
    animal.name = name
    animal.energy = energy
  
    return animal
  }
  
  Animal.prototype = {
    eat(amount) {
      console.log(`${this.name} is eating.`)
      this.energy += amount
    },
    sleep(length) {
      console.log(`${this.name} is sleeping.`)
      this.energy += length
    },
    play(length) {
      console.log(`${this.name} is playing.`)
      this.energy -= length
    }
  };
  
  const dog4 = Animal('Dog 4', 10);
  dog4.eat();  
}

/**  Constructor function and new keyword  */
{
  function Animal (name, energy) {
    this.name = name
    this.energy = energy
  }
  
  Animal.prototype = {
    eat(amount) {
      console.log(`${this.name} is eating.`)
      this.energy += amount
    },
    sleep(length) {
      console.log(`${this.name} is sleeping.`)
      this.energy += length
    },
    play(length) {
      console.log(`${this.name} is playing.`)
      this.energy -= length
    }
  };
  
  const dog5 = new Animal('Dog 5', 10);
  dog5.eat();
}

/** ========= Tests ========= **/  
const obj1 = {};
console.log(obj1.prototype);
console.log(obj1.__proto__ === Object.prototype)

const func1 = function(){};
console.log(func1.prototype)
console.log(func1.__proto__.__proto__ === Object.prototype)
func1.prototype.newProperty = 'New property';
const instanceOfFunc1 = new func1();
console.log(instanceOfFunc1.newProperty);

console.log(func1.prototype.__proto__ === Object.prototype)