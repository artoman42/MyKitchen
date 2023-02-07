var express = require('express');

var router = express.Router();

router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    class Product{
        #Count = 1;
        constructor(Name, Category){
            this.Name = Name;
            this.Category = Category;
            
        }
        set Count(value){
            if(value>0) this.#Count = value;
        }
        get Count(){
            return this.#Count;
        }
    }
    
    class Dish{
        
        constructor(Name, Products, Recipe){
            this.Name = Name;
            this.Products = Products;   
            this.Recipe = Recipe;
        }
    }
    
    
    console.log("M");
    const jsdom = require("jsdom");
    console.log("M");
    const {JSDOM} = jsdom;
    const {window : {document}} = new JSDOM(`<!DOCTYPE html> <html lang="en"> <head>     <meta charset="UTF-8">     <meta http-equiv="X-UA-Compatible" content="IE=edge">     <link href="../styles/style.css" rel="stylesheet" type="text/css">    <script type="text/javascript" src="./main.js"></script>      <meta name="viewport" content="width=device-width, initial-scale=1.0">     <title>Document</title> </head> <body>     <select name="SelectDish" value="SelectDish" id="SelectDish" class="">         <option value="">SelectDish</option>     </select>     <table id="productTbl">     </table>     <textarea name="" id="recipeTxt" cols="30" rows="10"></textarea>     <select name="" id="SelectCategory">         <option>Всі</option>     </select>     <p> Наявні продукти : </p>     <p>Можна приготувати :</p> </body> </html>`);
    var product1 = new Product("Картопля", "Овоч");
    var product2 = new Product("Вишня", "Ягода");
    var product3 = new Product("Борошно", "Допоможні продукти");
    var product4 = new Product("Молоко", "Молочні продукти");
    var product5 = new Product("Вівсянка", "Каші");
    
    var dish1 = new Dish("Вареники з вишнею", [product2, product3], "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus, magna at scelerisque auctor, lectus ex maximus leo, at ornare turpis urna nec tortor. Aliquam vel ullamcorper sapien, sed scelerisque leo. Nulla posuere ornare lectus, eget iaculis sapien finibus vitae. Curabitur placerat pretium diam nec lobortis. Duis condimentum, arcu nec tincidunt faucibus, neque ante porttitor sapien, pharetra iaculis neque justo a nulla. Aliquam fringilla sem et consectetur vulputate. Morbi et sem rhoncus orci feugiat ornare." );
    var dish2 = new Dish("Вареники з картоплею",[ product1, product3], "Просіюємо 400 грам борошна. Додаємо пів чайної ложки солі. Сіль добре вмішуємо в борошно. ");
    var dish3 = new Dish("Вівсянка з молоком", [product4, product5], "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus, magna at scelerisque auctor, lectus ex maximus leo, at ornare turpis urna nec tortor. Aliquam vel ullamcorper sapien, sed scelerisque leo. Nulla posuere ornare lectus, eget iaculis sapien finibus vitae. Curabitur placerat pretium diam nec lobortis. Duis condimentum, arcu nec tincidunt faucibus, neque ante porttitor sapien, pharetra iaculis neque justo a nulla. Aliquam fringilla sem et consectetur vulputate. Morbi et sem rhoncus orci feugiat ornare.");
    
    var dishList = [dish1, dish2, dish3];
    var presentProductList = [product1, product2, product3];
    var categoryList = ["Овоч", "Ягода", "Допоможні продукти", "Молочні продукти",  "Каші" ];
    // function renderDishLst(dishSel){
    //     dishSel.length = 1; 
    //     dishList.forEach(x=> dishSel.options = new Option(x,x));
    // }
    
  //  dom.window.onload = function(){
        var dishSel = dom.window.document.getElementById("SelectDish");
        var productTbl = dom.window.document.getElementById("productTbl");
        var recipeTxt = dom.window.document.getElementById("recipeTxt");
        var categorySel = dom.window.document.getElementById("SelectCategory");
        //renderDishLst(dishSel);
         dishSel.length = 1; 
        dishList.forEach(x=>{
             dishSel.options[dishSel.options.length] = new Option(x.Name,x.Name);
           //  console.log(x.Name);
        });
        categoryList.forEach(x=>{
            categorySel.options[categorySel.options.length] = new Option (x, x);
        })
    
    
    dishSel.onchange = function(){
       
        productTbl.innerHTML = "<tr> <th>Name</th> <th>Count</th> </tr>";
    
        dishList.find(x => x.Name === this.value).Products.forEach(y => {
      
            productTbl.innerHTML += `<tr><td>${y.Name}</td><td>${y.Count}</td></tr>`;
         
        })
    
     
       recipeTxt.value = dishList.find(x =>x.Name === this.value).Recipe;
    }
    var prodLst = dom.window.document.createElement("ul");
    presentProductList.forEach(x=> {
        var prod = dom.window.document.createElement("li");
        prod.innerHTML = `${x.Name}`;
        prodLst.appendChild(prod);
        
    })
    dom.window.document.body.append(prodLst);
    categorySel.onchange = function(){
        while(prodLst.firstChild){
            prodLst.removeChild(prodLst.firstChild);
        }
        if(this.value === "Всі") 
        {
            presentProductList.forEach(x=> {
                var prod = dom.window.document.createElement("li");
                prod.innerHTML = `${x.Name}`;
                prodLst.appendChild(prod);
                
            })
        }
        presentProductList.forEach(x =>{
            if( x.Category === this.value){
                var prod = dom.window.document.createElement("li");
                prod.innerHTML = `${x.Name}`;
                prodLst.appendChild(prod);
            }
        })
        dom.window.document.body.append(prodLst);
    }
    var canCook = [];
    canCook = dishList.filter( x =>{
        let count = 0;
        presentProductList.forEach(y => {
            x.Products.forEach(z=>{
                if(y === z) count++;
            });
     })
        if(count === x.Products.length) return true;
    });
    //console.log(canCook);
    let canCookLst = dom.window.document.createElement("ul");
    canCook.forEach(x=>{
        let canCookEl = dom.window.document.createElement("li");
        canCookEl.innerHTML = `${x.Name}`;
        canCookLst.appendChild(canCookEl);
    })
    dom.window.document.body.append(canCookLst);
    
    //}
  });
  
  module.exports = router;
  


// var express = require('express');
// var router = express.Router();
// const path = require('path');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   //res.render('index', { title: 'Express' });
//   res.sendFile(path.join(__dirname, '..', 'html', 'index.html'));
// });

// module.exports = router;
