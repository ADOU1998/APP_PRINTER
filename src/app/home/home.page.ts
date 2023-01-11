import { Component } from '@angular/core';
import { PrintService } from '../services/print.service';
import EscPosEncoder from 'esc-pos-encoder-ionic';
import { HttpClient } from '@angular/common/http';

@Component({  
  selector: 'app-home',  
  templateUrl: 'home.page.html',  
  styleUrls: ['home.page.scss'],

}) 

export class HomePage {  
  
  bluetoothList:any=[];
  selectedPrinter:any;

  image:any;
  result:any;
  encoder=new EscPosEncoder();
  
  constructor(private print:PrintService, private http:HttpClient) {
    this.listPrinter()
  }    
  
  //This will list all of your bluetooth devices
    listPrinter() { 
      this.print.searchBluetoothPrinter()
       .then(resp=>{
   
        //List of bluetooth device list
        this.bluetoothList=resp;
      });
    }

    //This will store selected bluetooth device mac address
    selectPrinter(macAddress)
    {
      //Selected printer macAddress stored here
      this.selectedPrinter=macAddress;
    }

    //This will print
    printStuff()
    {     //The text that you want to print

      this.http.get('/assets/images/image.jpg', { responseType: 'blob'}).subscribe(async (res )=> {
        const reader = new FileReader();
        
        
        
        this.image = new Image()
        reader.onloadend = () => {
          this.image.src = reader.result
          
          
          this.image.onload = async ()=>{
            this.result = this.encoder.initialize()
          .align('center')
          .image(this.image, 160, 160, 'atkinson')
          .newline()
          .align('center')
          .text('BIENVENU \n DJLIX ABOBO-DOUME')
          .newline()
          .newline()
          .text('TEL : 0749955945 \n Tous les jours de 8h00 a 21h00')
          .newline()
          .text('-------------------------------')
          .newline()
          .align('left')
          .text('GALIPETTE BABY LAIT')
          .newline()
          .text('1,000 * 2330,000')
          .align('right')
          .text('2330')
          .newline()
          .newline()
          .newline()
          .encode()
          // await this.print.write(this.result)
          // await this.disconnectBluetoothPrinter()

          this.print.sendToBluetoothPrinter(this.selectedPrinter,this.result);
          }
          
        }
        reader.readAsDataURL(res);
        
        
      })

      // var myText="BIENVENU \n SUPECO TOIT ROUGE \n\n TEL: 0749955945\n Tous les jours de 8h00 à 21h00 \n -------------------------------\n \n 1 KG PATE A TART CHO \n 1,000  * 2000,00 \n 1L JUS PRESSEA SELE \n 2,000  * 1500,000 \n \n \n";   
    }

}