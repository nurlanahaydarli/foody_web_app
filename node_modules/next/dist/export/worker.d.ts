import type { FontConfig } from '../server/font-utils';
import type { ExportPathMap, NextConfigComplete } from '../server/config-shared';
import type { ExportPageResult, WorkerRenderOptsPartial } from './types';
import '../server/node-polyfill-fetch';
import '../server/node-polyfill-web-streams';
import '../server/node-environment';
type PathMap = ExportPathMap[keyof ExportPathMap];
interface ExportPageInput {
    path: string;
    pathMap: PathMap;
    distDir: string;
    outDir: string;
    pagesDataDir: string;
    renderOpts: WorkerRenderOptsPartial;
    ampValidatorPath?: string;
    trailingSlash?: boolean;
    buildExport?: boolean;
    serverRuntimeConfig: {
        [key: string]: any;
    };
    subFolders?: boolean;
    optimizeFonts: FontConfig;
    optimizeCss: any;
    disableOptimizedLoading: any;
    parentSpanId: any;
    httpAgentOptions: NextConfigComplete['httpAgentOptions'];
    debugOutput?: boolean;
    isrMemoryCacheSize?: NextConfigComplete['experimental']['isrMemoryCacheSize'];
    fetchCache?: boolean;
    incrementalCacheHandlerPath?: string;
    fetchCacheKeyPrefix?: string;
    nextConfigOutput?: NextConfigComplete['output'];
    enableExperimentalReact?: boolean;
}
export interface ExportPageResults extends ExportPageResult {
    duration: number;
}
export default function exportPage(input: ExportPageInput): Promise<ExportPageResults>;
export {};
