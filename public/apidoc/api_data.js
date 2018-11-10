define({ "api": [  {    "type": "get",    "url": "/apis",    "title": "List available API endpoints",    "name": "list_microclim",    "group": "Microclim_APIs",    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "List",            "description": "<p>of API endpoints</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"services\": [\n        {\n            \"service_id\":\"query_microclim\",\n            \"service_brief\":\"Puts in a new microclim request.\",\n            \"service_endpoint\":\"POST /microclim/request\"\n        }\n        ]\n}",          "type": "json"        }      ]    },    "error": {      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 500 Not Found\n{\n  \"error\": \"User not authenticated.\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "apis/apis.js",    "groupTitle": "Microclim_APIs"  },  {    "type": "get",    "url": "/microclim/request",    "title": "Request Microclim Extraction",    "name": "query_microclim",    "group": "Microclim_APIs",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "Microclimate",            "description": "<p>variable(s) comma separated.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "latN",            "description": "<p>Bounding box Lat N - a float number with the northernmost latitude.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "latS",            "description": "<p>Bounding box Lat S - a float number with the southernmost latitude.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "lonW",            "description": "<p>Bounding box Lat W - a float number with the westernmost longitude.</p>"          },          {            "group": "Parameter",            "type": "Number",            "optional": false,            "field": "lonE",            "description": "<p>Bounding box Lat E - a float number with the easternmost longitude</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "startdate",            "description": "<ul> <li>YYYYMMDDHH where YYYY is year, MM is month, DD is day, and HH is hour.</li> </ul>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "enddate",            "description": "<ul> <li>YYYYMMDDHH where YYYY is year, MM is month, DD is day, and HH is hour.</li> </ul>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "file",            "description": "<p>Output type (0 for netcdf, 1 for csv)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "shadelevel",            "defaultValue": "0",            "description": "<p>{string=&quot;0&quot;,&quot;1&quot;,&quot;2&quot;,&quot;3&quot;,&quot;4&quot;} relates to  0,25,50,75,100 percentage shade</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "hod",            "defaultValue": "0",            "description": "<p>{string=&quot;0&quot;,&quot;1&quot;,&quot;2&quot;,&quot;3&quot;,&quot;4&quot;,&quot;5&quot;,&quot;6&quot;,&quot;7&quot;,&quot;8&quot;,&quot;9&quot;,&quot;10&quot;} relates to 3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 48, 66, 84, 102, 120, 138, 156, 174, 198 height in cm; above or below the surface</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "interval",            "description": "<p>time interval (0 for hourly, 1 for 6-hourly, 2 for 12-hourly, 3 for daily, and 4 for monthly)</p>"          },          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "aggregation",            "description": "<p>aggregation metric (0 for inst, 1 for max, 2 for min, 3 for mean).</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "Request_Id",            "description": "<p>(aka handle) of the submitted request</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  \"request_id\": \"58740a47aec8ba86d36f37d0\",\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "UserNotFound",            "description": "<p>The id of the User was not found.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"Extraction request failure.\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "apis/apis.js",    "groupTitle": "Microclim_APIs"  },  {    "type": "get",    "url": "/microclim/fetch",    "title": "Extract Microclim Request Artifacts",    "name": "retrieve_microclim",    "group": "Microclim_APIs",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Extraction Request ID.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "Link",            "description": "<p>to the extracted files and Request metadata</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n   \"files\" :[],\n   \"request\":{\"_id\":\"589ce9a4b2df447c910f7d59\",\n             \"aggregation\":\"0\",\n             \"email\":\"huckleylab@gmail.com\",\n             \"enddate\":\"19810131\",\n             \"hod\":\"0\",\n             \"interval\":\"0\",\n             \"lats\":[\"39.431950321168635\",\n             \"40.451127265872316\"],\n             \"longs\":[\"-108.08349609375\",\n             \"-106.5399169921875\"],\n             \"misc\":\"\",\n             \"outputformat\":\"csv\",\n             \"shadelevel\":\"0\",\n             \"startdate\":\"19810101\",\n             \"status\":\"EMAILED\",\n             \"text\":\"\",\n             \"timelogged\":\"02/09/2017 22:10:29 +00:00\",\n             \"variable\":[\"ALBEDO\"]\n             }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "RequestNotFound",            "description": "<p>The extraction request was not found.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"RequestNotFound\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "apis/apis.js",    "groupTitle": "Microclim_APIs"  },  {    "type": "get",    "url": "/microclim/download",    "title": "Download Microclim Generated Artifact",    "name": "retrieve_microclim_file",    "group": "Microclim_APIs",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "fileKey",            "description": "<p>Extraction Request ID.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "Artifact",            "description": "<p>streamed</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n   \"files\" :[],\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "RequestNotFound",            "description": "<p>The extraction request was not found.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"RequestNotFound\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "apis/apis.js",    "groupTitle": "Microclim_APIs"  },  {    "type": "get",    "url": "/microclim/poke",    "title": "Get health check of the service",    "name": "retrieve_microclim_health",    "group": "Microclim_APIs",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "optional": false,            "field": "None",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "Json",            "description": "<p>encompassing health</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n    \"service\":\"online\"\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "Internal",            "description": "<p>Server Error</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 500 Internal Server Error\n{\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "apis/apis.js",    "groupTitle": "Microclim_APIs"  },  {    "type": "get",    "url": "/microclim/requests",    "title": "Get requests of the current user",    "name": "retrieve_microclim_requests",    "group": "Microclim_APIs",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "optional": false,            "field": "None",            "description": ""          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "Json",            "description": "<p>encompassing requests</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n    requests:[{...},{...}]\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "RequestNotFound",            "description": "<p>The extraction request was not found.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 500 Not Found\n{\n  \"error\": \"RequestsNotReturned\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "apis/apis.js",    "groupTitle": "Microclim_APIs"  },  {    "type": "get",    "url": "/microclim/status",    "title": "Request Microclim Extraction",    "name": "status_microclim",    "group": "Microclim_APIs",    "parameter": {      "fields": {        "Parameter": [          {            "group": "Parameter",            "type": "String",            "optional": false,            "field": "id",            "description": "<p>Extraction Request ID.</p>"          }        ]      }    },    "success": {      "fields": {        "Success 200": [          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "EMAILED",            "description": "<p>Request completed successfully</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "OPEN",            "description": "<p>Request created but not picked up yet</p>"          },          {            "group": "Success 200",            "type": "String",            "optional": false,            "field": "ERROR",            "description": "<p>Request errored</p>"          }        ]      },      "examples": [        {          "title": "Success-Response:",          "content": "HTTP/1.1 200 OK\n{\n  {\"status\":\"EMAILED\",\n  }\n}",          "type": "json"        }      ]    },    "error": {      "fields": {        "Error 4xx": [          {            "group": "Error 4xx",            "optional": false,            "field": "RequestNotFound",            "description": "<p>The Request id was not found.</p>"          }        ]      },      "examples": [        {          "title": "Error-Response:",          "content": "HTTP/1.1 404 Not Found\n{\n  \"error\": \"RequestNotFound\"\n}",          "type": "json"        }      ]    },    "version": "0.0.0",    "filename": "apis/apis.js",    "groupTitle": "Microclim_APIs"  }] });
