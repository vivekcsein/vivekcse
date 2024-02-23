import {
  endpoint_rootLayout,
  endpoint_menubar,
  endpoint_projects,
} from "../utils/endpoints";

const fetchAPI = async (endpoint: string) => {
  try {
    let res = await fetch(`${endpoint}`, {
      method: "GET",
      // cache: "default",
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
