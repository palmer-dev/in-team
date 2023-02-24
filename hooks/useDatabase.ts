import { store } from "../redux";
import { updateUserInfos } from "../redux/UserInfos/UserInfosSlice";

const BASE_URL = "https://lab-rey.fr/";
const AUTH_URL = `${BASE_URL}auth/login/client`;
const API_URL = `${BASE_URL}api/`;

let myInfos: any;

// =============== GLOBAL REQUEST ================= //
async function fetchAPI(
	url: string,
	method: string = "GET",
	data: object = {},
	nameError: string = "fetchAPI"
) {
	if (method === "GET") {
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
				myInfos.accessToken = response.newToken;
			}
			return response.result;
		} catch (error) {
			console.error(nameError, error);
			return null;
		}
	} else {
		try {
			let response = await fetch(url, {
				method: method,
				headers: {
					"Content-type": "application/json",
					Authorization: `JWT ${myInfos.accessToken}`,
				},
				body: JSON.stringify(data),
			}).then((response) => response.json());
			if (response.status === 403) {
				return {
					msg: "Vous n'avez pas accès à l'API, reconnectez-vous, ou voyez avec votre administrateur pour régler le problème.",
				};
			}
			if (response.newToken !== undefined) {
				myInfos.accessToken = response.newToken;
			}
			return response.result;
		} catch (error) {
			console.error(nameError, error);
			return null;
		}
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

export async function getMachineById(id: string) {
	const response = await fetchAPI(API_URL + `machines/${id}`);
	return response;
}

// ======= PRODUCT PAGE ======= //
export async function getSignalementsForProductId(id: string) {
	const response = await fetchAPI(API_URL + `signalementsMachine/${id}`);
	return response;
}

// ======= SignalProduct PAGE =======//
export async function uploadImage(image: any) {
	try {
		let response = await fetch(API_URL + `upload/`, {
			method: "POST",
			headers: {
				"Content-type": "multipart/form-data",
				Authorization: `JWT ${myInfos.accessToken}`,
			},
			body: image,
		}).then((response) => response.json());
		if (response.status === 403) {
			return {
				msg: "Vous n'avez pas accès à l'API, reconnectez-vous, ou voyez avec votre administrateur pour régler le problème.",
			};
		}
		if (response.newToken !== undefined) {
			myInfos.accessToken = response.newToken;
		}
		return response.result;
	} catch (error) {
		console.error("uploadImage", error);
		return null;
	}
}

export async function setNewSignalement(signalementInfos: object) {
	const response = await fetchAPI(
		API_URL + `signalements`,
		"POST",
		signalementInfos,
		"setNewSignalement"
	);
	return response;
}
