(function(){
	var root = this;
	var Polymorphism = function() {
		console.log("welcome the Polymorphism !.");
	};

	// 工具类
	var each = function(loopable,callback,self){
			var additionalArgs = Array.prototype.slice.call(arguments, 3);
			// 检查空或者未定义
			if (loopable){
				if (loopable.length === +loopable.length){
					var i;
					for (i=0; i<loopable.length; i++){
						callback.apply(self,[loopable[i], i].concat(additionalArgs));
					}
				}
				else{
					for (var item in loopable){
						callback.apply(self,[loopable[item],item].concat(additionalArgs));
					}
				}
			}
		},
		extend = function(base){
			each(Array.prototype.slice.call(arguments,1), function(extensionObject) {
				each(extensionObject,function(value,key){
					if (extensionObject.hasOwnProperty(key)) base[key] = value;
				});
			});
			return base;
		};

	// 
	Polymorphism.Type = function(data){
		this.initialize.call(this,data);
	};

	extend(Polymorphism.Type.prototype, {
		initialize : function(){ return this;},
		toString : function() {return this;}
	});

	Polymorphism.Type.extend = function(extensions){

		var parent = this;

		var PolymorphismType = function(){
			return parent.apply(this,arguments);
		};

		//Now overwrite some of the properties in the base class with the new extensions
		extend(PolymorphismType.prototype, extensions);

		if (extensions.name || parent.prototype.name){

			var chartName = extensions.name || parent.prototype.name;


			//Register this new chart type in the Chart prototype
			Polymorphism.prototype[chartName] = function(data){
				return new PolymorphismType(data,this);
			};
		} else{
			warn("Name not provided for this chart, so it hasn't been registered");
		}
		return parent;
	};
	root.Polymorphism = Polymorphism;
}).call(this);


(function(){
	"use strict";

	var root = this,
		Polymorphism = root.Polymorphism;

	Polymorphism.Type.extend({
		name: "Bar",
		initialize:  function(data){

			//Expose options as a scope variable here so we can access it in the ScaleClass
			console.log("bar bar bar !!!");
			//this.toString();
		},

		toString : function() {
			console.log("toString !!!");
		}
	});


}).call(this);


(function(){
	"use strict";

	var root = this,
		Polymorphism = root.Polymorphism;

	Polymorphism.Type.extend({
		name: "Pie",
		initialize:  function(data){

			//Expose options as a scope variable here so we can access it in the ScaleClass
			console.log("Pie Pie Pie !!!");
			//this.toString();
		},

		toString : function() {
			console.log("Pie toString !!!");
		}
	});


}).call(this);