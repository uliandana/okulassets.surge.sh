export const CATEGORIES: string[] = process.env.CATEGORIES.split(",");
export const DATA_SOURCE: string = process.env.DATA_SOURCE;
export const RESULT_DEST: string = process.env.RESULT_DEST;
export const ISSUE_PER_PAGE: number = parseInt(process.env.ISSUE_PER_PAGE);