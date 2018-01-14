
//WARNING: Implement version-specific
function assert(condition, message) {
    if (!condition) {
        message = message || "Assertion failed";
        if (typeof Error !== "undefined") {
            throw new Error(message);
        }
        throw message; // Fallback
    }
}

/**
 * Extends one class with another.
 *
 * @param {Function} destination The class that should be inheriting things.
 * @param {Function} source The parent class that should be inherited from.
 * @return {Object} The prototype of the parent.
 */
function extend(destination, source) {
    destination.prototype = Object.create(source.prototype);
    destination.prototype.constructor = destination;
    return source.prototype;
}


function isInt(value) {
    var x;
    if (isNaN(value)) {
      return false;
    }
    x = parseFloat(value);
    return (x | 0) === x;
}


function Vector2(x, y) {
    this.x = x;
    this.y = y;
}


function removeAtIndexFromArray(array, index) {    
    if (index !== -1) {
        array.splice(index, 1);
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Event() {

    this.callbacks = [];

    this.subscribe = function(callback) {
        this.callbacks.push(callback);
    }

    this.unsubscribe = function(callback) {
        this.callbacks = this.callbacks.filter((subscriber) => subscriber !== callback);
    }

    this.fire = function() {
        for(var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i](arguments);
        }
    }
}