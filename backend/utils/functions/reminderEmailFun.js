import QRCode from "qrcode";
import { fileURLToPath } from "url"; // Import the fileURLToPath function
import path from "path";
import fs from "fs/promises";
import fs1 from "fs";
import {
  sendMultipleEmails,
  sendMultipleReminderEmails,
} from "../../services/emailTemplates.js";
import { convertEjsToPdf } from "./commonFunction.js";
import prisma from "../../prismaClient.js";
import { ADMIN_EMAIL, BACKEND_URL } from "../../configs/envConfig.js";
import { parseCartItems } from "../utils.js";
// Define the directory name of the current module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const handleInvoiceReminders = async () => {
  try {
    const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);

    const pendingInvoices = await prisma.member_documents.findMany({
      where: {
        type: "invoice",
        status: "pending",
        deleted_at: null,
        cron_job_check_time: {
          lt: oneDayAgo,
        },
      },
      include: {
        user: {
          include: {
            carts: true,
            assign_to_admin: true,
          },
        },
      },
    });

    let emailData = [];
    for (const invoice of pendingInvoices) {
      // Check if there's a bank slip for the invoice
      const bankSlip = await prisma.member_documents.findFirst({
        where: {
          transaction_id: invoice.transaction_id,
          type: "bank_slip",
        },
      });
      // console.log("transaction_id", invoice.transaction_id)
      // console.log('bankSlip:', bankSlip);

      if (!bankSlip) {
        // Prepare email data if no bank slip is found
        const user = invoice.user;
        // console.log("checkUser", invoice.user)
        const admin = user.assign_to_admin;
        const cartValue = user.carts[0];
        cartValue.cart_items = parseCartItems(cartValue.cart_items);

        const qrCodeDataURL = await QRCode.toDataURL("http://www.gs1.org.sa");

        const data1 = {
          topHeading: "INVOICE",
          secondHeading: "BILL TO",
          memberData: {
            qrCodeDataURL: qrCodeDataURL,
            registeration: `New Registration`,
            company_name_eng: user.company_name_eng,
            mobile: user.mobile,
            address: {
              zip: user.zip_code,
              countryName: user.country,
              stateName: user.state,
              cityName: user.city,
            },
            companyID: user.companyID,
            membership_otherCategory: user.membership_category,
            gtin_subscription: {
              products: {
                member_category_description:
                  cartValue?.cart_items[0]?.productName,
              },
            },
          },
          cart: cartValue,
          currentDate: {
            day: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
          },
          company_details: {
            title: "Federation of Saudi Chambers",
            account_no: "25350612000200",
            iban_no: "SA90 1000 0025 3506 1200 0200",
            bank_name: "Saudi National Bank - SNB",
            bank_swift_code: "NCBKSAJE",
          },
          BACKEND_URL: BACKEND_URL,
        };

        const pdfDirectory = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "uploads",
          "documents",
          "MemberRegInvoice"
        );
        const pdfFilename = `Invoice-Reminder-${user?.company_name_eng}-${invoice.transaction_id}.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);

        if (!fs1.existsSync(pdfDirectory)) {
          fs1.mkdirSync(pdfDirectory, { recursive: true });
        }

        await convertEjsToPdf(
          path.join(__dirname, "..", "..", "views", "pdf", "customInvoice.ejs"),
          data1,
          pdfFilePath
        );

        const invoiceBuffer = await fs.readFile(pdfFilePath);

        // Prepare email data for both user and admin
        emailData.push({
          toEmail: user.email,
          subject: `Invoice Reminder`,
          htmlContent: `<h1>Invoice Reminder</h1><p>Your invoice with transaction ID: ${invoice.transaction_id} is still pending.</p>`,
          attachments: [
            {
              filename: pdfFilename,
              content: invoiceBuffer,
              contentType: "application/pdf",
            },
          ],
        });

        if (admin && admin.email) {
          emailData.push({
            toEmail: admin.email,
            subject: `Invoice Reminder for ${user.company_name_eng}`,
            htmlContent: `<h1>Invoice Reminder for ${user.company_name_eng}</h1><p>The invoice with transaction ID: ${invoice.transaction_id} is still pending.</p>`,
            attachments: [
              {
                filename: pdfFilename,
                content: invoiceBuffer,
                contentType: "application/pdf",
              },
            ],
          });
        }

        // Update cron_job_check_time
        await prisma.member_documents.update({
          where: { id: invoice.id },
          data: { cron_job_check_time: new Date() },
        });
      }
    }
    // console.log('emailData:', emailData);
    // Send emails if there are any to send
    if (emailData.length > 0) {
      await sendMultipleEmails({ emailData, ADMIN_EMAIL });
      // Delete pdf files from the server
      for (const invoice of pendingInvoices) {
        const pdfDirectory = path.join(
          __dirname,
          "..",
          "..",
          "public",
          "uploads",
          "documents",
          "MemberRegInvoice"
        );
        const pdfFilename = `Invoice-Reminder-${invoice.user?.company_name_eng}-${invoice.transaction_id}.pdf`;
        const pdfFilePath = path.join(pdfDirectory, pdfFilename);

        try {
          fs1.unlinkSync(pdfFilePath);
          console.log(`Deleted file: ${pdfFilePath}`);
        } catch (error) {
          if (error.code === "ENOENT") {
            console.log(`File not found: ${pdfFilePath}`);
          } else {
            console.error(`Error deleting file: ${pdfFilePath}`, error);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in handleInvoiceReminders:", error);
  }
};

export const handleExpiredSubscriptions = async () => {
  try {
    // Get today's date
    const today = new Date();

    // Check for expired users based on gcp_expiry and update their status to inactive
    await prisma.users.updateMany({
      where: {
        gcp_expiry: {
          lt: today, // if gcp_expiry is before today
        },
        status: {
          not: "inactive",
        },
      },
      data: {
        status: "inactive",
        remarks: "expired", // Set remarks to expired
      },
    });

    // Check for expired gtin_subcriptions and update their status to inactive
    await prisma.gtin_subcriptions.updateMany({
      where: {
        expiry_date: {
          lt: today, // if expiry_date is before today
        },
        status: {
          not: "inactive",
        },
      },
      data: {
        status: "inactive",
      },
    });

    // Check for expired other_products_subcriptions and update their status to inactive
    await prisma.other_products_subcriptions.updateMany({
      where: {
        expiry_date: {
          lt: today, // if expiry_date is before today
        },
        status: {
          not: "inactive",
        },
      },
      data: {
        status: "inactive",
      },
    });

    console.log("Successfully updated expired subscriptions and user status.");
  } catch (error) {
    console.error("Error updating expired subscriptions:", error);
  }
};

// Function to send reminder emails to expired members
export const sendReminderEmailsToExpiredMembers = async () => {
  try {
    const currentDate = new Date();
    const expiredMembers = await prisma.users.findMany({
      where: {
        gcp_expiry: {
          lt: currentDate, // Less than the current date
        },
        OR: [
          {
            lastReminderSentDateForExpired: null,
          },
          {
            lastReminderSentDateForExpired: {
              lt: new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000), // Less than 15 days ago
            },
          },
        ],
        deleted_at: null,
      },
      orderBy: {
        gcp_expiry: "desc", // Order by gcp_expiry in descending order
      },
      // take: 1,
    });

    if (expiredMembers.length === 0) {
      console.log("No expired members found.");
      return;
    }

    // Split expiredMembers into batches of 100 users
    const batchSize = 100;
    const emailBatches = [];
    for (let i = 0; i < expiredMembers.length; i += batchSize) {
      emailBatches.push(expiredMembers.slice(i, i + batchSize));
    }

    const templatePath = path.join(
      __dirname,
      "..",
      "htmlEmailTemplates",
      "ExpiredNotification.html"
    );
    const htmlTemplate = await fs.readFile(templatePath, "utf8");

    // Send emails for each batch
    for (const batch of emailBatches) {
      const emailData = batch.map((user) => ({
        toEmail: user.email,
        // toEmail: "abdulmajid1m2@gmail.com", // for testing purpose
        subject: "Membership Renewal Reminder",
      }));

      await sendMultipleReminderEmails({ emailData, htmlTemplate });

      // Update the last reminder sent date for expired members in this batch
      await prisma.users.updateMany({
        where: {
          id: {
            in: batch.map((user) => user.id),
          },
        },
        data: {
          lastReminderSentDateForExpired: currentDate,
        },
      });

      console.log(`Reminder emails sent to ${batch.length} expired members.`);
    }
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  }
};

// Function to send notification emails to expiring members
export const sendNotificationEmailsToExpiringMembers = async () => {
  try {
    const currentDate = new Date();
    const expiringMembers = await prisma.users.findMany({
      where: {
        gcp_expiry: {
          gt: currentDate, // Greater than the current date
          lt: new Date(currentDate.getTime() + 90 * 24 * 60 * 60 * 1000), // Less than 90 days from now
        },
        OR: [
          {
            lastNotificationSentDateForExpiring: null,
          },
          {
            lastNotificationSentDateForExpiring: {
              lt: new Date(currentDate.getTime() - 15 * 24 * 60 * 60 * 1000), // Less than 15 days ago
            },
          },
        ],
        deleted_at: null,
      },
      // take: 1,
    });

    if (expiringMembers.length === 0) {
      console.log("No expiring members found.");
      return;
    }

    // Send emails for each expiring member
    for (const member of expiringMembers) {
      // Send notification email
      const emailData = [
        {
          toEmail: member.email,
          // toEmail: "abdulmajid1m2@gamil.com", // for testing purpose
          subject: "Membership Expiry Notification",
        },
      ];

      const templatePath = path.join(
        __dirname,
        "..",
        "htmlEmailTemplates",
        "90DayExpiryNotfication.html"
      );
      const htmlTemplate = await fs.readFile(templatePath, "utf8");

      await sendMultipleReminderEmails({ emailData, htmlTemplate });

      // Update the last notification sent date for expiring members
      await prisma.users.update({
        where: {
          id: member.id,
        },
        data: {
          lastNotificationSentDateForExpiring: currentDate,
        },
      });

      console.log(`Notification email sent to ${member.email}.`);
    }
  } catch (error) {
    console.error("Error sending notification emails:", error);
  }
};
