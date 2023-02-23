import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

import { UserState } from "../../types";

// Define the initial state using that type
const initialState: UserState = {
	id: null,
	nom_client: null,
	nom_entreprise: null,
	siret_entreprise: null,
	date: null,
	identifiant: null,
	secteur: null,
	accessToken: null,
};

export const userInfosSlice = createSlice({
	name: "userInfos",
	initialState,
	reducers: {
		updateUserInfos: (state, action: PayloadAction<UserState | object>) => {
			return { ...state, ...action.payload };
		},
		updateToken: (state, action: PayloadAction<string>) => {
			state = { ...state, accessToken: action.payload };
		},
	},
});

export const { updateUserInfos, updateToken } = userInfosSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfos = (state: RootState) => state.userInfos;
export const selectAccessToken = (state: RootState) =>
	state.userInfos.accessToken;

export default userInfosSlice.reducer;
