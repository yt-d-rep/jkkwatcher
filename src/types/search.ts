export interface House {
  name: string;
  floorPlan: string;
}

export interface SearchResult {
  houses: House[];
  screenshotPath: string;
}

export interface NotifyRequest {
  filePath: string;
}
