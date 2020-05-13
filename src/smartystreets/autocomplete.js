import { core as SmartyStreetsCore, usAutocomplete } from "smartystreets-javascript-sdk";

const websiteKey = "22976561917208640";
const hostname = 'localhost' // change to actual url or IP address once I have it
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey, hostname);

export const client = SmartyStreetsCore.buildClient.usAutocomplete(credentials);

export const Lookup = usAutocomplete.Lookup