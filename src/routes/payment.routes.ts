import { Router } from "express";
import PaymentController from "../controllers/Payment.controllers";


export default class PaymentRoutes{
    private router: Router;
    private paymentController: PaymentController;

    constructor(){
        this.router = Router();
        this.paymentController = new PaymentController();
        this.routes();
    }

    private routes(){
        this.router.post('/create-checkout-session', this.paymentController.createIntent );
        this.router.get("/success", (req, res) => {
            
            return res.send("payment/success");
        
        })
        this.router.get("/cancel", (req, res) => {
            return res.send("payment/error");    
        
        })
    }

    public getRouter(){
        return this.router;
    
    }
    

}