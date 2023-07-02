export interface DocumentSection {
  header?: string;
  content: string;
}
export type DocumentParser = (
  text: Buffer | string,
  maxLength: number
) =>  DocumentSection[];;
