import mongoose from "mongoose";


const url_db : string | any = process.env.MONGOOSE_URL;
export const connections = async ()=>{
    if(mongoose.connection.readyState>=1)
        return;
    return mongoose.connect(url_db);
};