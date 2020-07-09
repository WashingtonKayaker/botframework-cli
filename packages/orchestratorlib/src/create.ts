/* eslint-disable @typescript-eslint/typedef */
/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as path from 'path';
import {Utility} from './utility';
import {LabelResolver} from './labelresolver';
import {OrchestratorHelper} from './orchestratorhelper';
import Orchestrator from '.';

export class OrchestratorCreate {
  public static async runAsync(nlrPath: string, inputPath: string, outputPath: string, debug: boolean = false) {  
    if (!nlrPath || nlrPath.length === 0) {
      throw new Error('Please provide path to Orchestrator model');
    }

    nlrPath = path.resolve(nlrPath);

    var labelResolver = await LabelResolver.createAsync(nlrPath);
    var utterancesLabelsMap = await OrchestratorHelper.getUtteranceLabelsMap(inputPath);
    
    // eslint-disable-next-line guard-for-in
    for (const utterance in utterancesLabelsMap) {
      const labels: any = utterancesLabelsMap[utterance];
      for (const label of labels) {
        var success = labelResolver.addExample({ label: label, text: utterance});
        if (success) {
          console.log(`Added { label: ${label}, text: ${utterance}}`);
        }
      }
    }
  }
}
