class CategoryModel {
    constructor(category:CategoryModel){
        if(category._id) this._id = category._id;
        if(category.name) this.name = category.name;
        if(category.imageName) this.imageName = category.imageName;
    }
    _id:string;
	name:string;
    imageName:string;
}

export default CategoryModel;
