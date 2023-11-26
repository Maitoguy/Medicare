// Importing all Database and Reqd functionalities
const Sunita = require('../models/sunita');
const Medicine = require('../models/medicine');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// To take users dimesions as input
module.exports.input = function(req, res) {
    console.log(req.body);
    let {height , weight , wcircum , hcircum , email} = req.body;

    height = parseInt(height);
    weight = parseInt(weight);
    wcircum = parseInt(wcircum);
    hcircum = parseInt(hcircum);
    bmi = parseInt(weight / (height * height));
    whr = parseInt(wcircum / hcircum);

    const sunita = {
        height: height,
        weight: weight,
        wcircum: wcircum,
        hcircum: hcircum,
        bmi: bmi,
        whr: whr,
        email: email
    }

    Sunita.create(sunita)
    .then(sunita => {
        console.log('Data Added: ' , sunita);
    })
    .catch(err => {
        console.log('Error in adding ' , err);
    })

    res.send('Sunita received successfully'); 
};

// Adding medicine to database
module.exports.addMedicine = function(req, res) {
    let{medicineName , morning , afternoon , evening} = req.body;
    const medicine = {
        medicineName: medicineName,
        morning: morning,
        afternoon: afternoon,
        evening: evening
    }
    Medicine.create(medicine)

    .then(medicine => {
        console.log('Data Added: ' , medicine);
    })
    .catch(err => {
        console.log('Error in adding' , err);
    })

    res.send('Medicine Added Successfully');
}

// Sending all required data to home page
module.exports.home = async function(req , res){

    try {
        const sunitaData = await Sunita.find();
        const medicineData = await Medicine.find();

        res.json({
            sunita: sunitaData,
            medicine: medicineData
        });
    } catch (err) {
        console.log('Error fetching data:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

// Delete medicine
module.exports.delete = async function(req, res) {
    const id = req.params.id;

    try {
        const medicineToDelete = await Medicine.findById(id);
        if (!medicineToDelete) {
            return res.status(404).json({ error: 'Medicine not found' });
        }
        await medicineToDelete.deleteOne();

        console.log(`Medicine with ID ${id} deleted successfully`);
        res.status(200).json({ message: `Medicine with ID ${id} deleted successfully` });
    } catch (err) {
        console.error('Error deleting medicine:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Send Email Using Nodemailer
async function sendEmail(time, list) {
    console.log(list);
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'akashbhande3@gmail.com',
                pass: 'wsglqripsykrfhkk',
            },
        });

        const sunitaData = await Sunita.findOne();

        if (!sunitaData) {
            console.error('No data found for sending mail');
            return;
        }

        const formattedList = list.map(item => `- ${item}`).join('\n');

        const mailOptions = {
            from: 'akashbhande3@gmail.com',
            to: sunitaData.email,
            subject: 'Regarding Medication...',
            text: `Hello,\n\nPlease take the following medications:\n\n${formattedList}\n\nRegards,\nOldcare`,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result);
    } catch (error) {
        console.error('Error sending email:', error);
        console.log('Email content:', mailOptions.text);
    }
}

// Using Node Cron to send Email at specific time
cron.schedule('00 09 * * *', async () => {
    try {
        const morningMedicines = await Medicine.find({ morning: { $exists: true } });
        sendEmail('morning', morningMedicines);
    } catch (err) {
        console.error('Error sending morning emails:', err);
    }
});

cron.schedule('0 14 * * *', async () => {
    try {
        const afternoonMedicines = await Medicine.find({ afternoon: { $exists: true } });
        sendEmail('afternoon', afternoonMedicines);
    } catch (err) {
        console.error('Error sending afternoon emails:', err);
    }
});

cron.schedule('0 19 * * *', async () => {
    try {
        const eveningMedicines = await Medicine.find({ evening: { $exists: true } });
        sendEmail('evening', eveningMedicines);
    } catch (err) {
        console.error('Error sending evening emails:', err);
    }
});


