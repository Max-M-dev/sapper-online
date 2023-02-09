interface IRequestParamsType {
	body?: BodyInit | null;
	headers?: HeadersInit;
	method?: string;
	mode?: RequestMode;
}
type requestType = (
	url: string,
	params?: IRequestParamsType
) => Promise<Response>;

const request: requestType = async (url, params) => {
	console.log(url, params);
	return await fetch(url, params);
};
export default request;
