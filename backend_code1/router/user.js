import express from "express";
const router=express();
import {user} from "../db/index.js";
import Moralis from 'moralis';
import fs from "fs";
import createCsvWrite from 'csv-writer';
import {source_data} from "../db/Source_data.js"
import {id_data} from "../db/ID_data.js" 


const filePath = '/Users/aadithhya/nexgen/backend/router/ML_data.csv'; // Use the full path directly


router.post("/signup",async function(req,res){

    let username=req.body.username;
    let email=req.body.email;
    let password=req.body.password;
    
   
  
    let resp= await user.findOne({username,email});

    if(resp)
    {
         res.status(400).json({ message: "User already registered.",success:0 });

    }else {
       
        let newUser=new user({username,email,password});
       await newUser.save();
       res.status(201).json({ message: "User registered successfully.",success:1});
        
    }
    
});

router.post("/signin",async (req,res)=> {
    let email=req.body.email;
    let password=req.body.password;

    let r=await user.findOne({email,password});
    if(r)
    {
      
        
    

        res.status(201).json({message:"Signed in successfully",success:1});
        
        

    } else {
        res.status(400).json({message:"This user is not there in our database",success:0});
    }

});





// <<<<<<<<<<<<<<  ✨ Codeium Command 🌟  >>>>>>>>>>>>>>>>



router.post("/wallet",(req,res)=>{
const wallet=req.body.wallet;  
const createCsvWriter = createCsvWrite.createObjectCsvWriter;
let wallet_id;
let prev_index = 0;
let pres_index;
const wallet_ids = {};
const p = fs.readFileSync(filePath, "utf-8");

// console.log("reading csv file...");

let pending_wallet_ids = [];
let working_wallet_ids = [];
// console.log("reading csv file done");

async function get_wallet_data(wallet_id, prev) {
     console.log("get_wallet_data called with wallet_id =", wallet_id, "and prev =", prev);
     if (prev > 5) {
          console.log("prev > 5, returning");
          return;
     }



     try  {
     
    
     
          // console.log("trying to get wallet data...");
          if (prev_index == 0) {

               await Moralis.start({
                    apiKey:
                         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImYwNDYxMGFhLTliMDItNGIxOC1hMzZiLWRmMDRmYWZjNTE5YyIsIm9yZ0lkIjoiNDA4NzMxIiwidXNlcklkIjoiNDIwMDAwIiwidHlwZUlkIjoiMThkM2NkYmYtOGVkMS00Y2YyLTgwNzAtOGUwYjg1OGIzODAxIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MjY2Nzc0MzUsImV4cCI6NDg4MjQzNzQzNX0.5eJrb8MN1lND6BLEGfhuGOUFe-hbDBanwrXBvOqx_cs",
               });
          }

          const response = await Moralis.EvmApi.wallets.getWalletHistory({
               chain: "0x1",
               order: "DESC",
               address: wallet_id,
               // limit: 200,
          });

          // console.log("response = ", response);

          const a = await store_data_in_csv(response.json);
          // console.log("a = ", a);
          // console.log("Res = ", response.json, "\n\n\n");
       //   console.log("key ", wallet_id, "no_of_transactions = ", response.json.result.length);
          // console.log("Wallet_ids = ", wallet_ids);
          // console.log("Wallet_ids = ", wallet_ids);
         

     } catch (e) {
        
          console.error(e);
     }
}




async function store_data_in_csv(data) {
     // console.log("store_data_in_csv called");
     console.log("store_data_in_csv called\n");

     function default_wallet_obj() {
          // console.log("default_wallet_obj called");
          return {
               index: "0",
               received_amount: 0,
               send_amount: 0,
               send_count: 0,
               received_count: 0,
          }
         
     }
     // console.log("default_wallet_obj = ", default_wallet_obj());
     // fs.appendFileSync("./ML_data.csv", rec);
     // prev_index = 0;
     pres_index = 1;
     // console.log("pres_index = ", pres_index);
     // let count = 0;
     for (let i = 0; i < data.result.length; i++) {
          console.log("i = ", i);
          // console.log("i = ", i, "\n");
          // int y= `${data.result[i].index}`;
          let y = i + 1;
          // console.log("y = ", y);
          if (Object.keys(wallet_ids).includes(`${data.result[i].from_address}`) || Object.keys(wallet_ids).includes(`${data.result[i].to_address}`)) {

               if (Object.keys(wallet_ids).includes(`${data.result[i].from_address}`)) {
                    if (!Object.keys(wallet_ids).includes(`${data.result[i].to_address}`)) {
                         wallet_ids[`${data.result[i].to_address}`] = default_wallet_obj();
                         create_new_receiver_ID_in_DB(data.result[i]);
                         pending_wallet_ids.push(data.result[i].to_address);
                         // console.log("default_wallet_obj() = ", default_wallet_obj());
                         // console.log("default_wallet_obj() = ", default_wallet_obj());
                         wallet_ids[`${data.result[i].to_address}`].index = `${prev_index}.${pres_index}`;
                         pres_index++;
                    }
           

               }
               else {
                    // if (Object.keys(wallet_ids).includes(`${data.result[i].to_address}`)) {
                    //      // console.log("default_wallet_obj() = ", default_wallet_obj());
                    //      // wallet_ids[`${data.result[i].to_address}`].index = `${prev_index}.${pres_index}`;
                    //      // pres_index++;
                    // }
    
                    wallet_ids[`${data.result[i].from_address}`] = default_wallet_obj();
                    create_new_sender_ID_in_DB(data.result[i]);
                    pending_wallet_ids.push(data.result[i].from_address);
                    wallet_ids[`${data.result[i].from_address}`].index = `${prev_index}.${pres_index}`;
                    pres_index++;

               }
               wallet_ids[`${data.result[i].to_address}`].received_amount += (data.result[i].value) * Math.pow(10, -18);
               wallet_ids[`${data.result[i].to_address}`].received_count++;
               updata_receiver_data_in_ID_data(data.result[i]);
               wallet_ids[`${data.result[i].from_address}`].send_amount += (data.result[i].value) * Math.pow(10, -18);
               wallet_ids[`${data.result[i].from_address}`].send_count++;
               updata_sender_data_in_ID_data(data.result[i]);

               let summary = data.result[i].summary.replace(",", "");
               const records = `${prev_index}.${y},${data.result[i].from_address},${data.result[i].to_address},${parseFloat(data.result[i].value)},${data.result[i].category},${summary},${data.result[i].block_timestamp}\n`;
               // console.log("records = ", records);
               fs.appendFileSync(filePath, records);
               
          }
          // pending_wallet_ids.push(data.result[i].to_address);
          else {
               console.log("else called");
               console.log("wallet_ids =", wallet_ids);
               continue;
          }
          // <<<<<<<  c49ead5d-1f87-4ed9-bc9f-a420ba586600  >>>>>>>
     }
     if (working_wallet_ids.length == 0) {
          get_pending_wallets();
     }
     // console.log("p_records = ", p_records);
     // const f_record = p_records.append("\n");
     return 1;
}


async function get_pending_wallets() {
     // console.log("get_pending_wallets called");
     console.log("get_pending_wallets called\n");
     console.log("pending_wallet_ids length =", pending_wallet_ids.length);
     prev_index++;
     pres_index = 0;
     working_wallet_ids = pending_wallet_ids;

     pending_wallet_ids = [];

     // console.log(" working_wallet_ids =", working_wallet_ids);
     console.log(" working_wallet_ids.length =", working_wallet_ids.length);
     let len = working_wallet_ids.length;
     for (let i = 0; i < len; i++) {
          await get_wallet_data(`${working_wallet_ids[0]}`, prev_index);
          working_wallet_ids.shift();
          if (working_wallet_ids.length == 0) {
               get_pending_wallets();
          }
     }
}
get_data_of_source(wallet) 
async function get_data_of_source(id) {
     wallet_id = `${id}`;
     const rec = `0,${wallet_id}, , , , \n`;
     // console.log("rec = ", rec);
     fs.appendFileSync(filePath, rec);
     let Source_data = source_data.create();
     Source_data.Source = wallet_id;
     wallet_ids[`${wallet_id}`] = {
          index: "0",
          received_amount: 0,
          send_amount: 0,
          send_count: 0,
          received_count: 0,
     };
     if (!id_data.find({ "$or": [{ "ID": { $regex: `${wallet_id}` } }] })) {
          let ID_data = await id_data.create({
               ID: `${wallet_id}`,
               received_amount: 0,
               send_amount: 0,
               received_count: 0,
               send_count: 0,
               frequency: 0
          });
     }
     get_wallet_data(wallet_id, "0");


}

async function create_new_receiver_ID_in_DB(data) {
     console.log("create_new_receiver_ID_in_DB called");

     console.log(`id_data.find({ ID: ${data.from_address} }) =`, id_data.find({ ID: `${data.to_address}` }));
     if (id_data.find({ ID: `${data.to_address}` }) == "") {
          console.log("create_new_receiver_ID_in_DB if called");
          let ID_data = await id_data.create({
               ID: `${data.to_address}`,
               received_amount: 0,
               send_amount: 0,
               received_count: 0,
               send_count: 0,
               frequency: 0
             
          });
     }
     else {
          console.log("create_new_receiver_ID_in_DB else called");
      
          return;
     }
}
async function create_new_sender_ID_in_DB(data) {
     console.log("create_new_sender_ID_in_DB called");
     console.log(`id_data.find({ ID: ${data.from_address} }) =`, id_data.find({ ID: `${data.from_address}` }));
     if (id_data.find({ ID: `${data.from_address}` }) == "") {
          console.log("create_new_sender_ID_in_DB if called");
          let ID_data = await id_data.create({
               ID: `${data.from_address}`,
               received_amount: 0,
               send_amount: 0,
               received_count: 0,
               send_count: 0,
               frequency: 0
          });
     }
     else {
          console.log("create_new_sender_ID_in_DB else called");
     
          return;
     }
}
// async function create_new_sender_ID_in_DB(data) {
//      let ID_data = await id_data.create({
//           ID: `${data.from_address}`,
//           received_amount: 0,
//           send_amount: 0,
//           received_count: 0,
//           send_count: 0
//           send_count: 0,
//           frequency: 0
//      });
// }
async function updata_sender_data_in_ID_data(data) {
     console.log("updata_sender_data_in_ID_data called");
     // console.log("data =", data);
     let ID_data = await id_data.find({ "ID": `${data.from_address}` });
     console.log("ID_data =", ID_data);
     // ID_data.send_amount += (data.value) * Math.pow(10, -18);
     // ID_data.send_count++;
     // ID_data.frequency++;
     // ID_data.save();
}
async function updata_receiver_data_in_ID_data(data) {
     console.log("updata_receiver_data_in_ID_data called");
     // console.log("data =", data);
     let ID_data = await id_data.find({ "ID": `${data.to_address}` });
     console.log("ID_data =", ID_data);
     // ID_data.received_amount += (data.value) * Math.pow(10, -18);
     // ID_data.received_count++;
     // ID_data.frequency++;
     // ID_data.save();
}
res.json({});

})
// console.log("connecting to MongoDB...");

// console.log("connected to MongoDB");


// <<<<<<<  5a9c35b4-6160-4ad3-ad86-0d5920ea8f3a  >>>>>>>



export default router