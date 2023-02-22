import {
	selectAccessToken,
	updateToken,
} from "../redux/UserInfos/UserInfosSlice";

import { store } from "../redux";

const generateHeader = () => {
	const token = selectAccessToken(store.getState());
	const headers = new Headers({
		"Content-Type": "application/json",
		Authorization: "JWT " + token ?? "",
	});
	return headers;
};

const refreshToken = (newToken: string | undefined) => {
	store.dispatch(updateToken(newToken ?? ""));
};

// ============= FONCTION GLOBAL ============= //
export async function fetchAPIwithToken(
	url: string,
	method: string = "GET",
	data: object = {}
) {
	if (method === "GET") {
		const result = await fetch(url, {
			method: method,
			headers: generateHeader(),
		})
			.then((response) => {
				if (response.status === 403) {
					// Retour au login screen
				} else {
					return response.json();
				}
			})
			.then((data) => {
				if (data?.newToken !== undefined) {
					refreshToken(data.newToken);
				}
				return data;
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		return result ?? null;
	} else {
		const result = await fetch(url, {
			method: method,
			headers: generateHeader(),
			body: JSON.stringify(data),
		})
			.then((response) => response.json())
			.then((data) => {
				return data;
			})
			.catch((error) => {
				console.error("Error:", error);
			});
		return result ?? null;
	}
}
