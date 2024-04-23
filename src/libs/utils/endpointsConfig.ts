//configurations for endpoint for api
const endpointConfigFun = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      rootLayout: "http://vivekcse.in/api/rootLayout",
      pagesRoutes: "http://vivekcse.in/api/pagesroutes",
      // pagesRoutes: "http://127.0.0.1:3000/api/pagesroutes",
      endpoint_projects:
        "https://vivekcsein.github.io/githost/api/vivekcse/projects_vivekcse.json",
      endpoint_menubar:
        "https://vivekcsein.github.io/githost/api/vivekcse/menubar_vivekcse.json",
      endpoint_interview: "https://vivekcsein.github.io/githost/api/interview",
    };
  } else {
    return {
      rootLayout: "http://127.0.0.1:3000/api/rootLayout",
      pagesRoutes: "http://127.0.0.1:3000/api/pagesroutes",
      endpoint_projects:
        "https://vivekcsein.github.io/githost/api/vivekcse/projects_vivekcse.json",
      endpoint_menubar:
        "https://vivekcsein.github.io/githost/api/vivekcse/menubar_vivekcse.json",
      endpoint_interview: "https://vivekcsein.github.io/githost/api/interview",
    };
  }
};

export const endpointConfig = endpointConfigFun();
