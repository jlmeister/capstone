import { core as SmartyStreetsCore, usAutocomplete } from "smartystreets-javascript-sdk";

const websiteKey = "22976561917208640";
const hostname = 'localhost' // change to actual url or IP address once I have it
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey, hostname);

export const client = SmartyStreetsCore.buildClient.usAutocomplete(credentials);

export const Lookup = usAutocomplete.Lookup

// const Lookup = SmartyStreetsSDK.usAutocomplete.Lookup;

// Documentation for input fields can be found at:
// https://smartystreets.com/docs/cloud/us-autocomplete-api#http-request-input-fields

// let lookup = new Lookup("4770 Lincoln Ave O");

// client.send(lookup)
//   .then(logSuggestions)
//   .catch(console.log);

// lookup.maxSuggestions = 10;

// lookup.cityFilter = ["Ogden"];
// lookup.stateFilter = ["IL"];
// lookup.prefer = ["Ogden, IL"];
// lookup.preferRatio = 0.33333333;

// client.send(lookup)
//   .then(logSuggestions)
//   .catch(console.log);

// function logSuggestions(response) {
//   console.log(response.result);
//   console.log("*********************");
// }