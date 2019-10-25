interface PageRequestOptions <T> {
  api: (query: T) => Promise<T>;
  table?: T;  
  query: T;
}

export declare function pageRequest(options: PageRequestOptions<Record<string, any>>): VueConfiguration