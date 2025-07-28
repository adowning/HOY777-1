import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { parseArgs } from 'util';

/**
 * ====================================================================
 * Helper Functions
 * ====================================================================
 */

/**
 * Extracts a specific section from the Vue Options API script content.
 * @param content The script content string.
 * @param sectionName The name of the section (e.g., 'data', 'methods').
 * @returns The string content of the section, or null if not found.
 */
function extractSection(content: string, sectionName: string): string | null {
  // This regex looks for a section like `methods: { ... }` or `data() { ... }`
  // It handles potential commas and different function definitions.
  const sectionRegex = new RegExp(
    `\\b${sectionName}\\s*(?:\\(\\))?\\s*:\\s*{([\\s\\S]*?)}\\s*[,}]`,
    'm'
  );
  const match = content.match(sectionRegex);
  return match ? match[1].trim() : null;
}

/**
 * ====================================================================
 * Core Conversion Logic
 * ====================================================================
 */

function convertOptionsToComposition(scriptContent: string): string {
  const imports = new Set<string>(['// TODO: Review and add any necessary imports']);
  let newScriptBody = '';

  // --- 1. Convert Props ---
  const propsContent = extractSection(scriptContent, 'props');
  if (propsContent) {
    newScriptBody += `const props = defineProps({${propsContent}});\n\n`;
    imports.add('defineProps');
  }
  
  // --- 2. Convert Emits ---
  const emitsContent = scriptContent.match(/\bemits\s*:\s*(\[[\s\S]*?\])/m);
  if (emitsContent) {
      newScriptBody += `const emit = defineEmits(${emitsContent[1]});\n\n`;
      imports.add('defineEmits');
  }

  // --- 3. Convert Data ---
  const dataContent = scriptContent.match(/\bdata\s*\(\)\s*{\s*return\s*{([\s\S]*?)}\s*}/m);
  if (dataContent) {
    const dataProperties = dataContent[1].trim().split(',\n'); // Simple split, may need refinement
    dataProperties.forEach(prop => {
      if (!prop.trim()) return;
      const [key, value] = prop.split(':').map(p => p.trim());
      // A simple heuristic: if the value looks like an object, use reactive, otherwise use ref.
      if (value.startsWith('{')) {
        newScriptBody += `const ${key} = reactive(${value});\n`;
        imports.add('reactive');
      } else {
        newScriptBody += `const ${key} = ref(${value});\n`;
        imports.add('ref');
      }
    });
    newScriptBody += '\n';
  }

  // --- 4. Convert Methods ---
  const methodsContent = extractSection(scriptContent, 'methods');
  if (methodsContent) {
    newScriptBody += `// --- Methods ---\n`;
    newScriptBody += `// TODO: Refactor 'this' keyword to access props, refs, or reactive state.\n`;
    const methods = methodsContent.replace(/,$/, ''); // Remove trailing comma
    newScriptBody += `const ${methods.replace(/,\s*(?=\w+\s*:)/g, ';\n\nconst ')}\n\n`;
  }
  
  // --- 5. Convert Computed ---
  const computedContent = extractSection(scriptContent, 'computed');
  if (computedContent) {
    imports.add('computed');
    newScriptBody += `// --- Computed ---\n`;
    newScriptBody += `// TODO: Refactor 'this' keyword.\n`;
    const computeds = computedContent.replace(/,$/, '');
    newScriptBody += `const ${computeds.replace(/,\s*(?=\w+\s*:)/g, ';\n\nconst ').replace(/:\s*function\s*\(([^)]*)\)\s*{/g, ' = computed(( $1 ) => {')}\n\n`;
  }

  // --- 6. Convert Lifecycle Hooks ---
  const mountedContent = scriptContent.match(/\bmounted\s*\(\)\s*{([\s\S]*?)}/m);
  if (mountedContent) {
    imports.add('onMounted');
    newScriptBody += `// --- Lifecycle Hooks ---\n`;
    newScriptBody += `// TODO: Refactor 'this' keyword.\n`;
    newScriptBody += `onMounted(() => {${mountedContent[1]}});\n\n`;
  }

  // --- Assemble Final Script ---
  const finalImports = Array.from(imports).filter(i => !i.startsWith('//'));
  const importStatement = `import { ${finalImports.join(', ')} } from 'vue';`;
  
  return `<script setup lang="ts">\n${importStatement}\n\n${newScriptBody}</script>`;
}


/**
 * ====================================================================
 * Script Execution
 * ====================================================================
 */
async function main() {
  console.log('\n\x1b[36m🚀 Starting Options API to Composition API Scaffolding Script...\x1b[0m');

  const { values } = parseArgs({
    options: {
      file: { type: 'string', short: 'f' },
      help: { type: 'boolean', short: 'h' }
    },
  });

  if (values.help || !values.file) {
    console.log(`
  \x1b[33mUsage:\x1b[0m
    bun scripts/compose.ts --file <path_to_component>

  \x1b[33mDescription:\x1b[0m
    Generates a new component file scaffolded with the Composition API
    from an existing Options API component.

  \x1b[33mArguments:\x1b[0m
    -f, --file    The source .vue component using the Options API.
    -h, --help    Show this help message.
    `);
    process.exit(0);
  }

  const filePath = values.file as string;

  try {
    const originalContent = await readFile(filePath, 'utf-8');
    
    // Extract the original script block
    const scriptMatch = originalContent.match(/<script.*?>([\s\S]*)<\/script>/);
    if (!scriptMatch) {
      console.error('\n\x1b[31mError: Could not find a <script> block in the file.\x1b[0m');
      process.exit(1);
    }
    
    const originalScriptContent = scriptMatch[1];
    
    // Convert the script and replace it in the original content
    const newScript = convertOptionsToComposition(originalScriptContent);
    const newContent = originalContent.replace(/<script.*?>[\s\S]*?<\/script>/, newScript);
    
    // Write to a new file
    const newFilePath = filePath.replace('.vue', '.composition.vue');
    await writeFile(newFilePath, newContent, 'utf-8');

    console.log(`\n\x1b[32m✅ Scaffolding complete!\x1b[0m`);
    console.log(`   \x1b[35mNew file created: ${newFilePath}\x1b[0m`);
    console.log(`\x1b[33m   Next Steps: Open the new file and manually refactor any 'this' references.\x1b[0m\n`);

  } catch (error) {
    console.error('\n\x1b[31mAn unexpected error occurred:\x1b[0m', error);
    process.exit(1);
  }
}

main();