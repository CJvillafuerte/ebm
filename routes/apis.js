var express = require('express');
var router = express.Router();

const expressJwt = require('express-jwt');

var corpsec = process.env.API_SEC || "default";
const authenticate = expressJwt({secret : corpsec});


//Get list of avaliable services
router.get('/apis', authenticate, function(req, res) {
    var services ={
       "services": [
            {
                "service_id":"query_microclim",
                "service_brief":"Puts in a new microclim request.",
                "service_endpoint":"POST /microclim/request"
            },
            {
                "service_id":"status_microclim",
                "service_brief":"Get details of a microclim request.",
                "service_endpoint":"GET(or POST) /microclim/status"
            },
           {
               "service_id":"retrieve_microclim",
               "service_brief":"Get details of a microclim request.",
               "service_endpoint":"GET(or POST) /microclim/fetch"
           },
           {
               "service_id":"list_apis",
               "service_brief":"Lists avaliable API endpoints.",
               "service_endpoint":"GET /microclim/apis"
           },
           {
               "service_id":"retrieve_microclim_requests",
               "service_brief":"Retrieve all requests.",
               "service_endpoint":"GET /microclim/requests"
           }
            ]

    };

    res.status(200).json(services);
});


/**
 * @api {get} /microclim/request Request Microclim Extraction
 * @apiName query_microclim
 * @apiGroup Microclim APIs
 *
 * @apiParam {String} variable Microclimate Variable.
 * @apiParam {Number} latN Bounding box Lat N.
 * @apiParam {Number} latS Bounding box Lat S.
 * @apiParam {Number} lonW Bounding box Lat W.
 * @apiParam {Number} lonE Bounding box Lat E
 * @apiParam {String} startdate  - YYYYMMDDHH where YYYY is year, MM is month, DD is day, and HH is hour.
 * @apiParam {String} enddate -  YYYYMMDDHH where YYYY is year, MM is month, DD is day, and HH is hour.

 * @apiParam {String} file Output type (CSV or netCDF)
 * @apiParam {String} shadelevel percentage shade
 * @apiParam {String} hod height in meters; above or below the surface
 * @apiParam {String} interval time interval
 * @apiParam {String} aggregation aggregation metric

 * @apiSuccess {String} Request Id (aka handle) of the submitted request
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "request_id": "58740a47aec8ba86d36f37d0",
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "Extraction request failure."
 *     }
 *
 */
router.all('/request', authenticate, function(req, res) {
    //find the user's email
    //res.status(200).json(req.user);
    //TODO - Don't support HTTP method Delete or PUT

    var db = req.db;
    var users = db.get('users');
    var requests = db.get('requests');

    var d = new Date();
    var dateperformed = d.toString();

    //latS,latN,lonW,lonE
    var api_request = {  misc:"",
        email:"",
        status:"OPEN",
        lats:[req.body.latS,req.body.latN],
        timelogged:dateperformed,
        longs:[req.body.lonW,req.body.lonE],
        variable:[req.body.variable],
        text:"",
        shadelevel:req.body.shadelevel,
        hod:req.body.hod,
        interval:req.body.interval,
        aggregation:req.body.aggregation,
        enddate:req.body.eddate,
        outputformat:req.body.file,
        startdate:req.body.stdate};


    users.findOne({'user.id':req.user.id}).then(function(user){


    api_request.email = user.user.email;

    //Using the {w:1} option ensure you get the error back if the document fails to insert correctly.
    //TODO handle error
    requests.insert(api_request, {w:1}, function(err, request_added) {

        //Request logged
        if(request_added)
        {
            res.json(201, {
                success: 'Request logged',
                request_id: request_added._id.toString()
            });
        }
        else
        {
            res.json(500, {
                error: 'Request not logged.'
            });

        }

    });


    });

});

/**
 * @api {get} /microclim/status Request Microclim Extraction
 * @apiName status_microclim
 * @apiGroup Microclim APIs
 *
 * @apiParam {String} id Extraction Request ID.
 *
 * @apiSuccess {String} 'PROCESSED' - Request completed successfully
 * @apiSuccess {String} 'ERROR'  - Request errored
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "status": "Processed"
 *     }
 *
 * @apiError RequestNotFound The Request id was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "RequestNotFound"
 *     }
 *
 */
router.get('/status', authenticate, function(req, res) {
    requestId= req.query.requestId
    //Request by
    console.log(req.user);
    //res.status(200).json({"id":req.params.requestId});

    var db = req.db;
    var users = db.get('users');
    var requests = db.get('requests')

    //Pull the details of the request
    //
    requests.findOne({_id:requestId}).then(function(request){

            //Request fetched
            if(request)
            {
                res.json(200, {
                    success: 'Processed',
                    request: request
                });
            }
            else
            {
                res.json(404, {
                    error: 'RequestNotFound.'
                });

            }

    });


});

/**
 * @api {get} /microclim/fetch Extract Microclim Request Artifacts
 * @apiName retrieve_microclim
 * @apiGroup Microclim APIs
 *
 * @apiParam {String} id Extraction Request ID.
 *
 * @apiSuccess {String} Link to the extracted file
 * @apiSuccess {String} Type of the file
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "file_name": "https://",
 *       "file_type": "CSV"
 *     }
 *
 * @apiError RequestNotFound The extraction request was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "RequestNotFound"
 *     }
 */
router.get('/fetch/:requestId', authenticate, function(req, res) {
    console.log(req.user);
    res.status(200).json({"id":req.params.requestId});
});

router.get('/poke', authenticate, function(req, res) {
    console.log(req.user);
    res.status(200).json({"service":"online"});
});

/**
 * @api {get} /microclim/requests Get requests of the current user
 * @apiName retrieve_microclim_requests
 * @apiGroup Microclim APIs
 *
 * @apiParam None
 *
 * @apiSuccess {String} Json encompassing requests
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *     }
 *
 * @apiError RequestNotFound The extraction request was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "RequestNotFound"
 *     }
 */
router.get('/requests', authenticate, function(req, res) {
    console.log(req.user);
    res.status(200).json({"job":"details"});
});


module.exports = router;