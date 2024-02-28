import {
  endpoint_rootLayout,
  endpoint_menubar,
  endpoint_projects,
  endpoint_pages,
} from "../utils/endpoints";
// export const revalidateTime = 24 * 3600;

const fetchAPI = async (endpoint: string) => {
  try {
    let res = await fetch(`${endpoint}`, {
      method: "GET",
      cache: "no-cache",
      // Revalidate every 60 seconds
      // next: { revalidate: revalidateTime },
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      // mode: 'cors',
      credentials: "same-origin",
    });
    return res.json();
  } catch (err) {
    console.error(err + "Failed to fetch data");
  }
};

export const getRootLayoutAPI = async () => {
  const data = await fetchAPI(endpoint_rootLayout);
  return data.rootLayoutData;
};

export const getMenubarAPI = async () => {
  const data = await fetchAPI(endpoint_menubar);
  return data.MenuData;
};
export const getProjectsAPI = async () => {
  const data = await fetchAPI(endpoint_projects);
  return data.projectdata;
};

export const getPagesAPI = async (params: string) => {
  const data = await fetchAPI(`${endpoint_pages}/${params}`);
  return data.infoPages;
};
