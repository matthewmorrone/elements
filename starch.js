var log = console.log.bind(console)

function Nihil() {}
Nihil.prototype = Object.create(null)

function isObject(object) {
	var type = typeof object
	return type === 'function' || type === 'object' && !!object
}
var nativeAlert = window.alert
window.alert = function() {
	return nativeAlert(arguments.join("\n"))
}
Object.defineProperty(Object.prototype, "define", {
	configurable: true,
	enumerable: false,
	writable: true,
	value: function(name, value) {
		if (Object[name]) {
			delete Object[name]
		}
		Object.defineProperty(this, name, {
			configurable: true,
			enumerable: false,
			writable: true,
			value: value
		})
		return this
	}
})
Object.prototype.define("hasProperty", function(a) {
	return Object.hasOwnProperty(this, a)
})
Object.prototype.define("getPropertyName", function(a) {
	return Object.getOwnPropertyName(this, a)
})
Object.prototype.define("getPropertyNames", function() {
	return Object.getOwnPropertyNames(this)
})
Object.prototype.define("getPropertyDescriptor", function(a) {
	return Object.getOwnPropertyDescriptor(this, a)
})
Object.prototype.define("getPropertyDescriptors", function() {
	var result = {}
	Object.getOwnPropertyNames(this).each(function(a, b) {
		result[a] = Object.getOwnPropertyDescriptor(this, a)
	}, this)
	return result
})
Object.prototype.define("each", function(f) {
	for (var i in this) {
		f && this.hasProperty(i) && f.call(this, this[i], i)
	}
	return this
})
Object.prototype.define("forEach", function(callback, scope) {
	var collection = this
	if (Object.prototype.toString.call(collection) === '[object Object]') {
		for (var prop in collection) {
			if (Object.prototype.hasOwnProperty.call(collection, prop)) {
				callback.call(scope, collection[prop], prop, collection)
			}
		}
	} else {
		for (var i = 0, len = collection.length; i < len; i++) {
			callback.call(scope, collection[i], i, collection)
		}
	}
})
Object.define("setPrototypeOf", function(obj, proto) {
	obj.__proto__ = proto
	return obj
})
Object.prototype.define("map", function(fn, ctx) {
	var ctx = ctx || this,
		self = this,
		result = {}
	Object.keys(self).each(function(v, k) {
		result[k] = fn.call(ctx, self[k], k, self)
	})
	return result
})
Object.prototype.define("log", function() {
	return log(this)
})
Object.prototype.define("size", function() {
	return this.length || Object.keys(this).length
})
Object.prototype.define("str", function() {
	return JSON.stringify(this)
})
Object.prototype.define("toInt", function() {
	return parseInt(this, (arguments[0] || 10))
})
Object.prototype.define("clone", function() {
	return JSON.parse(JSON.stringify(this))
})
Object.prototype.define("values", function() {
	var keys = Object.keys(this)
	var ret = []
	for (var i = 0; i < keys.length; i++) {
		ret.push(this[keys[i]])
	}
	return ret
})
Object.prototype.define("setPrototypeOf", function(obj, proto) {
	obj.__proto__ = proto
	return obj
})
Array.prototype.define("flatten", function(ret) {
	var arr = this,
		ret = ret || [],
		len = arr.length
	for (var i = 0; i < len; ++i) {
		if (Array.isArray(arr[i])) {
			arr[i].flatten(ret)
		} else {
			ret.push(arr[i])
		}
	}
	return ret
})
Array.prototype.define("first", function() {
	return this[0]
})
Array.prototype.define("start", function() {
	return 0
})
Array.prototype.define("end", function() {
	return this.length - 1
})
Array.prototype.define("last", function() {
	return this[this.length - 1]
})
Array.prototype.define("each", Array.prototype.forEach)
Array.define("fill", function(n) {
	return Array.apply(null, Array(n)).map(function(_, i) {
		return i
	})
})
