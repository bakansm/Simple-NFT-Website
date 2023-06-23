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
	isReset: true,
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
				isReset: false,
			};
		case ActionType.PENDING:
			return {
				isPending: true,
				isSuccess: false,
				isFail: false,
				isReset: false,
			};
		case ActionType.FAIL:
			return {
				isPending: false,
				isSuccess: false,
				isFail: true,
				isReset: false,
			};
		case ActionType.RESET:
			return {
				isPending: false,
				isSuccess: false,
				isFail: false,
				isReset: true,
			};
		default:
			return state;
	}
};
