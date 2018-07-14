'use strict';
const request = require('request'),
    __lodash = require('lodash'),
    q = require('q'),
    async = require('async'),
    json2csv = require('json2csv'),
    fs = require('fs'),
    moment = require('moment'),
    CronJob = require('cron').CronJob,
    nodemailer = require('nodemailer'),
    multer = require('multer'),
    mailer = require('../../utils/send-mail');
// import {mailer} from '../../utils/mailer';
let upload = multer({dest: './uploads'});

var bodyParser = require("body-parser");


let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let mimeType = file.mimetype.split('/');
        console.log('----------mimeType--------', mimeType);

        // if (mimeType[0] === 'image') {
            cb(null, config.root + '/uploads/');
        // }
    },
    filename: function (req, file, cb) {
        let mimefl = file.mimetype.split('/');
        let fileName = file.originalname.split(' ').join('-');
        cb(null, file.fieldname + '-' + Date.now() + '.' + mimefl[1]);//file name appended for extension
    }
});


let uploadFile = multer({
    storage: storage,
    limits: {fileSize: 1073741824},
    fileFilter: function (req, file, cb) {
        console.log('file is ------>', file, req.body);
        let mimeType = file.mimetype.split('/');
        console.log(mimeType);
        if (file.fieldname === 'elementContent') {
            //let contentType,fieldname;
            //let reqObj=req.body;
            /*if(req.body && req.body.element)
                 reqObj=req.body.element;*/

            /* if(file.fieldname=='elementContent') {
                 contentType = reqObj.contentType;
                 fieldname='Element Content';
             }
             else {
                 contentType = reqObj.hint.contentType;
                 fieldname='Hint Content';
             }*/

            //if(mimeType[0]==contentType)
            cb(null, true);
            //else
            //  cb(fieldname+" should be "+contentType,false);
        }
    }
}).fields([{name: 'elementContent', maxCount: 1}]);


/**
 * @Class bigCommerceAPIController
 * @description class to manage the notifications
 */
class FileUploadController {
    constructor(app) {
        app.get('/api/inventory1/:productId', this.getInventory);
        app.post('/api/updateSkuInventory', this.updateSkuInventory);
    }


    /**
     * @method getInventory
     * @description function to get inventory by product id.
     * @param req
     * @param res
     */
    getInventory(req, res) {
        let productId = req.params.productId;
        global.MongoORM.Inventory.find({"product_id": productId}).then((inventory) => {
            let respObj = {};
            if (inventory) {
                let productId = inventory[0].product_id;
                respObj = {
                    [productId]: inventory
                };
                // mailer.sendMail(data);
                res.send(respObj);
            } else {
                res.send({Message: "Please enter valid product id."});
            }
        }).catch((error) => {
            res.send(error);
        })
    }


    /**
     * @method updateSkuInventory
     * @description function to update sku inventory.
     * @param req
     * @param res
     */
    updateSkuInventory(req, res) {
        let Converter = require("csvtojson").Converter;
        let converter = new Converter({});

        uploadFile(req, res, function (err, result) {
            if (err) {
                console.log(err);
                res.sendError(err);
            } else {
                // console.log("FILESSSS:::", req.files);
                let deferred = q.defer();
                let fileName = req.files.elementContent[0].filename;
                console.log('fileName', fileName);
                res.sendResponse(200);

                converter.fromFile("./src/uploads/" + fileName, function (err, result) {
                    if (err) {
                        console.log("Error in file reading", err);
                    } else {
                        console.log('///////////////////////////////////////////');
                        console.log(result);

                        // let emailObj = {
                        //     subject: 'Testing mail', // Subject line
                        //     text: 'Testing mail'
                        // };
                        //
                        // mailer.SendMail(emailObj).then(() => {
                        //     console.log('====Mail Sent Successfully====');
                        // }).catch((error) => {
                        //     console.log("Error in sending mail", error);
                        // })

                    }
                });
            }
        });




    }


    /**
     * @method prepareEmail
     * @description function to prepare email.
     */
    static prepareEmail() {
        fs.readFile(filepath, function (err, fileData) {
            if (err) {
                console.log('No such file found');
            }
            else {
                let emailObj = {
                    subject: 'Testing mail', // Subject line
                    text: 'This is a testing mail',
                    attachments: {
                        'filename': filename,
                        'content': fileData
                    }
                };
                SendEmail(emailObj).then(function (err, resp) {
                    console.log('Mail sent successfully.');
                    fs.unlinkSync(filepath); //delete file after sending mail
                    console.log('Remove csv file.');
                }).catch(function (sendEmailError) {
                    console.log('error', sendEmailError);
                });
            }
        });
    }


}

module.exports = FileUploadController;
