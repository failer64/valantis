import { Items } from "../App";
import { instance } from "./api"

export const appAPI = {
	async getProductIds(body: BodyType) {
		const response = await instance.post('', { ...body });
		return response.data.result
	},
	async getItems(body: BodyType) {
		const response = await instance.post('', { ...body });
		return response.data.result
	},
}

export interface BodyType {
	action: ActionType
	params: OptionalParams
}

type ActionType = "filter" | "get_ids" | "get_items" | "get_fields"

interface Params {
	offset: number
	limit: number
	price: number
	ids: string[]
	field: keyof Items
}

type OptionalParams = Partial<Params>