import { core as SmartyStreetsCore, usAutocomplete } from "smartystreets-javascript-sdk";

const websiteKey = "22976561917208640";
const hostname = 'addressit.herokuapp.com'
const credentials = new SmartyStreetsCore.SharedCredentials(websiteKey, hostname);

export const client = SmartyStreetsCore.buildClient.usAutocomplete(credentials);

export const Lookup = usAutocomplete.Lookup