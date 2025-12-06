// // ------------------
// // Create a campaign\
// // ------------------
// // Include the Brevo library\
// var SibApiV3Sdk = require('sib-api-v3-sdk');
// var defaultClient = SibApiV3Sdk.ApiClient.instance;
// // Instantiate the client\
// var apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = 'YOUR_API_V3_KEY';
// var apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
// var emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();
// // Define the campaign settings\
// emailCampaigns.name = "Campaign sent via the API";
// emailCampaigns.subject = "My subject";
// emailCampaigns.sender = {"name": "From name", "email": "myfromemail@mycompany.com"};
// emailCampaigns.type = "classic";
// // Content that will be sent\
// {
// htmlContent:'Congratulations! You successfully sent this example campaign via the Brevo API.',
// recipients: {listIds: [2, 7]},

// scheduledAt: '2018-01-01 00:00:01'
// }
// // Make the call to the client\
// apiInstance.createEmailCampaign(emailCampaigns).then(function(data) {
// console.log('API called successfully. Returned data: ' + data);
// }, function(error) {
// console.error(error);
// });

const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "9cdf2a001@smtp-brevo.com",
    pass: "xsmtpsib-fee183625acb0029136a04b6e06f15f684a6f3b942d12a629616aa72740a3b00-vdqkztFe0a5foKFB",
  },

});

// Wrap in an async IIFE so we can use await.
(async () => {
    try {
        
        const info = await transporter.sendMail({
          from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
          to: "covking4@gmail.com",
          subject: "Hello ✔",
          text: "Hello world?", // plain‑text body
          html: "<b>Hello world?</b>", // HTML body
        });
        console.log("Message sent:", info.messageId);
    } catch (error) {
        console.log(error)
    }
})();