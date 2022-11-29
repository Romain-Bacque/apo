/* eslint-disable import/prefer-default-export */

// Action type : a variable that memorize a string that represent an action type

// brewery
export const SAVE_BREWERIES = "SAVE_BREWERIES";
export const SAVE_BREWERY_DETAILS = "SAVE_BREWERY_DETAILS";
// category
export const SAVE_CATEGORIES = "SAVE_CATEGORIES";
// event
export const SAVE_EVENTS = "SAVE_EVENTS";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const RESET_EVENTS = "RESET_EVENTS";
// loading
export const PENDING = "PENDING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";
// search
export const SEARCH_VALUE = "SEARCH_VALUE";
// user
export const CHANGE_VALUE = "CHANGE_VALUE";
export const RESET_USER = "RESET_USER";
export const SAVE_USER = "SAVE_USER";
export const UPDATE_USER = "UPDATE_USER";

// Action creator : a configurable function that return an action object

// anywhere I want to make a reference to an action type or an action object
// I can use these tools to avoid typing errors

// brewery
export function fetchBreweries() {
  return {
    type: "FETCH_BREWERIES",
  };
}
export function fetchBreweryDetails(breweryId) {
  return {
    type: "FETCH_BREWERY_DETAILS",
    breweryId,
  };
}
export function addBrewery(brewery) {
  return {
    type: "ADD_BREWERY",
    title: brewery.title,
    image: brewery.image,
    phone: brewery.phone,
    address: brewery.address,
    lat: brewery.lat,
    lon: brewery.lon,
    categories: brewery.categories,
    description: brewery.description,
  };
}
export function saveBreweries(breweries) {
  return {
    type: "SAVE_BREWERIES",
    breweries,
  };
}
export function saveBreweryDetails(breweryDetails) {
  return {
    type: "SAVE_BREWERY_DETAILS",
    breweryDetails,
  };
}
export function updateBrewery(brewery) {
  return {
    type: "UPDATE_BREWERY",
    id: brewery.id,
    title: brewery.title,
    image: brewery.image,
    phone: brewery.phone,
    address: brewery.address,
    lat: brewery.lat,
    lon: brewery.lon,
    categories: brewery.categories,
    description: brewery.description,
  };
}
export function deleteBrewery(breweryId) {
  return {
    type: "DELETE_BREWERY",
    breweryId,
  };
}
// category
export function fetchCategories() {
  return {
    type: "FETCH_CATEGORIES",
  };
}
export function saveCategories(categories) {
  return {
    type: "SAVE_CATEGORIES",
    categories,
  };
}
// user
export function userVerification() {
  return {
    type: "USER_VERIFICATION",
  };
}
export function forgotPassword(email) {
  return {
    type: "FORGOT_PASSWORD",
    email,
  };
}
export function resetPassword(id, token, password) {
  return {
    type: "RESET_PASSWORD",
    id,
    token,
    password,
  };
}
export function updateUser(id, name, email, actualPassword, newPassword) {
  return {
    type: "UPDATE_USER",
    id,
    name,
    email,
    actualPassword,
    newPassword,
  };
}
export function deleteUser(id) {
  return {
    type: "DELETE_USER",
    id,
  };
}
export function resetUser() {
  return {
    type: "RESET_USER",
  };
}
export function login(email, password) {
  return {
    type: "LOGIN",
    email,
    password,
  };
}
export function register(email, password, name, role) {
  return {
    type: "REGISTER",
    email,
    password,
    name,
    role,
  };
}
export function logout() {
  return {
    type: "LOGOUT",
  };
}
export function saveUser(id, name, email, password, role) {
  return {
    type: "SAVE_USER",
    id,
    name,
    email,
    password,
    role,
  };
}
// event
export function fetchParticipantEvents() {
  return {
    type: "FETCH_PARTICIPANT_EVENTS",
  };
}
export function fetchOwnerEvents() {
  return {
    type: "FETCH_OWNER_EVENTS",
  };
}
export function addParticipant(eventId) {
  return {
    type: "ADD_PARTICIPANT",
    eventId,
  };
}
export function deleteEvent(eventId) {
  return {
    type: "DELETE_EVENT",
    eventId,
  };
}
export function saveEvents(key, events) {
  return {
    type: "SAVE_EVENTS",
    key,
    events,
  };
}
export function removeEvent(key, eventId) {
  return {
    type: "REMOVE_EVENT",
    key,
    eventId,
  };
}
export function deleteParticipant(eventId) {
  return {
    type: "DELETE_PARTICIPANT",
    eventId,
  };
}
export function resetEvents() {
  return {
    type: "RESET_EVENTS",
  };
}
export function fetchEvents(key) {
  return {
    type: "FETCH_EVENTS",
    key,
  };
}
export function postEvent(title, description, eventStart, breweryId) {
  return {
    type: "POST_EVENT",
    title,
    description,
    eventStart,
    breweryId,
  };
}
// loading
export function pending() {
  return {
    type: "PENDING",
  };
}
export function success(message) {
  return {
    type: "SUCCESS",
    message,
  };
}
export function error(message) {
  return {
    type: "ERROR",
    message,
  };
}
