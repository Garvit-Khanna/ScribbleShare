import nodemailer from "nodemailer";
import {google} from 'googleapis';

//OAuth to send email using nodemailer
const OAuth2=google.auth.OAuth2;

const createTransporter = async () => {
    const oauth2Client = new OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      "https://developers.google.com/oauthplayground"
    );
  
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });
  
    const accessToken = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject("Failed to create access token :(");
        }
        resolve(token);
      });
    });
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        accessToken,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
      }
    });
  
    return transporter;
  };
  

const sendEmail = async (emailOptions) => {
    try{
        let emailTransporter = await createTransporter();
        await emailTransporter.sendMail(emailOptions);
    }catch(err){
        console.log(err);
        throw err;
    }
  };

const createCode=()=>{
    const max = 100000
    const min = 999999
    const result = Math.floor(Math.random()*(max - min) + min);
    return result.toString();
}

export {sendEmail,createCode};