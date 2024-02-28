/**
 * Retrieves a list of characters from the characters.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the characters data.
 */

import infoPages from "../../../data/infoPages.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ infoPages: infoPages.infoPagesData });
}
