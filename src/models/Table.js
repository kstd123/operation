import req from 'reqwest';
export default {
	namespace: 'table',
	state: {
		pageNow:null,
		pageNum:null
	}
	reducers: {
		save(state, { payload: { data: pageNow, pageNum}}){
			return{ ...state , pageNow, pageNum}
		}
	}
	effect: {
		*fetch({ payload: { pageNow = 1}}, { call , put})

	}
}
