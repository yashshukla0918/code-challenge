import express, { Express, Request, Response } from 'express';
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import DataHandler from './Models/DataHandler';
import * as Joi from 'joi'

dotenv.config();

const app: Express = express();
app.use(bodyParser.json())
app.use(cors())

const port = process.env.PORT;



//Global array object to perform CRUD 
const arrayObj = new DataHandler()

//Validation Status Type
const statusValidator = (value:'string',helpers : Joi.CustomHelpers<string>) =>{
    const statusArray: string[] = ['new' , 'complete' , 'in-progress' , 'on-hold' , 'archived']  
    if(statusArray.includes(value.toLowerCase())){
        return value
    }
    return helpers.error('Invalid type of status')
  }



//Schema for new item input in POST method
const reqSchema = Joi.object({
    id : Joi.string().required(),
    name : Joi.string().required(),
    description : Joi.string().empty(),
    viewed : Joi.boolean().required(),
    status : Joi.string().custom(statusValidator).required()
})




//Getting all entries from list
app.get('/list', (req: Request, res: Response) => {
    if(arrayObj.getData() instanceof Array){
        res.status(200).json({
            data: arrayObj.getData()
        })
    }
    else{
        res.status(400).json({
            "message":"Bad Request",
        })
    }
})

//Getting list of item searched by name
app.get('/list/:name', (req: Request, res: Response) => {
    res.status(200).json({
        data: arrayObj.searchByName(req.params.name)
    })
})

//add a  new item in list
app.post('/item', (req: Request, res: Response) => {
    try {
        let id  = new Date().getTime().toString();
        let body = {...req.body,...{id:id}}
        const {error, value} = reqSchema.validate(body)         
        if(error){
            res.status(401).json({
                "message" : error?.details[0].message
            })
        }
        else{
            
            res.status(201).json({
                "message" : arrayObj.addNewItem(value)
            })
        }

    } catch (error) {
        console.error(`Error From Server : ${error}`);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})




//Updating an item in arrayObj
app.put('/item', (req: Request, res: Response) => {    
    try {
        const {error, value} = reqSchema.validate(req.body)         
        if(error){
            res.status(401).json({
                "message" : error?.details[0].message
            })
        }
        else{
            
            res.status(200).json({
                "data" : arrayObj.updateByObject(value)
            })
        } 

    } catch (error) {
        console.error(`Error From Server : ${error}`);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})




//remove an item by having this.name
app.delete('/item/:name', (req: Request, res: Response) => {
    try {
        const name = req.params.name
        res.status(200).json({
            data: arrayObj.deleteByName(name)
        })
    } catch (error) {
        console.error(`Error From Server : ${error}`);
        res.status(500).json({
            error: "Internal Server Error"
        })
    }
})



//Server
app.listen(port, () => {
    console.log(`Server listening on port : ${port}`);
})