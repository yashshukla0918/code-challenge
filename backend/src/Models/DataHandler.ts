import { Item,dataSet } from "./dataSet";

class DataHandler {
    dataSet: Item []
    constructor(){
        this.dataSet  = Array.from(dataSet)
    }

    getData(): Item []{
        return [...this.dataSet]
    }

    addNewItem(obj:Item):string{
        try{      
            const  arr = [...this.dataSet]
            arr.push(obj)
            this.dataSet = arr
            return "Item added Successfully"
        }
        catch(err){
            return "Problem in adding"
        }
    }
    deleteByName(id:String): Item []{
        this.dataSet = [...this.dataSet].filter((item)=>{
            if(item.id !== id){
                return item
            }
        })
        return this.dataSet
    }
    searchByName(name:String){
       const newArr = [...this.dataSet].find((item) => {
            if (item.name === name) {
                return item
            }
        })
        return newArr
    }

    updateByObject(obj:Item){
        try{      
            const arr = [...this.dataSet]
            const newa = [...arr].map((item)=>{
                if(item.id === obj.id){
                    return obj
                }
                return item
            })
            this.dataSet = newa
            return "Item Updated Successfully"
        }
        catch(err){
            return "Problem in Updating"
        }
    }
}

export default DataHandler;