export const BASE_URL = "http://localhost:5127/api";

export function translateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401: return "Please sign in again.";
        case 403: return "You do not have permission to view the data requested.";
        default: return "There was an error saving or retrieving data. Please try again.";
    }
}
export async function checkStatus(response: Response) {
    if (response.ok) return response;
    const httpError = {status: response.status, statusText: response.statusText, url: response.url, body: await response.text(),

    };
  throw new Error(translateStatusToErrorMessage(httpError.status));
}

export function parseJSON(response: Response) {
  return response.json();
}
