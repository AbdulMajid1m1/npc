import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import rootRoute from "./routes/RootRoute.js";
import {
  handleExpiredSubscriptions,
  handleInvoiceReminders,
  sendNotificationEmailsToExpiringMembers,
  sendReminderEmailsToExpiredMembers,
} from "./utils/functions/reminderEmailFun.js";
import QRCode from "qrcode";
// import { PrismaClient } from '@prisma/client';
import ejs from "ejs";
import { BACKEND_URL } from "./configs/envConfig.js";
import cron from "node-cron";
import { createServer } from "http";
// Other imports remain the same
import bodyParser from "body-parser";

// import socketHandler from "./socketHandler.js"; // Import the socket handler

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ limit: "500mb", extended: true }));
const allowedOrigins = [
  "http://localhost:3092",
  "http://localhost:3081",
  "http://gs1ksa.org:3092",
  "https://gs1ksa.org:3093",
  "http://gs1ksa.org:3091",
  "http://localhost:3070",
  "http://gs1ksa.org",
  "https://gs1ksa.org",
  "http://gs1ksa.org:82",
  "http://gs1ksa.org:83",
  "https://gs1ksa.org:82",
  "https://gs1ksa.org:83",
  "https://api.gs1ksa.org",
  "https://www.api.gs1ksa.org",
  "http://gs1ksa.org:3083",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// set the view engine to ejs
app.set("view engine", "ejs");

// pass public directory path in ejs
app.set("views", path.join(__dirname, "views"));

// calling the routes
app.use("/api", rootRoute);

// Cron job to run the reminder function every day at midnight

cron.schedule("0 * * * *", async () => {
  console.log("Running a task every hour");
  handleInvoiceReminders();
  handleExpiredSubscriptions();
  try {
    console.log("Running daily reminder email task...");
    // await sendReminderEmailsToExpiredMembers();
    // await sendNotificationEmailsToExpiringMembers();
  } catch (error) {
    console.error("Error running daily reminder email task:", error);
  }
});

app.get("/test", async (req, res) => {
  try {
    console.log("Running daily reminder email task...");
    // await sendNotificationEmailsToExpiringMembers();
    // await sendReminderEmailsToExpiredMembers();
    res.send("test");
  } catch (error) {
    console.error("Error running daily reminder email task:", error);
  }
});

app.get("/renderGlnCertificate", async (req, res) => {
  // Define your dummy data here
  const qrCodeDataURL = await QRCode.toDataURL("http://www.gs1.org.sa");
  const data = {
    BACKEND_URL: "http://example.com", // Replace with your actual backend URL
    qrCodeDataURL: qrCodeDataURL,
    member: {
      company_name_eng: "Sample Company", // Replace with actual company name
    },
    user: {
      companyID: "1234567890", // Replace with actual company ID
      gcpGLNID: "GCP123456", // Replace with actual GCP GLN ID
      locationName: "Sample Location", // Replace with actual location name
      gln_idenfication: "GLN Barcode Number", // Replace with actual GLN identification
      latitude: "39.3483984573498579", // Replace with actual latitude
      longitude: "39.23423842934782948729", // Replace with actual longitude
    },
    date: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1, // getMonth() returns 0-11
      year: new Date().getFullYear(),
    },
    Expirydate: {
      day: new Date().getDate() + 30, // Assuming 30 days from the current date for expiry
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  };

  // Render the EJS template with the dummy data
  res.render("pdf/glnCertificate", { data });
});

app.get("/declaration", async (req, res) => {
  const qrCodeDataURL = await QRCode.toDataURL("http://www.gs1.org.sa");
  const data = {
    BACKEND_URL: BACKEND_URL,
    qrCodeDataURL: qrCodeDataURL,
    contact: {
      phone: "+966-11-218-2423",
      email: "gs1sa@gs1.org.sa",
      address:
        "King Fahad Branch Road, AlMoatamarat Dist.P.O.Box 16683 Riyadh 11474, Saudi Arabia",
    },
  };

  // Render the EJS template with the dummy data
  res.render("pdf/Declaration_pdf.ejs", { data });
});

app.get("/renderInvoice", async (req, res) => {
  // Define your dummy data here
  const qrCodeDataURL = await QRCode.toDataURL("http://www.gs1.org.sa");
  const data = {
    type: "downgrade",
    renew: true, // Set this to true to test the renewal functionality
    memberData: {
      // add New Registration with current date
      registeration: `New Registration ${new Date().toLocaleDateString()}`,
      qrCodeDataURL: qrCodeDataURL,
      yearsToPay: 2,
      company_name_eng: "Sample Company",
      mobile: "+966-123-456789",
      address: {
        zip: "12345",
        countryName: "Saudi Arabia",
        stateName: "Riyadh",
        cityName: "Riyadh City",
      },
      companyID: "1234567890",
      gtin_subscription: {
        products: {
          member_category_description: "Gold Membership",
        },
      },
    },
    cart: {
      request_type: "registration", // Can be 'registration', 'renew', or 'addon'
      transaction_id: "T123456789",
      payment_type: "bank_transfer", // Can be 'bank_transfer' or 'Mada/Visa'

      cart_items: [
        {
          productName: "Additional Product 1",
          registration_fee: 100,
          yearly_fee: 200,
        },
        {
          productName: "Additional Product 2",
          registration_fee: 150,
          yearly_fee: 250,
        },
      ],
    },
    renewalItems: [
      {
        productName: "Renewal Product 1",
        yearly_fee: 300,
      },
      {
        productName: "Renewal Product 2",
        yearly_fee: 350,
      },
    ],
    currentDate: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1, // getMonth() returns 0-11
      year: new Date().getFullYear(),
    },
    custom_amount: 100, // Example custom amount

    general: {
      service_default_image: "default_service_image.png",
      logo: "company_logo.png",
    },
    company_details: {
      title: "Sample Company",
      account_no: "1234567890",
      iban_no: "SA1234567890123456789012",
      bank_name: "Sample Bank",
      bank_swift_code: "SAMPLEBANK123",
    },
    BACKEND_URL: process.env.BACKEND_URL, // Ensure you have this environment variable set
  };

  // Render the EJS template with the dummy data
  res.render("pdf/customInvoice.ejs", { data });
});

app.get("/renderGtinCertificate", async (req, res) => {
  // Define your dummy data here
  const qrCodeDataURL = await QRCode.toDataURL("http://www.gs1.org.sa");
  const data = {
    BACKEND_URL: BACKEND_URL,
    qrCodeDataURL: qrCodeDataURL,
    member: {
      company_name_eng: "Sample Company", // Replace with actual company name
    },
    memberProduct: {
      barcode: "123456789012", // Replace with actual barcode
    },
    user: {
      companyID: "1234567890", // Replace with actual company ID
      gcpGLNID: "GCP123456", // Replace with actual GCP GLN ID
    },
    date: {
      day: new Date().getDate(),
      month: new Date().getMonth() + 1, // getMonth() returns 0-11
      year: new Date().getFullYear(),
    },
    Expirydate: {
      day: new Date().getDate() + 30,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
  };

  // Render the EJS template with the dummy data
  res.render("pdf/gtinCertificate", { data });
});

// Define your API route to render the certificate
app.get("/renderCertificate", async (req, res) => {
  const qrCodeDataURL = await QRCode.toDataURL("http://www.gs1.org.sa");
  // Define your data object with missing or dynamic data
  const data = {
    qrCodeDataURL: qrCodeDataURL,
    user: {
      company_name_eng: "Company Name", // Dummy data, replace with actual user data from your API
      company_name_arabic: "Company Name", // Dummy data, replace with actual user data from your API
    },
    general: {
      gcp_certificate_detail1: [
        "Global Trade Item Number(GTIN)",
        "Certificate Detail 1",
      ], // Dummy data, replace with actual detail data from your API
      gcp_certificate_detail2: [
        // Arabic translations for the second list
        "معرف الأصل الفردي العالمي (GIAI)",
        "معرف الأصل القابل للعودة العالمي (GRAI)",
        "رقم التعريف العالمي للشحنة (GSNC)",
        "رقم تعريف الشحنة العالمي (GSIN)",
      ], // Dummy data, replace with actual detail data from your API
      gcp_legal_detail: "Legal Detail", // Dummy data, replace with actual legal detail from your API
    },
    userData: {
      gcpGLNID: "GCP GLN ID", // Dummy data, replace with actual user data from your API
      gln: "GLN", // Dummy data, replace with actual user data from your API
      companyID: "Company ID", // Dummy data, replace with actual user data from your API
      gcp_expiry: "2023-12-31", // Dummy data, replace with actual user data from your API
    },
    uploadPath: "/your/upload/path/", // Dummy data, replace with actual upload path
    backendImagePath: "/your/backend/image/path/", // Dummy data, replace with actual backend image path
    expiryDate: "31-12-2025", // Dummy data, replace with actual user data from your API
    explodeGPCCode: [1, 2],
  };

  // Render the EJS template with the data
  res.render("pdf/certificate_Ar", { data });
});

app.use((err, req, res, next) => {
  // console.error(err.stack);
  // console.error(err);
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  // return res.status(errorStatus).send(errorMessage);
  return res.status(errorStatus).json({ error: errorMessage });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

// Create an HTTP server from the Express app
const httpServer = createServer(app);

// Pass the server to the socketHandler
// socketHandler(httpServer);
const PORT = process.env.PORT || 3082;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// httpServer.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// TODO: remove the count from getUserdetails on admin datagrid
// TODO: craet newLetter iamges folder in produciton