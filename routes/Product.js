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
