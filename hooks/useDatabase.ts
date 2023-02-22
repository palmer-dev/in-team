import { store } from "../redux";
import { updateUserInfos } from "../redux/UserInfos/UserInfosSlice";
import { fetchAPIwithToken } from "./useAPI";

const BASE_URL = "https://lab-rey.fr/";
const AUTH_URL = `${BASE_URL}auth/`;
const API_URL = `${BASE_URL}api/`;

let myInfos: any;

export async function auth(
  username: string,
  password: string
): Promise<boolean> {
  try {
    const data = { username: username, password: password };

    const result = await fetch(AUTH_URL + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (result?.accessToken != null) {
      myInfos = result;
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout(): Promise<void> {}

// ======= FORM PAGE ======= //

export async function getEvents() {
  try {
    const result = await fetchAPI(API_URL + `events`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getForms() {
  try {
    const result = await fetchAPI(API_URL + `forms`);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getFieldsInForm(idForm: string) {
  try {
    let response = await fetchAPI(API_URL + `fields/${idForm}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getField(idField: string) {
  try {
    let response = await fetchAPI(API_URL + `fields/${idField}`);
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function saveFormAnswers(id_form: string, answers: {}) {
  // CREATION DU LOT DE REPONSE
  const newAnswers = await fetch(BASE_URL + "saveFormAnswers", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idForm: id_form, answers: answers }),
  });
  const retQueryAndswers = await newAnswers.json();
  const idAnswers = retQueryAndswers[0].an_id;
}

// ======= HOME PAGE ======= //
export async function getUserInfos() {
  let response = await fetchAPI(API_URL + `ambassador/`);
  return { ...myInfos.user, stats: response };
}

// =============== GLOBAL REQUEST ================= //
async function fetchAPI(
  url: string,
  method: string = "GET",
  nameError: string = "fetchAPI"
) {
  try {
    let response = await fetch(url, {
      method: method,
      headers: {
        "Content-type": "application/json",
        Authorization: `JWT ${myInfos.accessToken}`,
      },
    }).then((response) => response.json());
    return response.result;
  } catch (error) {
    console.error(nameError, error);
    return null;
  }
}
