import { mkdir, readdir, readFile, stat, writeFile } from 'fs/promises';
import { EOL } from 'os';
import path from 'path';
import { parseArgs } from 'util';
import { mapper } from '../vuetify-tailwind-mapper';

// (The type definitions and helper functions parseAttributes, getClassesFromProps,
// and refactorComponent remain exactly the same as the previous version.
// For brevity, they are included here in a collapsible block.)

// <editor-fold desc="COLLAPSED HELPER FUNCTIONS">
/**
 * ====================================================================
 * Type Definitions & Helpers (Unchanged)
 * ====================================================================
 */
type PropMap = { [key: string]: string | { _boolean: string } | { [value: string]: string } };
type ComponentMap = { target: string; base: string; props: PropMap; };
type Mapper = { [key: string]: ComponentMap; };
const responsiveMap: { [key: string]: string } = { sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' };

function parseAttributes(attrString: string): Map<string, string> {
  const attributes = new Map<string, string>();
  const attrRegex = /([\w-]+)(?:="([^"]*)")?/g;
  let match;
  while ((match = attrRegex.exec(attrString)) !== null) {
    attributes.set(match[1], match[2] ?? '');
  }
  return attributes;
}

function getClassesFromProps(attributes: Map<string, string>, componentMap: ComponentMap): string {
  const classes = new Set<string>();
  for (const [key, value] of attributes.entries()) {
    const propConfig = componentMap.props[key];
    if (propConfig) {
      if (value === '' && '_boolean' in propConfig) {
        classes.add((propConfig as { _boolean: string })._boolean);
      } else if (typeof propConfig === 'object' && value in propConfig) {
        classes.add((propConfig as { [value: string]: string })[value]);
      }
    }
    const responsivePrefix = responsiveMap[key];
    if (responsivePrefix && (componentMap.props['cols'] || componentMap.props['offset'])) {
      const sizeClasses = (componentMap.props['cols'] as { [key: string]: string })?.[value];
      const offsetClasses = (componentMap.props['offset'] as { [key: string]: string })?.[value];
      if (sizeClasses) sizeClasses.split(' ').forEach(c => classes.add(`${responsivePrefix}:${c}`));
      if (offsetClasses) offsetClasses.split(' ').forEach(c => classes.add(`${responsivePrefix}:${c}`));
    }
  }
  return Array.from(classes).join(' ');
}

function refactorComponent(content: string, componentMapper: Mapper): string {
  let updatedContent = content;
  // PASS 1: Replace opening tags
  for (const vuetifyTag of Object.keys(componentMapper)) {
    const tagRegex = new RegExp(`<${vuetifyTag}(\\s+[^>]*)?(\\s*\\/?)>`, 'g');
    updatedContent = updatedContent.replace(tagRegex, (match, attrString = '', selfClosing) => {
      const componentMap = componentMapper[vuetifyTag];
      const attributes = parseAttributes(attrString);
      const originalClasses = attributes.get('class') || '';
      attributes.delete('class');
      const propClasses = getClassesFromProps(attributes, componentMap);
      const combinedClasses = new Set([...componentMap.base.split(' '), ...originalClasses.split(' '), ...propClasses.split(' ')].filter(Boolean));
      const otherAttrs = Array.from(attributes.entries()).filter(([key]) => !componentMap.props[key] && !responsiveMap[key]).map(([key, value]) => (value === '' ? key : `${key}="${value}"`)).join(' ');
      const finalClassString = `class="${Array.from(combinedClasses).join(' ')}"`;
      const finalAttrs = [finalClassString, otherAttrs].filter(Boolean).join(' ');
      return `<${componentMap.target} ${finalAttrs}${selfClosing ? ' /' : ''}>`;
    });
  }
  // PASS 2: Replace closing tags
  for (const vuetifyTag of Object.keys(componentMapper)) {
    const componentMap = componentMapper[vuetifyTag];
    const closingTagRegex = new RegExp(`</${vuetifyTag}>`, 'g');
    updatedContent = updatedContent.replace(closingTagRegex, `</${componentMap.target}>`);
  }
  return updatedContent;
}
// </editor-fold>

/**
 * ====================================================================
 * NEW: Directory Processing Logic
 * ====================================================================
 */

/**
 * Recursively finds all .vue files within a given directory.
 * @param dir The directory to start scanning from.
 * @returns A promise that resolves to an array of full file paths.
 */
async function findVueFiles(dir: string): Promise<string[]> {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name);
      if (dirent.isDirectory()) {
        return findVueFiles(res);
      }
      return res.endsWith('.vue') ? res : [];
    })
  );
  return Array.prototype.concat(...files);
}

/**
 * ====================================================================
 * UPDATED: Script Execution
 * ====================================================================
 */
async function main() {
  console.log('\n\x1b[36m🚀 Starting Vuetify to Tailwind Batch Refactoring Script...\x1b[0m');

  const { values } = parseArgs({
    options: {
      input: { type: 'string', short: 'i' },
      output: { type: 'string', short: 'o' },
      help: { type: 'boolean', short: 'h'},
    },
  });
  
  if (values.help || !values.input || !values.output) {
      console.log(`
  \x1b[33mUsage:\x1b[0m
    bun scripts/refactor.ts --input <source_dir> --output <destination_dir>

  \x1b[33mDescription:\x1b[0m
    Recursively converts all .vue components in the source directory
    from Vuetify to Tailwind, mirroring the folder structure in the
    destination directory.

  \x1b[33mArguments:\x1b[0m
    -i, --input     The source directory containing your .vue components.
    -o, --output    The destination directory to save the converted files.
    -h, --help      Show this help message.
      `);
      process.exit(0);
  }

  const inputDir = path.resolve(values.input as string);
  const outputDir = path.resolve(values.output as string);

  try {
    console.log(`\n🔍 Scanning for .vue files in: ${inputDir}`);
    const filesToProcess = await findVueFiles(inputDir);
    
    if (filesToProcess.length === 0) {
        console.log('\x1b[33mNo .vue files found. Nothing to do.\x1b[0m');
        return;
    }

    console.log(`\x1b[32m✅ Found ${filesToProcess.length} components. Starting conversion...\x1b[0m`);

    for (const filePath of filesToProcess) {
      // Determine the mirrored output path
      const relativePath = path.relative(inputDir, filePath);
      const newFilePath = path.join(outputDir, relativePath);

      console.log(`  \x1b[34m-> Converting:\x1b[0m ${relativePath}`);

      // Ensure the destination directory exists
      await mkdir(path.dirname(newFilePath), { recursive: true });

      // Read, refactor, and write the file
      const fileContent = await readFile(filePath, 'utf-8');
      const refactoredContent = refactorComponent(fileContent, mapper);
      await writeFile(newFilePath, refactoredContent, 'utf-8');
    }

    console.log(`\n\x1b[32m✨ All components have been successfully converted!\x1b[0m`);
    console.log(`   \x1b[35mOutput located in: ${outputDir}\x1b[0m\n`);

  } catch (error) {
    console.error('\n\x1b[31mAn unexpected error occurred during the process:\x1b[0m', error);
    process.exit(1);
  }
}

main();
// import { readFile, writeFile } from 'fs/promises';
// import { EOL } from 'os';
// import { parseArgs } from 'util';
// import { mapper } from '../vuetify-tailwind-mapper';

// /**
//  * ====================================================================
//  * Type Definitions
//  * ====================================================================
//  */
// type PropMap = { [key: string]: string | { _boolean: string } | { [value: string]: string } };
// type ComponentMap = {
//   target: string;
//   base: string;
//   props: PropMap;
// };
// type Mapper = { [key: string]: ComponentMap };

// const responsiveMap: { [key: string]: string } = {
//   sm: 'sm',
//   md: 'md',
//   lg: 'lg',
//   xl: 'xl',
// };

// /**
//  * ====================================================================
//  * Core Refactoring Logic
//  * ====================================================================
//  */

// function parseAttributes(attrString: string): Map<string, string> {
//   const attributes = new Map<string, string>();
//   const attrRegex = /([\w-]+)(?:="([^"]*)")?/g;
//   let match;
//   while ((match = attrRegex.exec(attrString)) !== null) {
//     const key = match[1];
//     const value = match[2] ?? '';
//     attributes.set(key, value);
//   }
//   return attributes;
// }

// function getClassesFromProps(attributes: Map<string, string>, componentMap: ComponentMap): string {
//   const classes = new Set<string>();
//   for (const [key, value] of attributes.entries()) {
//     const propConfig = componentMap.props[key];
//     if (propConfig) {
//       if (value === '' && '_boolean' in propConfig) {
//         classes.add((propConfig as { _boolean: string })._boolean);
//       } else if (typeof propConfig === 'object' && value in propConfig) {
//         classes.add((propConfig as { [value: string]: string })[value]);
//       }
//     }
//     const responsivePrefix = responsiveMap[key];
//     if (responsivePrefix && (componentMap.props['cols'] || componentMap.props['offset'])) {
//       const sizeClasses = (componentMap.props['cols'] as { [key: string]: string })?.[value];
//       const offsetClasses = (componentMap.props['offset'] as { [key: string]: string })?.[value];
//       if (sizeClasses) {
//         sizeClasses.split(' ').forEach(c => classes.add(`${responsivePrefix}:${c}`));
//       }
//       if (offsetClasses) {
//         offsetClasses.split(' ').forEach(c => classes.add(`${responsivePrefix}:${c}`));
//       }
//     }
//   }
//   return Array.from(classes).join(' ');
// }

// /**
//  * The main transformation function with corrected logic for class merging.
//  */
// function refactorComponent(content: string, componentMapper: Mapper): string {
//   let updatedContent = content;

//   // --- PASS 1: Replace all opening tags ---
//   for (const vuetifyTag of Object.keys(componentMapper)) {
//     const tagRegex = new RegExp(`<${vuetifyTag}(\\s+[^>]*)?(\\s*\\/?)>`, 'g');
//     updatedContent = updatedContent.replace(tagRegex, (match, attrString = '', selfClosing) => {
//       console.log(`\x1b[34m  -> Found opening <${vuetifyTag}>\x1b[0m, processing...`);
//       const componentMap = componentMapper[vuetifyTag];
//       const attributes = parseAttributes(attrString);

//       // **FIX**: Isolate original classes and remove 'class' from the attributes map.
//       const originalClasses = attributes.get('class') || '';
//       attributes.delete('class');

//       const propClasses = getClassesFromProps(attributes, componentMap);
      
//       // **FIX**: Combine base, original, and prop classes using a Set to avoid duplicates.
//       const combinedClasses = new Set([
//         ...componentMap.base.split(' '),
//         ...originalClasses.split(' '),
//         ...propClasses.split(' ')
//       ].filter(Boolean));

//       // Process other attributes. 'class' and mapped props are already handled.
//       const otherAttrs = Array.from(attributes.entries())
//         .filter(([key]) => !componentMap.props[key] && !responsiveMap[key])
//         .map(([key, value]) => (value === '' ? key : `${key}="${value}"`))
//         .join(' ');

//       const finalClassString = `class="${Array.from(combinedClasses).join(' ')}"`;
//       const finalAttrs = [finalClassString, otherAttrs].filter(Boolean).join(' ');

//       return `<${componentMap.target} ${finalAttrs}${selfClosing ? ' /' : ''}>`;
//     });
//   }

//   // --- PASS 2: Replace all closing tags ---
//   for (const vuetifyTag of Object.keys(componentMapper)) {
//     const componentMap = componentMapper[vuetifyTag];
//     const closingTagRegex = new RegExp(`</${vuetifyTag}>`, 'g');
//     updatedContent = updatedContent.replace(closingTagRegex, `</${componentMap.target}>`);
//   }

//   return updatedContent;
// }


// /**
//  * ====================================================================
//  * Script Execution
//  * ====================================================================
//  */
// async function main() {
//   console.log('\n\x1b[36m🚀 Starting Vuetify to Tailwind refactoring script...\x1b[0m');

//   const { values, positionals } = parseArgs({
//     options: {
//       file: { type: 'string', short: 'f' },
//     },
//     allowPositionals: true,
//   });

//   const filePath = values.file || positionals[0];

//   if (!filePath) {
//     console.error('\n\x1b[31mError: Please provide a file path using the --file flag or as an argument.\x1b[0m');
//     console.log('Example: bun scripts/refactor.ts --file src/components/MyCard.vue');
//     console.log('      or: bun scripts/refactor.ts src/components/MyCard.vue');
//     process.exit(1);
//   }

//   try {
//     const fileContent = await readFile(filePath, 'utf-8');
//     const refactoredContent = refactorComponent(fileContent, mapper);
    
//     const newFilePath = filePath.replace('.vue', '.refactored.vue');
//     await writeFile(newFilePath, refactoredContent, 'utf-8');

//     console.log(`\n\x1b[32m✅ Refactoring complete!\x1b[0m`);
//     console.log(`   Original file: ${filePath}`);
//     console.log(`   \x1b[35mNew file created: ${newFilePath}\x1b[0m\n`);

//   } catch (error) {
//     if(error instanceof Error && 'code' in error && error.code === 'ENOENT') {
//         console.error(`\n\x1b[31mError: File not found at '${filePath}'\x1b[0m`);
//     } else {
//         console.error('\n\x1b[31mAn unexpected error occurred:\x1b[0m', error);
//     }
//     process.exit(1);
//   }
// }

// main();