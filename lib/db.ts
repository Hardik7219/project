import mongoose from "mongoose";


const url_db = process.env.MONGOOSE_URL;
if (!url_db) {
    throw new Error("MONGOOSE_URL is not defined");
}
export const connections = async ()=>{
    if(mongoose.connection.readyState>=1)
        return;
    return mongoose.connect(url_db);
};