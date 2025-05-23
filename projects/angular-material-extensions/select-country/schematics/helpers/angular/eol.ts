/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.dev/license
 */

import { EOL } from 'os';

const CRLF = '\r\n';
const LF = '\n';

export function getEOL(content: string): string {
  const newlines = content.match(/(?:\r?\n)/g);

  if (newlines?.length) {
    const crlf = newlines.filter((l) => l === CRLF).length;
    const lf = newlines.length - crlf;

    return crlf > lf ? CRLF : LF;
  }

  return EOL;
}