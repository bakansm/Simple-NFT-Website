enum ActionType {
	PENDING = 'PENDING',
	SUCCESS = 'SUCCESS',
	FAIL = 'FAIL',
	RESET = 'RESET',
}
const initialState = {
	isPending: false,
	isSuccess: false,
	isFail: false,
};

export interface IInitialState {
	isPending: boolean;
	isSuccess: boolean;
	isFail: boolean;
}

type TAction = {
	type: ActionType;
	payload?: any;
};

export const mintNFTStatusReducer = (
	state: IInitialState = initialState,
	action: TAction
) => {
	switch (action.type) {
		case ActionType.SUCCESS:
			return {
				isPending: false,
				isSuccess: true,
				isFail: false,
			};
		case ActionType.PENDING:
			return {
				isPending: true,
				isSuccess: false,
				isFail: false,
			};
		case ActionType.FAIL:
			return {
				isPending: false,
				isSuccess: false,
				isFail: true,
			};
		case ActionType.RESET:
			return {
				isPending: false,
				isSuccess: false,
				isFail: false,
			};
		default:
			return state;
	}
};
