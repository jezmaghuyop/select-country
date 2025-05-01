import { SchematicsException, Tree } from '@angular-devkit/schematics';
import {
  findBootstrapModuleCall as originalFindBootstrapModuleCall,  
  getAppModulePath as originalGetAppModulePath
} from '@schematics/angular/utility/ng-ast-utils';
import * as ts from '@schematics/angular/third_party/github.com/Microsoft/TypeScript/lib/typescript';
import { findNode, getSourceNodes } from './ast-utils';

export function findBootstrapModuleCall(host: Tree, mainPath: string): ts.CallExpression | null {
  return originalFindBootstrapModuleCall(host, mainPath);
}

export function getAppModulePath(host: Tree, mainPath: string): string {
  return originalGetAppModulePath(host, mainPath);
}

export function findBootstrapModulePath(host: Tree, mainPath: string): string {
  const bootstrapCall = findBootstrapModuleCall(host, mainPath);
  if (!bootstrapCall) {
    throw new SchematicsException('Bootstrap call not found');
  }

  const bootstrapModule = bootstrapCall.arguments[0];

  const mainText = host.readText(mainPath);
  const source = ts.createSourceFile(mainPath, mainText, ts.ScriptTarget.Latest, true);
  const allNodes = getSourceNodes(source);
  const bootstrapModuleRelativePath = allNodes
    .filter(ts.isImportDeclaration)
    .filter((imp) => {
      return findNode(imp, ts.SyntaxKind.Identifier, bootstrapModule.getText());
    })
    .map((imp) => {
      const modulePathStringLiteral = imp.moduleSpecifier as ts.StringLiteral;

      return modulePathStringLiteral.text;
    })[0];

  return bootstrapModuleRelativePath;
}