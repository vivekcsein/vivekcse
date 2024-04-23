/**
 * Retrieves a list of characters from the characters.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the characters data.
 */

import pagesRoute from "../../../../data/pagesRoute.json";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const data = pagesRoute.pagesRouteData.filter(
    (item) =>
      params.pagedata.toLocaleLowerCase() === item.category.toLocaleLowerCase()
  );
  return NextResponse.json({ pagesRoute: data });
}
