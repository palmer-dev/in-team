import { store } from "../redux";
import { updateUserInfos } from "../redux/UserInfos/UserInfosSlice";

const BASE_URL = "https://lab-rey.fr:444/";
const AUTH_URL = `${BASE_URL}auth/login/client`;
const API_URL = `${BASE_URL}api/`;

let myInfos: any;

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
		if (response.status === 403) {
			return {
				msg: "Vous n'avez pas accès à l'API, reconnectez-vous, ou voyez avec votre administrateur pour régler le problème.",
			};
		}
		if (response.newToken !== undefined) {
			console.log(response.newToken);
			myInfos.accessToken = response.newToken;
		}
		return response.result;
	} catch (error) {
		console.error(nameError, error);
		return null;
	}
}

// =============== EXPORTED FUNCTIONS ================= //
export async function auth(identifiant: string, mdp: string): Promise<boolean> {
	try {
		const data = { identifiant: identifiant, mdp: mdp };

		const result = await fetch(AUTH_URL, {
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

// ======= HOME PAGE ======= //
export async function getUserInfos() {
	let response = await fetchAPI(API_URL + `clients/`);
	return { ...myInfos.user, stats: response };
}

export async function getMachines() {
	const response = await fetchAPI(API_URL + `machines/`);
	return response;
}

export async function getCategories() {
	const response = await fetchAPI(API_URL + `categories`);
	return response;
}
