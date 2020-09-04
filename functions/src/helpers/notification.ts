import { Request, Response } from 'express';
import { waTo, apiKeyWaFree } from '../credentials-dev.json';
import  * as https from 'https';

export const sendWa = async (req: Request, res: Response, db: FirebaseFirestore.Firestore) => {
    try {
        const order = req.body;
        let msg = '';
        if(order.status === 'Pending'){
            msg = `-- Órden nueva: ${order.orderId} --%0A`;
            order.items.forEach(async(element: any) => {
                await db.collection('menus').doc(element.data.menuId).get().then((menu:any) => {
                const name = menu.data().name.es;
                msg += `${element.qty} x ${name} - ${element.data.name.es}%0A`;
                // return msg;
                });
            });
        } 

        if(order.status === 'Deleted'){
            msg = `-- Órden eliminada: ${order.orderId} --`;
        }

        if(order.status === 'Readed'){
            msg = `-- Órden leída por mesonero: ${order.orderId}. Mesa: ${order.table} --`;
        }

        if(order.status === 'Finished'){
            msg = `-- Órden cargada en comanda: ${order.orderId}. Mesa: ${order.table} --`;
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

  // export const sendFCM2 = async (title: string, text: string, url:string, token: string | string[], res: Response) => {
  //   try {
  //     const payload = {
  //       notification: {
  //         title: title,
  //         body: text ? text.length <= 100 ? text : text.substring(0, 97) + "..." : "",
  //         tag: text
  //       },
  //       data: {
  //         url: '/#/'+url
  //       }
  //     };
  //     admin.messaging().sendToDevice(token, payload);
  //   } catch(error){
  //     res.status(500).send(error);
  //   }
        
  // };
  

