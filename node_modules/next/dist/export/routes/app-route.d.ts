import type { ExportPageResult } from '../types';
import type { IncrementalCache } from '../../server/lib/incremental-cache';
import { MockedRequest, MockedResponse } from '../../server/lib/mock-request';
export declare function exportAppRoute(req: MockedRequest, res: MockedResponse, params: {
    [key: string]: string | string[];
} | undefined, page: string, incrementalCache: IncrementalCache | undefined, distDir: string, htmlFilepath: string): Promise<ExportPageResult>;
