export const responseStatus = (res: any, status: any, message: any, data: any) => {
	 if (status >= 200 && status < 300) {
		res.status(status).json({
		statusMessage: "Success",
		status,
		message,
		data,
		});
  } else if (status === 400) {
		res.status(status).json({ statusMessage: "Bad Request", status, message, data });
	} else if (status === 204) {
		res.status(200).json({ statusMessage: "No Content", status, message, data });
	} else if (status === 500) {
		res.status(status).json({ statusMessage: "Error", status, message, err: data });
	} else if (status === 403) {
		res.status(status).json({ statusMessage: "Forbidden", status, message, forbidden: data });
	} else if (status === 401) {
		res.status(status).json({ statusMessage: "Unauthorized", status, message, forbidden: data });
	} else if (status === 404) {
		res.status(status).json({ statusMessage: "Page Not Found", status, message, err: data });
	} else {
		res.status(status).json({ statusMessage: "Error", status, message, err: data });
	}
}

export const HttpStatus = {
	OK: 200,
	FORBIDDEN: 403,
	NO_CONTENT: 204,
	BAD_REQUEST: 400,
	UNAUTHORIZED: 401,
	PAGE_NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};