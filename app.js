const Express = require('express');
const app = Express();
const mongoose = require('mongoose');
const Listing = require('./models/listing');
const cors = require('cors');



const authroutes = require('./routes/auth');
const payment = require('./routes/payment');
const receiptRoute = require("./routes/receipt");
const search = require('./routes/search')




main()
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect('mongodb://localhost:27017/Hotel-com');
}

app.use(cors());
app.use(Express.json());
app.use('/',authroutes);
app.use('/api',payment);
app.use("/receipt", receiptRoute);
app.use('/searchi',search);

app.get('/', (req, res) => {
    res.send("Hello World");
})


app.get('/gethotels',async(req,res)=>{
    try {
        const hotels = await Listing.find({});
        res.status(200).json(hotels);
    }catch(error){
        console.error("Error fetching Hotels : ", error);
        res.status(500).json({message:'Error fetching hotels'});
    }
})

app.post('/addhotel', async (req, res) => {
    try {
        const hotel = new Listing(req.body);
        await hotel.save();
        res.status(200).json({ message: 'Hotel added successfully', hotel });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error: error.message });
        alert('Something went wrong');
    }
});



app.listen(8000, () => {
    console.log("Server is running on port 8000");
})

