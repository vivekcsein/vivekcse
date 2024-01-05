
import { endpoint_layout, endpoint_projects } from '../utils/endpoints'

// export const getLayoutData = async () => {
//     const res = await fetch(`${endpoint_metadata}/metadata`, {
//         method: "GET",
//         cache: "no-cache"
//     });
//     if (!res.ok) {
//         throw new Error('Failed to fetch data');
//     }
//     return res.json();
// }

const fetchAPI = async (endpoint: string) => {
    try {
        let res = await fetch(`${endpoint}`, {
            method: "GET",
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            // mode: 'cors',
            credentials: 'same-origin'
        })
        return res.json();
    } catch (err) {
        console.error(err + "Failed to fetch data");
    }
}

export const getLayoutAPI = async () => {
    const data = await fetchAPI(endpoint_layout);
    return data.layoutdata;
};
export const getProjectsAPI = async () => {
    const data = await fetchAPI(endpoint_projects);
    return data.projectdata;
};

