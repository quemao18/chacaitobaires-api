import { Request, Response } from 'express';
import { waTo, apiKeyWaFree } from '../credentials-dev.json';
import  * as https from 'https';

export const sendWa = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
    try {
        const order = req.body;
        let msg = '';
        if(order.status === 'Pending'){
            msg = `-- Pedido realizado: ${order.orderId} --%0A`;
            order.items.forEach(async(element: any) => {
                await db.collection('menus').doc(element.data.menuId).get().then((menu:any) => {
                const name = menu.data().name.es;
                msg += `${element.qty} x ${name} - ${element.data.name.es}%0A`;
                // return msg;
                });
            });
        } 
        if(order.status === 'Deleted'){
            msg = `-- Pedido eliminado: ${order.orderId} --`;
        }
        setTimeout(() => {
            https.get(`https://api.callmebot.com/whatsapp.php?phone=+${waTo}&text=${msg}&apikey=${apiKeyWaFree}`, (resp) => {
            let data = '';
            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
              data += chunk;
            });
            // The whole response has been received. Print out the result.
            resp.on('end', () => {
              res.send({
                status: "ok",
                data: data
              });
            });
          }).on("error", (err) => {
            console.log("Error: " + err.message);
          });
        }, 1000);
        
      } catch(error){
        res.status(500).send(error);
      }
    return;
  };
  

