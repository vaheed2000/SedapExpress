/*
 * Please see the included README.md file for license terms and conditions.
 */


// This file is a suggested starting place for your code.
// It is completely optional and not required.
// Note the reference that includes it in the index.html file.
 
 
/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false app:false, dev:false, cordova:false */
 


// This file contains your event handlers, the center of your application.
// NOTE: see app.initEvents() in init-app.js for event handler initialization code.



// ...additional event handlers here...

function thirdPartyEmulator() {
    alert("This feature uses a third party barcode scanner plugin. Third party plugins are not supported on emulator or app preview. Please build app to test.");
}

function Scan() {
    "use strict";
    var fName = "scan():";
    alert(fName, "entry");
    try {
        if (window.tinyHippos) {
            thirdPartyEmulator();
            alert(fName, "emulator alert");
        } else {
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    alert(fName, "Scanned result found!");
                    $("#SKU_"+result.text).attr("checked","checked");
                    /*alert("We got a barcode!\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled + "\n\n" +
                        "You may use the " + result.format + " - '" + result.text + "' to look up your product in any UPC database like http://www.upcdatabase.com/");*/
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        }
    } catch (e) {
        alert(fName, "catch, failure");
    }

    alert(fName, "exit");
}


